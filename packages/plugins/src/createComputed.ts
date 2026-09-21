import { AsyncComputedGetter, AsyncComputedObject, ComputedDepends, ComputedDescriptor, ComputedGetter, ComputedObject, ComputedObjects, ComputedOptions, InvalidDependsError, InvalidScopeError, computed, isAbsolutePath, isObserverDescriptor, RuntimeComputedOptions, SyncComputedObject, SyncComputedOptions, TimeoutError } from "autostore";

interface CreateComputedObject<Value = any, Scope = any>{
    (this:ComputedObjects<any>,getter: ComputedGetter<Value, Scope>,options?: SyncComputedOptions<Value, Scope>,
    ): SyncComputedObject<Value, Scope>;
    <Value = any, Scope = any>(this:ComputedObjects<any>,
        getter: AsyncComputedGetter<Value, Scope>,
        depends: ComputedDepends,
        options?: ComputedOptions<Value, Scope>,
    ): AsyncComputedObject<Value, Scope>;
    <Value = any, Scope = any>(this:ComputedObjects<any>,
        descriptor: ComputedDescriptor<Value, Scope>,
    ): ComputedObject<Value, Scope>;
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
ComputedObjects.prototype.create= function create(this:ComputedObjects<any>): any {
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
            // 注意：空依赖([])是合法的（如useComputed(async getter)不指定依赖，仅首次执行，依赖变化不重算），
            // isAbsolutePath([])会返回false，需要先排除空依赖场景
            const deps = descrioptor.options.depends;
            const hasRelativeDep = Array.isArray(deps) && deps.length > 0 && !isAbsolutePath(deps);
            if (!hasAnchor && hasRelativeDep) {
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

declare module "autostore" {    
    export interface ComputedObjects{
        create:CreateComputedObject
    }
}



