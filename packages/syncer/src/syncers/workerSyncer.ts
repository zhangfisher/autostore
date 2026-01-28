import type { AutoStore } from "autostore";
import { AutoStoreSyncer } from "../syncer";
import { WorkerTransport } from "../transports/worker";
import type { IWorker, WorkerTransportOptions } from "../transports/worker";
import type { AutoStoreSyncerOptions } from "../types";

/**
 * SharedWorker 接口定义
 */
interface ISharedWorker {
    port: IWorker & { start?: () => void };
}

/**
 * 判断是否是 SharedWorker
 */
function isSharedWorker(worker: any): worker is ISharedWorker {
    return worker && typeof worker.port === "object" && worker.port !== null;
}

/**
 * AutoStoreWorkerSyncer 配置选项
 *
 * 继承 AutoStoreSyncerOptions，但不需要指定 transport
 * 因为 transport 会自动从 worker 创建
 */
export type AutoStoreWorkerSyncerOptions = Omit<AutoStoreSyncerOptions, "transport">;

/**
 * 基于 Worker 的 AutoStore 同步器
 *
 * 简化了 WorkerTransport + AutoStoreSyncer 的使用
 * 自动处理 transport 创建和 worker.port.start()
 *
 * @example 使用 SharedWorker
 * ```typescript
 * const worker = new SharedWorker(new URL('./worker.ts', import.meta.url), {
 *     type: 'module',
 *     name: 'my-worker',
 * });
 *
 * const syncer = new AutoStoreWorkerSyncer(store, worker, {
 *     mode: 'pull',
 *     immediate: true,
 *     direction: 'both',
 *     peers: ['remote-store-id'],
 *     remote: 'shared',
 * });
 * ```
 *
 * @example 使用普通 Worker
 * ```typescript
 * const worker = new Worker(new URL('./worker.ts', import.meta.url), {
 *     type: 'module',
 * });
 *
 * const syncer = new AutoStoreWorkerSyncer(store, worker, {
 *     mode: 'pull',
 *     immediate: true,
 * });
 * ```
 */
export class AutoStoreWorkerSyncer extends AutoStoreSyncer {
    /**
     * Worker 实例
     * 对于 SharedWorker，这是 SharedWorker 实例
     * 对于普通 Worker，这是 Worker 实例
     */
    readonly worker: IWorker | ISharedWorker;

    /**
     * 创建 Worker 同步器
     *
     * @param store AutoStore 实例
     * @param worker Worker 或 SharedWorker 实例
     * @param options 同步配置选项
     */
    constructor(
        store: AutoStore<any>,
        worker: IWorker | ISharedWorker,
        options: AutoStoreWorkerSyncerOptions = {},
    ) {
        // 获取实际的 worker（对于 SharedWorker 使用 port）
        const actualWorker: IWorker = isSharedWorker(worker) ? worker.port : worker;

        // 创建 WorkerTransport
        const transport = new WorkerTransport({
            worker: actualWorker,
        } as WorkerTransportOptions);

        // 调用父类构造函数
        super(store, {
            mode: "pull",
            immediate: true,
            direction: "both",
            ...options,
            transport,
        });

        this.worker = worker;

        // 对于 SharedWorker，自动调用 port.start()
        if (isSharedWorker(worker) && typeof worker.port.start === "function") {
            worker.port.start();
        }
    }

    /**
     * 获取实际的 worker（用于通信的 worker）
     * 对于 SharedWorker 返回 port，对于普通 Worker 返回自身
     */
    get actualWorker(): IWorker {
        return isSharedWorker(this.worker) ? this.worker.port : this.worker;
    }
}
