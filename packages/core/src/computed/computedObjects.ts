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
     * 动态创建一个新的计算对象
     *
     * @description
     *
     * 如同在状态对象中使用computed创建计算属性一样，可以使用computedObjects.create动态创建一个计算对象。
     *
     * 动态创建的计算对象始终是游离的(detached)：
     * - 不挂载到状态树，`associated=false`
     * - 计算结果保存在对象自身，不会回写到状态树
     * - id 自动生成（非路径）
     *
     * 由于动态创建时没有计算上下文，scope 和 depends 默认只能使用根状态对象(ROOT)或绝对路径。
     * 若需要使用相对路径(如 `./xxx`、`../xxx`、`CURRENT`、`PARENT`)，可通过 `options.anchor`
     * 声明该计算对象的逻辑位置(锚点)。提供 anchor 后：
     * - scope 和 depends 支持相对路径
     * - 默认 scope 变为 CURRENT（指向 anchor.path 所在容器），与静态计算属性一致
     * - 仅需提供 `anchor.path`，`parentPath` 会自动推导；不改变游离性质，也不会回写状态树
     *
     * @example
     *
     * // 1. 不提供 anchor：scope 只能是 ROOT 或绝对路径
     * computedObjects.create((state) => state.a + state.b)
     *
     * // 2. 提供 anchor：支持相对路径，默认 scope=CURRENT 指向容器
     * computedObjects.create(
     *   (order) => order.price * order.count,
     *   { anchor: { path: ['order', 'total'] } },
     * )
     *
     * // 3. 提供 anchor + 相对 depends（异步）
     * computedObjects.create(
     *   async (order) => order.price * order.count,
     *   ['./price', './count'],
     *   { anchor: { path: ['order', 'total'] } },
     * )
     */
    create<Value = any, Scope = any>(
        getter: ComputedGetter<Value, Scope>,
        options?: SyncComputedOptions<Value, Scope>,
    ): SyncComputedObject<Value, Scope>;
    create<Value = any, Scope = any>(
        getter: AsyncComputedGetter<Value, Scope>,
        depends: ComputedDepends,
        options?: ComputedOptions<Value, Scope>,
    ): AsyncComputedObject<Value, Scope>;
    create<Value = any, Scope = any>(
        descriptor: ComputedDescriptor<Value, Scope>,
    ): ComputedObject<Value, Scope>;
    create(): any {
        const descrioptor: ComputedDescriptor = isObserverDescriptor(arguments[0])
            ? arguments[0] // @ts-expect-error
            : computed(...arguments)();
        // 是否提供了锚点。提供 anchor 后即可使用相对路径的 scope 和 depends
        const hasAnchor = !!descrioptor.options.anchor;
        if (hasAnchor) {
            // path 是相对路径解析的前提，必须存在；parentPath 可由 path 自动推导
            const ctxPath = descrioptor.options.anchor!.path;
            if (!ctxPath || ctxPath.length === 0) {
                throw new InvalidScopeError(
                    "When anchor is provided, anchor.path is required to resolve relative paths",
                );
            }
            if (!descrioptor.options.anchor!.parentPath) {
                descrioptor.options.anchor!.parentPath = ctxPath.slice(0, -1);
            }
        }
        if (descrioptor.options.async) {
            // 异步依赖是手工指定的：无 anchor 时必须是绝对路径；有 anchor 时允许相对路径
            if (!hasAnchor && !isAbsolutePath(descrioptor.options.depends)) {
                throw new InvalidDependsError(
                    "The depends of the dynamic computed object must be absolute paths, or provide an anchor to enable relative paths",
                );
            }
        }
        const scope = descrioptor.options.scope;
        if (hasAnchor) {
            // 有 anchor：允许相对路径；scope 未指定时不强制 ROOT，让 scope.ts 的默认值(CURRENT)生效
            if (scope === "ROOT") {
                descrioptor.options.scope = "ROOT";
            }
        } else {
            // 无 anchor：scope 只能是根或绝对路径
            if (scope === undefined || scope === "ROOT") {
                descrioptor.options.scope = "ROOT";
            } else if (!isAbsolutePath([scope])) {
                throw new InvalidScopeError(
                    "The scope of the dynamic computed object must be the root state object or an absolute path, or provide an anchor to enable relative paths",
                );
            }
        }

        return this.store.createObserverObject(descrioptor);
    }
    /**
     * 运行指定组的计算函数
     *
     * 注意：并不会等待所有的计算函数都执行完毕，而是返回一个Promise.all
     *
     * @param string
     * @param
     * @param string
     * @param param3
     */
    async runGroup(
        group: string,
        runArgs?: RuntimeComputedOptions,
        options?: { wait?: boolean; timeout?: number },
    ) {
        return await this.run(
            (computedObject: ComputedObject) => computedObject.group === group,
            runArgs,
            options,
        );
    }
    /**
     * 运行指定id或满足条件的计算函数
     *
     * 当wait=true时则等待所有的计算函数执行完毕
     * 也可以指定一个timeout时间，超时后会抛出异常TIMEOUT
     *
     *
     * @param filter
     * @param runArgs 传递给计算属性的run函数的参数
     * @param options
     */
    async run(
        filter: (computedObject: ComputedObject) => boolean,
        runArgs?: RuntimeComputedOptions,
        options?: { wait?: boolean; timeout?: number },
    ): Promise<any>;
    async run(
        id: string,
        runArgs?: RuntimeComputedOptions,
        options?: { wait?: boolean; timeout?: number },
    ): Promise<any>;
    async run(): Promise<any> {
        if (arguments.length === 0) {
            return Promise.all(
                [...this.values()].map((computedObject) => {
                    return computedObject.run() as any;
                }) as Promise<any>[],
            );
        }
        let filter: (computedObject: ComputedObject) => boolean;
        if (typeof arguments[0] === "function") {
            filter = arguments[0];
        } else if (typeof arguments[0] === "string") {
            // 运行指定的id
            filter = (computedObject: ComputedObject) => computedObject.id === arguments[0];
        }

        const computedRunArgs = Object.assign({}, arguments[1]) as RuntimeComputedOptions;

        const options = Object.assign({ wait: false, timeout: 0 }, arguments[2]) as {
            wait: boolean;
            timeout: number;
        };

        // 等待所有的计算函数执行完毕
        const dones: Record<string, boolean> = {}; // 记录各个计算函数是否执行完毕
        return new Promise<void>((resolve, reject) => {
            // 是否等待所有的计算函数执行完毕
            if (options.wait) {
                let tmId: any;
                computedRunArgs.onDone = ({ id }) => {
                    dones[id] = true;
                    if (Object.values(dones).every((v) => v)) {
                        clearTimeout(tmId);
                        return true;
                    }
                };
                if (options.timeout > 0) {
                    tmId = setTimeout(() => {
                        reject(new TimeoutError());
                    }, options.timeout);
                }
            }
            Promise.all(
                [...this.values()]
                    .filter((obj: ComputedObject) => {
                        if (filter(obj)) {
                            dones[obj.id] = false;
                            return true;
                        }
                        return false;
                    })
                    .map((computedObject) => {
                        return computedObject.run(computedRunArgs) as any;
                    }),
            );
            if (!options.wait) {
                resolve();
            }
        });
    }

    /**
     * 启用或禁用计算
     * @param value
     */
    async enableGroup(value: boolean) {
        for (const computedObject of this.values()) {
            computedObject.options.enable = value;
        }
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
