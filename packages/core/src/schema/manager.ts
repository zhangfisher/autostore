import { PATH_DELIMITER } from '../consts';
import { AutoStore } from '../store/store';
import { isSchemaBuilder, setVal } from '../utils';
import { getVal } from '../utils/getVal';
import type { SchemaDescriptor, SchemaDescriptorBuilder, AutoStoreConfigures } from './types';

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
    save?: (values: Record<string, any>) => void | Promise<void>;
}

export class ConfigManager extends AutoStore<AutoStoreConfigures> {
    constructor(public source: ConfigSource) {
        super({});
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
        Object.entries(values).forEach(([key, value]) => {
            const path = key.split('.');
            this.update(
                (state) => {
                    const schema = getVal(state, path);
                    if (!schema) {
                        schema.value = value;
                    } else {
                        setVal(state, path, { value });
                    }
                },
                {
                    silent: true,
                },
            );
        });
    }

    async save() {
        const values = Object.entries(this.state).reduce((acc, [key, schema]) => {
            acc[key] = schema.value;
            return acc;
        }, {} as Record<string, any>);
        await this.source.save?.(values);
    }

    add(
        store: AutoStore<any>,
        path: string | string[],
        schema: SchemaDescriptorBuilder | SchemaDescriptor,
    ) {
        const descriptor = isSchemaBuilder(schema) ? schema() : schema;

        const pathKey = Array.isArray(path) ? path : path.split(store.options.delimiter);
        // 创建配置键路径
        const configKey = pathKey;
        if (store.options.configKey) configKey.splice(0, 0, store.options.configKey);

        descriptor.value = this.getConfigValue(configKey) ?? descriptor.value;

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
        return descriptor.value;
    }
    private _createValueProxy(finalDescriptor: object, store: AutoStore<any>, path: string[]) {
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
