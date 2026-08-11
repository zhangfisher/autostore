import type { AutoTemplateEngine } from "../../../engine";
import type { AutoTemplateScope } from "../../../scope";
import type { AutoTemplateActionContext } from "./types";
import { createDirectiveOptions } from "../../utils/createDirectiveOptions";

/**
 * 匹配"裸标识符"或"标识符(参数)"：^Identifier 可选 (args)
 * - `submit`      → name="submit", argsSrc=undefined（无括号）
 * - `submit()`    → name="submit", argsSrc=""（空括号）
 * - `pay(1, x)`   → name="pay",    argsSrc="1, x"
 * - `count++` / `a + b` / `user.name` → 不匹配（含运算符/点），无 name，走表达式兜底
 */
const ACTION_RE = /^([A-Za-z_$][\w$]*)\s*(?:\(([\s\S]*)\))?$/;

/**
 * 构造事件业务 handler：**Action 优先 + 表达式兜底**。
 *
 * **关键：Action 查找延迟到事件触发时**（闭包内调 `scope.getAction`）——因 actions 可能在
 * 指令 `created` 之后才注册（`engine.actions` 赋值、`<script type="actions">` 注入均晚于
 * 编译）。若在 created 时缓存 action 引用，会查到 undefined 误走表达式。
 *
 * 仅"表达式编译"（`new Function`，expr 不变）与"args 求值器"在 created 时一次性完成。
 *
 * 求值异常均记 `engine.logger.error` 不中断（复用 `scope.ts` watchExpression 宽松求值模式）。
 *
 * @returns `(event) => void` 闭包，捕获 engine/scope/el/$options
 */
export function createEvalHandler(
    expr: string,
    engine: AutoTemplateEngine,
    scope: AutoTemplateScope,
    el: HTMLElement,
    directiveOptions: Record<string, any> | undefined,
    hostOptions: Record<string, any> | null | undefined,
): (event: Event) => any {
    const trimmed = expr.trim();
    const match = trimmed.match(ACTION_RE);

    // 预编译（expr 不变，created 时完成）：
    // - name：ACTION_RE 提取的首标识符；每次触发时据它查 action
    // - argsFn：name(args) 的参数求值器，返回数组；无参数时为 null
    // - exprGetter：表达式兜底求值器（action 未命中时用）
    const name = match?.[1];
    const argsSrc = match?.[2];
    const argsFn =
        argsSrc != null && argsSrc.trim() !== ""
            ? (new Function("$event", "data", `with(data){return [${argsSrc}];}`) as (
                  $event: Event,
                  data: any,
              ) => any[])
            : null;
    const exprGetter = new Function("$event", "data", `with(data){return (${trimmed});}`) as (
        $event: Event,
        data: any,
    ) => any;

    // 指令配置聚合视图（ADR-0007）：created 时构造一次，闭包捕获，事件触发时复用
    const $options = createDirectiveOptions(directiveOptions, hostOptions);
    // 返回值冒泡（ADR-0008）：action/表达式分支的返回值经管道透传，供 .feedback 等 wrapper 捕获
    // （如 async action 返回的 Promise）。同步抛错经 catch logger 后 rethrow，供 .feedback 检测同步失败（ADR-0013）。
    return (event) => {
        // 聚合数据视图：localScope + dataScope + 全局 state，供表达式 with 求值与 ctx.data（写入透传 dataScope）
        const data = scope.getScopeContext();
        // 1) Action 优先：每次触发时查 scope.getAction（actions 可能后于 created 注册）
        if (name) {
            const action = scope.getAction(name);
            if (typeof action === "function") {
                const ctx: AutoTemplateActionContext = {
                    el,
                    $event: event,
                    data,
                    scope,
                    store: engine.store,
                    state: engine.store.state,
                    engine,
                    $options,
                };
                try {
                    const args = argsFn ? argsFn(event, data) : [];
                    return action.call(ctx, ...args);
                } catch (e: any) {
                    // logger 后 rethrow（ADR-0013）：让 .feedback 等 wrapper 检测同步失败。
                    // 冒泡错误由 OnDirective finalHandler / debounce setTimeout 兜底吞掉（防 uncaught）。
                    engine.logger.error(`x-on action "${name}" 执行失败: ${e?.message ?? e}`);
                    throw e;
                }
            }
        }
        // 2) 表达式兜底：覆盖 alert(1)、全局/模板函数 pay(1)、count++ 等
        try {
            return exprGetter(event, data);
        } catch (e: any) {
            engine.logger.error(`x-on 表达式 "${expr}" 求值失败: ${e?.message ?? e}`);
        }
    };
}
