// EventEmitterTransport：多个 Store 通过共享事件总线通信
import { createStore } from '@autostorejs/react';
import { AutoStoreSyncer, EventEmitterTransport } from '@autostorejs/syncer';
import React from 'react';
import { Button, Layout, JsonView, Box } from 'x-react-components';

// 最小事件总线（mitt 形态）：任何实现 on/off/emit 的对象都可以
const listeners = new Map<string, Function[]>();
const emitter = {
    on(event: string, listener: Function): any {
        if (!listeners.has(event)) listeners.set(event, []);
        listeners.get(event)!.push(listener);
        return emitter;
    },
    off(event: string, listener: Function): any {
        const arr = listeners.get(event);
        if (arr) arr.splice(arr.indexOf(listener) >>> 0, 1);
        return emitter;
    },
    emit(event: string, ...args: any[]): any {
        (listeners.get(event) || []).slice().forEach((l) => l(...args));
        return true;
    },
};

// store1 监听 ch-2、发送到 ch-1；store2 交叉对应
const store1 = createStore({ count: 0, from: 'store1' });
const store2 = createStore({ count: 0, from: 'store2' });

const t1 = new EventEmitterTransport({ emitter, localEventName: 'ch-2', remoteEventName: 'ch-1' });
const t2 = new EventEmitterTransport({ emitter, localEventName: 'ch-1', remoteEventName: 'ch-2' });
new AutoStoreSyncer(store1, { transport: t1, mode: 'none', direction: 'both' });
new AutoStoreSyncer(store2, { transport: t2, mode: 'none', direction: 'both' });
t1.connect();
t2.connect();

export default () => {
    const [state1] = store1.useReactive();
    const [state2] = store2.useReactive();

    return (
        <div>
            <Layout>
                <Box title="Store1（监听 ch-2 / 发送 ch-1）">
                    <JsonView data={state1} />
                </Box>
                <Box title="Store2（监听 ch-1 / 发送 ch-2）">
                    <JsonView data={state2} />
                </Box>
            </Layout>
            <Layout>
                <Button onClick={() => (store1.state.count = store1.state.count + 1)}>Store1 count++</Button>
                <Button onClick={() => (store2.state.count = store2.state.count + 1)}>Store2 count++</Button>
            </Layout>
            <Box title="说明">
                <ul style={{ padding: '8px 8px 8px 24px', lineHeight: '1.8em' }}>
                    <li>两个 transport 的 localEventName / remoteEventName 必须交叉对应</li>
                    <li>emitter 只需实现 on/off/emit，可接入 Node.js EventEmitter、mitt 或任意事件总线</li>
                    <li>与 LocalTransport 的区别：共享一个事件总线，按事件名路由，天然支持多 Store</li>
                </ul>
            </Box>
        </div>
    );
};
