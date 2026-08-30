import React from 'react';
import { createStore } from '@autostorejs/react';
import { Button, ColorBlock, Layout } from 'x-react-components';

const { useReactive } = createStore({
    user: {
        firstName: 'Zhang',
        lastName: 'Fisher',
        age: 18,
    },
});

export default () => {
    const [age, setAge] = useReactive('user.age');
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
                <ColorBlock name="FullName">{fullName}</ColorBlock>
                <ColorBlock name="Age">{String(age)}</ColorBlock>
                <Button onClick={() => setAge(age + 1)}>Age++</Button>
                <Button onClick={() => setFullName('Auto Store')}>Change Name</Button>
            </div>
        </Layout>
    );
};
