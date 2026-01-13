import type { SchemaOptions, SchemaWidgetAction, SchemaWidgetSelectItem } from '.';
import type { ComputedBuilder } from '../../core/src/computed/types';

export type SchemaWidgetTypes =
    | 'input'
    | 'select'
    | 'textarea'
    | 'range'
    | 'radio'
    | 'radio-button'
    | 'captcha'
    | 'verifycode'
    | 'rating'
    | 'checkbox'
    | 'checkbox-group'
    | 'switch'
    | 'date'
    | 'datetime'
    | 'time'
    | 'ipaddress'
    | 'colorpicker'
    | 'url'
    | 'number'
    | 'password'
    | 'qrcode'
    | 'email'
    | 'phone'
    | 'search'
    | 'tree-dropdown'
    | 'tree-select'
    | 'list'
    | 'upload'
    | 'custom'
    | 'combine'
    | 'icons'
    | 'date-range';

export type SchemaInputWidgetOptions = {
    filled?: boolean;
    pill?: boolean;
    clearable?: boolean;
    readonly?: boolean;
    pattern?: string;
    noSpinButtons?: boolean;
    autocorrect?: 'on' | 'off';
    autocomplete?: string;
    autofocus?: boolean;
    maxLength?: number;
    minLength?: number;
    max?: number;
    min?: number;
    spellcheck?: boolean;
    inputType?:
        | 'date'
        | 'datetime-local'
        | 'email'
        | 'number'
        | 'password'
        | 'search'
        | 'tel'
        | 'text'
        | 'time'
        | 'url';
    prefix?: (SchemaWidgetAction | string)[];
    suffix?: (SchemaWidgetAction | string)[];
};

export type SchemaSelectWidgetOptions = {
    valueKey?: string;
    labelKey?: string;
    clearable?: boolean;
    maxOptionsVisible?: number;
    placement?: 'top' | 'bottom';
    pill?: boolean;
    filled?: boolean;
    multiple?: boolean;
    select: (SchemaWidgetSelectItem | string)[];
    renderItem?: string | ((item: SchemaWidgetSelectItem) => string);
};
export type SchemaTextareaWidgetOptions = {
    rows?: number;
    filled?: boolean;
    autocorrect?: 'on' | 'off';
    autocomplete?: string;
    autofocus?: boolean;
    maxLength?: number;
    minLength?: number;
};
export type SchemaRangeWidgetOptions = {
    max?: number;
    min?: number;
    step?: number;
    tooltip?: 'top' | 'bottom' | 'none';
};
export type SchemaRadioWidgetOptions = {
    card?: boolean;
    itemWidth?: number | string;
    select: (SchemaWidgetSelectItem | string | number)[];
    valueKey?: string;
};
export type SchemaRadioButtonWidgetOptions = {
    pill?: boolean;
    valueKey?: string;
};
export type SchemaCaptchaWidgetOptions = {
    url?: string; // 获取验证码图片的地址
    tips?: string;
};
export type SchemaVerifyCodeWidgetOptions = {
    timeout?: number | [number, number];
    template?: string;
    sendTips?: string;
    maxLength?: number;
    minLength?: number;
    // 单击发送时调用，一般应在此向服务器请求重新发送验证码
    onRequest?: () => void;
};
export type SchemaRatingWidgetOptions = {
    size?: 'small' | 'medium' | 'large';
    max?: number;
    precision?: number;
};
export type SchemaCheckboxWidgetOptions = {
    switchValues?: any[];
    checkLabel?: string | string[];
};
export type SchemaCheckboxGroupWidgetOptions = {
    valueKey?: string;
    select: SchemaWidgetSelectItem[];
    card?: boolean;
    itemWidth?: string;
};
export type SchemaSwitchWidgetOptions = {
    checkLabel?: string | string[];
    switchValues?: any[];
};

export type SchemaDateWidgetOptions = Omit<
    SchemaInputWidgetOptions,
    'inputType' | 'maxLength' | 'minLength'
