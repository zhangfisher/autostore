export type LogMessageArgs = string | Error | (()=>string)
export type LogLevel = 'log' | 'error' | 'warn'
export function log(message: LogMessageArgs,level:LogLevel='log'){
    const msg = typeof(message) === 'function' ? message() 
        : (message instanceof Error ? message.stack : message)
    try{
        console[level]("[autods] ",...Array.isArray(msg) ? msg : [msg])
    }catch{}
}
