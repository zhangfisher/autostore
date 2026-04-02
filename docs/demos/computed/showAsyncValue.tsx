import React from 'react';
import { createStore, asyncComputed, computed } from '@autostorejs/react';
import { Box, JsonView } from 'x-react-components';

const store = createStore({
    order: {
        price: 10,
        count: 1,
        total1: computed(
            async (scope) => {
                return scope.price * scope.count;
            },
            ['./price', './count'],
        ),
        total2: asyncComputed(
            async (scope) => {
                return scope.price * scope.count;
            },
            ['./price', './count'],
        ),
    },
});

export default () => {
    return (
        <>
            <Box title="store.state=">
                <JsonView highlightKeys={['total1', 'total2']} data={store.state} />
            </Box>
            <Box title={`store.computedObjects.get("order.total")=`}>
                {/* 计算对象实例 */}
                <div>
                    typeof store.computedObjects.get("order.total1") ={' '}
                    {typeof store.computedObjects.get('order.total1')}
                </div>
                <div>
                    typeof store.computedObjects.get("order.total2") ={' '}
                    {typeof store.computedObjects.get('order.total2')}
                </div>
            </Box>
        </>
    );
};
