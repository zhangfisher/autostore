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
     * 当检测到多少个循环时视为循环依赖         
     */
    cycleCount?:number
    /**
     * 
     * 当检测时间操作数量达到此值时，停止检测
     * 
     */
    maxOpereates?:number
    /**
     * 指定仅作用于指定的store
     * =[]代表所有store均生效
     */
    stores?:string[]
    /**
     * 
     */
    onDetected?:(paths:string[],computedObject:any)=>'ignore'|'throw'|'disable' 

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
    private _watcher:any
    path:string
    options: Record<string,any>
    constructor(public computedObject:any,options?:Record<string,any>){
        this.path = computedObject.path.join('.')
        this.steps.push(this.path)
        this.options = Object.assign({
            cycleCount  : 8,
            maxOpereates: 200,
            stores:[]
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
        const [paths,count] = analysisCyclePath(this.steps,this.path)
        const { onDetected,cycleCount } = this.options
        if(count<cycleCount) return
        this.computedObject.store.log(`CycleDepend detected in <${this.computedObject.toString()}>: ${paths}`,'warn')
        if(typeof(onDetected )==='function'){
            const result = onDetected(paths,this.computedObject)
            if(result==='ignore'){
                return
            }else if(result==='disable') {
                this.computedObject.enable = false
            }else{
                throw new Error(`CycleDepend found in <${this.computedObject.toString()}>: ${paths}`)
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
        if(typeof(onObserverCreated) ==='function'){ 
            // 当store的onObserverCreated选项已经配置时，cycleDetectExtend不能生效
            store.log(`Store<${store.id}> onObserverCreated is already configured, cycleDetectExtend is disabled`,"warn")
        }else{
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
            store.log("cycleDetectExtend is already installed")
        }
    } 

}


export function installCycleDetectExtend(options?:CycleDetectExtendOptions){
    // @ts-ignore
    if(!globalThis.__AUTOSTORE_EXTENDS__){
        // @ts-ignore
        globalThis.__AUTOSTORE_EXTENDS__=[]
    }
    // @ts-ignore
    globalThis.__AUTOSTORE_EXTENDS__.push(createCycleDetectExtend(options))
 
}
 