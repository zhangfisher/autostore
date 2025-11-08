import type { ComputedBuilder } from "../../computed/types";
import { VALUE_SCHEMA_BUILDER_FLAG } from "../../consts";
import type { AutoStore } from "../../store";
import type { ComputedState, Dict, GetTypeByPath, MutableRecord, StatePath, ToRawType } from "../../types";
import type {
	SchemaCaptchaWidgetOptions,
	SchemaCascaderWidgetOptions,
	SchemaCheckboxGroupWidgetOptions,
	SchemaCheckboxWidgetOptions,
	SchemaColorPickerWidgetOptions,
	SchemaCombineWidgetOptions,
	SchemaCustomWidgetOptions,
	SchemaDateRangeWidgetOptions,
	SchemaDateTimeWidgetOptions,
	SchemaDateWidgetOptions,
	SchemaEmailWidgetOptions,
	SchemaIconsWidgetOptions,
	SchemaInputWidgetOptions,
	SchemaIpAddressWidgetOptions,
	SchemaListWidgetOptions,
	SchemaNumberWidgetOptions,
	SchemaPartsWidgetOptions,
	SchemaPasswordWidgetOptions,
	SchemaPhoneWidgetOptions,
	SchemaQrCodeWidgetOptions,
	SchemaRadioButtonWidgetOptions,
	SchemaRadioWidgetOptions,
	SchemaRangeWidgetOptions,
	SchemaRatingWidgetOptions,
	SchemaSearchWidgetOptions,
	SchemaSelectWidgetOptions,
	SchemaSwitchWidgetOptions,
	SchemaTextareaWidgetOptions,
	SchemaTimeWidgetOptions,
	SchemaTreeDropdownWidgetOptions,
	SchemaTreeSelectWidgetOptions,
	SchemaUploadWidgetOptions,
	SchemaURLWidgetOptions,
	SchemaVerifyCodeWidgetOptions,
} from "./widgets";

// 让对象的成员值允许是ComputedBuilder，可计算值
export type Computedable<Obj extends Record<string, any>> = {
	[Key in keyof Obj]:
		| Obj[Key]
		| (Obj[Key] extends (...args: any[]) => any
				? never
				: Key extends "name" | "widget" | "path" | "actions" | "items"
					? never
					: ComputedBuilder<Obj[Key], any>);
};
export type SchemaValidate<Value = any> = (newValue: Value, oldValue: Value, path: string[]) => boolean;

export type SchemaValidator<Value = any> = {
	// 校验函数
	validate: SchemaValidate<Value>;
	// 当验证失败时的行为
	// pass: 继续写入; ignore: 静默忽略; throw: 触发ValidateError错误; 验证失败信息会更新到validators.errors中
	// throw-pass: 写入数据但同时抛出ValidateError错误
	onFail?: "pass" | "throw" | "ignore" | "throw-pass";
	// 校验失败时的错误信息
	message?: string | ((e: Error, path: string[], newValue: Value, oldValue: Value) => string);
};

export type ISchemaObject<Value = any, Extras extends Dict = Dict> = {
	[VALUE_SCHEMA_BUILDER_FLAG]: true;
	path: string[];
	value: ToRawType<Value>;
} & Extras;

export type RemoveSchemaFlags<T extends Dict> = {
	[K in keyof T as K extends typeof VALUE_SCHEMA_BUILDER_FLAG ? never : K]: T[K];
};

export type SchemaKeyPaths<State> = Exclude<
	keyof {
		[K in StatePath<State> as GetTypeByPath<State, K> extends {
			[VALUE_SCHEMA_BUILDER_FLAG]: true;
		}
			? K
			: GetTypeByPath<State, K> extends Array<infer Item>
				? Item extends { [VALUE_SCHEMA_BUILDER_FLAG]: true }
					? `${K}.${number}`
					: never
				: never]: any;
	},
	number | symbol
>;

