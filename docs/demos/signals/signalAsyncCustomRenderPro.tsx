import React from 'react';
import { createStore, computed, delay } from '@autostorejs/react';
import { Button, ColorBlock, Box, JsonView } from 'x-react-components';

const { state, $, useReactive } = createStore({
    order: {
        price: 100,
        count: 1,
        total: computed(
            async (order) => {
                await delay(2000);
                return order.price * order.count;
            },
            ['./price', './count'],
        ),
    },
});
export default () => {
    const [state] = useReactive();
    return (
        <div>
            <ColorBlock name="Price">{$('order.price')}</ColorBlock>
            <ColorBlock name="Count">{$('order.count')}</ColorBlock>
            <ColorBlock name="Total">
                {$(({ value, loading }) => {
                    return (
                        <>
                            {loading && <span>正在计算...⏳</span>}
                            {!loading && <span>{value}💸💸💸💸💸</span>}
                        </>
                    );
                }, 'order.total')}
            </ColorBlock>
            <Button onClick={() => state.order.count++}>Count++</Button>

            <Box title="state=">
                <JsonView highlightKeys={['fullName']} data={state} />
            </Box>
        </div>
    );
};
