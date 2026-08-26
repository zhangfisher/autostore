import {
    type Dict,
    isObserverDescriptor,
    isObserverDescriptorBuilder,
    type ObserverBuilder,
    type ObserverObject,
} from 'autostore';
import { useEffect, useRef } from 'react';
import type { ReactAutoStore } from '../store';
import type { UseObserverObjectType } from './types';

/**
 * 依据 builder 形态创建 observer 对象（原 core 的 createObserverObject 工厂内联实现，
 * core 重构删除该导出后由 react 侧自行消化）：
 * - computed 描述符 / getter 函数 → computedObjects.create（内部自带 isObserverDescriptor
 *   分支：描述符直用、getter 包装 computed()，无需在此二次判定）；
 * - watch 描述符 → watchObjects.create；
 * - 其余 → undefined（与原工厂一致，交由调用方处理）。
 */
function createObserverObjectFrom(
    store: ReactAutoStore<any>,
    builder: ObserverBuilder,
    options?: Dict,
): ObserverObject<any> | undefined {
    const descriptor = isObserverDescriptorBuilder(builder) ? (builder as () => any)() : builder;
    if (isObserverDescriptor(descriptor)) {
        Object.assign(descriptor.options, options);
        if (descriptor.type === 'computed') {
            return store.computedObjects.create(descriptor as any) as ObserverObject<any>;
        }
        if (descriptor.type === 'watch') {
            return store.watchObjects.create(descriptor as any) as ObserverObject<any>;
        }
        return undefined;
    }
    if (typeof descriptor === 'function') {
        return store.computedObjects.create(descriptor as any, options as any) as ObserverObject<any>;
    }
    return undefined;
}

export function createUseObserverObject<State extends Dict>(store: ReactAutoStore<State>) {
    return function <Value>(params: ObserverBuilder, options?: Dict) {
        if (!params) return undefined;
        const ref = useRef<ObserverObject<Value> | undefined>();
        if (!ref.current) {
            ref.current = createObserverObjectFrom(store, params, options) as ObserverObject<Value> | undefined;
        }
        useEffect(() => {
            return () => {
                ref.current?.detach();
                ref.current = undefined;
            };
        }, []);
        return ref.current;
    } as UseObserverObjectType<State>;
}
