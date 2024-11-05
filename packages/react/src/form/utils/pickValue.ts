export function pickValue<T>(val:T,defaultValue:T):T{
    return val===undefined ? defaultValue : val

}