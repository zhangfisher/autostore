/**
 * 
 * 创建一个响应式对象
 * 
 * @example
 * const state = createState({
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
 * state.on({
 *      type,               // 操作，取值: get,set,delete,insert
 *      path,               // 发生变化的路径，如：job.title，或者address.0.city
 *      value,              // 变化后的值
 *      oldValue,           // 变化前的值
 *      parentPath          // 发生变化的父路径
 *      parent              // 发生变化的父对象值
 * }=>{
 *  console.log(type, path, value, oldValue, parentPath, parent)
 * })
 * 
 * state.firstName = "Li"          // set firstName
 * console.log(signal.address[0].city)  // get address.0.city
 * 
 * state.on("address",({value})=>{
 * 
 * 
 * 侦听数组操作
 * state.on("对象路径，如job.title",({value})=>{ *      
 * })
 * 
 * state.on("computed:created")    内置事件
 * 
 * state.watch("job.title",({value})=>{})
 * state.watch(({value})=>{
 * 
 * })
 * 
 */
 
import { ComputedObjects } from "../computed/computedObjects"; 
import { FlexEvent } from "flex-tools/events/flexEvent"
import { assignObject } from "flex-tools/object/assignObject"
import { StateOperateParams } from "./types";
import type { Dict } from "../types";
import { log } from "../utils/log";
import { mix } from 'ts-mixer'
import { getId } from "../utils/getId";
import { ProxyMixin } from "../proxy/mixin"
import { WatchMixin } from "../watch/mixin";
import { ComputedMixin } from "../computed/mixin";
import { EventMixin } from "../events/mixin";
import { ExtendMixin } from "../extend/mixin";
import { ComputedOptions } from "../computed/types";
import { ComputedObject } from "../computed/computedObject";

export type AutoStoreOptions<State extends Dict> = {
    /**
     * 提供一个id，用于标识当前store
     */
    id?:string

    /**
     * 是否启用调试模式
     * @description
     * 
     * 调试模式下会在控制台输出一些日志信息
     * 
     */
    debug?:boolean 
    /**
     *  是否马上执行计算函数
     * 
     * @description
     *  默认情况下，计算函数仅在第一次读取时执行
     *  如果immediate=true时，则在创建对象时马上创建计算对象
    */
    immediate?: boolean 
    /**
      * 是否启用计算
      * 
      * @description
      * 
      * 当enableComputed=false时，会创建计算属性，但不会执行计算函数
      * 可以通过enableComputed方法启用
      * 
      * 相当于全局计算总开关
      * 
      *       
      * 
    */
    enableComputed?:boolean
    /**
     * 
     * 当创建计算属性时调用
     * 
     * @description
     * 
     * 允许在此对计算对象进行一些处理，比如重新封装getter函数，或者直接修改ComputedOptions
     * 
     * @example
     * 
     * createStore({...},{
     *  onCreateComputed(computedObject){
     *      const oldGetter = computedObject.getter
     *      computedObject.getter = function(){
     *          do something
     *          return oldGetter.call(this,...arguments) 
     *      }
     *  }
     * })
     * 
     * 
     * @param keyPath 
     * @param getter 
     * @param options 
     * @returns 
     */
    onCreateComputed?:(this:AutoStore<State>,computedObject:ComputedObject)=> void 
    /**
     * 在传递给计算函数的scope时调用
     * 
     * 默认draft指向的是当前根对象，可以在此返回一个新的draft指向
     * 
     * 比如,return  draft.fields，代表计算函数的draft指向state.fields
     * 
     */
    getRootScope?:()=>void//draft:any,options:{computedType:StateComputedType, valuePath:string[]}):any
    
    /**
     * 当启用debug=true时用来输出日志信息
     * 
     * @param message 
     * @param level 
     * @returns 
     */
    log?:(message:any,level?:'log' | 'error' | 'warn')=>void  
}

export interface AutoStore<State extends Dict = Dict> extends 
    ProxyMixin<State>,
    WatchMixin<State>,
    ComputedMixin<State>,
    EventMixin<State>,
    ExtendMixin<State>
{}

 
@mix(ProxyMixin,WatchMixin,ComputedMixin,EventMixin)
export class AutoStore<State extends Dict>{
    private _data: State;
    public computedObjects: ComputedObjects<State>  
    protected _changesets:FlexEvent<StateOperateParams> = new FlexEvent<StateOperateParams>({wildcard:true,delimiter:"."})    
    private _options: Required<AutoStoreOptions<State>>
    constructor(state: State,options?:AutoStoreOptions<State>) { 
        this._options = assignObject({
            id       : getId(),
            debug    : false,
            immediate: false,
            log      : console.log
        },options) as Required<AutoStoreOptions<State>>        
        this.computedObjects = new ComputedObjects(this)
        this._data = this.createProxy(state, []);        

    }
    get id(){return this._options.id}
    get state() {return this._data;  }
    get changesets(){return this._changesets}    
    get options(){return this._options}

    log(message:any,level?:'log' | 'error' | 'warn'){
        if(this._options.debug) this.log(message,level)
    } 

    /**
     *  对状态中的函数进行扩展
     *  
     *  @description
     * 
     *  创建State时，如果成员中是一个函数，则会调用此方法进行扩展
     * 
     *  -       
     * 
     * - computedObject
     * - watch
     * 
     * @param path 
     * @param value 
     * @param parentPath 
     * @param parent 
     */
    protected installExtends(path:string[],value:Function,parentPath:string[],parent:any){

    }
}

export function createStore<State extends Dict>(initial: State,options?:AutoStoreOptions<State>){
    return new AutoStore<State>(initial,options);
}