import { TemplateDirectiveBase } from "../directive";

/**
 *
 *
 * <ul x-for="item of items">
 *      <li x-text="item.name"></li>
 * </ul>
 *
 *
 */
export class TextDirective extends TemplateDirectiveBase {
    render(el: HTMLElement, value: any, _modifiers: any[], template: HTMLElement) {
        const itemTmpl = template.innerHTML;
        const [item, items] = value.split("of");
    }
}
