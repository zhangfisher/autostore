import { tag } from '@/utils/tag';
import { AutoFieldInput, type InputType } from './input';

@tag('auto-field-url')
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
