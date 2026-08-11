/**
 * buildAction —— 把 action 包装为**双通道广播生命周期事件**的版本（ADR-0010 / 0011 / 0012）。
 *
 * **同步/异步统一**（ADR-0011）：所有 action（无论同步或 async）均广播完整 lifecycle——
 * pending（执行前）→ resolved（成功）/ rejected（失败）。不再仅 async 广播。
 *
 * **双通道（正交并存，ADR-0010）**：
 * 1. **总线**（ADR-0003）：emit `actions/<name>/{pending,resolved,rejected}` —— 全局消费者。
 * 2. **DOM 冒泡**（ADR-0010）：在触发元素上 dispatchEvent `action:<name>` CustomEvent
 *    （`bubbles+composed`，detail 不带 el/scope）—— 祖先聚合后代 action。
 *
 * **全局 vs 局部（ADR-0012）**：
 * - **全局 action**（engine.actions）：双发（总线 + DOM 冒泡）。
 * - **局部 action**（scope.actions，`<script type="actions">`）：**只 DOM 冒泡，不进总线**——
 *   总线是全局通道，局部 action 同名进总线会与其他 scope 同名局部 action 串扰（消费者无法区分）；
 *   DOM 冒泡天然隔离作用域（冒泡只到祖先）。经 `local` 标志区分（compiler 入口传 true、engine 入口默认 false）。
 *
 * **dispatch 源 = AutoTemplateActionContext.el**：wrapped 内 `this = AutoTemplateActionContext`（经 x-on 触发），
 * 闭包捕获 `this.el` 作 triggerEl。命令式直调（this 非 ctx、无 el）→ triggerEl 为空：
 * 全局 action 仍 emit 总线（只不走 DOM）；局部 action 既无总线也无 DOM = 静默（组件内部调用，自知结果）。
 *
 * **detail 不带 el/scope**：作用域由**冒泡路径**表达、触发元素由 **event.target** 表达
 * （规避 ADR-0008 否决的「payload 带 el」）。
 *
 * **时序**：pending 在 `action.apply` **之前**（=「开始执行」）；resolved/rejected 在完成时
 * ——同步同 tick 内 pending→resolved（或抛错 pending→rejected），异步经 `then`。
 *
 * **错误传播**：同步抛错先 broadcast `rejected` 再 **rethrow**（保持错误传播——x-on eval.ts catch
 * 记日志 / 命令式调用者仍收到错误）；async reject 经内部 `then(_, onRejected)` 消费广播 `rejected`
 * （消除 unhandled rejection）。两者互斥（async 函数体 throw 被包装为 rejected promise）。
 *
 * **防双重包装**：已包装的函数（`__buildActionWrapped` 标记）直接返回，避免三入口重叠双重广播。
 */

/** 总线广播函数类型：emit `actions/<name>/<verb>`（调用点绑 engine.emit）。 */
type ActionEmit = (type: string, payload: Record<string, any>) => void;

/**
 * 把一个 action 包装为**双通道广播生命周期事件**的版本（同步/异步统一）。
 *
 * @param emit   总线广播函数（调用点绑 engine.emit；动态事件名由调用点 `as any` 适配）
 * @param name   action 函数名（入事件路径 + detail.name）
 * @param action 原始 action 函数（this/args 透传）
 * @param local  局部 action（scope.actions）：只 DOM 冒泡、不进总线（ADR-0012，默认 false=全局）
 * @returns 包装后的函数（同签名）
 */
export function buildAction<A extends (...args: any[]) => any>(
    emit: ActionEmit,
    name: string,
    action: A,
    local = false,
): A {
    if ((action as any).__buildActionWrapped) return action;
    const wrapped = function (this: unknown, ...args: Parameters<A>) {
        // 触发元素：仅 AutoTemplateActionContext（经 x-on 触发）有 el；命令式直调无 el
        const triggerEl = (this as any)?.el as HTMLElement | undefined;
        // 双通道广播：总线（全局通配，仅全局 action）+ DOM 冒泡（祖先聚合，全局+局部）。
        // local=true（局部 action）：跳过 emit，只 DOM——避免同名局部 action 总线串扰（ADR-0012）。
        // triggerEl 为空（命令式直调）：跳过 DOM；全局 action 仍 emit 总线，局部 action 静默。
        const broadcast = (phase: string, extra: Record<string, any> = {}) => {
            if (!local) emit(`actions/${name}/${phase}`, { name, ...extra });
            if (triggerEl) {
                triggerEl.dispatchEvent(
                    new CustomEvent(`action:${name}`, {
                        bubbles: true,
                        composed: true,
                        detail: { name, phase, ...extra },
                    }),
                );
            }
        };
        // pending 在 apply 前（开始执行）；同步/异步统一
        broadcast("pending");
        let result: any;
        try {
            result = action.apply(this, args);
        } catch (error) {
            // 同步抛错：广播 rejected 后 rethrow（保持错误传播：x-on eval.ts catch / 命令式调用者）
            broadcast("rejected", { error });
            throw error;
        }
        // 成功完成：同步立即 resolved；异步（thenable）等 then
        if (result && typeof (result as any).then === "function") {
            (result as Promise<any>).then(
                (value) => broadcast("resolved", { result: value }),
                (error) => broadcast("rejected", { error }),
            );
        } else {
            broadcast("resolved", { result });
        }
        return result;
    } as A;
    (wrapped as any).__buildActionWrapped = true;
    return wrapped;
}
