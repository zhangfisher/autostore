import { ComputedBuilder } from "autostore";

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
export type KnownRecord<T, V = never> = {
    [K in keyof T as string extends K ? never :
    number extends K ? never :
    symbol extends K ? never : K
    ]: V extends never ? T[K] : V
};


export type MutableRecord<Items, KindKey extends string = "type"> = {
    [Kind in keyof Items]: { [type in KindKey]: Kind; } & Items[Kind];
}[keyof Items]


// export type SchemaInputWidgetAttrs<State = Dict> = {
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
// }
// export interface SchemaWidgetTreeNode {
//     id: string | number
//     label?: string
//     enable?: boolean
//     selected?: boolean
//     icon?: string
//     children?: unknown[] //Array<SchemaWidgetTreeNode>
// }


// declare module 'autostore' {


//     export interface SchemaWidgetOptions1<State = Record<string, any>> {
//         select: {
//             selection?: 'signle' | 'multiple'
//             clearable?: boolean | ComputedBuilder<boolean, State>,
//             multiple?: boolean | ComputedBuilder<boolean, State>,
//             maxOptionsVisible?: number | ComputedBuilder<number, State>,
//             filled?: boolean | ComputedBuilder<boolean, State>
//             pill?: boolean | ComputedBuilder<boolean, State>
//             placement?: 'top' | 'bottom'
//         },
//         input: SchemaInputWidgetAttrs<State>
//         rating: {
//             max?: number | ComputedBuilder<number, State>
//             precision?: number | ComputedBuilder<number, State>
//         },
//         radio: {},
//         'radio-button': {
//             pill?: boolean | ComputedBuilder<boolean, State>
//         },
//         checkbox: {},
//         time: SchemaInputWidgetAttrs<State>,
//         range: {
//             max?: number | ComputedBuilder<number, State>
//             min?: number | ComputedBuilder<number, State>
//             step?: number | ComputedBuilder<number, State>
//             tooltip?: 'top' | 'bottom'
//         },
//         colorpicker: {
//             format?: ('hex' | 'rgb' | 'hsl' | 'hsv') | ComputedBuilder<('hex' | 'rgb' | 'hsl' | 'hsv'), State>
//             inline?: boolean | ComputedBuilder<boolean, State>
//             opacity?: boolean | ComputedBuilder<boolean, State>
//             uppercase?: boolean | ComputedBuilder<boolean, State>
//             swatches?: string | ComputedBuilder<string, State>
//         },
//         qrcode: {
//             fill?: boolean | ComputedBuilder<boolean, State>
//             background?: string | ComputedBuilder<string, State>
//             radius?: number | ComputedBuilder<number, State>
//             errorCorrection?: 'L' | 'M' | 'Q' | 'H'
//         },
//         date: SchemaInputWidgetAttrs<State>,
//         number: SchemaInputWidgetAttrs<State> & {
//             max?: number | ComputedBuilder<number, State>
//             min?: number | ComputedBuilder<number, State>
//             step?: number | ComputedBuilder<number, State>
//         },
//         email: SchemaInputWidgetAttrs<State>,
//         password: SchemaInputWidgetAttrs<State> & {
//             passwordToggle?: boolean | ComputedBuilder<boolean, State>
//             passwordVisible?: boolean | ComputedBuilder<boolean, State>
//         },
//         textarea: SchemaInputWidgetAttrs<State> & {
//             rows?: number | ComputedBuilder<number, State>
//             resize?: 'none' | 'vertical' | 'auto'
//         },
//         ipaddress: {},
//         switch: {},
//         url: {},
//         'tree-select': {
//             selection: 'single' | 'multiple' | 'leaf'
//             items: SchemaWidgetTreeNode | SchemaWidgetTreeNode[]
//         }
//     }
// }