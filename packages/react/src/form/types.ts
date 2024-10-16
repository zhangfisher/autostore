import { ComputedState, Dict, WatchListenerOptions } from "autostore"
import { CSSProperties } from "react"

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




// ********** useForm **********  

export type UseFormResult={
    ref       : React.RefObject<HTMLFormElement>  
    style?    : CSSProperties
    className?: string
}

export type UseFormInputCallback = (path:string,value:any,input:HTMLElement)=>string | undefined
// 默认情况下校验样式被应用到input元素上，如果input是经过包装的组件
// 如果我们需要将校验样式应用到包装组件上，可以不返回,直接在函数内部处理修改input组件的父元素等
export type UseFormValidateStyle = (path:string,value:any,input:HTMLElement)=>string | undefined
// 返回字符串代表错误信息，返回HTMLElement代表错误信息的容器
export type UseFormValidateMessage = (path:string,message:string | undefined,input:HTMLElement)=>HTMLElement | string
 
export type UseFormOptions<State extends Dict>={
    /**
     * 表单类名
     */
    className?: string | ((state:ComputedState<State>)=>string)
    /**
     * 表单样式
     */
    style?: string | ((state:ComputedState<State>)=>string)
    /**
     * 当校验出错时将错误信息显示在哪个元素上
     * @description
     * - undefined:  写入到默认的当前input的下一个元素中
     * - 选择器： 写入到选择器指向的元素中,选择器支持插值变量{name}代表当前input的name，即状态路径名称
     * 
     */
    errElement?:string
    /**
     * 当校验失败时的在input元素上应用的样式，在校验成功时会移除
     */
    errClasss?:string | Record<string,string>
    /**
     * 当校验失败时的在input元素上应用的样式，在校验成功时会移除
     * 
     * 
     * - string： 样式作用于input元素上
     * - [selector,style string]: 样式作用于input的选择器指向的元素上 。如果selector返回空，则作用于input元素
     *   
     */
    errStyle: string | [string,string]
    
    /**
     * 用来在表单内部选择输入元素
     * 
     * 默认值："input,textarea,select"
     * 
     * 但是也可以用来选择任意元素，但是只求元素内部有input,textarea,select
     * 例：
     *    inputs="input,textarea,select,div.x-spin"
     * 则表单会:
     * 
     * - 选中div.x-spin内部的input,textarea,select，在状态改变时写入数据
     * - 将errStyle,errClass作用于div.x-spin上
     * 
     * 
     * 
     * 
     */
    inputs?:string

    /**
     * 在输入时执行数据校验，成功才会写入状态中
     * 错误时应返回false或错误字符串
     */
    validate?:(path:string,value:any,input:HTMLElement)=>boolean | string
    /**
     * 当状态数据变化时，调用本方法将数据转换为表单输入控制使用的数据
     * 如果返回undefined则保留原值
     * 
     * 例：
     *  state.vip=true  --> 是
     *  state.vip=false --> 否
     * 
     */
    fromState?:(path:string,value:any)=>any
    /**
     * 当表单输入控件变化时，调用本方法将数据转换后再写入状态
     * 
     * 例：将上例中的是/否转换为true/false
     * 
     */
    toState?:(path:string,value:any,input:HTMLElement)=>any
}

export interface UseFormType<State extends Dict> {
    (options?:UseFormOptions<State>): UseFormResult
    (entry?: string | string[],options?:UseFormOptions<State>): UseFormResult
}

