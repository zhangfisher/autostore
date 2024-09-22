/**
 * 
 * 
 * 管理依赖
 * 
 * 工作原理
 * 
 * 依赖关系链图生成算法
 * 
 * 1. a->b
 *   _chains.push([a,b])
 * 2. b->c
 *   遍历_chains,如果有以b为结尾的,则将c插入到b后面
 *   [a,b,c]
 * 3. d->a
 *   遍历_chains,,如果有以d为结尾的, 则将a插入到d后面
 *   否则新创建一个依赖[d,a]
 * 
 * 4. e->a,b
 *   相当于e->a,e->b
 * 
 *  
 * 
 *  如果计算对象path==undefined当动态计算对象时，由于没有attach在某个路径上，所有其path为undefined
 *  此种情况是无法生成依赖关系链的
 *  因此，针对没有attach的计算对象，则使用其id来作为path
 *  这样就一定会存在自己的依赖关系链，如["id",'a','b']
 * 
 *   obj = store.computedObjects.create((state)=>state.a+state.b)
 *   obj.path = undefined
 *   obj.depends = [['a'],['b']]
 *   obj.id==='m1'
 *   
 *   会生成
 *       ["#m1",'a']
 *       ["#m1",'b']
 *     
 *  如果存在依赖链
*  ['x','d','f'] 
*  ['a','b','c','d']
*  ['c','a']
 *  ['zzz','b','m','y'] 
 *  ["#m1",'a']
 *  
 *  
 *  当在d变更时
 * 
 * 这样就生成一系列的依赖关系链
 * 
 * 
 *  
 *  
 * 
 * 
 * 
 * 
 */

import { PATH_DELIMITER } from "../consts";
import { forEachObject } from "../utils";
import type { AutoStore } from "./store";



export class DependencieManager{
    private _chains:string[][]=[]                         // 保存依赖关系链
    constructor(public store:AutoStore<any>){
        this.collectDeps()
    }
    private addDepends(depStart:string ,deps:string[][]){
        const  chainIds:number[] = []
        deps.forEach(dep=>{
            if(dep.length>1){ 
                const newChain = []
                const newDep= dep.join(PATH_DELIMITER)
                if(depStart.startsWith("#")){ // 如果path存在
                }else{
                    this._chains.forEach((chain)=>{
                        const depLast = chain[chain.length-1]
                        // 如果依赖的起始路径和当前路径相同，则将依赖插入到当前路径后面
                        if(depLast === depStart){
                            chain.push(newDep)
                        }else{
                            newChain.push([depStart,newDep])
                        }
                    }) 
                }
            }
        })
        return chainIds
    }
    /**
     * 遍历对象，会触发所有计算属性对象的创建
     */
    private collectDeps(){        
        // 1. 遍历对象会触发所有计算属性对象的创建
        forEachObject(this.store.state)
        // const listener = this.store.changesets.onAny((data:StateOperateParams)=>{
        //     data
        // })
        // 2. 遍历计算属性对象
        this.store.computedObjects.forEach(obj=>{
            if(obj.async){

            }else{
                const chainIds = this.addDepends(obj.path ? obj.path.join(PATH_DELIMITER) : `#${obj.id}` ,obj.depends!)
            }
        }) 
    }

}