import type { TemplateResult } from "lit"


/**
 * 
 * 当condition=true时，调用wrapper对content进行包裹
 * 
 * 
 * toggleWrapper(hasLink,html`<div>123</div>`,(content)=>{
 *      
 * })
 * 
 * @param condition 
 * @param trueRender 
 * @param wrapper 
 * @returns 
 */

export function toggleWrapper(condition: boolean, content: TemplateResult, wrapper: (content: TemplateResult) => TemplateResult) {
    if (condition) {
        return wrapper(content)
    } else {
        return content
    }
}