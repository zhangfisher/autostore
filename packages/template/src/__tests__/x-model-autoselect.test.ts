import { describe, expect, test } from "bun:test";
import "./setup";
import { AutoStore, ConfigManager, computed, configurable } from "autostore";
import { AutoTemplateEngine } from "../engine";
import { mount, nextTick } from "./helpers";

/**
 * x-model select 自动选中测试（ADR-0028）。
 *
 * 机制：值不在渲染后选项集内 → 选中 choices 项 default:true 第一项（无则首项）+ 回写 state
 * （与用户手选同一 _writeToState 管道）。默认开启；autoSelect:false 退回旧行为（不勾中不回写）；
 * 模板 > schema 两级；类型不匹配/空选项集不触发；多选过滤式；静态 select 参与。
 */

describe("x-model autoSelect：单选", () => {
    test("默认开启：值不在集 → 自动选首项并回写", async () => {
        const { root, store } = mount(
            `<select x-model="car" x-model-options="{choices:[
                {value:'ZEEKR',label:'极氪'},{value:'NIO',label:'蔚来'}
            ]}"></select>`,
            { car: "TESLA" }, // 不在集
        );
        await nextTick();
        const select = root.querySelector("select") as HTMLSelectElement;
        expect(select.value).toBe("ZEEKR"); // 首项
        expect(store.state.car).toBe("ZEEKR"); // 回写
    });

    test("default:true 项优先于首项", async () => {
        const { root, store } = mount(
            `<select x-model="car" x-model-options="{choices:[
                {value:'A',label:'甲'},
                {value:'B',label:'乙',default:true},
                {value:'C',label:'丙'}
            ]}"></select>`,
            { car: "X" },
        );
        await nextTick();
        const select = root.querySelector("select") as HTMLSelectElement;
        expect(select.value).toBe("B");
        expect(store.state.car).toBe("B");
    });

    test("default:true 多项 → 取第一个命中", async () => {
        const { root, store } = mount(
            `<select x-model="car" x-model-options="{choices:[
                {value:'A',label:'甲'},
                {value:'B',label:'乙',default:true},
                {value:'C',label:'丙',default:true}
            ]}"></select>`,
            { car: "X" },
        );
        await nextTick();
        expect(store.state.car).toBe("B"); // 第一个 default:true
    });

    test("autoSelect:false → 旧行为（不勾中、不回写）", async () => {
        const { root, store } = mount(
            `<select x-model="car" x-model-options="{autoSelect:false,choices:[
                {value:'A',label:'甲'}
            ]}"></select>`,
            { car: "TESLA" },
        );
        await nextTick();
        const select = root.querySelector("select") as HTMLSelectElement;
        expect(select.selectedIndex).toBe(-1);
        expect(store.state.car).toBe("TESLA");
    });

    test("schema.autoSelect 声明（无模板声明时生效）", async () => {
        const root = document.createElement("div");
        root.innerHTML = `<select x-model="car"></select>`;
        const cm = new ConfigManager(
            { load: async () => ({}), save: async () => {} },
            { autoload: false, global: false },
        );
        const store = new AutoStore(
            { car: configurable("TESLA", { autoSelect: false, choices: [{ value: "A", label: "甲" }] as any }) },
            { configManager: cm, configKey: "app" } as any,
        );
        new AutoTemplateEngine(root, store);
        await nextTick();
        expect(store.state.car).toBe("TESLA"); // schema false 关闭

        const root2 = document.createElement("div");
        root2.innerHTML = `<select x-model="car"></select>`;
        const cm2 = new ConfigManager(
            { load: async () => ({}), save: async () => {} },
            { autoload: false, global: false },
        );
        const store2 = new AutoStore(
            { car: configurable("TESLA", { autoSelect: true, choices: [{ value: "A", label: "甲" }] as any }) },
            { configManager: cm2, configKey: "app" } as any,
        );
        new AutoTemplateEngine(root2, store2);
        await nextTick();
        expect(store2.state.car).toBe("A"); // schema true 开启
    });

    test("模板声明优先于 schema（模板 false 覆盖 schema true）", async () => {
        const root = document.createElement("div");
        root.innerHTML = `<select x-model="car" x-model-options="{autoSelect:false}"></select>`;
        const cm = new ConfigManager(
            { load: async () => ({}), save: async () => {} },
            { autoload: false, global: false },
        );
        const store = new AutoStore(
            { car: configurable("TESLA", { autoSelect: true, choices: [{ value: "A", label: "甲" }] as any }) },
            { configManager: cm, configKey: "app" } as any,
        );
        new AutoTemplateEngine(root, store);
        await nextTick();
        expect(store.state.car).toBe("TESLA"); // 模板 false 赢
    });

    test("类型不匹配（数字配单选）不触发自动选中（warn 维持）", async () => {
        const { root, store } = mount(
            `<select x-model="n" x-model-options="{choices:[{value:'1',label:'一'}]}"></select>`,
            { n: 99 },
        );
        await nextTick();
        const select = root.querySelector("select") as HTMLSelectElement;
        expect(select.selectedIndex).toBe(-1); // 类型错误不救
        expect(store.state.n).toBe(99);
    });

    test("空 choices → 静默不触发", async () => {
        const { root, store } = mount(
            `<select x-model="car" x-model-options="{choices:[]}"></select>`,
            { car: "TESLA" },
        );
        await nextTick();
        const select = root.querySelector("select") as HTMLSelectElement;
        expect(select.children.length).toBe(0);
        expect(store.state.car).toBe("TESLA"); // 无可选项不动
    });

    test("静态手写 option 的 select 同样参与", async () => {
        const { root, store } = mount(
            `<select x-model="car">
                <option value="A">甲</option>
                <option value="B">乙</option>
            </select>`,
            { car: "OUT" },
        );
        await nextTick();
        const select = root.querySelector("select") as HTMLSelectElement;
        expect(select.value).toBe("A"); // 静态首项
        expect(store.state.car).toBe("A");
    });

    test("ADR-0027 链式：default 回填值不在集 → 再走自动选中", async () => {
        const { root, store } = mount(
            `<select x-model="car" x-model-options="{default:'GONE',choices:[
                {value:'A',label:'甲'},{value:'B',label:'乙',default:true}
            ]}"></select>`,
            { car: null },
        );
        await nextTick();
        // 空值 → default 'GONE' → 不在集 → 自动选 default:true 的 B 并回写
        expect(store.state.car).toBe("B");
        expect((root.querySelector("select") as HTMLSelectElement).value).toBe("B");
    });
});

