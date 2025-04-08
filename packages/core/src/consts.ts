export const SKIP_PROXY_FLAG = Symbol('skip-proxy');
export const OBSERVER_DESCRIPTOR_BUILDER_FLAG = Symbol("observer-descriptor-builder")
export const OBSERVER_DESCRIPTOR_FLAG = Symbol("observer-descriptor")
export const PATH_DELIMITER = '.' 
export const BATCH_UPDATE_EVENT = '__batch_update__'
export const ASYNC_COMPUTED_VALUE = Symbol("AsyncComputedValue")
export const EMPTY = Symbol("EMPTY")
export const VALUE_SCHEMA = Symbol("ValueSchema")
export const DELETE_FLAG = Symbol("DeleteFlag")

// 同步时用来标识是否是循环
export const SYNC_CYCLE_FLAG = 1 
// 当第一次同步时的标识
export const SYNC_INIT_FLAG = 2
