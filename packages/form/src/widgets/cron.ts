import { html } from 'lit';
import { AutoField } from '@/field';
import { tag } from '@/utils/tag';

export type AutoFieldStepperOptions = {};

@tag('auto-field-cron')
export class AutoFieldCron extends AutoField {
    render() {
        return html` <div class=""></div> `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-cron': AutoFieldCron;
    }
}