describe("x-model autoSelect：多选（过滤式）", () => {
    test("剔除数组中过期项并回写", async () => {
        const { root, store } = mount(
            `<select multiple x-model="cars" x-model-options="{choices:[
                {value:'A',label:'甲'},{value:'B',label:'乙'}
            ]}"></select>`,
            { cars: ["A", "X", "B", "Y"] }, // X/Y 过期
        );
        await nextTick();
        const select = root.querySelector("select") as HTMLSelectElement;
        expect(store.state.cars).toEqual(["A", "B"]); // 剔除过期项回写
        expect(select.options[0]!.selected).toBe(true);
        expect(select.options[1]!.selected).toBe(true);
    });

    test("全部过期 → 不勾不回写（合法空态）", async () => {
        const { root, store } = mount(
            `<select multiple x-model="cars" x-model-options="{choices:[
                {value:'A',label:'甲'}
            ]}"></select>`,
            { cars: ["X", "Y"] },
        );
        await nextTick();
        const select = root.querySelector("select") as HTMLSelectElement;
        expect(store.state.cars).toEqual([]); // 过滤为空回写（剔除全部过期项）
        expect(select.options[0]!.selected).toBe(false);
    });

    test("autoSelect:false → 过期项保留在 state（不过滤）", async () => {
        const { root, store } = mount(
            `<select multiple x-model="cars" x-model-options="{autoSelect:false,choices:[
                {value:'A',label:'甲'}
            ]}"></select>`,
            { cars: ["A", "X"] },
        );
        await nextTick();
        expect(store.state.cars).toEqual(["A", "X"]); // 不回写
    });
});

