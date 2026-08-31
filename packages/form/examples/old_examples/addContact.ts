import { customElement, query } from "lit/decorators.js";
import { LitElement, PropertyValues, html } from "lit";
import { AutoStore, configurable } from "autostore";

@customElement("add-contact")
class AddContacyForm extends LitElement {
	store = new AutoStore({
		type: configurable(2, {
			size: "small",
			label: "类型",
			required: true,
			widget: "radio",
			select: [
				{
					id: 1,
					label: "个人",
					value: 1,
				},
				{
					id: 2,
					label: "部门",
					value: 2,
				},
			],
		}),
		// name: configurable("", {
		// 	label: "姓名",
		// 	required: true,
		// 	placeholder: "请输入联系人姓名/部门名称",
		// 	onValidate: (value: string) => {
		// 		return value.length > 1;
		// 	},
		// 	invalidTips: "长度过短",
		// 	onFail: "throw",
		// }),
		// phone: configurable("", {
		// 	label: "号码",
		// 	widget: "phone",
		// 	placeholder: "请输入号码",
		// 	onValidate: (value: string) => {
		// 		return value.length > 1;
		// 	},
		// 	toState: (value: any) => {
		// 		return String(value);
		// 	},
		// 	invalidTips: "长度过短",
		// 	onFail: "throw",
		// }),
		// avatar: configurable("", {
		// 	label: "头像",
		// 	widget: "upload",
		// 	visible: (state: any) => state.type === 1,
		// }),
		// description: configurable("", {
		// 	label: "简介",
		// 	placeholder: "请输入简介",
		// 	visible: (state: any) => state.type === 2,
		// }),
		// post: configurable("", {
		// 	label: "职位",
		// 	placeholder: "请输入职位",
		// 	visible: (state: any) => state.type === 1,
		// }),
		// pid: configurable("a", {
		// 	label: "部门",
		// 	widget: "select",
		// 	select: ["a", "b", "c"],
		// 	placeholder: "请选择所属部门",
		// 	clearable: false,
		// }),
		migrateFollow: configurable(1, {
			label: "原属于该部门的用户",
			labelPos: "top",
			widget: "radio",
			select: [
				{
					id: 1,
					label: "仍归属于该部门",
					value: 1,
				},
				{
					id: 2,
					label: "迁移到",
					value: 2,
				},
			],
			visible: (state: any) => {
				if (state.type === 2) {
					return true;
				}
				return false;
			},
		}),
		// followDepartment: configurable("", {
		// 	label: "新的部门",
		// 	widget: "select",
		// 	clearable: false,
		// 	placeholder: "请选择将所属用户迁移到",
		// 	select: async () => {
		// 		return [];
		// 	},
		// 	visible: (state: any) => {
		// 		return state.migrateFollow === 2;
		// 	},
		// }),
	});
	//@ts-ignore
	@query("auto-form")
	formRef?: any;
	protected updated(_changedProperties: PropertyValues): void {
		this.formRef?.bind(this.store);
	}
	render() {
		return html`<div
            style="onsting: 1em; var(--auto-border); margin: 1em; position: relative"
        >
                <auto-form                                    
                    data-name="general"
                    group="general"
                    data-label="常规"
                    data-icon="settings"
                    data-actions="settings"
                >
                </auto-form>
        </div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"add-contact": AddContacyForm;
	}
	var store: AutoStore<any>;
}
