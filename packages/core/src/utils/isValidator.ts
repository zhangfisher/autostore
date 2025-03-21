import { VALIDATOR_SCHEMA } from "../consts"
 
/**
 * 检查对象是否为有效的验证器
 * @param obj 需要检查的对象
 * @returns {boolean} 如果对象是验证器返回 true，否则返回 false
 * @description 通过检查对象是否包含 VALIDATOR_SCHEMA 标记来判断其是否为验证器
 */
export function isValidator(obj: any) {
    try { 
        return obj[VALIDATOR_SCHEMA] === true
    }catch{}
    return false
}