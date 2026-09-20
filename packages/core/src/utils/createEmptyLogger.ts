
const EMPTY_OUTPUT=()=>{}
export function createEmptyLogger(debug:boolean=false){
    return {
        debug: console.debug,
        info: debug  ? EMPTY_OUTPUT : console.info,
        warn: debug  ? EMPTY_OUTPUT :console.warn,
        error: debug  ? EMPTY_OUTPUT :console.error
    }
}