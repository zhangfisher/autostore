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
    a2: computed(
        async (scope: any) => {
            await delay(1);
            return scope.a1.value + 1;
        },
        ['a1'],
        { initial: 3 },
    ),
    a3: computed(
        async (scope: any) => {
            await delay(1);
            return scope.a2.value + 1;
        },
        ['a2'],
        { initial: 4 },
    ),
    a4: computed(
        async (scope: any) => {
            await delay(1);
            return scope.a3.value + 1;
        },
        ['a3'],
        { initial: 5 },
    ),
    a5: computed(
        async (scope: any) => {
            await delay(1);
            return scope.a4.value + 1;
        },
        ['a4'],
        { initial: 6 },
    ),
    a6: computed(
        async (scope: any) => {
            await delay(1);
            return scope.a5.value + 1;
        },
        ['a5'],
        { initial: 7 },
    ),
    a7: computed(
        async (scope: any) => {
            await delay(1);
            return scope.a6.value + 1;
        },
        ['a6'],
        { initial: 8 },
    ),
    a8: computed(
        async (scope: any) => {
            await delay(1);
            return scope.a7.value + 1;
        },
        ['a7'],
        { initial: 9 },
    ),
    a9: computed(
        async (scope: any) => {
            await delay(1);
            return scope.a8.value + 1;
        },
        ['a8'],
        { initial: 10 },
    ),
});
const heluxStore = share(
    {
        a0: 0,
        a1: 0,
        a2: 0,
        a3: 0,
        a4: 0,
        a5: 0,
        a6: 0,
        a7: 0,
        a8: 0,
        a9: 0,
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
            a2: {
                fn: (draft) => {
                    draft.a2 = draft.a1 + 1;
                },
                task: async ({ setState }) => {
                    await delay(1);
                    setState((draft) => {
                        draft.a2 = draft.a1 + 1;
                    });
                },
            },
            a3: {
                fn: (draft) => {
                    draft.a3 = draft.a2 + 1;
                },
                task: async ({ setState }) => {
                    await delay(1);
                    setState((draft) => {
                        draft.a3 = draft.a2 + 1;
                    });
                },
            },
            a4: {
                fn: (draft) => {
                    draft.a4 = draft.a3 + 1;
                },
                task: async ({ setState }) => {
                    await delay(1);
                    setState((draft) => {
                        draft.a4 = draft.a3 + 1;
                    });
                },
            },
            a5: {
                fn: (draft) => {
                    draft.a5 = draft.a4 + 1;
                },
                task: async ({ setState }) => {
                    await delay(1);
                    setState((draft) => {
                        draft.a5 = draft.a4 + 1;
                    });
                },
            },
            a6: {
                fn: (draft) => {
                    draft.a6 = draft.a5 + 1;
                },
                task: async ({ setState }) => {
                    await delay(1);
                    setState((draft) => {
                        draft.a6 = draft.a5 + 1;
                    });
                },
            },
            a7: {
                fn: (draft) => {
                    draft.a7 = draft.a6 + 1;
                },
                task: async ({ setState }) => {
                    await delay(1);
                    setState((draft) => {
                        draft.a7 = draft.a6 + 1;
                    });
                },
            },
            a8: {
                fn: (draft) => {
                    draft.a8 = draft.a7 + 1;
                },
                task: async ({ setState }) => {
                    await delay(1);
                    setState((draft) => {
                        draft.a8 = draft.a7 + 1;
                    });
                },
            },
            a9: {
                fn: (draft) => {
                    draft.a9 = draft.a8 + 1;
                },
                task: async ({ setState }) => {
                    await delay(1);
                    setState((draft) => {
                        draft.a9 = draft.a8 + 1;
                    });
                },
            },
        },
    },
);

bench
    .add('[AutoStore] 多重依赖链异步计算', async () => {
        await new Promise<void>((resolve) => {
            const subscriber = autoStore.on('computed:done', (event) => {
                if (event.path.join('.') === 'a9') {
                    subscriber.off();
                    resolve();
                }
            });
            autoStore.state.a0++;
        });
    })
    .add('[Helux] 多重依赖链异步计算', async () => {
        await new Promise<void>((resolve) => {
            const [state, setState] = heluxStore;
            const { unwatch } = watch(
                () => {
                    unwatch();
                    resolve();
                },
                () => [state.a9],
            );
            setState((draft: any) => {
                draft.a0++;
            });
        });
    });

(async () => {
    await bench.run();
    console.table(bench.table());
})();
