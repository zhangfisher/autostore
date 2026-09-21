import { InvalidDependsError, InvalidScopeError, TimeoutError } from "../errors";
import type { AutoStore } from "../store/store";
import type { Dict } from "../types";
import type { ComputedObject } from "./computedObject";
import type { SyncComputedObject } from "./sync";
import type {
    AsyncComputedGetter,
    ComputedDepends,
    ComputedDescriptor,
    ComputedGetter,
    ComputedOptions,
    RuntimeComputedOptions,
    SyncComputedOptions,
} from "./types";
import { computed } from "./computed";
import { isAbsolutePath } from "../utils/isAbsolutePath";
import { isObserverDescriptor } from "../utils/isObserverDescriptor";
import { isPathEq } from "../utils";
import { AsyncComputedObject } from "./async";
import { normalizePath } from "../utils/normalizePath";

export class ComputedObjects<State extends Dict = Dict> extends Map<string, ComputedObject<Dict>> {
    constructor(public store: AutoStore<State>) {
        super();
    }
    get enable() {
        return this.store.options.enableComputed!;
    }
    set enable(value: boolean) {
        this.store.options.enableComputed = value;
    }

 
    /**
     * 移除指定的计算对象
     *
     * 注意：如果该计算对象是state的某个属性创建的，只会删除计算对象，不会删除state属性
     *
     * 路由到 observer.destroy()：解除订阅 + 取消 inflight + 触发 observer:destroyed 事件。
     *
     * @param id
     * @returns
     */
    delete(id: string) {
        const obj = this.get(id);
        if (obj) {
            obj.destroy();
            return true;
        }
        return Map.prototype.delete.call(this, id);
    }
    /**
     * 返回指定路径的计算对象
     *
     * @example
     *
     *
     * const computedObjects = store.computedObjects.find(['a','b'])
     *
     * @param path
     */
    find(path: string | string[] | undefined): ComputedObject | undefined {
        if (!path) return;
        const spath = normalizePath(path);
        for (const obj of this.values()) {
            if (isPathEq(obj.path, spath)) {
                return obj;
            }
        }
    }
}
