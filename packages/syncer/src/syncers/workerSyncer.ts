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
 * 【重要：关于 peers 和 id 的处理】
 * 当指定 peers 选项时，如果没有明确指定 id，
 * 会自动使用 peers[0] 作为 syncer 的 id。
 * 这样发送消息时，operate.id 就是目标 store 的 id，而不是本地 store 的 id。
 *
 * 这对于使用 AutoStoreSwitchSyncer 的场景特别重要，
 * 因为 SwitchSyncer 需要根据 operate.id 路由消息到正确的 store。
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
 *     peers: ['remote-store-id'], // 会自动使用 'remote-store-id' 作为 id
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

        // 准备最终选项
        const finalOptions = {
            mode: "pull",
            immediate: true,
            direction: "both",
            ...options,
            transport,
            // 添加 onSend 钩子，在发送消息时修改 operate.id
            // 这样当使用 peers 时，发送的 operate.id 会是目标 store 的 id（peers[0]），
            // 而不是本地 store 的 id，让 SwitchSyncer 可以正确路由消息
            // 同时，syncer 的 this.id 保持为本地 store 的 id，避免消息过滤问题
            onSend: (operate: any) => {
                // 如果有 peers，将 operate.id 设置为第一个 peer（目标 store 的 id）
                if (finalOptions.peers && finalOptions.peers.length > 0) {
                    operate.id = finalOptions.peers[0];
                }
                // 调用用户提供的 onSend 钩子（如果有）
                if (options.onSend) {
                    return options.onSend.call(this, operate);
                }
                return true;
            },
        } as AutoStoreWorkerSyncerOptions & { transport: WorkerTransport };

        // 调用父类构造函数
        super(store, finalOptions);

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

    /**
     * 重写 pull 方法
     * 当使用 peers 时，发送的 $pull 消息的 id 应该是目标 store 的 id（peers[0]）
     * 而不是本地 store 的 id，这样 SwitchSyncer 才能正确路由消息
     */
    pull(): void {
        // 如果有 peers，使用第一个 peer 作为目标 store 的 id
        const targetId = (this.options.peers && this.options.peers.length > 0)
            ? this.options.peers[0]
            : this.id;

        // 手动发送 $pull 消息，使用正确的 id
        this.transport.send({
            id: targetId,
            type: "$pull",
            path: this.options.remote,
            value: undefined,
            flags: 0,
        } as any);
    }
}
