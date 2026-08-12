import { PATH_DELIMITER, GLOBAL_CONFIG_MANAGER } from "../consts";
import { AutoStore } from "../store/store";
import { isRaw, isSchemaDescriptorBuilder, markRaw, setVal, withSchema } from "../utils";
import { getVal } from "../utils/getVal";
import type { SchemaDescriptor, SchemaDescriptorBuilder, AutoStoreConfigures } from "./types";
import { isFunction } from "../utils/isFunction";
import type { AutoStoreOptions } from "../store/types";
import type { Dict } from "../types";
import { joinPath } from "../utils/joinPath";

/**
 *
 * 配置管理器
 *
 *  {
 *     '<Sotre.options.configKey>.<配置项所在路径>':StateSchema
 *     'order.price':StateSchema
 *     'user.name':StateSchema
 * }
 * const config = new ConfigManager({
 *      load(path:string[]){
 *          return {}
 *      }
 *      save(path:string[],value:any){
 *      }
 * })
 * - 加载所有配置
 * await config.load()
 *
 *
 */
export interface ConfigSource {
    load: () => Record<string, any> | Promise<Record<string, any>>;
    /**
     * 每一个配置项变更时均会调用
     * @param values
     * @returns
     */
    save?: (values: Record<string, any>) => void | Promise<void>;
    /**
     * 重载配置时调用
     * 可以在此将外部存储中的配置恢复
     * @returns
     */
    reset?: () => void;
}
export type ConfigManagerOptions<State extends Dict> = AutoStoreOptions<State> & {
    global?: string | boolean;
    autoload?: boolean;
    autosave?: boolean;
};
export class ConfigManager extends AutoStore<
    AutoStoreConfigures,
    ConfigManagerOptions<AutoStoreConfigures>
