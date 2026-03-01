import { Bench } from 'tinybench';
import { AutoStore } from 'autostore';
import { derive, share } from 'helux';

const bench = new Bench({
    time: 1000,
    iterations: 100,
});
const autoStore = new AutoStore({
    a: 50,
    b: (scope: any) => {
        return scope.a + 1;
    },
});
const heluxStore = share({
    value: 0,
});
const [a, setA] = heluxStore;
const b = derive(() => {
    return a.value + 1;
});
bench
    .add('[AutoStore] 同步依赖计算', () => {
        for (let i = 1; i <= 1000; i++) {
            autoStore.state.a = i;
        }
    })
    .add('[Helux] 同步依赖计算', () => {
        for (let i = 1; i <= 1000; i++) {
            setA((draft) => {
                draft.value = i;
            });
        }
    });

(async () => {
    await bench.run();
    console.table(bench.table());
})();
