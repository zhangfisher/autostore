import type { TemplateCompileContext } from "../../compile/types";
import type { TemplateDirectiveBase } from "../base";

/**
 * 串行执行指令列表中每个指令的 compile
 *
 * 按数组顺序依次调用 directive.compile(parent)，仅执行副作用，忽略返回值。
 * compile 返回 HTMLElement 表示该元素内部还有模板、需上层递归编译，该职责
 * 不属于本函数（由 compiler 处理）。
 *
 * @param directives 已排序的指令实例列表（通常来自 createDirectives）
 * @param binding    这些指令所属的绑定（语义上下文锚点；指令实例自身已持有 binding）
 * @param parent     透传给每个 directive.compile(parent) 的父元素
 */
export function runDirectives(
    directives: TemplateDirectiveBase[],
    context: TemplateCompileContext,
    parent: HTMLElement,
): void {
    for (const directive of directives) {
        directive.compile(context, parent);
    }
}
