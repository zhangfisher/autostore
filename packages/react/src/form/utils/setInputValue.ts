export function setInputValue(input:HTMLInputElement,value:any){
    if(input.type==='checkbox' || input.type==='radio'){        
        input.checked = input.value == value
    }else{
        
        input.value = value
    }
}