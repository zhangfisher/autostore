import React from 'react';
import { useStore, asyncComputed, delay } from '@autostorejs/react';
import { ColorBlock, Button, JsonView, Box } from 'x-react-components';

export default () => {
    const { state, $, useAsyncState } = useStore({
        firstName: 'Zhang',
        lastName: 'Fisher',
        fullName: asyncComputed(
            async (user) => {
                await delay();
                // 模拟产生错误
                if (user.triggerError) throw new Error('计算FullName时出错');
                return user.firstName + ' ' + user.lastName;
            },
            ['firstName', 'lastName'],
        ),
        triggerError: false,
    });

    const fullName = useAsyncState('fullName');

    return (
        <div>
            <ColorBlock name="FirstName">{$('firstName')}</ColorBlock>
            <ColorBlock name="FirstName">{$('lastName')}</ColorBlock>
            <ColorBlock name="FullName" loading={fullName.loading}>
                {fullName.loading
                    ? '正在计算...'
                    : fullName.error
                    ? `ERROR:${fullName.error}`
                    : fullName.value}
            </ColorBlock>
            <div>
                <Button
                    onClick={() => {
                        state.triggerError = false;
                        state.firstName = state.firstName + '🔥';
                    }}>
                    Change FirstName
                </Button>
                <Button
                    onClick={() => {
                        state.triggerError = false;
                        state.lastName = state.lastName + '❤️';
                    }}>
                    Change LastName
                </Button>
            </div>
            <div>
                <Button
                    onClick={() => {
                        state.firstName = state.firstName + '🔥';
                    }}>
                    Change FirstName with Error
                </Button>
                <Button
                    onClick={() => {
                        state.triggerError = true;
                        state.lastName = state.lastName + '❤️';
                    }}>
                    Change LastName with Error
                </Button>
            </div>
            <Box title="state.fullName">
                <JsonView highlightKeys={['loading']} data={fullName} />
            </Box>
        </div>
    );
};
