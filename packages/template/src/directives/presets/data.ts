import { KylinTemplateDirectiveBase } from "../base";

/**
 *
 *  <div x-data="{a:1}"></div>
 *
 */
export class DataDirective extends KylinTemplateDirectiveBase {
    override name = "data";
    override priority = 999;
    render() {}
}
