/**
 * 按需引入的类型链测试（ADR-0005 决策 6）
 *
 * 验证 per-widget d.ts 的 declare module "autostore" 键合并
 * 与运行时按需语义严格对齐：
 * 1. 只引 core（./core）时，AutoStoreWidgets 不含 cron 键——
 *    core 没有偷偷夹带全量键表（拆分最可能静默发生的回归）
 * 2. 引 core + widgets/cron 时，cron 键出现且类型为 AutoFieldCronOptions
 *
 * 注意：本文件通过 tsc --noEmit 验证，两个场景必须隔离在独立文件中
 * （同一编译单元内 declare module 合并会互相污染），
 * 场景文件见 widget-entry-core-only.test-d.ts / widget-entry-with-cron.test-d.ts
 */
export {};