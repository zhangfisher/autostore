import { describe, expect, test } from "bun:test";
import { createScopeContext } from "../../utils/createScopeContext";

/** 字符串数组升序排序（显式比较函数，避免无参 .sort() 触发 lint） */
const asc = (arr: string[]): string[] => arr.slice().sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

describe("createScopeContext - 基础读取（get）", () => {
    test("initial 注入的单层作用域字段可读", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ name: "zhang", age: 18 });
            },
        });
        expect(ctx.name).toBe("zhang");
        expect(ctx.age).toBe(18);
    });

    test("嵌套对象字段保持原结构读取", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ user: { name: "zhang" } });
            },
        });
        expect((ctx as any).user.name).toBe("zhang");
    });

    test("未命中的 key 返回 undefined", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ a: 1 });
            },
        });
        expect((ctx as any).notExist).toBeUndefined();
        expect((ctx as any).b).toBeUndefined();
    });

    test("Symbol key 一律返回 undefined", () => {
        const sym = Symbol("custom");
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ a: 1 });
            },
        });
        expect((ctx as any)[sym]).toBeUndefined();
        expect((ctx as any)[Symbol.iterator]).toBeUndefined();
    });
});

describe("createScopeContext - 作用域栈覆盖（后层覆盖前层）", () => {
    test("栈顶作用域覆盖栈底同名键", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ name: "outer", count: 1 });
                stack.push({ name: "inner" });
            },
        });
        // 栈顶（后 push）覆盖栈底
        expect(ctx.name).toBe("inner");
        // 栈底独有键仍可读
        expect(ctx.count).toBe(1);
    });

    test("三层栈取最靠近栈顶的命中", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ v: 1 });
                stack.push({ v: 2 });
                stack.push({ v: 3 });
            },
        });
        expect(ctx.v).toBe(3);
    });

    test("覆盖只作用于同名键，不抹掉栈底独有键", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ a: 1, b: 2, c: 3 });
                stack.push({ b: 20 });
            },
        });
        expect(ctx.a).toBe(1);
        expect(ctx.b).toBe(20);
        expect(ctx.c).toBe(3);
    });
});

describe("createScopeContext - has", () => {
    test("存在的数据键返回 true", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ a: 1, b: 2 });
            },
        });
        expect("a" in ctx).toBe(true);
        expect("b" in ctx).toBe(true);
    });

    test("不存在的 key 返回 false", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ a: 1 });
            },
        });
        expect("missing" in ctx).toBe(false);
    });

    test("Symbol key 一律返回 false", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ a: 1 });
            },
        });
        expect(Symbol.iterator in ctx).toBe(false);
        expect(Symbol.toPrimitive in ctx).toBe(false);
    });

    test("深层作用域的键同样可被 has 命中", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ deep: true });
                stack.push({ shallow: true });
            },
        });
        expect("deep" in ctx).toBe(true);
        expect("shallow" in ctx).toBe(true);
    });
});

describe("createScopeContext - 元属性（keyProps）", () => {
    test("注册的元属性可读且引用一致", () => {
        const store = { state: { a: 1 } };
        const ctx = createScopeContext({
            keyProps: { $store: store },
        });
        expect((ctx as any).$store).toBe(store);
    });

    test("元属性 has 始终为 true", () => {
        const ctx = createScopeContext({
            keyProps: { $store: {} },
        });
        expect("$store" in ctx).toBe(true);
    });

    test("元属性描述符为只读、不可枚举、configurable", () => {
        const store = {};
        const ctx = createScopeContext({
            keyProps: { $store: store },
        });
        const desc = Object.getOwnPropertyDescriptor(ctx, "$store");
        expect(desc).toBeDefined();
        expect(desc!.value).toBe(store);
        expect(desc!.writable).toBe(false);
        expect(desc!.enumerable).toBe(false);
        expect(desc!.configurable).toBe(true);
    });

    test("元属性不污染 Object.keys 与扩展运算符", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ a: 1 });
            },
            keyProps: { $store: {}, $context: [] },
        });
        expect(Object.keys(ctx)).toEqual(["a"]);
        expect({ ...ctx } as Record<string, any>).toEqual({ a: 1 });
    });

    test("多个元属性共存且互不干扰", () => {
        const ctx = createScopeContext({
            keyProps: { $a: 1, $b: 2, $c: 3 },
        });
        expect((ctx as any).$a).toBe(1);
        expect((ctx as any).$b).toBe(2);
        expect((ctx as any).$c).toBe(3);
        expect("$a" in ctx).toBe(true);
        expect("$c" in ctx).toBe(true);
    });
});

describe("createScopeContext - 只读语义", () => {
    test("数据键描述符 writable 为 false", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ a: 1 });
            },
        });
        const desc = Object.getOwnPropertyDescriptor(ctx, "a");
        expect(desc).toBeDefined();
        expect(desc!.writable).toBe(false);
    });

    test("对已有数据键赋值在严格模式下抛 TypeError（硬只读）", () => {
        // 无 set 陷阱，[[Set]] 经 getOwnPropertyDescriptor 陷阱读到 writable:false，
        // 严格模式下拒绝写入并抛 TypeError
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ a: 1 });
            },
        });
        expect(() => {
            (ctx as any).a = 2;
        }).toThrow(TypeError);
    });

    test("对全新键赋值落到代理内部 target，不污染作用域栈", () => {
        // 新键无虚拟描述符，赋值转发到代理内部 target（空对象），不抛错但聚合视图读不到
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ a: 1 });
            },
        });
        expect(() => {
            (ctx as any).newKey = 888;
        }).not.toThrow();
        // 聚合视图不查 target
        expect((ctx as any).newKey).toBeUndefined();
        expect("newKey" in ctx).toBe(false);
    });

    test("delete 转发到 target，不影响作用域栈真实数据", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ a: 1 });
            },
        });
        // 无 deleteProperty 陷阱，转发到内部 target，不抛错也不改作用域栈
        expect(() => {
            delete (ctx as any).a;
        }).not.toThrow();
        expect(ctx.a).toBe(1);
    });
});

