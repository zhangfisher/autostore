import type { SchemaWidgetSelect } from "../.."

export type SchemaWidgetTypes = 'input'
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


export type SchemaInputWidgetOptions = {
    filled?: boolean
    pill?: boolean
    clearable?: boolean
    readonly?: boolean
    pattern?: string
    noSpinButtons?: boolean
    autocorrect?: 'on' | 'off'
    autocomplete?: string
    autofocus?: boolean
    maxLength?: number
    minLength?: number
    max?: number
    min?: number
    spellcheck?: boolean
    inputType?: 'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url'
}


export type SchemaSelectWidgetOptions = {
    valueKey?: string
    labelKey?: string
    clearable?: boolean
    maxOptionsVisible?: number
    placement?: 'top' | 'bottom'
    pill?: boolean
    filled?: boolean
    multiple?: boolean
}
export type SchemaTextareaWidgetOptions = {
    rows?: number
    filled?: boolean
    autocorrect?: 'on' | 'off'
    autocomplete?: string
    autofocus?: boolean
    maxLength?: number
    minLength?: number
}
export type SchemaRangeWidgetOptions = {
    max?: number
    min?: number
    step?: number
    tooltip?: 'top' | 'bottom' | 'none'
    tooltipFormatter?: string
}
export type SchemaRadioWidgetOptions = {
    card?: boolean
    itemWidth?: number | string
}
export type SchemaRadioButtonWidgetOptions = {
    pill?: boolean
}
export type SchemaCaptchaWidgetOptions = {
    url?: string                      // 获取验证码图片的地址
    tips?: string
}
export type SchemaVerifyCodeWidgetOptions = {
    timeout?: number | [number, number]
    template?: string
    sendTips?: string
    maxLength?: number
    minLength?: number
    // 单击发送时调用，一般应在此向服务器请求重新发送验证码
    onRequest?: () => void
}
export type SchemaRatingWidgetOptions = {
    size?: 'small' | 'medium' | 'large'
}
export type SchemaCheckboxWidgetOptions = {
    switchValues?: any[]
    checkLabel?: string | string[]
}
export type SchemaCheckboxGroupWidgetOptions = {
    valueKey?: string
    select: SchemaWidgetSelect
    card?: boolean
    itemWidth?: string
}
export type SchemaSwitchWidgetOptions = {
    checkLabel?: string | string[]
    switchValues?: any[]
}

export type SchemaDateWidgetOptions = Omit<SchemaInputWidgetOptions,
    'inputType' | 'min' | 'max' | 'maxLength' | 'minLength' | 'pattern'
>
export type SchemaTimeWidgetOptions = Omit<SchemaInputWidgetOptions,
    'inputType' | 'min' | 'max' | 'maxLength' | 'minLength' | 'pattern'
>

export type SchemaIpAddressWidgetOptions = {
    size?: 'small' | 'medium' | 'large'
}
export type SchemaColorPickerWidgetOptions = {
    opacity?: boolean
    inline?: boolean
    pressets?: string[]
}
export type SchemaURLWidgetOptions = Omit<SchemaInputWidgetOptions,
    'inputType' | 'max' | 'min' | 'pattern'
>
export type SchemaNumberWidgetOptions = Omit<SchemaInputWidgetOptions,
    'inputType' | 'maxLength' | 'minLength' | 'pattern'
>
export type SchemaPasswordWidgetOptions = Omit<SchemaInputWidgetOptions,
    'inputType' | 'max' | 'min' | 'pattern'
> & {
    passwordToggle?: boolean
    passwordVisible?: boolean
}

export type SchemaQrCodeWidgetOptions = {
    errorCorrection?: 'L' | 'M' | 'Q' | 'H'
    fill?: boolean
    radius?: number
    background?: string

}
export type SchemaEmailWidgetOptions = Omit<SchemaInputWidgetOptions,
    'inputType' | 'max' | 'min'
>
export type SchemaPhoneWidgetOptions = Omit<SchemaInputWidgetOptions,
    'inputType' | 'max' | 'min'
