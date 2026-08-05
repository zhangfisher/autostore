import { AutoTemplateDirectiveBase } from "../../base";
import { MODIFIERS } from "./modifiers";
import { createEvalHandler } from "./eval";
import type {
    ModifierRuntime,
    CleanupHandle,
    ModifierDesc,
    GuardModifierDesc,
    WrapperModifierDesc,
    OptionModifierDesc,
    EventListenerOptionsSubset,
} from "./types";

/**
 * x-on 事件指令（singleton=false，priority=50）。
 *
 * `x-on:event` / `@event` 监听任意事件；响应函数统一抽象为 **Action**：
 * - **函数来源（Action 优先 + 表达式兜底）**：`@click="submit"` / `submit(args)` 先沿 scope 链查
 *   actions（局部 `<script type="js/actions">` → engine.actions），命中以 OnEvalContext 为 this
 *   调用；否则退化到 `with(data)` 表达式求值（data 为聚合视图；`alert(1)`/`count++` 等仍可用）。详见 eval.ts。
 *
 * **修饰符管道**（按 descriptor.type 分派，见 modifiers/）：
 * - **option**（once/capture/passive）→ 合并进 addEventListener 第 3 参
 * - **guard**（self/ctrl/按键/鼠标/exact）→ 组成 AND 链，置于业务 handler 之前，任一 false 短路
 * - **wrapper**（debounce）→ 由外向内包裹整条管道（在 guard 之外），destroy 时 cancel 清理
 *
 * **生命周期**：`created` 一次性构造 handler 并 addEventListener（事件是 push 模型，无需
 * scheduler/collectDependencies）；`destroy` 清 wrapper cleanup + removeEventListener。
 */
export class OnDirective extends AutoTemplateDirectiveBase {
    static override readonly priority = 50;
    static override readonly singleton = false;

    /** 最终挂到 addEventListener 的 handler（含 wrapper/guard 包装），destroy 时用于解绑 */
    private finalHandler: ((event: Event) => void) | null = null;
    /** addEventListener 第 3 参（option 类修饰符合并结果），解绑须 capture 字段一致 */
    private listenerOptions: AddEventListenerOptions | null = null;
    /** wrapper 注册的清理句柄（debounce timer 等），destroy 时调用 cancel */
    private cleanups: CleanupHandle[] = [];

    override created() {
        const el = this.el;
        const event = this.attr;
        const value = this.value;
        if (!el || !event || value == null || value === "") return;

        const mods = this.modifiers ?? [];

        // === 1. 分类修饰符 + 解析数字参数段（如 .debounce.500 的 500） ===
        const optionParts: EventListenerOptionsSubset = {};
        const guardRts: ModifierRuntime[] = [];
        const wrapperRts: ModifierRuntime[] = [];
        // $modifiers：修饰符名（过滤数字段）作键，供 action 经 this.$modifiers 读取
        const $modifiers: Record<string, true> = {};
        for (let i = 0; i < mods.length; i++) {
            const seg = mods[i]!;
            // 纯数字段：归属前一个修饰符的 num 参数（仅 debounce 用），不计入 $modifiers
            if (/^\d+$/.test(seg)) continue;
            const desc = MODIFIERS[seg] as ModifierDesc | undefined;
            if (!desc) continue; // 未注册修饰符静默跳过（便于未来扩展）
            $modifiers[seg] = true;
            // 探测下一段是否为数字参数
            const next = mods[i + 1];
            const num = next != null && /^\d+$/.test(next) ? Number(next) : undefined;
            const rt: ModifierRuntime = { el, name: seg, num, modifiers: mods, event };
            if (desc.type === "option") {
                Object.assign(optionParts, (desc as OptionModifierDesc).apply(rt));
            } else if (desc.type === "guard") {
                guardRts.push(rt);
            } else {
                wrapperRts.push(rt);
            }
        }

        // === 2. 业务 handler（求值器：Action 优先 + 表达式兜底） ===
        const business = createEvalHandler(String(value), this.engine, this.binding, el, $modifiers);

        // === 3. guard 层（最内层，AND 组合，任一 false 短路不执行业务） ===
        const guardWrapped = (eventObj: Event) => {
            for (const rt of guardRts) {
                const desc = MODIFIERS[rt.name] as GuardModifierDesc;
                if (!desc.apply(eventObj, rt)) return;
            }
            business(eventObj);
        };

        // === 4. wrapper 层（由外向内包裹，在 guard 之外） ===
        let current: (eventObj: Event) => void = guardWrapped;
        for (const rt of wrapperRts) {
            const desc = MODIFIERS[rt.name] as WrapperModifierDesc;
            const cleanup: CleanupHandle = {};
            current = desc.apply(current, rt, cleanup);
            if (cleanup.cancel) this.cleanups.push(cleanup);
        }
        this.finalHandler = current;

        // === 5. 合并 option + addEventListener ===
        this.listenerOptions = optionParts;
        el.addEventListener(event, this.finalHandler, optionParts);
    }

    override destroy() {
        // 先 cancel wrapper 清理（取消 pending debounce timer）
        for (const c of this.cleanups) c.cancel?.();
        this.cleanups = [];
        // 再 removeEventListener（同一 handler 引用 + 同一 options，capture 字段须与 add 一致）
        const el = this.el;
        if (el && this.finalHandler && this.attr) {
            el.removeEventListener(this.attr, this.finalHandler, this.listenerOptions ?? undefined);
        }
        this.finalHandler = null;
        this.listenerOptions = null;
    }
}
