import { PATH_DELIMITER } from "autostore"
import { FIELD_DATA_INVALID_TIPS } from "../consts"
import type { AutoFormFieldContext, AutoFormFieldContexts } from "../Form"
import { UseFormOptions } from "../types"
import { isInputElement } from './isInputElement'

/**
 * 默认的字段查找函数
 */
function defaultFindFields(form: HTMLFormElement) {
    const nodes = form.querySelectorAll(':scope ' + "input[name][data-field],textarea[name][data-field],select[name][data-field],[data-field-name]")
    // 过滤选择的元素节点
    const fieldEles = Array.from(nodes).filter(field => {
        return field.nodeType && field.nodeType === 1
    }) as unknown as HTMLElement[]
    return fieldEles
}

/**
 * 根据表单元素和字段选择器，查询表单中的字段元素
 * 
 * - 默认情况下会查询所有的input,textarea,select元素
 * - 如果自定义了字段选择器，如[name]，则查询所有符合选择器的元素
 * 
 * - 自定义字段：非标准表单输入控件
 *   这里可能会查询到
 *      <div name="order">
 *        <input data-field-part='price'>
 *        <input data-field-part='count'>
 *      </div>
 *   此时的div[name='order']是一个复合字段，包含了price和count两个字段
 *   此时，会查询该div下的所有input,textarea,select元素，并且添加name
 *      <div class="autofield" name="order">
 *        <input name="order" data-field-part='price'>
 *        <input name="order" data-field-part='count'>
 *      </div>
 * 
 * - 自定义字段：内部没有任何表单输入控件，其值由元素及子元素的类、样式或innerHTML等映射而来
 *   比如某个自定义按钮的checked类代表选中状态，disabled类代表不可用状态
 *   需要指定一个data-input-xxx属性来指定映射关系
 * 
 *      <div class="field" name="order"> 
 *        <span name="a" data-input="xxxx" data-field-part='price'>  ==>   innerHTML
 *        <span name="a" data-input="class:" data-field-part='price'> ==> class
 *        <span name="a" data-input="style:" data-field-part='price'> ==> style
 *        <span name="a" data-input="innerHTML:" data-field-part='price'> 
 *      </div>
 * 
 * @param form - 表单元素
 * @param options - 表单选项
 */
export function findAutoFields(form: HTMLFormElement, options: UseFormOptions<any>): AutoFormFieldContexts {
    const { findFields, entry } = options
    const fieldEles = findFields ? findFields(form) : defaultFindFields(form)
    const entryPrefix = entry ? `${entry}${PATH_DELIMITER}` : undefined

    return fieldEles.reduce((fields, fieldEle) => {
        let fieldName = fieldEle.getAttribute('name') || fieldEle.getAttribute('data-field-name')
        if (!fieldName) return fields

        const fieldKey = entryPrefix ? entryPrefix + fieldName : fieldName
        
        // 获取输入元素
        const inputs = Array.from(
            isInputElement(fieldEle) 
                ? [fieldEle] 
                : fieldEle.querySelectorAll("input,textarea,select")
        ) as HTMLInputElement[]

        // 为字段元素下的所有输入控件都设置同样name属性
        inputs.forEach(input => {
            input.setAttribute('name', fieldName!)
        })

        if (!fields[fieldKey]) fields[fieldKey] = []
        const fieldCtxs = fields[fieldKey]

        // 如果输入元素已经存在于某个x-field的普通元素中则不需要添加
        if (fieldCtxs.length > 0 
            && isInputElement(fieldEle) 
            && fieldCtxs.some(fieldCtx => 
                !isInputElement(fieldCtx.el) 
                && fieldCtx.inputs.findIndex(input => input === fieldEle) >= 0
            )
            && (!['submit', 'reset'].includes((fieldEle as HTMLInputElement).type))
        ) {
            return fields
        }

        // 添加字段上下文
        fields[fieldKey].push({
            path: fieldName,
            el: fieldEle,
            inputs,
            invalidTips: fieldEle.getAttribute(FIELD_DATA_INVALID_TIPS)
        } as AutoFormFieldContext)

        return fields
    }, {} as AutoFormFieldContexts)
}