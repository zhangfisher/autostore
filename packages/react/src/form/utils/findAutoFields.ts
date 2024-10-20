import type { AutoFormFieldInfos } from "../Form";
import { UseFormOptions } from "../types";
import { isInputElement } from './isInputElement';

function defaultFindFields(form:HTMLFormElement){
    const nodes = form.querySelectorAll(':scope ' + "input[name][value=''],textarea[name][value=''],select[name][value=''],.autofield");    
    // 过滤中选择的元素节点
    const fieldEles = Array.from(nodes).filter(field => {
        return field.nodeType && field.nodeType === 1;
    }) as unknown as HTMLElement[]
    return fieldEles
} 

/**
 * 
 * 根据表单元素和字段选择器，查询表单中的字段元素
 * 
 *  - 默认情况下会查询所有的input,textarea,select元素
 *  - 如果自定义了字段选择器，如[name]，则查询所有符合选择器的元素
 * 
 *  - 自定义字段：非标准表单输入控件
 * 
 *    这里可能会查询到
 *       <div name="order">
 *         <input data-field-part='price'>
 *         <input data-field-part='count'>
 *      </div>
 *   此时的div[name='order']是一个复合字段，包含了price和count两个字段
 *   此时，会查询该div下的所有input,textarea,select元素，并且添加name
 *      <div className="autofield" name="order">
 *         <input name="order" data-field-part='price'>
 *         <input name="order" data-field-part='count'>
 *      </div>
 *  如果此时按标准方式提交表单，会作为数组提交order
 *  但是在AutoForm里面，将调用options.fromState和options.toState来处理这种情况,
 *  - 自定义字段：内部没有任何表单输入控件，其值由元素及子元素的类、样式或innerHTML等映射而来
 *    比如某个自定义按钮的checked类代表选中状态，disabled类代表不可用状态
 *    需要指定一个data-input-xxx属性来指定映射关系
 * 
 *      <div className="field" name="order"> 
 *          <span name="a" data-input="xxxx" data-field-part='price'>  ==>   innerHTML
 *          <span name="a" data-input="class:" data-field-part='price'> ==> class
 *          <span name="a" data-input="style:" data-field-part='price'> ==> style
 *          <span name="a" data-input="innerHTML:" data-field-part='price'> 
 *      </div>
 * 
 *  @param form - 表单元素
 * @param fieldSelector - 字段选择器
 */
export function findAutoFields(form:HTMLFormElement,findFields:UseFormOptions<any>['findFields']):AutoFormFieldInfos{
    const fieldEles = findFields ? findFields(form) : defaultFindFields(form)    
    return fieldEles.reduce((results,fieldEle)=>{ 
        const fieldName = fieldEle.getAttribute('name')
        if(fieldName){            
            const inputs = Array.from(isInputElement(fieldEle) ? 
                [fieldEle] 
                : fieldEle.querySelectorAll("input[value=''],textarea[value=''],select[value='']")
            ) as HTMLInputElement[]
            results[fieldName] = {
                name:fieldName,
                el:fieldEle,
                inputs,
                invalidTips:fieldEle.getAttribute('data-valid-tips')
            }
        }
        return results
    },{} as AutoFormFieldInfos)
}
