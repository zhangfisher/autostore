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

describe('EventEmitterTransport 单元测试', () => {
    describe('基础功能', () => {
        test('应该创建传输器实例', () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            expect(transport.id).toBeDefined();
            expect(transport.ready).toBe(true);
        });

        test('应该使用自定义 id', () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
                id: 'custom-id',
            });

            expect(transport.id).toBe('custom-id');
        });

        test('应该使用默认事件名称', () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            const receiveCallback = vi.fn();
            transport.receive(receiveCallback);

            emitter.emit('autostore-sync', { type: 'set', path: [], value: 1 });

            expect(receiveCallback).toHaveBeenCalledTimes(1);
        });

        test('应该使用自定义事件名称', () => {
            const emitter = new MockEventEmitter();
            const customEventName = 'my-custom-channel';
            const transport = new EventEmitterTransport({
                emitter: emitter,
                eventName: customEventName,
            });

            const receiveCallback = vi.fn();
            transport.receive(receiveCallback);

            emitter.emit(customEventName, { type: 'set', path: [], value: 1 });

            expect(receiveCallback).toHaveBeenCalledTimes(1);
        });

        test('应该支持 ready 为 false', () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
                ready: false,
            });

            expect(transport.ready).toBe(false);
        });
    });

    describe('消息接收', () => {
        test('应该接收通过 emitter 发送的消息', () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            const receiveCallback = vi.fn();
            transport.receive(receiveCallback);

            const mockOperate: StateRemoteOperate = {
                id: 'test-id',
                type: 'set',
                path: ['user', 'name'],
                value: '张三',
                flags: 0,
            };

            emitter.emit('autostore-sync', mockOperate);

            expect(receiveCallback).toHaveBeenCalledTimes(1);
            expect(receiveCallback).toHaveBeenCalledWith(mockOperate);
        });

        test('应该支持多次注册 receive 回调（最后一次生效）', () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            const firstCallback = vi.fn();
            const secondCallback = vi.fn();

            transport.receive(firstCallback);
            transport.receive(secondCallback);

            const mockOperate: StateRemoteOperate = {
                id: 'test-id',
                type: 'set',
                path: ['count'],
                value: 42,
                flags: 0,
            };

            emitter.emit('autostore-sync', mockOperate);

            expect(firstCallback).not.toHaveBeenCalled();
            expect(secondCallback).toHaveBeenCalledTimes(1);
        });

        test('应该忽略不匹配事件名称的消息', () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
                eventName: 'my-channel',
            });

            const receiveCallback = vi.fn();
            transport.receive(receiveCallback);

            emitter.emit('wrong-channel', { type: 'set', path: [], value: 1 });

            expect(receiveCallback).not.toHaveBeenCalled();
        });
    });

    describe('消息发送', () => {
        test('应该发送消息到指定的事件名称', () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
                sendEventName: 'target-channel',
            });

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

        test('当 sendEventName 不指定时应该使用 eventName', () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
                eventName: 'same-channel',
            });

            const receiveCallback = vi.fn();
            transport.receive(receiveCallback);

            const mockOperate: StateRemoteOperate = {
                id: 'test-id',
                type: 'set',
                path: ['data'],
                value: { key: 'value' },
                flags: 0,
            };

            transport.send(mockOperate);

            expect(receiveCallback).toHaveBeenCalledTimes(1);
            expect(receiveCallback).toHaveBeenCalledWith(mockOperate);
        });

        test('当 ready 为 false 时不应该发送消息', () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
                ready: false,
            });

            const receivedMessages: StateRemoteOperate[] = [];
            emitter.on('autostore-sync', (msg) => {
                receivedMessages.push(msg);
            });

            const mockOperate: StateRemoteOperate = {
                id: 'test-id',
                type: 'set',
                path: ['test'],
                value: 123,
                flags: 0,
            };

            transport.send(mockOperate);

            expect(receivedMessages).toHaveLength(0);
        });
    });

    describe('双向通信', () => {
        test('应该支持两个传输器之间的双向通信', () => {
            const sharedEmitter = new MockEventEmitter();

            const transport1 = new EventEmitterTransport({
                emitter: sharedEmitter,
                eventName: 'channel-2',
                sendEventName: 'channel-1',
                id: 'transport-1',
            });

            const transport2 = new EventEmitterTransport({
                emitter: sharedEmitter,
                eventName: 'channel-1',
                sendEventName: 'channel-2',
                id: 'transport-2',
            });

            const messages1: StateRemoteOperate[] = [];
            const messages2: StateRemoteOperate[] = [];

            transport1.receive((msg) => messages1.push(msg));
            transport2.receive((msg) => messages2.push(msg));

            const message1: StateRemoteOperate = {
                id: 'transport-1',
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
                id: 'transport-2',
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
        test('onStop 应该移除事件监听器', () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            const receiveCallback = vi.fn();
            transport.receive(receiveCallback);

            expect(emitter.listenerCount('autostore-sync')).toBe(1);

            transport.onStop();

            expect(emitter.listenerCount('autostore-sync')).toBe(0);

            emitter.emit('autostore-sync', { type: 'set', path: [], value: 1 });

            expect(receiveCallback).not.toHaveBeenCalled();
        });

        test('destroy 应该清理所有资源', () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            const receiveCallback = vi.fn();
            transport.receive(receiveCallback);

            transport.destroy();

            expect(transport.ready).toBe(false);
            expect(emitter.listenerCount('autostore-sync')).toBe(0);

            emitter.emit('autostore-sync', { type: 'set', path: [], value: 1 });
            expect(receiveCallback).not.toHaveBeenCalled();
        });

        test('多次调用 onStop 不应该报错', () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            expect(() => {
                transport.onStop();
                transport.onStop();
                transport.onStop();
            }).not.toThrow();
        });
    });

    describe('复杂场景', () => {
        test('应该支持同一 emitter 上的多个传输器使用不同事件名称', () => {
            const emitter = new MockEventEmitter();

            const transport1 = new EventEmitterTransport({
                emitter: emitter,
                eventName: 'channel-1',
                id: 'transport-1',
            });

            const transport2 = new EventEmitterTransport({
                emitter: emitter,
                eventName: 'channel-2',
                id: 'transport-2',
            });

            const messages1: StateRemoteOperate[] = [];
            const messages2: StateRemoteOperate[] = [];

            transport1.receive((msg) => messages1.push(msg));
            transport2.receive((msg) => messages2.push(msg));

            const message1: StateRemoteOperate = {
                id: 'transport-1',
                type: 'set',
                path: ['channel'],
                value: 1,
                flags: 0,
            };

            const message2: StateRemoteOperate = {
                id: 'transport-2',
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

        test('应该正确处理 $stop 操作', () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            const receiveCallback = vi.fn();
            transport.receive(receiveCallback);

            const stopMessage: StateRemoteOperate = {
                id: 'test-id',
                type: '$stop',
                path: [],
                value: undefined,
                flags: 0,
            };

            emitter.emit('autostore-sync', stopMessage);

            expect(receiveCallback).toHaveBeenCalledWith(stopMessage);
        });

        test('应该处理包含复杂值的操作', () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            const receiveCallback = vi.fn();
            transport.receive(receiveCallback);

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
                __schema__: true,
            };

            emitter.emit('autostore-sync', complexMessage);

            expect(receiveCallback).toHaveBeenCalledWith(complexMessage);
        });
    });

    describe('边界情况', () => {
        test('应该正确处理默认事件名称', () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            const receiveCallback = vi.fn();
            transport.receive(receiveCallback);

            emitter.emit('autostore-sync', { type: 'set', path: [], value: 1 });

            expect(receiveCallback).toHaveBeenCalledTimes(1);
        });

        test('事件名称中应该支持特殊字符', () => {
            const emitter = new MockEventEmitter();
            const specialEventName = 'channel:/test/v1';
            const transport = new EventEmitterTransport({
                emitter: emitter,
                eventName: specialEventName,
            });

            const receiveCallback = vi.fn();
            transport.receive(receiveCallback);

            emitter.emit(specialEventName, { type: 'set', path: [], value: 1 });

            expect(receiveCallback).toHaveBeenCalledTimes(1);
        });

        test('receiveCallback 在调用 receive 之前时发送的消息应该被忽略', () => {
            const emitter = new MockEventEmitter();
            const transport = new EventEmitterTransport({
                emitter: emitter,
            });

            emitter.emit('autostore-sync', {
                id: 'test-id',
                type: 'set',
                path: ['early'],
                value: 'message',
                flags: 0,
            });

            const receiveCallback = vi.fn();
            transport.receive(receiveCallback);

            expect(receiveCallback).not.toHaveBeenCalled();
        });
    });
});

