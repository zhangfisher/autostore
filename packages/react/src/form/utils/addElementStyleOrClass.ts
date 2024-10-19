import { addClass } from "./addClass"
import { insertStyle } from "./insertStyle"


export function addElementStyleOrClass(input:any,params:string | Record<string,string> | undefined,kind:'style' | 'class'){
    if(!params) return
    const addKind=(el:any,s:string)=>{
        if(kind==='style'){
            insertStyle(input,s)
        }else{
            addClass(input,s)
        }
    }
    if(typeof(params)==='object'){
        Object.entries(params).forEach(([selector,style])=>{
            const el = selector.toLocaleUpperCase()==='ROOT' ? input : input.querySelector(selector)  
            addKind(el,style)
        })
    }else if(typeof(params)==='string'){
        addKind(input,params)
    } 
}