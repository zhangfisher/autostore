import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import type { AutoForm } from "../src/form";

@customElement("auto-form-debuger")
class AutoFormDebuger extends LitElement {
	static styles = css`
        .toolbar{
            display: flex;
            flex-direction: column;
            align-items: stretch;
            position: relative;
            background-color: var(--auto-bgcolor);
            border-radius: 4px;
            padding: 8px;
            gap:0.5rem;
            & > *{
                flex-grow: 1;
                display:flex;
                flex-direction: row;                
                align-items: center;
                position: relative;
                text-align:left;                
                gap:0.5rem;
            }
        }
    `;
	/**
	 * 获取下一下autoform表单元素
	 */
	getNextAutoForm() {
		// 获取当前元素的下一个兄弟节点开始遍历
		let nextNode = this.nextElementSibling;

		// 遍历后续的兄弟节点
		while (nextNode) {
			// 检查节点是否是auto-form元素
			if (nextNode.tagName.toLowerCase() === "auto-form") {
				return nextNode as HTMLElement;
			}
			nextNode = nextNode.nextElementSibling;
		}

		// 如果没有找到则返回null
		return null;
	}
	onToggleDark(e) {
		const ele = this.getNextAutoForm();
		if (ele) {
			if (e.target.checked) {
				ele.setAttribute("dark", "");
			} else {
				ele.removeAttribute("dark");
			}
		}
	}
	onChangelabelPos(e) {
		const ele = this.getNextAutoForm();
		if (ele) {
			// @ts-ignore
			ele.labelPos = e.target.value;
		}
	}
	onToggleReadonly(e) {
		const ele = this.getNextAutoForm();
		if (ele) {
			if (e.target.checked) {
				ele.setAttribute("readonly", "");
			} else {
				ele.removeAttribute("readonly");
			}
		}
	}
	onToggleAdvanced(e) {
		const ele = this.getNextAutoForm();
		if (ele) {
			if (e.target.checked) {
				ele.setAttribute("advanced", "");
			} else {
				ele.removeAttribute("advanced");
			}
		}
	}
	onChangeViewAlign(e) {
		const ele = this.getNextAutoForm();
		if (ele) {
			ele.setAttribute("viewAlign", e.target.value);
		}
	}
	onChangeGroup(e) {
		const ele = this.getNextAutoForm();
		if (ele) {
			ele.setAttribute("group", e.target.value);
		}
	}
	onChangeBorder(e) {
		const ele = this.getNextAutoForm();
		if (ele) {
			ele.setAttribute("border", e.target.value);
		}
	}
	onChangeSize(e) {
		const ele = this.getNextAutoForm();
		if (ele) {
			ele.setAttribute("size", e.target.value);
		}
	}
	onToggleView(e) {
		const ele = this.getNextAutoForm();
		if (ele) {
			if (e.target.checked) {
				ele.setAttribute("viewonly", "");
			} else {
				ele.removeAttribute("viewonly");
			}
		}
	}

	onToggleCompact(e) {
		const ele = this.getNextAutoForm();
		if (ele) {
			if (e.target.checked) {
				ele.setAttribute("compact", "");
			} else {
				ele.removeAttribute("compact");
			}
		}
	}
	getJson() {
		return {
			user: {
				name: "张三",
				age: 18,
				admin: true,
				certificate: 1,
				email: "<EMAIL>",
				color: "#ff0000",
				qrcode: "www.voerkai18n.com",
				notes: "输入简历",
				address: {
					city: "北京",
					street: "长安街",
				},
			},
			orders: [
				{ id: 1, name: "iphone12", price: 10000, count: 10000, date: "2021-01-01" },
				{ id: 2, name: "iphone12", price: 10000, count: 10000, date: "2021-01-01" },
			],
		};
	}
	onSubmit() {
		const form = this.getNextAutoForm() as AutoForm;
		if (form) {
			form.submit((values, errors) => {
				console.log("errors=", errors);
				console.log("values=", JSON.stringify(values));
			});
		}
	}

