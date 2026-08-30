// AutoStoreSyncer：mode（push/pull/both/none）初始同步行为对比
import { createStore } from '@autostorejs/react';
import '@autostorejs/syncer';
import React from 'react';
import { Button, Layout, JsonView, Box } from 'x-react-components';

// store1 初始 count=100；观察不同 mode 建立同步瞬间 store2 的初始快照来源
const store1 = createStore({ count: 100, source: 'store1' });
const store2 = createStore({ count: 0, source: 'store2' });

// push：启动时将本地状态推送到远程（store2 会被 store1 覆盖）
// 换成 pull / both / none 可观察不同的初始同步行为
const syncer = store1.sync(store2, { mode: 'push' });

export default () => {
    const [state1] = store1.useReactive();
    const [state2] = store2.useReactive();

    return (
        <div>
            <Layout>
                <Box title="Store1（初始 count=100）">
                    <JsonView data={state1} />
                </Box>
                <Box title="Store2（初始 count=0，被 push 覆盖为 100）">
                    <JsonView data={state2} />
                </Box>
            </Layout>
            <Layout>
                <Button onClick={() => (store1.state.count = store1.state.count + 1)}>Store1 count++</Button>
                <Button onClick={() => (store2.state.count = store2.state.count - 1)}>Store2 count--</Button>
                <Button onClick={() => syncer.push()}>手动 push()</Button>
                <Button onClick={() => syncer.pull()}>手动 pull()</Button>
            </Layout>
            <Box title="说明">
                <ul style={{ padding: '8px 8px 8px 24px', lineHeight: '1.8em' }}>
                    <li>mode=push：启动时把 store1 状态推送到 store2（本例）</li>
                    <li>mode=pull：启动时从 store2 拉取状态到 store1</li>
                    <li>mode=both：双向初始同步</li>
                    <li>mode=none：不做初始同步，仅监听后续变化</li>
                    <li>push()/pull() 方法可随时手动触发全量同步</li>
                </ul>
            </Box>
        </div>
    );
};
