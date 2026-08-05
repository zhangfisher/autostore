import { AutoTemplateDirectiveBase } from "../base";
import { toJson } from "really-relaxed-json";
import { SCOPES_KEY } from "../../engine";

/**
 * x-data：数据指令（非结构指令）。编译期（`created`）解析模板 `x-data="..."` 的值并写入响应式
 * 数据域，供后代与同级表达式读取。
 *
 * ```html
 * <div x-data="{a:1}">
 *   <span x-text="a"></span>
 * </div>
 * ```
 *
 * **两种模式（均为响应式，仅作用域不同）**：
 *
 * - **默认**（`x-data="{a:1}"`）：数据写入**私有响应式域** `store.state._scopes[scope.id]`
 *   （`scope.dataScope` 指向该 store 代理对象）。经 `getScopeContext` 与 localScope 同级叠加暴露，
 *   子树可见、scope 间隔离。读写经 store → `collectDependencies` 收集 `_scopes.<id>.<field>` 精准路径，
 *   字段级细粒度更新，**无需 refresh**。
 * - **global**（`x-data.global="{a:1}"`）：数据**合并进全局 AutoStore 根键**（`store.state.a=1`），
 *   所有 scope 可见。元素销毁时按 CAS 删除自己写入的键（见下）。
 *
 * **仅编译期注入，不监听运行时变更**：本指令只在 `created` 解析 x-data 属性值并写入数据域——
 * **不在渲染元素上保留 x-data 属性、不挂 MutationObserver**。运行时更新数据请用 `engine.data(el, data)`，
 * 它直接 `Object.assign` 进 `_scopes[id]`，路径订阅自动驱动更新，无需 refresh。
 *
 * **值解析**：用 really-relaxed-json（`toJson` → `JSON.parse`），值必须是普通对象 `{...}`；
 * 解析失败**静默处理——仅打印日志**，按空对象继续，不中断编译。
 *
 * **嵌套覆盖**：父子元素的 dataScope 经 `getScopeContext` 的 parent 链层叠，子覆盖父同名键。
 *
 * **与 x-for 共存**：x-data 不占 `ownsChildren`，与 x-for 自由共存；容器 x-data 经 parent 链
 * 自动透传进各 item scope。x-for 的 localScope（item/$index 等）仍为普通对象、靠 x-for 自身的
 * refresh 驱动——本指令只负责 dataScope 的响应式化。
 *
 * **铁律：永不整体替换 `_scopes[id]`**——`scope.dataScope` 闭包绑定该 store 代理引用，
 * 写入只 `Object.assign` 原地改、`delete` 消失键，绝不 `store.state._scopes[id] = newObj`，
 * 否则 dataScope 指向旧代理、新数据写不进。
 *
 * **优先级 = 200**（最高，> x-for 100）：保证 `created()` 最先执行，在兄弟指令 `watch()` 缓存
 * `_scopeView` 之前把数据注入 dataScope / store，使首渲即读到正确数据。
 */
export class DataDirective extends AutoTemplateDirectiveBase {
    static override readonly priority = 200;
    static override readonly singleton = true;

    /** global 模式：本指令写入 store 的键 → 末值快照。destroy 时按 CAS 删除，避免误删后写者数据 */
    private attachedKeys: Map<string, any> | null = null;

    private get globalMode(): boolean {
        return !!this.modifiers?.includes("global");
    }

    override created() {
        // 编译期首次注入：解析 x-data 属性值，按模式写入 _scopes[id]（默认）或根键（global）。
        // 仅 created 一次，不保留 x-data 属性、不监听 setAttribute——运行时更新请用 engine.data(el, data)。
        this.applyData(String(this.value ?? ""));
    }

    /**
     * 解析值并按模式注入。两种模式均写 store（私有域 _scopes[id] 或全局根键），
     * 订阅者由响应式通知自动更新，无需 refresh（首渲亦由各指令 compile 完成）。
     */
    private applyData(raw: string) {
        const data = this.parse(raw);
        if (this.globalMode) {
            this.applyGlobal(data);
        } else {
            this.applyLocal(data);
        }
    }

