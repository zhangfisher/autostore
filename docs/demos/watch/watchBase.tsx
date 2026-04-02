import React from 'react';
import { createStore, watch } from '@autostorejs/react';
import { Button, Table } from 'x-react-components';

const { state, useReactive } = createStore({
    orders: [
        {
            name: 'AutoStore实战指南',
            price: 100,
            count: 1,
            total: (book: any) => book.price * book.count,
        },
        {
            name: '深入浅出AutoStore',
            price: 98,
            count: 1,
            total: (book: any) => book.price * book.count,
        },
    ],
    total: watch<number>(
        () => {
            // 返回值将写入state.total
            return state.orders.reduce(
                (total: number, book: any) => total + book.count * book.price,
                0,
            );
        },
        (path: string[]) => {
            // 当price或count变化时，触发侦听器函数的执行
            return path[path.length - 1] === 'count';
        },
        {
            initial: 198, // total的初始值
        },
    ),
});

export default () => {
    const [bookshop] = useReactive();

    return (
        <Table
            cols={['Name', 'Price', 'Count', 'Total']}
            rows={bookshop.orders.map((book: any) => {
                return [
                    book.name,
                    book.price,
                    () => {
                        return (
                            <>
                                <Button onClick={() => book.count--}>-</Button>
                                {book.count}
                                <Button onClick={() => book.count++}>+</Button>
                            </>
                        );
                    },
                    book.total,
                ];
            })}
        />
    );
};
