import type {
    AsyncComputedDescriptorBuilder,
    AsyncComputedGetter,
    AsyncComputedValue,
    AsyncLiteComputedDescriptorBuilder,
    ComputedGetter,
    SyncComputedDescriptorBuilder,
} from "../computed";
import type { SchemaDescriptorBuilder } from "../schema";
import type { AutoStore } from "../store";
import type { RawObject } from "../utils";
import type { WatchDescriptorBuilder } from "../watch/types";
import type { Get, Paths, UnionToIntersection } from "type-fest";

/**
 * 将联合类型转换为交叉类型
 *
 * 将多个对象的联合类型合并为一个包含所有属性的对象类型。
 * 这在需要将多个可能的类型合并为一个统一类型时非常有用。
 *
 * @template T - 输入的联合类型
 * @example
 * ```ts
 * type A = { x: number };
 * type B = { y: string };
 * type Result = Union<A | B>; // { x: number; y: string }
 * ```
 */
export type Union<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

/**
 * 可变记录类型 - 用于构建类型安全的联合记录
 *
 * 创建一个基于类型键的联合类型系统，类似于 TypeScript 的 discriminated unions。
 * 常用于构建状态机、动作类型或消息类型系统。
 *
 * @template Items - 各种类别的类型定义集合
 * @template KindKey - 用于区分类型的键名，默认为 "type"
 * @template Share - 所有类型共享的属性
 * @template DefaultKind - 默认类型，该类型的 KindKey 是可选的
 *
 * @example
 * ```ts
 * type Actions = MutableRecord<{
 *   increment: { amount: number };
 *   decrement: { amount: number };
 *   reset: {};
 * }, "type", never, "reset">;
 *
 * // 结果包含：
 * // { type: "increment"; amount: number } |
 * // { type: "decrement"; amount: number } |
 * // { type?: "reset" }  // reset 的 type 是可选的
 * ```
 */
export type MutableRecord<
    Items,
    KindKey extends string = "type",
    Share = unknown,
    DefaultKind extends keyof Items = never,
> =
    | {
          [Kind in keyof Items]: Union<
              {
                  [type in KindKey]: Kind;
              } & Items[Kind] &
                  Share
          >;
      }[Exclude<keyof Items, DefaultKind>]
    | (DefaultKind extends never
          ? never
          : Union<{ [K in KindKey]?: DefaultKind } & Items[DefaultKind] & Share>);

/**
 * 从记录类型中提取所有值的联合类型
 *
 * 将对象的所有值类型合并为一个联合类型，常用于提取可配置项的可能类型。
 *
 * @template T - 输入的记录类型
 * @example
 * ```ts
 * type Config = {
 *   a: { type: "text" };
 *   b: { type: "number" };
 *   c: { type: "boolean" };
 * };
 * type ValueTypes = PickValues<Config>;
 * // { type: "text" } | { type: "number" } | { type: "boolean" }
 * ```
 */
export type PickValues<T extends Record<string, any>> = Union<UnionToIntersection<T[keyof T]>>;

// **************  以下实现将计算属性函数的返回值类型提取出来  **************

/**
 * 提取计算属性的返回值类型
 *
 * 从各种计算属性描述符或函数中提取最终的值类型。支持：
 * - Schema 描述符构建器
 * - 同步计算属性描述符
 * - 异步计算属性描述符（返回 AsyncComputedValue）
 * - Watch 描述符
 * - 普通计算函数（同步和异步）
 *
 * @template T - 计算属性描述符或函数类型
 * @example
 * ```ts
 * // 同步计算
 * type SyncResult = PickComputedResult<(scope: any) => string>; // string
 *
 * // 异步计算
 * type AsyncResult = PickComputedResult<computed<(scope: any) => Promise<number>>>;
 * // AsyncComputedValue<number>
 * ```
 */
