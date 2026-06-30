/**
 * AutoStore 性能对比测试套件主入口
 *
 * 全面对比新版本 (混合架构 alien-signals + Proxy) 和旧版本 (Proxy-based v4.2.2) 的性能
 */

import { showTestSummary, calculateImprovement } from './utils';
import { runBasicStateOperationsTest } from './01-basic-state-operations';
import { runSyncComputedTest } from './02-sync-computed';
import { runSyncComputedChainTest } from './03-sync-computed-chain';
import { runAsyncComputedTest } from './04-async-computed';
import { runAsyncComputedChainTest } from './05-async-computed-chain';
import { runNestedObjectsTest } from './06-nested-objects';
import { runBatchUpdatesTest } from './07-batch-updates';
import { runMemoryUsageTest } from './08-memory-usage';

console.log('🚀'.repeat(40));
console.log('AutoStore 性能对比测试套件');
console.log('📦 新版本: 混合架构 (alien-signals + Proxy)');
console.log('📦 旧版本: Proxy-based (v4.2.2)');
console.log('🚀'.repeat(40));

async function runAllTests() {
    console.log('\n' + '🎯'.repeat(40));
    console.log('开始运行 AutoStore 性能对比测试');
    console.log('🎯'.repeat(40));

    const results: Record<string, any> = {};

    try {
        // 测试 1: 基础状态操作
        console.log('\n' + '⏱️  1/8 - 基础状态操作测试...');
        results.basicStateOperations = await runBasicStateOperationsTest();

        // 测试 2: 同步计算属性
        console.log('\n' + '⏱️  2/8 - 同步计算属性测试...');
        results.syncComputed = await runSyncComputedTest();

        // 测试 3: 同步计算链
        console.log('\n' + '⏱️  3/8 - 同步计算链测试...');
        results.syncComputedChain = await runSyncComputedChainTest();

        // 测试 4: 异步计算属性
        console.log('\n' + '⏱️  4/8 - 异步计算属性测试...');
        results.asyncComputed = await runAsyncComputedTest();

        // 测试 5: 异步计算链
        console.log('\n' + '⏱️  5/8 - 异步计算链测试...');
        results.asyncComputedChain = await runAsyncComputedChainTest();

        // 测试 6: 嵌套对象操作
        console.log('\n' + '⏱️  6/8 - 嵌套对象操作测试...');
        results.nestedObjects = await runNestedObjectsTest();

        // 测试 7: 批量更新
        console.log('\n' + '⏱️  7/8 - 批量更新测试...');
        results.batchUpdates = await runBatchUpdatesTest();

        // 测试 8: 内存占用
        console.log('\n' + '⏱️  8/8 - 内存占用测试...');
        results.memoryUsage = await runMemoryUsageTest();

        showTestSummary('所有性能对比测试完成！');

        // 性能提升总结
        console.log('\n' + '='.repeat(80));
        console.log('📊 性能提升总结');
        console.log('='.repeat(80));

        // 计算每个测试的性能提升
        const testNames = [
            '基础状态操作',
            '同步计算属性',
            '同步计算链',
            '异步计算属性',
            '异步计算链',
            '嵌套对象操作',
            '批量更新',
        ];

        testNames.forEach((name, index) => {
            const resultKeys = Object.keys(results);
            if (resultKeys[index]) {
                const testResults = results[resultKeys[index]];
                if (testResults && testResults.length >= 2) {
                    const newResult = testResults[0]; // 新版本结果
                    const legacyResult = testResults[1]; // 旧版本结果

                    if (newResult && legacyResult) {
                        const newOps = newResult.ops || newResult.latency !== undefined ? 1000 / (newResult.latency || 1) : 0;
                        const legacyOps = legacyResult.ops || legacyResult.latency !== undefined ? 1000 / (legacyResult.latency || 1) : 0;

                        if (newOps > 0 && legacyOps > 0) {
                            const improvement = calculateImprovement(newOps, legacyOps);
                            console.log(`\n${name}:`);
                            console.log(`  新版本: ${newResult.opsPerSecond?.toFixed(0) || 'N/A'} ops/sec`);
                            console.log(`  旧版本: ${legacyResult.opsPerSecond?.toFixed(0) || 'N/A'} ops/sec`);
                            console.log(`  性能提升: ${improvement}`);
                        }
                    }
                }
            }
        });

        console.log('\n' + '='.repeat(80));
        console.log('💡 说明:');
        console.log('- "ops/sec" 越高表示性能越好');
        console.log('- "margin" 显示性能差异幅度');
        console.log('- 内存使用越低表示内存效率越好');
        console.log('- 混合架构版本应显示显著的性能提升');
        console.log('- 性能提升主要来自 alien-signals 的高效依赖追踪算法');
        console.log('='.repeat(80));

    } catch (error) {
        console.error('❌ 测试执行出错:', error);
    }
}

// 运行所有测试
runAllTests();