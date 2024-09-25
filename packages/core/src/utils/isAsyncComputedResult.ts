import { isRaw } from "./isRaw"

export function isAsyncComputedResult(value: any): boolean{
    return value 
            && typeof value === 'object' 
            && value.hasOwnProperty('loading')
            && value.hasOwnProperty('result')
            && (value.hasOwnProperty('run') && value.run === 'function' && isRaw(value))
}