import { AnyObserverDescriptor, ObserverContext } from "../observer";
import type { AutoStore } from "../store";
import { AnyAutoStore } from "../types";
import {
    isAllowCreatedObserver,
    isPlainObject,
    isRaw,
    isSchemaDescriptorBuilder,
} from "../utils";
import { getObserverDescriptor } from "../utils/getObserverDescriptor";
import { joinPath } from "../utils/joinPath";

export function getErrorTips(this: AutoStore<any>, errorTips: any, path: string, newValue: any, oldValue: any) {
	if (errorTips) {
		if (typeof errorTips === "function") {
			return errorTips.call(this, path, newValue, oldValue);
		} else {
			return errorTips;
		}
	}
	return `invalid value on path: ${path}`;
}

export function getDataType(value: any) {
	return Array.isArray(value)
		? "array"
		: value === null
			? "any"
			: value === undefined
				? "any"
				: value instanceof Date
					? "date"
					: typeof value;
}

/**
 * 注册一个可配置项到 ConfigManager，并级联注册其初始值中嵌套的 schema builder。
 *
 * 幂等：同一注册路径只注册一次，重复到达时仅返回初始值。
 *
 * 已知限制（既有时序缺陷，暂不处理，见 plan）：
 * - 外部 ConfigManager 实例 + await load() 先于 store 构造完成 + 嵌套项：
 *   嵌套项被级联提前注册后，add() 中 loadedValue 的数据属性赋值会被
 *   _createValueProxy 的 defineProperty 访问器丢弃，导致 loaded 值丢失。
 * - ConfigSource 形式的 configManager 会被 observers.ts 判进同步分支，
 *   此时 _configManager 尚未赋值，构造期即崩溃。
 */
export function addConfigueableItem(
    store: AnyAutoStore,
    descriptor: AnyObserverDescriptor,
    context: ObserverContext,
) {
    const { path, value } = context;
    const pathId = joinPath(path);
    // 幂等守卫：已注册（级联提前注册或 Proxy 访问双路到达）时不再重入 add()
    // （value 访问器 configurable:false，二次 defineProperty 会抛 TypeError），
    // 只返回初始值，供 get 陷阱把状态树中残留的 builder 函数替换为真值
    if (store.configurabled.has(pathId)) {
        return descriptor.getter();
    }
    // 共享 descriptor 判重：builder 每次调用返回同一 options 引用，同一 builder
    // 以不同 path 二次 add 时，options.value 已是首次注册定义的访问器（configurable:false），
    // 赋值会命中其 setter 把初始值误写进状态树（改写沿途槽位，诱发构造期遍历死循环）
    if (Object.getOwnPropertyDescriptor(descriptor.options as any, "value")?.get) {
        return descriptor.getter();
    }
    const val = store.configManager.add(store, path, value);
    // 先入集合再级联，防止级联扫描中同路径重入
    store.configurabled.add(pathId);
    // 级联：初始值为对象/数组时，深入注册其中嵌套的 schema builder，
    // 使 configManager.state 无需访问即可包含全部 configurable 项
    scanDescriptorInitial(store, descriptor, path);
    return val;
}

/**
 * 只读扫描 schema 初始值容器，对其中的嵌套 schema builder 以子路径递归注册。
 * 不向被扫描对象写回任何值：initial 闭包对象与状态树共享引用，
 * 且可能被多个 store 共享，写入会导致其他 store 的子项注册缺失。
 */
function scanDescriptorInitial(
    store: AnyAutoStore,
    descriptor: AnyObserverDescriptor,
    path: string[],
) {
    try {
        scanContainer(store, descriptor.getter(), path, new WeakSet());
    } catch {
        // 初始值求值失败时跳过级联，不影响外层注册
    }
}

function scanContainer(
    store: AnyAutoStore,
    container: any,
    path: string[],
    visited: WeakSet<object>,
) {
    if (!isPlainObject(container) && !Array.isArray(container)) return;
    if (isRaw(container) || visited.has(container)) return; // WeakSet 防循环引用
    visited.add(container);
    for (const key of Object.keys(container)) {
        // @ts-ignore
        const child = container[key];
        const childPath = [...path, key];
        if (isSchemaDescriptorBuilder(child)) {
            if (isRaw(child)) continue;
            // 与 Proxy get 陷阱语义一致：observer/initial 钩子返回 false 可否决注册
            // （否决时不 markRaw，保留后续访问时注册的机会）
            if (isAllowCreatedObserver(store, childPath, child, path, container) === false) {
                continue;
            }
            const childDescriptor = getObserverDescriptor(child);
            if (!childDescriptor) continue;
            addConfigueableItem(store, childDescriptor, {
                path: childPath,
                value: child,
                parentPath: path,
                parent: container,
            });
        } else if (isPlainObject(child) || Array.isArray(child)) {
            scanContainer(store, child, childPath, visited);
        }
    }
}

export function createSelfConfigManager(store:AnyAutoStore){
    // @ts-ignore
    if(store.options.configManager===true && store._tmp_schemas){
        store.options.configKey='';
        // @ts-ignore
        (store._tmp_schemas  as [AnyObserverDescriptor,ObserverContext][]).forEach(([descriptor,context])=>{
            addConfigueableItem(store,descriptor,context)
        })
        // @ts-ignore
        delete store._tmp_schemas
    }    
}
