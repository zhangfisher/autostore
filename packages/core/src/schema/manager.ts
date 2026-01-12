import { PATH_DELIMITER } from '../consts';
import { AutoStore } from '../store/store';
import { isSchemaBuilder, markRaw, setVal } from '../utils';
import { getVal } from '../utils/getVal';
import { isFuncDefine } from '../utils/isFuncDefine';
import { parseFunc } from '../utils/parseFunc';
import type { SchemaDescriptor, SchemaDescriptorBuilder, AutoStoreConfigures } from './types';

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

        const pathKey = Array.isArray(path) ? path : path.split(PATH_DELIMITER);
        // 创建配置键路径
        const configKey = pathKey;
        if (store.options.configKeyPrefix) configKey.splice(0, 0, store.options.configKeyPrefix);

        if (!descriptor.options.validationBehavior)
            descriptor.options.validationBehavior = 'throw-pass';

        const finalDescriptor = Object.assign({}, descriptor.options, {
            datatype: descriptor.datatype,
            value: descriptor.value,
        });

        Object.entries(finalDescriptor).forEach(([key, value]) => {
            if (isFuncDefine(value)) {
                const func = parseFunc(value);
                if (typeof func === 'function') {
                    if (key.startsWith('on') || key.startsWith('to')) {
                        (finalDescriptor as any)[key] = markRaw(func);
                    } else {
                        (finalDescriptor as any)[key] = func;
                    }
                }
            }
        });
        // 读取原始的Store值
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
