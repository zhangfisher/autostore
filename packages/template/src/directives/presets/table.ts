import { TemplateDirectiveBase } from "../base";

/**
 *
 *  用于渲染表格
 *
 * 根据表达式的值，切换其中一个元素
 *
 * <table x-table="树数据" x-table:options="{....}">
 *  <tr x-table-row="行id"">
 *      <span x-text="col.text"></span>
 *  </tr>
 * </table>
 *
 */
export class TableDirective extends TemplateDirectiveBase {
    render() {}
}
