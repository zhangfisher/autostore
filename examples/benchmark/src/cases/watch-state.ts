import { Bench } from 'tinybench';
import { AutoStore } from 'autostore';
import { share, watch } from 'helux';

const bench = new Bench({
    time: 1000,
    iterations: 100,
});

// 创建 AutoStore 实例并注册 100 个 watch
const autoStore = new AutoStore({
    value: 0,
});

let autoStoreWatchCount = 0;
let autoStoreWatchResolver: (() => void) | null = null;

// 注册 100 个 watch 监听器
for (let i = 0; i < 100; i++) {
    autoStore.watch(({ value, oldValue }) => {
        // 模拟 watch 处理逻辑
        const result = (value as number) + (oldValue as number) + i;
        autoStoreWatchCount++;
        if (autoStoreWatchCount >= 100 && autoStoreWatchResolver) {
            autoStoreWatchResolver();
        }
        return result;
    });
}

// 创建 Helux store 并注册 100 个 watch
const heluxStore = share({
    value: 0,
},{
    checkDeadCycle: false	
});

const [state, setState] = heluxStore;

let heluxWatchCount = 0;
let heluxWatchResolver: (() => void) | null = null;

// 注册 100 个 watch 监听器
for (let i = 0; i < 100; i++) {
    watch(
        () => {
            const val = state.value;
            // 模拟 watch 处理逻辑
            const result = val + i;
            heluxWatchCount++;
            if (heluxWatchCount >= 100 && heluxWatchResolver) {
                heluxWatchResolver();
            }
            return result;
        },       
        { immediate: true },
    );
}

bench
    .add('[AutoStore] 触发100个watch', () => {
        return new Promise<void>((resolve) => {
            autoStoreWatchCount = 0;
            autoStoreWatchResolver = resolve;
            autoStore.state.value = Math.random();
        });
    })
    .add('[Helux] 触发100个watch', () => {
        return new Promise<void>((resolve) => {
            heluxWatchCount = 0;
            heluxWatchResolver = resolve;
            setState((draft: any) => {
                draft.value = Math.random();
            });
        });
    });

(async () => {
    await bench.run();
    console.table(bench.table());
})();
