import { isEmpty } from "../../utils"

export function getInputValue(input:HTMLInputElement):any{    
    let value:any
    if(input.type==='checkbox'){
        if(isEmpty(input.value) ){
            value = input.checked
        }else{
            const [trueVal,falseVal ] = String(input.value).split(",")
            value = input.checked ? trueVal : falseVal
        }
    }else if(input.type==='radio'){
        if(isEmpty(input.value)){
            value = input.checked
        }else{
            value =  input.checked ? input.value : undefined
        }        
    }else{
        value =  input.value
    }
    return value
}