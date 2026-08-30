import React from 'react';
import { createStore, delay, asyncComputed } from '@autostorejs/react';
import { Button, ColorBlock, Loading, Box, JsonView } from 'x-react-components';

const { state, $, useReactive, useAsyncReactive } = createStore({
    order: {
        price: 100,
        count: 1,
        total: asyncComputed(
            async (order) => {
                await delay(1000);
                return order.price * order.count;
            },
            ['order.price', 'order.count'],
            { initial: 100 },
        ),
    },
});

export default () => {
    const [rstate] = useReactive();
    const total = useAsyncReactive('order.total');
    return (
        <div>
            <ColorBlock name="Price">{$('order.price')}</ColorBlock>
            <ColorBlock name="Count">{$('order.count')}</ColorBlock>
            <ColorBlock name="Total" comment={total.loading ? <Loading /> : '1秒后更新'}>
                {$('order.total.value')}
            </ColorBlock>
            <Button onClick={() => state.order.count++}>+Count</Button>
            <Box title="state=">
                <JsonView highlightKeys={['fullName']} data={rstate} />
            </Box>
        </div>
    );
};
