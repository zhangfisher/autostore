// 同步钩子：onSend 阻止敏感字段发送，onReceive 拒绝远程删除操作
import { createStore } from '@autostorejs/react';
import '@autostorejs/syncer';
import React, { useState } from 'react';
import { Button, Layout, JsonView, Box, List } from 'x-react-components';

const store1 = createStore({ token: 'secret', count: 0 });
const store2 = createStore({ token: '<初始>', count: 0 });

const logs: string[] = [];

store1.sync(store2, {
    mode: 'none',
    // 发送前：阻止 token 字段
    onSend: (operate: any) => {
        const blocked = operate.path.includes('token');
        logs.push(`onSend  ${operate.type}:${operate.path.join('.')}  -> ${blocked ? '❌ 阻止' : '✅ 放行'}`);
        return !blocked;
    },
    // 接收后：拒绝 delete 操作
    onReceive: (operate: any) => {
        const blocked = operate.type === 'delete';
        logs.push(`onReceive  ${operate.type}:${operate.path.join('.')}  -> ${blocked ? '❌ 阻止' : '✅ 放行'}`);
        return !blocked;
    },
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
                <Box title="Store2（token 被拦截 / delete 被拒绝）">
                    <JsonView data={state2} />
                </Box>
            </Layout>
            <Layout>
                <Button onClick={() => (store1.state.count = store1.state.count + 1)}>count++（放行）</Button>
                <Button onClick={() => (store1.state.token = 'new-secret-' + Math.floor(Math.random() * 100))}>
                    修改 token（onSend 阻止）
                </Button>
                <Button onClick={() => (store1.state as any).count = undefined}>delete count（onReceive 拒绝）</Button>
                <Button onClick={() => force((n) => n + 1)}>刷新日志</Button>
            </Layout>
            <Box title="钩子触发日志">
                <List items={logs.slice(-8)} />
            </Box>
        </div>
    );
};
