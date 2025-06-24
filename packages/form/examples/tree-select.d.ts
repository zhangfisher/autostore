import * as lit from 'lit';
import { LitElement, ReactiveController, ReactiveControllerHost, CSSResult } from 'lit';
import * as autostore from 'autostore';
import { ComputedSchemaState, SchemaOptions, AutoStore, Dict, AsyncComputedValue, SchemaWidgetAction, Watcher } from 'autostore';
import { IconLibraryResolver, IconLibrary } from '@shoelace-style/shoelace/dist/components/icon/library.js';
import { RequiredKeys } from 'flex-tools/types';

declare class AutoBox extends LitElement {
    static styles: lit.CSSResult;
    size: 'small' | 'medium' | 'large';
    shadow: boolean;
    noPadding: boolean;
    noRadius: boolean;
    noBorder: boolean;
    flex?: string;
    /**
     * 具有grow=1
     */
    grow?: 'first' | 'last' | 'all';
    /**
    * 具有shrink=0
    */
    shrink?: 'first' | 'last' | 'all';
    render(): lit.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'auto-box': AutoBox;
    }
}

declare class ThemeController implements ReactiveController {
    host: AutoForm;
    constructor(host: ReactiveControllerHost);
    hostConnected(): void;
    _toDark(): void;
    _toLight(): void;
    updateContext(): void;
    hostUpdate(): void;
}

/**
 * 用于为组件的host增加class
 *
 *  class MyElement extends LitElement {
 *      classes = new HostClasses({
 *         border: ()=>{return true},
 *      });
 *
 *      render(){
 *
 *          return html`<div class="${this.classes}">hello</div>`;
 *      }
 *  }
 *
 */
declare class HostClasses implements ReactiveController {
    host: HTMLElement;
    initialClasses: (string | Record<string, boolean>)[];
    constructor(host: any, ...classes: (string | Record<string, boolean>)[]);
    _forEachClasss(args: (string | Record<string, boolean>)[], cb: (cls: string, enable: boolean) => void): void;
    add(...args: (string | Record<string, boolean>)[]): void;
    remove(...args: (string | Record<string, boolean>)[]): void;
    toggle(...args: (string | Record<string, boolean>)[]): void;
    /**
     *
     * @param args
     * @returns
     */
    use(...args: (string | Record<string, boolean>)[]): void;
    has(className: string): boolean;
    /**
     * 当宿主元素连接到DOM时调用的生命周期方法
     */
    hostConnected(): void;
    hostDisconnected(): void;
    hostUpdate(): void;
}

declare class AutoForm extends LitElement {
    static seq: number;
    static styles: lit.CSSResult;
    classs: HostClasses;
    theme: ThemeController;
    context: AutoFormContext;
    schemas: ComputedSchemaState<SchemaOptions>[];
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
    showInitialError: boolean;
    group?: string;
    fields?: string;
    store?: AutoStore<Dict>;
    seq: number;
    /**
     *
     * 是否显示高级选项
     *
     */
    advanced: boolean;
    /**
     *
     * 显示网络
     *
     */
    grid: boolean;
    /**
     *
     * 显示网络
     *
     */
    size: 'small' | 'medium' | 'large';
    /**
     * 标签位置
     * 取值：
     * - none: 不显示标签
     * - top: 标签在上方
     * - left: 标签在左侧
     */
    labelPos: string;
    labelWidth?: string;
    dark: boolean;
    /**
     * 只读模式
     */
    readonly: boolean;
    /**
     * 只读模式
     */
    viewonly: boolean;
    /**
     *
     * 布局
     * - auto：使用inline-block布局,或者叫流式布局
     * - col: 使用flex:col布局
     * - row: 使用flex:row布局
     *
     */
    layout: 'auto' | 'row' | 'col';
    /**
     *
     * 注册图标库地址
     *
      
     *
     */
    iconLibrary: string;
    /**
     * 注册图标库
     *
     * registerIcons((name=?{})>)
     *
     *
     */
    registerIcons(resolver: IconLibraryResolver, options?: Omit<IconLibrary, 'name' | 'resolver'>): void;
    connectedCallback(): void;
    _load(): void;
    bind(store: AutoStore<Dict>): void;
    /**
     * 清除所有错误信息
     */
    clearErrors(): void;
    _renderWidget(schema: SchemaOptions): HTMLElement;
    _renderFields(): lit.TemplateResult<1>;
    render(): lit.TemplateResult<1>;
    reset(): void;
    submit(callback: (values: Record<string, string>, errors?: Record<string, string>) => void): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'auto-form': AutoForm;
    }
}

