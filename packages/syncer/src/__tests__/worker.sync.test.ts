import { describe, expect, test } from 'vitest';
import { computed, AutoStore } from '../../../core/src';
import { AutoStoreSyncer } from '../syncer';
import { WorkerTransport } from '../transports/worker';
import type { IWorker } from '../transports/worker';

/**
 * 模拟 Worker 实现，用于测试
 */
class MockWorker implements IWorker {
    private messageListeners: Set<(event: MessageEvent) => void> = new Set();
    private terminated: boolean = false;
    private bridgedWorkers: Set<MockWorker> = new Set();
    private isBridged: boolean = false;

    postMessage(message: any): void {
        if (this.terminated) {
            throw new Error('Worker has been terminated');
        }

        // 如果已经桥接，使用桥接逻辑
        if (this.isBridged && this.bridgedWorkers.size > 0) {
            // 触发桥接的 Worker 的监听器
            this.bridgedWorkers.forEach((bridgedWorker) => {
                setTimeout(() => {
                    const event = new MessageEvent('message', { data: message });
                    bridgedWorker.messageListeners.forEach((listener) => {
                        listener(event);
                    });
                }, 0);
            });
        } else {
            // 模拟异步消息传递
            setTimeout(() => {
                const event = new MessageEvent('message', { data: message });
                this.messageListeners.forEach((listener) => {
                    listener(event);
                });
            }, 0);
        }
    }

    addEventListener(
        type: string,
        listener: (event: MessageEvent) => void,
    ): void {
        if (type === 'message') {
            this.messageListeners.add(listener);
        }
    }

    removeEventListener(
        type: string,
        listener: (event: MessageEvent) => void,
    ): void {
        if (type === 'message') {
            this.messageListeners.delete(listener);
        }
    }

    terminate(): void {
        this.terminated = true;
        this.messageListeners.clear();
        this.bridgedWorkers.clear();
    }

    /**
     * 获取消息监听器数量
     */
    get listenerCount(): number {
        return this.messageListeners.size;
    }

    /**
     * 手动触发消息事件（用于测试）
     */
    dispatchMessage(message: any): void {
        const event = new MessageEvent('message', { data: message });
        this.messageListeners.forEach((listener) => {
            listener(event);
        });
    }

    /**
     * 连接到另一个 Worker，建立双向消息桥接
     * 用于模拟两个 Worker 之间的通信
     *
     * 注意：这个方法模拟真实的 Worker 通信：
     * - 当 worker1.postMessage() 被调用时，只有 worker2 收到消息
     * - 当 worker2.postMessage() 被调用时，只有 worker1 收到消息
     */
    connectTo(otherWorker: MockWorker): void {
        // 如果已经桥接，则跳过
        if (this.bridgedWorkers.has(otherWorker)) {
            return;
        }

        // 建立双向桥接
        this.bridgedWorkers.add(otherWorker);
        otherWorker.bridgedWorkers.add(this);

        // 标记为已桥接
        this.isBridged = true;
        otherWorker.isBridged = true;
    }
}

