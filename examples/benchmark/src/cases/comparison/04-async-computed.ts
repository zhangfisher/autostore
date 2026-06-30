/**
 * 异步计算属性性能对比测试
 */

import { Bench } from "tinybench";
import { computed as asyncComputed } from "autostore";
import { AutoStore as AutoStoreNew } from "autostore";
import { AutoStore as AutoStoreLegacy } from "autostore-legacy";
import { showTestHeader, showMemoryUsage, getVersionLabel } from "./utils";

export async function runAsyncComputedTest() {
    showTestHeader("异步计算属性性能对比", "对比新旧版本在异步计算属性上的性能");

    const bench = new Bench({
        time: 2000,
        iterations: 10,
    });

    // 新版本
    const storeNew = new AutoStoreNew({
        a0: 1,
        a1: asyncComputed(
            async (scope: any) => {
                await new Promise((resolve) => setTimeout(resolve, 1));
                return scope.a0 + 1;
            },
            ["a0"],
            { initial: 2 },
        ),
    });

    // 旧版本
    const storeLegacy = new AutoStoreLegacy({
        a0: 1,
        a1: asyncComputed(
            async (scope: any) => {
                await new Promise((resolve) => setTimeout(resolve, 1));
                return scope.a0 + 1;
            },
            ["a0"],
            { initial: 2 },
        ),
    });

    bench
        .add(`${getVersionLabel("new")} 异步计算`, () => {
            return new Promise<void>((resolve) => {
                const subscriber = storeNew.on("computed:done", () => {
                    subscriber.off();
                    resolve();
                });
                storeNew.state.a0++;
            });
        })
        .add(`${getVersionLabel("legacy")} 异步计算`, () => {
            return new Promise<void>((resolve) => {
                const subscriber = storeLegacy.on("computed:done", () => {
                    subscriber.off();
                    resolve();
                });
                storeLegacy.state.a0++;
            });
        });

    await bench.run();
    console.log("\n📊 异步计算性能结果:");
    console.table(bench.table());

    showMemoryUsage("内存使用情况");

    return bench.results;
}
