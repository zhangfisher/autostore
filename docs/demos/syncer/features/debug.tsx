// 调试模式：debug:true 后 localOperate / remoteOperate 事件实时输出同步流水
import { createStore } from '@autostorejs/react';
import '@autostorejs/syncer';
import React, { useState } from 'react';
import { Button, Layout, JsonView, Box, List } from 'x-react-components';

const store1 = createStore({ count: 0, user: { name: 'Alice' } });
const store2 = createStore({ count: 0, user: { name: 'Bob' } });

const syncer = store1.sync(store2, { mode: 'none', debug: true });

const logs: string[] = [];
// 本地 store 的写操作（无论是否被发送）
syncer.on('localOperate', (op: any) => {
    logs.push(`🔵 localOperate   ${op.type}  ${op.path.join('.')}  = ${JSON.stringify(op.value)}`);
});
// 从远程接收到的操作（无论是否被应用）
syncer.on('remoteOperate', (op: any) => {
    logs.push(`🔴 remoteOperate  ${op.type}  ${op.path.join('.')}  = ${JSON.stringify(op.value)}`);
});

export default () => {
    const [state1] = store1.useReactive();
    const [state2] = store2.useReactive();
    const [, force] = useState(0);

    return (
        <div>
            <Layout>
                <Box title="Store1">
                    <JsonView data={state1} />
                </Box>
                <Box title="Store2">
                    <JsonView data={state2} />
                </Box>
            </Layout>
            <Layout>
                <Button onClick={() => (store1.state.count = store1.state.count + 1)}>Store1 count++</Button>
                <Button onClick={() => (store2.state.user.name += '!')}>Store2 user.name += '!'</Button>
                <Button onClick={() => force((n) => n + 1)}>刷新日志</Button>
            </Layout>
            <Box title="调试事件流水（localOperate / remoteOperate）">
                <List items={logs.slice(-10)} />
            </Box>
        </div>
    );
};
