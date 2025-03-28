/**
 * 提交表单
 * 
 * 在Vue3中使用：
 * onMounted(() => {
 *   const { off } = createSubmit()
 *   onUnmounted(() => {
 *     off()
 *   })
 * })
 */

import { Dict } from "autostore"
import { VueAutoStore } from "../store"
import { AutoFormContext, AutoFormProps } from "./Form"
import { UseFormOptions } from "./types"
import { Ref } from "vue"

export type SubmitFormOptions = {
    // 可以在这里添加额外的提交选项
}

export function createSubmit<State extends Dict>(
    store: VueAutoStore<State>,
    props: AutoFormProps<State>,
    formCtx: Ref<AutoFormContext<State> | null>,
    options: UseFormOptions<State>
) {
    const ctx = formCtx.value! as Required<AutoFormContext<State>>
    const form = options.ref?.value!

    async function onSubmit(e: Event) {
        try {
            ctx.setSubmiting(true)
            const { entry } = ctx.options
            
            // 获取表单状态快照
            const formSnap = store.getSnap({
                entry: entry
            })

            // 处理提交
            if (props.onSubmit) {
                try {
                    const result = await Promise.resolve(props.onSubmit(formSnap as any, e))
                    if (result === false) {
                        e.preventDefault()
                    }
                } catch (err) {
                    ctx.setError(err)
                    throw err
                }
            }
        } catch (err) {
            ctx.setError(err)
        } finally {
            ctx.setSubmiting(false)
        }
    }

    // 添加提交事件监听器
    if (props.onSubmit && form) {
        form.addEventListener('submit', onSubmit)
    }

    return {
        // 返回清理函数
        off: () => {
            if (form) {
                form.removeEventListener('submit', onSubmit)
            }
        }
    }
}