/**
 * form 包 widget 类型模块扩展测试（ADR-0004）
 *
 * 验证：
 * 1. declare module "autostore" 合并生效：form 独有 widget 键可被 schema() 识别
 * 2. form widget 配置获得真类型检查
 * 3. 重叠键（core 已收录）沿用 core 定义
 */
import { configurable } from "autostore";
// 引入 form 即触发全部 widget 文件的 declare module（入口已显式保证）
import "../src";

// 测试1：form 独有键 switch 获得 switchValues 检查
const store1 = {
    enabled: configurable(true, {
        widget: "switch",
        switchValues: [true, false],
        checkLabel: "启用",
    }),
};

// 测试2：switch 的 switchValues 类型反例
const store2 = {
    enabled: configurable(true, {
        widget: "switch",
        // @ts-expect-error switchValues 是 [any, any] 元组
        switchValues: "on",
    }),
};

// 测试3：rating 的 max/precision 检查
const store3 = {
    score: configurable(3, {
        widget: "rating",
        max: 5,
        precision: 0.5,
    }),
};

// 测试4：rating 的 precision 类型反例
const store4 = {
    score: configurable(3, {
        widget: "rating",
        // @ts-expect-error precision 必须是 number
        precision: "half",
    }),
};

// 测试5：input 的 inputType 字面量检查
const store5 = {
    port: configurable("", {
        widget: "input",
        inputType: "number",
        prefix: "端口 ",
    }),
};

// 测试6：input 的 inputType 反例
const store6 = {
    port: configurable("", {
        widget: "input",
        // @ts-expect-error inputType 必须是合法 InputType 字面量
        inputType: "spinner",
    }),
};

// 测试7：重叠键 select 沿用 core 定义（choices/valueKey/labelKey/renderItem）
const store7 = {
    city: configurable("beijing", {
        widget: "select",
        choices: [
            { label: "北京", value: "beijing" },
            { label: "上海", value: "shanghai" },
        ],
        labelKey: "name",
        renderItem: "<b>{label}</b>",
        placement: "top",
        maxOptionsVisible: 3,
    }),
};

// 测试8：select 的 placement 反例
const store8 = {
    city: configurable("beijing", {
        widget: "select",
        // @ts-expect-error placement 是限定方位字面量
        placement: "diagonal",
    }),
};

// 测试9：choices 候选项正名（base 键，所有选项类 widget 可用）
const store9 = {
    gender: configurable("male", {
        widget: "radio",
        choices: ["male", "female"],
    }),
};

// 测试10：cascader 的树形配置
const store10 = {
    region: configurable("", {
        widget: "cascader",
        choices: [
            { id: 1, label: "华北", children: [{ id: 11, label: "北京" }] },
        ],
        childrenKey: "children",
        maxLevel: 3,
    }),
};

// 测试11：base 新增 HTML 通用键（disabled/readOnly/clearable）
const store11 = {
    name: configurable("", {
        disabled: true,
        readOnly: false,
        clearable: true,
    }),
};

// 测试12：verifycode 的 timeout 元组形态
const store12 = {
    code: configurable("", {
        widget: "verifycode",
        timeout: [120000, 1000],
        sendTips: "获取验证码",
    }),
};

export { store1, store3, store5, store7, store9, store10, store11, store12 };
