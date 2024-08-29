import { ComputedObject } from "../computed/computedObject";

export type StoreEvents = {
    'created'           : undefined;                                    // 响应对象创建后    
    'computed:created'  : ComputedObject                                // 当计算对象创建时
    'computed:done'     : {path:string[],id:string,value:any}           // 当计算函数执行成功后
    'computed:error'    : {path:string[],id:string,error:any}           // 当计算函数执行出错时
    'computed:cancel'   : {path:string[],id:string,reason:'timeout' | 'abort' | 'reentry' | 'error'}       // 当计算函数被取消时
};

