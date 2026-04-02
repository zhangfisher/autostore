import React from 'react';
import { createStore, watch } from '@autostorejs/react';
import { RichLabel, Divider, ColorBlock, Button, Box, Input } from 'x-react-components';

const { state, useFields, watchObjects, $, reset } = createStore({
    user: {
        firstName: 'Zhang',
        lastName: 'Fisher',
        fullName: (user: any) => {
            return user.firstName + ' ' + user.lastName;
        },
        dirty: watch(
            ({ path, value }, watchObj) => {
                console.log('dirty=', value);
                //watchObj.cache是一个{...}对象
                // 记住发生变化的路径
                watchObj.cache[path.join('.')] = true;
                return true;
            },
            (path) => {
                // 在本例中，只有firstName和lastName会触发dirty
                return ['firstName', 'lastName'].includes(path[path.length - 1]);
            },
            { initial: false },
        ),
    },
});

export default () => {
    const bindings = useFields();
    return (
        <div>
            <Box>
                <Input label="FirstName" {...bindings.user.firstName} />
                <Input label="lastName" {...bindings.user.lastName} />
            </Box>
            <Box>
                <ColorBlock name="FullName">{$('user.fullName')}</ColorBlock>
                <ColorBlock name="Dirty">{$('user.dirty')}</ColorBlock>
                <Button
                    onClick={() => {
                        reset();
                    }}>
                    Reset
                </Button>
            </Box>
            <Box>
                <RichLabel text={`typeof(store.watchObjects) == {${typeof watchObjects}}`} />
                <RichLabel text={`store.watchObjects.size = {${watchObjects.size}}`} />
                <RichLabel
                    text={`store.watchObjects.keys() = {${[...watchObjects.keys()].join(' , ')}}`}
                />
            </Box>
        </div>
    );
};