export type PickComputedResult<T> =
    T extends SchemaDescriptorBuilder<infer X>
        ? X
        : T extends SyncComputedDescriptorBuilder<infer X, any>
          ? X
          : T extends AsyncLiteComputedDescriptorBuilder<infer X, any>
            ? X
            : T extends AsyncComputedDescriptorBuilder<infer X, any>
              ? AsyncComputedValue<X>
              : T extends WatchDescriptorBuilder<infer X, any>
                ? X
                : T extends ComputedGetter<infer X, any>
                  ? X
                  : // 同步函数
                    T extends AsyncComputedGetter<infer X, any>
                    ? AsyncComputedValue<X>
                    : // 异步函数
                      T;

/**
 * 转换状态中的计算属性函数为返回值类型
 *
 * 递归遍历状态树，将所有计算属性函数替换为其返回值类型。
 * 这是 AutoStore 类型系统的核心，用于推导计算后的状态类型。
 *
 * 支持以下转换：
 * - 同步计算函数: `(scope) => T` → `T`
 * - 异步计算函数: `computed((scope) => Promise<T>)` → `AsyncComputedValue<T>`
 * - 数组类型: 递归处理数组元素
 * - 嵌套对象: 递归处理对象属性
 *
 * @template T - 包含计算属性函数的状态类型
 * @example
 * ```ts
 * type State = ComputedState<{
 *   count: number;
 *   double: (scope) => scope.count * 2;
 *   user: {
 *     name: string;
 *     greeting: (scope) => `Hello, ${scope.name}`;
 *   };
 * }>;
 * // 结果类型:
 * // {
 * //   count: number;
 * //   double: number;
 * //   user: {
 * //     name: string;
 * //     greeting: string;
 * //   };
 * // }
 * ```
 */
export type ComputedState<T> = T extends unknown[]
    ? ComputedState<T[number]>[]
    : T extends RawObject<T>
      ? T
      : T extends (...args: any) => any
        ? PickComputedResult<T>
        : T extends Dict
          ? {
                [K in keyof T]: T[K] extends (...args: any[]) => any
                    ? PickComputedResult<T[K]>
                    : T[K] extends Record<string, any>
                      ? ComputedState<T[K]>
                      : T[K] extends unknown[]
                        ? ComputedState<T[K][number]>[]
                        : T[K];
            }
          : T;

/**
 * 状态路径类型
 *
 * 获取状态树中所有可能的路径字符串，用于类型安全的路径访问。
 * 路径基于计算后的状态类型（ComputedState），因此会排除计算属性函数本身。
 *
 * @template T - 原始状态类型
 * @example
 * ```ts
 * type State = {
 *   user: {
 *     name: string;
 *     age: number;
 *   };
 *   count: number;
 * };
 * type Paths = StatePath<State>;
 * // "user" | "user.name" | "user.age" | "count"
 * ```
 */
export type StatePath<T> = ObjectKeyPaths<ComputedState<T>>;

/**
 * 必需的计算状态类型
 *
 * 在 ComputedState 的基础上，排除所有 undefined 的类型，并确保所有属性都是必需的。
 * 使用 TypeScript 的 `-?` 映射修饰符移除可选标记。
 *
 * @template T - 原始状态类型，必须是 Record 类型
 * @example
 * ```ts
 * type State = {
 *   name?: string;
 *   age: number | undefined;
 *   fullName?: () => string;
 * };
 * type RequiredState = RequiredComputedState<State>;
 * // { name: string; age: number; fullName: string }
 * ```
 */
export type RequiredComputedState<T extends Record<string, any>> = {
    [K in keyof T]-?: Exclude<T[K], undefined> extends (...args: any) => any
        ? PickComputedResult<Exclude<T[K], undefined>>
        : Required<T[K]> extends Record<string, any>
          ? ComputedState<Exclude<T[K], undefined>>
          : Exclude<T[K], undefined>;
};

/**
 * 全局 AutoStore 扩展注册表
 *
 * 用于在运行时注册 AutoStore 的扩展插件。所有扩展函数都会在创建 store 实例时被调用，
 * 允许插件向 store 实例添加额外的功能或属性。
 *
 * @example
 * ```ts
 * // 在插件中注册扩展
 * globalThis.__AUTOSTORE_EXTENDS__ ||= [];
 * globalThis.__AUTOSTORE_EXTENDS__.push((store) => {
 *   store.pluginMethod = () => { ... };
 * });
 * ```
 */
