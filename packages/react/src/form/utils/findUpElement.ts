/**
 * 
 *   基于el元素的向上查找
 * 
 *   - 当找到指定的类名时，返回该元素
 *   - 如果碰到tagName指定的标签时，停止查找
 *   - 如果没有找到指定的类名时，返回null
 * 
 * 
 */
export function findUpElement(el:HTMLElement,matchClass:string,stopTagName:string='form'){
    let parent = el.parentElement
    while(parent){
        if(parent.classList.contains(matchClass)){
            return parent
        }
        if(parent.tagName.toLocaleLowerCase()===stopTagName){
            return null
        }
        parent = parent.parentElement
    }
    return null    
}