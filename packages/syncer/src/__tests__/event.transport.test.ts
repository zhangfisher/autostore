import { describe, expect, test, vi } from 'vitest';
import { computed, AutoStore } from '../../../core/src';
import { AutoStoreSyncer } from '../syncer';
import { EventEmitterTransport } from '../transports/event';
import type { IEventEmitter } from '../transports/event';
import type { StateRemoteOperate } from '../types';

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

    /**
     * 获取指定事件的监听器数量
     */
    listenerCount(event: string): number {
        return this.listeners.get(event)?.size || 0;
    }

    /**
     * 清除所有监听器
     */
    removeAllListeners(): void {
        this.listeners.clear();
    }
}

/**
 * 辅助函数：等待异步操作完成
 */
async function wait(ms: number = 0): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('EventEmitterTransport 单元测试', () => {
    describe('基础功能', () => {
        test('应该创建传输器实例', async () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            await transport.connect();

            expect(transport.id).toBeDefined();
            expect(transport.connected).toBe(true);
        });

        test('id 应该是唯一且递增的', async () => {
            const emitter1 = new MockEventEmitter();
            const emitter2 = new MockEventEmitter();
            const emitter3 = new MockEventEmitter();

            const transport1 = new EventEmitterTransport({
                emitter: emitter1,
            });
            const transport2 = new EventEmitterTransport({
                emitter: emitter2,
            });
            const transport3 = new EventEmitterTransport({
                emitter: emitter3,
            });

            // 验证 id 格式
            expect(transport1.id).toMatch(/^transport-\d+$/);
            expect(transport2.id).toMatch(/^transport-\d+$/);
            expect(transport3.id).toMatch(/^transport-\d+$/);

            // 验证 id 是唯一的
            expect(transport1.id).not.toBe(transport2.id);
            expect(transport2.id).not.toBe(transport3.id);
            expect(transport1.id).not.toBe(transport3.id);

            // 验证 id 是递增的
            const id1Num = parseInt(transport1.id.split('-')[1]);
            const id2Num = parseInt(transport2.id.split('-')[1]);
            const id3Num = parseInt(transport3.id.split('-')[1]);
            expect(id2Num).toBe(id1Num + 1);
            expect(id3Num).toBe(id2Num + 1);
        });

        test('应该使用默认事件名称', async () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            await transport.connect();

            const receiveCallback = vi.fn();
            transport.addReceiver('test-1', receiveCallback);

            emitter.emit('local-transport', { type: 'set', path: [], value: 1 });

            expect(receiveCallback).toHaveBeenCalledTimes(1);
        });

        test('应该使用自定义事件名称', async () => {
            const emitter = new MockEventEmitter();
            const customEventName = 'my-custom-channel';
            const transport = new EventEmitterTransport({
                emitter: emitter,
                localEventName: customEventName,
            });

            await transport.connect();

            const receiveCallback = vi.fn();
            transport.addReceiver('test-1', receiveCallback);

            emitter.emit(customEventName, { type: 'set', path: [], value: 1 });

            expect(receiveCallback).toHaveBeenCalledTimes(1);
        });

        test('应该支持未连接状态', () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            expect(transport.connected).toBe(false);
        });
    });

    describe('消息接收', () => {
        test('应该接收通过 emitter 发送的消息', async () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            await transport.connect();

            const receiveCallback = vi.fn();
            transport.addReceiver('test-1', receiveCallback);

            const mockOperate: StateRemoteOperate = {
                id: 'test-id',
                type: 'set',
                path: ['user', 'name'],
                value: '张三',
                flags: 0,
            };

            emitter.emit('local-transport', mockOperate);

            expect(receiveCallback).toHaveBeenCalledTimes(1);
            expect(receiveCallback).toHaveBeenCalledWith(mockOperate);
        });

        test('应该支持多个 receiver 注册', async () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            await transport.connect();

            const firstCallback = vi.fn();
            const secondCallback = vi.fn();

            transport.addReceiver('receiver-1', firstCallback);
            transport.addReceiver('receiver-2', secondCallback);

            const mockOperate: StateRemoteOperate = {
                id: 'test-id',
                type: 'set',
                path: ['count'],
                value: 42,
                flags: 0,
            };

            emitter.emit('local-transport', mockOperate);

            expect(firstCallback).toHaveBeenCalledTimes(1);
            expect(secondCallback).toHaveBeenCalledTimes(1);
        });

        test('应该忽略不匹配事件名称的消息', async () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
                localEventName: 'my-channel',
            });

            await transport.connect();

            const receiveCallback = vi.fn();
            transport.addReceiver('test-1', receiveCallback);

            emitter.emit('wrong-channel', { type: 'set', path: [], value: 1 });

            expect(receiveCallback).not.toHaveBeenCalled();
        });
    });

    describe('消息发送', () => {
        test('应该发送消息到指定的事件名称', async () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
                remoteEventName: 'target-channel',
            });

            await transport.connect();

            const receivedMessages: StateRemoteOperate[] = [];
            emitter.on('target-channel', (msg) => {
                receivedMessages.push(msg);
            });

            const mockOperate: StateRemoteOperate = {
                id: 'test-id',
                type: 'set',
                path: ['status'],
                value: 'active',
                flags: 0,
            };

            transport.send(mockOperate);

            expect(receivedMessages).toHaveLength(1);
            expect(receivedMessages[0]).toEqual(mockOperate);
        });

        test('当 remoteEventName 不指定时应该使用默认值', async () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            await transport.connect();

            const receivedMessages: StateRemoteOperate[] = [];
            emitter.on('remote-transport', (msg) => {
                receivedMessages.push(msg);
            });

            const mockOperate: StateRemoteOperate = {
                id: 'test-id',
                type: 'set',
                path: ['data'],
                value: { key: 'value' },
                flags: 0,
            };

            transport.send(mockOperate);

            expect(receivedMessages).toHaveLength(1);
            expect(receivedMessages[0]).toEqual(mockOperate);
        });

        test('当未连接时不应该发送消息', () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            const receivedMessages: StateRemoteOperate[] = [];
            emitter.on('remote-transport', (msg) => {
                receivedMessages.push(msg);
            });

            const mockOperate: StateRemoteOperate = {
                id: 'test-id',
                type: 'set',
                path: ['test'],
                value: 123,
                flags: 0,
            };

            expect(() => transport.send(mockOperate)).toThrow();
            expect(receivedMessages).toHaveLength(0);
        });
    });

    describe('双向通信', () => {
        test('应该支持两个传输器之间的双向通信', async () => {
            const sharedEmitter = new MockEventEmitter();

            const transport1 = new EventEmitterTransport({
                emitter: sharedEmitter,
                localEventName: 'channel-2',
                remoteEventName: 'channel-1',
            });

            const transport2 = new EventEmitterTransport({
                emitter: sharedEmitter,
                localEventName: 'channel-1',
                remoteEventName: 'channel-2',
            });

            await transport1.connect();
            await transport2.connect();

            const messages1: StateRemoteOperate[] = [];
            const messages2: StateRemoteOperate[] = [];

            transport1.addReceiver('test-1', (msg) => messages1.push(msg));
            transport2.addReceiver('test-2', (msg) => messages2.push(msg));

            const message1: StateRemoteOperate = {
                id: 'syncer-1',
                type: 'set',
                path: ['from', '1'],
                value: 'hello',
                flags: 0,
            };
            transport1.send(message1);

            expect(messages2).toHaveLength(1);
            expect(messages2[0]).toEqual(message1);
            expect(messages1).toHaveLength(0);

            const message2: StateRemoteOperate = {
                id: 'syncer-2',
                type: 'set',
                path: ['from', '2'],
                value: 'world',
                flags: 0,
            };
            transport2.send(message2);

            expect(messages1).toHaveLength(1);
            expect(messages1[0]).toEqual(message2);
            expect(messages2).toHaveLength(1);
        });
    });

    describe('生命周期管理', () => {
        test('disconnect 应该移除事件监听器', async () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            await transport.connect();

            const receiveCallback = vi.fn();
            transport.addReceiver('test-1', receiveCallback);

            expect(emitter.listenerCount('local-transport')).toBe(1);

            transport.disconnect();

            expect(emitter.listenerCount('local-transport')).toBe(0);
            expect(transport.connected).toBe(false);

            emitter.emit('local-transport', { type: 'set', path: [], value: 1 });

            expect(receiveCallback).not.toHaveBeenCalled();
        });

        test('disconnect 应该清理所有资源', async () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            await transport.connect();

            const receiveCallback = vi.fn();
            transport.addReceiver('test-1', receiveCallback);

            transport.disconnect();

            expect(transport.connected).toBe(false);
            expect(emitter.listenerCount('local-transport')).toBe(0);

            emitter.emit('local-transport', { type: 'set', path: [], value: 1 });
            expect(receiveCallback).not.toHaveBeenCalled();
        });

        test('多次调用 disconnect 不应该报错', async () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            await transport.connect();

            expect(() => {
                transport.disconnect();
                transport.disconnect();
                transport.disconnect();
            }).not.toThrow();
        });
    });

    describe('复杂场景', () => {
        test('应该支持同一 emitter 上的多个传输器使用不同事件名称', async () => {
            const emitter = new MockEventEmitter();

            const transport1 = new EventEmitterTransport({
                emitter: emitter,
                localEventName: 'channel-1',
            });

            const transport2 = new EventEmitterTransport({
                emitter: emitter,
                localEventName: 'channel-2',
            });

            await transport1.connect();
            await transport2.connect();

            const messages1: StateRemoteOperate[] = [];
            const messages2: StateRemoteOperate[] = [];

            transport1.addReceiver('test-1', (msg) => messages1.push(msg));
            transport2.addReceiver('test-2', (msg) => messages2.push(msg));

            const message1: StateRemoteOperate = {
                id: 'syncer-1',
                type: 'set',
                path: ['channel'],
                value: 1,
                flags: 0,
            };

            const message2: StateRemoteOperate = {
                id: 'syncer-2',
                type: 'set',
                path: ['channel'],
                value: 2,
                flags: 0,
            };

            emitter.emit('channel-1', message1);
            expect(messages1).toHaveLength(1);
            expect(messages2).toHaveLength(0);

            emitter.emit('channel-2', message2);
            expect(messages1).toHaveLength(1);
            expect(messages2).toHaveLength(1);
        });

        test('应该正确处理 $stop 操作', async () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            await transport.connect();

            const receiveCallback = vi.fn();
            transport.addReceiver('test-1', receiveCallback);

            const stopMessage: StateRemoteOperate = {
                id: 'test-id',
                type: '$stop',
                path: [],
                value: undefined,
                flags: 0,
            };

            emitter.emit('local-transport', stopMessage);

            expect(receiveCallback).toHaveBeenCalledWith(stopMessage);
        });

        test('应该处理包含复杂值的操作', async () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            await transport.connect();

            const receiveCallback = vi.fn();
            transport.addReceiver('test-1', receiveCallback);

            const complexMessage: StateRemoteOperate = {
                id: 'test-id',
                type: 'set',
                path: ['user', 'profile'],
                value: {
                    name: '张三',
                    age: 30,
                    hobbies: ['阅读', '编程'],
                    address: {
                        city: '北京',
                        district: '朝阳区',
                    },
                },
                flags: 0,
            };

            emitter.emit('local-transport', complexMessage);

            expect(receiveCallback).toHaveBeenCalledWith(complexMessage);
        });
    });

    describe('边界情况', () => {
        test('应该正确处理默认事件名称', async () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            await transport.connect();

            const receiveCallback = vi.fn();
            transport.addReceiver('test-1', receiveCallback);

            emitter.emit('local-transport', { type: 'set', path: [], value: 1 });

            expect(receiveCallback).toHaveBeenCalledTimes(1);
        });

        test('事件名称中应该支持特殊字符', async () => {
            const emitter = new MockEventEmitter();
            const specialEventName = 'channel:/test/v1';
            const transport = new EventEmitterTransport({
                emitter: emitter,
                localEventName: specialEventName,
            });

            await transport.connect();

            const receiveCallback = vi.fn();
            transport.addReceiver('test-1', receiveCallback);

            emitter.emit(specialEventName, { type: 'set', path: [], value: 1 });

            expect(receiveCallback).toHaveBeenCalledTimes(1);
        });

        test('在 connect 之前发送的消息应该被忽略', () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            emitter.emit('local-transport', {
                id: 'test-id',
                type: 'set',
                path: ['early'],
                value: 'message',
                flags: 0,
            });

            const receiveCallback = vi.fn();
            transport.addReceiver('test-1', receiveCallback);

            expect(receiveCallback).not.toHaveBeenCalled();
        });
    });
});

