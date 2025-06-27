


export function safeCall(this: any, fn: any, ...args: any[]) {
    if (fn && typeof fn === "function") {
        return fn.call(this, ...args)
    }
}