import React from 'react';
import { createStore } from '@autostorejs/react';
import { ColorBlock, Layout, Input } from 'x-react-components';

const { useReactive, state } = createStore({
    user: {
        firstName: 'Zhang',
        lastName: 'Fisher',
    },
});

export default () => {
    // getter/setter：从多个状态派生一个值，setter 拆分写回
    const [fullName, setFullName] = useReactive(
        (state) => state.user.firstName + ' ' + state.user.lastName,
        (value, state) => {
            const [firstName, lastName] = value.split(' ');
            state.user.firstName = firstName;
            state.user.lastName = lastName ?? '';
        },
    );

    return (
        <Layout>
            <div>
                <Input
                    label="FullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <ColorBlock name="FirstName">{state.user.firstName}</ColorBlock>
                <ColorBlock name="LastName">{state.user.lastName}</ColorBlock>
            </div>
        </Layout>
    );
};
