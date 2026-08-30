// 自定义开发：继承 AutoStoreSyncTransportBase 实现「延迟投递传输器」
// 消息发送后延迟 N 毫秒才投递到对端，可观察同步时序
import { createStore } from '@autostorejs/react';
import { AutoStoreSyncer, AutoStoreSyncTransportBase } from '@autostorejs/syncer';
import type { StateRemoteOperate } from '@autostorejs/syncer';
import React from 'react';
import { Button, Layout, JsonView, Box, List } from 'x-react-components';

interface DelayTransportOptions {
    peer?: () => GateLike;
    delay?: number;
}
type GateLike = DelayTransport;

/**
 * 只需实现 onConnect / onDisconnect / onSendOperate 三个钩子，
 * 事件系统、receiver 注册、心跳检测由基类自动提供
 */
class DelayTransport extends AutoStoreSyncTransportBase<DelayTransportOptions> {
    onConnect() {
        // 对端存在即视为连接成功（也可返回 Promise 支持异步连接）
        const peer = this.options.peer;
        return !!peer && !!peer();
    }
    onDisconnect() {}
    onSendOperate(operate: StateRemoteOperate) {
        const { peer, delay = 500 } = this.options;
        // 模拟网络延迟：延迟后投递给对端，对端通过 onReceiveOperate 分发
        setTimeout(() => {
            const target = peer && peer();
            if (target) target.onReceiveOperate(operate);
        }, delay);
    }
}

let t1: DelayTransport, t2: DelayTransport;
t1 = new DelayTransport({ peer: () => t2, delay: 800 });
t2 = new DelayTransport({ peer: () => t1, delay: 800 });

const store1 = createStore({ count: 0 });
const store2 = createStore({ count: 0 });

new AutoStoreSyncer(store1, { transport: t1, mode: 'none', direction: 'forward' });
new AutoStoreSyncer(store2, { transport: t2, mode: 'none', direction: 'backward' });
t1.connect();
t2.connect();

export default () => {
    const [state1] = store1.useReactive();
    const [state2] = store2.useReactive();

    return (
        <div>
            <Layout>
                <Box title="Store1（发送，延迟 800ms 投递）">
                    <JsonView data={state1} />
                </Box>
                <Box title="Store2（接收）">
                    <JsonView data={state2} />
                </Box>
            </Layout>
            <Layout>
                <Button onClick={() => (store1.state.count = store1.state.count + 1)}>
                    count++（观察 Store2 约 800ms 后才更新）
                </Button>
            </Layout>
            <Box title="说明">
                <List
                    items={[
                        '继承 AutoStoreSyncTransportBase，实现 onConnect/onDisconnect/onSendOperate 即可',
                        '收到消息时必须调用 this.onReceiveOperate(operate) 分发给 receiver',
                        '自定义 Transport 可直接配合 AutoStoreSyncer 的 mode/direction/filter/pathMap 等选项',
                    ]}
                />
            </Box>
        </div>
    );
};
