/**
 * 
 * 
 * 管理依赖
 * 
 * 工作原理
 * 
 * 依赖关系链生成算法
 * 
 * 1. a->b
 *   _chains.push([b,a])
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
 * 5. 当计算对象是动态生成的，而不是直接声明在state上，即attached=false,此时计算对象是没有path的，此时使用#id代替path
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

import { StateOperate } from ".";
import { ComputedObject } from "../computed/computedObject";
import { PATH_DELIMITER } from "../consts";
import { forEachObject, isPathEq } from "../utils";
import { mergeDepChains } from "../utils/mergeDepChains";
import type { AutoStore } from "./store";
 
export class DependencieManager{
    private _chains:string[][]=[]                         // 保存依赖关系链
    constructor(public store:AutoStore<any>){
        this.createDeps()
        this.store.watch(this.onUpdate.bind(this),{operates:'write'})
    }
    get chains(){ return this._chains }
    /**
     * 侦听变更事件
     * @param state 
     */
    private onUpdate(params:StateOperate){ 
        this.noticeChange(params)   
    }

    private addDepends(depStart:string ,deps:string[][]){ 
        deps.forEach(dep=>{
            if(dep && dep.length>0){ 
                const newDep= dep.join(PATH_DELIMITER) 
                if(this._chains.length===0){
                    this._chains.push([newDep,depStart])
                }else{                    
                    const existdChains = this._chains.filter((chain)=>{                                                
                        return newDep===chain[chain.length-1]// 如果依赖的起始路径和当前路径相同，则将依赖插入到当前路径后面
                    })
                    if(existdChains.length===0){
                        this._chains.push([newDep,depStart])
                    }else{
                        existdChains.forEach(chain=>{                        
                            chain.push(depStart)
                        })
                    }
                }
            }
        }) 
    }
    /**
     * 
     * 当path指定的状态值变化时，调用本方法，通知所有依赖于path的计算属性对象重新执行
     * 
     * @param path 
     * @param oldValue 
     * @param newValue 
     */
    private noticeChange(params:StateOperate){
        const { path} = params
        const pathStr = Array.isArray(path) ? path.join(PATH_DELIMITER) : path
        
        const chains = this._chains.filter(chain=>chain.includes(pathStr))
                                .map(chain=>{
                                    const index = chain.indexOf(pathStr)
                                    return chain.slice(index)
                                })                                
                                .reduce((acc,chain)=>{                  // 对chains进行去重
                                    if(acc.length===0){
                                        acc.push(chain)
                                    }else{
                                        const exist = acc.find(c=>c.join('')===chain.join(''))
                                        if(!exist) acc.push(chain)
                                    }
                                    return acc
                                },[] as string[][])
        const computedObjs:ComputedObject[] = []
        chains.forEach(chain=>{            
            // 找出computedObjects里面path==chain的对象
            for(let obj of this.store.computedObjects.values()){
                if(obj.path){
                    chain.forEach((spath)=>{
                        if(isPathEq(obj.path!,spath.split(PATH_DELIMITER))){
                            computedObjs.push(obj)
                        }
                    })                    
                }                
            }                        
        })
        this.store.silentUpdate(()=>{
            computedObjs.forEach(obj=>{
                obj.run({changed:params})
            })
        })
    }
    /**
     * 遍历对象，会触发所有计算属性对象的创建,然后生成依赖关系链
     */
    private createDeps(){        
        // 1. 遍历对象会触发所有计算属性对象的创建
        forEachObject(this.store.state) 
        // 2. 遍历计算属性对象
        this.store.computedObjects.forEach(obj=>{ 
            this.addDepends(obj.path ? obj.path.join(PATH_DELIMITER) : `#${obj.id}` ,obj.depends!)       
        }) 
        this._chains = mergeDepChains(this._chains)
    }

}