type AutoFormContext = {
    store: AutoStore<Dict>;
    form: AutoForm;
    labelPos?: 'none' | 'top' | 'left';
    labelWidth: string;
    readonly: boolean;
    viewonly: boolean;
    helpPos?: 'auto' | 'value' | 'label';
    grid: boolean;
    dark: boolean;
    size: 'small' | 'medium' | 'large';
    dirty: boolean;
    showInitialError: boolean;
};

/**
 *
 * 用于提取已知属性的类型
 *
 * type Ops = {
  a: number;
  b: boolean;
  c: string;
} & Record<string, any>;

type Test1 = KnownRecord<Ops>;
// 等价于 { a: number; b: boolean; c: string }

 *
 */
type KnownRecord<T, V = never> = {
    [K in keyof T as string extends K ? never : number extends K ? never : symbol extends K ? never : K]: V extends never ? T[K] : V;
};

type AsyncComputedValueRecord<T extends Record<string, any>> = {
    [K in keyof T]: AsyncComputedValue<T[K]>;
};
type NormalizedFieldOptions<SCHEMA = unknown> = Omit<RequiredKeys<KnownRecord<SchemaOptions, AsyncComputedValue>, 'visible' | 'enable' | 'required' | 'order' | 'advanced' | 'actions'>, 'widget' | 'path' | 'name'> & {
    widget: string;
    path: string[];
    name: string;
} & (SCHEMA extends Record<string, any> ? AsyncComputedValueRecord<SCHEMA> : unknown);
declare class AutoField<Options = unknown> extends LitElement {
    static styles: CSSResult;
    theme: ThemeController;
    schema?: SchemaOptions & Options;
    classs: HostClasses;
    field: NormalizedFieldOptions<Options>;
    value: any;
    name: string;
    path: string;
    invalidMessage?: string;
    labelPos: string;
    dirty: boolean;
    beforeActions?: SchemaWidgetAction[];
    afterActions?: SchemaWidgetAction[];
    _field: Array<HTMLElement>;
    _subscribers: Watcher[];
    input: HTMLInputElement;
    context: AutoFormContext;
    /**
     * 转换为AsyncComputedValue
     */
    getFieldOptions(): NormalizedFieldOptions<Options>;
    getPrefix(): void;
    getSuffix(): void;
    renderActions(): lit.TemplateResult<1>;
    _onClickAction(action: SchemaWidgetAction): ((e: any) => void) | undefined;
    renderBeforeActions(): lit.TemplateResult<1> | undefined;
    renderAfterActions(): lit.TemplateResult<1> | undefined;
    renderActionWidget(action: SchemaWidgetAction): lit.TemplateResult<1> | undefined;
    _renderSchemaOption(name: string, render?: (value: any) => any): lit.TemplateResult<1> | undefined;
    getLabel(): string | autostore.ComputedBuilder<string, Record<string, any>>;
    getSchema(): Record<string, any> & {
        name?: string;
        widget?: autostore.SchemaWidgetTypes | Omit<string, autostore.SchemaWidgetTypes>;
        required?: boolean | autostore.ComputedBuilder<boolean, Record<string, any>> | undefined;
        visible?: boolean | autostore.ComputedBuilder<boolean, Record<string, any>> | undefined;
        enable?: boolean | autostore.ComputedBuilder<boolean, Record<string, any>> | undefined;
        description?: string | autostore.ComputedBuilder<string, Record<string, any>> | undefined;
        icon?: string | autostore.ComputedBuilder<string, Record<string, any>> | undefined;
        label?: string | autostore.ComputedBuilder<string, Record<string, any>> | undefined;
        labelPos?: string | autostore.ComputedBuilder<string, Record<string, any>> | undefined;
        help?: string | autostore.ComputedBuilder<string, Record<string, any>> | undefined;
        helpPos?: "" | "default" | autostore.ComputedBuilder<string, Record<string, any>> | undefined;
        placeholder?: string | autostore.ComputedBuilder<string, Record<string, any>> | undefined;
        group?: string | autostore.ComputedBuilder<string, Record<string, any>> | undefined;
        advanced?: boolean | autostore.ComputedGetter<boolean, Record<string, any>> | undefined;
        order?: number | autostore.ComputedGetter<number, Record<string, any>> | undefined;
        width?: string | number | autostore.ComputedGetter<string, Record<string, any>> | undefined;
        height?: string | number | autostore.ComputedGetter<string, Record<string, any>> | undefined;
        divider?: boolean | autostore.ComputedGetter<boolean, Record<string, any>> | undefined;
        switchValues?: any[] | autostore.ComputedGetter<any[], Record<string, any>> | undefined;
        itemWidth?: string | number | autostore.ComputedGetter<string, Record<string, any>> | undefined;
        itemTemplate?: string | autostore.ComputedGetter<string, Record<string, any>> | undefined;
        invalidMessage?: string | ((e: Error, path: string, newValue: any, oldValue: any) => string) | undefined;
        onFail?: "pass" | "throw" | "ignore" | "throw-pass";
        tips?: string;
        select?: string[] | number[] | boolean[] | autostore.ComputedBuilder<any[], Record<string, any>> | (string | {
            label?: string;
            value?: any;
            default?: boolean;
            enable?: boolean;
            selected?: boolean;
            icon?: string;
        })[] | undefined;
        actions?: SchemaWidgetAction<Record<string, any>>[] | undefined;
        toView?: (value: any) => any;
        toState?: (value: any) => any;
        toInput?: (value: any) => any;
    } & autostore.SchemaWidgetOptions<Record<string, any>> & Options;
    toView(value: any): any;
    toState(value: any): any;
    toInput(value: any): any;
    getFieldOption(name: string, defaultValue?: any): any;
    getInputValue(): any;
    _renderRequiredOption(): lit.TemplateResult<1> | undefined;
    renderHelp(): lit.TemplateResult<1> | undefined;
    renderLabel(): lit.TemplateResult<1>;
    renderInput(): lit.TemplateResult<1>;
    isShowError(): boolean;
    renderError(): lit.TemplateResult<1>;
    onFieldChange(e?: Event): void;
    onFieldInput(e: Event): void;
    /**
     * 当schmeaOption发生变化时
     */
    _handleSchemaChange(): void;
    renderView(): lit.TemplateResult<1>;
    /**
     * 当状态数据发生变化时
     */
    _handleStateChange(): void;
    getStateValue(): any;
    connectedCallback(): void;
    disconnectedCallback(): void;
    getLabelPos(): any;
    /**
     *
     * auto bottom, label
     *
     */
    getHelpPos(): any;
    /**
     * 当输入框值改变时更新状态
     * @returns
     */
    _updateFieldValue(): void;
    renderValue(): lit.TemplateResult<1>;
    render(): lit.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'auto-field': AutoField;
    }
}

