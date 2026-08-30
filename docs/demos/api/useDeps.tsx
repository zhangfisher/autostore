import React from 'react';
import { createStore } from '@autostorejs/react';
import { Button, ColorBlock, Layout } from 'x-react-components';

const { useDeps, state } = createStore({
    order: {
        price: 100,
        count: 2,
        total: (order) => order.price * order.count,
    },
});

export default () => {
    // 依赖收集：路径、函数均可作为输入
    const deps1 = useDeps('order.price'); // => [['order','price']]
    const deps2 = useDeps((s) => s.order.price + s.order.count); // => [['order','price'],['order','count']]

    return (
        <Layout>
            <div>
                <Button onClick={() => state.order.count++}>Count++（{state.order.count}）</Button>
            </div>
            <div>
                <ColorBlock name="useDeps('order.price')">
                    <code>{JSON.stringify(deps1)}</code>
                </ColorBlock>
                <ColorBlock name="useDeps((s)=>...)">
                    <code>{JSON.stringify(deps2)}</code>
                </ColorBlock>
            </div>
        </Layout>
    );
};
