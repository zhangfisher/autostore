

export function isPromise(value: any): boolean {
    try{
        return !!value 
            && (typeof value === 'object' || typeof value === 'function')
            && typeof value.then === 'function'
            && typeof value.catch === 'function'
            && (value instanceof Promise || Object.prototype.toString.call(value) === '[object Promise]');
    }catch{
        return false
    } 
}