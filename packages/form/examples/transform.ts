import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("auto-form-example-transform")
class AutoFormExampleTransform extends LitElement {
    static styles = css`
        `
    render() {
        return html`<div style="display: flex" >
            <auto-form path="transform"></auto-form>
            <div id = "viewer" style = "border: 1px solid #ccc; padding: 1em" ></div>
        </div>`
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-form-example-transform': AutoFormExampleTransform
    }
}

