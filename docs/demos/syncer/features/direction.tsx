// 同步方向：both / forward / backward 三种方向实时对比
import { createStore } from '@autostorejs/react';
import '@autostorejs/syncer';
import React from 'react';
import { Button, Layout, JsonView, Box } from 'x-react-components';

type Direction = 'both' | 'forward' | 'backward';

// mode:'none' 避免建立同步时的初始快照互相干扰，只观察运行时方向
const makePair = (direction: Direction) => {
    const s1 = createStore({ count: 0 });
    const s2 = createStore({ count: 0 });
    s1.sync(s2, { mode: 'none', direction });
    return { s1, s2 };
};

const both = makePair('both');
const forward = makePair('forward');
const backward = makePair('backward');

const groups: { title: string; direction: string; pair: { s1: any; s2: any } }[] = [
    { title: 'both（双向）', direction: 'both', pair: both },
    { title: 'forward（仅 本地→远程）', direction: 'forward', pair: forward },
    { title: 'backward（仅 远程→本地）', direction: 'backward', pair: backward },
];

export default () => (
    <div>
        {groups.map((g) => (
            <Layout key={g.direction}>
                <Box title={`${g.title} - Store1（本地）`}>
                    <JsonView data={g.pair.s1.useReactive()[0]} />
                    <Layout>
                        <Button onClick={() => (g.pair.s1.state.count = g.pair.s1.state.count + 1)}>Store1 count++</Button>
                    </Layout>
                </Box>
                <Box title={`${g.title} - Store2（远程）`}>
                    <JsonView data={g.pair.s2.useReactive()[0]} />
                    <Layout>
                        <Button onClick={() => (g.pair.s2.state.count = g.pair.s2.state.count + 1)}>Store2 count++</Button>
                    </Layout>
                </Box>
            </Layout>
        ))}
    </div>
);
