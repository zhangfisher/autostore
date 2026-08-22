import { describe, expect, test } from "bun:test";
import "./setup";
import { AutoStore, ConfigManager, configurable } from "autostore";
import { AutoTemplateEngine } from "../engine";
import { mount, nextTick } from "./helpers";

/**
 * x-model 空值回填测试（ADR-0027）。
 *
 * 机制：emptyValues（默认集 [undefined,null,NaN] + 用户附加，仅读方向判定）；
 * default（模板 > schema 两级静态值）；select 无 default 时空值勾首项（仅显示层不回写）；
 * 多选空值全不勾；checkbox/radio 不参与；写方向不经判空。
 *
 * 约定：scheduler 经 microtask flush，写后须 `await nextTick()` 再断言。
 */

describe("x-model 空值回填：text-like", () => {
    test("默认集：undefined/null/NaN 显示空串（行为变更：不再显示 'null'/'NaN'）", async () => {
        const { root: r1 } = mount(`<input x-model="a" />`, { a: undefined });
        const { root: r2 } = mount(`<input x-model="b" />`, { b: null });
        const { root: r3 } = mount(`<input x-model="c" />`, { c: NaN });
        expect((r1.querySelector("input") as HTMLInputElement).value).toBe("");
        expect((r2.querySelector("input") as HTMLInputElement).value).toBe("");
        expect((r3.querySelector("input") as HTMLInputElement).value).toBe("");
    });

    test("emptyValues 附加：[0] 后 0 也算空", async () => {
        const { root, engine } = mount(
            `<input x-model="n" x-model-options="{emptyValues:[0]}" />`,
            { n: 0 },
        );
        expect((root.querySelector("input") as HTMLInputElement).value).toBe("");
        // 1 不在空值集，正常显示
        engine.state.n = 1;
        await nextTick();
        expect((root.querySelector("input") as HTMLInputElement).value).toBe("1");
    });

    test("default 模板静态值：空值时回填显示", async () => {
        const { root, engine } = mount(
            `<input x-model="a" x-model-options="{default:'未填写'}" />`,
            { a: null },
        );
        expect((root.querySelector("input") as HTMLInputElement).value).toBe("未填写");
        // 运行中变空 → 弹回 default（Q4-b 无条件判定）
        engine.state.a = "有值";
        await nextTick();
        expect((root.querySelector("input") as HTMLInputElement).value).toBe("有值");
        engine.state.a = undefined;
        await nextTick();
        expect((root.querySelector("input") as HTMLInputElement).value).toBe("未填写");
    });

    test("写方向不经判空：用户清空写回 ''（不在默认集）", async () => {
        const { root, engine } = mount(`<input x-model="a" />`, { a: "x" });
        const input = root.querySelector("input") as HTMLInputElement;
        input.value = "";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.a).toBe(""); // 写回原样，不被默认值替换
        expect(input.value).toBe(""); // 显示也保持空（"" 非空值）
    });

    test("default 数字值回填（emptyValues:[0] + default 组合）", () => {
        const { root } = mount(
            `<input x-model="n" x-model-options="{emptyValues:[null],default:100}" />`,
            { n: null },
        );
        expect((root.querySelector("input") as HTMLInputElement).value).toBe("100");
    });
});

describe("x-model 空值回填：schema default", () => {
    function mountWithConfig(html: string, state: any) {
        const root = document.createElement("div");
        root.innerHTML = html.trim();
        const configManager = new ConfigManager(
            { load: async () => ({}), save: async () => {} },
            { autoload: false, global: false },
        );
        const store = new AutoStore(state, { configManager, configKey: "app" } as any);
        const engine = new AutoTemplateEngine(root, store);
        return { root, store, engine, configManager };
    }

    test("schema.default 作为第二级回填", () => {
        const { root } = mountWithConfig(`<input x-model="a" />`, {
            a: configurable(undefined, { default: "schema默认" }),
        });
        expect((root.querySelector("input") as HTMLInputElement).value).toBe("schema默认");
    });

    test("模板 default 优先于 schema default", () => {
        const { root } = mountWithConfig(
            `<input x-model="a" x-model-options="{default:'模板默认'}" />`,
            { a: configurable(undefined, { default: "schema默认" }) },
        );
        expect((root.querySelector("input") as HTMLInputElement).value).toBe("模板默认");
    });
});

