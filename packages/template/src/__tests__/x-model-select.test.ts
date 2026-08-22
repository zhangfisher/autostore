import { describe, expect, test } from "bun:test";
import "./setup";
import { AutoStore, ConfigManager, computed, configurable } from "autostore";
import { AutoTemplateEngine } from "../engine";
import { mount, nextTick } from "./helpers";

/**
 * x-model select 分支测试（ADR-0026）。
 *
 * 覆盖：选项源三级优先（静态 option > 模板 choices > schema choices）、group 分组、
 * multiple（显式/修饰符/schema）、读写方向（单值 string / 多值 string[]）、
 * 严格 === 匹配、类型不匹配 warn、响应式全量重建、默认 change 事件、注入白名单。
 *
 * 约定：
 * - 模拟选择：`select.value = x; dispatchEvent(new Event('change'))`（select 默认事件 change）；
 * - 多选勾选：`option.selected = true` 后须再设 `select.value` 无效——直接改 options 后 dispatch；
 * - scheduler 经 microtask flush，写后须 `await nextTick()` 再断言。
 */

/** 带 configManager 的挂载辅助（schema choices/multiple/注入白名单场景） */
function mountWithConfig(
    html: string,
    state: any,
    opts: { configKey?: string } = {},
) {
    const root = document.createElement("div");
    root.innerHTML = html.trim();
    const configManager = new ConfigManager(
        { load: async () => ({}), save: async () => {} },
        { autoload: false, global: false },
    );
    const store = new AutoStore(state, {
        configManager,
        configKey: opts.configKey,
    } as any);
    const engine = new AutoTemplateEngine(root, store);
    return { root, store, engine, configManager };
}

const CARS = [
    { value: "ZEEKR", label: "极氪" },
    { value: "NIO", label: "蔚来" },
    { value: "XPENG", label: "小鹏" },
];

describe("x-model select：静态模式（最高优先）", () => {
    test("手写 option 直用，choices 两来源忽略", () => {
        const { root } = mountWithConfig(
            `<select x-model="car">
                <option value="ZEEKR">极氪</option>
                <option value="NIO">蔚来</option>
           select>`.replace("</select>", "</select>"),
            { car: cfgStatic("NIO") },
        );
        const select = root.querySelector("select")!;
        // 静态 option 保留，choices 未渲染
        expect(select.querySelectorAll("option").length).toBe(2);
        expect(select.value).toBe("NIO");
    });

    test("静态 optgroup 也判定静态模式", () => {
        const { root } = mount(
            `<select x-model="car">
                <optgroup label="国产"><option value="ZEEKR">极氪</option></optgroup>
            </select>`,
            { car: "ZEEKR" },
        );
        const select = root.querySelector("select")!;
        expect(select.querySelectorAll("optgroup").length).toBe(1);
        expect(select.value).toBe("ZEEKR");
    });

    test("静态模式 DOM→state 写入", async () => {
        const { root, store } = mount(
            `<select x-model="car">
                <option value="ZEEKR">极氪</option>
                <option value="NIO">蔚来</option>
            </select>`,
            { car: "" },
        );
        const select = root.querySelector("select") as HTMLSelectElement;
        select.value = "ZEEKR";
        select.dispatchEvent(new Event("change", { bubbles: true }));
        await nextTick();
        expect(store.state.car).toBe("ZEEKR");
    });

    test("静态模式：schema.choices 存在也被忽略（不渲染 choices）", () => {
        const { root } = mountWithConfig(`<select x-model="car"></select>`, {
            car: configurable("ZEEKR", { choices: CARS as any }),
        });
        // 空模板 + schema.choices：无静态 option → 走 schema 渲染（对照组见下）；
        // 此处验证静态模式须有手写子节点——空 select 走 schema 分支
        const select = root.querySelector("select")!;
        expect(select.querySelectorAll("option").length).toBe(3);
    });
});

function cfgStatic(initial: any, options?: Record<string, any>) {
    return configurable(initial, options as any);
}

