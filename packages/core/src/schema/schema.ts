/**
 * import { v } from "autostore"
 *
 * const store = new AutoStore({
 *    price: v.number(100,(val)=>val>0 && val<100,{
 *        title:'价格',
 *        tips:'价格必须大于0小于100',
 *        errorTips:'价格必须大于0小于100',
 *
 *    })
 *    count: v.number(100,(val)=>val>0,'价格')
 *
 *    })
 * })
 *
 * store.validators
 *
 * const priceValidator = store.validators.add("order.price",)
 *
 * priceValidator.title
 *
 *
 *
 * (store.state.price)
 *
 */

import { OBSERVER_TYPE_FLAG } from "../consts";
import { forEachObject, isFunction, isPlainObject } from "../utils";
import { markRaw } from "../utils/markRaw";

import type {
    AutoStateSchemaBase,
    AutoStoreStateSchema,
    AutoStoreWidgets,
    Computedable,
    ComputedableStateSchema,
    SchemaBuilderFactory,
    SchemaDescriptorBuilder,
    WidgetConfigPrecise,
} from "./types";

type SchemaArgs = {
    getter: any;
    options: AutoStoreStateSchema;
};

/**
 * 将options里面的on和render开头的函数标识为raw
 * @param schema
 */
function markRawSchema(schema: any) {
    if (isPlainObject(schema)) {
        forEachObject(schema, ({ value, key, parent }) => {
            if (
                isFunction(value) &&
                (key === "validate" ||
                    key.startsWith("on") ||
                    key.startsWith("render") ||
                    key.startsWith("to"))
            ) {
                // @ts-expect-error
                parent[key] = markRaw(value);
            }
        });
    }
}

/**
 * 解析 schema 参数
 *
 * @param args 参数数组，可能包含值、验证函数和选项对象
 * @returns 包含解析后参数的对象，结构为 { value, options? }
 *
 * 参数解析规则：
 */
function parseSchemaArgs(args: any[]): SchemaArgs {
    const finalArgs: any = {
        getter: args[0],
        options: Object.assign(
            {
                onInvalid: undefined, // 不在这里设置默认值，而是在 ConfigManager.add 中设置
            },
            args[1],
        ),
    };
    markRawSchema(finalArgs.options);
    return finalArgs as SchemaArgs;
}

// 函数重载:提供更好的类型推断，支持 Widget 泛型参数推断
// 将包含 widget 的重载放在前面，确保 TypeScript 优先匹配更具体的类型
export function schema<Value>(initial: Value): SchemaDescriptorBuilder<Value>;
export function schema<Value, W extends keyof AutoStoreWidgets>(
    initial: Value,
    schema: Omit<Computedable<AutoStateSchemaBase<Value>, Value>, "value" | "widget"> & {
        widget: W;
    } & WidgetConfigPrecise<W>,
): SchemaDescriptorBuilder<Value, W>;
// 不包含 widget 的配置，或者 widget 不匹配已知类型时的回退重载
export function schema<Value>(
    initial: Value,
    schema: Omit<ComputedableStateSchema<Value>, "value" | "widget"> & { widget?: string },
): SchemaDescriptorBuilder<Value>;
export function schema<Value>(
    initial: Value,
    schema?: Omit<ComputedableStateSchema<Value>, "value" | "widget"> & { widget?: string },
): any {
    const args = parseSchemaArgs([initial, schema]);
    const value = initial;
    if (typeof value === "object") {
        markRaw(value);
    }
    args.options.datatype = Array.isArray(value) ? "array" : typeof value;
    if (!args.options.errorMessage) {
        args.options.errorMessage = "{error}";
    }
    const builder = () => ({
        type: "schema",
        getter: () => value,
        options: args.options,
    });
    builder[OBSERVER_TYPE_FLAG] = "schema";
    return builder as any;
}

export const configurable = schema;

export function createTypeSchemaBuilder<Value = any>(
    isValid: (val: any) => boolean,
    defaultTips: string,
): SchemaBuilderFactory<Value> {
    const typeSchema = function (initial: Value, options?: any) {
        const opts = Object.assign({}, options);
        if (typeof opts.validate !== "function") {
            opts.validate = isValid;
        }
        if (!opts.invalidTips) {
            opts.invalidTips = defaultTips;
        }
        return schema(initial, opts);
    };
    return typeSchema as unknown as SchemaBuilderFactory<Value>;
}

export const schemas = {
    number: createTypeSchemaBuilder<number>((val) => typeof val === "number", "must be a number"),
    string: createTypeSchemaBuilder<string>((val) => typeof val === "string", "must be a string"),
    boolean: createTypeSchemaBuilder<boolean>(
        (val) => typeof val === "boolean",
        "must be a boolean",
    ),
    date: createTypeSchemaBuilder<Date>((val) => val instanceof Date, "must be a date"),
    bigint: createTypeSchemaBuilder<bigint>((val) => typeof val === "bigint", "must be a bigint"),
    array: createTypeSchemaBuilder<any[]>((val) => Array.isArray(val), "must be an array"),
    object: createTypeSchemaBuilder<object>((val) => typeof val === "object", "must be an object"),
};

export const s = schemas;
