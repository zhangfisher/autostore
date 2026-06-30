/**
 * 快速性能对比测试
 */

import { Bench } from "tinybench";
import { AutoStore as AutoStoreNew } from "autostore";
import { AutoStore as AutoStoreLegacy } from "autostore-legacy";

console.log("🚀 AutoStore 快速性能对比测试");
console.log("📦 新版本: 混合架构 (alien-signals + Proxy)");
console.log("📦 旧版本: Proxy-based (v4.2.2)");
console.log("=".repeat(80));

async function runQuickTest() {
    const bench = new Bench({
        time: 1000,
        iterations: 10,
    });

    // 新版本
    const storeNew = new AutoStoreNew({
        count: 0,
        name: "test",
        value: 100,
    });

    // 旧版本
    const storeLegacy = new AutoStoreLegacy({
        count: 0,
        name: "test",
        value: 100,
    });

    bench
        .add("[新版本] 基础状态更新", () => {
            for (let i = 0; i < 1000; i++) {
                storeNew.state.count = i;
                storeNew.state.name = `test${i}`;
                storeNew.state.value = i * 10;
            }
        })
        .add("[旧版本] 基础状态更新", () => {
            for (let i = 0; i < 1000; i++) {
                storeLegacy.state.count = i;
                storeLegacy.state.name = `test${i}`;
                storeLegacy.state.value = i * 10;
            }
        });

    await bench.run();
    console.log("\n📊 基础状态更新结果:");
    console.table(bench.table());

    // 计算性能提升
    if (bench.results && bench.results.length >= 2) {
        const newResult = bench.results[0];
        const legacyResult = bench.results[1];

        if (newResult && legacyResult) {
            const newOps = newResult.opsPerSecond || 0;
            const legacyOps = legacyResult.opsPerSecond || 0;

            if (newOps > 0 && legacyOps > 0) {
                const improvement = (((newOps - legacyOps) / legacyOps) * 100).toFixed(1);
                console.log("\n🎯 性能提升分析:");
                console.log(`新版本: ${newOps.toFixed(2)} ops/sec`);
                console.log(`旧版本: ${legacyOps.toFixed(2)} ops/sec`);
                console.log(`性能提升: +${improvement}%`);

                // 延迟对比
                const newLatency = newResult.latency || 0;
                const legacyLatency = legacyResult.latency || 0;

                if (newLatency > 0 && legacyLatency > 0) {
                    const latencyImprovement = (
                        ((legacyLatency - newLatency) / legacyLatency) *
                        100
                    ).toFixed(1);
                    console.log(`\n延迟对比:`);
                    console.log(`新版本: ${(newLatency / 1000000).toFixed(2)} ms`);
                    console.log(`旧版本: ${(legacyLatency / 1000000).toFixed(2)} ms`);
                    console.log(`延迟降低: -${latencyImprovement}%`);
                }
            }
        }
    }

    console.log("\n✅ 快速测试完成！");
}

runQuickTest().catch(console.error);
