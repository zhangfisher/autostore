import { ref, reactive, onMounted, onUnmounted } from "vue"
import { AutoStore, Dict } from "autostore"
import { VueAutoStore } from "../store"
import { AutoFormStore, UseFormOptions, AutoFormObject } from "./types"
import { AutoForm, AutoFormContext, createAutoFormComponent } from "./Form"
import { createAutoFieldComponent, AutoField } from "./Field"
import { Validator } from "./validator"

/**
 * useForm 是一个用于处理表单状态的 Vue Composition API。
 * 它接收一个 VueAutoStore 实例和一个可选的配置对象作为参数，
 * 并返回一个包含表单状态和操作结果的对象。
 *
 * @example
 * const { state, useForm } = createStore({...})
 * const { Form, Field, validation, dirty } = useForm({
 *   entry,
 *   errElement: undefined | "[name={name}] ~ span" | (path,value,input)=>"[name={name}] ~ span",
 *   errClass: "invalid",   // 校验错误时的类名，正确时移除
 *   errStyle: [selector, "color:red;border:1px solid red;"],
 *   // 用来获取表单内的所有输入控件
 *   fieldSelector: "input,textarea,select",
 *   // 指定类名
 *   className: string | (state)=>state.dirty ? "dirty" : "clean",
 *   style: string | (state)=>state.validate ? "validate" : "invalid",
 *   validate: (path,value,input)=>{
 *     return true/false
 *     return "错误字符串"  // 将显示在selector指向的位置
 *   },
 *   // 转换输入值与状态中的值
 *   fromState: (path,value,input)=>{},
 *   toState: (path,value,input)=>{}
 * })
 */
export function useForm<State extends Dict>(store: VueAutoStore<any> | AutoStore<any>, options?: UseFormOptions<State>): AutoFormObject<State>
export function useForm<State extends Dict>(state: State, options?: UseFormOptions<State>): AutoFormObject<State>
export function useForm<State extends Dict>(): AutoFormObject<State> {
    // 创建响应式引用
    const formRef = ref<HTMLFormElement | null>(null)
    const formContext = ref<AutoFormContext<State> | null>(null)
    const storeRef = ref<AutoFormStore<State> | null>(null)

    // 创建表单状态
    const valid = ref(true)
    const dirty = ref(false)
    const submiting = ref(false)
    const error = ref(null)

    // 处理选项
    const opts: UseFormOptions<State> = arguments[1] || {}
    if (!opts.ref) opts.ref = formRef

    // 初始化 store
    if (!storeRef.value) {
        const formStore = (arguments[0] instanceof VueAutoStore 
            ? arguments[0] 
            : new VueAutoStore(arguments[0], arguments[1])) as AutoFormStore<State>
        formStore.resetable = true
        storeRef.value = formStore
    }

    const store = storeRef.value!

    // 重置表单
    const reset = () => {
        dirty.value = false
        store.reset(opts.entry)
    }

    // 提交表单
    const submit = () => {
        formRef.value?.dispatchEvent(new Event('submit'))
    }

    // 创建表单组件和上下文
    if (!formContext.value) {
        formContext.value = {
            options: opts,
            setDirty: (val: boolean = true) => dirty.value = val,
            setValid: (val: boolean) => valid.value = val,
            setSubmiting: (val: boolean) => submiting.value = val,
            setError: (val: any) => error.value = val,
            state: store.state,
            formRef
        }

        // 创建验证器
        formContext.value.validator = new Validator<State>(store, formContext.value)
    }

    // 创建Form和Field组件
    const Form = createAutoFormComponent<State>(store, formContext)
    const Field = createAutoFieldComponent<State>(store, formContext)

    // 清理
    onUnmounted(() => {
        formContext.value = null
        storeRef.value?.destroy()
        storeRef.value = null
    })

    // 返回表单对象
    return {
        ...store,
        state: store.state,
        Form,
        Field,
        valid: valid.value,
        dirty: dirty.value,
        error: error.value,
        submiting: submiting.value,
        submit,
        reset,
        validator: formContext.value.validator
    } as unknown as AutoFormObject<State>
}