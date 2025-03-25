import type { AutoStore } from "../store/store";
import { Dict } from "../types";
import { SchemaObject } from "./schema";




export class SchemaManager<State extends Dict> extends  Map<string, SchemaObject> { 
    errors:Dict<string> = {}          // {<路径名称>:"错误信息"}
    constructor(public store:AutoStore<State> ){
        super()
    }    
    add(path:string,validator:SchemaObject){
        this.set(path,validator)
    }
    remove(path:string){
        this.delete(path)
    }   
}