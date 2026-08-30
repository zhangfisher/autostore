import React from 'react';
import { createStore, delay } from '@autostorejs/react';
import '@autostorejs/plugins/asyncpro';
import { asyncComputed } from '@autostorejs/plugins/asyncpro';
import { Button, ColorBlock, Layout } from 'x-react-components';

// 模拟一个不稳定的接口：前2次失败，第3次成功
let failCount = 0;

const store = createStore({
    age: 18,
    // retry: [重试次数, 重试间隔ms]，失败后自动重试
    salary: asyncComputed(
        async (scope) => {
            await delay(800);
            failCount += 1;
            if (failCount % 3 !== 0) {
                throw new Error(`请求失败(第${failCount}次)`);
            }
            return scope.age * 10;
        },
        ['age'],
        { initial: 100, retry: [3, 1000] },
    ),
});
const { useReactive } = store;

export default () => {
    const [age, setAge] = useReactive('age');
    // retry：剩余重试次数，重试期间从配置值递减到0，是响应式更新的
    const [salary, , { loading, error, retry }] = useReactive('salary');

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
                <ColorBlock name="Retry (剩余重试次数)">{String(retry)}</ColorBlock>
                <ColorBlock name="Error">{error ? String(error.message ?? error) : 'null'}</ColorBlock>
            </div>
        </Layout>
    );
};
