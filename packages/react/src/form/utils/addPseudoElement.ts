/**
 * 为指定的元素创建伪元素
 */
export function addPseudoElement(el:HTMLElement,style:string,before:boolean=true){
    let styleId= el.dataset.id
    if(!styleId){
        styleId = "c"+Math.random().toString(36).slice(2) 
        el.dataset.id = styleId
    }
    let pseudo = document.querySelector("style#"+styleId)
    if(!pseudo){
        pseudo = document.createElement('style')        
        pseudo.id = styleId
    }    
    const  selector:string = `[data-id=${el.dataset.id}]`.toLowerCase()   
    pseudo.innerHTML = `${selector.toLowerCase()}:${before?'before':'after'}{${style}}`
    document.head.appendChild(pseudo)
    return pseudo
}
 