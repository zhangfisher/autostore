import type { ILogger } from 'flex-tools/misc/logger';
import { isFunction } from './isFunction';

const EMPTY_OUTPUT=()=>{}
const consoleOutput=(output:any)=>{
    return (...args:any[])=>{
        if(isFunction(args[0])){
            args[0]=args[0]()
        }
        output(...args)
    }    
}
export function createEmptyLogger(debug:boolean=false){
    return {
        debug:debug  ? EMPTY_OUTPUT : consoleOutput(console.debug),
        info: debug  ? EMPTY_OUTPUT : consoleOutput(console.info),
        warn: debug  ? EMPTY_OUTPUT :consoleOutput(console.warn),
        error: debug  ? EMPTY_OUTPUT :consoleOutput(console.error)
    } as ILogger
}