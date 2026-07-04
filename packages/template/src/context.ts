import { AutoStore } from "autostore";
import type { AutoStoreOptions, Dict } from "autostore";

/**
 * 模板渲染上下文聚合视图的类型。
 *
 * 除聚合后的数据键外，还包含两个特殊的只读成员：
 *
 * - `$context`：原始作用域栈引用，便于调用方直接操作栈
 *   （例如 `x-for` 写入新作用域）。
 * - `$store`：内部创建的 AutoStore 实例，便于指令/外部调用其 API
 *   （如 `watch`、`state` 等）。
 *
 * 两者均为只读、不可枚举的元属性，不污染 `Object.keys` / `for...in` /
 * 扩展运算符等数据遍历。`$context` / `$store` 是框架保留键，调用方应避免
 * 在作用域对象中使用同名字段。
 */
export type AutoTemplateContext<State extends Dict> = Record<string, any> & {
    /**
     * 原始作用域栈引用（只读、不可枚举的元属性）。
     * 不参与 `Object.keys` / `for...in` / 扩展运算符等数据遍历。
     */
    readonly $context: Record<string, any>[];
    /**
     * AutoStore 实例引用（只读、不可枚举的元属性）。
     * 供指令/外部读取使用 store 的 watch/state 等 API。
     */
    readonly $store: AutoStore<State>;
};

/** 元属性保留键 */
const CONTEXT_REF = "$context";
const STORE_REF = "$store";

/**
 * 创建一个**只读**的模板渲染上下文聚合视图。
 *
 * 模板编译期间，`context` 被当作一个"作用域栈"使用：
 * 数组索引从 0 → length-1 代表由外到内的嵌套作用域，索引越大（越靠栈顶）
 * 优先级越高。例如 `x-for` 在编译子模板前会向栈顶压入一个
 * `{ item, index }` 对象，使子元素通过聚合上下文即可访问到这些变量。
 *
 * 本函数内部基于传入的 `state` 创建一个 `AutoStore`，并将其响应式
 * `store.state` 作为根作用域；返回一个只读 Proxy，把整条作用域栈
 * "拍平"成一个普通对象视图：
 *
 * - 读（get）：从栈顶向栈底查找，命中第一个拥有该键的作用域（后层覆盖前层）；
 * - 判定（has）：同方向查找，存在即返回 true；
 * - 枚举（ownKeys / getOwnPropertyDescriptor）：聚合所有作用域的自身可枚举键并去重；
 * - 元属性 `$context` / `$store`：见 `AutoTemplateContext` 类型说明。
 *
 * 返回的代理是只读的：所有数据键的描述符 `writable` 均为 `false`，且不提供
 * `set` / `deleteProperty` 陷阱——严格模式下对**已有数据键**赋值会抛 TypeError，
 * 对全新键赋值或删除操作则转发到代理内部 target（对外不可见，不污染作用域栈）。
 * 需要写入新变量时，应通过 `$context` 拿到原始作用域栈后，直接操作其中的
 * 具体作用域对象。
 *
 * @param state 根作用域初始状态（普通对象），内部用于创建 AutoStore
 * @param options 透传给 AutoStore 的选项
 * @returns 只读的 `AutoTemplateContext` 聚合视图
 */
export function createTemplateContext<State extends Dict>(
    state: State,
    options?: AutoStoreOptions<any>,
): AutoTemplateContext<State> {
    const store = new AutoStore<State>(state, options);
    const context: Record<string, any>[] = [
        {
            $state: store.state,
        },
        store.state,
    ];

    /**
     * 元属性注册表：登记所有只读、不可枚举的元属性键值。
     *
     * 使用 Map 而非普通对象，避免 `in` / `Object.keys` 受原型链方法
     * （如 `toString`）干扰。新增元属性只需在此处登记一行，四个陷阱
     * 即可统一处理（DRY + 开闭原则）。
     */
    const metaProps = new Map<string, any>([
        [CONTEXT_REF, context],
        [STORE_REF, store],
    ]);
    /** 元属性统一的只读描述符模板（value 由调用处补充） */
    const metaDescriptor = (value: any) => ({
        value,
        configurable: true,
        enumerable: false,
        writable: false,
    });

    return new Proxy({} as AutoTemplateContext<State>, {
        get(_target, key) {
            // 元属性：暴露原始引用
            if (typeof key === "string") {
                if (metaProps.has(key)) {
                    return metaProps.get(key);
                }
                if (key === "$state") {
                    return context[0]!.$state;
                }
            }

            // Symbol 键（含 Symbol.iterator / Symbol.toPrimitive 等）一律不参与聚合
            if (typeof key === "symbol") return undefined;

            // 从栈顶向栈底查找，后层覆盖前层
            for (let i = context.length - 1; i >= 0; i--) {
                const scope = context[i];
                if (scope && Object.prototype.hasOwnProperty.call(scope, key)) {
                    return scope[key];
                }
            }
            return undefined;
        },

        has(_target, key) {
            // 元属性总是存在
            if (typeof key === "string" && metaProps.has(key)) return true;
            if (typeof key === "symbol") return false;

            for (let i = context.length - 1; i >= 0; i--) {
                const scope = context[i];
                if (scope && Object.prototype.hasOwnProperty.call(scope, key)) {
                    return true;
                }
            }
            return false;
        },

        ownKeys() {
            // 元属性在前，其后聚合所有作用域的自身可枚举键并去重
            const keys: string[] = [...metaProps.keys()];
            const seen = new Set<string>(keys);

            // （Object.keys 仅返回自身可枚举字符串键，已自动过滤 symbol 与继承键）
            for (let i = context.length - 1; i >= 0; i--) {
                const scope = context[i];
                if (!scope) continue;
                for (const k of Object.keys(scope)) {
                    if (!seen.has(k)) {
                        seen.add(k);
                        keys.push(k);
                    }
                }
            }

            return keys;
        },

        getOwnPropertyDescriptor(_target, key) {
            // 元属性：只读、不可枚举，避免污染数据遍历
            if (typeof key === "string" && metaProps.has(key)) {
                return metaDescriptor(metaProps.get(key));
            }

            if (typeof key === "symbol") return undefined;

            for (let i = context.length - 1; i >= 0; i--) {
                const scope = context[i];
                if (scope && Object.prototype.hasOwnProperty.call(scope, key)) {
                    // 只读视图：writable=false，与 get/ownKeys 聚合结果保持一致
                    return {
                        value: scope[key],
                        configurable: true,
                        enumerable: true,
                        writable: false,
                    };
                }
            }
            return undefined;
        },
    });
}
