/**
 * 全量入口（与按需产物并存，ADR-0005）
 *
 * = core 的全部公开 API + 全部 widget 的副作用注册。
 * 导出清单与拆分前逐字节等价级不变（回归红线，见 ADR-0005 验证门槛）。
 */
import "./widgets";
export * from "./core";
export * from "./widgets";
