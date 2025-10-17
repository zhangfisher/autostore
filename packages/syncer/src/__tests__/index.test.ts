/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, test } from 'vitest';
import type { IAutoStoreSyncTransport, StateRemoteOperate } from '../types';
import { computed, AutoStore } from '../../../core/src';
import { AutoStoreSyncer } from '../syncer';

describe('远程同步', () => {
    class WebSocketTansport implements IAutoStoreSyncTransport {
        ready = true;
        receiveCallback: any;
        isStop: boolean = false;
        constructor(public getPeer: () => WebSocketTansport) {}
        send(operate: StateRemoteOperate) {
            this.getPeer().receiveCallback(operate);
        }
        receive(callback: any) {
            this.receiveCallback = callback;
        }
        onStop() {
            this.isStop = true;
        }
    }

    const localTransport: WebSocketTansport = new WebSocketTansport(() => remoteTransport);
    const remoteTransport: WebSocketTansport = new WebSocketTansport(() => localTransport);

    test('一对一完整对象同步', () => {
        const localStore = new AutoStore({
            order: {
                price: 100,
                count: 2,
                total: computed((order) => order.price * order.count),
            },
        });
        const remoteStore = new AutoStore({
            order: {
                price: 100,
                count: 2,
                total: computed((order) => order.price * order.count),
            },
        });

        new AutoStoreSyncer(localStore, { transport: localTransport });
        new AutoStoreSyncer(remoteStore, { transport: remoteTransport });

        localStore.state.order.count = 3;
        expect(remoteStore.state).toEqual(localStore.state);
    });

    test('初始化时执行一次完整对象同步', () => {
        const localStore = new AutoStore(
            {
                order: {
                    price: 100,
                    count: 2,
                    total: computed((order) => order.price * order.count),
                },
            },
            { id: 'local' },
        );
        const remoteStore = new AutoStore({}, { id: 'remote' });
        // remoteStore.watch((operate) => {
        //     //expect(operate.flags! & SYNC_INIT_FLAG).toBeGreaterThan(0)
        // })

        new AutoStoreSyncer(remoteStore, { transport: remoteTransport });
        new AutoStoreSyncer(localStore, { transport: localTransport, immediate: true });
        expect(remoteStore.state).toEqual(localStore.state);
    });

    test('同步对象成员到远程对象', () => {
        const localStore = new AutoStore({
            order: {
                price: 100,
                count: 2,
                total: computed((order) => order.price * order.count),
            },
        });
        const remoteStore = new AutoStore();

        new AutoStoreSyncer(localStore, {
            transport: localTransport,
            local: ['order'],
        });
        new AutoStoreSyncer(remoteStore, { transport: remoteTransport });

        localStore.state.order.count = 3;
        expect(remoteStore.state.count).toBe(3);
        remoteStore.state.count = 4;
        expect(localStore.state.order.count).toBe(4);
    });
    test('同步对象成员到远程对象的指定路径', () => {
        const localStore = new AutoStore({
            order: {
                price: 100,
                count: 2,
                total: computed((order) => order.price * order.count),
            },
        });
        const remoteStore = new AutoStore({
            remoteOrder: {
                count: 0,
            },
        });

        new AutoStoreSyncer(localStore, {
            transport: localTransport,
            local: ['order'],
            remote: ['remoteOrder'],
        });
        new AutoStoreSyncer(remoteStore, { transport: remoteTransport });

        localStore.state.order.count = 3;
        expect(remoteStore.state.remoteOrder.count).toBe(3);
        remoteStore.state.remoteOrder.count = 4;
        expect(localStore.state.order.count).toBe(4);
    });

    test('停止同步时通知对方断开连接', () => {
        const localStore = new AutoStore({
            order: {
                price: 100,
                count: 2,
                total: computed((order) => order.price * order.count),
            },
        });
        const remoteStore = new AutoStore({
            order: {
                price: 100,
                count: 2,
                total: computed((order) => order.price * order.count),
            },
        });

        const localSyncer = new AutoStoreSyncer(localStore, { transport: localTransport });
        const remoteSyncer = new AutoStoreSyncer(remoteStore, { transport: remoteTransport });

        localStore.state.order.count = 3;
        expect(remoteStore.state).toEqual(localStore.state);
        localSyncer.stop();
        expect(localTransport.isStop).toBeTruthy();
        expect(remoteTransport.isStop).toBeTruthy();
        localStore.state.order.count = 4;
        expect(remoteStore.state).not.toEqual(localStore.state);
    });
    test('向对方请求一次全同步', () => {
        const localStore = new AutoStore({
            order: {
                price: 100,
                count: 2,
                total: computed((order) => order.price * order.count),
            },
        });
        const remoteStore = new AutoStore({});

        const localSyncer = new AutoStoreSyncer(localStore, { transport: localTransport });
        const remoteSyncer = new AutoStoreSyncer(remoteStore, { transport: remoteTransport });

        expect(remoteStore.state).toEqual({});
        remoteSyncer.pull();
        expect(remoteStore.state).toEqual(localStore.state);
    });

    test('部分路径同步时请求完整同步', () => {
        const remoteStore = new AutoStore({
            order: {
                price: 100,
                count: 2,
                total: computed((order) => order.price * order.count),
            },
        });
        const localStore = new AutoStore({
            x: {},
        });
        const remoteSyncer = new AutoStoreSyncer(remoteStore, { transport: remoteTransport });
        const localSyncer = new AutoStoreSyncer(localStore, {
            transport: localTransport,
            local: ['x'],
        });

        expect(localStore.state.x).toEqual({});
        localSyncer.pull();
        expect(localStore.state.x).toEqual(remoteStore.state);
    });

    test('部分路径同步时成员间数据同步', () => {
        const remoteStore = new AutoStore({
            order: {
                price: 100,
                count: 2,
                total: computed((order) => order.price * order.count),
            },
        });
        const localStore = new AutoStore({
            x: {},
        });
        const remoteSyncer = new AutoStoreSyncer(remoteStore, { transport: remoteTransport });
        const localSyncer = new AutoStoreSyncer(localStore, {
            transport: localTransport,
            local: ['x'],
        });

        expect(localStore.state.x).toEqual({});
        localSyncer.pull();
        expect(localStore.state.x).toEqual(remoteStore.state);
        remoteStore.state.order.count = 3;
        // @ts-ignore
        expect(localStore.state.x.order.count).toBe(3);
    });

    test('部分路径同步到本地时请求完整同步', () => {
        const remoteStore = new AutoStore({
            x: {
                order: {
                    price: 100,
                    count: 2,
                    total: computed((order) => order.price * order.count),
                },
            },
        });
        const localStore = new AutoStore({
            y: {},
        });
        const remoteSyncer = new AutoStoreSyncer(remoteStore, { transport: remoteTransport });
        const localSyncer = new AutoStoreSyncer(localStore, {
            transport: localTransport,
            local: ['y'],
            remote: ['x'],
        });
        expect(localStore.state.y).toEqual({});
        localSyncer.pull();
        expect(localStore.state.y).toEqual(remoteStore.state.x);
    });

    test('三个Store之间的数据联动同步', () => {
        const oneStore = new AutoStore(
            {
                order: {
                    price: 100,
                    count: 2,
                    total: computed((order) => order.price * order.count),
                },
            },
            { id: 'one' },
        );
        const twoStore = new AutoStore(
            {
                twoOrder: {
                    count: 0,
                },
            },
            { id: 'two' },
        );

        const threeStore = new AutoStore(
            {
                threeOrder: {
                    count: 0,
                },
            },
            { id: 'three' },
        );
        // one <----> two
        const localTransport: WebSocketTansport = new WebSocketTansport(() => remoteTransport);
        const remoteTransport: WebSocketTansport = new WebSocketTansport(() => localTransport);
        new AutoStoreSyncer(oneStore, {
            id: 'one-two',
            transport: localTransport,
            local: ['order'],
            remote: ['twoOrder'],
        });
        new AutoStoreSyncer(twoStore, {
            id: 'two-one',
            transport: remoteTransport,
        });

        // two <----> three
        const localTransport2: WebSocketTansport = new WebSocketTansport(() => remoteTransport2);
        const remoteTransport2: WebSocketTansport = new WebSocketTansport(() => localTransport2);

        new AutoStoreSyncer(twoStore, {
            id: 'two-three',
            transport: localTransport2,
            local: ['twoOrder'],
            remote: ['threeOrder'],
        });
        new AutoStoreSyncer(threeStore, {
            id: 'three-two',
            transport: remoteTransport2,
        });

        oneStore.state.order.count = 3;
        expect(oneStore.state.order.count).toBe(3);
        expect(twoStore.state.twoOrder.count).toBe(3);
        expect(threeStore.state.threeOrder.count).toBe(3);

        twoStore.state.twoOrder.count = 4;
        expect(oneStore.state.order.count).toBe(4);
        expect(twoStore.state.twoOrder.count).toBe(4);
        expect(threeStore.state.threeOrder.count).toBe(4);

        threeStore.state.threeOrder.count = 5;
        expect(oneStore.state.order.count).toBe(5);
        expect(twoStore.state.twoOrder.count).toBe(5);
        expect(threeStore.state.threeOrder.count).toBe(5);
    });
    test('单向同步模式下本地推送完整数据', () => {
        const localStore = new AutoStore({
            x: {
                order: {
                    price: 100,
                    count: 2,
                },
            },
        });
        const remoteStore = new AutoStore();
        const localSyncer = new AutoStoreSyncer(localStore, {
            transport: localTransport,
            direction: 'forward',
        });
        const remoteSyncer = new AutoStoreSyncer(remoteStore, {
            transport: remoteTransport,
            direction: 'backward',
            pathMap: {
                toLocal: (path, value) => {
                    if (['number', 'boolean', 'string'].includes(typeof value)) {
                        return [path.join('.')];
                    }
                },
            },
        });
        localSyncer.push();
        expect(remoteStore.state).toEqual({
            'x.order.price': 100,
            'x.order.count': 2,
        });
    });
    test('单向同步模式下使用toRemote路径映射', () => {
        const localStore = new AutoStore({
            x: {
                order: {
                    price: 100,
                    count: 2,
                },
            },
        });
        const remoteStore = new AutoStore();
        const localSyncer = new AutoStoreSyncer(localStore, {
            transport: localTransport,
            direction: 'forward',
            pathMap: {
                toRemote: (path, value) => {
                    if (['number', 'boolean', 'string'].includes(typeof value)) {
                        return [path.join('.')];
                    }
                },
            },
        });
        const remoteSyncer = new AutoStoreSyncer(remoteStore, {
            transport: remoteTransport,
            direction: 'backward',
        });
        localStore.state.x.order.count = 3;
        expect(localStore.state.x.order.count).toEqual(3);
        expect(remoteStore.state).toEqual({
            'x.order.count': 3,
        });
    });

    test('完全单向同步指定进行from同步路径映射', () => {
        const localStore = new AutoStore();

        const localSyncer = new AutoStoreSyncer(localStore, {
            transport: localTransport,
            direction: 'backward',
            pathMap: {
                toLocal: (path, value) => {
                    return [path.join('.')];
                },
            },
        });
        const remoteStore = new AutoStore({
            x: {
                order: {
                    price: 100,
                    count: 2,
                },
            },
        });
        const remoteSyncer = new AutoStoreSyncer(remoteStore, {
            transport: remoteTransport,
            direction: 'forward',
        });
        remoteStore.state.x.order.count = 3;
        expect(remoteStore.state.x.order.count).toEqual(3);
        expect(localStore.state).toEqual({
            'x.order.count': 3,
        });
    });
    test('完全单向同且指定from同步路径映射时进行pull操作', () => {
        const localStore = new AutoStore();
        const remoteStore = new AutoStore({
            x: {
                order: {
                    price: 100,
                    count: 2,
                },
            },
        });
        const localSyncer = new AutoStoreSyncer(localStore, {
            transport: localTransport,
            direction: 'backward',
            pathMap: {
                toLocal: (path, value) => {
                    if (['number', 'boolean', 'string'].includes(typeof value)) {
                        return [path.join('.')];
                    }
                },
            },
        });
        const remoteSyncer = new AutoStoreSyncer(remoteStore, {
            transport: remoteTransport,
            direction: 'forward',
        });
        localSyncer.pull();
        expect(localStore.state).toEqual({
            'x.order.count': 2,
            'x.order.price': 100,
        });
    });

    test('局部单向同步指定进行to同步路径映射', () => {
        const localStore = new AutoStore({
            x: {
                order: {
                    price: 100,
                    count: 2,
                },
            },
        });
        const remoteStore = new AutoStore({
            y: {},
        });
        const localSyncer = new AutoStoreSyncer(localStore, {
            transport: localTransport,
            local: ['x'],
            remote: ['y'],
            direction: 'forward',
            pathMap: {
                toRemote: (path) => {
                    return [path.join('.')];
                },
            },
        });
        const remoteSyncer = new AutoStoreSyncer(remoteStore, {
            transport: remoteTransport,
            direction: 'backward',
        });
        localStore.state.x.order.count = 3;
        expect(localStore.state.x.order.count).toEqual(3);
        expect(remoteStore.state.y).toEqual({
            'order.count': 3,
        });
    });
});
