import { isEmpty } from "../../utils"

export function setInputValue(input:HTMLInputElement,value:any){
    if(input.type==='checkbox'){      
        if(isEmpty(input.value) ){
            input.checked = value
        }else{
            const [trueVal,_] = String(input.value).split(",")
            input.checked = trueVal == value
        }         
    }else if(input.type==='radio'){ 
        const name = input.name
        const radios = document.querySelectorAll(`input[type="radio"][name="${name}"]`) as NodeListOf<HTMLInputElement> 
        for(let radio of radios){
            const datatype = radio.dataset.typeof
            if(datatype){
                if(datatype==='boolean'){
                    radio.checked = radio.value === String(value)
                }else if(datatype==='number'){
                    radio.checked = parseFloat(radio.value) === value
                }else{
                    radio.checked = radio.value == value 
                }                
            }else{
                radio.checked = radio.value == value
            }            
        }        
    }else{        
        input.value = value
    }
}