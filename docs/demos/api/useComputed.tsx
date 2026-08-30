import React from 'react';
import { createStore, delay } from '@autostorejs/react';
import '@autostorejs/plugins/asyncpro';
import { asyncComputed } from '@autostorejs/plugins/asyncpro';
import { Button, ColorBlock, Layout, Input } from 'x-react-components';

const store = createStore({
    order: {
        price: 100,
        count: 2,
    },
});
const { useComputed } = store;

// 在组件外声明 builder，保证引用稳定
const discountBuilder = asyncComputed(
    async (state) => {
        await delay(1000); // 模拟异步计算
        return state.order.price * state.order.count * 0.8;
    },
    ['order.price', 'order.count'],
    { initial: 0 },
);

export default () => {
    // 同步计算：动态创建，不写入状态树
    const total = useComputed((state) => state.order.price * state.order.count);
    // 异步计算：声明式 builder
    const discount = useComputed(discountBuilder);

    return (
        <Layout>
            <div>
                <Input
                    label="Price"
                    type="number"
                    value={store.state.order.price}
                    onChange={(e) => {
                        store.state.order.price = Number(e.target.value);
                    }}
                />
                <Button onClick={() => store.state.order.count++}>Count++</Button>
            </div>
            <div>
                <ColorBlock name="Total (同步)">{String(total.value)}</ColorBlock>
                <ColorBlock name="Discount (异步)" loading={discount.loading}>
                    {String(discount.value)}
                </ColorBlock>
            </div>
        </Layout>
    );
};
