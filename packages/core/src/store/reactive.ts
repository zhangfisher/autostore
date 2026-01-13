import { isRaw } from '../utils/isRaw';
import { hookArrayMethods } from './hookArray';
import type { StateOperateType, StateValidator } from './types';
import { CyleDependError, ValidateError } from '../errors';
import type { ComputedState, Dict } from '../types';
import type { AutoStore } from './store';
import { isNumber } from '../utils/isNumber';
import { markRaw } from '../utils/markRaw';
import { isPathMatched } from '../utils/isPathMatched';

const __NOTIFY__ = Symbol('__NOTIFY__');

export type ReactiveNotifyParams<T = any> = {
    type: StateOperateType;
    path: string[];
    indexs: number[];
    value: T;
    oldValue: T;
    parentPath: string[];
    parent: any;
    operates?: StateOperateType[];
};

type CreateReactiveObjectOptions = {
    notify: (params: ReactiveNotifyParams) => void;
    createObserverObject: (path: string[], value: any, parentPath: string[], parent: any) => any;
};

/**
 * 获取指定路径的验证函数
 *
 * @param this - AutoStore 实例
 * @param path - 状态路径
 * @returns 验证函数，如果没有找到则返回 undefined
 */
function getValidate(this: AutoStore<any>, path: string[]): StateValidator<any> | undefined {
    // 优先在 validators 中查找匹配的验证函数
    if (this.options.validators) {
        const pathString = path.join(this.options.delimiter || '.');

        // 查找完全匹配的验证器
        if (this.options.validators[pathString]) {
            return this.options.validators[pathString];
        }

        // 使用通配符匹配查找验证器
        const validatorKeys = Object.keys(this.options.validators);
        for (const key of validatorKeys) {
            if (isPathMatched(path, key)) {
                return this.options.validators[key];
            }
        }
    }

    // 如果在 validators 中没有找到，则返回 onValidate
    return this.options.onValidate;
}

function isValidPass(this: AutoStore<any>, _: any, path: string[], newValue: any, oldValue: any) {
    //@ts-expect-error
    const behavior = this._updateValidateBehavior;
    if (behavior === 'none') return true;

    const validate = getValidate.call(this, path);
    if (typeof validate !== 'function') return true;

    let isPass: boolean | Error = true;
    let error: any;
    const pathKey = path.join(this.options.delimiter || '.');
    const configKey = this.options.configKey ? `${this.options.configKey}.${pathKey}` : pathKey;
    try {
        const isValid = validate!.call(this, newValue, oldValue, path);
        if (isValid === false) {
            // 返回 false 时，代表校验出错，因此应抛出一个错误
            // 但是无法提供更精确的错误信息
            throw new ValidateError();
        }
        // 校验成功，删除该路径的错误记录
        if (this.options.configManager) {
            delete this.options.configManager.errors[configKey];
        }
        if (this.errors) {
            delete this.errors[configKey];
        }
    } catch (e: any) {
        error = e;
        const errors = this.options?.configManager?.errors || this.errors;
        errors[configKey] = validate.getErrorMessage?.(e) || e.message || e.stack;
        // 存储错误信息到 ConfigManager.errors（转换为字符串）
        // if (this.options.configManager) {
        //     this.options.configManager.errors[getConfigKey()] =
        //         validate.getErrorMessage?.(e) || e.message || String(e);
        // }
        // 优先级：behavior 参数 > e.behavior > validate.onInvalid > this.options.onInvalid
        // 这样可以确保 configurable 中配置的 onInvalid 优先生效
        const finalBehavior =
            behavior || e.behavior || validate.onInvalid || this.options.onInvalid || 'throw';

        if (finalBehavior === 'pass') {
            isPass = true;
        } else if (finalBehavior === 'ignore') {
            isPass = false;
        } else if (finalBehavior === 'throw-pass') {
            isPass = e;
        } else {
            throw e;
        }
    } finally {
        this.emit('validate', {
            path,
            newValue,
            oldValue,
            error,
        });
    }

    return isPass;
}

