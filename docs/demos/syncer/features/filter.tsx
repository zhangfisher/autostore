// 过滤器：只同步白名单路径，敏感字段（password/token）不同步
import { createStore } from '@autostorejs/react';
import '@autostorejs/syncer';
import React from 'react';
import { Button, Layout, JsonView, Box } from 'x-react-components';

const store1 = createStore({
    user: { name: 'Alice', password: '123456', token: 'abc' },
});
const store2 = createStore({
    user: { name: 'Bob', password: '******', token: '' },
});

// filter 在监听到本地变化时按路径过滤：敏感字段返回 false 不同步
store1.sync(store2, {
    mode: 'none',
    filter: (path: string[]) => {
        const sensitive = ['password', 'token'];
        return !sensitive.includes(path[path.length - 1]);
    },
});

export default () => {
    const [state1] = store1.useReactive();
    const [state2] = store2.useReactive();

    return (
        <div>
            <Layout>
                <Box title="Store1（含敏感字段）">
                    <JsonView data={state1} />
                </Box>
                <Box title="Store2（敏感字段永不同步）">
                    <JsonView data={state2} />
                </Box>
            </Layout>
            <Layout>
                <Button onClick={() => (store1.state.user.name += '!')}>修改 name（会同步）</Button>
                <Button onClick={() => (store1.state.user.password = 'hacked-' + Date.now() % 100)}>修改 password（不同步）</Button>
                <Button onClick={() => (store1.state.user.token = 'tk-' + Math.floor(Math.random() * 100))}>修改 token（不同步）</Button>
            </Layout>
        </div>
    );
};