	onReset() {
		const form = this.getNextAutoForm() as AutoForm;
		if (form) {
			form.reset();
		}
	}
	onShowGroup() {
		const form = this.getNextAutoForm() as AutoForm;
		if (form) {
			form.group = "a";
		}
	}

	onChangePath() {
		const form = this.getNextAutoForm() as AutoForm;
		if (form) {
			form.path = "a.b.c,b.x";
		}
	}
	onChangeHelpPos(e: any) {
		const form = this.getNextAutoForm() as AutoForm;
		if (form) {
			form.setAttribute("helppos", e.target.value);
		}
	}
	render() {
		return html`
            <div class="auto-card">
                <div class="auto-card-header">表单配置</div>
                <div class="auto-card-body">
                    <sl-select label="标签位置" style="width:120px;" value="top" @sl-change=${this.onChangelabelPos.bind(this)}>
                        <sl-option value="top">上方</sl-option>
                        <sl-option value="left">左侧</sl-option>
                        <sl-option value="none">隐藏</sl-option>
                    </sl-select>   
                    <sl-select label="尺寸" style="width:100px;" value="medium" @sl-change=${this.onChangeSize.bind(this)}>
                        <sl-option value="small">小</sl-option>
                        <sl-option value="medium">中</sl-option>
                        <sl-option value="large">大</sl-option>
                    </sl-select>   
                    <sl-select label="帮助信息" style="width:120px;" value="label" @sl-change=${this.onChangeHelpPos.bind(this)}>
                        <sl-option value="label">标签</sl-option>
                        <sl-option value="value">值</sl-option>
                    </sl-select>  
                    <sl-select label="浏览对齐" style="width:150px;" value="right" @sl-change=${this.onChangeViewAlign.bind(this)}>
                        <sl-option value="left">左对齐</sl-option>
                        <sl-option value="center">居中</sl-option>
                        <sl-option value="right">右对齐</sl-option>
                    </sl-select> 
                    <sl-select label="显示组" style="width:120px;" value="right" @sl-change=${this.onChangeGroup.bind(this)}>
                        <sl-option value="a">A组</sl-option>
                        <sl-option value="b">B组</sl-option>
                        <sl-option value="c">C组</sl-option>
                        <sl-option value="a,b">A,B组</sl-option> 
                        <sl-option value="b,c">B,C组</sl-option> 
                        <sl-option value="*">全部</sl-option>
                    </sl-select>  
                    
                    <sl-select label="网格线" style="width:120px;" value="right" @sl-change=${this.onChangeBorder.bind(this)}>
                        <sl-option value="none">不显示</sl-option>
                        <sl-option value="outline">仅外边框</sl-option>
                        <sl-option value="grid">显示</sl-option>
                    </sl-select>   
                </div>
                <div>
                    <sl-checkbox @click=${this.onToggleDark.bind(this)}>暗色调</sl-checkbox>                    
                    <sl-checkbox @click=${this.onToggleReadonly.bind(this)}>只读</sl-checkbox>                    
                    <sl-checkbox @click=${this.onToggleView.bind(this)}>浏览视图</sl-checkbox>                    
                    <sl-checkbox @click=${this.onToggleCompact.bind(this)}>紧凑模式</sl-checkbox>                    
                    <sl-checkbox @click=${this.onToggleAdvanced.bind(this)}>高级选项</sl-checkbox>                    
                </div>
                <div>
                    <sl-button @click=${this.onSubmit.bind(this)}>提交</sl-button>
                    <sl-button @click=${this.onReset.bind(this)}>重置</sl-button>  
                    <sl-button @click=${this.onChangePath.bind(this)}>改变路径</sl-button>  
                </div>               
            </div>
        `;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"auto-form-debuger": AutoFormDebuger;
	}
}
