/**
 *
 *  通过双向绑定表单
 *
 *  用于实现Form与AutoStore的双向绑定
 *
 *  根据autostore的schema生成表单
 *
 *  schema.widget用来指定字段类型
 *
 *
 *
 *  - 用法：
 *
 *  <voerka-form
 *      .store=${store}
 *      entry="指定store的entry，没有指定时使用整个store"
 *      group=""
 *  >
 *
 *  </voerka-form>
 *
 */

import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/input/input.js";
import "@shoelace-style/shoelace/dist/components/divider/divider.js";
import "@shoelace-style/shoelace/dist/components/dropdown/dropdown.js";
import "@shoelace-style/shoelace/dist/components/spinner/spinner.js";
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js";
import { LitElement, html } from "lit";
import { property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { unsafeStatic, html as shtml } from "lit/static-html.js";
import { pathStartsWith, AutoStore, type Dict, type AutoStoreStateSchema, ConfigManager } from "autostore";
import { context, type AutoFormContext } from "../context";
import { provide } from "@lit/context";
import { ContextController } from "@/controllers/context";
import { HostClasses } from "@/controllers/hostClasss";
import "../field";
import styles from "./styles";
import { applyClass } from "@/utils/applyClass";
import "../components";
import { registerIcons } from "@/utils";
import { cloneSchemaState } from "@/utils/cloneSchemaState";
import { SchemaAccessor } from "../schema/schemaAccessor";

export class AutoForm extends LitElement {
	static seq: number = 0;
	static styles = styles;
	classs = new HostClasses(this);
	ctxController = new ContextController(this);
	seq: number = ++AutoForm.seq;

	@provide({ context })
	//@ts-expect-error
	context: AutoFormContext = {};

	// 使用 SchemaAccessor 替代 schemas 兼容层
	private schemaAccessor?: SchemaAccessor;

	// 内部创建的 store 和 configManager（当使用 .state 属性时）
	private internalStore?: AutoStore<Dict>;
	private internalConfigManager?: ConfigManager;
	// 已用于初始化内部 store 的 state 对象引用
	// Lit 首次渲染时 .state 属性先于 connectedCallback 提交，会触发
	// connectedCallback 和 shouldUpdate 双重初始化；而 AutoStore 建立响应式
	// 时会原位消费 configurable() builder，第二次用同一对象建 store 拿到
	// 0 个 schema。用引用相等跳过同对象重复初始化。
	private _lastInitState?: Dict;

	@state()
	schemas: AutoStoreStateSchema[] = [];

	@property({ type: Object })
	store?: AutoStore<Dict>;

	/**
	 * 获取当前使用的 store（优先使用内部 store）
	 */
	get activeStore(): AutoStore<Dict> | undefined {
		return this.internalStore || this.store;
	}

	/**
	 * 状态定义（推荐使用）
	 *
	 * 传入状态定义对象，AutoForm 将内部创建 AutoStore 和 ConfigManager
	 * 这是 AutoForm 的标准使用方式，确保 configManager 可用
	 *
	 * @example
	 * <auto-form .state=${{ user: { name: configurable('', { title: '姓名' }) } }}>
	 * </auto-form>
	 */
	@property({ type: Object })
	state?: Dict;

	/**
	 * 是不显示初始错误
	 *
	 * 比如
	 * field.username 要求长度大于>3
	 * 但是在初始化时，而默认会执行一次校验，但是由于此时没有输入任何值
	 * 所以会显示错误
	 * 此开关可以在让字段在初始化时不显示错误信息
	 *
	 *
	 */
	@property({ type: Boolean, reflect: true })
	validAtInit: boolean = false;

	@property({ type: String, reflect: true })
	group?: string;

	@property({ type: String, reflect: true })
	icon?: string;

	/**
	 * 指定一个路径，用于过滤状态路径
	 *
	 * 只有指定路径下的schema才会被渲染显示。
	 *
	 * 如：
	 * <auto-form path="user.order,profile.add"></autoform>
	 *
	 * 多个路径使用,分割
	 *
	 */
	@property({ type: String, reflect: true })
	path?: string;

	/**
	 * 压缩字段之间的空白
	 */
	@property({ type: Boolean, reflect: true })
	compact: boolean = false;

	/**
	 * 是否显示高级选项
	 */
	@property({ type: Boolean, reflect: true })
	advanced?: boolean;

	/**
	 * 确定字段校验时机
	 *
	 * - input:  输入时进行校验
	 * - lost-focus: 失去焦点时进行校验
	 */
	@property({ type: String, reflect: true })
	validAt: "input" | "lost-focus" = "lost-focus";

	/**
	 * 显示网格线
	 * border:  none | outline | grid
	 */
	@property({ type: String, reflect: true })
	border: "none" | "outline" | "grid" = "grid";

	/**
	 * 显示网络
	 */
	@property({ type: String })
	size: "small" | "medium" | "large" = "medium";

	/**
	 * 标签位置
	 * 取值：
	 * - none: 不显示标签
	 * - top: 标签在上方
	 * - left: 标签在左侧
	 */
	@property({ type: String, reflect: true })
	labelPos: string = "top";

	@property({ type: String, reflect: true })
	labelWidth?: string = "7em";

	@property({ type: Boolean, reflect: true })
	dark: boolean = false;

	/**
	 * 只读模式
	 */
	@property({ type: Boolean, reflect: true })
	readonly: boolean = false;

	/**
	 * 浏览模式
	 */
	@property({ type: Boolean, reflect: true })
	viewonly: boolean = false;

	/**
	 * 浏览模式下，值对齐方式，默认=right
	 */
	@property({ type: String, reflect: true })
	viewAlign: "left" | "center" | "right" = "right";

	/**
	 * 布局
	 * - auto：使用inline-block布局,或者叫流式布局
	 * - col: 使用flex:col布局
	 * - row: 使用flex:row布局
	 */
	@property({ type: String, reflect: true })
	layout: "auto" | "row" | "col" = "auto";

	@property({ type: String, reflect: true })
	icons?: string;

	get dirty() {
		return this.context.dirty;
	}

	get invalid() {
		return this.context.invalid;
	}

	connectedCallback(): void {
		super.connectedCallback();

		// 模式 1：使用 .state 属性（推荐）
		if (this.state && !this.store) {
			if (this._lastInitState !== this.state) {
				this._initializeInternalStore();
			}
		}
		// 模式 2：使用 .store 属性（需要确保有 configManager）
		else if (this.store) {
			this._validateExternalStore();
			this._initializeWithStore(this.store);
		}
		// 既没有 state 也没有 store
		else {
			console.warn('[AutoForm] 既没有 .state 也没有 .store 属性，无法初始化');
			return;
		}

		registerIcons();
	}

	/**
	 * 初始化内部 AutoStore 和 ConfigManager（标准模式）
	 */
	private _initializeInternalStore() {
		console.log('[AutoForm] 使用标准模式：内部创建 AutoStore + ConfigManager');

		// 创建 ConfigManager（configKey='' 专用于此 AutoForm）
		this.internalConfigManager = new ConfigManager({
			load: () => ({}),
		});

		// 创建 AutoStore 并传入 ConfigManager
		// 注意：AutoStore 建立响应式时会原位消费 state 对象中的 configurable()
		// builder，因此传入深拷贝（函数保留引用），避免消费掉外部持有的原始定义对象
		this.internalStore = new AutoStore(cloneSchemaState(this.state), {
			configManager: this.internalConfigManager,
			configKey: '', // 空字符串，configManager 专用于此 AutoForm
		});
		this._lastInitState = this.state;

		// 使用内部 store
		this._initializeWithStore(this.internalStore);
	}

	/**
	 * 验证外部 store 的 configManager（兼容模式）
	 */
	private _validateExternalStore() {
		if (!this.store) {
			console.error('[AutoForm] .store 属性不存在');
			return;
		}

		if (!this.store.configManager) {
			console.error(
				'[AutoForm] 使用 .store 属性时，store 必须有 configManager！' +
				'请创建 ConfigManager 并传入：new AutoStore(state, { configManager }) ' +
				'或使用推荐的 .state 属性让 AutoForm 自动创建。'
			);
			throw new Error('AutoForm requires store to have a configManager when using .store property');
		}
	}

	/**
	 * 使用指定的 store 初始化
	 */
	private _initializeWithStore(store: AutoStore<Dict>) {
		// 初始化 SchemaAccessor
		this.schemaAccessor = new SchemaAccessor(store);

		// 设置初始上下文（传入实际使用的 store——内部模式下 this.store 属性为空，
		// 直接读 this.store 会把 undefined 注入给字段，导致字段 options 永不初始化）
		this._initialContext(store);

		// 加载 schemas
		this._loadSchemas();
	}

	shouldUpdate(changedProperties: Map<string, any>) {
		// .state 属性变化时重新初始化
		if (changedProperties.has("state")) {
			// 同一 state 对象引用的重复触发（Lit 首渲染期 connectedCallback 已初始化过）直接跳过
			if (this._lastInitState === this.state) return true;

			// 清理旧的内部资源
			if (this.internalConfigManager) {
				this.internalConfigManager.remove(this.internalStore!);
			}

			// 重新初始化
			this._initializeInternalStore();
		}
		// .store 属性变化时重新初始化
		else if (changedProperties.has("store")) {
			if (this.store) {
				this._validateExternalStore();
				this._initializeWithStore(this.store);
			}
		}

		return true;
	}

	_initialContext(store?: AutoStore<Dict>) {
		Object.assign(this.context, {
			store: store || this.activeStore,
			form: this,
			labelPos: this.labelPos,
			labelWidth: this.labelWidth,
			viewAlign: this.viewAlign,
			border: this.border,
			group: this.group,
			advanced: this.advanced,
			dark: this.dark,
			dirty: false,
			invalid: this._isValid(),
			validAtInit: this.validAtInit,
		});
	}

	_isValid(): boolean {
		const configManager = this.store?.configManager;
		if (!configManager) return false;

		if (this.path) {
			const errors = configManager.errors || {};
			const pathParts = this.path.split(".");
			return Object.keys(errors).some((key) => {
				return pathStartsWith(pathParts, key.split("."));
			});
		} else {
			return Object.keys(configManager.errors || {}).length > 0;
		}
	}

	/**
	 * 从 configManager 加载 schemas
	 */
	private _loadSchemas() {
		if (!this.schemaAccessor) {
			console.warn('[AutoForm] schemaAccessor not initialized');
			return;
		}

		const allSchemas = this.schemaAccessor.getAllSchemas();
		console.log('[AutoForm] Loaded schemas:', allSchemas);

		let schemaArray = Object.entries(allSchemas).map(([path, schema]) => ({
			...schema,
			path: path.split('.') // 添加路径信息到 schema
		}));

		console.log('[AutoForm] Schema array count:', schemaArray.length);

		// 应用过滤
		schemaArray = schemaArray.filter((schema) => this._matchesGroup(schema));
		schemaArray = schemaArray.filter((schema) => this._matchesAdvanced(schema));
		schemaArray = schemaArray.filter((schema) => this._matchesPath(schema));

		// 按顺序排序
		schemaArray.sort((a, b) => (a.order || 0) - (b.order || 0));

		console.log('[AutoForm] Final schemas count:', schemaArray.length);
		this.schemas = schemaArray;
		this.requestUpdate();
	}

	private _matchesGroup(schema: AutoStoreStateSchema): boolean {
		if (!this.group) return true;

		const fieldGroups = (schema.group || "").split(",");
		const groups = this.group.split(",");
		return fieldGroups.some((g) => groups.includes(g));
	}

	private _matchesAdvanced(schema: AutoStoreStateSchema): boolean {
		if (this.advanced === false && schema.advanced) return false;
		return true;
	}

	private _matchesPath(schema: AutoStoreStateSchema & { path?: string[] }): boolean {
		if (!this.path) return true;

		const fieldPath = schema.path || [];
		const paths = this.path.split(",").map(p => p.trim().split("."));

		// 检查字段路径是否以任意一个指定路径开头
		return paths.some(basePath => {
			if (fieldPath.length < basePath.length) return false;
			return basePath.every((part, index) => fieldPath[index] === part);
		});
	}

	bind(store: AutoStore<Dict>) {
		if (!store) return;

		// 验证外部 store
		if (!store.configManager) {
			console.error('[AutoForm] bind() 方法的 store 必须有 configManager');
			return;
		}

		this.store = store;
		this._initializeWithStore(store);
	}

	/**
	 * 清除所有错误信息
	 */
	clearErrors() {
		const configManager = this.activeStore?.configManager;
		if (configManager) {
			// 通过更新来清除错误
			this.activeStore?.update(() => {
				// 触发验证重新计算
			});
		}

		const fields = Array.from(this.shadowRoot!.querySelectorAll(".fields > *")) as HTMLElement[];
		fields.forEach((field) => {
			if (field.tagName.startsWith("auto-field")) {
				(field as any).invalidTips = undefined;
			}
		});
		this.requestUpdate();
	}

	/**
	 * 完全声明式渲染，直接在模板中使用自定义元素
	 */
	render() {
		this.classs.use(this.size, {
			dark: this.context.dark,
			[`${this.labelPos}-label`]: true,
			[`view-${this.viewAlign}`]: true,
			compact: this.compact,
			dirty: this.context.dirty,
			invalid: this.invalid,
		});

		// 直接在模板中使用自定义元素标签
		return html`
            <div class="actions header"></div>
            <div class="fields">
				${repeat(this.schemas,
						(_schema, index) => `field-${index}`,
					(schema) => this._renderField(schema)
				)}
            </div>
            <div class="actions footer"></div>
        `;
	}

	private _renderField(schema: AutoStoreStateSchema) {
		const widget = schema.widget || 'input';
		// Lit 不支持在标签名位置使用绑定。unsafeStatic 产生的静态片段
		// 必须配合 static-html 导出的静态版 html 标签函数使用
		const tag = unsafeStatic(`auto-field-${widget}`);

		return shtml`
			<${tag}
				.schema=${schema}
				part="field"
				exportparts="field-value,field-label,field-help"
				size=${this.size}
			></${tag}>
		`;
	}

	reset() {
		this.activeStore?.reset();
		this._initialContext();
		applyClass(this, "dirty", false);
		applyClass(this, "invalid", false);
	}

	submit(callback: (values: Record<string, string>, errors?: Record<string, string>) => void) {
		if (typeof callback === "function") {
			const configManager = this.activeStore?.configManager;
			const configKey = this.activeStore?.options.configKey || "";
			const keyPrefix = configKey ? `${configKey}.` : "";

			const values = configManager ? Object.entries(configManager.state).reduce((acc: any, [key, schema]: [string, any]) => {
				// 移除 configKey 前缀
				const relativeKey = key.substring(keyPrefix.length);
				acc[relativeKey] = schema.value;
				return acc;
			}, {}) : {};

			const errors = configManager ? configManager.errors : {};
			callback(values, errors);
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"auto-form": AutoForm;
	}
}

if (!customElements.get("auto-form")) {
	customElements.define("auto-form", AutoForm);
}