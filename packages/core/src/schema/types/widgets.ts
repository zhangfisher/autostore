import { SchemaWidgetSelectItem } from "."

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
    select: (SchemaWidgetSelectItem | string)[]
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
    tooltipFormatter?: (val: number) => string
    format?: string
}
export type SchemaRadioWidgetOptions = {
    card?: boolean
    itemWidth?: number | string
    select: (SchemaWidgetSelectItem | string | number)[]
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
    select: SchemaWidgetSelectItem[]
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
    presets?: string[]
    format?: 'hex' | 'rgb' | 'hsl' | 'hsv'
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
    onSelectionChange?: (selection: ({ id: any, value: any, path: any })[]) => void
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
    select: SchemaWidgetSelectItem[]
    multiple?: boolean
    showIcon?: boolean
    valueKey?: string    // 用于值
    labelKey?: string    // 用于显示,默认为label  
    maxItems?: number
    minItems?: number
    showResults?: boolean
    itemTemplate?: string
}

export type SchemaUploadWidgetFile = {
    id?: string
    title?: string
    url: string
}

export type SchemaUploadWidgetOptions = {
    /**
     * 文件输入元素的accept属性可以接受MIME类型和文件扩展名
     * 例如: "image/jpeg, .jpg, .png"
     */
    fileTypes?: string[]
    url?: string,
    fileFieldName?: string       // 上传文件字段名称，默认是file
    onRemove?: (file: string) => Promise<void> | void
    // 返回预览内容
    onPreview?: (file: string) => string
    // 上传提示信息
    tips?: string
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
    onResolve?: (response: string | Record<string, any>) => SchemaUploadWidgetFile
    /**
     * 用于显示文件名称，如果没有指定则只显示文件名称
     */
    onFileLabel?: (file: SchemaUploadWidgetFile) => string
    multiple?: boolean
    /**
     * 显示预览的尺寸
     */
    preview?: boolean | string
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
    onlyFileUrl?: boolean
}


export type SchemaPartsWidgetOptions = {
    delimiter?: string
    template?: string
}
