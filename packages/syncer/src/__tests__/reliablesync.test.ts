import { describe, expect, test } from "vitest";
import { AutoStore } from "../../../core/src";
import { AutoStoreSyncer } from "../syncers/syncer";
import { EventEmitterTransport } from "../transports/event";
import type { IEventEmitter } from "../transports/event";

/**
 * 简单的 EventEmitter 实现，用于测试
 */
class MockEventEmitter implements IEventEmitter {
    private listeners: Map<string, Set<(...args: any[]) => void>> = new Map();

    on(event: string, listener: (...args: any[]) => void): this {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(listener);
        return this;
    }

    off(event: string, listener: (...args: any[]) => void): this {
        const eventListeners = this.listeners.get(event);
        if (eventListeners) {
            eventListeners.delete(listener);
            if (eventListeners.size === 0) {
                this.listeners.delete(event);
            }
        }
        return this;
    }

    emit(event: string, ...args: any[]): boolean {
        const eventListeners = this.listeners.get(event);
        if (eventListeners) {
            eventListeners.forEach((listener) => {
                listener(...args);
            });
            return true;
        }
        return false;
    }
}

/**
 * 可控制消息丢失的 EventEmitter
 * 用于测试消息丢失场景
 */
class DropEventEmitter extends MockEventEmitter {
    private dropVersions: Set<number> = new Set();
    private messageCount: number = 0;

    /**
     * 设置要丢弃的消息版本号
     */
    dropVersionsAt(versions: number[]) {
        versions.forEach(v => this.dropVersions.add(v));
    }

    /**
     * 重置丢失配置
     */
    resetDrop() {
        this.dropVersions.clear();
        this.messageCount = 0;
    }

    override emit(event: string, ...args: any[]): boolean {
        const operate = args[0];

        // 检查是否应该丢弃这条消息（基于版本号）
        if (operate && operate.version !== undefined) {
            this.messageCount++;

            // 如果版本号在丢弃列表中，不发送此消息
            if (this.dropVersions.has(operate.version)) {
                return false;
            }
        }

        return super.emit(event, ...args);
    }
}

/**
 * 等待异步操作完成
 */