function createProxy(
    this: AutoStore<any>,
    target: any,
    parentPath: string[],
    proxyCache: WeakMap<any, any>,
    isComputedCreating: Map<any, any>,
    options: CreateReactiveObjectOptions,
): any {
    if (isRaw(target)) return target;
    if (typeof target !== 'object' || target === null) {
        return target;
    }
    if (proxyCache.has(target)) {
        return proxyCache.get(target);
    }
    const proxyObj = new Proxy(target, {
        get: (obj, key, receiver) => {
            const value = Reflect.get(obj, key, receiver);
            if (typeof key !== 'string') return value;
            const path = [...parentPath, String(key)];
            if (typeof value === 'function' || !Object.hasOwn(obj, key)) {
                if (typeof value === 'function') {
                    if (Array.isArray(obj) && !isNumber(key)) {
                        return hookArrayMethods(
                            options.notify,
                            obj,
                            key as string,
                            value,
                            parentPath,
                        );
                    }
                    if (!isRaw(value) && Object.hasOwn(obj, key)) {
                        // 拦截
                        if (typeof this.options.onObserverInitial === 'function') {
                            try {
                                const isCreated = this.options.onObserverInitial.call(
                                    this,
                                    path,
                                    value,
                                    obj,
                                );
                                if (isCreated === false) {
                                    markRaw(value);
                                    return value;
                                }
                            } catch (e: any) {
                                this.log(`onObserverBeforeCreate error: ${e.message}`, 'error');
                            }
                        }
                        const pathKey = path.join('.');
                        try {
                            if (isComputedCreating.has(pathKey)) {
                                // 如果已经创建过计算属性，则直接返回
                                const cylePaths = [...isComputedCreating.keys(), pathKey];
                                isComputedCreating.clear();
                                throw new CyleDependError(
                                    `Find circular dependency at <"${path}">, steps: ${cylePaths.join(
                                        ' -> ',
                                    )}`,
                                );
                            }
                            isComputedCreating.set(pathKey, true);
                            const result = options.createObserverObject(
                                path,
                                value,
                                parentPath,
                                obj,
                            ); // 如果值是一个函数，则创建一个计算属性或Watch对象
                            // 如果返回的不是函数（比如是 schema builder 返回的 initialValue），则将其设置到对象中
                            if (typeof result !== 'function') {
                                Reflect.set(obj, key, result, receiver);
                            }
                            return result;
                        } finally {
                            isComputedCreating.delete(pathKey);
                        }
                    } else {
                        return value;
                    }
                } else {
                    return value;
                }
            }
            options.notify({
                type: 'get',
                path,
                indexs: [],
                value,
                oldValue: undefined,
                parentPath,
                parent: obj,
            });
            return createProxy.call(this, value, path, proxyCache, isComputedCreating, options);
        },
        set: (obj, key, value, receiver) => {
            const oldValue = Reflect.get(obj, key, receiver);
            const path = [...parentPath, String(key)];
            const isValid = isValidPass.call(this, proxyObj, path, value, oldValue);
            if (isValid) {
                const success = Reflect.set(obj, key, value, receiver);
                if (key === __NOTIFY__) return true;
                if (success && key !== __NOTIFY__ && value !== oldValue) {
                    options.notify({
                        type: Array.isArray(obj) ? 'update' : 'set',
                        path,
                        indexs: [],
                        value,
                        oldValue,
                        parentPath,
                        parent: obj,
                    });
                }
                if (isValid instanceof Error) {
                    throw isValid;
                }
                return success;
            } else {
                return true;
            }
        },
        deleteProperty: (obj, prop) => {
            const value = obj[prop];
            const path = [...parentPath, String(prop)];
            const success = Reflect.deleteProperty(obj, prop);
            if (success && prop !== __NOTIFY__) {
                options.notify({
                    type: 'delete',
                    path,
                    indexs: [],
                    value,
                    oldValue: undefined,
                    parentPath,
                    parent: obj,
                });
            }
            return success;
        },
    });
    proxyCache.set(target, proxyObj);
    return proxyObj;
}

/**
 * 创建一个响应式对象。
 *
 * @template State - 对象状态的类型，必须是对象类型。
 * @param {State} state - 对象的状态，必须是对象类型。
 * @param {CreateReactiveObjectOptions} [options] - 可选参数，用于配置响应式对象的行为。
 * @param {CreateReactiveObjectOptions.notify} [options.notify] - 用于通知状态变化的回调函数。
 * @param {CreateReactiveObjectOptions.createDynamicValueObject} [options.createDynamicValueObject] - 用于创建动态值对象的函数。
 * @returns {State} - 返回一个响应式对象。
 */
export function createReactiveObject<State extends Dict>(
    this: AutoStore<any>,
    state: State,
    options?: CreateReactiveObjectOptions,
): ComputedState<State> {
    const isComputedCreating = new Map();
    const proxyCache = new WeakMap();
    return createProxy.call(
        this,
        state,
        [],
        proxyCache,
        isComputedCreating,
        options!,
    ) as ComputedState<State>;
}
