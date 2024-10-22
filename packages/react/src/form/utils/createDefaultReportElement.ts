import { isInputElement } from "./isInputElement";

export function createDefaultReportElement(input:HTMLElement){
    const errElement = document.createElement("span");
    errElement.style.color = "red";
    errElement.classList.add("error");
    if(isInputElement(input)){
        if (input.nextSibling) {
            input.parentNode?.insertBefore(errElement, input.nextSibling);
        } else {
            input.parentNode?.appendChild(errElement);
        }
    }else{
        input.appendChild(errElement);
    }    
    return errElement
}

 
