import type { AutoStore } from "../store/store"
export type LogMessageArgs = string | Error | (()=>string)
export type LogLevel = 'info' | 'error' | 'warn'

export function log(this:AutoStore<any>,message: LogMessageArgs,level:LogLevel='info'){
    const msg = typeof(message) === 'function' ? message() 
        : (message instanceof Error ? message.stack : message)
    try{
        console[level](`[AutoStore<${this.id}>]`,...Array.isArray(msg) ? msg : [msg])
    }catch{}
}
