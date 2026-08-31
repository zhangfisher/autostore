/**
 * 输入组件示例
 * 演示各种输入组件的使用
 */

import { customElement, query } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import { AutoStore, configurable } from 'autostore';
import '@autostorejs/form';

@customElement('example-input-widgets')
class InputWidgetsExample extends LitElement {
	state = {
		inputs: {
			username: configurable('', {
				label: '用户名',
				required: true,
				placeholder: '请输入用户名',
				maxLength: 20,
			}),
			password: configurable('', {
				label: '密码',
				widget: 'password',
				required: true,
				placeholder: '请输入密码',
				minLength: 6,
				maxLength: 20,
			}),
			email: configurable('', {
				label: '邮箱',
				widget: 'email',
				placeholder: 'example@domain.com',
			}),
			phone: configurable('', {
				label: '电话',
				widget: 'phone',
				placeholder: '13800138000',
			}),
			website: configurable('', {
				label: '个人网站',
				widget: 'url',
				placeholder: 'https://example.com',
			}),
			bio: configurable('', {
				label: '个人简介',
				widget: 'textarea',
				placeholder: '请输入个人简介',
				maxLength: 200,
			}),
			notes: configurable('', {
				label: '备注',
				widget: 'textarea',
				rows: 4,
				placeholder: '可以输入多行文本',
			}),
		},
};

	//@ts-ignore
	@query('auto-form')
	formRef?: any;

	connectedCallback(): void {
		super.connectedCallback();

		this.store.watch(() => {
			console.log('当前状态:', this.store.state);
};
	}

	updated() {
		if (this.formRef && !this.formRef.store) {
			this.formRef.store = this.store;
		}
	}

	render() {
		return html`
			<div style="max-width: 600px; margin: 0 auto; padding: 1rem;">
				<h3 style="margin: 0 0 1rem 0; color: var(--auto-primary);">
					输入组件示例
				</h3>
				<p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
					演示各种输入组件：文本、密码、邮箱、电话、网址、文本域等
				</p>

				<auto-form
					data-name="inputs"
					data-label="输入组件"
					style="min-height: 500px;"
				>
				</auto-form>

				<div style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;">
					<h4 style="margin: 0 0 1rem 0;">💡 提示</h4>
					<ul style="margin: 0; padding-left: 1.5rem;">
						<li>用户名：必填，最多20个字符</li>
						<li>密码：必填，6-20个字符，使用密码组件</li>
						<li>邮箱：使用专门的邮箱组件，有格式验证</li>
						<li>电话：使用电话组件，支持手机号格式</li>
						<li>个人网站：使用URL组件，支持https://格式</li>
						<li>备注：多行文本输入，最多200字符</li>
					</ul>
				</div>
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'example-input-widgets': InputWidgetsExample;
	}
}

export default InputWidgetsExample;