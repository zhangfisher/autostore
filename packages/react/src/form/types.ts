import { AutoStore, AutoStoreOptions, ComputedState, Dict, WatchListenerOptions } from "autostore"
import { MemoExoticComponent } from "react"
import { AutoForm } from "./Form"
import { ReactAutoStore } from '../store';
import { AutoField } from "./Field";

export type InputBindings<Value=any>={ 
    value?   : Value
    onChange?: (e:any)=>void 
}
 
export interface InputBindingsType{
    <Value=any>(selector: string):InputBindings<Value>    
    <Value=any>(selector: string[]):InputBindings<Value>
}

 
// ********** useInput **********  

export type UseInputBindings<Value> = Value extends Dict ? Record<keyof Value,{
    value:any
    onChange:(e:any)=>void
}> : Value

export type UseInputOptions={
     
}

export type UseInputGetter<Value,State extends Record<string, any>>= (state:ComputedState<State>)=>Value
export type UseInputSetter<Value,State extends Record<string, any>>= (input:Value,state:ComputedState<State>)=>void

export interface UseInputType<State extends Dict> {
    (): UseInputBindings<ComputedState<State>>
    <Value>(selector: string,options?:UseInputOptions): UseInputBindings<Value>
    <Value>(selector: string[],options?:UseInputOptions): UseInputBindings<Value>
    <Value>(getter: UseInputGetter<Value,State>,setter:UseInputSetter<Value,State>,options?:UseInputOptions):UseInputBindings<Value>
}

// ********** useBindings **********  

 
 
export type FormBindingsState<T extends Dict> = {
    [K in keyof T]: T[K] extends Dict ? FormBindingsState<T[K]> 
                                        : ( T[K] extends any[] ? FormBindingsState<T[K]> 
                                            : Required<InputBindings<T[K]>>
                                        )
};

 
export interface UseFormBindingsType<State extends Dict> {
    (entry?: string,options?:WatchListenerOptions): FormBindingsState<ComputedState<State>> 
}


export type ValidateResult = {
    path : string
    value: boolean
    error: string | null | undefined
}
  

// ********** useForm **********  

export type UseFormResult<State extends Dict>={ 
    Form        : MemoExoticComponent<AutoForm<State>>
    Field       : MemoExoticComponent<AutoField<State>>  
    valid       : boolean
    dirty       : boolean
} & Pick<ReactAutoStore<State>,
    '$' |'signal' | 'useState' | 'useAsyncState' | 'useDeps' | 'useField'
    | 'bind' | 'useWatch' | 'useBindings'
    | 'watch' | 'update' | 'batchUpdate' | 'silentUpdate'
    | 'peep' | 'collectDependencies' | 'trace'
    | 'id' | 'operates' | 'state' | 'peeping' | 'batching' | 'silenting'
    | 'log' | 'destroy' | 'getSnap'

>


export type HTMLFormInputElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export type UseFormInputCallback = (path:string,value:any,input:HTMLElement)=>string | undefined
// 默认情况下校验样式被应用到input元素上，如果input是经过包装的组件
// 如果我们需要将校验样式应用到包装组件上，可以不返回,直接在函数内部处理修改input组件的父元素等
export type UseFormValidateStyle = (path:string,value:any,input:HTMLElement)=>string | undefined
// 返回字符串代表错误信息，返回HTMLElement代表错误信息的容器
export type UseFormValidateMessage = (path:string,message:string | undefined,input:HTMLElement)=>HTMLElement | string
 
export type UseFormOptions<State extends Dict> = AutoStoreOptions<State> & {
    /**
     * 可选，表单元素的ref
     */
    ref?:React.RefObject<HTMLFormElement>
    /**
     * 当使用外部store时，可以指定entry来限定表单的数据范围
     * 可选
     */
    entry?: string[]
    /**
     * 在初始化时是否进行数据校验
     * 默认=true
     */
    validAtInit?:boolean
    /**
     * 何时进行字段校验
     */
    validOn?:'input' | 'lost-focus' | 'submit'
    /**
     * 表单类名
     * 默认值：autoform
     */
    className?: string | ((state:ComputedState<State>)=>string)
    /**
     * 字段类型
     * 默认值： field
     */
    fieldClassName?:string 
    /**
     * 表单样式
     */
    style?: string | ((state:ComputedState<State>)=>string)
    /**
     * 当校验出错时，如何报告错误
     * 
     * - default:  采用浏览器默认的校验错误提示方式
     * - custom:   自定义方式，校验信息将写入到[data-validate-field=xxxx]所在的元素
     * 
     */
    customReport? : boolean 
    /**
     * 用来获取表单内的所有输入控件的CSS选择器
     * 默认="[name]" ，即所有字段均具有名称
     */
    findFields?:(from:HTMLFormElement)=>HTMLElement[]
    /**
     * 在输入时执行数据校验，成功才会写入状态中
     * 错误时应返回false或错误字符串
     */
    validate?:(path:string,value:any,part:string | null,fieldEle:HTMLElement)=>boolean | string
    /**
     * 当状态数据变化时，调用本方法将数据转换为表单输入控制使用的数据
     * 如果返回undefined则保留原值
     * 
     * 例：
     *  state.vip=true  --> 是
     *  state.vip=false --> 否
     * 
     * 返回值将写入input
     * 
     */
    fromState?:(path:string,stateValue:any,part:string | undefined)=>any
    /**
     * 当表单输入控件变化时，调用本方法将数据转换后再写入状态
     * 
     * 例：将上例中的是/否转换为true/false
     * 
     * 
     */
    toState?:(path:string,inputValue:any,part:string | undefined,stateValue:any,input:HTMLInputElement)=>any
}

export type UseFormType<State extends Dict>  = {
    (store:ReactAutoStore<State> | AutoStore<State>,options?:UseFormOptions<State>): UseFormResult<State>
    (state:State,options?:UseFormOptions<State>): UseFormResult<State>
}


 

export type NonFunction<T> = T extends Function ? never : T;

 