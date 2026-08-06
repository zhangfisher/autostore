/**
 * 微任务更新调度器
 *
 * 在细粒度响应式更新下，同一次用户操作（或 `store.batchUpdate`）可能触发
 * 多次状态变更，进而触发多个 watcher 回调。若每次回调都立即 patch DOM，
 * 会在同一个 tick 内产生多次 DOM 写入，既浪费又可能跨过 16ms 帧预算。
 *
 * 本调度器把"标脏"与"刷新"解耦：
 * - watcher 回调只调用 `schedule(updateFn)` 标记需要更新（轻量）；
 * - 真正的 DOM patch 推迟到 microtask 中统一执行。
 *
 * 同一个 tick 内多次 `schedule`：
 * - 若传入相同引用的 `updateFn`（指令/绑定在 `created` 时一次性创建闭包并复用），
 *   `Set` 会天然去重，只执行一次——即"一个绑定每 tick 至多 patch 一次"；
 * - `flush` 时 updateFn 应**重新在作用域上求值**，从而反映本 tick 内所有变更的累积结果。
 *
 * 因此指令侧的约定是：watcher 回调忽略具体 `operate`，仅触发 schedule；
 * updateFn 内部重新读取状态并 patch。这保证了正确性（取最新累积值）与性能（去重）。
 */
import type { AutoTemplateEngine } from "./engine";

export class UpdateScheduler {
    /** 待执行的更新回调集合（Set 天然按引用去重） */
    private queue: Set<() => void> = new Set();
    /** 是否已排队等待 microtask flush */
    private pending = false;
    /** 所属引擎：flush 时广播 render/flush 事件（门控于 listenerCount，无订阅≈零成本） */
    readonly engine: AutoTemplateEngine<any>;

    constructor(engine: AutoTemplateEngine<any>) {
        this.engine = engine;
    }

    /**
     * 调度一个更新回调。
     *
     * @param updateFn 稳定引用的更新函数（同一绑定应复用同一闭包以享受去重）
     */
    schedule(updateFn: () => void): void {
        this.queue.add(updateFn);
        if (!this.pending) {
            this.pending = true;
            queueMicrotask(() => this.flush());
        }
    }

    /**
     * 立即执行所有排队中的更新回调并清空队列。
     *
     * 先重置 `pending` 与队列快照，再逐个执行——执行期间新 `schedule` 的回调
     * 会进入新队列并重新排队下一次 microtask，从而正确处理级联更新。
     */
    flush(): void {
        this.engine.broadcast("render/flush/before");
        this.pending = false;
        const pending = this.queue;
        this.queue = new Set();
        for (const fn of pending) {
            try {
                fn();
            } catch (e) {
                // 单个回调失败不应阻塞其余回调或抛断 microtask
                console.error("[AutoTemplate] scheduler flush error:", e);
            }
        }
        this.engine.broadcast("render/flush/after");
    }

    /**
     * 同步执行所有排队回调，并持续消化执行期间新产生的级联回调，直到队列稳定。
     *
     * 供 `engine.compile` 在挂载后同步消化 x-for 嵌套等带来的多级首次渲染：
     * 单次 `flush` 只执行当前队列，级联产生的新回调（如外层 render 编译项模板时触发
     * 内层 x-for 的首次渲染）默认要等下一个 microtask——调用方需要"同步拿到完整 DOM"
     * 时应使用本方法。带循环上界保护，避免异常级联死循环。
     */
    flushAll(): void {
        let guard = 0;
        while (this.queue.size > 0 && guard++ < 1000) {
            this.flush();
        }
    }

    /**
     * 清空队列（引擎 `destroy` 时调用，丢弃尚未 flush 的回调）。
     */
    clear(): void {
        this.queue.clear();
        this.pending = false;
    }
}
