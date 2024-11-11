import { AsyncComputedValue } from "../computed";
import { isAsyncComputedValue } from "./isAsyncComputedValue";



/**
 * 创建一个异步计算值。如果传入的值已经是 AsyncComputedValue 类型，则直接返回该值；
 * 否则，创建一个新的 AsyncComputedValue 对象，并使用传入的值和其他可选参数进行初始化。
 * @param value - 要包装或初始化的值。
 * @param other - 可选参数，用于覆盖默认的 AsyncComputedValue 属性。
 * @returns 返回一个 AsyncComputedValue 对象。
 */
export function createAsyncComptuedValue<T=any>(value:T,other?:Omit<Partial<AsyncComputedValue>,"value">):AsyncComputedValue<T>{
    if(isAsyncComputedValue(value)){        
        return Object.assign({},value,other)
    }else{
        return Object.assign({
            value,
            loading:false,
            retry:0,
            progress:0,
            timeout:0,
            error:null,
            run:()=>{},
            cancel:()=>{}
        },other)    
    }
    
}
 