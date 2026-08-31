import { customElement, query, state } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { AutoStore, configurable } from "autostore";

const store1 = new AutoStore({
	order: {
		product: configurable("电脑", {
			label: "产品",
		}),
		price: configurable(100, {
			label: "价格",
			widget: "number",
		}),
		count: configurable(10, {
			label: "数量",
			widget: "number",
		}),
		total: (order) => order.price * order.count,
	},
});
const store2 = new AutoStore({
	username: configurable("Bob", {
		label: "用户名",
	}),
	password: configurable(100, {
		label: "密码",
		widget: "password",
	}),
	age: configurable(10, {
		label: "年龄",
		widget: "number",
	}),
	sex: configurable("male", {
		label: "性别",
		widget: "radio",
		select: [
			{ label: "男", value: "male" },
			{ label: "女", value: "female" },
		],
	}),
});

@customElement("auto-form-example-tabs")
class AutoFormExampleTabs extends LitElement {
	//@ts-ignore
	@query("auto-form-tabs")
	tabs?: any;

	updated() {
		this.tabs?.bind(store);
	}
	//@ts-ignore
	@state()
	refStore: any = store1;

	//@ts-ignore
	@state()
	count: number = 0;
	render() {
		return html`
        <div style="border: var(--auto-border);padding:1rem;margin-bottom:1rem;">
            <auto-form .store=${this.refStore}> </auto-form>
            <button style="margin-top:1rem;padding: 0.5rem;cursor:pointer" @click=${() => {
				this.refStore = this.count % 2 === 0 ? store2 : store1;
				this.count = this.count + 1;
			}} >切换Store</button>
        </div>
        <auto-form group="car" icon="car"> </auto-form>
            <auto-form-tabs direction="bottom" style="border: var(--auto-border);height:500px">
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
