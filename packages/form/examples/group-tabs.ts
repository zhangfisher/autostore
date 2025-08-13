import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import type { AutoStore } from "autostore";

@customElement("auto-form-example-tabs")
class AutoFormExampleTabs extends LitElement {
	//@ts-ignore
	@query("auto-form-tabs")
	tabs?: any;

	updated() {
		this.tabs?.bind(store);
	}

	render() {
		return html`
            <auto-form-tabs direction="bottom" style="border: 1px solid #ccc;height:500px">
                <auto-form group="general" icon="settings"> </auto-form>
                <auto-form group="car" icon="car"> </auto-form>
                <auto-form group="network" icon="network" label="网络"> </auto-form>
                <auto-form group="admin" icon="apple"> </auto-form>
                <auto-form group="safe" icon="lock"> </auto-form>
            </auto-form-tabs>
        `;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"auto-form-example-tabs": AutoFormExampleTabs;
	}
	var store: AutoStore<any>;
}

// <auto-form group="general" title="常规"> </auto-form>
// <auto-form group="car" title="汽车"> </auto-form>
// <auto-form group="network" title="网络"> </auto-form>
// <auto-form group="admin" title="管理"> </auto-form>
// <auto-form group="safe" title="安全"> </auto-form>
