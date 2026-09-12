/**
 * widget 配置类型表
 *
 * - AutoStoreWidgets 是所有 widget 名到其特有配置类型的映射（Widget 键表）
 * - core 收录 HTML input type 全集作为基础表，UI 包（如 @autostorejs/form）
 *   通过 `declare module "autostore"` 向本表合并自有键（见 ADR-0004）
 * - 键名与运行时自定义元素 tag（`auto-field-<widget>`）一一对应
 *
 * 注意：本表定位是"widget 配置类型"而非"HTML 属性镜像"——
 * 重叠组件（form 也实现的同名 widget）被 form 实际消费的配置字段
 * 补写进本表对应接口（interface 同名成员无法被模块扩展增强）。
 *
 * 字段词汇统一 camelCase（ADR-0005）：form 组件以 camelCase 读取配置，
 * HTML 小写形态（maxlength/minlength）已删除——发布类型中收窄的
 * 公开词汇，schema 配置层面已验证零使用。
 * 字段收录判据：实现消费 ∩ widget 语义——HTML 明确不支持或破坏值类型的
 * 字段不收（如 number 不收 pattern/prefix）。
 */
import type { SchemaChoices } from "./types";

/**
 * 全体 widget 共享的输入基础属性
 *
 * - 与 AutoStateSchemaBase 重复的键（name/required/placeholder 等）已在 base 统一声明，此处不再重复（单一事实来源）
 * - disabled/readOnly 与 base 的 enable 语义分层：enable 是业务级开关（整字段禁用），
 *   disabled/readOnly 是 HTML 原生输入态透传
 * - labelPos 来自 @autostorejs/form 字段基类的实际消费（field/index.ts），对所有 widget 生效
 */
export interface BaseInputAttributes {
    disabled?: boolean;
    readOnly?: boolean;
    /**
     * 标签位置，由 form 字段基类消费
     */
    labelPos?: "left" | "right" | "top" | "bottom" | "inner";
    autocomplete?: string;
    autofocus?: boolean;
    form?: string;
    id?: string;
    tabIndex?: number;
}

/**
 * 文本输入系 widget 的共享配置词汇（camelCase，ADR-0005）
 *
 * 来自 form 泛型输入框（auto-field-input）的实际消费词汇。
 * 文本系重叠键（text/tel/password/search/email/url）extends 本接口；
 * 数值/日期系（number/date）只收其中对自身语义有效的装饰字段
 * （filled/pill 及 date 的 prefix/suffix），不 extends——长度/正则/拼写
 * 等文本校验字段对它们静默无效（收录判据：实现消费 ∩ widget 语义）。
 */
export interface AutoWidgetInputExtras {
    /**
     * 最小长度限制
     */
    minLength?: number;
    /**
     * 最大长度限制
     */
    maxLength?: number;
    /**
     * 校验正则（HTML pattern）
     */
    pattern?: string;
    /**
     * 值前缀：字符串值自动拼接（form 的 toState/toInput 双向剥离）
     */
    prefix?: string;
    /**
     * 值后缀：字符串值自动拼接（form 的 toState/toInput 双向剥离）
     */
    suffix?: string;
    /**
     * 填充态外观（form 透传 Shoelace filled）
     */
    filled?: boolean;
    /**
     * 胶囊圆角外观（form 透传 Shoelace pill）
     */
    pill?: boolean;
    /**
     * 拼写检查
     */
    spellcheck?: boolean;
    /**
     * 自动更正（Safari 私有属性透传）
     */
    autocorrect?: string;
}

// 各个 input type 的专属属性拆分为独立的 interface

export interface AutoWidgetText extends BaseInputAttributes, AutoWidgetInputExtras {}

export interface AutoWidgetNumber extends BaseInputAttributes {
    max?: number;
    min?: number;
    step?: number;
    /**
     * 填充态外观（form 透传 Shoelace filled）
     */
    filled?: boolean;
    /**
     * 胶囊圆角外观（form 透传 Shoelace pill）
     */
    pill?: boolean;
}

export interface AutoWidgetEmail extends BaseInputAttributes, AutoWidgetInputExtras {
    multiple?: boolean;
}

export interface AutoWidgetPassword extends BaseInputAttributes, AutoWidgetInputExtras {}

export interface AutoWidgetSearch extends BaseInputAttributes, AutoWidgetInputExtras {}

export interface AutoWidgetTel extends BaseInputAttributes, AutoWidgetInputExtras {}

export interface AutoWidgetUrl extends BaseInputAttributes, AutoWidgetInputExtras {}

export interface AutoWidgetCheckbox extends BaseInputAttributes {
    /**
     * 勾选框旁的显示文案（不配置时显示 label）
     * form 的 checkbox/switch 实际消费的键
     */
    checkLabel?: string;
    /**
     * 双值开关语义：[选中值, 未选中值]，如 ["yes","no"]（默认 [true,false]）
     * form 的 checkbox/switch 实际消费的键
     */
    switchValues?: [any, any];
    /**
     * 双值选项：[选中项, 未选中项]，每项为 {label?,value} 对象或字符串
     * form 的 checkbox/switch 实际消费的键（配置后优先于 switchValues，
     * 取各项 value，显示当前项 label，无 label 则不显示）
     */
    choices?: ({ label?: string; value: any } | string)[];
}

