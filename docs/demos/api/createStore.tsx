import React from 'react';
import { createStore } from '@autostorejs/react';
import { Button, ColorBlock, Layout } from 'x-react-components';

// 模块作用域创建：多组件共享
export const store = createStore(
    {
        user: {
            firstName: 'Zhang',
            lastName: 'Fisher',
            age: 18,
            // 同步计算属性
            fullName: (user) => user.firstName + ' ' + user.lastName,
        },
    },
    { id: 'api-create-store' },
);

// 解构使用：state 带完整类型推断
export const { state, $, useReactive } = store;

export default () => {
    const [age, setAge] = useReactive('user.age');

    return (
        <Layout>
            <div>
                <Button onClick={() => setAge(age + 1)}>Age++</Button>
            </div>
            <div>
                <ColorBlock name="FullName">{$('user.fullName')}</ColorBlock>
                <ColorBlock name="Age">{String(age)}</ColorBlock>
            </div>
        </Layout>
    );
};
