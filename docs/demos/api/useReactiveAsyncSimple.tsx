import React from 'react';
import { createStore, computed, delay } from '@autostorejs/react';
import { Button, ColorBlock, Layout } from 'x-react-components';

const store = createStore({
    age: 18,
    // 简单异步计算属性：computed(async...)声明，计算结果原位写入 state.salary（标量值）
    salary: computed(
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
    // 简单异步：默认解包取标量值，loading/error 来自第3个返回值 extras
    const [salary, , { loading, error }] = useReactive('salary');

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
                <ColorBlock name="Error">{error ? String(error) : 'null'}</ColorBlock>
            </div>
        </Layout>
    );
};
