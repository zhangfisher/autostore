import { Bench } from 'tinybench';
import { computed, AutoStore } from 'autostore';
import { share, watch } from 'helux';
import { delay } from '../utils';

const bench = new Bench({
    time: 1000,
    iterations: 10,
});

const autoStore = new AutoStore({
    a0: 1,
    a1: computed(
        async (scope: any) => {
            await delay(1);
            return scope.a0 + 1;
        },
        ['a0'],
        { initial: 2 },
    ),
});
const heluxStore = share(
    {
        a0: 0,
        a1: 0,
    },
    {
        mutate: {
            a1: {
                fn: (draft) => {
                    draft.a1 = draft.a0 + 1;
                },
                task: async ({ setState }) => {
                    await delay(1);
                    setState((draft) => {
                        draft.a1 = draft.a0 + 1;
                    });
                },
            },
        },
    },
);

bench
    .add('[AutoStore] 异步计算', () => {
        return new Promise<void>((resolve) => {
            const subscriber = autoStore.on('computed:done', () => {
                subscriber.off();
                resolve();
            });
            autoStore.state.a0++;
        });
    })
    .add('[Helux] 异步计算', () => {
        return new Promise<void>((resolve) => {
            const [state, setState] = heluxStore;
            const { unwatch } = watch(
                () => {
                    unwatch();
                    resolve();
                },
                () => [state.a1],
            );
            setState((draft: any) => {
                draft.a0 = draft.a0 + 1;
            });
        });
    });

await bench.run();
console.table(bench.table());
