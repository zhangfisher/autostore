import { describe, expect, test } from "bun:test";
import { AutoStore } from "autostore";
import { createTemplateContext } from "../context";

/** 字符串数组升序排序（显式传入比较函数，避免无参 .sort() 触发 lint） */
const asc = (arr: string[]): string[] =>
    arr.slice().sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

describe("createTemplateContext - 基础读取", () => {
    test("传入 state，聚合视图读取其字段", () => {
        const ctx = createTemplateContext({ name: "zhang", age: 18 });
        expect(ctx.name).toBe("zhang");
        expect(ctx.age).toBe(18);
    });

    test("嵌套 state 字段保持响应式读取", () => {
        const ctx = createTemplateContext({ user: { name: "zhang" } });
        expect(ctx.user.name).toBe("zhang");
    });

    test("未命中的 key 返回 undefined", () => {
        const ctx = createTemplateContext({ a: 1 });
        expect((ctx as any).notExist).toBeUndefined();
        expect((ctx as any).b).toBeUndefined();
    });
});

describe("createTemplateContext - has", () => {
    test("存在的数据键返回 true", () => {
        const ctx = createTemplateContext({ a: 1, b: 2 });
        expect("a" in ctx).toBe(true);
        expect("b" in ctx).toBe(true);
    });

    test("不存在的 key 返回 false", () => {
        const ctx = createTemplateContext({ a: 1 });
        expect("missing" in ctx).toBe(false);
    });

    test("Symbol key 一律返回 false", () => {
        const ctx = createTemplateContext({ a: 1 });
        expect(Symbol.iterator in ctx).toBe(false);
        expect(Symbol.toPrimitive in ctx).toBe(false);
    });
});

describe("createTemplateContext - 只读语义", () => {
    test("数据键描述符 writable 为 false", () => {
        const ctx = createTemplateContext({ a: 1 });
        const desc = Object.getOwnPropertyDescriptor(ctx, "a");
        expect(desc).toBeDefined();
        expect(desc!.writable).toBe(false);
    });

    test("对已有数据键赋值在严格模式下抛 TypeError（硬只读）", () => {
        // 代理未提供 set 陷阱，[[Set]] 内部读取 getOwnPropertyDescriptor 陷阱
        // 返回的描述符，因 writable:false 拒绝写入，严格模式下抛 TypeError
        const ctx = createTemplateContext({ a: 1 });
        expect(() => {
            (ctx as any).a = 2;
        }).toThrow(TypeError);
    });

    test("对全新键赋值落到代理内部 target，不污染 store.state", () => {
        const ctx = createTemplateContext({ a: 1 });
        // 新键没有虚拟描述符，赋值转发到代理内部 target（空对象），不抛错但不进入作用域栈
        expect(() => {
            (ctx as any).newKey = 888;
        }).not.toThrow();
        // 聚合视图不查 target，读不到
        expect((ctx as any).newKey).toBeUndefined();
        // store.state 未被污染
        expect("newKey" in ctx.$store.state).toBe(false);
    });

    test("delete 不影响 store.state 中的真实数据", () => {
        const ctx = createTemplateContext({ a: 1 });
        // 无 deleteProperty 陷阱，转发到代理内部 target（空对象），不抛错
        delete (ctx as any).a;
        expect(ctx.a).toBe(1);
        expect(ctx.$store.state.a).toBe(1);
    });
});

describe("createTemplateContext - $store 元属性", () => {
    test("$store 是 AutoStore 实例", () => {
        const ctx = createTemplateContext({ a: 1 });
        expect(ctx.$store).toBeInstanceOf(AutoStore);
    });

    test("'$store' in ctx 始终为 true", () => {
        const ctx = createTemplateContext({ a: 1 });
        expect("$store" in ctx).toBe(true);
    });

    test("$store.state 与初始 state 数据一致", () => {
        const ctx = createTemplateContext({ count: 5, name: "zhang" });
        expect(ctx.$store.state.count).toBe(5);
        expect(ctx.$store.state.name).toBe("zhang");
    });

    test("$store 描述符为只读且不可枚举，value 等于 ctx.$store", () => {
        const ctx = createTemplateContext({ a: 1 });
        const desc = Object.getOwnPropertyDescriptor(ctx, "$store");
        expect(desc).toBeDefined();
        expect(desc!.value).toBe(ctx.$store);
        expect(desc!.writable).toBe(false);
        expect(desc!.enumerable).toBe(false);
        expect(desc!.configurable).toBe(true);
    });

    test("$store 不可枚举（不污染数据遍历）", () => {
        const ctx = createTemplateContext({ a: 1 });
        expect(Object.keys(ctx)).toEqual(["a"]);
        // 运行时展开会丢弃不可枚举的元属性，cast 反映该语义
        expect({ ...ctx } as Record<string, any>).toEqual({ a: 1 });
    });

    test("通过 $store.state 写入，聚合视图立即反映（响应式穿透）", () => {
        const ctx = createTemplateContext({ count: 0 });
        // context[0] === store.state，直接改 store.state.count 后 ctx.count 应同步
        ctx.$store.state.count = 99;
        expect(ctx.count).toBe(99);
    });
});

