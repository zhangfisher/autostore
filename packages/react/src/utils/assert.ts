export function assert(value:any,help:string):value is true{
    if(!value){
        throw new Error(help)
    }
    return true
}