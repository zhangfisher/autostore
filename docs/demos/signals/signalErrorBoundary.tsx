import React from 'react';
import { createStore } from '@autostorejs/react';
import { Box, Button, ColorBlock } from 'x-react-components';

let count: number = 1;

const { state, $ } = createStore({
    price: 100,
    count: 1,
    total: (user: any) => {
        if (count % 2 == 0) {
            count++;
            throw new Error('计算出错');
        }
        count++;
        return user.price * user.count;
    },
});

export default () => {
    return (
        <Box>
            <ColorBlock name="Price">{state.price}</ColorBlock>
            <ColorBlock name="Count">
                <Button onClick={() => state.count--}>-</Button>
                {$('count')}
                <Button onClick={() => state.count++}>+</Button>
            </ColorBlock>
            <ColorBlock name="Total">
                {$('total', {
                    errorBoundary: () => {
                        return <span style={{ color: 'red' }}>出错了!</span>;
                    },
                })}
            </ColorBlock>
        </Box>
    );
};