describe("x-model autoSelect：三级级联全链", () => {
    test("切省 → 市自动选中回写 → 区县随之自动选中（链路闭合）", async () => {
        const root = document.createElement("div");
        root.innerHTML = `
            <select x-model="province">
                <option value="fj">福建</option>
                <option value="gd">广东</option>
            </select>
            <select x-model="city"></select>
            <select x-model="district"></select>`;
        const cm = new ConfigManager(
            { load: async () => ({}), save: async () => {} },
            { autoload: false, global: false },
        );
        const store = new AutoStore(
            {
                province: "fj",
                city: configurable("fz", {
                    choices: computed((s: any, { ref }: any) =>
                        ref("province") === "fj"
                            ? [{ value: "fz", label: "福州" }, { value: "xm", label: "厦门" }]
                            : [{ value: "gz", label: "广州" }, { value: "dg", label: "东莞" }],
                    ) as any,
                }),
                district: configurable("gl_fz", {
                    choices: computed((s: any, { ref }: any) =>
                        ref("city") === "fz"
                            ? [{ value: "gl_fz", label: "鼓楼区" }, { value: "tj", label: "台江区" }]
                            : [{ value: "th", label: "天河区" }],
                    ) as any,
                }),
            },
            { configManager: cm, configKey: "" } as any,
        );
        new AutoTemplateEngine(root, store);
        const selects = root.querySelectorAll("select") as NodeListOf<HTMLSelectElement>;
        await nextTick();
        // 初始：福建·福州·鼓楼区
        expect(selects[1].value).toBe("fz");
        expect(selects[2].value).toBe("gl_fz");

        // 用户切广东 → 市自动选中（gz 首项）+ 回写 → 区县自动选中（th）
        selects[0].value = "gd";
        selects[0].dispatchEvent(new Event("change", { bubbles: true }));
        await nextTick();
        expect(store.state.province).toBe("gd");
        expect(store.state.city).toBe("gz"); // 自动选中回写（级联链闭合）
        expect(selects[1].value).toBe("gz");
        expect(store.state.district).toBe("th"); // 二级自动跟进
        expect(selects[2].value).toBe("th");

        // 切回福建 → 链路反向归位
        selects[0].value = "fj";
        selects[0].dispatchEvent(new Event("change", { bubbles: true }));
        await nextTick();
        expect(store.state.city).toBe("fz");
        expect(store.state.district).toBe("gl_fz");
    });

    test("default:true 标记的市成为切换后的选中项", async () => {
        const root = document.createElement("div");
        root.innerHTML = `
            <select x-model="province">
                <option value="fj">福建</option>
                <option value="gd">广东</option>
            </select>
            <select x-model="city"></select>`;
        const cm = new ConfigManager(
            { load: async () => ({}), save: async () => {} },
            { autoload: false, global: false },
        );
        const store = new AutoStore(
            {
                province: "fj",
                city: configurable("fz", {
                    choices: computed((s: any, { ref }: any) =>
                        ref("province") === "fj"
                            ? [{ value: "fz", label: "福州" }]
                            : [{ value: "gz", label: "广州" }, { value: "sz_gd", label: "深圳", default: true }],
                    ) as any,
                }),
            },
            { configManager: cm, configKey: "" } as any,
        );
        new AutoTemplateEngine(root, store);
        const selects = root.querySelectorAll("select") as NodeListOf<HTMLSelectElement>;
        await nextTick();
        selects[0].value = "gd";
        selects[0].dispatchEvent(new Event("change", { bubbles: true }));
        await nextTick();
        expect(store.state.city).toBe("sz_gd"); // default:true 的深圳（非首项广州）
    });
});
