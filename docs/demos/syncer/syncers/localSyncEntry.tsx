// AutoStoreSyncer：local/remote 局部路径同步
import { createStore, computed } from '@autostorejs/react';
import '@autostorejs/syncer';
import React from 'react';
import { Button, Layout, JsonView, Box } from 'x-react-components';

// store1 有 order 和 user 两棵子树
const store1 = createStore({
    order: {
        price: 100,
        count: 2,
        total: computed((order: any) => order.price * order.count),
    },
    user: { name: 'Alice' },
});
// store2 使用完全不同的路径名 myorder
const store2 = createStore({ myorder: {}, extra: '不受同步影响' });

// 只把 store1.order 同步到 store2.myorder，user 子树不参与同步
store1.sync(store2, {
    local: 'order',
    remote: 'myorder',
    mode: 'both',
});

export default () => {
    const [state1] = store1.useReactive();
    const [state2] = store2.useReactive();

    return (
        <div>
            <Layout>
                <Box title="Store1（order + user）">
                    <JsonView data={state1} />
                </Box>
                <Box title="Store2（myorder 接收 order，user 不同步）">
                    <JsonView data={state2} />
                </Box>
            </Layout>
            <Layout>
                <Button onClick={() => (store1.state.order.count = store1.state.order.count + 1)}>Store1 order.count++（同步）</Button>
                <Button onClick={() => (store1.state.user.name += '!')}>Store1 user.name += '!'（不同步）</Button>
                <Button onClick={() => ((store2.state as any).myorder.price += 10)}>Store2 myorder.price += 10（反向同步）</Button>
            </Layout>
        </div>
    );
};
