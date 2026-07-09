import { AutoStore, ConfigManager, configurable } from "../../src/index";

// 扩展全局的 AutoStoreWidgets 接口
declare module "../../src/index" {
    interface AutoStoreWidgets {
        number: {
            max: number;
            min: number;
            step?: number;
        };
        text: {
            maxLength: number;
            minLength: number;
            pattern?: RegExp | string;
        };
        select: {
            options: Array<{ label: string; value: any }>;
            multiple?: boolean;
        };
        checkbox: {
            trueValue?: any;
            falseValue?: any;
        };
    }
}

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
            max: "100", // @ts-expect-error
            min: 0,
        }),
    },
    { configManager, configKey: "test2" },
);

// 测试3：错误的 number widget 配置 - 缺少必需的 max 和 min
// 这会触发类型错误：缺少必需属性
const test3 = new AutoStore(
    {
        field: configurable(100, {
            label: "测试",
            widget: "number", // @ts-expect-error
        }),
    },
    { configManager, configKey: "test3" },
);

// 测试4：正确的 text widget 配置
const test4 = new AutoStore(
    {
        field: configurable("test", {
            label: "测试",
            widget: "text",
            maxLength: 100,
            minLength: 1,
            pattern: /^[a-z]+$/,
        }),
    },
    { configManager, configKey: "test4" },
);

// 测试5：错误的 text widget 配置 - maxLength 类型错误
// 这会触发类型错误：Type 'string' is not assignable to type 'number'
const test5 = new AutoStore(
    {
        field: configurable("test", {
            label: "测试",
            widget: "text",
            maxLength: "100", // @ts-expect-error
            minLength: 1,
        }),
    },
    { configManager, configKey: "test5" },
);

// 测试6：错误的 text widget 配置 - 缺少必需的 maxLength 和 minLength
// 这会触发类型错误：缺少必需属性
const test6 = new AutoStore(
    {
        field: configurable("test", {
            label: "测试",
            widget: "text", // @ts-expect-error
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
            options: [
                { label: "选项1", value: "option1" },
                { label: "选项2", value: "option2" },
            ],
            multiple: true,
        }),
    },
    { configManager, configKey: "test7" },
);

// 测试8：错误的 select widget 配置 - 缺少必需的 options
// 这会触发类型错误：缺少必需属性
const test8 = new AutoStore(
    {
        field: configurable("option1", {
            label: "测试",
            widget: "select", // @ts-expect-error
        }),
    },
    { configManager, configKey: "test8" },
);

// 测试9：正确的 checkbox widget 配置（所有属性都是可选的）
const test9 = new AutoStore(
    {
        field: configurable(true, {
            label: "测试",
            widget: "checkbox",
            trueValue: "yes",
            falseValue: "no",
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
