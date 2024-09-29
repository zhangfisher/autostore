
export function isObserverDescriptor(obj:any):boolean{
    return typeof(obj) === 'object' 
        && obj.hasOwnProperty("type") && typeof(obj.type) === 'string'
        && obj.hasOwnProperty("getter")  && typeof(obj.getter) === 'function'
        && obj.hasOwnProperty("options") && typeof(obj.options) === 'object'
}
