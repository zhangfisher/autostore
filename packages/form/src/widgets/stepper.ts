import { html } from 'lit';
import { AutoField } from '@/field';
import { tag } from '@/utils/tag';

export type AutoFieldStepperOptions = {};

@tag('auto-field-stepper')
export class AutoFieldStepper extends AutoField {
    render() {
        return html`
            <div class="">
                <sl-button>-</sl-button>
                <sl-input></sl-input>
                <sl-button>+</sl-button>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-stepper': AutoFieldStepper;
    }
}
