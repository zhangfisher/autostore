// 路径映射：嵌套结构 <-> 扁平化键值结构 互相同步
import { createStore } from '@autostorejs/react';
import '@autostorejs/syncer';
import React from 'react';
import { Button, Layout, JsonView, Box } from 'x-react-components';

// store1 使用嵌套结构：user.name / user.age
const store1 = createStore({
    user: { name: 'Alice', age: 30 },
});
// store2 使用扁平化结构：'user.name' / 'user.age' 作为键
const store2 = createStore({
    'user.name': 'Bob',
    'user.age': 25,
});

store1.sync(store2, {
    mode: 'none',
    // 不声明 local/remote 前缀：映射函数直接在完整路径上做转换，避免相对路径拼接错位
    pathMap: {
        // 远程完整路径 ['user.name'] -> 本地 ['user','name']
        toLocal: (path: string[]) => (path.length === 1 && path[0].includes('.') ? path[0].split('.') : path),
        // 本地完整路径 ['user','name'] -> 远程 ['user.name']
        toRemote: (path: string[]) => (path.length > 1 ? [path.join('.')] : path),
    },
});

export default () => {
    const [state1] = store1.useReactive();
    const [state2] = store2.useReactive();

    return (
        <div>
            <Layout>
                <Box title="Store1（嵌套结构）">
                    <JsonView data={state1} />
                </Box>
                <Box title="Store2（扁平化结构）">
                    <JsonView data={state2} />
                </Box>
            </Layout>
            <Layout>
                <Button onClick={() => (store1.state.user.name += '!')}>Store1 user.name += '!'</Button>
                <Button onClick={() => (store1.state.user.age = store1.state.user.age + 1)}>Store1 user.age++</Button>
            </Layout>
            <Layout>
                <Button onClick={() => (store2.state['user.name'] += '~')}>Store2 user.name += '~'</Button>
                <Button onClick={() => (store2.state['user.age'] = store2.state['user.age'] + 1)}>Store2 user.age++</Button>
            </Layout>
        </div>
    );
};
