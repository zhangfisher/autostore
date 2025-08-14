import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import type { AutoStore } from "autostore";
import type { AutoForm } from "../src/form";

@customElement("auto-form-example-general")
class AutoFormExampleGeneral extends LitElement {
	//@ts-ignore
	@query("auto-form")
	form?: AutoForm;

	//@ts-ignore
	@query("#viewer")
	viewer?: any;

	firstUpdated() {
		store.watch(() => this.updateState());
		store.on("validate", () => {
			this.viewer.innerHTML = JSON.stringify(store.schemas.errors);
		});
		this.updateState();
	}
	updateState() {
		// @ts-ignore
		this.viewer.value = JSON.stringify(store.state);
	}

	updated() {
		this.form?.bind(store);
	}

	render() {
		return html`<div
            style="padding: 1em; border: var(--auto-border); margin: 1em; position: relative"
        >
            <div class="actions">
                <auto-form-debuger></auto-form-debuger>
                <auto-form path="user"> </auto-form>
            </div>
            <textarea
                id="viewer"
                rows="10"
                style="box-sizing: border-box; border: var(--auto-border); width: 100%"
            ></textarea>
            <div id="errors" style="border: var(--auto-border); color: red"></div>
        </div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"auto-form-example-general": AutoFormExampleGeneral;
	}
	var store: AutoStore<any>;
}
