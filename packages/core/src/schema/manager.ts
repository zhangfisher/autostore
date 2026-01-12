import { PATH_DELIMITER } from '../consts';
import { AutoStore } from '../store/store';
import { isSchemaBuilder, markRaw, setVal } from '../utils';
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
 *
 *
 *
 */

export class ConfigManager extends AutoStore<AutoStoreConfigures> {
    get fields() {
        return this.state;
    }
    get size() {
        return Object.keys(this.fields).length;
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

        if (!descriptor.options.validationBehavior)
            descriptor.options.validationBehavior = 'throw-pass';

        const finalDescriptor = Object.assign({}, descriptor.options, {
            datatype: descriptor.datatype,
            value: descriptor.value,
        });
        // 创建代理用于从原始的Store值读写状态值
        this._createValueProxy(finalDescriptor, store, pathKey);
        // 添加到配置中
        this.update(
            (state) => {
                setVal(state, [configKey.join(PATH_DELIMITER)], finalDescriptor);
            },
            {
                silent: true, // 初始配置时静默更新
            },
        );
        return; 
    }
    private _createValueProxy(finalDescriptor: object, store: AutoStore<any>, path: string[]) {
        return Object.defineProperty(finalDescriptor, 'value', {
            get() {
                return getVal(store.state, path);
            },
            set(value) {
                store.update((state: any) => {
                    setVal(state, path, value);
                });
            },
        });
    }
}
