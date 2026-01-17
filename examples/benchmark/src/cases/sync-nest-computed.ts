import { Bench } from 'tinybench';
import { AutoStore } from 'autostore';
import { derive, share } from 'helux';

const bench = new Bench({
    time: 1000,
    iterations: 100,
});
const autoStore = new AutoStore({
    a0: {
        a1: {
            a2: {
                a3: {
                    a4: {
                        a5: {
                            a6: {
                                a7: {
                                    a8: {
                                        a9: {
                                            value: 0,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    b: (scope: any) => {
        return scope.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.value + 1;
    },
});
const heluxStore = share({
    a0: {
        a1: {
            a2: {
                a3: {
                    a4: {
                        a5: {
                            a6: {
                                a7: {
                                    a8: {
                                        a9: {
                                            value: 0,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
});
const [a, setA] = heluxStore;
const b = derive(() => {
    return a.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.value + 1;
});
bench
    .add('[AutoStore] 同步嵌套依赖计算', () => {
        for (let i = 1; i <= 1000; i++) {
            autoStore.state.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.value = i;
        }
    })
    .add('[Helux] 同步嵌套依赖计算', () => {
        for (let i = 1; i <= 1000; i++) {
            setA((draft) => {
                draft.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.value = i;
            });
        }
    });

(async () => {
    await bench.run();
    console.table(bench.table());
})();
