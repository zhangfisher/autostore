/**
 * 场景 2：core + widgets/cron（按需引入完整链路）
 *
 * 期望：cron 键出现且配置获得真类型检查（AutoFieldCronOptions）。
 * 与场景 1 隔离在独立文件：同一编译单元内 declare module 合并会互相污染。
 */
import type { AutoStoreWidgets } from "autostore";
import "../src/core";
import "../src/widgets/cron";

type Widgets = keyof AutoStoreWidgets;

// cron 键必须存在
type HasCron = "cron" extends Widgets ? true : false;
const hasCron: HasCron = true;

// 精确类型检查：enableSeconds 是 boolean
import { configurable } from "autostore";
const store = {
    schedule: configurable("", {
        widget: "cron",
        enableSeconds: true,
    }),
};

// 反例：enableSeconds 非 boolean 应报错（证明键合并后走的是精确重载而非 string 回退）
const storeBad = {
    schedule: configurable("", {
        widget: "cron",
        // @ts-expect-error enableSeconds 必须是 boolean（AutoFieldCronOptions）
        enableSeconds: "yes",
    }),
};

export { hasCron, store, storeBad };