describe("createScopeContext - 枚举", () => {
    test("Reflect.ownKeys 元属性在前，其后为数据键并去重", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ a: 1, b: 2 });
            },
            keyProps: { $store: {}, $context: [] },
        });
        expect(asc(Reflect.ownKeys(ctx) as string[])).toEqual(["$context", "$store", "a", "b"]);
    });

    test("Object.keys 仅返回数据键（不含元属性）", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ x: 1, y: 2 });
            },
            keyProps: { $store: {} },
        });
        expect(asc(Object.keys(ctx))).toEqual(["x", "y"]);
    });

    test("多层作用域 ownKeys 聚合并去重", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ a: 1, shared: "bottom" });
                stack.push({ b: 2, shared: "top" });
            },
        });
        // shared 在两层都存在，去重后只出现一次
        expect(asc(Object.keys(ctx))).toEqual(["a", "b", "shared"]);
    });

    test("for...in 仅遍历数据键", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ a: 1, b: 2 });
            },
            keyProps: { $store: {} },
        });
        const seen: string[] = [];
        for (const k in ctx) seen.push(k);
        expect(asc(seen)).toEqual(["a", "b"]);
    });

    test("扩展运算符仅含数据键，且后层覆盖前层", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ a: 1, v: "bottom" });
                stack.push({ v: "top", b: 2 });
            },
            keyProps: { $store: {} },
        });
        expect({ ...ctx } as Record<string, any>).toEqual({ a: 1, v: "top", b: 2 });
    });

    test("JSON.stringify 仅序列化数据键（不含元属性）", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ a: 1, b: 2 });
            },
            keyProps: { $store: {} },
        });
        expect(JSON.parse(JSON.stringify(ctx))).toEqual({ a: 1, b: 2 });
    });
});

describe("createScopeContext - getOwnPropertyDescriptor", () => {
    test("数据键命中返回正确描述符", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ a: 1 });
            },
        });
        const desc = Object.getOwnPropertyDescriptor(ctx, "a");
        expect(desc).toBeDefined();
        expect(desc!.value).toBe(1);
        expect(desc!.enumerable).toBe(true);
        expect(desc!.configurable).toBe(true);
        expect(desc!.writable).toBe(false);
    });

    test("栈顶覆盖：描述符 value 取栈顶作用域的值", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ v: 1 });
                stack.push({ v: 2 });
            },
        });
        const desc = Object.getOwnPropertyDescriptor(ctx, "v");
        expect(desc!.value).toBe(2);
    });

    test("元属性描述符为只读、不可枚举", () => {
        const store = {};
        const ctx = createScopeContext({
            keyProps: { $store: store },
        });
        const desc = Object.getOwnPropertyDescriptor(ctx, "$store");
        expect(desc!.value).toBe(store);
        expect(desc!.writable).toBe(false);
        expect(desc!.enumerable).toBe(false);
        expect(desc!.configurable).toBe(true);
    });

    test("未命中返回 undefined", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ a: 1 });
            },
        });
        expect(Object.getOwnPropertyDescriptor(ctx, "missing")).toBeUndefined();
    });

    test("Symbol key 返回 undefined", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ a: 1 });
            },
        });
        expect(Object.getOwnPropertyDescriptor(ctx, Symbol.iterator)).toBeUndefined();
    });
});

describe("createScopeContext - 边界", () => {
    test("无 options 不报错，得到空栈视图", () => {
        const ctx = createScopeContext();
        expect(Object.keys(ctx)).toEqual([]);
        expect((ctx as any).anything).toBeUndefined();
        expect("anything" in ctx).toBe(false);
    });

    test("空栈：任意数据键 has 为 false", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({});
            },
        });
        expect("x" in ctx).toBe(false);
        expect((ctx as any).x).toBeUndefined();
        expect(Object.keys(ctx)).toEqual([]);
    });

    test("值为 0 / false / 空串 / null 等 falsy 值能正确读取", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ zero: 0, no: false, empty: "", nil: null });
            },
        });
        expect(ctx.zero).toBe(0);
        expect(ctx.no).toBe(false);
        expect(ctx.empty).toBe("");
        expect(ctx.nil).toBeNull();
        // 能区分"值为 falsy"与"键不存在"
        expect("zero" in ctx).toBe(true);
        expect("missing" in ctx).toBe(false);
    });

    test("initial 为非函数时不报错（typeof 守卫）", () => {
        // @ts-expect-error 故意传入非函数，验证运行时守卫
        const ctx = createScopeContext({ initial: "not-a-function" });
        expect(Object.keys(ctx)).toEqual([]);
    });

    test("keyProps 为空对象时不注册任何元属性", () => {
        const ctx = createScopeContext({
            initial: (stack) => {
                stack.push({ a: 1 });
            },
            keyProps: {},
        });
        expect((ctx as any).$store).toBeUndefined();
        expect("$store" in ctx).toBe(false);
    });

    test("泛型类型推断：T 字段在 ctx 上类型安全", () => {
        // 编译期断言：泛型参数应推断出 ctx.count / ctx.name 的具体类型
        const ctx = createScopeContext<{ count: number; name: string }>({
            initial: (stack) => {
                stack.push({ count: 0, name: "zhang" });
            },
        });
        const _count: number = ctx.count;
        const _name: string = ctx.name;
        expect(_count).toBe(0);
        expect(_name).toBe("zhang");
    });
});