export interface AutoWidgetRadio extends BaseInputAttributes {
    /**
     * 候选项对象上取值的字段名（form 选项类组件通用数据映射）
     */
    valueKey?: string;
    /**
     * 卡片模式
     */
    card?: boolean;
    /**
     * 选项宽度
     */
    itemWidth?: string;
}

export interface AutoWidgetFile extends BaseInputAttributes {
    accept?: string;
    multiple?: boolean;
    capture?: string;
}

export interface AutoWidgetRange extends BaseInputAttributes {
    max?: number;
    min?: number;
    step?: number;
}

export interface AutoWidgetDate extends BaseInputAttributes {
    max?: string;
    min?: string;
    step?: number;
    /**
     * 值前缀：日期字符串值自动拼接（form 的 toState/toInput 双向剥离）
     */
    prefix?: string;
    /**
     * 值后缀：日期字符串值自动拼接（form 的 toState/toInput 双向剥离）
     */
    suffix?: string;
    /**
     * 填充态外观（form 透传 Shoelace filled）
     */
    filled?: boolean;
    /**
     * 胶囊圆角外观（form 透传 Shoelace pill）
     */
    pill?: boolean;
}

export interface AutoWidgetDateTimeLocal extends BaseInputAttributes {
    max?: string;
    min?: string;
    step?: number;
}

export interface AutoWidgetMonth extends BaseInputAttributes {
    max?: string;
    min?: string;
    step?: number;
}

export interface AutoWidgetTime extends BaseInputAttributes {
    max?: string;
    min?: string;
    step?: number;
}

export interface AutoWidgetWeek extends BaseInputAttributes {
    max?: string;
    min?: string;
    step?: number;
}

export interface AutoWidgetColor extends BaseInputAttributes {}

export interface AutoWidgetHidden extends BaseInputAttributes {}

export interface AutoWidgetImage extends BaseInputAttributes {
    alt?: string;
    height?: number | string;
    width?: number | string;
    src?: string;
}

export interface AutoWidgetTextarea extends BaseInputAttributes {
    minLength?: number;
    maxLength?: number;
    rows?: number;
    cols?: number;
    wrap?: "hard" | "soft" | "off";
    autocorrect?: string;
}

/**
 * select 的选项渲染定制：字符串模板（{key} 插值）或函数
 */
export type SelectRenderItem = string | ((item: any) => any);

export interface AutoWidgetSelect extends BaseInputAttributes {
    multiple?: boolean;
    size?: number;
    /**
     * 候选项（与 base 的 choices 同一类型定义，见 SchemaChoices）
     */
    choices?: SchemaChoices;
    /**
     * 候选项对象上取值的字段名（form 选项类组件通用数据映射）
     */
    valueKey?: string;
    /**
     * 候选项对象上取标签的字段名
     */
    labelKey?: string;
    /**
     * 候选项渲染定制：字符串模板（{key} 插值替换）或函数
     */
    renderItem?: SelectRenderItem;
    /**
     * 下拉面板弹出方位（form 透传 Shoelace placement）
     */
    placement?: "top" | "bottom" | "right" | "left";
    /**
     * multiple 模式下最多直接显示的已选标签数，超出折叠为 +N（0=不折叠）
     */
    maxOptionsVisible?: number;
    /**
     * 填充态外观（form 透传 Shoelace filled）
     */
    filled?: boolean;
    /**
     * 胶囊圆角外观（form 透传 Shoelace pill）
     */
    pill?: boolean;
}

// 映射类型，用于快速查找
export type HtmlInputTypeMap = {
    text: AutoWidgetText;
    number: AutoWidgetNumber;
    email: AutoWidgetEmail;
    password: AutoWidgetPassword;
    search: AutoWidgetSearch;
    tel: AutoWidgetTel;
    url: AutoWidgetUrl;
    checkbox: AutoWidgetCheckbox;
    radio: AutoWidgetRadio;
    file: AutoWidgetFile;
    range: AutoWidgetRange;
    date: AutoWidgetDate;
    "datetime-local": AutoWidgetDateTimeLocal;
    month: AutoWidgetMonth;
    time: AutoWidgetTime;
    week: AutoWidgetWeek;
    color: AutoWidgetColor;
    hidden: AutoWidgetHidden;
    image: AutoWidgetImage;
    textarea: AutoWidgetTextarea;
    select: AutoWidgetSelect;
};

// AutoStoreWidgets 是所有 widget 类型的合并（对象类型）
// UI 包（如 @autostorejs/form）通过 declare module "autostore" 向此表合并自有键（ADR-0004）
export interface AutoStoreWidgets {
    text: AutoWidgetText;
    number: AutoWidgetNumber;
    email: AutoWidgetEmail;
    password: AutoWidgetPassword;
    search: AutoWidgetSearch;
    tel: AutoWidgetTel;
    url: AutoWidgetUrl;
    checkbox: AutoWidgetCheckbox;
    radio: AutoWidgetRadio;
    file: AutoWidgetFile;
    range: AutoWidgetRange;
    date: AutoWidgetDate;
    month: AutoWidgetMonth;
    time: AutoWidgetTime;
    week: AutoWidgetWeek;
    color: AutoWidgetColor;
    hidden: AutoWidgetHidden;
    image: AutoWidgetImage;
    textarea: AutoWidgetTextarea;
    select: AutoWidgetSelect;
    "datetime-local": AutoWidgetDateTimeLocal;
}