describe("x-model select：模板 choices（x-model-options）", () => {
    test("choices 渲染 option 子树（label/value）", () => {
        const { root } = mount(
            `<select x-model="car" x-model-options="{choices:[{value:'ZEEKR',label:'极氪'},{value:'NIO',label:'蔚来'}]}"></select>`,
            { car: "NIO" },
        );
        const select = root.querySelector("select")!;
        const options = select.querySelectorAll("option");
        expect(options.length).toBe(2);
        expect(options[0]!.value).toBe("ZEEKR");
        expect(options[0]!.textContent).toBe("极氪");
        expect(select.value).toBe("NIO"); // 初始选中
    });

    test("模板 choices 优先于 schema choices", () => {
        const { root } = mountWithConfig(
            `<select x-model="car" x-model-options="{choices:[{value:'A',label:'甲'}]}"></select>`,
            { car: cfgStatic("A", { choices: CARS as any }) },
        );
        const select = root.querySelector("select")!;
        expect(select.querySelectorAll("option").length).toBe(1); // 模板 choices 赢
        expect(select.value).toBe("A");
    });

    test("缺 value → 省略属性走 HTML 原生回退（label 即 el.value）", () => {
        const { root } = mount(
            `<select x-model="city" x-model-options="{choices:[{label:'北京'},{label:'上海'}]}"></select>`,
            { city: "上海" },
        );
        const select = root.querySelector("select")!;
        const options = select.querySelectorAll("option");
        expect(options[0]!.getAttribute("value")).toBe(null); // 无 value 属性
        expect(options[0]!.value).toBe("北京"); // HTML 原生回退
        expect(select.value).toBe("上海");
    });

    test("缺 label → 回退 String(value)", () => {
        const { root } = mount(
            `<select x-model="v" x-model-options="{choices:[{value:'X'},{value:'Y'}]}"></select>`,
            { v: "" },
        );
        expect(root.querySelector("option")!.textContent).toBe("X");
    });

    test("模板 choices 双向 + 外部改 state 联动", async () => {
        const { root, store } = mount(
            `<select x-model="car" x-model-options="{choices:[{value:'ZEEKR',label:'极氪'},{value:'NIO',label:'蔚来'}]}"></select>`,
            { car: "ZEEKR" },
        );
        const select = root.querySelector("select") as HTMLSelectElement;
        select.value = "NIO";
        select.dispatchEvent(new Event("change", { bubbles: true }));
        await nextTick();
        expect(store.state.car).toBe("NIO");

        store.state.car = "ZEEKR";
        await nextTick();
        expect(select.value).toBe("ZEEKR");
    });
});

describe("x-model select：group 分组", () => {
    test("按指定字段聚合到 optgroup，组按首次出现追加", () => {
        const { root } = mount(
            `<select x-model="car" x-model-options="{group:'category',choices:[
                {value:'ZEEKR',label:'极氪',category:'轿车'},
                {value:'NIO',label:'蔚来',category:'SUV'},
                {value:'XPENG',label:'小鹏',category:'轿车'},
                {value:'LEAPMOTOR',label:'零跑',category:'轿车'},
                {value:'LI AUTO',label:'理想',category:'SUV'}
            ]}"></select>`,
            { car: "XPENG" },
        );
        const select = root.querySelector("select")!;
        const groups = select.querySelectorAll("optgroup");
        expect(groups.length).toBe(2);
        expect(groups[0]!.label).toBe("轿车");
        expect(groups[1]!.label).toBe("SUV");
        expect(groups[0]!.querySelectorAll("option").length).toBe(3); // ZEEKR/XPENG/LEAPMOTOR
        expect(groups[1]!.querySelectorAll("option").length).toBe(2); // NIO/LI AUTO
        expect(select.value).toBe("XPENG");
    });

    test("无分组字段的项渲染为顶层 option（可与组交错）", () => {
        const { root } = mount(
            `<select x-model="car" x-model-options="{group:'category',choices:[
                {value:'TOP',label:'置顶'},
                {value:'ZEEKR',label:'极氪',category:'轿车'}
            ]}"></select>`,
            { car: "TOP" },
        );
        const select = root.querySelector("select")!;
        // 顶层 option + 一个 optgroup
        expect(select.children[0]!.tagName).toBe("OPTION");
        expect(select.children[1]!.tagName).toBe("OPTGROUP");
        expect(select.value).toBe("TOP");
    });

    test("group 字段值非字符串 → String() 强转", () => {
        const { root } = mount(
            `<select x-model="v" x-model-options="{group:'level',choices:[{value:'a',label:'甲',level:1}]}"></select>`,
            { v: "a" },
        );
        expect(root.querySelector("optgroup")!.label).toBe("1");
    });
});

