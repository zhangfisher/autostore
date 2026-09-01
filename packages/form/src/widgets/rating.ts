import { AutoField } from '@/field';
import { html } from 'lit';
import '@shoelace-style/shoelace/dist/components/rating/rating.js';
import { tag } from '@/utils/tag';
/**
 * rating 评分 widget 的配置类型
 */
export interface AutoFieldRatingOptions {
    /**
     * 最高星数，默认 5
     */
    max?: number;
    /**
     * 评分精度（如 0.5 支持半星），默认 1
     */
    precision?: number;
}
@tag('auto-field-rating')
export class AutoFieldRating extends AutoField<AutoFieldRatingOptions> {
    getInitialOptions() {
        return {
            max: 5,
            precision: 1,
        };
    }
    renderInput() {
        return html`
            <sl-rating
                slot="value"
                name="${this.name}"
                data-path=${this.path}
                value=${this.value}
                max=${this.options.max}
                precision=${this.options.precision}
                .placeholder=${this.options.placeholder}
                ?disabled=${!this.options.enable}
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-change=${this.onFieldChange.bind(this)}
            >
            </sl-rating>
        `;
    }
    renderView() {
        return html`<sl-rating slot="value" name="${this.name}" data-path=${this.path} value=${this.value} max=${this.options.max} readonly> </sl-rating> `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'auto-field-rating': AutoFieldRating;
    }
}
declare module "autostore" {
    interface AutoStoreWidgets {
        rating: AutoFieldRatingOptions;
    }
}
