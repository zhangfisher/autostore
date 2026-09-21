export const SKIP_PROXY_FLAG = "__AS_SKIP_PROXY__";
// Symbol.for: 全局注册表键, 跨捆绑副本(如 IIFE 场景)仍可判别同一标记
export const SHALLOW_PROXY_FLAG = Symbol.for("__AS_SHALLOW_PROXY__");
// __AS_OBSERVER_DESCRIPTOR_BUILDER__
export const OBSERVER_TYPE_FLAG = "__OBSERVER_TYPE__";
export const OBSERVER_DESCRIPTOR_BUILDER_FLAG = "__AS_OBSERVER_DESCRIPTOR_BUILDER__";
export const OBSERVER_DESCRIPTOR_FLAG = "__AS_OBSERVER_DESCRIPTOR__";
export const PATH_DELIMITER = ".";
export const BATCH_UPDATE_EVENT = "__batch_update__";
export const ASYNC_COMPUTED_VALUE = "__AS_ASYNC_COMPUTED_VALUE__";
export const EMPTY = "__AS_EMPTY__";
export const DELETE_FLAG = "__AS_DELETE_FLAG__";
export const GLOBAL_CONFIG_MANAGER = "AutoStoreConfigManager";
