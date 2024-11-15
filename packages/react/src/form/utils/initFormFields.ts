import { Dict, getVal, PATH_DELIMITER } from "autostore";
import type { AutoFormFieldContexts } from "../Form";
import { EMPTY_VALUE } from "../consts";
import { stateToField } from "./stateToField";
import { UseFormOptions } from "../types";
import { ReactAutoStore } from "../../store";



export function initFormFields<State extends Dict>(store: ReactAutoStore<State>,fields:AutoFormFieldContexts,options:UseFormOptions<State>){
    const snap = store.getSnap();
    Object.entries(fields).forEach(([name,fields]) => {
        const path = name.split(PATH_DELIMITER);				
        const value = getVal(snap, path, EMPTY_VALUE);// 如果指定的路径不存在，则返回的是空值
        if (value !== EMPTY_VALUE) {
            fields.forEach(field=>{
                field.initial = value
                stateToField(field,value,options,true)
            })
        }  
    })
}