    /**
     * 解析宽松 JSON 为普通对象。
     *
     * 失败 / 非对象（数组、标量、null）→ **静默**：仅打印日志，返回空对象，不中断编译。
     * 值是 JSON 字面量（非表达式）：`{a:1+1}` 不做求值。
     */
    private parse(raw: string): Record<string, any> {
        const trimmed = raw.trim();
        if (!trimmed) return {};
        try {
            const parsed: unknown = JSON.parse(toJson(trimmed));
            if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
                this.engine.logger.warn(`x-data: 值必须解析为对象，实际得到 ${JSON.stringify(parsed)}`);
                return {};
            }
            return parsed as Record<string, any>;
        } catch (e: any) {
            this.engine.logger.warn(`x-data: 解析 "${raw}" 失败: ${e?.message ?? e}`);
            return {};
        }
    }

    /**
     * 默认模式：把数据**原地同步**进 `scope.dataScope`（私有响应式域 = `store.state._scopes[id]`）。
     *
     * 首次写入时令 `scope.dataScope` 指向 `store.state._scopes[scope.id]`（core 自动为其建响应式代理），
     * 此后**永不换引用**（`_scopeView` Proxy 闭包绑定，铁律见类注释）。先删除新数据中已不存在的旧键，
     * 再 `Object.assign` 写入/更新——均经 store 代理触发 set/delete 通知，订阅者自动更新。
     */
    private applyLocal(data: Record<string, any>) {
        const scope = this.binding;
        if (!scope.dataScope) {
            const scopes = (this.engine.store.state as Record<string, any>)[SCOPES_KEY] as Record<string, any>;
            // 不存在才建：避免对已存在的 [id] 重复赋值触发无谓的 set 通知
            if (!scopes[scope.id]) scopes[scope.id] = {};
            scope.dataScope = scopes[scope.id];
        }
        // 上面 if 已 ensure 非空；TS 不跨语句窄化属性访问，用 ! 断言非 null
        const ds = scope.dataScope!;
        for (const k of Object.keys(ds)) {
            if (!Object.prototype.hasOwnProperty.call(data, k)) delete ds[k];
        }
        Object.assign(ds, data);
    }

    /**
     * global 模式：CAS 写入全局 AutoStore 根键（store.state[k]）。
     *
     * - 先 CAS 删除"新数据中已消失、且当前值仍为自己末值"的旧键（被后写者覆盖过的键不误删）；
     * - 再写入/更新新键，键已存在且非自己之前写入时 warn 覆盖；
     * - 登记键→末值，供 destroy 与后续 CAS 判定。
     */
    private applyGlobal(data: Record<string, any>) {
        const state = this.engine.store.state as Record<string, any>;
        if (!this.attachedKeys) this.attachedKeys = new Map();
        // 1. CAS 删除消失键
        for (const [k, v] of this.attachedKeys) {
            if (!Object.prototype.hasOwnProperty.call(data, k)) {
                if (state[k] === v) delete state[k];
                this.attachedKeys.delete(k);
            }
        }
        // 2. 写入/更新
        for (const [k, v] of Object.entries(data)) {
            if (
                Object.prototype.hasOwnProperty.call(state, k) &&
                !this.attachedKeys.has(k)
            ) {
                this.engine.logger.warn(`x-data.global: 键 "${k}" 已存在于 store，覆盖写入`);
            }
            state[k] = v; // 新键自动建响应式代理；已有键触发 set notify
            this.attachedKeys.set(k, v);
        }
    }

    override destroy() {
        const state = this.engine.store.state as Record<string, any>;
        if (this.globalMode) {
            // global 模式：CAS 删除自己写过、且当前值仍为自己末值的键（被后写者覆盖过的键保留）
            if (this.attachedKeys) {
                for (const [k, v] of this.attachedKeys) {
                    if (state[k] === v) delete state[k];
                }
                this.attachedKeys.clear();
            }
        } else {
            // 默认模式：回收本 scope 的私有响应式域（_scopes 容器保留，仅清该 [id] 条目）
            const scopes = state[SCOPES_KEY] as Record<string, any> | undefined;
            if (scopes) delete scopes[this.binding.id];
        }
    }
}
