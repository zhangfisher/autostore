/**
 * 综合性能对比测试
 */

import { Bench } from "tinybench";
import { AutoStore as AutoStoreNew } from "autostore";
import { AutoStore as AutoStoreLegacy } from "autostore-legacy";
import { computed as asyncComputed } from "autostore";

console.log("🚀 AutoStore 综合性能对比测试");
console.log("📦 新版本: 混合架构 (alien-signals + Proxy)");
console.log("📦 旧版本: Proxy-based (v4.2.2)");
console.log("=".repeat(80));

async function runComprehensiveTest() {
    console.log("\n🧪 测试 1: 大规模基础状态操作");
    console.log("-".repeat(80));

    const bench1 = new Bench({
        time: 2000,
        iterations: 10,
    });

    const storeNew1 = new AutoStoreNew({
        count: 0,
        name: "test",
        value: 100,
    });

    const storeLegacy1 = new AutoStoreLegacy({
        count: 0,
        name: "test",
        value: 100,
    });

    bench1
        .add("[新版本] 大规模状态更新 (10000次)", () => {
            for (let i = 0; i < 10000; i++) {
                storeNew1.state.count = i;
                storeNew1.state.name = `test${i}`;
                storeNew1.state.value = i * 10;
            }
        })
        .add("[旧版本] 大规模状态更新 (10000次)", () => {
            for (let i = 0; i < 10000; i++) {
                storeLegacy1.state.count = i;
                storeLegacy1.state.name = `test${i}`;
                storeLegacy1.state.value = i * 10;
            }
        });

    await bench1.run();
    console.table(bench1.table());

    console.log("\n🧪 测试 2: 计算属性性能");
    console.log("-".repeat(80));

    const bench2 = new Bench({
        time: 2000,
        iterations: 100,
    });

    const storeNew2 = new AutoStoreNew({
        a: 1,
        b: 2,
        sum: (scope: any) => scope.a + scope.b,
        product: (scope: any) => scope.a * scope.b,
    });

    const storeLegacy2 = new AutoStoreLegacy({
        a: 1,
        b: 2,
        sum: (scope: any) => scope.a + scope.b,
        product: (scope: any) => scope.a * scope.b,
    });

    bench2
        .add("[新版本] 计算属性更新", () => {
            for (let i = 0; i < 5000; i++) {
                storeNew2.state.a = i;
                storeNew2.state.b = i + 1;
                const sum = storeNew2.state.sum;
                const product = storeNew2.state.product;
            }
        })
        .add("[旧版本] 计算属性更新", () => {
            for (let i = 0; i < 5000; i++) {
                storeLegacy2.state.a = i;
                storeLegacy2.state.b = i + 1;
                const sum = storeLegacy2.state.sum;
                const product = storeLegacy2.state.product;
            }
        });

    await bench2.run();
    console.table(bench2.table());

    console.log("\n🧪 测试 3: 复杂计算链");
    console.log("-".repeat(80));

    const bench3 = new Bench({
        time: 2000,
        iterations: 50,
    });

    const storeNew3 = new AutoStoreNew({
        base: 1,
        level1: (scope: any) => scope.base + 1,
        level2: (scope: any) => scope.level1 * 2,
        level3: (scope: any) => scope.level2 + 5,
        level4: (scope: any) => scope.level3 * 3,
    });

    const storeLegacy3 = new AutoStoreLegacy({
        base: 1,
        level1: (scope: any) => scope.base + 1,
        level2: (scope: any) => scope.level1 * 2,
        level3: (scope: any) => scope.level2 + 5,
        level4: (scope: any) => scope.level3 * 3,
    });

    bench3
        .add("[新版本] 复杂计算链", () => {
            for (let i = 0; i < 1000; i++) {
                storeNew3.state.base = i;
                const result = storeNew3.state.level4;
            }
        })
        .add("[旧版本] 复杂计算链", () => {
            for (let i = 0; i < 1000; i++) {
                storeLegacy3.state.base = i;
                const result = storeLegacy3.state.level4;
            }
        });

    await bench3.run();
    console.table(bench3.table());

    // 综合分析
    console.log("\n🎯 综合性能分析:");
    console.log("=".repeat(80));

    const allResults = [
        { name: "大规模基础操作", results: bench1.results },
        { name: "计算属性", results: bench2.results },
        { name: "复杂计算链", results: bench3.results },
    ];

    allResults.forEach(({ name, results }) => {
        if (results && results.length >= 2) {
            const newResult = results[0];
            const legacyResult = results[1];

            if (newResult && legacyResult) {
                const newOps = newResult.opsPerSecond || 0;
                const legacyOps = legacyResult.opsPerSecond || 0;

                if (newOps > 0 && legacyOps > 0) {
                    const improvement = (((newOps - legacyOps) / legacyOps) * 100).toFixed(1);
                    console.log(`\n${name}:`);
                    console.log(`  新版本: ${newOps.toFixed(2)} ops/sec`);
                    console.log(`  旧版本: ${legacyOps.toFixed(2)} ops/sec`);
                    console.log(
                        `  性能提升: ${parseFloat(improvement) >= 0 ? "+" : ""}${improvement}%`,
                    );
                }
            }
        }
    });

    console.log("\n✅ 综合测试完成！");
}

runComprehensiveTest().catch(console.error);
