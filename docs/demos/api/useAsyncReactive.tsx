import React from 'react';
import { createStore, delay } from '@autostorejs/react';
import '@autostorejs/plugins/asyncpro';
import { asyncComputed } from '@autostorejs/plugins/asyncpro';
import { Button, ColorBlock, Layout, Input } from 'x-react-components';

const store = createStore({
    user: {
        name: 'Zhang',
        age: 18,
        // 高级异步计算属性
        salary: asyncComputed(
            async (user) => {
                await delay(1000); // 模拟异步计算
                return user.age * 10;
            },
            ['age'],
            { initial: 100 },
        ),
    },
});
const { useAsyncReactive } = store;

export default () => {
    // 返回完整的 AsyncComputedValue 对象
    const salary = useAsyncReactive('user.salary');

    return (
        <Layout>
            <div>
                <Input
                    label="Age"
                    type="number"
                    value={store.state.user.age}
                    onChange={(e) => {
                        store.state.user.age = Number(e.target.value);
                    }}
                />
                <Button onClick={() => salary.run()}>手动重新计算</Button>
            </div>
            <div>
                <ColorBlock name="Salary" loading={salary.loading}>
                    {String(salary.value)}
                </ColorBlock>
                <ColorBlock name="Loading">{String(salary.loading)}</ColorBlock>
                <ColorBlock name="Error">{String(salary.error)}</ColorBlock>
            </div>
        </Layout>
    );
};
