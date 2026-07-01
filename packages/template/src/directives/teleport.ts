import { TemplateDirectiveBase } from "../directive";

/**
 *
 *  将元素渲染到其他位置
 *
 *  <div id="parent">
 *     <div id="before"></div>
 *     <div x-teleport="selector"></div>
 *     <div id="after"></div>
 *  </div>
 *
 * 渲染到父元素
 * <div x-teleport="全局选择器"></div>
 * <div x-teleport="../../<范围选择器>"></div>
 * <div x-teleport="../<范围选择器>"></div>
 * <div x-teleport="./<范围选择器>"></div>
 *  *
 * . 代表所有元素的父元素
 * .. 代表父元素的父元素
 *
 */
export class TeleportDirective extends TemplateDirectiveBase {
    render() {}
}