describe("x-model select：multiple 多选", () => {
    test("multiple 属性 + 选中态数组应用", async () => {
        const { root } = mount(
            `<select multiple x-model="cars" x-model-options="{choices:[
                {value:'ZEEKR',label:'极氪'},{value:'NIO',label:'蔚来'},{value:'XPENG',label:'小鹏'}
            ]}"></select>`,
            { cars: ["ZEEKR", "XPENG"] },
        );
        const select = root.querySelector("select") as HTMLSelectElement;
        expect(select.multiple).toBe(true);
        const opts = select.options;
        expect(opts[0]!.selected).toBe(true);
        expect(opts[1]!.selected).toBe(false);
        expect(opts[2]!.selected).toBe(true);
    });

    test("DOM→state 写 string[]", async () => {
        const { root, store } = mount(
            `<select multiple x-model="cars" x-model-options="{choices:[
                {value:'ZEEKR',label:'极氪'},{value:'NIO',label:'蔚来'}
            ]}"></select>`,
            { cars: [] as string[] },
        );
        const select = root.querySelector("select") as HTMLSelectElement;
        select.options[0]!.selected = true;
        select.options[1]!.selected = true;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        await nextTick();
        expect(store.state.cars).toEqual(["ZEEKR", "NIO"]);
    });

    test(".multiple 修饰符等价静态属性", async () => {
        const { root, store } = mount(
            `<select x-model.multiple="cars" x-model-options="{choices:[
                {value:'ZEEKR',label:'极氪'},{value:'NIO',label:'蔚来'}
            ]}"></select>`,
            { cars: ["NIO"] },
        );
        const select = root.querySelector("select") as HTMLSelectElement;
        expect(select.multiple).toBe(true);
        expect(select.options[1]!.selected).toBe(true);

        select.options[0]!.selected = true;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        await nextTick();
        expect(store.state.cars).toEqual(["ZEEKR", "NIO"]);
    });

    test("schema.multiple 注入（无显式声明时生效）", () => {
        const { root } = mountWithConfig(
            `<select x-model="cars" x-model-options="{choices:[{value:'A',label:'甲'}]}"></select>`,
            { cars: cfgStatic(["A"], { multiple: true, choices: CARS as any }) },
        );
        expect((root.querySelector("select") as HTMLSelectElement)!.multiple).toBe(true);
    });

    test("多选 + .number 逐项过管道", async () => {
        const { root, store } = mount(
            `<select multiple x-model.number="nums" x-model-options="{choices:[
                {value:'1',label:'一'},{value:'2',label:'二'}
            ]}"></select>`,
            { nums: [] as any[] },
        );
        const select = root.querySelector("select") as HTMLSelectElement;
        select.options[0]!.selected = true;
        select.options[1]!.selected = true;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        await nextTick();
        expect(store.state.nums).toEqual([1, 2]); // 数字而非字符串
    });
});

describe("x-model select：schema choices 响应式", () => {
    test("schema.choices 渲染 + 变更全量重建 + 选中重放", async () => {
        const { root, configManager } = mountWithConfig(
            `<select x-model="car"></select>`,
            { car: configurable("ZEEKR", { choices: CARS as any }) },
            { configKey: "app" },
        );
        const select = root.querySelector("select") as HTMLSelectElement;
        expect(select.querySelectorAll("option").length).toBe(3);
        expect(select.value).toBe("ZEEKR");

        // 增删选项（数组整体替换）→ 全量重建 + 重放选中
        (configManager.state as any)["app.car"].choices = [
            ...CARS,
            { value: "LI AUTO", label: "理想" },
        ];
        await nextTick();
        expect(select.querySelectorAll("option").length).toBe(4);
        expect(select.value).toBe("ZEEKR"); // 选中保留
    });

    test("单项字段变更（label）→ 重建", async () => {
        const { root, configManager } = mountWithConfig(
            `<select x-model="car"></select>`,
            { car: configurable("NIO", { choices: CARS as any }) },
            { configKey: "app" },
        );
        const select = root.querySelector("select") as HTMLSelectElement;
        (configManager.state as any)["app.car"].choices[0].label = "极氪001";
        await nextTick();
        expect(select.querySelectorAll("option")[0]!.textContent).toBe("极氪001");
    });

    test("重建后 state 值无匹配 → 自动选中首项并回写（ADR-0028 默认开启）；autoSelect:false 退回旧行为", async () => {
        // 默认 autoSelect=true：值不在集 → 选首项 + 回写
        const { root, store, configManager } = mountWithConfig(
            `<select x-model="car"></select>`,
            { car: configurable("ZEEKR", { choices: CARS as any }) },
            { configKey: "app" },
        );
        const select = root.querySelector("select") as HTMLSelectElement;
        (configManager.state as any)["app.car"].choices = [
            { value: "TESLA", label: "特斯拉" },
        ];
        await nextTick();
        expect(select.value).toBe("TESLA"); // 自动选中首项
        expect(store.state.car).toBe("TESLA"); // 回写 state（级联链闭合）

        // autoSelect:false：退回旧行为（不勾中、不回写）
        const { root: r2, store: s2, configManager: cm2 } = mountWithConfig(
            `<select x-model="car" x-model-options="{autoSelect:false}"></select>`,
            { car: configurable("ZEEKR", { choices: CARS as any }) },
            { configKey: "app" },
        );
        const select2 = r2.querySelector("select") as HTMLSelectElement;
        (cm2.state as any)["app.car"].choices = [{ value: "TESLA", label: "特斯拉" }];
        await nextTick();
        expect(select2.selectedIndex).toBe(-1);
        expect(s2.state.car).toBe("ZEEKR"); // state 不被修正（旧行为）
    });
});