type TreeNode = {
    id?: string | number;
    label?: string;
    icon?: string;
    value?: string;
    selected?: boolean;
    expanded?: boolean;
    children?: TreeNode[];
};
type TreeNodes = TreeNode[] | TreeNode;
type TreeSelectedItem = {
    id: any;
    value: any;
    path: any;
};
type AutoTreeSelectOptions = {
    items: TreeNodes;
    idKey: string;
    valueKey: string;
    labelKey: string;
    multiple: boolean;
    maxItems: number;
    minItems: number;
    onlySelectLeaf: boolean;
    showAsPath: boolean;
    onSelectionChange: (selection: TreeSelectedItem[]) => void;
};
declare class AutoFieldTreeSelect extends AutoField<AutoTreeSelectOptions> {
    static styles: any;
    nodes: TreeNodes;
    selection: TreeSelectedItem[];
    idKey: string;
    valueKey: string;
    labelKey: string;
    connectedCallback(): void;
    isItemSelected(item: any): any;
    getStateValue(): any;
    /**
     * 遍历树并对每一个节点进行回调
     * @param callback
     */
    _forEachTree(callback: (item: TreeNode, parent: TreeNode | undefined, level: number, path: string[]) => void): void;
    _renderNode(item: TreeNode & Record<string, any>, values: any, parentPath: string[]): any;
    _renderNodes(nodes: TreeNodes): any;
    getFieldOptions(): Omit<{
        name?: autostore.AsyncComputedValue | undefined;
        widget?: autostore.AsyncComputedValue | undefined;
        required: autostore.AsyncComputedValue;
        visible: autostore.AsyncComputedValue;
        enable: autostore.AsyncComputedValue;
        description?: autostore.AsyncComputedValue | undefined;
        icon?: autostore.AsyncComputedValue | undefined;
        label?: autostore.AsyncComputedValue | undefined;
        labelPos?: autostore.AsyncComputedValue | undefined;
        help?: autostore.AsyncComputedValue | undefined;
        helpPos?: autostore.AsyncComputedValue | undefined;
        placeholder?: autostore.AsyncComputedValue | undefined;
        group?: autostore.AsyncComputedValue | undefined;
        advanced: autostore.AsyncComputedValue;
        order: autostore.AsyncComputedValue;
        width?: autostore.AsyncComputedValue | undefined;
        height?: autostore.AsyncComputedValue | undefined;
        divider?: autostore.AsyncComputedValue | undefined;
        switchValues?: autostore.AsyncComputedValue | undefined;
        itemWidth?: autostore.AsyncComputedValue | undefined;
        itemTemplate?: autostore.AsyncComputedValue | undefined;
        invalidMessage?: autostore.AsyncComputedValue | undefined;
        onFail?: autostore.AsyncComputedValue | undefined;
        tips?: autostore.AsyncComputedValue | undefined;
        select?: autostore.AsyncComputedValue | undefined;
        actions: autostore.AsyncComputedValue;
        toView?: autostore.AsyncComputedValue | undefined;
        toState?: autostore.AsyncComputedValue | undefined;
        toInput?: autostore.AsyncComputedValue | undefined;
        filled?: autostore.AsyncComputedValue | undefined;
        pill?: autostore.AsyncComputedValue | undefined;
        clearable?: autostore.AsyncComputedValue | undefined;
        readonly?: autostore.AsyncComputedValue | undefined;
        autocomplete?: autostore.AsyncComputedValue | undefined;
        pattern?: autostore.AsyncComputedValue | undefined;
        autocorrect?: autostore.AsyncComputedValue | undefined;
        noSpinButtons?: autostore.AsyncComputedValue | undefined;
        autofocus?: autostore.AsyncComputedValue | undefined;
        maxLength?: autostore.AsyncComputedValue | undefined;
        minLength?: autostore.AsyncComputedValue | undefined;
        spellcheck?: autostore.AsyncComputedValue | undefined;
        inputType?: autostore.AsyncComputedValue | undefined;
        selection?: autostore.AsyncComputedValue | undefined;
        multiple?: autostore.AsyncComputedValue | undefined;
        maxOptionsVisible?: autostore.AsyncComputedValue | undefined;
        placement?: autostore.AsyncComputedValue | undefined;
        max?: autostore.AsyncComputedValue | undefined;
        precision?: autostore.AsyncComputedValue | undefined;
        min?: autostore.AsyncComputedValue | undefined;
        step?: autostore.AsyncComputedValue | undefined;
        tooltip?: autostore.AsyncComputedValue | undefined;
        format?: autostore.AsyncComputedValue | undefined;
        inline?: autostore.AsyncComputedValue | undefined;
        opacity?: autostore.AsyncComputedValue | undefined;
        uppercase?: autostore.AsyncComputedValue | undefined;
        swatches?: autostore.AsyncComputedValue | undefined;
        background?: autostore.AsyncComputedValue | undefined;
        radius?: autostore.AsyncComputedValue | undefined;
        errorCorrection?: autostore.AsyncComputedValue | undefined;
        passwordToggle?: autostore.AsyncComputedValue | undefined;
        passwordVisible?: autostore.AsyncComputedValue | undefined;
        resize?: autostore.AsyncComputedValue | undefined;
        items?: autostore.AsyncComputedValue | undefined;
        renderHelp?: autostore.AsyncComputedValue | undefined;
        renderLabel?: autostore.AsyncComputedValue | undefined;
        renderValue?: autostore.AsyncComputedValue | undefined;
        renderError?: autostore.AsyncComputedValue | undefined;
        onFieldChange?: autostore.AsyncComputedValue | undefined;
    }, "name" | "widget" | "path"> & {
        widget: string;
        path: string[];
        name: string;
    } & {
        items: autostore.AsyncComputedValue<TreeNodes>;
        idKey: autostore.AsyncComputedValue<string>;
        valueKey: autostore.AsyncComputedValue<string>;
        labelKey: autostore.AsyncComputedValue<string>;
        multiple: autostore.AsyncComputedValue<boolean>;
        maxItems: autostore.AsyncComputedValue<number>;
        minItems: autostore.AsyncComputedValue<number>;
        onlySelectLeaf: autostore.AsyncComputedValue<boolean>;
        showAsPath: autostore.AsyncComputedValue<boolean>;
        onSelectionChange: autostore.AsyncComputedValue<(selection: TreeSelectedItem[]) => void>;
    };
    onSelectionChange(e: CustomEvent): void;
    getInputValue(): any;
    renderTree(): lit.TemplateResult<1>;
    renderInput(): lit.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'auto-field-tree-select': AutoFieldTreeSelect;
    }
}

export { AutoFieldTreeSelect, type AutoTreeSelectOptions, type TreeNode, type TreeNodes, type TreeSelectedItem };
