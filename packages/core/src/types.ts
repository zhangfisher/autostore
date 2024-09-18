 
export type Dict<T=any> = Record<string,T>

export type SyncFunction<T=any> =  (...args: any) => Exclude<T,Promise<any>>;  