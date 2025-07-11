import { customElement } from "lit/decorators.js"
import { AutoFieldInput, type InputType } from "./input"
import type { SchemaEmailWidgetOptions } from "autostore"

export type AutoFieldEmailOptions = Required<SchemaEmailWidgetOptions>

@customElement('auto-field-email')
export class AutoFieldEmail extends AutoFieldInput<AutoFieldEmailOptions> {
    getInputType(): InputType {
        return "email"
    }
    getInitialOptions() {
        return {
            icon: 'email'
        }
    }
    connectedCallback(): void {
        super.connectedCallback()
        const validator = this.context.store.schemas.getValidator(this.path as never)
        if (!validator || typeof (validator.validate) !== 'function') {
            this.context.store.schemas.addValidator(this.path as never, {
                validate: (value: any) => {
                    return this._isEmail(value)
                },
                message: '无效的电子邮件地址',
                onFail: 'throw-pass'
            })
        }
    }
    _isEmail(value: string) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-email': AutoFieldEmail
    }
}
