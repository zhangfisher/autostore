/**
 * 级联选择器和树形选择示例
 * 演示复杂的数据选择组件
 */

import { customElement, query } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import { AutoStore, configurable, delay } from 'autostore';
import { cars, orgTree } from '../../shared/mock-data';
import '../../../src';



@customElement('example-cascader-tree')
class CascaderTreeExample extends LitElement {
	state = {
		user: {
			// 车型级联选择
			car: configurable('1#1-1', {
				label: '车型选择',
				widget: 'cascader',
				placeholder: '选择车型',
				choices: cars,
				icon: 'car',
				help: '使用#分隔符：品牌#型号#配置',
				delimiter: '#',
			}),
			// 行政区划级联选择
			address: configurable('', {
				label: '行政区划',
				widget: 'cascader',
				placeholder: '选择地区',
				choices: async () => {
					// 模拟异步加载
					await delay(500);
					return [
						{
							label: '福建省',
							value: '350000',
							children: [
								{ label: '泉州市', value: '350500', children: [
									{ label: '丰泽区', value: '350503' },
									{ label: '鲤城区', value: '350505' },
									{ label: '洛江区', value: '350504' },
								]},
							]
						},
						{
							label: '广东省',
							value: '440000',
							children: [
								{ label: '深圳市', value: '440300', children: [
									{ label: '南山区', value: '440305' },
									{ label: '福田区', value: '440304' },
									{ label: '罗湖区', value: '440303' },
								]},
							]
						},
					];
				},
				icon: 'map-pin',
				labelKey: 'label',
				valueKey: 'value',
				idKey: 'value',
				maxLevel: 3,
			}),
			// 树形多选组织架构
			departments: configurable([], {
				label: '所属部门',
				widget: 'tree-select',
				multiple: true,
				valueKey: 'label',
				onlySelectLeaf: false,
				items: orgTree,
				help: '可以选择多个部门',
			}),
		},
};

	//@ts-ignore
	@query('auto-form')
	formRef?: any;

	/**
	 * 内部 store（由 <auto-form> 创建，经 activeStore 代理访问）
	 */
	get store(): any {
		return this.formRef?.activeStore;
	}

	connectedCallback(): void {
		super.connectedCallback();

		this.updateComplete.then(() => {
			this.store?.watch(() => {
				console.log('用户选择:', this.store.state);
			});
		});
	}

	render() {
		return html`
			<div style="max-width: 800px; margin: 0 auto; padding: 1rem;">
				<h3 style="margin: 0 0 1rem 0; color: var(--auto-primary);">
					级联选择器和树形选择示例
				</h3>
				<p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
					演示复杂的数据选择：车型级联、行政区划、组织架构树形选择
				</p>

				<auto-form
					.state="${this.state}"
					data-label="用户信息"
					data-icon="organization"
					style="min-height: 500px;"
				>
				</auto-form>

				<div style="margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap;">
					<sl-button @click="${this._reset}" variant="neutral">
						<sl-icon name="refresh" slot="prefix"></sl-icon>
						重置选择
					</sl-button>
					<sl-button @click="${this._logSelection}" variant="primary">
						<sl-icon name="list" slot="prefix"></sl-icon>
						查看选择
					</sl-button>
				</div>

				<div style="margin-top: 2rem; padding: 1rem; background: #fef3c7; border-radius: 8px;">
					<h4 style="margin: 0 0 1rem 0;">🌳 组件特性说明</h4>
					<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
						<div>
							<strong>Cascader（级联选择）</strong>
							<p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">
								支持多层级联数据，可自定义分隔符、标签键和值键
							</p>
						</div>
						<div>
							<strong>Tree Select（树形选择）</strong>
							<p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">
								支持树形结构数据，可选择单个或多个节点
							</p>
						</div>
						<div>
							<strong>异步加载</strong>
							<p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">
								支持异步数据加载和懒加载，提升性能
							</p>
						</div>
						<div>
							<strong>自定义配置</strong>
							<p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">
								支持自定义图标、占位符、帮助文本等
							</p>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	private _reset() {
		this.store.update((state) => {
			state.user.car = '1#1-1';
			state.user.address = '';
			state.user.departments = [];
});
	}

	private _logSelection() {
		console.log('当前选择:', this.store.state.user);
		alert('用户选择：\n' + JSON.stringify(this.store.state.user, null, 2));
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'example-cascader-tree': CascaderTreeExample;
	}
}

export default CascaderTreeExample;