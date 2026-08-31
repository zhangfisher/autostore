import { css, html, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";
import { AutoStore, configurable } from "autostore";
import { orgTree } from "./data";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const store = new AutoStore({
	depts: configurable(["产品部"], {
		label: "部门",
		widget: "tree-select",
		multiple: true,
		valueKey: "label", // 默认选择的是id
		onlySelectLeaf: false, // 只选择叶子节点
		items: async () => {
			await delay(3000);
			return orgTree;
		},
		// onSelectionChange: (selection) => {}
	}),
	country2: configurable(["France"], {
		label: "国家",
		showResults: true,
		widget: "list",
		multiple: true,
		select: async () => {
			await delay(1000);
			return [
				{ label: "中国", value: "China" },
				{ label: "美国", value: "America" },
				{ label: "泰国", value: "Thailand" },
				{ label: "印度", value: "India" },
				{ label: "墨西哥", value: "Mexico" },
				{ label: "南非", value: "SouthAfrica" },
				{ label: "法国", value: "France" },
				{ label: "荷兰", value: "Netherlands" },
				{ label: "德国", value: "Germany" },
			];
		},
	}),
	selected: {
		video: configurable("", {
			size: "small",
			label: "摄像头",
			widget: "select",
			group: "deviceSettings",
			clearable: false,
			// select:[{id:'234',label:'默认',value:'234'}]
			select: async () => {
				return [
					{ id: 1, label: "手机", price: 1000, icon: "phone" },
					{ id: 2, label: "电脑", price: 2000, icon: "laptop" },
				];
			},
		}),
		audioIn: configurable("", {
			size: "small",
			label: "麦克风",
			widget: "select",
			group: "deviceSettings",
			clearable: false,
			select: async () => {
				return [
					{ id: 1, label: "手机", price: 1000, icon: "phone" },
					{ id: 2, label: "电脑", price: 2000, icon: "laptop" },
				];
			},
		}),
		audioOut: configurable("", {
			size: "small",
			label: "扬声器",
			widget: "select",
			group: "deviceSettings",
			clearable: false,
			select: async () => {
				return [
					{ id: 1, label: "手机", price: 1000, icon: "phone" },
					{ id: 2, label: "电脑", price: 2000, icon: "laptop" },
				];
			},
		}),
	},
	products: configurable(["电脑"], {
		label: "产品",
		onValidate: (value) => {
			return value.length > 2;
		},
		widget: "list",
		group: "b",
		multiple: true,
		valueKey: "label",
		labelKey: "label",
		invalidTips: "至少选择两个产品",
		renderItem: '<span>{label}</span><span style="color:red;">{price}</span>',
		height: "250px",
		showResults: true,
		select: [
			{ id: 1, label: "手机", price: 1000, icon: "phone" },
			{ id: 2, label: "电脑", price: 2000, icon: "laptop" },
			{ id: 3, label: "手表", price: 3000, icon: "watch" },
			{ id: 4, label: "耳机", price: 4000, icon: "headphones" },
			{ id: 5, label: "鼠标", price: 5000, icon: "mouse" },
			{ id: 6, label: "键盘", price: 6000, icon: "keyboard" },
			{ id: 7, label: "鼠标垫", price: 7000, icon: "mousepad" },
			{ id: 8, label: "U盘", price: 8000, icon: "usb" },
			{ id: 9, label: "硬盘", price: 9000, icon: "hdd" },
			{ id: 10, label: "内存", price: 10000, icon: "memory" },
			{ id: 11, label: "硬盘盒", price: 11000, icon: "hdd-box" },
			{ id: 12, label: "固态硬盘", price: 12000, icon: "ssd" },
			{ id: 13, label: "机械硬盘", price: 13000, icon: "hdd" },
			{ id: 14, label: "显卡", price: 14000, icon: "gpu" },
			{ id: 15, label: "蓝牙耳机", price: 15000, icon: "bluetooth" },
			{ id: 16, label: "电视", price: 16000, icon: "tv" },
			{ id: 17, label: "空调", price: 17000, icon: "air-conditioner" },
			{ id: 18, label: "冰箱", price: 18000, icon: "fridge" },
			{ id: 19, label: "洗衣机", price: 19000, icon: "washing-machine" },
			{ id: 20, label: "微波炉", price: 20000, icon: "microwave-oven" },
			{ id: 21, label: "电饭煲", price: 21000, icon: "rice-cooker" },
			{ id: 22, label: "电风扇", price: 22000, icon: "fan" },
			{ id: 23, label: "电吹风", price: 23000, icon: "hair-dryer" },
			{ id: 24, label: "吸尘器", price: 24000, icon: "vacuum-cleaner" },
		],
		actions: [
			{
				label: "计算总价",
				pos: "before",
				onClick: (value, ctx) => {
					alert(value);
				},
			},
			{
				label: "产品主页",
				onClick: (value, ctx) => {},
			},
		],
	}),
	country: configurable("China", {
		label: "国家",
		widget: "select",
		select: async () => {
			await delay(3000);
			return [
				{ label: "中国", value: "China" },
				{ label: "美国", value: "America" },
				{ label: "泰国", value: "Thailand" },
				{ label: "印度", value: "India" },
				{ label: "墨西哥", value: "Mexico" },
				{ label: "南非", value: "SouthAfrica" },
				{ label: "法国", value: "France" },
				{ label: "荷兰", value: "Netherlands" },
				{ label: "德国", value: "Germany" },
			];
		},
	}),
});
@customElement("auto-form-lazy-select")
class AutoFormLazySelect extends LitElement {
	//@ts-expect-error
	@query("auto-form")
	from?: any;

	updated() {
		this.from?.bind(store);
	}
	static styles = css``;
	render() {
		return html`<div
            style="padding: 1em; border: var(--auto-border);margin: 1em; position: relative"
        >
            <auto-form labelpos="left"></auto-form>
        </div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"auto-form-lazy-select": AutoFormLazySelect;
	}
}
