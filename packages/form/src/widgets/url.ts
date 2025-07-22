import { AutoFieldInput, type InputType } from './input';

export class AutoFieldUrl extends AutoFieldInput {
    getInputType(): InputType {
        return 'url';
    }
    getFieldOptions() {
        if (!this.schema?.icon) {
            this.schema!.icon = 'globe';
        }
        return super.getFieldOptions();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-url': AutoFieldUrl;
    }
}

if (!customElements.get('auto-field-url')) {
    customElements.define('auto-field-url', AutoFieldUrl);
}
