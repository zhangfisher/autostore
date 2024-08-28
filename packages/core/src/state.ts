/**
 * 
 * 创建一个响应式对象
 * 
 * @example
 * const signal = createSignal({
 *      firstName: 'John',
 *      lastName: 'Doe'
 *      age: 30
 *      address: [
 *          {city: 'New York', street: 'Wall Street'},
 *          {city: 'Los Angeles', street: 'Hollywood Blvd'}
 *          {city: 'San Francisco', street: 'Golden Gate'}
 *      ],
 *      job: {
 *          title: 'Software Engineer',
 *          company: 'Google'
 *          salary: 100000
 *      }    
 * })
 * 
 * 侦听读取
 * signal.on({
 *      type,            // 操作，取值: get,set,delete,insert
 *      path,               // 发生变化的路径，如：job.title，或者address.0.city
 *      value,              // 变化后的值
 *      oldValue,           // 变化前的值
 *      parentPath          // 发生变化的父路径
 *      parent              // 发生变化的父对象值
 * }=>{
 *  console.log(type, path, value, oldValue, parentPath, parent)
 * })
 * 
 * signal.firstName = "Li"          // set firstName
 * console.log(signal.address[0].city)  // get address.0.city
 * 
 * 
 * 
 * 
 * 
 */

import { ComputedObject } from "./computed/computedObject";
import { isRaw } from "./utils/isRaw";
import { createComputedDescriptor } from "./utils/createComputedDescriptor";
import { ComputedObjects } from "./computed/computedObjects";
import { computed } from './computed/computed';

export type SignalOperates = 'get' | 'set' | 'delete'                   // 用于对象
                            | 'insert' | 'update' | 'remove'            // 用于数组

export type SignalListenerArgs<T=any,P=any> = {
    type      : SignalOperates,
    path      : string[],
    indexs    : number[],               // 数组操作时，操作的索引，如[1,2]表示操作了数组的第1个和第2个元素
    value     : T,
    oldValue  : T,
    parentPath: string[],
    parent    : P
}
export type SignalListener = (event: SignalListenerArgs) => void;


export type WatchListener<T=any,P=any> = (args?:Omit<SignalListenerArgs<T,P>,'type'>)=>void


export type CreateStateableOptions = {
    asyncNotice?:boolean                    // 使用异步通知
    delimiter?:string                       // 路径分隔符，默认为'.'
}

export class Stateable<T extends object> {
    private _data: T;
    private listeners: Map<number, SignalListener> = new Map();
    private nextListenerId: number = 0;
    private _options:Required<CreateStateableOptions>;
    public computedObjects:ComputedObjects<T>  
    constructor(initialData: T,options?:CreateStateableOptions) {
        this._options = Object.assign({
            asyncNotice:false,
            delimiter:'.'
        },options);
        this.computedObjects = new ComputedObjects(this)
        this._data = this.createProxy(initialData, []);        
    }

    public get data() {return this._data;  }


    private hookArrayMethods(array: any[], name:string,method:Function, parentPath: string[]) {
        if(name==='push'){
            return (...args: any[]) => {
                const oldLength = array.length;
                const result = method.apply(array, args);
                if (array.length > oldLength) {
                    const indexs = Array.from({length: array.length - oldLength}, (_, i) => i + oldLength);                 
                    this.notify('insert',parentPath, indexs, args, undefined, parentPath, array);
                }
                return result;
            };
        }else if(name=='splice'){
            return (start: number, deleteCount: number, ...items: any[]) => {
                const deletedItems =deleteCount==0 ?  [] : array.slice(start, start + deleteCount);
                const result = method.apply(array, [start, deleteCount, ...items]);                
                if (deletedItems.length > 0) {
                    const deleteIndexs = Array.from({ length: deletedItems.length }, (_, i) => start + i);
                    this.notify('remove',parentPath,deleteIndexs, deletedItems,undefined, parentPath, array);
                }
                if (items.length > 0) {
                    const addIndexs = Array.from({ length: items.length }, (_, i) => start + i);
                    this.notify('insert', parentPath,addIndexs, items, undefined, parentPath, array);
                }
                return result;
            };
        }else if(name=='unshift'){            
            return (...args: any[]) => {
                const oldLength = array.length;
                const result = method.apply(array, args);
                if (array.length > oldLength) {
                    const indexs = Array.from({ length: array.length - oldLength }, (_, i) => i);
                    this.notify('insert', parentPath,indexs, args, undefined, parentPath, array);
                }
                return result;
            };
        }else{
            return method
        }        
    }

