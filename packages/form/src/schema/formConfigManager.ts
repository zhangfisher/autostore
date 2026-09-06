/**
 * AutoForm 专用 ConfigManager
 *
 * 为什么需要子类化：
 * core 的 markRawSchema 只豁免 validate 及 on、to、render 前缀的函数，
 * 而 enable/visible/choices 等联动函数会作为普通函数存入 ConfigManager.state。
 * ConfigManager 本身是 AutoStore，其响应式 get 陷阱会把这批函数创建为
 * 计算属性（scope 默认指向自身扁平键 state，state.form 为 undefined），
 * 首次读取即将函数原位替换为一次性的计算结果，字段联动由此失效。
 *
 * 修复策略：在 add() 落库前对 options 中除豁免名单（与 core
 * Computedable/markRawSchema 保持同一套规则）外的函数 markRaw，
 * 使 ConfigManager 的响应式层跳过它们，函数形态保留下来，
 * 由 AutoField 在主 store 上自行求值（见 field/index.ts 的动态属性求值）。
 */
import {
    ConfigManager,
    markRaw,
    isSchemaDescriptorBuilder,
    type SchemaDescriptor,
    type SchemaDescriptorBuilder,
} from "autostore";

/**
 * 与 core Computedable 类型规则一致的函数豁免名单：
 * - validate 及 on、to、render 前缀的属性：业务回调，语义上不是联动函数
 * - name/id/key/value/path/datatype：系统保留键
 */
const RAW_EXEMPT_KEY = /^(validate|on.+|to.+|render.+)$/;
const SYSTEM_KEYS = new Set(["name", "id", "key", "value", "path", "datatype"]);

function markDynamicFnsRaw(target: any, depth = 0) {
    // schema options 为扁平结构，两层足够；更深层的对象属 widget 自定义配置，
    // 其中的函数（如 renderItem）同样不应被响应式消费
    if (target === null || typeof target !== "object" || depth > 2) return;
    for (const key of Object.keys(target)) {
        const value = target[key];
        if (typeof value === "function" && !RAW_EXEMPT_KEY.test(key) && !SYSTEM_KEYS.has(key)) {
            // markRaw 直接在函数对象上打 SKIP_PROXY_FLAG，幂等安全
            markRaw(value);
        } else {
            markDynamicFnsRaw(value, depth + 1);
        }
    }
}

export class FormConfigManager extends ConfigManager {
    add(
        store: any,
        path: string | string[],
        schema: SchemaDescriptorBuilder | SchemaDescriptor,
    ): any {
        const descriptor = isSchemaDescriptorBuilder(schema) ? schema() : schema;
        markDynamicFnsRaw(descriptor.options);
        return super.add(store, path, descriptor);
    }
}
