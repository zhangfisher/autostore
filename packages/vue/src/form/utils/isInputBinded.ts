/**
 * 在使用useForm时，检查input是否已经绑定了数据。
 * 如果input已经指定了value或v-model，说明该input已经绑定了数据，
 * 由开发者自行更新数据(如使用Field组件时)，而不是由useForm来更新数据。
 * 
 * @param input - 要检查的输入元素
 * @returns 如果输入元素已绑定数据则返回true，否则返回false
 */
export function isInputBinded(input: HTMLInputElement): boolean {
    // 检查是否有value属性
    if (!input.hasAttribute('value')) return false
    
    // 检查value属性值
    const value = input.getAttribute('value')
    if (value !== undefined) return true
    
    // 检查defaultValue
    if (input.defaultValue !== undefined) return true
    
    // 检查defaultChecked（对于checkbox和radio）
    if (input.defaultChecked && input.defaultChecked != undefined) return true
    
    // 检查是否有v-model绑定
    if (input.hasAttribute('v-model')) return true
    
    return false
}