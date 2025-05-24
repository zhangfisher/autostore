import { createStore, computed } from '@autostorejs/react';
import React from 'react';
import { Button, Layout, JsonView } from 'x-react-components';
import '@autostorejs/syncer';

const store1 = createStore({
    x: {
        a: 1,
        b: 2,
        c: 3,
    },
});
const { useReactive: useReactive1 } = store1;

const store2 = createStore({
    y: {},
});
const { useReactive: useReactive2 } = store2;

store1.sync(store2, {
    pathMap: {
        toRemote: (path) => {
            if (path.length === 1 && path[0] === 'x') {
                return ['y'];
            } else if (path.length > 1 && path[0] === 'x') {
                return ['y', `${path[1]}${path[1]}`];
            }
        },
        toLocal: (path) => {
            if (path.length === 1 && path[0] === 'y') {
                return ['x'];
            } else if (path.length > 1 && path[0] === 'y') {
                return ['x', path[1].charAt(0)];
            }
        },
    },
});

export default () => {
    const [state1] = useReactive1();
    const [state2] = useReactive2();
    const [a1, setA1] = useReactive1('x.a');
    // @ts-ignore
    const [a2, setA2] = useReactive2('y.aa');

    return (
        <div>
            <Layout>
                <div>
                    <JsonView data={state1} />
                </div>
                <div>
                    <JsonView data={state2} />{' '}
                </div>
            </Layout>
            <Layout>
                <div>
                    <Button onClick={() => setA1(state1.x.a + 1)}>Store1 A++</Button>
                    <Button onClick={() => setA1(state1.x.a - 1)}>Store1 A--</Button>
                </div>
                <div>
                    {/*  @ts-ignore */}
                    <Button onClick={() => setA2(state2.y.aa + 1)}>Store2 AA++</Button>
                    {/*  @ts-ignore */}
                    <Button onClick={() => setA2(state2.y.aa - 1)}>Store2 AA--</Button>
                </div>
            </Layout>
        </div>
    );
};
