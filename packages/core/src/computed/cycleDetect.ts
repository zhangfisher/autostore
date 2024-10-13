import { AutoStore } from '../store/store';
import { detectCyclePath } from '../utils/detectCyclePath';
import { ComputedObject } from './computedObject';


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
    detectOptions: Required<AutoStore<any>['options']['cycleDetect']>
    constructor(public computedObject:ComputedObject){
        this.path = computedObject.path.join('.')
        this.steps.push(this.path)
        this.detectOptions = Object.assign({
            interval:5000,
            cycleCount:8
        },computedObject.store.options.cycleDetect) as  Required<AutoStore<any>['options']['cycleDetect']>
    }
    
    /**
     * 本方法应该在异步函数第一次运行时调用
     */
    start(path:string[]){
        this.running = true
        this.steps.push(path.join('.'))
        this._watcher = this.computedObject.store.watch((event)=>{
            if(this.steps.length<500){
                this.steps.push(event.path.join('.'))
            }
        },{operates:'read'})        
        const { interval} = this.detectOptions
        if(interval>=500){
            this.tmId = setTimeout(()=>{
                this._watcher.off()   
                this.detectSteps()
            },interval)
        }        
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
    private detectSteps(){
        const cyclePaths = detectCyclePath(this.steps,this.path)
        if(cyclePaths.size>0){            
            const { onDetected,cycleCount } = this.detectOptions
            for(let [ paths,count ] of cyclePaths){
                if(count <=cycleCount) continue 
                if(typeof(onDetected )==='function'){
                    const result = onDetected(paths,this.computedObject)
                    if(result==='ignore') return false
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
        if(this.steps.length>100){
            this._watcher.off()
            this.detectSteps()
            this.steps=[]
        }
    }

}