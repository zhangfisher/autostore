import React from 'react';
import { delay, createStore } from '@autostorejs/react';
import '@autostorejs/plugins/asyncpro';
import { asyncComputed } from '@autostorejs/plugins/asyncpro';
import { Input, ColorBlock, JsonView, Box, Button } from 'x-react-components';

const store = createStore(
    {
        user: {
            firstName: 'Zhang',
            lastName: 'fisher',
            // 高级异步计算属性：使用asyncComputed声明
            fullName: asyncComputed(
                async (user) => {
                    await delay(1000); // 模拟异步计算
                    return user.firstName + ' ' + user.lastName;
                },
                ['user.firstName', './lastName'],
                {
                    // 指定依赖
                    initial: 'ZhangFisher',
                },
            ),
        },
    },
    {
        id: 'async-base',
        debug: true, // 打开Redux devtools
    },
);
const { useAsyncReactive, useReactive, useField } = store;
export default () => {
    const [state] = useReactive();
    const firstNameField = useField('user.firstName');
    const lastNameField = useField('user.lastName');
    const fullName = useAsyncReactive('user.fullName');

    return (
        <>
            <Input label="firstName" {...firstNameField} />
            <Input label="lastName" {...lastNameField} />
            <ColorBlock name="FullName" loading={fullName.loading}>
                {fullName.value}
            </ColorBlock>
            <Button
                onClick={() => {
                    store.state.user.firstName = store.state.user.firstName + '🔥';
                }}>
                Change FirstName
            </Button>
            <Button
                onClick={() => {
                    store.state.user.lastName = store.state.user.lastName + '❤️';
                }}>
                Change LastName
            </Button>
            <Box title="state=">
                <JsonView highlightKeys={['fullName']} data={state} />
            </Box>
        </>
    );
};