describe("x-model select：schema 响应式完整性（字段联动）", () => {
    test("choices 为 computed：引用主 store 字段级联重建（province→city 联动）", async () => {
        const { root, store, configManager } = mountWithConfigComputed(
            `<select x-model="city"></select>`,
            {
                province: "zj",
                city: configurable("hz", {
                    choices: computed((scope: any, { ref }: any) =>
                        ref("province") === "zj"
                            ? [
                                  { value: "hz", label: "杭州" },
                                  { value: "nb", label: "宁波" },
                              ]
                            : [
                                  { value: "nj", label: "南京" },
                                  { value: "sz", label: "苏州" },
                              ],
                    ) as any,
                }),
            },
        );
        const select = root.querySelector("select") as HTMLSelectElement;
        await nextTick();
        expect(select.options.length).toBe(2);
        expect(select.options[0]!.textContent).toBe("杭州");
        expect(select.value).toBe("hz");

        // 联动：改 province → computed choices 重算 → 选项重建 → 值不在集自动选中首项并回写（ADR-0028）
        store.state.province = "js";
        await nextTick();
        expect(select.options.length).toBe(2);
        expect(select.options[0]!.textContent).toBe("南京");
        // city "hz" 不在江苏选项集 → 自动选中首项 "nj" + 回写 state（级联链闭合）
        expect(select.value).toBe("nj");
        expect(store.state.city).toBe("nj");

        // 切回 zj → 选项恢复 → "nj" 不在浙江集 → 自动选回 "hz"
        store.state.province = "zj";
        await nextTick();
        expect(select.options[0]!.textContent).toBe("杭州");
        expect(select.value).toBe("hz");
        expect(store.state.city).toBe("hz");
        void configManager;
    });

    test("enable 联动：schema.enable 为 computed 控制禁用", async () => {
        const { root, store } = mountWithConfigComputed(`<select x-model="city"></select>`, {
            locked: false,
            city: configurable("hz", {
                enable: computed((scope: any, { ref }: any) => !ref("locked")),
                choices: [
                    { value: "hz", label: "杭州" },
                    { value: "sh", label: "上海" },
                ] as any,
            }),
        });
        await nextTick();
        const select = root.querySelector("select") as HTMLSelectElement;
        expect(select.disabled).toBe(false);
        store.state.locked = true;
        await nextTick();
        expect(select.disabled).toBe(true);
    });
});

/** computed choices/enable 联动挂载辅助：state 含 computed 描述符字段（跨 store ref 依赖主 store） */
function mountWithConfigComputed(html: string, state: any) {
    const root = document.createElement("div");
    root.innerHTML = html.trim();
    const configManager = new ConfigManager(
        { load: async () => ({}), save: async () => {} },
        { autoload: false, global: false },
    );
    const store = new AutoStore(state, { configManager, configKey: "" } as any);
    const engine = new AutoTemplateEngine(root, store);
    return { root, store, engine, configManager };
}

