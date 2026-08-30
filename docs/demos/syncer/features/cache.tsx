// 离线缓存：传输层未连接时操作被缓存，连接恢复后自动 flush
// 使用自定义的「延迟连接传输器」模拟网络断开/恢复
import { createStore } from '@autostorejs/react';
import { AutoStoreSyncer, AutoStoreSyncTransportBase } from '@autostorejs/syncer';
import type { StateRemoteOperate } from '@autostorejs/syncer';
import React, { useState } from 'react';
import { Button, Layout, JsonView, Box, List } from 'x-react-components';

/**
 * 手动开关的本地传输器：
 * - gate.open = false 时 connect() 不生效（等价网络未就绪），操作进入 syncer 离线缓存
 * - 发送的消息投递到对端
 * 注意：开关状态持有外部 gate 对象引用——base 构造的 Object.assign 是值拷贝，
 * 若用 this.options.open 则后续外部修改 gate.open 不会被感知
 */
class GateTransport extends AutoStoreSyncTransportBase<any> {
    peer?: GateTransport;
    gate: { open: boolean };
    constructor(gate: { open: boolean }) {
        super(gate as any);
        this.gate = gate;
    }
    onConnect() {
        return this.gate.open === true;
    }
    onSendOperate(operate: StateRemoteOperate) {
        this.peer?.onReceiveOperate(operate);
    }
}

const gate1 = { open: false } as any;
const gate2 = { open: false } as any;

const t1 = new GateTransport(gate1);
const t2 = new GateTransport(gate2);
t1.peer = t2;
t2.peer = t1;

const store1 = createStore({ count: 0 });
const store2 = createStore({ count: 0 });

const syncer = new AutoStoreSyncer(store1, {
    transport: t1,
    mode: 'none',
    direction: 'forward',
});
new AutoStoreSyncer(store2, { transport: t2, mode: 'none', direction: 'backward' });

const logs: string[] = [];
const log = (msg: string) => logs.push(`${new Date().toLocaleTimeString()}  ${msg}`);

export default () => {
    const [state1] = store1.useReactive();
    const [state2] = store2.useReactive();
    const [online, setOnline] = useState(false);
    const [, force] = useState(0);

    const goOnline = () => {
        gate1.open = true;
        gate2.open = true;
        t1.connect();
        t2.connect(); // connect 事件触发后 syncer 自动 flush() 缓存
        setOnline(true);
        log('🟢 连接恢复，缓存操作已自动 flush');
        force((n) => n + 1);
    };
    const goOffline = () => {
        t1.disconnect();
        t2.disconnect();
        gate1.open = false;
        gate2.open = false;
        setOnline(false);
        log('🔴 连接断开，后续操作将进入缓存');
        force((n) => n + 1);
    };

    return (
        <div>
            <Layout>
                <Box title="Store1（发送端）">
                    <JsonView data={state1} />
                </Box>
                <Box title={`Store2（接收端）  通道：${online ? '🟢 已连接' : '🔴 离线'}`}>
                    <JsonView data={state2} />
                </Box>
            </Layout>
            <Layout>
                <Button onClick={() => (store1.state.count = store1.state.count + 1)}>count++（离线时进缓存）</Button>
                {online ? <Button onClick={goOffline}>模拟断线</Button> : <Button onClick={goOnline}>模拟恢复连接</Button>}
                <Button onClick={() => force((n) => n + 1)}>刷新日志</Button>
            </Layout>
            <Box title="事件日志">
                <List items={logs.slice(-8)} />
            </Box>
        </div>
    );
};
