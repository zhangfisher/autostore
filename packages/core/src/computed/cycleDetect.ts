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
    constructor(public computedObject:ComputedObject){
        this.steps.push(computedObject.path.join('.'))
    }
    start(){
        this.running = true
        this._watcher = this.computedObject.store.watch((event)=>{
            this.steps.push(event.path.join('.'))
        },{operates:'read'})
        this.tmId = setTimeout(()=>{
            if(this.detectSteps()){
                
            }           
        },2000)
    }
    /**
     * 
     * @returns 
     */

    private detectSteps(){
        return true
    }
    stop(){
        clearTimeout(this.tmId)
        this._watcher.off()
    }
}