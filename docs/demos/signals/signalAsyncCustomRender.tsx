import React from 'react';
import { useStore, delay, asyncComputed, computed } from '@autostorejs/react';
import { Button, ColorBlock } from 'x-react-components';

export default () => {
    const { state, $, useAsyncReactive } = useStore({
        order: {
            price: 100,
            count: 1,
            total: asyncComputed(
                async (order) => {
                    await delay();
                    return order.price * order.count;
                },
                ['order.price', 'order.count'],
                { initial: 100 },
            ),
            simpleTotal: computed(
                async (order) => {
                    await delay();
                    return order.price * order.count;
                },
                ['order.price', 'order.count'],
                { initial: 100 },
            ),
        },
    });
    const total = useAsyncReactive('order.total');
    const simpleTotal = useAsyncReactive('order.simpleTotal');
    return (
        <div>
            <ColorBlock name="Price">{$('order.price')}</ColorBlock>
            <ColorBlock name="Count">{$('order.count')}</ColorBlock>
            <ColorBlock name="Total" loading={total.loading} comment="1秒后更新">
                {$('order.total.value')}
            </ColorBlock>
            <ColorBlock name="Total" loading={total.loading} comment="自动识别异步值">
                {$('order.total')}
            </ColorBlock>
            <ColorBlock name="SimpleTotal" loading={simpleTotal.loading} comment="简单异步计算">
                {$('order.simpleTotal')}
            </ColorBlock>
            <Button onClick={() => state.order.count++}>+Count</Button>
        </div>
    );
};
