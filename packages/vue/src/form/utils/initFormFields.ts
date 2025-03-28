import { Dict, getVal, PATH_DELIMITER } from "autostore"
import type { AutoFormFieldContexts } from "../Form"
import { EMPTY_VALUE } from "../consts"
import { stateToField } from "./stateToField"
import { UseFormOptions } from "../types"
import { VueAutoStore } from "../../store"

/**
 * 初始化表单字段的值
 * @param store - Vue状态存储实例
 * @param fields - 表单字段上下文集合
 * @param options - 表单选项
 */
export function initFormFields<State extends Dict>(
    store: VueAutoStore<State>,
    fields: AutoFormFieldContexts,
    options: UseFormOptions<State>
) {
    // 获取当前状态快照
    const snap = store.getSnap()

    // 遍历所有字段
    Object.entries(fields).forEach(([name, fields]) => {
        // 将字段名转换为路径数组
        const path = name.split(PATH_DELIMITER)
        
        // 从状态中获取值，如果路径不存在则返回EMPTY_VALUE
        const value = getVal(snap, path, EMPTY_VALUE)

        // 如果值存在（不是EMPTY_VALUE），则初始化字段
        if (value !== EMPTY_VALUE) {
            fields.forEach(field => {
                // 保存初始值
                field.initial = value
                // 使用stateToField更新表单元素
                stateToField(field, value, options, true)
            })
        }
    })
}