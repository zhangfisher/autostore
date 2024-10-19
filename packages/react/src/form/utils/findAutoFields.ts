import type { AutoFormFieldInfos } from "../Form";
import { isInputElement } from './isInputElement';

/**
 * 
 * 根据表单元素和字段选择器，查询表单中的字段元素
 * 
 *  - 默认情况下会查询所有的input,textarea,select元素
 *  - 如果自定义了字段选择器，如[name]，则查询所有符合选择器的元素
 *    这里可能会查询到
 *       <div name="order">
 *         <input data-field-part='price'>
 *         <input data-field-part='count'>
 *      </div>
 *   此时的div[name='order']是一个复合字段，包含了price和count两个字段
 *   此时，会查询该div下的所有input,textarea,select元素，并且添加name
 *      <div name="order">
 *         <input name="order" data-field-part='price'>
 *         <input name="order" data-field-part='count'>
 *      </div>
 *  如果此时按标准方式提交表单，会作为数组提交order
 *  但是在AutoForm里面，将调用options.fromState和options.toState来处理这种情况,
 *  
 *   
 * 
 *  @param form - 表单元素
 * @param fieldSelector - 字段选择器
 */
export function findAutoFields(form:HTMLElement,fieldSelector:string | undefined):AutoFormFieldInfos{
    const nodes = form.querySelectorAll(fieldSelector || '[name]');
    // 过滤中选择的元素节点
    const fieldEles = Array.from(nodes).filter(field => {
        return field.nodeType && field.nodeType === 1;
    }) as unknown as HTMLElement[]
    return fieldEles.reduce((results,fieldEle)=>{
        const eleName = fieldEle.getAttribute('name')
        if(eleName){            
            const inputs = Array.from(isInputElement(fieldEle) ? 
                [fieldEle] 
                : fieldEle.querySelectorAll('input,textarea,select')
            ) as HTMLInputElement[]
            results[eleName] = {
                name:eleName,
                el:fieldEle,
                inputs,
                invalidTips:fieldEle.getAttribute('data-invalid-tips')
            }
        }
        return results
    },{} as AutoFormFieldInfos)
}

