 

/**
 * 在使用useForm时，内部的input如何指定了value，是说明该input已经绑定了数据
 * 由开发者自行更新数据(如使用Field组件时)，而不是由useForm来更新数据
 * 
 * 
 * 
 * 
 */

export function isInputBinded(input:HTMLInputElement){
    if(!input.hasAttribute('value')) return false
    const value = input.getAttribute('value')    
    if(value!==undefined) return true
    if(input.defaultValue!==undefined) return true
    if(input.defaultChecked && input.defaultChecked!=undefined) return true
    return false
}