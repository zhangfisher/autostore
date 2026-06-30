/**
 * 同步计算属性性能对比测试
 */

import { Bench } from "tinybench";
import { AutoStore as AutoStoreNew } from "autostore";
import { AutoStore as AutoStoreLegacy } from "autostore-legacy";
import { showTestHeader, showMemoryUsage, getVersionLabel } from "./utils";

export async function runSyncComputedTest() {
    showTestHeader("同步计算属性性能对比", "对比新旧版本在同步计算属性上的性能");

    const bench = new Bench({
        time: 2000,
        iterations: 10,
    });

    // 新版本
    const storeNew = new AutoStoreNew({
        a: 1,
        b: 2,
        c: 3,
        sum: (scope: any) => scope.a + scope.b + scope.c,
        product: (scope: any) => scope.a * scope.b * scope.c,
        average: (scope: any) => (scope.a + scope.b + scope.c) / 3,
    });

    // 旧版本
    const storeLegacy = new AutoStoreLegacy({
        a: 1,
        b: 2,
        c: 3,
        sum: (scope: any) => scope.a + scope.b + scope.c,
        product: (scope: any) => scope.a * scope.b * scope.c,
        average: (scope: any) => (scope.a + scope.b + scope.c) / 3,
    });

    bench
        .add(`${getVersionLabel("new")} 同步计算属性更新`, () => {
            for (let i = 0; i < 1000; i++) {
                storeNew.state.a = i;
                storeNew.state.b = i + 1;
                storeNew.state.c = i + 2;
                // 触发计算属性重新计算
                const sum = storeNew.state.sum;
                const product = storeNew.state.product;
                const average = storeNew.state.average;
            }
        })
        .add(`${getVersionLabel("legacy")} 同步计算属性更新`, () => {
            for (let i = 0; i < 1000; i++) {
                storeLegacy.state.a = i;
                storeLegacy.state.b = i + 1;
                storeLegacy.state.c = i + 2;
                // 触发计算属性重新计算
                const sum = storeLegacy.state.sum;
                const product = storeLegacy.state.product;
                const average = storeLegacy.state.average;
            }
        });

    await bench.run();
    console.log("\n📊 同步计算属性性能结果:");
    console.table(bench.table());

    showMemoryUsage("内存使用情况");

    return bench.results;
}