describe('EventEmitterTransport AutoStore 同步集成测试', () => {
    describe('基础同步功能', () => {
        test('应该支持两个 AutoStore 之间的双向同步', async () => {
            const sharedEmitter = new MockEventEmitter();

            const transport1 = new EventEmitterTransport({
                emitter: sharedEmitter,
                localEventName: 'store2-channel',
                remoteEventName: 'store1-channel',
            });

            const transport2 = new EventEmitterTransport({
                emitter: sharedEmitter,
                localEventName: 'store1-channel',
                remoteEventName: 'store2-channel',
            });

            const store1 = new AutoStore({
                order: {
                    name: 'fisher',
                    price: 2,
                    count: 3,
                    total: computed((order) => order.price * order.count),
                },
            }, { id: 'store-1' });

            const store2 = new AutoStore({
                order: {
                    name: 'fisher',
                    price: 2,
                    count: 3,
                    total: computed((order) => order.price * order.count),
                },
            }, { id: 'store-2' });

            // 创建同步器
            const syncer1 = new AutoStoreSyncer(store1, { transport: transport1, immediate: false });
            const syncer2 = new AutoStoreSyncer(store2, { transport: transport2, immediate: false });

            // 等待连接建立
            await wait(10);

            // 初始状态应该相同
            expect(store2.state).toEqual(store1.state);

            // 测试从 store1 到 store2 的同步
            store1.state.order.count = 5;
            await wait(10);
            expect(store2.state.order.count).toBe(5);
            expect(store2.state.order.total).toBe(10);

            // 测试从 store2 到 store1 的同步
            store2.state.order.price = 3;
            await wait(10);
            expect(store1.state.order.price).toBe(3);
            expect(store1.state.order.total).toBe(15);
        });

        test('应该支持数组的双向同步', async () => {
            const sharedEmitter = new MockEventEmitter();

            const transport1 = new EventEmitterTransport({
                emitter: sharedEmitter,
                localEventName: 'store2-channel',
                remoteEventName: 'store1-channel',
            });

            const transport2 = new EventEmitterTransport({
                emitter: sharedEmitter,
                localEventName: 'store1-channel',
                remoteEventName: 'store2-channel',
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

            new AutoStoreSyncer(store1, { transport: transport1, immediate: false });
            new AutoStoreSyncer(store2, { transport: transport2, immediate: false });

            // 等待连接建立
            await wait(10);

            // 初始值应该相同
            expect(store2.state.items).toEqual([1, 2, 3, 4, 5]);

            // store1 添加元素
            store1.state.items.push(6);
            await wait(10);
            expect(store2.state.items).toEqual([1, 2, 3, 4, 5, 6]);

            // store2 删除元素
            store2.state.items.splice(1, 2);
            await wait(10);
            expect(store1.state.items).toEqual([1, 4, 5, 6]);

            // store1 再次添加元素
            store1.state.items.push(7);
            await wait(10);
            expect(store2.state.items).toEqual([1, 4, 5, 6, 7]);

            // store2 修改元素值
            store2.state.items[0] = 10;
            await wait(10);
            expect(store1.state.items[0]).toBe(10);
        });

        test('应该支持嵌套对象的同步', async () => {
            const sharedEmitter = new MockEventEmitter();

            const transport1 = new EventEmitterTransport({
                emitter: sharedEmitter,
                localEventName: 'store2-channel',
                remoteEventName: 'store1-channel',
            });

            const transport2 = new EventEmitterTransport({
                emitter: sharedEmitter,
                localEventName: 'store1-channel',
                remoteEventName: 'store2-channel',
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
            }, { id: 'store-1' });
// @ts-ignore
            const store2 = new AutoStore<typeof store1.state>({}, { id: 'store-2' });

            const syncer1 = new AutoStoreSyncer(store1, { transport: transport1, immediate: false });
            const syncer2 = new AutoStoreSyncer(store2, { transport: transport2, immediate: false });

            await wait(10);

            syncer1.push({ initial: true });
            await wait(50);

            expect(store2.state).toEqual(store1.state);

            store1.state.user.profile.name = '李四';
            await wait(10);
            expect(store2.state.user.profile.name).toBe('李四');

            store2.state.user.address.city = '上海';
            await wait(10);
            expect(store1.state.user.address.city).toBe('上海');
        });
    });

    describe('生命周期管理', () => {
        test('停止同步后应该不再接收更新', async () => {
            const sharedEmitter = new MockEventEmitter();

            const transport1 = new EventEmitterTransport({
                emitter: sharedEmitter,
                localEventName: 'store2-channel',
                remoteEventName: 'store1-channel',
            });

            const transport2 = new EventEmitterTransport({
                emitter: sharedEmitter,
                localEventName: 'store1-channel',
                remoteEventName: 'store2-channel',
            });

            const store1 = new AutoStore({
                count: 0,
            }, { id: 'store-1' });
// @ts-ignore
            const store2 = new AutoStore<typeof store1.state>({}, { id: 'store-2' });

            const syncer1 = new AutoStoreSyncer(store1, { transport: transport1, immediate: false });
            const syncer2 = new AutoStoreSyncer(store2, { transport: transport2, immediate: false });

            await wait(10);
            syncer1.push({ initial: true });
            await wait(50);

            expect(store2.state.count).toBe(0);

            store1.state.count = 10;
            await wait(10);
            expect(store2.state.count).toBe(10);

            syncer1.stop();
            syncer2.stop();

            store1.state.count = 20;
            await wait(10);
            expect(store2.state.count).toBe(10);
        });

        test('销毁 transport 后应该清理资源', async () => {
            const sharedEmitter = new MockEventEmitter();

            const transport1 = new EventEmitterTransport({
                emitter: sharedEmitter,
                localEventName: 'store2-channel',
                remoteEventName: 'store1-channel',
            });

            const transport2 = new EventEmitterTransport({
                emitter: sharedEmitter,
                localEventName: 'store1-channel',
                remoteEventName: 'store2-channel',
            });

            const store1 = new AutoStore({
                value: 'test',
            }, { id: 'store-1' });
// @ts-ignore
            const store2 = new AutoStore<typeof store1.state>({}, { id: 'store-2' });

            const syncer1 = new AutoStoreSyncer(store1, { transport: transport1, immediate: false });
            const syncer2 = new AutoStoreSyncer(store2, { transport: transport2, immediate: false });

            await wait(10);
            syncer1.push({ initial: true });
            syncer2.push({ initial: true });
            await wait(50);

            expect(sharedEmitter.listenerCount('store1-channel')).toBe(1);
            expect(sharedEmitter.listenerCount('store2-channel')).toBe(1);

            transport1.disconnect();
            transport2.disconnect();

            expect(sharedEmitter.listenerCount('store1-channel')).toBe(0);
            expect(sharedEmitter.listenerCount('store2-channel')).toBe(0);
            expect(transport1.connected).toBe(false);
            expect(transport2.connected).toBe(false);
        });
    });

    describe('复杂场景', () => {
        test('应该支持同一 emitter 上的多个独立同步通道', async () => {
            const emitter = new MockEventEmitter();

            const transport1a = new EventEmitterTransport({
                emitter: emitter,
                localEventName: 'channel-1b',
                remoteEventName: 'channel-1a',
            });

            const transport1b = new EventEmitterTransport({
                emitter: emitter,
                localEventName: 'channel-1a',
                remoteEventName: 'channel-1b',
            });

            const transport2a = new EventEmitterTransport({
                emitter: emitter,
                localEventName: 'channel-2b',
                remoteEventName: 'channel-2a',
            });

            const transport2b = new EventEmitterTransport({
                emitter: emitter,
                localEventName: 'channel-2a',
                remoteEventName: 'channel-2b',
            });

            const store1a = new AutoStore({ channel: 1, value: 'a1' }, { id: 'store-1a' });
            // @ts-ignore
            const store1b = new AutoStore<typeof store1a.state>({}, { id: 'store-1b' });

            const store2a = new AutoStore({ channel: 2, value: 'a2' }, { id: 'store-2a' });
            // @ts-ignore
            const store2b = new AutoStore<typeof store2a.state>({}, { id: 'store-2b' });

            new AutoStoreSyncer(store1a, { transport: transport1a, immediate: false });
            new AutoStoreSyncer(store1b, { transport: transport1b, immediate: false });
            new AutoStoreSyncer(store2a, { transport: transport2a, immediate: false });
            new AutoStoreSyncer(store2b, { transport: transport2b, immediate: false });

            await wait(10);

            // 初始同步
            transport1a.send({
                id: 'store-1a',
                type: '$push',
                path: [],
                value: { channel: 1, value: 'a1' },
                flags: -1,
            });
            transport2a.send({
                id: 'store-2a',
                type: '$push',
                path: [],
                value: { channel: 2, value: 'a2' },
                flags: -1,
            });

            await wait(50);

            store1a.state.value = 'a1-updated';
            await wait(10);
            expect(store1b.state.value).toBe('a1-updated');
            expect(store2a.state.value).toBe('a2');

            store2a.state.value = 'a2-updated';
            await wait(10);
            expect(store2b.state.value).toBe('a2-updated');
            expect(store1a.state.value).toBe('a1-updated');
        });

        test('应该支持计算属性的同步', async () => {
            const sharedEmitter = new MockEventEmitter();

            const transport1 = new EventEmitterTransport({
                emitter: sharedEmitter,
                localEventName: 'store2-channel',
                remoteEventName: 'store1-channel',
            });

            const transport2 = new EventEmitterTransport({
                emitter: sharedEmitter,
                localEventName: 'store1-channel',
                remoteEventName: 'store2-channel',
            });

            const store1 = new AutoStore({
                order: {
                    name: 'fisher',
                    price: 2,
                    count: 3,
                    total: computed((order) => order.price * order.count),
                },
            }, { id: 'store-1' });

            const store2 = new AutoStore({
                order: {
                    name: 'fisher',
                    price: 2,
                    count: 3,
                    total: computed((order) => order.price * order.count),
                },
            }, { id: 'store-2' });

            new AutoStoreSyncer(store1, { transport: transport1, immediate: false });
            new AutoStoreSyncer(store2, { transport: transport2, immediate: false });

            await wait(10);

            // 初始状态，两个 store 的 total 应该都是 6
            expect(store1.state.order.total).toBe(6);
            expect(store2.state.order.total).toBe(6);

            // store1 修改 count
            store1.state.order.count = 5;
            await wait(10);
            expect(store1.state.order.total).toBe(10);
            expect(store2.state.order.total).toBe(10);

            // store2 修改 price
            store2.state.order.price = 3;
            await wait(10);
            expect(store2.state.order.total).toBe(15);
            expect(store1.state.order.total).toBe(15);
        });
    });

    describe('边界情况', () => {
        test('应该正确处理空对象的同步', async () => {
            const sharedEmitter = new MockEventEmitter();

            const transport1 = new EventEmitterTransport({
                emitter: sharedEmitter,
                localEventName: 'store2-channel',
                remoteEventName: 'store1-channel',
            });

            const transport2 = new EventEmitterTransport({
                emitter: sharedEmitter,
                localEventName: 'store1-channel',
                remoteEventName: 'store2-channel',
            });

            const store1 = new AutoStore<Record<string, any>>({}, { id: 'store-1' });
            const store2 = new AutoStore<Record<string, any>>({}, { id: 'store-2' });

            const syncer1 = new AutoStoreSyncer(store1, { transport: transport1, immediate: false });
            const syncer2 = new AutoStoreSyncer(store2, { transport: transport2, immediate: false });

            await wait(10);
            syncer1.push({ initial: true });
            syncer2.push({ initial: true });
            await wait(50);

            store1.state.newProp = 'value';
            await wait(10);
            expect(store2.state.newProp).toBe('value');
        });

        test('应该正确处理 null 和 undefined 值', async () => {
            const sharedEmitter = new MockEventEmitter();

            const transport1 = new EventEmitterTransport({
                emitter: sharedEmitter,
                localEventName: 'store2-channel',
                remoteEventName: 'store1-channel',
            });

            const transport2 = new EventEmitterTransport({
                emitter: sharedEmitter,
                localEventName: 'store1-channel',
                remoteEventName: 'store2-channel',
            });

            const store1 = new AutoStore({
                value: 'initial' as string | null,
                nullValue: null as null | undefined,
            }, { id: 'store-1' });
// @ts-ignore
            const store2 = new AutoStore<typeof store1.state>({}, { id: 'store-2' });

            const syncer1 = new AutoStoreSyncer(store1, { transport: transport1, immediate: false });
            const syncer2 = new AutoStoreSyncer(store2, { transport: transport2, immediate: false });

            await wait(10);
            syncer1.push({ initial: true });
            syncer2.push({ initial: true });
            await wait(50);

            store1.state.value = null;
            await wait(10);
            expect(store2.state.value).toBeNull();

            store1.state.nullValue = undefined;
            await wait(10);
            expect(store2.state.nullValue).toBeUndefined();
        });
    });
});