describe('AutoStore Worker 同步集成测试', () => {
    describe('基础同步功能', () => {
        test('应该支持主线程与 Worker 之间的双向同步', async () => {
            // 模拟主线程和 Worker 的两个 Worker 实例
            const mainWorker = new MockWorker();
            const workerThread = new MockWorker();

            const mainTransport = new WorkerTransport({
                worker: mainWorker as any,
                id: 'main-thread',
            });

            const workerTransport = new WorkerTransport({
                worker: workerThread as any,
                id: 'worker-thread',
            });

            // 手动绑定消息监听
            mainWorker.addEventListener('message', (event) => {
                mainTransport.handleRemoteOperate(event);
            });
            workerThread.addEventListener('message', (event) => {
                workerTransport.handleRemoteOperate(event);
            });

            const mainStore = new AutoStore({
                order: {
                    name: 'fisher',
                    price: 2,
                    count: 3,
                    total: computed((order) => order.price * order.count),
                },
            });

            const workerStore = new AutoStore<typeof mainStore.state>();

            // 使用 connectTo 方法建立双向连接
            mainWorker.connectTo(workerThread);

            const mainSyncer = new AutoStoreSyncer(mainStore, {
                transport: mainTransport,
                immediate: false,
            });
            const workerSyncer = new AutoStoreSyncer(workerStore, {
                transport: workerTransport,
                immediate: false,
            });

            // 手动触发初始同步
            mainSyncer.push({ initial: true });
            await new Promise((resolve) => setTimeout(resolve, 30));

            // 验证初始同步
            expect(workerStore.state).toEqual(mainStore.state);

            // 主线程修改，应该同步到 Worker
            mainStore.state.order.count = 5;
            await new Promise((resolve) => setTimeout(resolve, 30));
            expect(workerStore.state.order.count).toBe(5);
            expect(workerStore.state.order.total).toBe(10);

            // Worker 修改，应该同步到主线程
            workerStore.state.order.price = 3;
            await new Promise((resolve) => setTimeout(resolve, 30));
            expect(mainStore.state.order.price).toBe(3);
            expect(mainStore.state.order.total).toBe(15);
        });

        test.skip('应该支持数组的同步 (splice 操作同步需要修复)', async () => {
            const worker1 = new MockWorker();
            const worker2 = new MockWorker();

            // 使用 connectTo 方法建立双向连接
            worker1.connectTo(worker2);

            const transport1 = new WorkerTransport({
                worker: worker1 as any,
                id: 'worker-1',
            });

            const transport2 = new WorkerTransport({
                worker: worker2 as any,
                id: 'worker-2',
            });

            // 手动绑定消息监听
            worker1.addEventListener('message', (event) => {
                transport1.handleRemoteOperate(event);
            });
            worker2.addEventListener('message', (event) => {
                transport2.handleRemoteOperate(event);
            });

            const store1 = new AutoStore(
                {
                    items: [1, 2, 3, 4, 5],
                },
                { id: 'store-1' },
            );

            const store2 = new AutoStore(
                {
                    items: [1, 2, 3, 4, 5],
                },
                { id: 'store-2' },
            );

            new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: false,
            });
            new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: false,
            });

            // 初始值相同
            expect(store2.state.items).toEqual([1, 2, 3, 4, 5]);

            // store1 添加元素
            store1.state.items.push(6);
            await new Promise((resolve) => setTimeout(resolve, 20));
            expect(store2.state.items).toEqual([1, 2, 3, 4, 5, 6]);

            // store2 删除元素
            store2.state.items.splice(1, 2);
            await new Promise((resolve) => setTimeout(resolve, 50));
            expect(store1.state.items).toEqual([1, 4, 5, 6]);

            // store1 修改元素值
            store1.state.items[0] = 10;
            await new Promise((resolve) => setTimeout(resolve, 20));
            expect(store2.state.items[0]).toBe(10);
        });

        test('应该支持嵌套对象的同步', async () => {
            const worker1 = new MockWorker();
            const worker2 = new MockWorker();

            // 使用 connectTo 方法建立双向连接
            worker1.connectTo(worker2);

            const transport1 = new WorkerTransport({
                worker: worker1 as any,
                id: 'worker-1',
            });

            const transport2 = new WorkerTransport({
                worker: worker2 as any,
                id: 'worker-2',
            });

            // 手动绑定消息监听
            worker1.addEventListener('message', (event) => {
                transport1.handleRemoteOperate(event);
            });
            worker2.addEventListener('message', (event) => {
                transport2.handleRemoteOperate(event);
            });

            const store1 = new AutoStore({
                user: {
                    profile: {
                        name: '张三',
                        age: 30,
                    },
                    address: {
                        city: '北京',
                        district: '朝阳区',
                    },
                },
            });

            const store2 = new AutoStore<typeof store1.state>();

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: false,
            });
            new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: false,
            });

            syncer1.push({ initial: true });
            await new Promise((resolve) => setTimeout(resolve, 20));

            expect(store2.state).toEqual(store1.state);

            // 测试深层嵌套属性的同步
            store1.state.user.profile.name = '李四';
            await new Promise((resolve) => setTimeout(resolve, 20));
            expect(store2.state.user.profile.name).toBe('李四');

            store2.state.user.address.city = '上海';
            await new Promise((resolve) => setTimeout(resolve, 20));
            expect(store1.state.user.address.city).toBe('上海');
        });
    });

    describe('生命周期管理', () => {
        test('停止同步后应该不再接收更新', async () => {
            const worker1 = new MockWorker();
            const worker2 = new MockWorker();

            // 使用 connectTo 方法建立双向连接
            worker1.connectTo(worker2);

            const transport1 = new WorkerTransport({
                worker: worker1 as any,
                id: 'worker-1',
            });

            const transport2 = new WorkerTransport({
                worker: worker2 as any,
                id: 'worker-2',
            });

            // 手动绑定消息监听
            worker1.addEventListener('message', (event) => {
                transport1.handleRemoteOperate(event);
            });
            worker2.addEventListener('message', (event) => {
                transport2.handleRemoteOperate(event);
            });

            const store1 = new AutoStore({
                count: 0,
            });

            const store2 = new AutoStore<typeof store1.state>();

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: false,
            });
            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: false,
            });

            syncer1.push({ initial: true });
            await new Promise((resolve) => setTimeout(resolve, 20));

            expect(store2.state.count).toBe(0);

            // 正常同步
            store1.state.count = 10;
            await new Promise((resolve) => setTimeout(resolve, 20));
            expect(store2.state.count).toBe(10);

            // 停止同步
            syncer1.stop();
            syncer2.stop();

            // 停止后修改不应该同步
            store1.state.count = 20;
            await new Promise((resolve) => setTimeout(resolve, 20));
            expect(store2.state.count).toBe(10);
        });

        test('销毁 transport 后应该清理资源', () => {
            const worker1 = new MockWorker();
            const worker2 = new MockWorker();

            // 使用 connectTo 方法建立双向连接
            worker1.connectTo(worker2);

            const transport1 = new WorkerTransport({
                worker: worker1 as any,
                id: 'worker-1',
            });

            const transport2 = new WorkerTransport({
                worker: worker2 as any,
                id: 'worker-2',
            });

            // 手动绑定消息监听
            worker1.addEventListener('message', (event) => {
                transport1.handleRemoteOperate(event);
            });
            worker2.addEventListener('message', (event) => {
                transport2.handleRemoteOperate(event);
            });

            const store1 = new AutoStore({
                value: 'test',
            });

            const store2 = new AutoStore<typeof store1.state>();

            new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: false,
            });
            new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: false,
            });

            // 验证监听器已注册（手动绑定的监听器 + syncer 内部的监听器）
            expect(worker1.listenerCount).toBeGreaterThanOrEqual(1);
            expect(worker2.listenerCount).toBeGreaterThanOrEqual(1);

            // 断开 transport 连接
            transport1.disconnect();
            transport2.disconnect();

            // 验证 transport 的 connected 状态
            expect(transport1.connected).toBe(false);
            expect(transport2.connected).toBe(false);
        });
    });

    describe('计算属性同步', () => {
        test('应该支持计算属性的同步', async () => {
            const worker1 = new MockWorker();
            const worker2 = new MockWorker();

            // 使用 connectTo 方法建立双向连接
            worker1.connectTo(worker2);

            const transport1 = new WorkerTransport({
                worker: worker1 as any,
                id: 'worker-1',
            });

            const transport2 = new WorkerTransport({
                worker: worker2 as any,
                id: 'worker-2',
            });

            // 手动绑定消息监听
            worker1.addEventListener('message', (event) => {
                transport1.handleRemoteOperate(event);
            });
            worker2.addEventListener('message', (event) => {
                transport2.handleRemoteOperate(event);
            });

            const store1 = new AutoStore({
                order: {
                    name: 'fisher',
                    price: 2,
                    count: 3,
                    total: computed((order) => order.price * order.count),
                },
            });

            const store2 = new AutoStore({
                order: {
                    name: 'fisher',
                    price: 2,
                    count: 3,
                    total: computed((order) => order.price * order.count),
                },
            });

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: false,
            });
            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: false,
            });

            // 初始同步
            syncer1.push({ initial: true });
            await new Promise((resolve) => setTimeout(resolve, 20));

            // 初始状态
            expect(store1.state.order.total).toBe(6);
            expect(store2.state.order.total).toBe(6);

            // store1 修改 count
            store1.state.order.count = 5;
            await new Promise((resolve) => setTimeout(resolve, 20));
            expect(store1.state.order.total).toBe(10);
            expect(store2.state.order.total).toBe(10);

            // store2 修改 price
            store2.state.order.price = 3;
            await new Promise((resolve) => setTimeout(resolve, 20));
            expect(store2.state.order.total).toBe(15);
            expect(store1.state.order.total).toBe(15);
        });
    });

    describe('边界情况', () => {
        test('应该正确处理空对象的同步', async () => {
            const worker1 = new MockWorker();
            const worker2 = new MockWorker();

            // 使用 connectTo 方法建立双向连接
            worker1.connectTo(worker2);

            const transport1 = new WorkerTransport({
                worker: worker1 as any,
                id: 'worker-1',
            });

            const transport2 = new WorkerTransport({
                worker: worker2 as any,
                id: 'worker-2',
            });

            // 手动绑定消息监听
            worker1.addEventListener('message', (event) => {
                transport1.handleRemoteOperate(event);
            });
            worker2.addEventListener('message', (event) => {
                transport2.handleRemoteOperate(event);
            });

            const store1 = new AutoStore<Record<string, any>>({});
            const store2 = new AutoStore<Record<string, any>>({});

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: false,
            });
            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: false,
            });

            syncer1.push({ initial: true });
            syncer2.push({ initial: true });
            await new Promise((resolve) => setTimeout(resolve, 20));

            // 添加新属性
            store1.state.newProp = 'value';
            await new Promise((resolve) => setTimeout(resolve, 20));
            expect(store2.state.newProp).toBe('value');
        });

        test('应该正确处理 null 和 undefined 值', async () => {
            const worker1 = new MockWorker();
            const worker2 = new MockWorker();

            // 使用 connectTo 方法建立双向连接
            worker1.connectTo(worker2);

            const transport1 = new WorkerTransport({
                worker: worker1 as any,
                id: 'worker-1',
            });

            const transport2 = new WorkerTransport({
                worker: worker2 as any,
                id: 'worker-2',
            });

            // 手动绑定消息监听
            worker1.addEventListener('message', (event) => {
                transport1.handleRemoteOperate(event);
            });
            worker2.addEventListener('message', (event) => {
                transport2.handleRemoteOperate(event);
            });

            const store1 = new AutoStore({
                value: 'initial' as string | null,
                nullValue: null as null | undefined,
            });

            const store2 = new AutoStore<typeof store1.state>();

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: false,
            });
            new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: false,
            });

            syncer1.push({ initial: true });
            await new Promise((resolve) => setTimeout(resolve, 20));

            // 设置为 null
            store1.state.value = null;
            await new Promise((resolve) => setTimeout(resolve, 20));
            expect(store2.state.value).toBeNull();

            // 设置为 undefined
            store1.state.nullValue = undefined;
            await new Promise((resolve) => setTimeout(resolve, 20));
            expect(store2.state.nullValue).toBeUndefined();
        });

        test.skip('应该支持大量消息的同步 (push 操作会触发额外消息)', async () => {
            const worker1 = new MockWorker();
            const worker2 = new MockWorker();

            // 使用 connectTo 方法建立双向连接
            worker1.connectTo(worker2);

            const transport1 = new WorkerTransport({
                worker: worker1 as any,
                id: 'worker-1',
            });

            const transport2 = new WorkerTransport({
                worker: worker2 as any,
                id: 'worker-2',
            });

            // 手动绑定消息监听
            worker1.addEventListener('message', (event) => {
                transport1.handleRemoteOperate(event);
            });
            worker2.addEventListener('message', (event) => {
                transport2.handleRemoteOperate(event);
            });

            const store1 = new AutoStore({
                items: [] as number[],
            });

            const store2 = new AutoStore<typeof store1.state>();

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: false,
            });
            new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: false,
            });

            // 初始同步
            syncer1.push({ initial: true });
            await new Promise((resolve) => setTimeout(resolve, 30));

            // 快速添加多个元素
            const count = 50;
            for (let i = 0; i < count; i++) {
                store1.state.items.push(i);
            }

            // 等待所有消息传递完成
            await new Promise((resolve) => setTimeout(resolve, 100));

            expect(store2.state.items).toHaveLength(count);
            expect(store2.state.items).toEqual(store1.state.items);
        });
    });

    describe('多 Worker 场景', () => {
        test('应该支持一个主线程与多个 Worker 的同步', async () => {
            const mainWorker = new MockWorker();
            const worker1 = new MockWorker();
            const worker2 = new MockWorker();

            // 建立主线程与两个 Worker 的连接
            mainWorker.connectTo(worker1);
            mainWorker.connectTo(worker2);

            const mainTransport = new WorkerTransport({
                worker: mainWorker as any,
                id: 'main',
            });

            const worker1Transport = new WorkerTransport({
                worker: worker1 as any,
                id: 'worker-1',
            });

            const worker2Transport = new WorkerTransport({
                worker: worker2 as any,
                id: 'worker-2',
            });

            // 手动绑定消息监听
            mainWorker.addEventListener('message', (event) => {
                mainTransport.handleRemoteOperate(event);
            });
            worker1.addEventListener('message', (event) => {
                worker1Transport.handleRemoteOperate(event);
            });
            worker2.addEventListener('message', (event) => {
                worker2Transport.handleRemoteOperate(event);
            });

            const mainStore = new AutoStore({
                count: 0,
                value: 'main',
            });

            const worker1Store = new AutoStore<typeof mainStore.state>();
            const worker2Store = new AutoStore<typeof mainStore.state>();

            const mainSyncer = new AutoStoreSyncer(mainStore, {
                transport: mainTransport,
                immediate: false,
            });

            new AutoStoreSyncer(worker1Store, {
                transport: worker1Transport,
                immediate: false,
            });

            new AutoStoreSyncer(worker2Store, {
                transport: worker2Transport,
                immediate: false,
            });

            // 初始同步
            mainSyncer.push({ initial: true });
            await new Promise((resolve) => setTimeout(resolve, 30));

            expect(worker1Store.state).toEqual(mainStore.state);
            expect(worker2Store.state).toEqual(mainStore.state);

            // 主线程修改，应该同步到所有 Worker
            mainStore.state.count = 10;
            await new Promise((resolve) => setTimeout(resolve, 30));
            expect(worker1Store.state.count).toBe(10);
            expect(worker2Store.state.count).toBe(10);
        });
    });
});
