/**
 * 
 * import { installCycleDetectExtend  } from "@autostore/devtools"
 * 
 * installCycleDetectExtend({....})
 * 
 * 
 */
import { analysisCyclePath } from "./utils"


export type CycleDetectExtendOptions = {    
    /**
     * 检测循环依赖的时间间隔，单位ms
     * 0 表示不检测循环依赖
     * 默认是2000
     */
    interval?:number
    /**
     * 当检测到多少个循环时视为循环依赖         
     */
    cycleCount?:number


    maxOpereates?:number
}

/**
 * 
 * - 在异步计算第一次执行时调用
 * cycleDetector.start()
 * 
 * 
 * 
 */
export class AsyncCycleDetector{
    steps:string[] = []
    running:boolean = false
    private tmId:any
    private _watcher:any
    path:string
    options: Record<string,any>
    constructor(public computedObject:any,options?:Record<string,any>){
        this.path = computedObject.path.join('.')
        this.steps.push(this.path)
        this.options = Object.assign({
            interval    : 3000,
            cycleCount  : 8,
            maxOpereates: 100
        },options)
    }    
    /**
     * 本方法应该在异步函数第一次运行时调用
     */
    start(){
        this.running = true
        this.steps.push(this.path)
        this._watcher = this.computedObject.store.watch((event:any)=>{
            if(this.steps.length<500){
                this.steps.push(event.path.join('.'))
            }
        },{operates:'read'})          
    }
    /**
     * 
     * 开始检测是否存在循环依赖
     * 
     * 
     * ["a",'d','c','b','a','d','c','b','a']
     * 
     * 
     * 编写一个函数，检测是否存在循环依赖
     * 
     * 逻辑如下：
     * 
     * 对this.steps里面是否存在连续的相同的路径，如果存在，则表示存在循环依赖
     * 
     * 
     * @returns 
     */
    private analysisCycleSteps(){
        const cyclePaths = analysisCyclePath(this.steps,this.path)
        if(cyclePaths.size>0){            
            const { onDetected,cycleCount } = this.options
            for(let [ paths,count ] of cyclePaths){
                if(count <=cycleCount) continue 
                if(typeof(onDetected )==='function'){
                    const result = onDetected(paths,this.computedObject)
                    if(result==='ignore') return 
                    if(result==='throw') {
                        throw new Error(`Cycle detected in computed <${this.computedObject.toString()}>`)
                    }
                    if(result==='disable') {
                        this.computedObject.enable = false
                    }
                }else{
                    this.computedObject.store.log(`Cycle detected in computed <${this.computedObject.toString()}>`,'warn')
                }    
            }
        }
    }
    detect(){
        if(this.steps.length>this.options.maxOpereates){
            this._watcher.off()
            try{
                this.analysisCycleSteps()
            }finally{            
                this.steps=[]
            }
        }
    }
}


function createCycleDetectExtend(options?:CycleDetectExtendOptions){
    return function cycleDetectExtend(store:any){
        const { onObserverCreated } = store.options
        if(typeof(onObserverCreated)!=='function'){
            store.options.onObserverCreated = (observerObject:any)=>{
                // 只对异步计算属性进行循环依赖检测
                if(observerObject.type==='computed' && observerObject.async){
                    observerObject._cycleDetector = new AsyncCycleDetector(observerObject,options)
                    const oldRun = observerObject.run
                    // 封装原始的run方法
                    observerObject.run = (async function(options:any){
                        // 在第一次运行时启动循环依赖检测
                        if(options && options.first===true){
                            observerObject._cycleDetector.start()
                        }else{
                            observerObject._cycleDetector.detect()   
                        }
                        return await oldRun.apply(observerObject,options)
                    }).bind(observerObject)
                }
            }
        }
    } 

}


export function installCycleDetectExtend(options?:Record<string,any>){
    // @ts-ignore
    if(!globalThis.__AUTOSTORE_EXTENDS__){
        // @ts-ignore
        globalThis.__AUTOSTORE_EXTENDS__=[]
    }
    // @ts-ignore
    globalThis.__AUTOSTORE_EXTENDS__.push(createCycleDetectExtend(options))
 
}




    // /**
    //  * 当检测到循环依赖时的回调函数
    //  * @param paths 
    //  * @returns 
    //  */
    // onComputedCycleDetected?: (paths:string,computedObject:ComputedObject)=>'ignore' | 'throw' | 'disable'
    // cycleDetectorInterval?:number
    // cycleDetectorCount?:number
    // /**
    //  * 是否启用循环依赖检测
    //  */
    // cycleDetect?:{
    //     /**
    //      * 当检测到循环依赖时的回调函数
    //      * @param paths 
    //      * @returns 
    //      */
    //     onDetected?:(paths:string,computedObject:ComputedObject)=>'ignore' | 'throw' | 'disable'
    //     /**
    //      * 检测循环依赖的时间间隔，单位ms
    //      * 
    //      * 0 表示不检测循环依赖
    //      * 默认是2000
    //      */
    //     interval?:number
    //     /**
    //      * 当检测到多少个循环时视为循环依赖         
    //      */
    //     cycleCount?:number
    // }
