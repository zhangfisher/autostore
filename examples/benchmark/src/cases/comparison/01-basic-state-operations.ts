/**
 * 基础状态操作性能对比测试
 */

import { Bench } from "tinybench";
import { AutoStore as AutoStoreNew } from "autostore";
import { AutoStore as AutoStoreLegacy } from "autostore-legacy";
import { showTestHeader, showMemoryUsage, getVersionLabel } from "./utils";

export async function runBasicStateOperationsTest() {
    showTestHeader("基础状态操作性能对比", "对比新旧版本在基础状态读写操作上的性能");

    const bench = new Bench({
        time: 2000,
        iterations: 10,
    });

    // 新版本
    const storeNew = new AutoStoreNew({
        count: 0,
        name: "test",
        value: 100,
        flag: true,
    });

    // 旧版本
    const storeLegacy = new AutoStoreLegacy({
        count: 0,
        name: "test",
        value: 100,
        flag: true,
    });

    bench
        .add(`${getVersionLabel("new")} 基础状态更新`, () => {
            for (let i = 0; i < 1000; i++) {
                storeNew.state.count = i;
                storeNew.state.name = `test${i}`;
                storeNew.state.value = i * 10;
                storeNew.state.flag = i % 2 === 0;
            }
        })
        .add(`${getVersionLabel("legacy")} 基础状态更新`, () => {
            for (let i = 0; i < 1000; i++) {
                storeLegacy.state.count = i;
                storeLegacy.state.name = `test${i}`;
                storeLegacy.state.value = i * 10;
                storeLegacy.state.flag = i % 2 === 0;
            }
        });

    await bench.run();
    console.log("\n📊 基础状态更新结果:");
    console.table(bench.table());

    showMemoryUsage("内存使用情况");

    return bench.results;
}
