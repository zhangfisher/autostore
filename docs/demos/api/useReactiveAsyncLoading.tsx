import React from 'react';
import { createStore, delay } from '@autostorejs/react';
import '@autostorejs/plugins/asyncpro';
import { asyncComputed } from '@autostorejs/plugins/asyncpro';
import { Button, ColorBlock, Layout } from 'x-react-components';

const store = createStore({
    age: 18,
    // 高级异步计算属性
    salary: asyncComputed(
        async (scope) => {
            await delay(1000); // 模拟异步计算
            return scope.age * 10;
        },
        ['age'],
        { initial: 100 },
    ),
});
const { useReactive } = store;

export default () => {
    const [age, setAge] = useReactive('age');
    // 默认解包：value 是标量值，loading 来自第3个返回值 extras（状态树响应式）
    const [salary, , { loading }] = useReactive('salary');

    return (
        <Layout>
            <div>
                <ColorBlock name="Age">
                    <Button onClick={() => setAge(age - 1)}>-</Button>
                    {age}
                    <Button onClick={() => setAge(age + 1)}>+</Button>
                </ColorBlock>
            </div>
            <div>
                <ColorBlock name="Salary" loading={loading}>
                    {String(salary)}
                </ColorBlock>
                <ColorBlock name="Loading">{String(loading)}</ColorBlock>
            </div>
        </Layout>
    );
};
