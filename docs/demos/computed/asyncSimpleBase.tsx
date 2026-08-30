import React from 'react';
import { delay, createStore, computed } from '@autostorejs/react';
import { Input, ColorBlock, Box, JsonView, Button } from 'x-react-components';
const store = createStore(
    {
        user: {
            firstName: 'Zhang',
            lastName: 'fisher',
            loading: false,
            fullName: computed(
                async (user) => {
                    await delay(1000); // 模拟异步计算
                    return user.firstName + ' ' + user.lastName;
                },
                ['user.firstName', './lastName'],
                {
                    // 指定依赖
                    initial: 'ZhangFisher',
                    reports: {
                        loading: './loading',
                        error: './error',
                    },
                },
            ),
        },
    },
    {
        id: 'async-base2',
        debug: true, // 打开Redux devtools
    },
);
const { useField, useReactive } = store;
export default () => {
    const [state] = useReactive();
    const firstNameField = useField('user.firstName');
    const lastNameField = useField('user.lastName');
    const [loading] = useReactive('user.loading');
    const [fullName] = useReactive('user.fullName');
    return (
        <>
            <Input label="firstName" {...firstNameField} />
            <Input label="lastName" {...lastNameField} />
            <ColorBlock name="FullName" loading={loading}>
                {fullName}
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
