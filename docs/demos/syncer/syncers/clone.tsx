// clone()：克隆 Store 并保持同步（sync: both/forward/none，entry 指定克隆路径）
import { createStore } from '@autostorejs/react';
import '@autostorejs/syncer';
import React from 'react';
import { Button, Layout, JsonView, Box } from 'x-react-components';

const original = createStore({
    user: { name: 'Alice', age: 25 },
    config: { theme: 'dark' },
});

// 1. 双向同步克隆：与原 store 互相同步（默认 sync='both'）
const mirrorClone = original.clone({ sync: 'both' });
// 2. 前向克隆：只从原 store 流向克隆，克隆的修改不回传
const forwardClone = original.clone({ entry: 'user', sync: 'forward' });
// 3. 不同步克隆：仅复制当前快照，之后各自独立
const snapshotClone = original.clone({ sync: 'none' });

const clones: [string, any, string][] = [
    ['mirrorClone（sync:both 全量）', mirrorClone, '双向同步'],
    ['forwardClone（entry:user, sync:forward）', forwardClone, '仅 user 子树，单向'],
    ['snapshotClone（sync:none）', snapshotClone, '仅快照，不同步'],
];

export default () => {
    const [state] = original.useReactive();

    return (
        <div>
            <Layout>
                <Box title="original（源 Store）">
                    <JsonView data={state} />
                </Box>
                {clones.slice(0, 1).map(([title, store]) => (
                    <Box key={title} title={title}>
                        <JsonView data={store.useReactive()[0]} />
                    </Box>
                ))}
            </Layout>
            <Layout>
                {clones.slice(1).map(([title, store]) => (
                    <Box key={title} title={title}>
                        <JsonView data={store.useReactive()[0]} />
                    </Box>
                ))}
            </Layout>
            <Layout>
                <Button onClick={() => (original.state.user.name += '!')}>
                    original user.name += '!'
                </Button>
                <Button
                    onClick={() =>
                        (original.state.config.theme =
                            original.state.config.theme === 'dark' ? 'light' : 'dark')
                    }>
                    original config.theme 切换
                </Button>
            </Layout>
            <Layout>
                <Button
                    onClick={() =>
                        (mirrorClone.state.user.age = (mirrorClone.state as any).user.age + 1)
                    }>
                    mirrorClone user.age++（会回传 original）
                </Button>
                <Button onClick={() => ((forwardClone.state as any).user.name += '~')}>
                    forwardClone user.name += '~'（不回传）
                </Button>
            </Layout>
        </div>
    );
};