describe("createTemplateContext - $context 元属性", () => {
    test("$context 是数组，首元素即 store.state", () => {
        const ctx = createTemplateContext({ a: 1 });
        expect(Array.isArray(ctx.$context)).toBe(true);
        expect(ctx.$context).toHaveLength(1);
        // 栈底根作用域就是 store.state 本身
        expect(ctx.$context[0]).toBe(ctx.$store.state);
    });

    test("'$context' in ctx 始终为 true", () => {
        const ctx = createTemplateContext({ a: 1 });
        expect("$context" in ctx).toBe(true);
    });

    test("$context 描述符为只读且不可枚举，value 等于 ctx.$context", () => {
        const ctx = createTemplateContext({ a: 1 });
        const desc = Object.getOwnPropertyDescriptor(ctx, "$context");
        expect(desc).toBeDefined();
        expect(desc!.value).toBe(ctx.$context);
        expect(desc!.writable).toBe(false);
        expect(desc!.enumerable).toBe(false);
        expect(desc!.configurable).toBe(true);
    });

    test("$context 不可枚举（不污染数据遍历）", () => {
        const ctx = createTemplateContext({ a: 1 });
        expect(Object.keys(ctx)).toEqual(["a"]);
        expect({ ...ctx } as Record<string, any>).toEqual({ a: 1 });
    });

    test("push 新作用域后，聚合视图立即反映（后层覆盖前层）", () => {
        const ctx = createTemplateContext({ name: "outer", count: 1 });
        // 压入子作用域，模拟 x-for 注入 { item, index }
        ctx.$context.push({ name: "inner" });
        // 栈顶覆盖根作用域同名键
        expect(ctx.name).toBe("inner");
        // 根作用域独有的键仍可读
        expect(ctx.count).toBe(1);
    });

    test("pop 弹出栈顶后，聚合视图回退到根作用域", () => {
        const ctx = createTemplateContext({ name: "outer" });
        ctx.$context.push({ name: "inner" });
        const popped = ctx.$context.pop();
        expect(popped).toEqual({ name: "inner" });
        // 回退到根作用域（store.state）
        expect(ctx.name).toBe("outer");
        expect(ctx.$context).toHaveLength(1);
    });
});

describe("createTemplateContext - 枚举", () => {
    test("Reflect.ownKeys 含元属性 $context/$store 与数据键并去重", () => {
        const ctx = createTemplateContext({ a: 1, b: 2 });
        expect(asc(Reflect.ownKeys(ctx) as string[])).toEqual([
            "$context",
            "$store",
            "a",
            "b",
        ]);
    });

    test("Object.keys 仅返回数据键（不含两个元属性）", () => {
        const ctx = createTemplateContext({ x: 1, y: 2 });
        expect(asc(Object.keys(ctx))).toEqual(["x", "y"]);
    });

    test("Object.entries 仅返回数据键值对", () => {
        const ctx = createTemplateContext({ x: 1, v: "a" });
        expect(Object.fromEntries(Object.entries(ctx))).toEqual({ x: 1, v: "a" });
    });

    test("for...in 仅遍历数据键", () => {
        const ctx = createTemplateContext({ a: 1, b: 2 });
        const seen: string[] = [];
        for (const k in ctx) seen.push(k);
        expect(asc(seen)).toEqual(["a", "b"]);
    });

    test("扩展运算符仅含数据键（后层覆盖前层，不含元属性）", () => {
        const ctx = createTemplateContext({ a: 1, b: 3 });
        expect({ ...ctx } as Record<string, any>).toEqual({ a: 1, b: 3 });
    });
});

describe("createTemplateContext - getOwnPropertyDescriptor", () => {
    test("数据键命中返回正确描述符（value + enumerable + configurable）", () => {
        const ctx = createTemplateContext({ a: 1 });
        const desc = Object.getOwnPropertyDescriptor(ctx, "a");
        expect(desc).toBeDefined();
        expect(desc!.value).toBe(1);
        expect(desc!.enumerable).toBe(true);
        expect(desc!.configurable).toBe(true);
    });

    test("未命中返回 undefined", () => {
        const ctx = createTemplateContext({ a: 1 });
        expect(Object.getOwnPropertyDescriptor(ctx, "missing")).toBeUndefined();
    });

    test("Symbol key 返回 undefined", () => {
        const ctx = createTemplateContext({ a: 1 });
        expect(
            Object.getOwnPropertyDescriptor(ctx, Symbol.iterator),
        ).toBeUndefined();
    });
});

describe("createTemplateContext - 边界", () => {
    test("空 state：无数据键，但元属性仍可用", () => {
        const ctx = createTemplateContext({});
        expect(Object.keys(ctx)).toEqual([]);
        expect((ctx as any).anything).toBeUndefined();
        expect("$store" in ctx).toBe(true);
        expect("$context" in ctx).toBe(true);
        expect(ctx.$context).toHaveLength(1);
        expect(ctx.$store).toBeInstanceOf(AutoStore);
    });

    test("Symbol key 读取返回 undefined", () => {
        const sym = Symbol("custom");
        const ctx = createTemplateContext({ a: 1 });
        expect((ctx as any)[sym]).toBeUndefined();
    });

    test("值为 0 / false / 空串 / null 等 falsy 值能正确读取", () => {
        const ctx = createTemplateContext({
            zero: 0,
            no: false,
            empty: "",
            nil: null,
        });
        expect(ctx.zero).toBe(0);
        expect(ctx.no).toBe(false);
        expect(ctx.empty).toBe("");
        expect(ctx.nil).toBeNull();
        // 能区分"值为 falsy"与"键不存在"
        expect("zero" in ctx).toBe(true);
        expect("missing" in ctx).toBe(false);
    });

    test("JSON.stringify 仅序列化数据键（不含元属性）", () => {
        const ctx = createTemplateContext({ a: 1, b: 2 });
        expect(JSON.parse(JSON.stringify(ctx))).toEqual({ a: 1, b: 2 });
    });

    test("泛型类型推断：State 字段在 ctx 上类型安全", () => {
        // 编译期断言：createTemplateContext({count:0}) 应推断出 ctx.count: number
        const ctx = createTemplateContext({ count: 0, name: "zhang" });
        const _count: number = ctx.count;
        const _name: string = ctx.name;
        expect(_count).toBe(0);
        expect(_name).toBe("zhang");
    });
});
