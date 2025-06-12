import { AutoField } from "@/field"
import { customElement } from "lit/decorators.js"

@customElement('auto-field-fileupload')
export class AutoFieldFileUpload extends AutoField {

}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-fileupload': AutoFieldFileUpload
    }
}
