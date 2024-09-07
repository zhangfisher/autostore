import { ComputedObject } from "../computed/computedObject";

export type StoreEvents = {
    'created'           : undefined;                                    // 响应对象创建后    
    'computed:created'  : ComputedObject                                // 当计算对象创建时
    'computed:done'     : {id:string,path:string[],value:any,computedObject:ComputedObject}           // 当计算函数执行成功后
    'computed:error'    : {id:string,path:string[],error:any,computedObject:ComputedObject}           // 当计算函数执行出错时
    'computed:cancel'   : {id:string,path:string[],reason:'timeout' | 'abort' | 'reentry' | 'error',computedObject:ComputedObject}       // 当计算函数被取消时
};

