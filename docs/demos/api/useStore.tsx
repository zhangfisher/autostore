import React from 'react';
import { useStore } from '@autostorejs/react';
import { Button, ColorBlock, Layout } from 'x-react-components';

export default () => {
    // store 在组件首次渲染时创建，卸载时自动销毁
    const store = useStore({
        price: 100,
        count: 2,
        // 同步计算属性
        total: (scope) => scope.price * scope.count,
    });
    const { state, useReactive } = store;

    const [count, setCount] = useReactive('count');

    return (
        <Layout>
            <div>
                <ColorBlock name="Price">{String(state.price)}</ColorBlock>
                <ColorBlock name="Count">{String(count)}</ColorBlock>
                <ColorBlock name="Total">{String(state.total)}</ColorBlock>
                <Button onClick={() => setCount(count + 1)}>Count++</Button>
            </div>
        </Layout>
    );
};