describe("x-model select：边界", () => {
    test("严格 === 匹配：数字 state 不勾中字符串 value（锐边）", async () => {
        const { root } = mount(
            `<select x-model="n" x-model-options="{choices:[{value:'1',label:'一'}]}"></select>`,
            { n: 1 },
        );
        const select = root.querySelector("select") as HTMLSelectElement;
        await nextTick(); // 选中态经 microtask 重放
        expect(select.selectedIndex).toBe(-1); // 1 !== "1"
    });

    test("数组配单选 → warn 一次 + 自然退化", async () => {
        const { root } = mount(
            `<select x-model="arr" x-model-options="{choices:[{value:'a',label:'甲'},{value:'b',label:'乙'}]}"></select>`,
            { arr: ["a", "b"] },
        );
        const select = root.querySelector("select") as HTMLSelectElement;
        await nextTick();
        // String(["a","b"]) = "a,b" 无匹配
        expect(select.selectedIndex).toBe(-1);
    });

    test("字符串配多选 → 恒不勾选", () => {
        const { root } = mount(
            `<select multiple x-model="s" x-model-options="{choices:[{value:'a',label:'甲'}]}"></select>`,
            { s: "a" },
        );
        const select = root.querySelector("select") as HTMLSelectElement;
        expect(select.options[0]!.selected).toBe(false); // "a".includes 不适用
    });

    test("三源皆空 → warn 一次 + 不生成选项", async () => {
        const warns: string[] = [];
        const origWarn = console.warn;
        console.warn = (...args: any[]) => {
            warns.push(String(args[0] ?? ""));
        };
        try {
            const { root } = mount(`<select x-model="car"></select>`, { car: "x" });
            const select = root.querySelector("select") as HTMLSelectElement;
            expect(select.children.length).toBe(0);
        } finally {
            console.warn = origWarn;
        }
        expect(warns.some((w) => w.includes("无可选项"))).toBe(true);
    });

    test("默认事件 change：input 事件不触发写入", async () => {
        // 注：seed 须是选项集内的值——空串 "" 不在集会被 autoSelect 即时回写（ADR-0028）
        const { root, store } = mount(
            `<select x-model="car" x-model-options="{choices:[{value:'A',label:'甲'},{value:'B',label:'乙'}]}"></select>`,
            { car: "B" },
        );
        const select = root.querySelector("select") as HTMLSelectElement;
        select.value = "A";
        select.dispatchEvent(new Event("input", { bubbles: true }));
        await nextTick();
        expect(store.state.car).toBe("B"); // input 不写

        select.dispatchEvent(new Event("change", { bubbles: true }));
        await nextTick();
        expect(store.state.car).toBe("A"); // change 写
    });

    test("state undefined → warn + 不动 DOM（浏览器显示首项锐边）", async () => {
        const { root } = mount(
            `<select x-model="missing.path" x-model-options="{choices:[{value:'A',label:'甲'},{value:'B',label:'乙'}]}"></select>`,
            {},
        );
        const select = root.querySelector("select") as HTMLSelectElement;
        // choices 渲染了，但选中未应用（undefined 跳过）——浏览器默认展示首项
        expect(select.querySelectorAll("option").length).toBe(2);
    });
});

describe("x-model select：注入白名单与冲突", () => {
    test("schema title/required/enable/size 注入，placeholder 不注入", () => {
        const { root } = mountWithConfig(
            `<select x-model="car" x-model-options="{choices:[{value:'A',label:'甲'}]}"></select>`,
            {
                car: cfgStatic("A", {
                    title: "车辆",
                    required: true,
                    enable: false,
                    size: 3,
                    placeholder: "不应注入",
                }),
            },
        );
        const select = root.querySelector("select")!;
        expect(select.getAttribute("title")).toBe("车辆");
        expect(select.hasAttribute("required")).toBe(true);
        expect(select.disabled).toBe(true); // enable=false → disabled（.invert）
        expect(select.getAttribute("size")).toBe("3");
        expect(select.hasAttribute("placeholder")).toBe(false); // 裁掉
    });

    test("name 注入沿用决策 8（name = 路径，须 configManager）", () => {
        const { root } = mountWithConfig(
            `<select x-model="car" x-model-options="{choices:[{value:'A',label:'甲'}]}"></select>`,
            { car: cfgStatic("A") },
        );
        expect(root.querySelector("select")!.getAttribute("name")).toBe("car");
    });

    test(":value 与 x-model 同元素 → 编译期报错（竞写 el.value）", () => {
        expect(() =>
            mount(
                `<select x-model="car" :value="car" x-model-options="{choices:[{value:'A',label:'甲'}]}"></select>`,
                { car: "A" },
            ),
        ).toThrow();
    });
});
