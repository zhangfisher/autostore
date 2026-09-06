/**
 * 场景 1：只引 core（按需引入的最小前置）
 *
 * 期望：AutoStoreWidgets 不含 cron 键——
 * core 产物只带 input（隐式默认 widget），cron 键随 widgets/cron 产物走。
 * 若此文件编译报错（cron 键意外存在），说明 core 入口夹带了全量键表。
 */
import type { AutoStoreWidgets } from "autostore";
import "../src/core";

type Widgets = keyof AutoStoreWidgets;

// input 是 core 契约的一部分（schema.widget 未声明时的隐式取值）
type HasInput = Widgets extends string ? ("input" extends Widgets ? true : false) : never;
const hasInput: HasInput = true;

// cron 不应存在：core-only 场景下引 cron 产物之前，cron 键不可见。
// 用条件类型把「cron 存在」翻译成 never，赋值 true 即编译错误。
type HasCron = "cron" extends Widgets ? true : false;
// @ts-expect-error core 不夹带 cron 键：HasCron 应为 false，true 不可赋值
const hasCron: HasCron = true;

// widget: "cron" 应落入 string 回退（无精确类型），enableSeconds 不被识别不报错
import { configurable } from "autostore";
const store = {
    schedule: configurable("", {
        widget: "cron",
        // enableSeconds 在 core-only 场景下无类型（键不存在，落入回退），不报错
        enableSeconds: "anything-goes-without-cron-entry",
    }),
};

export { hasInput, hasCron, store };