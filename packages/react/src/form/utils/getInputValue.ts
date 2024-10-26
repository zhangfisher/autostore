import { isEmpty } from "../../utils"
import { HTMLInputElements } from "../types"
import { isHtmlInputElement, isHtmlSelectElement } from "./isInputElement"

export function getInputValue(input:HTMLInputElements):any{    
    let value:any
    const datatype = input.dataset.typeof    
    if(isHtmlInputElement(input)){
        if(input.type==='checkbox'){
            if(isEmpty(input.value) ){
                value = input.checked
            }else{
                const [trueVal,falseVal ] = String(input.value).split(",")
                value = input.checked ? trueVal : falseVal
            }
        }else if(input.type==='radio'){
            const name = input.name
            const radios = document.querySelectorAll(`input[type="radio"][name="${name}"]`) as NodeListOf<HTMLInputElement>
            if(radios.length>1){
                let index = Array.from(radios).findIndex(radio=>radio.checked)
                value = index>=0 ? (
                    radios[index].value
                ) : null
            }else{
                value = radios[0].checked
            }
        }else{
            value =  input.value
        }
    }else if(isHtmlSelectElement(input)){
        if(input.multiple){
            const selectedOptions = input.selectedOptions
            value =  Array.from(selectedOptions).map(option=>option.value)
        }else{
            value =  input.value
        }
    }
    if(datatype){
        if(datatype==='boolean'){
            value = value ==='true'
        }else if(datatype==='number'){
            value = parseFloat(value)
        }else if(datatype==='object'){
            try{value = JSON.parse(value)
            }catch{}
        }
    }
    return value
}