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

// 测试2：错误的 number widget 配置 - max 是 string
// 这会触发类型错误：Type 'string' is not assignable to type 'number'
const test2 = new AutoStore(
    {
        field: configurable(100, {
            label: "测试",
            widget: "number",
            max: 100,
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

// 测试5：错误的 text widget 配置 - maxlength 类型错误
// 这会触发类型错误：Type 'string' is not assignable to type 'number'
const test5 = new AutoStore(
    {
        field: configurable("test", {
            label: "测试",
            widget: "text",
            maxlength: 100,
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

// 测试7：正确的 select widget 配置
const test7 = new AutoStore(
    {
        field: configurable("option1", {
            label: "测试",
            widget: "select",
            multiple: true,
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

// 测试9：正确的 checkbox widget 配置（内置字段为 checked）
const test9 = new AutoStore(
    {
        field: configurable(true, {
            label: "测试",
            widget: "checkbox",
            checked: true,
        }),
    },
    { configManager, configKey: "test9" },
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