>;
export type SchemaDateTimeWidgetOptions = Omit<
    SchemaInputWidgetOptions,
    'inputType' | 'maxLength' | 'minLength'
>;

export type SchemaTimeWidgetOptions = Omit<
    SchemaInputWidgetOptions,
    'inputType' | 'min' | 'max' | 'maxLength' | 'minLength' | 'pattern'
>;

export type SchemaIpAddressWidgetOptions = {
    size?: 'small' | 'medium' | 'large';
};
export type SchemaColorPickerWidgetOptions = {
    opacity?: boolean;
    inline?: boolean;
    presets?: string[];
    swatches?: string[];
    format?: 'hex' | 'rgb' | 'hsl' | 'hsv';
};
export type SchemaURLWidgetOptions = Omit<
    SchemaInputWidgetOptions,
    'inputType' | 'max' | 'min' | 'pattern'
>;
export type SchemaNumberWidgetOptions = Omit<
    SchemaInputWidgetOptions,
    'inputType' | 'maxLength' | 'minLength' | 'pattern'
>;
export type SchemaPasswordWidgetOptions = Omit<
    SchemaInputWidgetOptions,
    'inputType' | 'max' | 'min' | 'pattern'
> & {
    passwordToggle?: boolean;
    passwordVisible?: boolean;
};

export type SchemaQrCodeWidgetOptions = {
    errorCorrection?: 'L' | 'M' | 'Q' | 'H';
    fill?: string;
    radius?: number;
    background?: string;
};
export type SchemaEmailWidgetOptions = Omit<SchemaInputWidgetOptions, 'inputType' | 'max' | 'min'>;
export type SchemaPhoneWidgetOptions = Omit<SchemaInputWidgetOptions, 'inputType' | 'max' | 'min'>;
export type SchemaSearchWidgetOptions = Omit<SchemaInputWidgetOptions, 'inputType' | 'max' | 'min'>;

export type SchemaTreeSelectWidgetNode = {
    id?: string | number;
    value?: any;
    label?: string;
    icon?: string;
    help?: string;
    selected?: boolean;
    expanded?: boolean;
    children?: SchemaTreeSelectWidgetNode[];
};

export type SchemaTreeSelectWidgetOptions = {
    idKey?: string;
    valueKey?: string;
    labelKey?: string;
    multiple?: boolean;
    showAsPath?: boolean;
    onlySelectLeaf?: boolean;
    defaultExpandLevel?: number; // 默认展开的层级，默认2
    onSelectionChange?: (selection: { id: any; value: any; path: any }[]) => void;
    items:
        | SchemaTreeSelectWidgetNode
        | SchemaTreeSelectWidgetNode[]
        | ComputedBuilder<SchemaTreeSelectWidgetNode | SchemaTreeSelectWidgetNode[], any>;
};

export type SchemaTreeDropdownWidgetOptions = SchemaTreeSelectWidgetOptions;

export type SchemaListWidgetListItem = {
    id: any;
    value?: any;
    label?: string;
    icon?: string;
} & Record<string, any>;

export type SchemaListWidgetOptions = {
    select: SchemaWidgetSelectItem[];
    multiple?: boolean;
    showIcon?: boolean;
    valueKey?: string; // 用于值
    labelKey?: string; // 用于显示,默认为label
    showResults?: boolean;
    renderItem?: string | ((item: SchemaWidgetSelectItem) => string);
};
export type htmlTemplate = (strings: TemplateStringsArray, ...values: unknown[]) => any;

// 自定义
export type SchemaCustomWidgetOptions = {
    dropdown?: boolean;
    inputSelectors?: string;
    renderSelection?: (value: any, html: htmlTemplate) => string;
    renderContent?: (value: any, html: htmlTemplate) => string;
};

export type SchemaUploadWidgetFile = {
    id?: string;
    url: string;
    title?: string;
    size?: number;
};

