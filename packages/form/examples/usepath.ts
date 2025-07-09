import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("auto-form-example-path")
class AutoFormExamplePath extends LitElement {
    static styles = css`
        `
    render() {
        return html`<div style="padding: 1em; border: 1px solid #ccc; margin: 1em; position: relative">
        <auto-form id="row" layout="row" labelpos="left" grid="false" path="a.b.c"></auto-form>
        <auto-form id="col" layout="col" path="a.b.c" style="margin-top: 1em"></auto-form>
    </div>`
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-form-example-path': AutoFormExamplePath
    }
}
