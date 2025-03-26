import type { AutoStore } from "../store/store";
import { Dict } from "../types";
import { getValueByPath } from "../utils/getValueByPath";
import { SchemaObject, SchemaState } from "./types";

export class SchemaManager<State extends Dict> extends  Map<string, SchemaObject> { 
    errors:Dict<string> = {}          // {<路径名称>:"错误信息"}
    constructor(public store:AutoStore<any> ){
        super()
    }    
    add(path:string,validator:SchemaObject){
        this.set(path,validator)
    }
    remove(path:string){
        this.delete(path)
    }   

    /**
     * 返回所有标注了Schema的状态值
     * {
     *    [path]:<value>
     * }
     * @returns 
     */
    getState():SchemaState<State>{
        const state:any= {}
        for(const path of this.keys()){
            state[path] = getValueByPath(this.store.state,path)
        }
        return state as SchemaState<State>
    }

}