declare global {
    var __AUTOSTORE_EXTENDS__: (<S extends AutoStore<any>>(store: S) => void)[];
}

// ***************** 一些工具类型 *****************

/**
 * JavaScript 原始类型联合
 *
 * 包含所有 JavaScript 原始数据类型，用于类型检查和约束。
 *
 * @example
 * ```ts
 * function isPrimitive(value: unknown): value is Primitive {
 *   return value === null || (typeof value !== 'object' && typeof value !== 'function');
 * }
 * ```
 */
export type Primitive = string | number | boolean | null | undefined | symbol | bigint;

/**
 * 表示所有非函数类型
 * 排除函数类型，保留所有其他类型
 */
export type NonFunction = Exclude<unknown, (...args: any[]) => any>;

/**
 * 字典类型
 *
 * 表示一个键为字符串的对象类型，但排除函数类型。
 * 这是一个通用的对象类型约束，用于状态树定义。
 *
 * @template T - 值的类型，默认为 any
 * @example
 * ```ts
 * type UserDict = Dict<{ name: string; age: number }>;
 * // 等同于: Record<string, { name: string; age: number }>
 *
 * // 函数类型会被排除
 * type NotValid = Dict<() => void>; // never
 * ```
 */
export type Dict<T = any> = T extends (...args: any[]) => any ? never : Record<string, T>;

/**
 * 对象键路径类型
 *
 * 递归获取对象类型中所有可能的属性路径字符串，支持嵌套对象。
 * 使用 type-fest 的 Paths 工具类型，设置最大递归深度为 50 层。
 *
 * @template T - 对象类型
 * @example
 * ```ts
 * type User = {
 *   name: string;
 *   profile: {
 *     age: number;
 *     address: {
 *       city: string;
 *     };
 *   };
 * };
 * type Paths = ObjectKeyPaths<User>;
 * // "name" | "profile" | "profile.age" | "profile.address" | "profile.address.city"
 * ```
 */
export type ObjectKeyPaths<T> = Exclude<Paths<T, { maxRecursionDepth: 50 }>, number>;

/**
 * 根据路径字符串获取状态类型
 *
 * 从状态类型中通过点分隔的路径字符串获取对应的值类型。
 * 空路径或 undefined 返回整个状态类型。
 *
 * @template State - 状态对象类型
 * @template Path - 路径字符串
 * @example
 * ```ts
 * type State = {
 *   user: {
 *     name: string;
 *     age: number;
 *   };
 * };
 *
 * type NameType = GetTypeByPath<State, "user.name">; // string
 * type UserType = GetTypeByPath<State, "user">; // { name: string; age: number }
 * type WholeType = GetTypeByPath<State, "">; // State
 * ```
 */
export type GetTypeByPath<State, Path extends string> = Path extends "" | undefined
    ? State
    : State extends Dict
      ? Get<State, Path>
      : never;

/**
 * 移除 unknown 类型
 *
 * 从联合类型中过滤掉 unknown 类型，保留其他类型。
 *
 * @template T - 输入类型
 * @example
 * ```ts
 * type Mixed = string | number | unknown;
 * type WithoutUnknown = RemoveUnknown<Mixed>; // string | number
 * ```
 */
export type RemoveUnknown<T> = T extends unknown ? never : T;

/**
 * 转换为原始基础类型
 *
 * 将具体的字面量类型转换为其对应的基础类型。
 * 例如：将 "hello" 转换为 string，将 42 转换为 number。
 * 但对于已经是基础类型的（如 string 本身），则保持不变。
 *
 * @template T - 输入类型
 * @example
 * ```ts
 * type Literal1 = ToRawType<"hello">; // string
 * type Literal2 = ToRawType<42>; // number
 * type Literal3 = ToRawType<true>; // boolean
 * type Already = ToRawType<string>; // string (保持不变)
 * type Union = ToRawType<"a" | "b">; // string
 * ```
 */
export type ToRawType<T> = T extends string
    ? string extends T
        ? T
        : string
    : T extends number
      ? number extends T
          ? T
          : number
      : T extends boolean
        ? boolean extends T
            ? T
            : boolean
        : T;