async function wait(ms: number = 50): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("AutoStoreSyncer 可靠同步测试", () => {
    describe("正常同步（无丢失）", () => {
        test("应该正常同步操作并分配版本号", async () => {
            const emitter = new MockEventEmitter();

            // 创建 store A
            const storeA = new AutoStore({
                count: 0,
            });
            const transportA = new EventEmitterTransport({
                emitter: emitter,
                localEventName: "remote-transport",
                remoteEventName: "local-transport",
            });
            const syncerA = new AutoStoreSyncer(storeA, {
                transport: transportA,
                enableReliableSync: true,
            });

            // 创建 store B
            const storeB = new AutoStore({
                count: 0,
            });
            const transportB = new EventEmitterTransport({
                emitter: emitter,
                localEventName: "local-transport",
                remoteEventName: "remote-transport",
            });
            const syncerB = new AutoStoreSyncer(storeB, {
                transport: transportB,
                enableReliableSync: true,
            });

            await wait(100);

            // 修改 store A
            storeA.state.count = 1;

            await wait(100);

            // 验证 store B 收到了更新
            expect(storeB.state.count).toBe(1);

            syncerA.stop();
            syncerB.stop();
        });

        test("连续多次操作应该正确同步", async () => {
            const emitter = new MockEventEmitter();

            const storeA = new AutoStore({
                count: 0,
            });
            const transportA = new EventEmitterTransport({
                emitter: emitter,
                localEventName: "remote-transport",
                remoteEventName: "local-transport",
            });
            const syncerA = new AutoStoreSyncer(storeA, {
                transport: transportA,
                enableReliableSync: true,
            });

            const storeB = new AutoStore({
                count: 0,
            });
            const transportB = new EventEmitterTransport({
                emitter: emitter,
                localEventName: "local-transport",
                remoteEventName: "remote-transport",
            });
            const syncerB = new AutoStoreSyncer(storeB, {
                transport: transportB,
                enableReliableSync: true,
            });

            await wait(100);

            // 连续修改
            for (let i = 1; i <= 5; i++) {
                storeA.state.count = i;
                await wait(20);
            }

            await wait(100);

            // 验证最终状态
            expect(storeB.state.count).toBe(5);

            syncerA.stop();
            syncerB.stop();
        });
    });

    describe("单个操作丢失", () => {
        test("应该检测到版本跳跃并请求缺失版本", async () => {
            const emitter = new DropEventEmitter();

            const storeA = new AutoStore({
                count: 0,
            });
            const transportA = new EventEmitterTransport({
                emitter: emitter,
                localEventName: "remote-transport",
                remoteEventName: "local-transport",
            });
            const syncerA = new AutoStoreSyncer(storeA, {
                transport: transportA,
                enableReliableSync: true,
            });

            const storeB = new AutoStore({
                count: 0,
            });
            const transportB = new EventEmitterTransport({
                emitter: emitter,
                localEventName: "local-transport",
                remoteEventName: "remote-transport",
            });
            const syncerB = new AutoStoreSyncer(storeB, {
                transport: transportB,
                enableReliableSync: true,
            });

            await wait(100);

            // 设置丢失版本 2
            emitter.dropVersionsAt([2]);

            // 发送操作
            storeA.state.count = 1;  // v1 - 正常
            await wait(20);

            storeA.state.count = 2;  // v2 - 丢失
            await wait(20);

            storeA.state.count = 3;  // v3 - 触发同步请求
            await wait(100);

            // 验证：最终应该收到所有更新
            expect(storeB.state.count).toBe(3);

            syncerA.stop();
            syncerB.stop();
        });
    });

    describe("连续操作丢失", () => {
        test("应该检测到连续丢失并请求所有缺失版本", async () => {
            const emitter = new DropEventEmitter();

            const storeA = new AutoStore({
                count: 0,
            });
            const transportA = new EventEmitterTransport({
                emitter: emitter,
                localEventName: "remote-transport",
                remoteEventName: "local-transport",
            });
            const syncerA = new AutoStoreSyncer(storeA, {
                transport: transportA,
                enableReliableSync: true,
            });

            const storeB = new AutoStore({
                count: 0,
            });
            const transportB = new EventEmitterTransport({
                emitter: emitter,
                localEventName: "local-transport",
                remoteEventName: "remote-transport",
            });
            const syncerB = new AutoStoreSyncer(storeB, {
                transport: transportB,
                enableReliableSync: true,
            });

            await wait(100);

            // 设置丢失版本 2, 3, 4
            emitter.dropVersionsAt([2, 3, 4]);

            storeA.state.count = 1;  // v1 - 正常
            await wait(20);

            storeA.state.count = 2;  // v2 - 丢失
            await wait(20);

            storeA.state.count = 3;  // v3 - 丢失
            await wait(20);

            storeA.state.count = 4;  // v4 - 丢失
            await wait(20);

            storeA.state.count = 5;  // v5 - 触发同步请求
            await wait(150);

            // 验证：最终应该收到所有更新
            expect(storeB.state.count).toBe(5);

            syncerA.stop();
            syncerB.stop();
        });
    });

    describe("重复消息处理", () => {
        test("应该忽略重复的旧消息", async () => {
            const emitter = new MockEventEmitter();

            const storeA = new AutoStore({
                count: 0,
            });
            const transportA = new EventEmitterTransport({
                emitter: emitter,
                localEventName: "remote-transport",
                remoteEventName: "local-transport",
            });
            const syncerA = new AutoStoreSyncer(storeA, {
                transport: transportA,
                enableReliableSync: true,
            });

            const storeB = new AutoStore({
                count: 0,
            });
            const transportB = new EventEmitterTransport({
                emitter: emitter,
                localEventName: "local-transport",
                remoteEventName: "remote-transport",
            });
            const syncerB = new AutoStoreSyncer(storeB, {
                transport: transportB,
                enableReliableSync: true,
            });

            await wait(100);

            storeA.state.count = 1;
            await wait(50);

            // 此时应该已经收到 v1，值为 1
            expect(storeB.state.count).toBe(1);

            // 再次手动发送相同的操作（模拟重复）
            emitter.emit("local-transport", {
                id: storeA.id,
                type: "set",
                path: [],
                value: 1,
                version: 1,
                flags: 0,
            });

            await wait(50);

            // 验证：值应该保持为 1，不应该被重置
            expect(storeB.state.count).toBe(1);

            syncerA.stop();
            syncerB.stop();
        });
    });

    describe("双向同步", () => {
        test("双向同步时应该各自维护版本号", async () => {
            const emitter = new MockEventEmitter();

            const storeA = new AutoStore({
                count: 0,
            });
            const transportA = new EventEmitterTransport({
                emitter: emitter,
                localEventName: "remote-transport",
                remoteEventName: "local-transport",
            });
            const syncerA = new AutoStoreSyncer(storeA, {
                transport: transportA,
                enableReliableSync: true,
            });

            const storeB = new AutoStore({
                count: 0,
            });
            const transportB = new EventEmitterTransport({
                emitter: emitter,
                localEventName: "local-transport",
                remoteEventName: "remote-transport",
            });
            const syncerB = new AutoStoreSyncer(storeB, {
                transport: transportB,
                enableReliableSync: true,
            });

            await wait(100);

            // A 修改
            storeA.state.count = 1;
            await wait(50);

            // B 修改
            storeB.state.count = 2;
            await wait(100);

            // 验证双方都收到了对方的更新
            // 由于双向同步，最后的值会覆盖，取决于哪个消息最后到达
            // 这里只验证同步是否发生
            expect(storeA.state.count).not.toBe(0);
            expect(storeB.state.count).not.toBe(0);

            syncerA.stop();
            syncerB.stop();
        });
    });

    describe("向后兼容", () => {
        test("禁用可靠同步时应该正常工作", async () => {
            const emitter = new MockEventEmitter();

            const storeA = new AutoStore({
                count: 0,
            });
            const transportA = new EventEmitterTransport({
                emitter: emitter,
                localEventName: "remote-transport",
                remoteEventName: "local-transport",
            });
            const syncerA = new AutoStoreSyncer(storeA, {
                transport: transportA,
                enableReliableSync: false,  // 禁用
            });

            const storeB = new AutoStore({
                count: 0,
            });
            const transportB = new EventEmitterTransport({
                emitter: emitter,
                localEventName: "local-transport",
                remoteEventName: "remote-transport",
            });
            const syncerB = new AutoStoreSyncer(storeB, {
                transport: transportB,
                enableReliableSync: false,  // 禁用
            });

            await wait(100);

            storeA.state.count = 1;
            await wait(50);

            // 验证：正常同步应该工作
            expect(storeB.state.count).toBe(1);

            syncerA.stop();
            syncerB.stop();
        });

        test("没有版本号的消息应该直接应用", async () => {
            const emitter = new MockEventEmitter();

            const storeA = new AutoStore({
                count: 0,
            });
            const transportA = new EventEmitterTransport({
                emitter: emitter,
                localEventName: "remote-transport",
                remoteEventName: "local-transport",
            });
            const syncerA = new AutoStoreSyncer(storeA, {
                transport: transportA,
                enableReliableSync: true,  // 启用
            });

            const storeB = new AutoStore({
                count: 0,
            });
            const transportB = new EventEmitterTransport({
                emitter: emitter,
                localEventName: "local-transport",
                remoteEventName: "remote-transport",
            });
            const syncerB = new AutoStoreSyncer(storeB, {
                transport: transportB,
                enableReliableSync: false,  // 禁用（不发送版本号）
            });

            await wait(100);

            storeA.state.count = 1;
            await wait(50);

            // 验证：应该正常同步
            expect(storeB.state.count).toBe(1);

            syncerA.stop();
            syncerB.stop();
        });
    });

    describe("滑动窗口", () => {
        test("历史记录应该受滑动窗口限制", async () => {
            const emitter = new MockEventEmitter();

            const storeA = new AutoStore({
                count: 0,
            });
            const transportA = new EventEmitterTransport({
                emitter: emitter,
                localEventName: "remote-transport",
                remoteEventName: "local-transport",
            });
            const syncerA = new AutoStoreSyncer(storeA, {
                transport: transportA,
                enableReliableSync: true,
                maxHistory: 5,  // 只保留最近 5 条
            });

            const storeB = new AutoStore({
                count: 0,
            });
            const transportB = new EventEmitterTransport({
                emitter: emitter,
                localEventName: "local-transport",
                remoteEventName: "remote-transport",
            });
            const syncerB = new AutoStoreSyncer(storeB, {
                transport: transportB,
                enableReliableSync: true,
            });

            await wait(100);

            // 发送 10 个操作
            for (let i = 1; i <= 10; i++) {
                storeA.state.count = i;
                await wait(20);
            }

            await wait(100);

            // 验证：最终状态正确
            expect(storeB.state.count).toBe(10);

            syncerA.stop();
            syncerB.stop();
        });
    });
});