> {
    dirtyValues: Record<string, any> = {};
    private _reseting: boolean = false;
    /**
     * load 进行中计数器（支持并发 load）
     * load 主动写入配置值期间 >0，此时 onUpdate 应抑制 save，
     * 避免刚从外部存储加载的值又立即触发 save（load↔save 循环）。
     * 仅当本次 load 实际写入了已注册 schema 时才持有计数并 await 一个宏任务，
     * 否则（如构造期 autoload 且 store 尚未创建）立即释放，避免误抑制并发的用户修改。
     */
    private _loadingCount: number = 0;
    constructor(
        public source: ConfigSource,
        options?: ConfigManagerOptions<AutoStoreConfigures>,
    ) {
        const finalOptions = Object.assign(
            {
                global: true,
                configManager: false,
                autoload: true,
                autosave: true,
                scope: "ROOT",
            },
            options,
        ) as any;
        super({} as any, finalOptions);

        // 处理 global 选项，将实例挂载到 globalThis
        if (finalOptions.global !== false) {
            const globalKey =
                finalOptions.global === true ? GLOBAL_CONFIG_MANAGER : finalOptions.global;
            // @ts-expect-error - 动态设置 globalThis 属性
            if (globalThis[globalKey] === undefined) {
                // @ts-expect-error - 动态设置 globalThis 属性
                globalThis[globalKey] = this;
            }
            if (finalOptions.autoload) this.load().catch(() => {});
            // @ts-expect-error - 动态设置 globalThis 属性
            globalThis[globalKey] = this;
            return this;
        }
        if (finalOptions.autoload) this.load().catch(() => {});
    }
    get fields() {
        return this.state;
    }
    get size() {
        return Object.keys(this.fields).length;
    }
    /**
     * 加载数据到当前实例
     * @param {Record<string, any>} data - 要加载的数据对象，键值对形式
     */
    async load() {
        const values = await this.source.load();
        this._loadingCount++;
        let hasSchemaWrite = false;
        try {
            this.update(
                (state) => {
                    Object.entries(values).forEach(([key, value]) => {
                        // 直接使用扁平键访问 schema
                        // @ts-ignore
                        const schema = state[key];
                        if (schema) {
                            // schema 存在，通过 value 的 setter 写入原始 Store
                            // 注意：必须走 schema.value（由 _createValueProxy 定义的代理），
                            // 才能把值真正写入原始 Store 的对应路径。此前误用 schema.getter
                            // 赋值，而 getter 不参与值读取链路，导致 load 静默失效。
                            // @ts-ignore
                            schema.value = value;
                            hasSchemaWrite = true;
                        } else {
                            // schema 不存在，创建新的 schema 对象
                            // @ts-ignore
                            state[key] = { value };
                        }
                    });
                },
                {
                    silent: true,
                },
            );
            // 原始 Store 的 set 陷阱通过 setTimeout(0) 异步回调 onUpdate。
            // 仅当本次实际写入了已注册 schema 时，才等待一个宏任务周期，
            // 确保派发的 onUpdate 在 _loadingCount>0 时执行完毕（被 onUpdate 抑制 save）。
            // 构造期 autoload 等无 schema 写入的场景则跳过等待，避免其生命周期跨越
            // 不相关的用户修改而误抑制 save。
            if (hasSchemaWrite) {
                await new Promise<void>((resolve) => setTimeout(resolve, 0));
            }
        } finally {
            this._loadingCount--;
            // 加载的值与外部存储一致，不应残留为脏数据触发后续 save
            this.dirtyValues = {};
        }
    }
    /**
     * 手工调用保存配置数据到数据源
     * @param all 保存所有配置数据,false=只保存变更的数据
     */
    async save(all?: boolean) {
        const values = all ? this._getValues() : this.dirtyValues;
        if (Object.keys(values).length > 0) {
            await this.source.save?.(values);
            this.dirtyValues = {};
        }
    }

    private _getValues() {
        return Object.entries(this.state).reduce(
            (acc, [key, schema]) => {
                acc[key] = (schema as any).value;
                return acc;
            },
            {} as Record<string, any>,
        );
    }
    /**
     * 恢复默认值
     */
    async reset() {
        if (this._reseting) return;
        this._reseting = true;
        try {
            this.dirtyValues = {};
            // 将状态值恢复为默认值
            // this.state 中的每个值是一个 SchemaDescriptor，包含 value 和 schema 属性
            Object.values(this.state).forEach((schema: any) => {
                try {
                    const defaultValue = schema.default;
                    if (defaultValue !== undefined) {
                        // 通过 value 的 setter 写回默认值，实现静默更新
                        // 注意：必须走 schema.value（由 _createValueProxy 定义的代理），
                        // 此前误用 schema.getter 赋值导致 reset 静默失效。
                        // withSchema + slient 避免触发校验报错与事件通知；
                        // _reseting 标志抑制 onUpdate 的 save（见 onUpdate）。
                        schema.value = withSchema(markRaw(defaultValue), {
                            slient: true,
                            onInvalid: "none",
                        });
                    }
                } catch {
                    // 忽略校验错误
                }
            });
            // 等待 set 陷阱派发的 onUpdate 在 _reseting=true 时执行完毕
            await new Promise<void>((resolve) => setTimeout(resolve, 0));
        } finally {
            if (typeof this.source.reset === "function") {
                this.source.reset.call(this);
            }
            this._reseting = false;
            this.dirtyValues = {};
        }
    }
    /**
     * 此方法由Store实例在更新状态值时调用
     * @param store
     * @param path
     * @param value
     */
    onUpdate(_store: AutoStore<any>, configKey: string, value: any) {
        // load/reset 期间由其主动写入，此时值来自外部存储或默认值，无需再 save 或记录脏数据
        if (this._loadingCount > 0 || this._reseting) return;
        try {
            this.dirtyValues[configKey] = value;
            if (this.options.autosave) {
                Promise.resolve(this.source.save?.(this.dirtyValues)).then(() => {
                    this.dirtyValues = {};
                });
            }
        } finally {
            this._notify({
                type: "set",
                path: [configKey, "value"],
                value,
            });
        }
    }
    /**
     * 注销由指定 store 注册的全部配置项
     * 由 store.destroy() 调用：由于 schema.value 通过闭包强引用 store，
     * 这里需要主动从 state 中删除对应 schema，才能打破引用、允许 store 被 GC。
     */
    remove(store: AutoStore<any>) {
        const delimiter = store.options.delimiter;
        store.configurabled.forEach((strPath) => {
            const pathKey = strPath.split(delimiter);
            const configKey = [...pathKey];
            if (store.options.configKey) configKey.splice(0, 0, store.options.configKey);
            const fullKey = configKey.join(PATH_DELIMITER);
            // @ts-ignore - 动态删除 state 中的 schema
            delete this.state[fullKey];
            // 清理可能残留的脏数据
            delete this.dirtyValues[fullKey];
        });
    }
    add(
        store: AutoStore<any>,
        path: string | string[],
        schema: SchemaDescriptorBuilder | SchemaDescriptor,
    ) {
        this.operates.options.delimiter = store.options.delimiter;

        const descriptor: SchemaDescriptor = isSchemaDescriptorBuilder(schema) ? schema() : schema;

        const pathKey = Array.isArray(path) ? path : path.split(".");
        const strPath = pathKey.join(store.options.delimiter);
        // 创建配置键路径（需要复制数组，避免修改原数组）
        const configKey = [...pathKey];
        if (store.options.configKey) configKey.splice(0, 0, store.options.configKey);

        // 保存初始值，用于返回
        const initialValue = descriptor.getter();
        if (descriptor.options.default === undefined) {
            descriptor.options.default = initialValue;
        }
        descriptor.options.value = initialValue;

        // defaultSchema 只作为默认值，不会覆盖 descriptor.schema 中已有的属性
        if (store.options.defaultSchema) {
            Object.keys(store.options.defaultSchema).forEach((key) => {
                const defaultValue = (store.options.defaultSchema as any)[key];
                const currentValue = (descriptor.options as any)[key];
                // 只有当当前值未定义时，才使用 defaultSchema 的值
                if (currentValue === undefined) {
                    (descriptor.options as any)[key] = defaultValue;
                }
            });
        }

        // 如果没有设置 onInvalid，则使用默认值 'throw'
        if ((descriptor.options as any).onInvalid === undefined) {
            (descriptor.options as any).onInvalid = "throw";
        }
        // 安装校验器
        this._installValidator(strPath, descriptor, store);
        // 由于该配置项可能已先load还未注册，因此需要覆盖现有的值
        const loadedValue = this.peep((state) =>
            getVal(state, [configKey.join(PATH_DELIMITER), "value"]),
        );
        // 用于为schema中的observerObject提供refStore，以便能访问
        this._handleRefState(descriptor.options, store);
        // 动态添加
        // @ts-ignore
        this.state[joinPath(configKey)] = descriptor.options;
        if (loadedValue !== undefined) {
            descriptor.options.value = loadedValue;
        }
        // 创建代理用于从原始的Store值读写状态值
        this._createValueProxy(descriptor, store, pathKey);

        // 返回初始值，避免读取代理导致循环依赖
        return loadedValue || initialValue;
    }

    private _handleRefState(schema: object, store: AutoStore<any>) {
        Object.values(schema).forEach((v) => {
            if (isFunction(v) && !isRaw(v)) {
                v._getRefStore = () => new WeakRef(store);
            }
        });
    }
    private _installValidator(path: string, descriptor: SchemaDescriptor, store: AutoStore<any>) {
        if (isFunction(descriptor.options.validate)) {
            // 错误信息模板
            const template = descriptor.options.errorMessage;
            // 将getErrorMessage 方法和validationBehavior添加到验证函数上，用于在isValidPass中使用
            // @ts-expect-error
            descriptor.options.validate.getErrorMessage = (error: Error) => {
                if (typeof template === "string") {
                    // 合并所有变量到同一个对象中，一次性完成插值
                    return template.params({
                        ...descriptor.options,
                        error: error.message,
                        errorStack: error.stack,
                        path,
                    });
                }
                return error.message;
            };
            // 获取 validationBehavior，用于指定校验失败时的默认行为
            const onInvalid = descriptor.options.onInvalid;
            // 只有当 onInvalid 显式指定时才设置它
            if (onInvalid !== undefined) {
                (descriptor.options.validate as any).onInvalid = onInvalid;
            }
            // 注册验证函数，用于写入状态值时调用进行验证
            if (!store.options.validators) {
                store.options.validators = {};
            }
            store.options.validators[path] = descriptor.options.validate;
        } else {
            if (store.options.validators) {
                delete store.options.validators[path];
            }
        }
    }
    private _createValueProxy(
        finalDescriptor: SchemaDescriptor,
        store: AutoStore<any>,
        path: string[],
    ) {
        // oxlint-disable-next-line typescript/no-this-alias
        const self = this;

        // 注意：这里必须使用强引用（闭包持有 store），不能用 WeakRef。
        // ConfigManager 作为全局对象生命周期较长，而配置项的 value 读写必须可靠。
        // 此前使用 WeakRef，但在 async/await 场景下，创建 store 的局部变量可能被
        // JS 引擎提前 GC（即使它在逻辑上仍被使用），导致 storeRef.deref() 返回 undefined，
        // 进而使 schema.value 的 getter/setter 静默失效（save/getConfigValue 返回 undefined）。
        // 只要配置项注册在 ConfigManager 中，就应保证 store 可达；store.destroy() 时
        // 会通过 remove() 注销配置项以打破引用、允许 GC。
        return Object.defineProperty(
            finalDescriptor.options,
            "value",
            markRaw({
                get() {
                    const value = getVal(store.state, path);
                    self._notify({
                        type: "get",
                        path: [...path, "value"],
                        value,
                    });
                    return value;
                },
                set(value) {
                    store.update((state: any) => {
                        setVal(state, path, value);
                    });
                    self._notify({
                        type: "set",
                        path: [...path, "value"],
                        value,
                    });
                },
            }),
        );
    }
    getConfigValue(path: string[]) {
        return this.peep((state) => {
            return getVal(state, [...path, "value"]);
        });
    }
}

declare global {
    var AutoStoreConfigManager: ConfigManager;
}
