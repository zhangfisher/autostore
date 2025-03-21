import type { AutoStore } from "../store/store";
import { Dict } from "../types";
import { ValidatorObject } from "./validator";




export class ValidatorManager<State extends Dict> extends  Map<string, ValidatorObject> { 
    errors:Dict<string> = {}          // {<路径名称>:"错误信息"}
    constructor(public store:AutoStore<State> ){
        super()
    }    
    add(path:string,validator:ValidatorObject){
        this.set(path,validator)
    }
    remove(path:string){
        this.delete(path)
    }   
}