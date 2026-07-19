/**
 * 观察者对象
 *
 * 观察者对象可以状态读写时进行响应
 * 如计算属性就是观察状态中的某个值的变化，当值变化时，触发回调函数进行相应的操作
 *
 *
 */
import type { AutoStore } from "../store/store";
import { getVal } from "../utils/getVal";
import { joinPath } from "../utils/joinPath";
import { setVal } from "../utils/setVal";
import { getId } from "../utils/getId";
import type { ObserverContext, ObserverDescriptor, ObserverOptions } from "./types";
import type { StateOperate, AutoStoreEvents, UpdateOptions } from "../store/types";
import type { Watcher, WatchListener, WatchListenerOptions } from "../watch/types";
import { calcDependPaths } from "../utils/calcDependPaths";
import { isFunction } from "flex-tools/typecheck/isFunction";
import { emitStoreEvent } from "../utils/emitStoreEvent";

export class ObserverObject<
    Value = any,
    Options extends ObserverOptions<Value> = ObserverOptions<Value>,
> {
    private _path: string[];
    private _id: string = "";
    private _initial: Value | undefined;
    private _value: Value | undefined;
    private _associated: boolean = false; // 是否已经关联到状态对象
    private _attached: boolean = false;
    private _destroyed: boolean = false; // 是否已经销毁
    private _getter: any;
    private _depends: string[][] = [];
    private _options: Required<Options>;
    private _subscribers: Watcher[] = []; // 保存订阅者的ID
    private _strPath?: string;
    private _error?: Error; // 记录最后一次运行时的错误
    store: AutoStore<any>;
    _shadowStore!: AutoStore<any>;
    /**
     *  构造函数。
     *
     * @param {AutoStore<any>} store
     * @param {ObserverContext} context - 动态值上下文，指该动态值所有的路径、值、父路径和父对象引用。
     * @param {ObserverDescriptor<Options>} descriptor - 动态值描述符，包含了动态值的元数据。
     */
    constructor(
        store: AutoStore<any>,
        public descriptor: ObserverDescriptor<any, any, any>,
        public context?: ObserverContext<Value>,
    ) {
        this.store = store;
        this._associated = context !== undefined;
        this._getter = descriptor.getter;
        this._options = Object.assign(
            {
                enable: true,
                group: "",
                depends: [],
                throwError: true,
            },
            descriptor.options,
        ) as unknown as Required<Options>;
        this._id = this._options.id || (this._associated ? joinPath(context?.path) : getId());
        this._path = context?.path || [`#${this._id}`];
        if (!this._path) this._path = [`#${this._id}`];
        this._initial = this._options.initial;
        this.onInitOptions(this._options);
        // this._createRefStateCtx(context?.value);
        this._depends = calcDependPaths(this._path, this._options.depends);
        emitStoreEvent(this.store, "observer:created", { context, observer: this });
        this._onInitial();
    }
    get type() {
        return this.descriptor.type;
    }
    get options() {
        return this._options;
    }
    get id() {
        return this._id;
    }
    get associated() {
        return this._associated;
    }
    get async() {
        return this._options.async;
    }
    get enable() {
        return this._options.enable!;
    }
    set enable(value: boolean) {
        this._options.enable = value;
    }
    set group(value: string) {
        this._options.group = value;
    }
    get group() {
        return this._options.group!;
    }
    get initial() {
        return this._initial;
    }
    set initial(value) {
        this._initial = value;
    }
    get path() {
        return this._path;
    }
    get attached() {
        return this._attached;
    }
    get destroyed() {
        return this._destroyed;
    }
    get depends() {
        return this._depends;
    }
    set depends(value: string[][]) {
        this._depends = value;
    }
    get getter() {
        return this._getter;
    }
    set getter(value) {
        this._getter = value;
    }
    get strPath() {
        if (!this._strPath) {
            this._strPath = this._path.join(this.store.options.delimiter);
        }
        return this._strPath!;
    }
    get error() {
        return this._error;
    }
    set error(value) {
        this._error = value;
    }
    toString() {
        return `ObserverObject<${this.strPath}>`;
    }

    get value() {
        if (this._associated) {
            return getVal(this.store.state, this._path);
        } else {
            this.store._notify({ type: "get", path: this.path, value: this._value });
            return this._value as unknown as Value;
        }
    }
    set value(value: Value) {
        if (this._associated) {
            setVal(this.store.state, this._path, value);
        } else {
            /**
             * 为什么赋值没有写到state?
             *
             * 当独立创建的Observer时，即通过this.computedObjects.create()创建时，没有指定绑定到相关的状态上时
             */
            const oldValue = this._value;
            if (value !== oldValue) {
                this._value = value;
                this.store._notify({ type: "set", path: this.path, value, oldValue });
            }
        }
    }

    private _onInitial() {
        if (this._options.initial !== undefined) {
            this.update(this._options.initial, { silent: true });
        }
        this.onInitial();
    }

    // private _createRefStateCtx(value: any) {
    //     const _getRefStore =
    //         value?._getRefStore ||
    //         (() => {
    //             return this.options.refStore || this.store.options.refStore;
    //         });
    //     if (isFunction(_getRefStore)) {
    //         const storeRef = _getRefStore() as WeakRef<AutoStore<any>>;
    //         if (storeRef) {
    //             this._refStateCtx = createRefState(storeRef, this as ObserverObject);
    //         }
    //     }
    // }
    /**
     * 供子类继承进行初始化
     */
    protected onInitial() {}
    /**
     * 供子类对选项进行初始化处理
     *
     * @description
     * 一些ObserverObject的子类的选择允许被Store的选择覆盖
     *
     * 比如ComputedObject的enable属性，可以通过Store的enableComputed属性来覆盖
     *
     */
    protected onInitOptions(_options: Required<Options>) {}

    /**
     * 更新计算对象的结果值
     *
     * @description
     *
     * - 标量值
     *  update(1)
     * - 对象值
     *  update({value:1})
     *
     */
    update(value: Value, options?: UpdateOptions) {
        this.store.update(() => {
            this.value = value;
        }, options);
    }
    /**
     * 更新计算属性的值，并且不会触发依赖的变化事件
     *
     *
     *
     * @param value
     * @param {boolean} silent - 是否静默更新，即不会触发依赖变化事件
     */
    silentUpdate(value: Value) {
        this.update(value, { silent: true });
    }

    /**
     * 订阅当前计算对象值变化的事件
     * @description
     * 
     * 当计算结果值发生变化时触发
     * 
     
     * 
     * 
     * @example
     * 
     * const computedObj = store.computedObject.get("xxx")
     * computedObj.watch((value)=>{
     *      
     * })
     * 
     * 
     * 
     * @param options 
     * @param  {boolean}  options.expand - 是否扩展侦听范围到子对象，当value是一个object时使用
     * 
     * 当Observer对象的值是一个对象时，如异步计算对象value={value,loading,timeout,....}     
     * 则.watch((val)=>{....})这里正常返回的应该是value.value
     * 如果需要侦听value对象的所有属性变化，则需要设置expand=true,此时侦听的就是`path.*`的变化
     * 由于changesets支持通配符，所以就可以侦听到所成员属性的变化
     * 
     * @returns 
     */
    watch(listener: WatchListener, options?: WatchListenerOptions) {
        const watcher = this.store.watch(
            this.getValueWatchPath(),
            (operate) => {
                listener.call(this, operate);
            },
            options,
        );
        this._subscribers.push(watcher);
        return watcher;
    }
    /**
     * 供子类重写，用来获取当前对象值的依赖路径
     * @returns
     */
    protected getValueWatchPath(): string | (string | string[])[] {
        return this.path!.join(this.store.options.delimiter);
    }

    protected emitStoreEvent(event: keyof AutoStoreEvents, args: any) {
        setTimeout(() => {
            this.store.emit(event, args);
        }, 0);
    }
    /**
     * 获取当前对象的依赖路径
     *
     * 本方法供子类重写，用来对依赖进行规范
     *
     * @returns
     */
    protected getDepends() {
        return this.depends!;
    }
    /**
     * 当依赖变化时调用
     * @param _
     */
    protected onDependsChange(_: StateOperate) {}
    /**
     *
     */
    attach() {
        if (!this._attached && this.depends && this.depends.length > 0) {
            // 监听依赖变化
            this._subscribers.push(
                this.store.watch(this.getDepends(), this.onDependsChange.bind(this), {
                    operates: "write",
                }),
            );
            this.store.logger.debug(
                () =>
                    `${this.toString()} subscribed to ${this.depends!.map((depends) =>
                        depends.join(this.store.options.delimiter),
                    ).join(",")}`,
            );
            this._attached = true;
        }
    }
    detach() {
        if (!this._attached) return;
        this._subscribers.forEach((subscriber) => {
            subscriber.off();
        });
        // this._refStateCtx?.off();
        this._attached = false;
        this._subscribers = [];
        this.store.watchObjects.delete(this.id);
    }
    /**
     * 销毁当前观察对象：解除依赖订阅、从所属集合移除并触发生命周期事件。
     *
     * - 自动销毁（依赖/自身路径被删除）、手动 destroy()、集合 delete(id) 均走此路径。
     * - 幂等：重复调用安全。
     * - 触发 observer:destroyed 事件（onObserverDestroyed 通过该事件感知，绑定于 subscribeCallbacks）。
     */
    destroy() {
        if (this._destroyed) return;
        this._destroyed = true;
        this.onDestroy(); // 1. 子类清理（如异步计算取消 inflight）
        this.detach(); // 2. 解除依赖订阅
        // 3. 从两个集合移除：用原生 Map.delete，避免与集合 delete（已路由到 destroy）互相递归
        Map.prototype.delete.call(this.store.computedObjects, this.id);
        Map.prototype.delete.call(this.store.watchObjects, this.id);
        emitStoreEvent(this.store, "observer:destroyed", this);
    }
    /**
     * 供子类重写，在销毁时执行清理（如取消 inflight 请求）
     */
    protected onDestroy() {}

    get shadowStore() {
        if (!this._shadowStore) {
            this._shadowStore = isFunction(this.store.options.getShadowStore)
                ? this.store.options.getShadowStore() || this.store
                : this.store;
        }
        return this._shadowStore;
    }
    /**
     * 供子类重写
     *
     */ //  eslint-disable-next-line @typescript-eslint/no-unused-vars
    run(..._args: any[]): any {}
    /**
     * 当执行store.reset时调用
     */
    reset() {}
}
