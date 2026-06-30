/**
 * 同步计算链性能对比测试
 */

import { Bench } from "tinybench";
import { AutoStore as AutoStoreNew } from "autostore";
import { AutoStore as AutoStoreLegacy } from "autostore-legacy";
import { showTestHeader, showMemoryUsage, getVersionLabel } from "./utils";

export async function runSyncComputedChainTest() {
    showTestHeader("同步计算链性能对比", "对比新旧版本在多重依赖链同步计算上的性能");

    const bench = new Bench({
        time: 2000,
        iterations: 10,
    });

    // 新版本
    const storeNew = new AutoStoreNew({
        a0: 50,
        a1: (scope: any) => scope.a0 + 1,
        a2: (scope: any) => scope.a1 + 1,
        a3: (scope: any) => scope.a2 + 1,
        a4: (scope: any) => scope.a3 + 1,
        a5: (scope: any) => scope.a4 + 1,
        a6: (scope: any) => scope.a5 + 1,
        a7: (scope: any) => scope.a6 + 1,
        a8: (scope: any) => scope.a7 + 1,
        a9: (scope: any) => scope.a8 + 1,
        a10: (scope: any) => scope.a9 + 1,
    });

    // 旧版本
    const storeLegacy = new AutoStoreLegacy({
        a0: 50,
        a1: (scope: any) => scope.a0 + 1,
        a2: (scope: any) => scope.a1 + 1,
        a3: (scope: any) => scope.a2 + 1,
        a4: (scope: any) => scope.a3 + 1,
        a5: (scope: any) => scope.a4 + 1,
        a6: (scope: any) => scope.a5 + 1,
        a7: (scope: any) => scope.a6 + 1,
        a8: (scope: any) => scope.a7 + 1,
        a9: (scope: any) => scope.a8 + 1,
        a10: (scope: any) => scope.a9 + 1,
    });

    bench
        .add(`${getVersionLabel("new")} 多重依赖链同步计算`, () => {
            for (let i = 1; i <= 1000; i++) {
                storeNew.state.a0 = i;
            }
        })
        .add(`${getVersionLabel("legacy")} 多重依赖链同步计算`, () => {
            for (let i = 1; i <= 1000; i++) {
                storeLegacy.state.a0 = i;
            }
        });

    await bench.run();
    console.log("\n📊 多重依赖链同步计算结果:");
    console.table(bench.table());

    showMemoryUsage("内存使用情况");

    return bench.results;
}
