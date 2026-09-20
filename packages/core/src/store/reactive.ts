import { isRaw } from "../utils/isRaw";
import { hookArrayMethods } from "./hookArray";
import type { StateOperateType, StateValidator } from "./types";
import { CyleDependError, ValidateError } from "../errors";
import type { ComputedState, Dict } from "../types";
import type { AutoStore } from "./store";
import { isNumber } from "../utils/isNumber";
import { markRaw } from "../utils/markRaw";
import { isAllowCreatedObserver } from "../utils/isAllowCreatedObserver";
import { isPathMatched } from "../utils/isPathMatched";
import { getSchemaValue, ValueSchema } from "../utils/withSchema";
import { PATH_DELIMITER } from "../consts";

const __NOTIFY__ = Symbol("__NOTIFY__");

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
 * 计算 configKey 路径
 */
function computeConfigKey(store: AutoStore<any>, pathKey: string): string {
    const configKeyArg = store.options.configKey;
    return configKeyArg && configKeyArg.length > 0
        ? `${store.options.configKey}.${pathKey}`
        : pathKey;
}

/**
 * 记录验证错误到 configManager 和 store.errors
 */
function recordError(store: AutoStore<any>, configKey: string, pathKey: string, errMsg: string) {
    if (store.configManager) {
        const errors = store.configManager.errors;
        if (errors) {
            errors[configKey] = errMsg;
        }
        if (configKey in store.configManager.state) {
            (store.configManager.state as any)[configKey].errorMessage = errMsg;
        }
    }
    store.errors[pathKey] = errMsg;
}

/**
 * 清除验证错误
 */
function clearError(store: AutoStore<any>, configKey: string, pathKey: string) {
    if (store.configManager) {
        delete store.configManager.errors[configKey];
        if (configKey in store.configManager.state) {
            (store.configManager.state as any)[configKey].errorMessage = null;
        }
    }
    if (store.errors) {
        delete store.errors[pathKey];
    }
}

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
        const pathString = path.join(this.options.delimiter);

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

    // 如果在 validators 中没有找到，则返回 validate
    return this.options.validate;
}

function isValidPass(
    this: AutoStore<any>,
    _: any,
    path: string[],
    newValue: any,
    oldValue: any,
    schema: ValueSchema | undefined,
) {
    //@ts-expect-error
    const behavior = schema?.onInvalid || this._updateValidateBehavior;
    if (behavior === "none") return true;

    const validate = getValidate.call(this, path);
    if (typeof validate !== "function") return true;

    let isPass: boolean | Error = true;
    let error: any;
    const pathKey = path.join(PATH_DELIMITER);
    const configKey = computeConfigKey(this, pathKey);
    try {
        const isValid = validate!.call(this, newValue, oldValue, path);
        if (isValid === false) {
            throw new ValidateError();
        }
        clearError(this, configKey, pathKey);
    } catch (e: any) {
        error = e;
        const errMsg = validate.getErrorMessage?.(e) || e.message || e.stack;
        recordError(this, configKey, pathKey, errMsg);
        // 优先级：behavior 参数 > e.behavior > validate.onInvalid > this.options.onInvalid
        const finalBehavior =
            behavior || e.onInvalid || validate.onInvalid || this.options.onInvalid || "throw";

        if (finalBehavior === "pass") {
            isPass = true;
        } else if (finalBehavior === "ignore") {
            isPass = false;
        } else if (finalBehavior === "throw-pass") {
            isPass = e;
        } else {
            isPass = false;
            throw e;
        }
    } finally {
            this.emit("validate", {
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
    isComputedCreating: Set<string>,
    options: CreateReactiveObjectOptions,
): any {
    if (isRaw(target)) return target;
    if (typeof target !== "object" || target === null) {
        return target;
    }
    if (proxyCache.has(target)) {
        return proxyCache.get(target);
    }
    const proxyObj = new Proxy(target, {
        get: (obj, key, receiver) => {
            const value = Reflect.get(obj, key, receiver);
            if (typeof key !== "string") return value;
            const path = [...parentPath, String(key)];
            if (typeof value === "function" || !Object.hasOwn(obj, key)) {
                if (typeof value === "function") {
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
                        const isCreated = isAllowCreatedObserver(
                            this,
                            path,
                            value,
                            parentPath,
                            obj,
                        );
                        if (!isCreated) {
                            markRaw(value);
                            return value;
                        }
                        const pathKey = path.join(".");
                        try {
                            if (isComputedCreating.has(pathKey)) {
                                const cylePaths = [...isComputedCreating.keys(), pathKey];
                                isComputedCreating.clear();
                                throw new CyleDependError(
                                    `Find circular dependency at <"${pathKey}">, steps: ${cylePaths.join(
                                        " -> ",
                                    )}`,
                                );
                            }
                            isComputedCreating.add(pathKey);
                            const result = options.createObserverObject(
                                path,
                                value,
                                parentPath,
                                obj,
                            );
                            if (typeof result !== "function") {
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
                type: "get",
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
            const isObj = typeof value === "object" && value !== null;
            const [val, schema] = isObj ? getSchemaValue(value) : [value, undefined];
            const isValid = isValidPass.call(this, proxyObj, path, val, oldValue, schema);
            if (isValid) {
                const success = Reflect.set(obj, key, val, receiver);
                if (key === __NOTIFY__) return true;

                if (success && this.configManager) {
                    const pathKey = path.join(PATH_DELIMITER);
                    if (this.configurabled.has(pathKey)) {
                        const configKey = computeConfigKey(this, pathKey);
                        setTimeout(() => {
                            this.configManager?.onUpdate(this, configKey, val);
                        }, 0);
                    }
                }

                if (success && !schema?.slient && key !== __NOTIFY__ && val !== oldValue) {
                    options.notify({
                        type: Array.isArray(obj) ? "update" : "set",
                        path,
                        indexs: [],
                        value: val,
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
                    type: "delete",
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
    const isComputedCreating = new Set<string>();
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
