import type { SchemaNumberWidgetOptions } from 'autostore';
import { AutoField } from '@/field';
import { css } from 'lit';

export type AutoFieldMarkdownOptions = Required<SchemaNumberWidgetOptions>;

export class AutoFieldMarkdown extends AutoField<AutoFieldMarkdownOptions> {
    static styles = [AutoField.styles, css``] as any;
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-markdown': AutoFieldMarkdown;
    }
}

if (!customElements.get('auto-field-markdown')) {
    customElements.define('auto-field-markdown', AutoFieldMarkdown);
}