// 根据路径获取Schema
export type GetSchemaOptionsByPath<State extends Dict, P extends string = string> = Required<
	ComputedState<GetTypeByPath<State, P>["options"]>
>;

export interface SchemaWidgetTreeNode {
	id: string | number;
	label?: string;
	enable?: boolean;
	selected?: boolean;
	icon?: string;
	children?: SchemaWidgetTreeNode[]; //Array<SchemaWidgetTreeNode>
}

export type SchemaWidgetStyles = Record<string, string | Record<string, string>>;
export type SchemaWidgetClasss = Record<string, string>;

export type AutoFormContext = {
	store: AutoStore<any>;
	form: any;
	labelPos: "top" | "left" | "none";
	advanced: boolean;
	dark: boolean;
};

export type SchemaWidgetAction<State = Dict> = {
	id?: string;
	label?: string;
	icon?: string;
	pos?: "before" | "after";
	type?: "button" | "dropdown" | "image" | string;
	url?: string;
	size?: "small" | "medium" | "large";
	tips?: string;
	variant?: "primary" | "neutral" | "success" | "danger" | "warning" | "default";
	// 代表是否默认
	default?: boolean;
	checked?: boolean;
	value?: any;
	caret?: boolean;
	// 当type=dropdown时，单击下拉菜单时，将下拉菜单的label和图标更新到触发按钮上
	syncMenu?: boolean;
	onClick?: (
		value: any,
		ctx: {
			action: SchemaWidgetAction;
			options: SchemaOptions;
			event: Event;
			update: (value: any) => void;
		},
	) => void;
	disabled?: boolean | ComputedBuilder<boolean, State>;
	visible?: boolean | ComputedBuilder<boolean, State>;
	// 如果指定了items，则渲染为Dropdown
	items?: (SchemaWidgetAction<State> | string)[];
};

export type SchemaWidgetSelectItem<Value = any> = {
	id?: any;
	label?: string;
	value?: ToRawType<Value>;
	tips?: string;
	help?: string;
	default?: boolean;
	enable?: boolean;
	icon?: string;
} & Record<string, any>;

export type SchemaWidgetShareOptions<Value, State> = {
	name?: string;
	path?: string[];
	datatype?: string;
	required?: boolean;
	visible?: boolean;
	enable?: boolean;
	description?: string;
	size?: string | number;
	icon?: string;
	// 用于验证
	invalidTips?: string | ((e: Error, path: string[], newValue: Value, oldValue: Value) => string);
	onValidate?: (newValue: Value, oldValue: Value, path: string[]) => boolean;
	/**
	 *
	 * 当校验失败时的行为
	 *
	 * pass: 继续写入;
	 * ignore: 静默忽略;
	 * throw: 触发ValidateError错误; 验证失败信息会更新到validators.errors中
	 *
	 *
	 */
	onFail?: "pass" | "throw" | "ignore" | "throw-pass";
	// 提供一些元数据
	label?: string;
	labelPos?: string;
	// 帮助信息可以增加一个链接，如"至少需要增加(http://www.baidu.com)"
	help?: string;
	placeholder?: string;
	group?: string;
	advanced?: boolean;
	order?: number;
	width?: number | string;
	height?: number | string;
	/**
	 *  是否在前面显示一条分割线
	 *  当不显示网格线是生效
	 * */
	divider?: boolean;
	viewAlign?: "left" | "center" | "right"; // viewonly模式下显示方式
	tips?: string;
	select?: Record<string, any> | (SchemaWidgetSelectItem<Value> | string | number)[];
	// 转换数据
	toView?: (value: any) => any;
	toState?: (value: any) => any;
	toInput?: (value: any) => any;
	toRender?: (value: any) => any;
	actions?: SchemaWidgetAction<State>[];
	// 用于扩展widget样式，如{"<选择器>":"样式"}
	styles?: SchemaWidgetStyles;
	// 用于扩展widget类，如{"<选择器>":"类名"}
	classs?: SchemaWidgetClasss;
};

