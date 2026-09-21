/**
 * 响应式 Proxy 读取热路径基准测试
 *
 * 运行: bun run bench/reactive-bench.ts
 *
 * 用于评估 createProxy get 陷阱优化前后的性能差异：
 * - 构建耗时（含 forEachObject 遍历）
 * - 无订阅者时的读取热路径（门控收益）
 * - 有订阅者时的读取热路径（路径预拼接收益）
 * - 快照与数组变更
 *
 * 输出每轮耗时中位数(ms)，优化前后对比请分别运行并保存输出。
 */
import { AutoStore } from "../src";

const N = 10_000;
const SINK: { value: number } = { value: 0 };

/** 生成标量数组 */
const makeScalars = () => Array.from({ length: N }, (_, i) => i);
/** 生成对象数组 */
const makeObjects = () => Array.from({ length: N }, (_, i) => ({ id: i, name: `n${i}`, score: i * 2 }));

type Case = { label: string; rounds: number; fn: () => void };

/** 多轮计时取中位数，减少系统噪声干扰 */
function measure(cases: Case[]) {
    const results: { label: string; median: number; min: number }[] = [];
    for (const { label, rounds, fn } of cases) {
        for (let i = 0; i < 3; i++) fn(); // 预热
        const times: number[] = [];
        for (let i = 0; i < rounds; i++) {
            const start = performance.now();
            fn();
            times.push(performance.now() - start);
        }
        times.sort((a, b) => a - b);
        results.push({
            label,
            median: times[Math.floor(times.length / 2)],
            min: times[0],
        });
    }
    return results;
}

function report(title: string, results: { label: string; median: number; min: number }[]) {
    console.log(`\n## ${title}`);
    for (const { label, median, min } of results) {
        console.log(`${label.padEnd(46)} 中位数: ${median.toFixed(3)}ms    最快: ${min.toFixed(3)}ms`);
    }
}

// ************************ 构建场景 ************************

report("构建 (N=10,000)", measure([
    {
        label: "构建: 标量数组",
        rounds: 20,
        fn: () => {
            new AutoStore({ items: makeScalars() });
        },
    },
    {
        label: "构建: 对象数组",
        rounds: 20,
        fn: () => {
            new AutoStore({ items: makeObjects() });
        },
    },
]));

// ************************ 读取场景 ************************

// 无订阅者: 纯状态容器用法
const scalarStore = new AutoStore({ items: makeScalars() });
const objStore = new AutoStore({ items: makeObjects() });
const objStoreWriteWatch = new AutoStore({ items: makeObjects() });
objStoreWriteWatch.watch("items", () => {}); // 默认 operates:"write"
const objStoreAllWatch = new AutoStore({ items: makeObjects() });
objStoreAllWatch.watch("items", () => {}, { operates: "*" });

const readScalars = (store: AutoStore<any>) => {
    let s = 0;
    const arr = store.state.items;
    for (let i = 0; i < arr.length; i++) s += arr[i];
    SINK.value = s;
};
const readObjects = (store: AutoStore<any>) => {
    let s = 0;
    const arr = store.state.items;
    for (let i = 0; i < arr.length; i++) s += arr[i].score;
    SINK.value = s;
};

report("读取 (N=10,000)", measure([
    {
        label: "读取: 标量数组 [无订阅者]",
        rounds: 30,
        fn: () => readScalars(scalarStore),
    },
    {
        label: "读取: 对象数组取属性 [无订阅者]",
        rounds: 30,
        fn: () => readObjects(objStore),
    },
    {
        label: "读取: 对象数组取属性 [write watch]",
        rounds: 30,
        fn: () => readObjects(objStoreWriteWatch),
    },
    {
        label: "读取: 对象数组取属性 [* watch]",
        rounds: 30,
        fn: () => readObjects(objStoreAllWatch),
    },
]));

// ************************ 快照与变更场景 ************************

const mutationStore = new AutoStore({ items: makeScalars() });
const snapshotStore = new AutoStore({ items: makeObjects() });

report("快照与变更", measure([
    {
        label: "快照: getSnap (10k 对象数组)",
        rounds: 30,
        fn: () => {
            SINK.value = JSON.stringify(snapshotStore.getSnap()).length;
        },
    },
    {
        label: "变更: push/pop x100 (标量数组)",
        rounds: 30,
        fn: () => {
            const arr = mutationStore.state.items;
            for (let i = 0; i < 100; i++) arr.push(i);
            for (let i = 0; i < 100; i++) arr.pop();
        },
    },
    {
        label: "变更: 索引写入 x100 (标量数组)",
        rounds: 30,
        fn: () => {
            const arr = mutationStore.state.items;
            for (let i = 0; i < 100; i++) arr[i] = i;
        },
    },
]));

console.log(`\n(sink=${SINK.value} 防止死代码消除)`);
