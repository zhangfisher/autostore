import { AutoStore, ConfigManager, configurable } from "../../src/index";

const configManager = new ConfigManager({
    load: () => ({}),
});

// 测试1：正确的 number widget 配置
const test1 = new AutoStore(
    {
        field: configurable(100, {
            label: "测试",
            widget: "number",
            max: 100,
            min: 0,
            step: 1,
        }),
    },
    { configManager, configKey: "test1" },
);

// 测试2：错误的 number widget 配置 - max 是 string（真反例：@ts-expect-error 断言确实报错）
const test2 = new AutoStore(
    {
        field: configurable(100, {
            label: "测试",
            widget: "number",
            // @ts-expect-error max 必须是 number
            max: "100",
            min: 0,
        }),
    },
    { configManager, configKey: "test2" },
);

// 测试3：number widget 配置 - 字段都是可选的，可以只提供部分
const test3 = new AutoStore(
    {
        field: configurable(100, {
            label: "测试",
            widget: "number",
        }),
    },
    { configManager, configKey: "test3" },
);

// 测试4：正确的 text widget 配置（内置字段名为 maxlength/minlength）
const test4 = new AutoStore(
    {
        field: configurable("test", {
            label: "测试",
            widget: "text",
            maxlength: 100,
            minlength: 1,
            pattern: "^[a-z]+$",
        }),
    },
    { configManager, configKey: "test4" },
);

// 测试5：错误的 text widget 配置 - maxlength 类型错误（真反例）
const test5 = new AutoStore(
    {
        field: configurable("test", {
            label: "测试",
            widget: "text",
            // @ts-expect-error maxlength 必须是 number
            maxlength: "100",
            minlength: 1,
        }),
    },
    { configManager, configKey: "test5" },
);

// 测试6：text widget 配置 - 字段都是可选的
const test6 = new AutoStore(
    {
        field: configurable("test", {
            label: "测试",
            widget: "text",
        }),
    },
    { configManager, configKey: "test6" },
);

// 测试7：正确的 select widget 配置（含 choices 候选项与 labelKey）
const test7 = new AutoStore(
    {
        field: configurable("option1", {
            label: "测试",
            widget: "select",
            multiple: true,
            choices: [
                { label: "选项一", value: "option1" },
                "option2",
            ],
            labelKey: "name",
            valueKey: "id",
        }),
    },
    { configManager, configKey: "test7" },
);

// 测试8：select widget 配置 - 字段都是可选的
const test8 = new AutoStore(
    {
        field: configurable("option1", {
            label: "测试",
            widget: "select",
        }),
    },
    { configManager, configKey: "test8" },
);

// 测试8b：错误的 select widget 配置 - value 坍缩已修复，number 值不与 widget 的 value 声明冲突
const test8b = new AutoStore(
    {
        field: configurable(100, {
            label: "测试",
            widget: "select",
        }),
    },
    { configManager, configKey: "test8b" },
);

// 测试9：正确的 checkbox widget 配置（form 实际消费 switchValues，非 HTML 原生 checked）
const test9 = new AutoStore(
    {
        field: configurable(true, {
            label: "测试",
            widget: "checkbox",
            switchValues: [true, false],
        }),
    },
    { configManager, configKey: "test9" },
);

// 测试9b：错误的 checkbox widget 配置 - checked 不是其配置键（真反例）
const test9b = new AutoStore(
    {
        field: configurable(true, {
            label: "测试",
            widget: "checkbox",
            // @ts-expect-error checkbox 的配置键是 switchValues（form 实际消费），不是 HTML 原生 checked
            checked: true,
        }),
    },
    { configManager, configKey: "test9b" },
);

// 测试10：不使用 widget 的配置
const test10 = new AutoStore(
    {
        field: configurable(100, {
            label: "测试",
        }),
    },
    { configManager, configKey: "test10" },
);

// 测试11：base 新增的 HTML 通用输入态键（ADR-0004）
const test11 = new AutoStore(
    {
        field: configurable("x", {
            disabled: true,
            readOnly: true,
            clearable: true,
        }),
    },
    { configManager, configKey: "test11" },
);

// 测试11b：disabled 类型反例
const test11b = new AutoStore(
    {
        field: configurable("x", {
            // @ts-expect-error disabled 必须是 boolean
            disabled: "yes",
        }),
    },
    { configManager, configKey: "test11b" },
);

// 测试12：labelPos 经 BaseInputAttributes 对全体 widget 生效（Q31-A）
const test12 = new AutoStore(
    {
        field: configurable(100, {
            widget: "number",
            labelPos: "top",
        }),
    },
    { configManager, configKey: "test12" },
);

// 测试13：未收录的 widget 字面量走回退重载（模块扩展的固有特性，Q23-A）——仅 base 键可用
const test13 = new AutoStore(
    {
        field: configurable(true, {
            widget: "not-exist-widget",
            label: "任意控件名",
        }),
    },
    { configManager, configKey: "test13" },
);

// 测试14：widget 属性允许 ComputedBuilder（与运行时一致，ADR-0004）
import { computed } from "../../src/index";
const test14 = new AutoStore(
    {
        base: 100,
        field: configurable(100, {
            widget: "number",
            min: computed(function (this: any) {
                return 0;
            }),
        }),
    },
    { configManager, configKey: "test14" },
);