    private createProxy(target: any, parentPath: string[]): any {
        if (typeof target !== 'object' || target === null) {
            return target;
        }
        if(isRaw(target)) return target
        return new Proxy(target, {
            get: (obj, prop, receiver) => {
                const value = Reflect.get(obj, prop, receiver);
                const path = [...parentPath, String(prop)];
                if(!Object.hasOwn(obj,prop) || typeof value === 'function'){
                    if(typeof value === 'function'){
                        if(Array.isArray(obj)){
                            return this.hookArrayMethods(obj,prop as string,value,parentPath); 
                        }else if(!isRaw(value)){ 
                            return this.createComputed(path,value,parentPath,obj) 
                        }else{
                            return value
                        }
                    }else{
                        return value
                    }                   
                }                
                this.notify('get', path,[], value, undefined, parentPath, obj);
                return this.createProxy(value, path);
            },
            set: (obj, prop, value, receiver) => {
                const oldValue = obj[prop];
                const path = [...parentPath, String(prop)];
                const success = Reflect.set(obj, prop, value, receiver);
                if (success) {
                    if (Array.isArray(obj)) {
                        if(prop === 'length'){
                            if (value < oldValue) {
                                this.notify('remove', parentPath, [],oldValue,undefined,  parentPath, obj);
                            }
                        }else{
                            this.notify('update', parentPath, [Number(prop)], value, oldValue, parentPath, obj);
                        }                        
                    } else {
                        this.notify('set', path, [], value, oldValue, parentPath, obj);
                    }
                }
                return success;
            },
            deleteProperty: (obj, prop) => {
                const value = obj[prop];
                const path = [...parentPath, String(prop)];
                const success = Reflect.deleteProperty(obj, prop);
                if (success) {
                    this.notify('delete', path, [],value, undefined, parentPath, obj);
                }
                return success;
            }
        });
    }
    private notifyListeners(type: SignalOperates, path: string[], indexs:number[] , value: any, oldValue: any, parentPath: string[], parent: any) {
        for (const listener of this.listeners.values()) {
            listener({ type, path,indexs, value, oldValue, parentPath, parent });
        } 
    }
    private notify(type:SignalOperates, path: string[], indexs:number[] , value: any, oldValue: any, parentPath: string[], parent: any) {          
        if(this._options.asyncNotice){
            setTimeout(()=>this.notifyListeners(
                type, path,indexs, value, oldValue, parentPath, parent
            ),0)
        }else{
           this.notifyListeners(type, path,indexs,  value, oldValue, parentPath, parent);
        }        
    }
    /**
     * 注册侦听器用于监听数据读取操作变化
     * 
     * 
     * @param listener 
     * @returns 
     */
    public on(listener: SignalListener): number {
        const listenerId = this.nextListenerId++;
        this.listeners.set(listenerId, listener);
        return listenerId;
    }

    public off(listenerId: number) {
        this.listeners.delete(listenerId);
    }
    public once(listener: SignalListener): number {
        const listenerId = this.nextListenerId++;
        const onceListener: SignalListener = (event) => {
            listener(event);
            this.off(listenerId);
        };
        this.listeners.set(listenerId, onceListener);
        return listenerId;
    }
    /**
     * 清除所有侦听器
     */
    public clear(){
        this.listeners.clear()
    }
    /**
     * 监视数据变化，并在变化时执行指定的监听器函数。
     * @param {string|string[]} path - 要监视的文件路径或目录路径，可以是单个字符串或字符串数组。
     * @param {SignalListener} listener - 当监视的文件或路径发生变化时执行的回调函数。
     * @param {Object} [options] - 可选参数，用于配置监视行为。
     * @param {boolean} [options.onlyOne=false] - 如果设置为 true，则监听器在触发一次后自动移除。
     * @returns {number} - 返回一个表示监听器的数字标识符，用来取消监听。
     */
    watch(keyPaths:string | (string|string[])[],listener:WatchListener,options?:{onlyOne:boolean }):number{
        const opts = Object.assign({onlyOne:false},options)
        const paths:string[][] = (Array.isArray(keyPaths) ? keyPaths : keyPaths.split(this._options.delimiter)).map(v=>typeof(v)==='string'?v.split(this._options.delimiter):v)
        const listenerId = this.on((event)=>{
            if(event.type === 'set'){
                if(paths.some(path=>path.every((v,i)=>v===event.path[i]))){
                    listener(event)
                    if(opts.onlyOne){
                        this.off(listenerId)
                    }
                }
            }
        })
        return listenerId
    }
    /**
     * 
     * 创建一个计算属性对象
     * 
     * 当data中的成员是一个函数时，会自动创建一个计算属性对象
     * 
     * 
     */
    private createComputed(path:string[],value:Function,parentPath:string[],parent:object){
        const descriptor =  createComputedDescriptor(value.bind(this))   
        if(!descriptor) throw new Error('createComputedDescriptor error')
        const computedObj = new ComputedObject(this,{
            path,
            parentPath,
            parent,
            depends:[]            
        },descriptor)                
        this.collectDependencies(computedObj)
        return computedObj.value    
    }

    /**
     * 自动收集同步依赖
     * 
     * 如果计算函数是一个同步函数，则可以通过运行函数来收集依赖
     * 
     */
    private collectDependencies(computedObj:ComputedObject){
        if(!computedObj.async) return 
        const dependencies:string[][] = []       
        const listenerId = this.on((event)=>{
            if(event.type === 'get'){
                if(event.path.length === computedObj.path.length){
                    const indexs = event.path.slice(0,computedObj.path.length)
                    if(indexs.every((v,i)=>v===computedObj.path[i])){
                        dependencies.push(indexs)
                    }
                }
            }
        })
        // 第一次运行getter函数，收集依赖
        computedObj.run()
        this.off(listenerId)
    }

}

export function createState<T extends object>(initial: T,options?:CreateStateableOptions): Stateable<T> {
    return new Stateable(initial,options);
}
