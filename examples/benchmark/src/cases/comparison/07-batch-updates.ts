/**
 * 批量更新性能对比测试
 */

import { Bench } from "tinybench";
import { AutoStore as AutoStoreNew } from "autostore";
import { AutoStore as AutoStoreLegacy } from "autostore-legacy";
import { showTestHeader, showMemoryUsage, getVersionLabel } from "./utils";

export async function runBatchUpdatesTest() {
    showTestHeader("批量更新性能对比", "对比新旧版本在批量更新操作上的性能");

    const bench = new Bench({
        time: 2000,
        iterations: 10,
    });

    // 新版本
    const storeNew = new AutoStoreNew({
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
    });

    // 旧版本
    const storeLegacy = new AutoStoreLegacy({
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
    });

    bench
        .add(`${getVersionLabel("new")} 批量更新`, () => {
            for (let i = 0; i < 100; i++) {
                storeNew.batchUpdate((state) => {
                    state.a = i;
                    state.b = i + 1;
                    state.c = i + 2;
                    state.d = i + 3;
                    state.e = i + 4;
                });
            }
        })
        .add(`${getVersionLabel("legacy")} 批量更新`, () => {
            for (let i = 0; i < 100; i++) {
                storeLegacy.batchUpdate((state) => {
                    state.a = i;
                    state.b = i + 1;
                    state.c = i + 2;
                    state.d = i + 3;
                    state.e = i + 4;
                });
            }
        });

    await bench.run();
    console.log("\n📊 批量更新性能结果:");
    console.table(bench.table());

    showMemoryUsage("内存使用情况");

    return bench.results;
}