export type SchemaUploadWidgetOptions = {
    /**
     * 文件输入元素的accept属性可以接受MIME类型和文件扩展名
     * 例如: "image/jpeg, .jpg, .png"
     */
    fileTypes?: string[];
    url?: string;
    fileFieldName?: string; // 上传文件字段名称，默认是file
    /**
     * 当删除文件时传入
     */
    onRemove?: (file: string | SchemaUploadWidgetFile) => Promise<void> | void;
    /**
     * 指定如何选取文件
     * button: 显示一个上传选择文件按钮
     * rectangle:  默认，显示一个矩形框架，可以拖动到了此
     * auto:  默认，多选时显示rectangle,单选时显示button
     */
    selector?: 'button' | 'rectangle' | 'auto';
    multiple?: boolean;
    // 上传提示信息
    tips?: string;
    /**
     * 用于解析上传文件的url
     *
     * response是/upload上传API返回的数据
     *
     * 如果没有提供，默认的解析逻辑
     *
     * - string          : 只返回上传文件的URL
     * - {url,title,id}  : 可以返回更复杂的内容
     *
     * 如果不符合以上逻辑，则需要自行处理
     *
     */
    onResolve?: (response: string | Record<string, any>) => SchemaUploadWidgetFile;
    /**
     * 用于显示文件名称，如果没有指定则只显示文件名称
     */
    onFileLabel?: (file: string | SchemaUploadWidgetFile) => string;
    /**
     * 显示预览的尺寸
     * true代表显示一个默认的预览，一般只对图片和视频文件有效
     * false代表不预览，只显示文件标题或url
     * “字符串”： 代表预览大小，如:"64px"，代表预览元素大小为64px;
     *
     */
    preview?: boolean | string | number;
    /**
     * 默认情况下，
     *
     * 上传字段只保存上传文件的url，比如
     *
     * {
     *   file:configurable("",{
     *      widget:"upload"
     *  })
     * }
     *
     * 当上传abc.jpg时，服务器保存在upload/abc.jpg，或者重命名为upload/abc_123232.jpg
     *
     * 此时state.file==`upload/abc_123232.jpg`
     *
     * 就是字段值=上传文件的URL
     *
     * 而有时我们想保存一些额外的文件数据，比如文件大小，用途，名称等等。
     */
    onlyFileUrl?: boolean;
};

export type SchemaPartsWidgetOptions = {
    // 输入中的分割字符，不作为输入，仅显示
    delimiter?: string;
    template?: string;
    // 限制能输入的字符,使用正则表达式，如只输入数字，则设置为[\d]{1}
    chars?: string;
    //输入值是否包含分割符，=false，则在最终结果中移除delimiter
    includeDelimiter?: boolean;
    upper?: boolean;
    // 限制大小写
    caseType?: 'upper' | 'lower' | 'both';
};

/**
 * 用于组合多个Widget显示状态值
 */
export type SchemaCombineWidgetOptions = {
    children: SchemaOptions[];
    dropdown?: boolean;
    renderSelection?: (value: any, html: htmlTemplate) => string;
};

export type SchemaIconsWidgetOptions = {
    icons?: string | string[]; // 使用,分割多个图标
    builtIn?: boolean; // 是否包括内置图标
    dropdown?: boolean;
    size?: string;
    multiple?: boolean; // 是否多选
};

export type SchemaCascaderItem = {
    id?: string;
    label?: string;
    value?: string;
    icon?: string;
    lazy?: boolean; // 是否懒加载，是并且指定onLoad和
    children?: SchemaCascaderItem[];
};
export type SchemaCascaderWidgetOptions = {
    dropdown?: boolean;
    rootKey?: string;
    idKey?: string;
    labelKey?: string;
    valueKey?: string;
    childrenKey?: string; // 如果指定则说明data是嵌套格式
    maxLevel?: number; // 最大级数,默认是3
    delimiter?: string; // 默认为''，用于合并级联值
    select: Record<string, any> | Record<string, any>[];
    // 当节点 加载子节点数据
    onLoad?: (id: string) => Promise<Record<string, any>[]>;
};

export type SchemaDateRangeWidgetOptions = {
    delimiter?: string; // 默认为','
    pill?: boolean;
    filled?: boolean;
    includeTime?: boolean;
    clearable?: boolean;
};