export type SchemaOptions<Value = any, State = Dict> = MutableRecord<
	{
		input: SchemaInputWidgetOptions;
		select: SchemaSelectWidgetOptions;
		textarea: SchemaTextareaWidgetOptions;
		range: SchemaRangeWidgetOptions;
		radio: SchemaRadioWidgetOptions;
		captcha: SchemaCaptchaWidgetOptions;
		rating: SchemaRatingWidgetOptions;
		verifycode: SchemaVerifyCodeWidgetOptions;
		checkbox: SchemaCheckboxWidgetOptions;
		switch: SchemaSwitchWidgetOptions;
		date: SchemaDateWidgetOptions;
		time: SchemaTimeWidgetOptions;
		datetime: SchemaDateTimeWidgetOptions;
		ipaddress: SchemaIpAddressWidgetOptions;
		colorpicker: SchemaColorPickerWidgetOptions;
		url: SchemaURLWidgetOptions;
		number: SchemaNumberWidgetOptions;
		password: SchemaPasswordWidgetOptions;
		qrcode: SchemaQrCodeWidgetOptions;
		email: SchemaEmailWidgetOptions;
		phone: SchemaPhoneWidgetOptions;
		search: SchemaSearchWidgetOptions;
		list: SchemaListWidgetOptions;
		upload: SchemaUploadWidgetOptions;
		parts: SchemaPartsWidgetOptions;
		custom: SchemaCustomWidgetOptions;
		combine: SchemaCombineWidgetOptions;
		icons: SchemaIconsWidgetOptions;
		cascader: SchemaCascaderWidgetOptions;
		"radio-button": SchemaRadioButtonWidgetOptions;
		"checkbox-group": SchemaCheckboxGroupWidgetOptions;
		"tree-dropdown": SchemaTreeDropdownWidgetOptions;
		"tree-select": SchemaTreeSelectWidgetOptions;
		"date-range": SchemaDateRangeWidgetOptions;
	},
	"widget",
	SchemaWidgetShareOptions<Value, State>,
	"input"
>;

export type ComputedableSchemaOptions<Value = any> = Computedable<SchemaOptions<Value>>;

export type SchemaDescriptor<Value = any, Options = Dict> = {
	datatype: "string" | "number" | "boolean" | "object" | "array" | "any" | string;
	value: Value;
	options: SchemaOptions<Value, Options>;
	/**
	 * 用于传递额外的标识
	 * 比如在进行syncer时，传入falgs==SYNC_INIT_FLAG
	 */
	flags?: number;
	pathMap?: Record<string, string>;
};

export interface SchemaDescriptorBuilder<Value = any, State = Dict> {
	[VALUE_SCHEMA_BUILDER_FLAG]: true;
	(): SchemaDescriptor<Value, State>;
}

// export type SchemaBuilder<Value = any> = <T = Value>(
//     value: T,
//     options?: ComputedableSchemaOptions<Value>,
// ) => SchemaDescriptorBuilder<ToRawType<T>>;

export interface SchemaBuilder<Value = any> {
	<T = Value>(value: T, options?: ComputedableSchemaOptions<Value>): SchemaDescriptorBuilder<ToRawType<T>>;
	(options?: ComputedableSchemaOptions<Value>): SchemaDescriptorBuilder<ToRawType<Value>>;
}

export type ConfigurableState<State extends Dict> = {
	[Key in SchemaKeyPaths<State>]: GetTypeByPath<ComputedState<State>, Key>;
};

export type SchemaState<State extends Dict> = ConfigurableState<State>;

export type ComputedSchemaState<State extends Dict> = {
	[Key in SchemaKeyPaths<State>]: (GetTypeByPath<State, Key> extends SchemaDescriptorBuilder<infer V, infer Options>
		? Options & { value: V }
		: GetTypeByPath<State, Key>) & {
		path: string[];
	};
};

export * from "./widgets";
