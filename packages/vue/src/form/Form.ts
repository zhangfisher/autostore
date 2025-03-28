import { defineComponent, onMounted, onUnmounted, ref, watch } from "vue"
import { ComputedState, Dict, getVal, PATH_DELIMITER, pathStartsWith } from "autostore"
import type { VueAutoStore } from "../store"
import { UseFormOptions } from "./types"
import { Validator } from './validator'
import { findAutoFields } from "./utils/findAutoFields"
import { stateToField } from "./utils/stateToField"
import { fieldToState } from "./utils"
import { isFalse } from "./utils/isFalse"
import { getInputValue } from "./utils/getInputValue"
import { initFormFields } from "./utils/initFormFields"
import { createSubmit } from "./submit"

export type AutoFormProps<State extends Dict> = {
    entry?: string
    onValidate?: (state: State) => boolean
    onSubmit?: (state: ComputedState<State>, e: SubmitEvent) => void | Promise<void> | Promise<boolean> | boolean
}

export type AutoFormFieldContext = {
    path: string
    el: HTMLElement
    inputs: HTMLInputElement[]
    initial?: any
    invalidTips?: string | null
}

export type AutoFormFieldContexts = Record<string, AutoFormFieldContext[]>

export type AutoFormContext<State extends Dict> = {
    setDirty: (val?: boolean) => void
    setValid: (val: boolean) => void
    setSubmiting: (val: boolean) => void
    setError: (val: any) => void
    state: ComputedState<State>
    options: UseFormOptions<State>
    formRef: any
    fields?: AutoFormFieldContexts
    validator?: Validator<State>
}

export function createAutoFormComponent<State extends Dict>(
    store: VueAutoStore<State>,
    formCtx: any
) {
    return defineComponent({
        name: 'AutoForm',
        props: {
            entry: String,
            onValidate: Function,
            onSubmit: Function
        },
        setup(props, { slots }) {
            const ctx = formCtx.value! as Required<AutoFormContext<State>>
            const options: UseFormOptions<State> = formCtx.value!.options
            const initial = ref(false)

            // 初始化表单
            const initForm = () => {
                const form = options.ref?.value
                if (!form) return

                let initValid = true
                ctx.fields = findAutoFields(form, options)
                ctx.validator.attach()

                // 初始化表单控件的值
                initFormFields(store, ctx.fields, options)

                // 初始化时是否进行数据校验
                if (!isFalse(options.validAtInit)) {
                    ctx.validator.validateAll()
                }

                initial.value = true
                ctx.setValid(initValid)
                ctx.setDirty(false)
            }

            // 监听状态变化
            watch(() => store.state, () => {
                const form = options.ref?.value
                if (!form || !initial.value) return

                const entryPath = ctx.options.entry ? ctx.options.entry.split(PATH_DELIMITER) : []

                // 监听状态变化并更新表单
                store.watch(({ path, value }) => {
                    if (!pathStartsWith(entryPath, path)) return

                    const spath = path.join(PATH_DELIMITER)
                    if (spath in ctx.fields) {
                        const fields = ctx.fields![spath]
                        fields?.forEach(fieldInfo => {
                            if (stateToField(fieldInfo, value, ctx.options)) {
                                ctx.validator.validate(fieldInfo.el)
                            }
                        })
                    } else {
                        // 处理数组或对象字段
                        const objPath = path.slice(0, -1).join(PATH_DELIMITER)
                        if (objPath in ctx.fields) {
                            value = getVal(store.state, objPath)
                            const fields = ctx.fields![objPath]
                            fields?.forEach(fieldInfo => {
                                if (stateToField(fieldInfo, value, ctx.options)) {
                                    ctx.validator.validate(fieldInfo.el)
                                }
                            })
                        }
                    }
                })
            }, { deep: true })

            // 处理输入事件
            const onChange = (e: Event) => {
                const input = e.target as HTMLInputElement
                const path = input.name
                if (!path) {
                    store.log('Input element does not have specified <name> attribute', 'warn')
                    return
                }

                const form = options.ref?.value
                const newVal = getInputValue(input, form)
                if (ctx.validator.validate(input)?.value) {
                    fieldToState(store, input, path, newVal, ctx.options)
                    ctx.setDirty()
                }
            }

            onMounted(() => {
                const form = options.ref?.value
                if (!form) return

                // 初始化表单
                if (!initial.value) {
                    initForm()
                }

                // 添加输入事件监听
                form.addEventListener('input', onChange)

                // 创建提交处理
                const submit = createSubmit(store, props, formCtx, options)

                // 清理函数
                onUnmounted(() => {
                    form.removeEventListener('input', onChange)
                    submit.off()
                    initial.value = false
                })
            })

            return () => (
                <form ref={options.ref}>
                    {slots.default?.()}
                </form>
            )
        }
    })
}