/**
 * 全量入口（与按需产物并存，ADR-0005）
 *
 * = core 的全部公开 API + 全部 widget 的副作用注册。
 * 导出清单与拆分前逐字节等价级不变（回归红线，见 ADR-0005 验证门槛）。
 *
 * ADR-0006：重导出 autostore 全量 API。
 * - IIFE 产物：autostore 随包捆绑，单 script 即拿到完整生态，
 *   重导出的 API（如 AutoForm.configurable）与捆绑副本同源。
 * - ESM 产物：autostore 保持 external，re-export 解析到消费者
 *   自装的同一份单例，不引入第二副本。
 */
import "./widgets";
export * from "./core";
export * from "./widgets";
export * from "autostore";
// MutableRecord 与 autostore 同名不同形：两个 star export 冲突时该名字会被
// 静默排除，显式 re-export 本包版本消歧（autostore 版本经 'autostore' 直接导入）
export type { MutableRecord } from "./types";