>
export type SchemaSearchWidgetOptions = Omit<SchemaInputWidgetOptions,
    'inputType' | 'max' | 'min'
>

export type SchemaTreeSelectWidgetNode = {
    id?: string | number
    value?: any
    label?: string
    icon?: string
    help?: string
    selected?: boolean
    expanded?: boolean
    children?: SchemaTreeSelectWidgetNode[]
}

export type SchemaTreeSelectWidgetOptions = {
    idKey?: string
    valueKey?: string
    labelKey?: string
    maxItems?: number
    minItems?: number
    multiple?: boolean
    showAsPath?: boolean
    onlySelectLeaf?: boolean
    onSelectionChange?: (selection: { id: any, label: any, path: any }[]) => void
    items: SchemaTreeSelectWidgetNode | SchemaTreeSelectWidgetNode[]
}

export type SchemaTreeDropdownWidgetOptions = SchemaTreeSelectWidgetOptions

export type SchemaListWidgetListItem = {
    id: any
    value?: any
    label?: string
    icon?: string
} & Record<string, any>


export type SchemaListWidgetOptions = {
    select: SchemaWidgetSelect
    idKey?: string
    multiple?: boolean
    showIcon?: boolean
    valueKey?: string    // 用于值
    labelKey?: string    // 用于显示,默认为label  
    maxItems?: number
    minItems?: number
    showResults?: boolean
    itemTemplate?: string
}


export type SchemaUploadWidgetOptions = {
    fileTypes?: string[]
    url?: string
    multiple?: boolean
}


export type SchemaPartsWidgetOptions = {
    delimiter?: string
    template?: string
}



// export interface SchemaWidgetOptions<State = Dict> {
//     filled?: boolean | ComputedBuilder<boolean, State>
//     pill?: boolean | ComputedBuilder<boolean, State>
//     clearable?: boolean | ComputedBuilder<boolean, State>
//     readonly?: boolean | ComputedBuilder<boolean, State>
//     autocomplete?: string | ComputedBuilder<string, State>
//     pattern?: string | ComputedBuilder<string, State>
//     autocorrect?: 'on' | 'off'
//     noSpinButtons?: boolean | ComputedBuilder<boolean, State>
//     autofocus?: boolean | ComputedBuilder<boolean, State>
//     maxLength?: number | ComputedBuilder<number, State>
//     minLength?: number | ComputedBuilder<number, State>
//     spellcheck?: boolean | ComputedBuilder<boolean, State>
//     inputType?: 'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url'
//     selection?: 'signle' | 'multiple' | 'leaf'
//     multiple?: boolean | ComputedBuilder<boolean, State>,
//     maxOptionsVisible?: number | ComputedBuilder<number, State>,
//     placement?: 'top' | 'bottom'
//     max?: number | ComputedBuilder<number, State>
//     precision?: number | ComputedBuilder<number, State>
//     min?: number | ComputedBuilder<number, State>
//     step?: number | ComputedBuilder<number, State>
//     tooltip?: 'top' | 'bottom'
//     format?: string | ComputedBuilder<string, State>
//     inline?: boolean | ComputedBuilder<boolean, State>
//     opacity?: boolean | ComputedBuilder<boolean, State>
//     uppercase?: boolean | ComputedBuilder<boolean, State>
//     swatches?: string | ComputedBuilder<string, State>
//     background?: string | ComputedBuilder<string, State>
//     radius?: number | ComputedBuilder<number, State>
//     errorCorrection?: 'L' | 'M' | 'Q' | 'H'
//     passwordToggle?: boolean | ComputedBuilder<boolean, State>
//     passwordVisible?: boolean | ComputedBuilder<boolean, State>
//     resize?: 'none' | 'vertical' | 'auto'
//     items?: SchemaWidgetTreeNode | SchemaWidgetTreeNode[]
//     renderHelp?: (ctx: AutoFormContext) => any
//     renderLabel?: (ctx: AutoFormContext) => any
//     renderValue?: (ctx: AutoFormContext) => any
//     renderError?: (ctx: AutoFormContext) => any
//     onFieldChange?: (event: Event) => any
// }
