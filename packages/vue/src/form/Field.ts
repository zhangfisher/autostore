import { ComputedState, Dict, ComputedGetter, PATH_DELIMITER, setVal, 
    ComputedOptions, computed, AsyncComputedGetter, AsyncComputedValue, 
    ObjectKeyPaths, AsyncComputedDescriptorBuilder } from "autostore"
import { defineComponent, ref, computed as vueComputed, watch, onMounted, onUnmounted } from "vue"
import { VueAutoStore } from "../store"
import { AutoFormContext } from "./Form"
import { SignalComponentRenderArgs } from "../types"
import { getInputValueFromEvent } from "../utils"
import { Get } from "type-fest"

// 类型定义
export type BooleanComputedGetter<State extends Dict, Scope = ComputedState<State>> = boolean | ComputedGetter<boolean, Scope>
export type NumberComputedGetter<State extends Dict, Scope = ComputedState<State>> = number | ComputedGetter<number, Scope>
export type StringComputedGetter<State extends Dict, Scope = ComputedState<State>> = string | ComputedGetter<string, Scope>
export type ArrayComputedGetter<State extends Dict, Scope = ComputedState<State>> = any[] | ComputedGetter<any[], Scope>

export type AutoFieldRenderBindProps<NAME, VALUE> = {
    name: NAME
    'onUpdate:modelValue': (value: any) => void
    onChange: (e: Event) => void
    modelValue: VALUE
    placeholder: string
}

export interface AutoFieldRenderProps<NAME, VALUE> extends SignalComponentRenderArgs<VALUE> {
    name: NAME
    validate: boolean
    required: boolean
    visible: boolean
    enable: boolean
    readonly: boolean
    label: string
    placeholder: string
    help: string
    select: AsyncComputedValue<any[]>
    onChange: (e: Event) => void
    bind: AutoFieldRenderBindProps<NAME, VALUE>
}

export interface AutoFieldProps<
    NAME,
    VALUE,
    VALIDATE,
    VISIBLE,
    REQUIRED,
    READONLY,
    ENABLE,
    HELP,
    LABEL,
    PLACEHOLDER,
    SELECT
> {
    name: NAME
    validate?: VALIDATE
    visible?: VISIBLE
    required?: REQUIRED
    readonly?: READONLY
    enable?: ENABLE
    help?: HELP
    label?: LABEL
    placeholder?: PLACEHOLDER
    select?: SELECT
    render: (props: AutoFieldRenderProps<NAME, VALUE>) => any
}

export interface AutoField<State extends Dict> {
    <
        NAME extends ObjectKeyPaths<ComputedState<State>> = ObjectKeyPaths<ComputedState<State>>,
        VALUE extends Get<ComputedState<State>, NAME> = Get<ComputedState<State>, NAME>,
        VALIDATE extends BooleanComputedGetter<State, VALUE> = BooleanComputedGetter<State, VALUE>,
        VISIBLE extends BooleanComputedGetter<State, VALUE> = BooleanComputedGetter<State, VALUE>,
        REQUIRED extends BooleanComputedGetter<State, VALUE> = BooleanComputedGetter<State, VALUE>,
        READONLY extends BooleanComputedGetter<State, VALUE> = BooleanComputedGetter<State, VALUE>,
        ENABLE extends BooleanComputedGetter<State, VALUE> = BooleanComputedGetter<State, VALUE>,
        LABEL extends StringComputedGetter<State, VALUE> = StringComputedGetter<State, VALUE>,
        PLACEHOLDER extends StringComputedGetter<State, VALUE> = StringComputedGetter<State, VALUE>,
        HELP extends StringComputedGetter<State, VALUE> = StringComputedGetter<State, VALUE>,
        SELECT extends AsyncComputedDescriptorBuilder<any[], VALUE> = AsyncComputedDescriptorBuilder<any[], VALUE>
    >(props: AutoFieldProps<NAME, VALUE,
        VALIDATE,
        VISIBLE,
        REQUIRED,
        READONLY,
        ENABLE,
        HELP,
        LABEL,
        PLACEHOLDER,
        SELECT
    >): any
}

function buildFieldRenderProps(props: any) {
    return Object.assign({
        modelValue: undefined,
        required: false,
        label: '',
        validate: true,
        visible: true,
        readonly: false,
        placeholder: '',
        enable: true,
        select: [],
        timeout: 0,
        loading: false,
        retry: 0,
        error: undefined,
        help: '',
        progress: 0,
        onChange: () => { },
        'onUpdate:modelValue': () => { },
        run: () => { },
        cancel: () => { }
    }, props)
}

export function prop(getter: ComputedGetter<any> | AsyncComputedGetter<any>, options?: ComputedOptions<any>): ComputedGetter<any> {
    return computed(getter as any, options) as ComputedGetter<any>
}

