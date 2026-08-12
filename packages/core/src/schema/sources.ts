import { ConfigSource } from ".";

/**
 * 本地内存配置源
 *
 * 将所有配置项以扁平 Record 形式保存在内存中，符合 ConfigSource 契约：
 * - load(): 一次性返回全部配置项
 * - save(values): 一次性接收全部配置项并覆盖
 * - reset(): 清空所有配置项
 *
 * 使用闭包持有内部存储 `_data`，避免将其暴露到 ConfigSource 类型上。
 */
export const localConfigSource: ConfigSource = (() => {
    let _data: Record<string, any> = {};
    return {
        load() {
            return _data;
        },
        save(values: Record<string, any>) {
            _data = values;
        },
        reset() {
            _data = {};
        },
    };
})();
