import { PATH_DELIMITER, GLOBAL_CONFIG_MANAGER } from '../consts';
import { AutoStore } from '../store/store';
import { isSchemaBuilder, setVal, withSchema } from '../utils';
import { getVal } from '../utils/getVal';
import type { SchemaDescriptor, SchemaDescriptorBuilder, AutoStoreConfigures } from './types';
import { isFunction } from '../utils/isFunction';
import type { AutoStoreOptions } from '../store/types';
import type { Dict } from '../types';

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
}
export type ConfigManagerOptions<State extends Dict> = AutoStoreOptions<State> & {
    global?: string | boolean;
};
export class ConfigManager extends AutoStore<
    AutoStoreConfigures,
    ConfigManagerOptions<AutoStoreConfigures>
> {
    dirtyValues: Record<string, any> = {};
    private _reseting: boolean = false;
    constructor(public source: ConfigSource, options?: ConfigManagerOptions<AutoStoreConfigures>) {
        const finalOptions = Object.assign(
            {
                global: false,
            },
            options,
        ) as any;
        super({}, finalOptions);

        // 处理 global 选项，将实例挂载到 globalThis
        if (finalOptions.global !== false) {
            const globalKey =
                finalOptions.global === true ? GLOBAL_CONFIG_MANAGER : finalOptions.global;
            // @ts-expect-error - 动态设置 globalThis 属性
            globalThis[globalKey] = this;
        }
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
        this.update(
            (state) => {
                Object.entries(values).forEach(([key, value]) => {
                    // 直接使用扁平键访问 schema
                    const schema = state[key];
                    if (schema) {
                        // schema 存在，通过 setter 更新原始 Store
                        schema.value = value;
                    } else {
                        // schema 不存在，创建新的 schema 对象
                        state[key] = { value };
                    }
                });
            },
            {
                silent: true,
            },
        );
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
        return Object.entries(this.state).reduce((acc, [key, schema]) => {
            acc[key] = (schema as any).value;
            return acc;
        }, {} as Record<string, any>);
    }
    /**
     * 恢复默认值
     */
    reset() {
        if (this._reseting) return;
        try {
            this._reseting = true;
            this.dirtyValues = {};
            // 将状态值恢复为默认值
            // this.state 中的每个值是一个 SchemaDescriptor，包含 value 和 schema 属性
            Object.values(this.state).forEach((descriptor: any) => {
                // 此操作会导致写入时的校验操作，
                try {
                    // 使用 withSchema 包裹默认值，实现静默更新
                    // 避免触发校验、事件通知、onUpdate 和 save
                    const defaultValue = descriptor.schema.default;
                    if (defaultValue !== undefined) {
                        descriptor.value = withSchema(defaultValue, {
                            slient: true,
                            validate: 'none',
                        });
                    }
                } catch {
                    // 忽略校验错误
                }
            });
        } finally {
            this._reseting = false;
        }
    }
    /**
     * 此方法由Store实例在写入状态值时调用
     * @param store
     * @param path
     * @param value
     */
    onUpdate(_store: AutoStore<any>, configKey: string, value: any) {
        this.dirtyValues[configKey] = value;
        this.source.save?.(this.dirtyValues);
        // 保存后清空 dirtyValues，避免重复保存
        this.dirtyValues = {};
    }
    add(
        store: AutoStore<any>,
        path: string | string[],
        schema: SchemaDescriptorBuilder | SchemaDescriptor,
    ) {
        this.operates.options.delimiter = store.options.delimiter;

        const descriptor: SchemaDescriptor = isSchemaBuilder(schema) ? schema() : schema;

        const pathKey = Array.isArray(path) ? path : path.split(store.options.delimiter);
        const strPath = pathKey.join(store.options.delimiter);
        // 创建配置键路径（需要复制数组，避免修改原数组）
        const configKey = [...pathKey];
        if (store.options.configKey) configKey.splice(0, 0, store.options.configKey);

        // 保存初始值，用于返回
        const initialValue = descriptor.value;
        if (descriptor.schema.default === undefined) {
            descriptor.schema.default = initialValue;
        }
        // defaultSchema 只作为默认值，不会覆盖 descriptor.schema 中已有的属性
        if (store.options.defaultSchema) {
            Object.keys(store.options.defaultSchema).forEach((key) => {
                const defaultValue = (store.options.defaultSchema as any)[key];
                const currentValue = (descriptor.schema as any)[key];
                // 只有当当前值未定义时，才使用 defaultSchema 的值
                if (currentValue === undefined) {
                    (descriptor.schema as any)[key] = defaultValue;
                }
            });
        }

        // 如果没有设置 onInvalid，则使用默认值 'throw'
        if ((descriptor.schema as any).onInvalid === undefined) {
            (descriptor.schema as any).onInvalid = 'throw';
        }
        if (isFunction(descriptor.schema.onValidate)) {
            // 将getErrorMessage 方法和validationBehavior添加到验证函数上，用于在isValidPass中使用
            // @ts-expect-error
            descriptor.schema.onValidate.getErrorMessage = (error: Error) => {
                const message = descriptor.schema.invalidTips;
                if (typeof message === 'string') {
                    return message
                        .params(descriptor.schema)
                        .params({ error: error.message, stack: error.stack });
                }
                return error.message;
            };
            // 获取 validationBehavior，用于指定校验失败时的默认行为
            const onInvalid = descriptor.schema.onInvalid;
            // 只有当 onInvalid 显式指定时才设置它
            if (onInvalid !== undefined) {
                (descriptor.schema.onValidate as any).onInvalid = onInvalid;
            }
            // 注册验证函数，用于写入状态值时调用进行验证
            if (!store.options.validators) {
                store.options.validators = {};
            }
            store.options.validators[strPath] = descriptor.schema.onValidate;
        } else {
            if (store.options.validators) {
                delete store.options.validators[strPath];
            }
        }

        // 创建代理用于从原始的Store值读写状态值
        this._createValueProxy(descriptor, store, pathKey);
        // 添加到配置中
        this.update(
            (state) => {
                setVal(state, [configKey.join(PATH_DELIMITER)], descriptor);
            },
            {
                silent: true,
            },
        );
        // 返回初始值，避免读取代理导致循环依赖
        return initialValue;
    }
    private _createValueProxy(finalDescriptor: object, store: AutoStore<any>, path: string[]) {
        // 由于ConfigManager是全局对象，而Store可能是动态 // 弱引用Store对象
        const storeRef = new WeakRef(store);
        return Object.defineProperty(finalDescriptor, 'value', {
            get() {
                const store = storeRef.deref();
                if (store) return getVal(store.state, path);
            },
            set(value) {
                const store = storeRef.deref();
                store?.update((state: any) => {
                    setVal(state, path, value);
                });
            },
        });
    }
    getConfigValue(path: string[]) {
        return this.peep((state) => {
            return getVal(state, [...path, 'value']);
        });
    }
}
