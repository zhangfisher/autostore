// 类型已内联
import { AutoField } from '@/field';
import { css } from 'lit';
import { tag } from '@/utils/tag';
export type AutoFieldMarkdownOptions = Required<any>;
@tag('auto-field-markdown')
export class AutoFieldMarkdown extends AutoField<AutoFieldMarkdownOptions> {
    static styles = [AutoField.styles, css``] as any;
}
declare global {
    interface HTMLElementTagNameMap {
        'auto-field-markdown': AutoFieldMarkdown;
    }
}
