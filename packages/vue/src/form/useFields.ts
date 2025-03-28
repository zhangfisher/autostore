import { Dict, getVal, isPrimitive, isPlainObject, setVal, PATH_DELIMITER, isAsyncComputedValue } from "autostore"
import { VueAutoStore } from "../store"
import { ref, reactive, watch } from "vue"
import type { UseFieldsOptions, UseFieldsType } from "./types"
import { createFieldBinding } from "./useField"

export const FAKE_BINDINGS = Symbol('FAKE_BINDINGS')

/**
 * 构建一个假的对象绑定
 * 
 * @description
 * 为什么要构建假的对象绑定？
 * 主要是为了节约内存，如果没有访问到就不需要去创建绑定对象
 */
export function createFakeObjectBindings<State extends Dict>(store: VueAutoStore<State>, val: object) {
    const bindings = {} as Record<string, any>
    
    if (val instanceof Map) {
        val.forEach((_, key) => {
            bindings[key] = FAKE_BINDINGS
        })
    } else {
        Object.entries(val).forEach(([key]) => {
            bindings[key] = FAKE_BINDINGS
        })
    }
    
    return bindings
}

/**
 * 创建响应式代理对象
 */
function createProxy<State extends Dict>(
    target: any,
    parentPath: string[],
    proxyCache: Map<any, any>,
    store: VueAutoStore<State>,
    options: Required<UseFieldsOptions>
): any {
    if (typeof target !== 'object' || target === null) {
        return target
    }

    const pathKey = parentPath.length === 0 ? "__ROOT__" : parentPath.join('.')
    if (proxyCache.has(pathKey)) {
        return proxyCache.get(pathKey)
    }

    let fakeTarget = target
    if (Array.isArray(target) || isPlainObject(target)) {
        fakeTarget = createFakeObjectBindings(store, target)
    }

    const proxyObj = new Proxy(fakeTarget, {
        get: (obj, key, receiver) => {
            if (typeof(key) !== 'string') return Reflect.get(obj, key, receiver)

            const path = [...parentPath, String(key)]
            const relPathKey = path.join(PATH_DELIMITER)
            const value = getVal(store.state, path)

            if (isPrimitive(value)) {
                const fieldOpts = (relPathKey in options ? options[relPathKey] : {}) as any
                return createFieldBinding(store, path, 0, value, undefined, undefined, fieldOpts)
            } else if (isAsyncComputedValue(value)) {
                const fieldOpts = (relPathKey in options ? options[relPathKey] : {}) as any
                return createFieldBinding(store, [...path, 'value'], 0, value, undefined, undefined, fieldOpts)
            } else {
                return createProxy(value, path, proxyCache, store, options)
            }
        }
    })

    proxyCache.set(pathKey, proxyObj)
    return proxyObj
}

/**
 * 创建绑定状态
 */
export function createBindingsState<State extends Dict>(
    store: VueAutoStore<State>,
    options: Required<UseFieldsOptions>
) {
    const proxyCache = new Map()
    return createProxy<State>({}, [], proxyCache, store, options)
}

/**
 * 创建useFields hook
 */
export function createUseFields<State extends Dict>(store: VueAutoStore<State>): UseFieldsType<State> {
    return function(options?: UseFieldsOptions) {
        const opts = Object.assign({ entry: [] }, options) as Required<UseFieldsOptions>

        // 创建响应式状态
        const snap = ref(store.getSnap())
        const bindingsState = reactive(createBindingsState(store, opts))

        // 监听状态变化
        watch(() => store.state, (newState) => {
            snap.value = { ...newState }
        }, { deep: true })

        // 监听写操作
        store.watch((op) => {
            if (op.reply) return
            const ops = op.type === 'batch' ? op.value : [op]
            ops.forEach(({ path, value }) => {
                setVal(snap.value, path, value)
                setVal(bindingsState, [...path, 'value'], value)
            })
        }, { operates: 'write' })

        return bindingsState
    }
}