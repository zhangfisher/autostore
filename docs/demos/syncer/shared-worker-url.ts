// SharedWorker 公共 URL（三个 demo 共用同一实例）
// 版本参数用于强制浏览器重建 SharedWorker：浏览器对同一 URL 的 SharedWorker 进程级复用，
// 修改 shared-worker.js 后旧实例不会自动替换，必须变更 URL（改此版本号）才会重新加载
export const SHARED_WORKER_URL = '/autostore/demos/syncer/shared-worker.js?v=3';
