import React from 'react';
import { createStore, delay } from '@autostorejs/react';
import '@autostorejs/plugins/asyncpro';
import { asyncComputed } from '@autostorejs/plugins/asyncpro';
import { Button, ColorBlock, Layout } from 'x-react-components';

const store = createStore({
    age: 18,
    // timeout: [超时时间ms, 倒计时间隔]，timeout倒计时从间隔数递减到0
    salary: asyncComputed(
        async (scope) => {
            await delay(3000); // 模拟较长的计算过程
            return scope.age * 10;
        },
        ['age'],
        { initial: 100, timeout: [5000, 30] },
    ),
});
const { useReactive } = store;

export default () => {
    const [age, setAge] = useReactive('age');
    // timeout：超时倒计时（ms），计算期间持续递减，是响应式更新的
    const [salary, , { loading, timeout }] = useReactive('salary');

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
                <ColorBlock name="Timeout (倒计时ms)">{String(timeout)}</ColorBlock>
            </div>
        </Layout>
    );
};
