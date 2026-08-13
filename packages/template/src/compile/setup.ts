import type {
    ComponentHookPhase,
    ComponentHooks,
    ComponentSetup,
} from "../directives/component-def";

/**
 * `<script setup>` 的合法钩子名（ADR-0022 决策三）。
 *
 * 求值 setup 对象时，只识别这四个键为生命周期钩子；其余键忽略（防误声明）。
 * 与 `ComponentHookPhase` 同源，单独列出便于 `Object.prototype.hasOwnProperty` 判定。
 */
const SETUP_HOOK_PHASES: readonly ComponentHookPhase[] = [
    "created",
    "mounted",
    "beforeUnmount",
    "unmounted",
];

/**
 * 求值单个 `<script setup>` 文本为 setup 对象字面量（ADR-0022 决策四-2）。
 *
 * 经 `new Function('return ' + text)()` 求值——**信任代码**（用户声明信任）。
 * 求值失败 / 返回非对象 → warn + 返回 undefined（丢弃该 `<script setup>`，不阻断组件其余部分，
 * 决策四-3 容错）。
 *
 * @param text   `<script setup>` 的 textContent（已 trim）
 * @param name   组件名（仅供日志）
 * @param warn   warn 日志函数（传入 logger.warn）
 * @returns setup 对象，或 undefined（求值失败/非对象）
 */
export function evalComponentSetup(
    text: string,
    name: string,
    warn: (msg: string) => void,
): ComponentSetup | undefined {
    if (!text) return undefined;
    let result: any;
    try {
        result = new Function(`return (${text})`)();
    } catch (e: any) {
        warn(`x-component "${name}": <script setup> 求值失败，已丢弃: ${e?.message ?? e}`);
        return undefined;
    }
    if (!result || typeof result !== "object") {
        warn(`x-component "${name}": <script setup> 须返回对象字面量，已丢弃`);
        return undefined;
    }
    return result as ComponentSetup;
}

/**
 * 合并多个 `<script setup>` 求值结果（ADR-0022 决策四-1）。
 *
 * 按段分类合并（R3=A）：
 * - `data`：收集所有 data 函数 → 合并为单个函数，实例化时依次调用、后者同名键覆盖前者；
 * - `methods`：浅合并（后者同名覆盖前者）；
 * - 同名 hook（created/mounted/...）：收集为数组，**按声明顺序串行**。
 *
 * 无任何 setup 时返回 undefined（组件无数据/方法/钩子）。
 *
 * @param setups 各 `<script setup>` 的求值结果（按文档顺序，已过滤 undefined）
 */
export function mergeComponentSetups(setups: ComponentSetup[]): ComponentSetup | undefined {
    if (setups.length === 0) return undefined;
    const dataFns: Array<() => Record<string, any>> = [];
    const methods: Record<string, (...args: any[]) => any> = {};
    const locals: Record<string, any> = {};
    const hooks: ComponentHooks = {
        created: [],
        mounted: [],
        beforeUnmount: [],
        unmounted: [],
    };
    let hasHooks = false;
    let hasData = false;
    let hasMethods = false;
    let hasLocals = false;
    for (const s of setups) {
        // data：收集函数（实例化时依次调用合并返回值）
        if (typeof s.data === "function") {
            dataFns.push(s.data);
            hasData = true;
        }
        // methods：浅合并
        if (s.methods && typeof s.methods === "object") {
            for (const [k, fn] of Object.entries(s.methods)) {
                if (typeof fn === "function") methods[k] = fn;
            }
            hasMethods = true;
        }
        // locals：浅合并（ADR-0022 决策二-3 (10)，非响应式局部变量，后者同名覆盖前者）
        if (s.locals && typeof s.locals === "object") {
            Object.assign(locals, s.locals);
            hasLocals = true;
        }
        // hooks：同名串行收集
        for (const phase of SETUP_HOOK_PHASES) {
            const fn = (s as any)[phase];
            if (typeof fn === "function") {
                hooks[phase].push(fn);
                hasHooks = true;
            }
        }
    }
    const merged: ComponentSetup = {};
    if (hasData) {
        // 合并后的 data 函数：依次调用各 setup 的 data()，后者同名键覆盖前者
        merged.data = () => {
            const out: Record<string, any> = {};
            for (const fn of dataFns) {
                try {
                    const r = fn();
                    if (r && typeof r === "object") Object.assign(out, r);
                } catch {
                    /* 单个 data() 失败不阻断，跳过该段 */
                }
            }
            return out;
        };
    }
    if (hasMethods) merged.methods = methods;
    if (hasLocals) merged.locals = locals;
    // hooks 单独返回（供实例化时克隆到 scope.hooks），不放进 setup 避免重复
    // 但为接口完整，setup 上的四阶段钩子取合并后数组的「首项」无意义——hooks 经第二返回值传递。
    // 此处把 hooks 挂到 merged 上以兼容 ComponentSetup 类型（实例化时优先读 hooks 字段）。
    if (hasHooks) {
        (merged as any)._hooks = hooks;
    }
    return merged;
}

/**
 * 从合并后的 setup 提取钩子表（供实例化时克隆到 scope.hooks）。
 *
 * @returns 钩子表（无钩子则各阶段为空数组）；始终返回非 null，实例化时按数组是否空决定是否触发。
 */
export function extractComponentHooks(setup: ComponentSetup | undefined): ComponentHooks | undefined {
    if (!setup) return undefined;
    const hooks = (setup as any)._hooks as ComponentHooks | undefined;
    if (!hooks) return undefined;
    // 过滤掉全空的情况
    const hasAny = SETUP_HOOK_PHASES.some((p) => hooks[p].length > 0);
    return hasAny ? hooks : undefined;
}
