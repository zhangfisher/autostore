/**
 * 异步计算链性能对比测试
 */

import { Bench } from "tinybench";
import { computed as asyncComputed } from "autostore";
import { AutoStore as AutoStoreNew } from "autostore";
import { AutoStore as AutoStoreLegacy } from "autostore-legacy";
import { showTestHeader, showMemoryUsage, getVersionLabel } from "./utils";

export async function runAsyncComputedChainTest() {
    showTestHeader("异步计算链性能对比", "对比新旧版本在异步计算链上的性能");

    const bench = new Bench({
        time: 2000,
        iterations: 10,
    });

    // 新版本
    const storeNew = new AutoStoreNew({
        base: 1,
        step1: asyncComputed(
            async (scope: any) => {
                await new Promise((resolve) => setTimeout(resolve, 1));
                return scope.base + 10;
            },
            ["base"],
            { initial: 11 },
        ),
        step2: asyncComputed(
            async (scope: any) => {
                await new Promise((resolve) => setTimeout(resolve, 1));
                return scope.step1 + 10;
            },
            ["step1"],
            { initial: 21 },
        ),
        step3: asyncComputed(
            async (scope: any) => {
                await new Promise((resolve) => setTimeout(resolve, 1));
                return scope.step2 + 10;
            },
            ["step2"],
            { initial: 31 },
        ),
    });

    // 旧版本
    const storeLegacy = new AutoStoreLegacy({
        base: 1,
        step1: asyncComputed(
            async (scope: any) => {
                await new Promise((resolve) => setTimeout(resolve, 1));
                return scope.base + 10;
            },
            ["base"],
            { initial: 11 },
        ),
        step2: asyncComputed(
            async (scope: any) => {
                await new Promise((resolve) => setTimeout(resolve, 1));
                return scope.step1 + 10;
            },
            ["step1"],
            { initial: 21 },
        ),
        step3: asyncComputed(
            async (scope: any) => {
                await new Promise((resolve) => setTimeout(resolve, 1));
                return scope.step2 + 10;
            },
            ["step2"],
            { initial: 31 },
        ),
    });

    bench
        .add(`${getVersionLabel("new")} 异步计算链`, () => {
            return new Promise<void>((resolve) => {
                let completed = 0;
                const subscriber = storeNew.on("computed:done", () => {
                    completed++;
                    if (completed >= 3) {
                        subscriber.off();
                        resolve();
                    }
                });
                storeNew.state.base++;
            });
        })
        .add(`${getVersionLabel("legacy")} 异步计算链`, () => {
            return new Promise<void>((resolve) => {
                let completed = 0;
                const subscriber = storeLegacy.on("computed:done", () => {
                    completed++;
                    if (completed >= 3) {
                        subscriber.off();
                        resolve();
                    }
                });
                storeLegacy.state.base++;
            });
        });

    await bench.run();
    console.log("\n📊 异步计算链性能结果:");
    console.table(bench.table());

    showMemoryUsage("内存使用情况");

    return bench.results;
}
