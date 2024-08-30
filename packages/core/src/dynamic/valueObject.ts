/**
 * 
 * 在创建对象时，如果对象的成员值是一个函数，则代表这是一个动态对象
 * autoda会为创建一个ValueObject
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

import { AutoStore } from "../store/store" 
import { getDependPaths } from "../utils/getDependPaths"; 
import { getVal } from "../utils/getVal"
import { joinValuePath } from "../utils/joinValuePath";
import { LogLevel, LogMessageArgs } from "../utils/log";
import { DynamicValueContext, DynamicValueDescriptor, DynamicValueOptions } from './types';


export class DynamicValueObject<
    Value=any,Scope=any,    
    Options extends DynamicValueOptions = DynamicValueOptions,
>{
    private _path:string[] = []
    private _parentPath:string[] = []
    private _options:Required<Options>
    private _getter:any
    private _depends: string[][]| undefined
    private _id:string = ""
    /**
     *  构造函数。
     * 
     * @param {AutoStore<any>} store  
     * @param {DynamicValueContext} context - 动态值上下文，指该动态值所有的路径、值、父路径和父对象引用。
     * @param {DynamicValueDescriptor<Getter, Options>} descriptor - 动态值描述符，包含了动态值的元数据。
     */
    constructor(public store:AutoStore<any>,public context:DynamicValueContext,public descriptor:DynamicValueDescriptor){
        this._path       = context.path
        this._parentPath = context.parentPath
        this._getter     = descriptor.getter 
        this._options    = Object.assign({
            enable: true,
            group: "",
            depends: []
        }, descriptor.options) as unknown as Required<Options>
        this._id         = this._options.id ?? joinValuePath(this._path)
        this._depends    = getDependPaths(this._path,this._options.depends )
        this.onInitial()   
    } 
    get options(){ return this._options   }
    get id(){return this._id }
    get enable(){ return this._options.enable as boolean }
    set enable(value:boolean){ this._options.enable = value }
    get group(){return this.options.group}
    get value(){ return getVal(this.store.state,this._path) as unknown as Value}       
    get path(){ return this._path }
    get getter(){ return this._getter}
    set getter(value){ this._getter= value  } 
    get depends(){return this._depends}
    protected log(message:LogMessageArgs,level:LogLevel="log"){
        this.store.log(message,level)
    }
    toString(){ return `DynamicValueObject<${this._path.join(".")}` }
    protected onInitial(){

    }    
    

}