export function createAutoFieldComponent<State extends Dict>(store: VueAutoStore<State>, formCtx: any): AutoField<State> {
    const { useAsyncState, useComputedObject } = store

    return defineComponent({
        name: 'AutoField',
        props: {
            name: {
                type: String,
                required: true
            },
            validate: [Boolean, Function],
            visible: [Boolean, Function],
            required: [Boolean, Function],
            readonly: [Boolean, Function],
            enable: [Boolean, Function],
            help: [String, Function],
            label: [String, Function],
            placeholder: [String, Function],
            select: [Array, Function],
            render: {
                type: Function,
                required: true
            }
        },
        setup(props: any) {
            const { name } = props
            const prefix = `${name}.`

            // 获取字段值
            const value = useAsyncState(name as any)

            // 创建计算属性
            const validate = useComputedObject<boolean>(props.validate, {
                id: `${prefix}validate`,
                depends: [name],
                scope: name,
                initial: true,
                throwError: false,
                onError: () => false
            })

            const required = useComputedObject<boolean>(props.required, { id: `${prefix}required`, initial: false, throwError: false })
            const visible = useComputedObject<boolean>(props.visible, { id: `${prefix}visible`, initial: true, throwError: false })
            const readonly = useComputedObject<boolean>(props.readonly, { id: `${prefix}readonly`, initial: false, throwError: false })
            const enable = useComputedObject<boolean>(props.enable, { id: `${prefix}enable`, initial: true, throwError: false })
            const select = useComputedObject<any[]>(props.select, { id: `${prefix}select`, initial: [], throwError: false })
            const help = useComputedObject<string>(props.help, { id: `${prefix}help`, initial: '', throwError: false })
            const label = useComputedObject<string>(props.label, { id: `${prefix}label`, initial: '', throwError: false })
            const placeholder = useComputedObject<string>(props.placeholder, { id: `${prefix}placeholder`, initial: '', throwError: false })

            const fieldPropObjs = {
                validate,
                required,
                visible,
                readonly,
                enable,
                select,
                help,
                label,
                placeholder
            }

            // 处理值更新
            const onChange = (e: Event) => {
                const inputValue = getInputValueFromEvent(e)
                if (name) {
                    store.update(state => setVal(state, name.split(PATH_DELIMITER), inputValue))
                }
                formCtx.value?.setDirty(true)
                e.stopPropagation()
            }

            // 创建渲染属性
            const renderProps = ref(buildFieldRenderProps({
                name,
                validate: validate?.value ?? props.validate ?? true,
                required: required?.value ?? props.required ?? false,
                visible: visible?.value ?? props.visible ?? true,
                readonly: readonly?.value ?? props.readonly ?? false,
                enable: enable?.value ?? props.enable ?? true,
                select: select?.value ?? props.select,
                help: help?.value ?? props.help,
                label: label?.value ?? props.label,
                placeholder: placeholder?.value ?? props.placeholder ?? '',
                bind: {
                    name,
                    onChange,
                    'onUpdate:modelValue': (newValue: any) => {
                        if (name) {
                            store.update(state => setVal(state, name.split(PATH_DELIMITER), newValue))
                        }
                        formCtx.value?.setDirty(true)
                    },
                    modelValue: value.value,
                    placeholder: placeholder?.value ?? props.placeholder ?? ''
                },
                ...value,
                error: validate?.error?.message,
                onChange
            }))

            // 监听字段变化
            watch(() => store.state, () => {
                const watchers = []

                // 监听计算错误
                watchers.push(store.on("computed:error", ({ path, error }) => {
                    const propKey = path[path.length - 1]
                    if (propKey in fieldPropObjs) {
                        renderProps.value.error = error.message
                        formCtx.value?.validator?.updateInvalids(name, false)
                    }
                }))

                // 监听字段值变化
                watchers.push(store.watch(name, ({ value: newValue }: any) => {
                    renderProps.value.modelValue = newValue
                    renderProps.value.bind.modelValue = newValue
                }))

                // 监听计算属性变化
                watchers.push(store.watch(`#${name}.*`, ({ path, value: newValue }) => {
                    const propKey = path[path.length - 1]
                    if (propKey in fieldPropObjs) {
                        const propObj = fieldPropObjs[propKey]
                        if (propObj?.async && path[path.length - 1] === 'value') {
                            renderProps.value[propKey] = newValue.value
                        } else {
                            renderProps.value[propKey] = newValue
                        }

                        if (propKey === 'validate') {
                            if (newValue === true) {
                                renderProps.value.error = null
                            }
                            formCtx.value?.validator?.updateInvalids(name, newValue)
                        }
                    }
                }))

                // 清理
                onUnmounted(() => {
                    watchers.forEach(w => w.off())
                })
            })

            // 渲染
            return () => props.render(renderProps.value)
        }
    }) as unknown as AutoField<State>
}