describe('EventEmitterTransport AutoStore 同步集成测试', () => {
    describe('基础同步功能', () => {
        test('应该支持两个 AutoStore 之间的双向同步', () => {
            const sharedEmitter = new MockEventEmitter();

            const transport1 = new EventEmitterTransport({
                emitter: sharedEmitter,
                eventName: 'store2-channel',
                sendEventName: 'store1-channel',
                id: 'store-1',
            });

            const transport2 = new EventEmitterTransport({
                emitter: sharedEmitter,
                eventName: 'store1-channel',
                sendEventName: 'store2-channel',
                id: 'store-2',
            });

            const store1 = new AutoStore({
                order: {
                    name: 'fisher',
                    price: 2,
                    count: 3,
                    total: computed((order) => order.price * order.count),
                },
            });

            const store2 = new AutoStore<typeof store1.state>();

            // 先创建同步器但不立即同步
            const syncer1 = new AutoStoreSyncer(store1, { transport: transport1, immediate: false });
            const syncer2 = new AutoStoreSyncer(store2, { transport: transport2, immediate: false });

            // 手动触发初始同步
            syncer1.push({ initial: true });
            syncer2.push({ initial: true });

            // 现在应该同步了
            expect(store2.state).toEqual(store1.state);

            // 测试后续的同步
            store1.state.order.count = 5;
            expect(store2.state.order.count).toBe(5);
            expect(store2.state.order.total).toBe(10);

            store2.state.order.price = 3;
            expect(store1.state.order.price).toBe(3);
            expect(store1.state.order.total).toBe(15);
        });

        test('应该支持数组的双向同步', () => {
            const sharedEmitter = new MockEventEmitter();

            const transport1 = new EventEmitterTransport({
                emitter: sharedEmitter,
                eventName: 'store2-channel',
                sendEventName: 'store1-channel',
                id: 'store-1',
            });

            const transport2 = new EventEmitterTransport({
                emitter: sharedEmitter,
                eventName: 'store1-channel',
                sendEventName: 'store2-channel',
                id: 'store-2',
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

            // 初始值应该相同
            expect(store2.state.items).toEqual([1, 2, 3, 4, 5]);

            // store1 添加元素
            store1.state.items.push(6);
            expect(store2.state.items).toEqual([1, 2, 3, 4, 5, 6]);

            // store2 删除元素
            store2.state.items.splice(1, 2);
            expect(store1.state.items).toEqual([1, 4, 5, 6]);

            // store1 再次添加元素
            store1.state.items.push(7);
            expect(store2.state.items).toEqual([1, 4, 5, 6, 7]);

            // store2 修改元素值
            store2.state.items[0] = 10;
            expect(store1.state.items[0]).toBe(10);
        });

        test('应该支持嵌套对象的同步', () => {
            const sharedEmitter = new MockEventEmitter();

            const transport1 = new EventEmitterTransport({
                emitter: sharedEmitter,
                eventName: 'store2-channel',
                sendEventName: 'store1-channel',
                id: 'store-1',
            });

            const transport2 = new EventEmitterTransport({
                emitter: sharedEmitter,
                eventName: 'store1-channel',
                sendEventName: 'store2-channel',
                id: 'store-2',
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

            const syncer1 = new AutoStoreSyncer(store1, { transport: transport1, immediate: false });
            const syncer2 = new AutoStoreSyncer(store2, { transport: transport2, immediate: false });
            syncer1.push({ initial: true });
            syncer2.push({ initial: true });

            expect(store2.state).toEqual(store1.state);

            store1.state.user.profile.name = '李四';
            expect(store2.state.user.profile.name).toBe('李四');

            store2.state.user.address.city = '上海';
            expect(store1.state.user.address.city).toBe('上海');
        });
    });

    describe('生命周期管理', () => {
        test('停止同步后应该不再接收更新', () => {
            const sharedEmitter = new MockEventEmitter();

            const transport1 = new EventEmitterTransport({
                emitter: sharedEmitter,
                eventName: 'store2-channel',
                sendEventName: 'store1-channel',
                id: 'store-1',
            });

            const transport2 = new EventEmitterTransport({
                emitter: sharedEmitter,
                eventName: 'store1-channel',
                sendEventName: 'store2-channel',
                id: 'store-2',
            });

            const store1 = new AutoStore({
                count: 0,
            });

            const store2 = new AutoStore<typeof store1.state>();

            const syncer1 = new AutoStoreSyncer(store1, { transport: transport1, immediate: false });
            const syncer2 = new AutoStoreSyncer(store2, { transport: transport2, immediate: false });
            syncer1.push({ initial: true });

            expect(store2.state.count).toBe(0);

            store1.state.count = 10;
            expect(store2.state.count).toBe(10);

            syncer1.stop();
            syncer2.stop();

            store1.state.count = 20;
            expect(store2.state.count).toBe(10);
        });

        test('销毁 transport 后应该清理资源', () => {
            const sharedEmitter = new MockEventEmitter();

            const transport1 = new EventEmitterTransport({
                emitter: sharedEmitter,
                eventName: 'store2-channel',
                sendEventName: 'store1-channel',
                id: 'store-1',
            });

            const transport2 = new EventEmitterTransport({
                emitter: sharedEmitter,
                eventName: 'store1-channel',
                sendEventName: 'store2-channel',
                id: 'store-2',
            });

            const store1 = new AutoStore({
                value: 'test',
            });

            const store2 = new AutoStore<typeof store1.state>();

            const syncer1 = new AutoStoreSyncer(store1, { transport: transport1, immediate: false });
            const syncer2 = new AutoStoreSyncer(store2, { transport: transport2, immediate: false });
            syncer1.push({ initial: true });
            syncer2.push({ initial: true });

            expect(sharedEmitter.listenerCount('store1-channel')).toBe(1);
            expect(sharedEmitter.listenerCount('store2-channel')).toBe(1);

            transport1.destroy();
            transport2.destroy();

            expect(sharedEmitter.listenerCount('store1-channel')).toBe(0);
            expect(sharedEmitter.listenerCount('store2-channel')).toBe(0);
            expect(transport1.ready).toBe(false);
            expect(transport2.ready).toBe(false);
        });
    });

    describe('复杂场景', () => {
        test('应该支持同一 emitter 上的多个独立同步通道', () => {
            const emitter = new MockEventEmitter();

            const transport1a = new EventEmitterTransport({
                emitter: emitter,
                eventName: 'channel-1b',
                sendEventName: 'channel-1a',
                id: 'transport-1a',
            });

            const transport1b = new EventEmitterTransport({
                emitter: emitter,
                eventName: 'channel-1a',
                sendEventName: 'channel-1b',
                id: 'transport-1b',
            });

            const transport2a = new EventEmitterTransport({
                emitter: emitter,
                eventName: 'channel-2b',
                sendEventName: 'channel-2a',
                id: 'transport-2a',
            });

            const transport2b = new EventEmitterTransport({
                emitter: emitter,
                eventName: 'channel-2a',
                sendEventName: 'channel-2b',
                id: 'transport-2b',
            });

            const store1a = new AutoStore({ channel: 1, value: 'a1' });
            const store1b = new AutoStore<typeof store1a.state>();

            const store2a = new AutoStore({ channel: 2, value: 'a2' });
            const store2b = new AutoStore<typeof store2a.state>();

            new AutoStoreSyncer(store1a, { transport: transport1a });
            new AutoStoreSyncer(store1b, { transport: transport1b });

            new AutoStoreSyncer(store2a, { transport: transport2a });
            new AutoStoreSyncer(store2b, { transport: transport2b });

            store1a.state.value = 'a1-updated';
            expect(store1b.state.value).toBe('a1-updated');
            expect(store2a.state.value).toBe('a2');

            store2a.state.value = 'a2-updated';
            expect(store2b.state.value).toBe('a2-updated');
            expect(store1a.state.value).toBe('a1-updated');
        });

        test('应该支持计算属性的同步', () => {
            const sharedEmitter = new MockEventEmitter();

            const transport1 = new EventEmitterTransport({
                emitter: sharedEmitter,
                eventName: 'store2-channel',
                sendEventName: 'store1-channel',
                id: 'store-1',
            });

            const transport2 = new EventEmitterTransport({
                emitter: sharedEmitter,
                eventName: 'store1-channel',
                sendEventName: 'store2-channel',
                id: 'store-2',
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

            new AutoStoreSyncer(store1, { transport: transport1, immediate: false });
            new AutoStoreSyncer(store2, { transport: transport2, immediate: false });

            // 初始状态，两个 store 的 total 应该都是 6
            expect(store1.state.order.total).toBe(6);
            expect(store2.state.order.total).toBe(6);

            // store1 修改 count
            store1.state.order.count = 5;
            expect(store1.state.order.total).toBe(10);
            expect(store2.state.order.total).toBe(10);

            // store2 修改 price
            store2.state.order.price = 3;
            expect(store2.state.order.total).toBe(15);
            expect(store1.state.order.total).toBe(15);
        });
    });

    describe('边界情况', () => {
        test('应该正确处理空对象的同步', () => {
            const sharedEmitter = new MockEventEmitter();

            const transport1 = new EventEmitterTransport({
                emitter: sharedEmitter,
                eventName: 'store2-channel',
                sendEventName: 'store1-channel',
                id: 'store-1',
            });

            const transport2 = new EventEmitterTransport({
                emitter: sharedEmitter,
                eventName: 'store1-channel',
                sendEventName: 'store2-channel',
                id: 'store-2',
            });

            const store1 = new AutoStore<Record<string, any>>({});
            const store2 = new AutoStore<Record<string, any>>({});

            const syncer1 = new AutoStoreSyncer(store1, { transport: transport1, immediate: false });
            const syncer2 = new AutoStoreSyncer(store2, { transport: transport2, immediate: false });
            syncer1.push({ initial: true });
            syncer2.push({ initial: true });

            store1.state.newProp = 'value';
            expect(store2.state.newProp).toBe('value');
        });

        test('应该正确处理 null 和 undefined 值', () => {
            const sharedEmitter = new MockEventEmitter();

            const transport1 = new EventEmitterTransport({
                emitter: sharedEmitter,
                eventName: 'store2-channel',
                sendEventName: 'store1-channel',
                id: 'store-1',
            });

            const transport2 = new EventEmitterTransport({
                emitter: sharedEmitter,
                eventName: 'store1-channel',
                sendEventName: 'store2-channel',
                id: 'store-2',
            });

            const store1 = new AutoStore({
                value: 'initial' as string | null,
                nullValue: null as null | undefined,
            });

            const store2 = new AutoStore<typeof store1.state>();

            const syncer1 = new AutoStoreSyncer(store1, { transport: transport1, immediate: false });
            const syncer2 = new AutoStoreSyncer(store2, { transport: transport2, immediate: false });
            syncer1.push({ initial: true });
            syncer2.push({ initial: true });

            store1.state.value = null;
            expect(store2.state.value).toBeNull();

            store1.state.nullValue = undefined;
            expect(store2.state.nullValue).toBeUndefined();
        });
    });
});
