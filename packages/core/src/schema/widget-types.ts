export interface BaseInputAttributes {
    name?: string;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    placeholder?: string;
    autocomplete?: string;
    autofocus?: boolean;
    value?: string | number | readonly string[];
    defaultValue?: string | number | readonly string[];
    form?: string;
    id?: string;
    tabIndex?: number;
}

// 各个 input type 的专属属性拆分为独立的 interface

export interface AutoWidgetText extends BaseInputAttributes {
    maxlength?: number;
    minlength?: number;
    pattern?: string;
}

export interface AutoWidgetNumber extends BaseInputAttributes {
    max?: number;
    min?: number;
    step?: number;
}

export interface AutoWidgetEmail extends BaseInputAttributes {
    maxlength?: number;
    minlength?: number;
    pattern?: string;
    multiple?: boolean;
}

export interface AutoWidgetPassword extends BaseInputAttributes {
    maxlength?: number;
    minlength?: number;
    pattern?: string;
}

export interface AutoWidgetSearch extends BaseInputAttributes {
    maxlength?: number;
    minlength?: number;
    pattern?: string;
}

export interface AutoWidgetTel extends BaseInputAttributes {
    maxlength?: number;
    minlength?: number;
    pattern?: string;
}

export interface AutoWidgetUrl extends BaseInputAttributes {
    maxlength?: number;
    minlength?: number;
    pattern?: string;
}

export interface AutoWidgetCheckbox extends BaseInputAttributes {
    checked?: boolean;
    defaultChecked?: boolean;
}

export interface AutoWidgetRadio extends BaseInputAttributes {
    checked?: boolean;
    defaultChecked?: boolean;
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

export interface AutoWidgetColor extends BaseInputAttributes {
    value?: string;
}

export interface AutoWidgetHidden extends BaseInputAttributes {}

export interface AutoWidgetImage extends BaseInputAttributes {
    alt?: string;
    height?: number | string;
    width?: number | string;
    src?: string;
}

export interface AutoWidgetTextarea extends BaseInputAttributes {
    maxlength?: number;
    minlength?: number;
    rows?: number;
    cols?: number;
    wrap?: "hard" | "soft" | "off";
}

export interface AutoWidgetSelect extends BaseInputAttributes {
    multiple?: boolean;
    size?: number;
    // select 的 value 在 multiple 模式下可以是数组
    value?: string | string[];
    defaultValue?: string | string[];
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
