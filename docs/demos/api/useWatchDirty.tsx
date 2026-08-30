import React from 'react';
import { createStore } from '@autostorejs/react';
import { Button, ColorBlock, Input, Layout } from 'x-react-components';

const { reset, useFields, $, useWatch } = createStore({
    user: {
        firstName: 'Zhang',
        lastName: 'Fisher',
        fullName: (user) => user.firstName + ' ' + user.lastName,
    },
});

export default () => {
    const fields = useFields();

    // 脏检查：命中关注的变化才返回 true，否则返回 undefined 不更新状态
    const [dirty] = useWatch<boolean>(
        ({ path }) => {
            if (['firstName', 'lastName'].includes(path[path.length - 1])) {
                return true;
            }
        },
        { initial: false },
    );

    return (
        <Layout>
            <div>
                <Input label="FirstName" {...fields.user.firstName} />
                <Input label="LastName" {...fields.user.lastName} />
                <Button onClick={() => reset()}>Reset</Button>
            </div>
            <div>
                <ColorBlock name="Dirty">{String(dirty)}</ColorBlock>
                <ColorBlock name="FullName">{$('user.fullName')}</ColorBlock>
            </div>
        </Layout>
    );
};