describe("x-model 空值回填：select 首项默认", () => {
    test("空值无 default → 勾中首个 option（含 optgroup 内首个），不回写 state", async () => {
        const { root, store } = mount(
            `<select x-model="car" x-model-options="{group:'category',choices:[
                {value:'A',label:'甲',category:'x'},
                {value:'B',label:'乙',category:'x'}
            ]}"></select>`,
            { car: undefined },
        );
        await nextTick();
        const select = root.querySelector("select") as HTMLSelectElement;
        expect(select.value).toBe("A"); // 首项默认（optgroup 内第一个）
        expect(select.selectedIndex).toBe(0);
        expect(store.state.car).toBe(undefined); // 不回写 state
    });

    test("default 声明优先于首项规则", async () => {
        const { root } = mount(
            `<select x-model="car" x-model-options="{default:'B',choices:[
                {value:'A',label:'甲'},{value:'B',label:'乙'}
            ]}"></select>`,
            { car: null },
        );
        await nextTick();
        expect((root.querySelector("select") as HTMLSelectElement).value).toBe("B");
    });

    test("多选空值 → 全不勾（[] 语义）", async () => {
        const { root } = mount(
            `<select multiple x-model="cars" x-model-options="{choices:[
                {value:'A',label:'甲'},{value:'B',label:'乙'}
            ]}"></select>`,
            { cars: undefined },
        );
        await nextTick();
        const select = root.querySelector("select") as HTMLSelectElement;
        expect(select.options[0]!.selected).toBe(false);
        expect(select.options[1]!.selected).toBe(false);
    });

    test("多选 default 数组：空值按数组勾选", async () => {
        const { root } = mount(
            `<select multiple x-model="cars" x-model-options="{default:['A','B'],choices:[
                {value:'A',label:'甲'},{value:'B',label:'乙'},{value:'C',label:'丙'}
            ]}"></select>`,
            { cars: null },
        );
        await nextTick();
        const select = root.querySelector("select") as HTMLSelectElement;
        expect(select.options[0]!.selected).toBe(true);
        expect(select.options[1]!.selected).toBe(true);
        expect(select.options[2]!.selected).toBe(false);
    });

    test("choices 重建重放保持首项默认（_lastDisplayValue 缓存 default 后显示值）", async () => {
        const { root, configManager } = (() => {
            const root = document.createElement("div");
            root.innerHTML = `<select x-model="car"></select>`;
            const configManager = new ConfigManager(
                { load: async () => ({}), save: async () => {} },
                { autoload: false, global: false },
            );
            const store = new AutoStore(
                { car: configurable(undefined, { choices: [
                    { value: "A", label: "甲" }, { value: "B", label: "乙" },
                ] as any }) },
                { configManager, configKey: "app" } as any,
            );
            const engine = new AutoTemplateEngine(root, store);
            return { root, configManager };
        })();
        await nextTick();
        const select = root.querySelector("select") as HTMLSelectElement;
        expect(select.value).toBe("A"); // 首项默认

        // 重建选项（整体替换）→ 重放仍是首项默认
        (configManager.state as any)["app.car"].choices = [
            { value: "X", label: "新甲" },
            { value: "Y", label: "新乙" },
        ];
        await nextTick();
        expect(select.value).toBe("X");
    });
});

describe("x-model 空值回填：checkbox/radio 不参与", () => {
    test("checkbox 空值 → false（Boolean coerce，default 无效）", async () => {
        const { root } = mount(
            `<input type="checkbox" x-model="flag" x-model-options="{default:true}" />`,
            { flag: undefined },
        );
        expect((root.querySelector("input") as HTMLInputElement).checked).toBe(false);
    });

    test("radio 空值 → 全不勾（default 无效）", async () => {
        const { root } = mount(
            `<input type="radio" value="a" x-model="pick" x-model-options="{default:'a'}" />`,
            { pick: null },
        );
        expect((root.querySelector("input") as HTMLInputElement).checked).toBe(false);
    });
});

describe("x-model 空值回填：get 交互与锐边", () => {
    test("判定在 get 之后：get 求值失败回退原空值 → 仍走回填", () => {
        const { root } = mount(
            `<input x-model="n" x-model-options="{get:'value.toUpperCase()'}" />`,
            { n: null },
        );
        // get(null).toUpperCase() 抛错 → _evalGet 回退原值 null → 命中空值集 → 空串显示
        expect((root.querySelector("input") as HTMLInputElement).value).toBe("");
    });

    test("判定在 get 之后：get 产物非空则照常显示", () => {
        const { root } = mount(
            `<input x-model="n" x-model-options="{get:'value == null ? \\'(空)\\' : value'}" />`,
            { n: null },
        );
        // get 把 null 转成 "(空)" 字符串 —— 产物非空值集成员，不经回填照常显示
        expect((root.querySelector("input") as HTMLInputElement).value).toBe("(空)");
    });

    test("锐边：emptyValues:['\"\"'] + default —— 清空后弹回（文档化，自担）", async () => {
        const { root, engine } = mount(
            `<input x-model="a" x-model-options="{emptyValues:[''],default:'默认'}" />`,
            { a: "x" },
        );
        const input = root.querySelector("input") as HTMLInputElement;
        expect(input.value).toBe("x");
        // 外部置 "" → 命中空值集 → 显示 default
        engine.state.a = "";
        await nextTick();
        expect(input.value).toBe("默认");
        expect(engine.state.a).toBe(""); // state 不被回填污染
    });
});
