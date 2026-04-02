import React from 'react';
import { delay, createStore, computed } from '@autostorejs/react';
import { Input, ColorBlock, JsonView, Box, Button } from 'x-react-components';
const store = createStore(
    {
        user: {
            firstName: 'Zhang',
            lastName: 'fisher',
            fullName: computed(
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
        id: 'async-base2',
        debug: true, // 打开Redux devtools
    },
);
const { useField, useReactive } = store;
export default () => {
    const state = useReactive();
    const firstNameField = useField('user.firstName');
    const lastNameField = useField('user.lastName');
    const [fullName, _, loading, error] = useReactive('user.fullName');

    return (
        <>
            <Input label="firstName" {...firstNameField} />
            <Input label="lastName" {...lastNameField} />
            <ColorBlock name="FullName" loading={loading}>
                {fullName}
            </ColorBlock>

            <div>
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
            </div>
            <Box title="state=">
                <JsonView highlightKeys={['fullName']} data={state} />
            </Box>
        </>
    );
};
