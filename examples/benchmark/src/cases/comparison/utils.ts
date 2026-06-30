/**
 * 对比测试工具函数
 */

import { AutoStore as AutoStoreNew } from 'autostore';
import { AutoStore as AutoStoreLegacy } from 'autostore-legacy';

// 获取内存使用情况
export function getMemoryUsage() {
    if (typeof process !== 'undefined' && process.memoryUsage) {
        const usage = process.memoryUsage();
        return {
            heapUsed: (usage.heapUsed / 1024 / 1024).toFixed(2) + ' MB',
            heapTotal: (usage.heapTotal / 1024 / 1024).toFixed(2) + ' MB',
            rss: (usage.rss / 1024 / 1024).toFixed(2) + ' MB',
            external: (usage.external / 1024 / 1024).toFixed(2) + ' MB',
        };
    }
    return null;
}

// 显示内存使用
export function showMemoryUsage(label: string) {
    const memory = getMemoryUsage();
    if (memory) {
        console.log(`\n📊 ${label}:`);
        console.log(`  RSS: ${memory.rss}`);
        console.log(`  Heap Used: ${memory.heapUsed}`);
        console.log(`  Heap Total: ${memory.heapTotal}`);
        console.log(`  External: ${memory.external}`);
    }
}

// 创建测试分隔符
export function showTestHeader(title: string, description: string) {
    console.log('\n' + '='.repeat(80));
    console.log(`🧪 ${title}`);
    console.log(`📝 ${description}`);
    console.log('='.repeat(80));
}

// 显示测试结果
export function showTestSummary(summary: string) {
    console.log('\n' + '='.repeat(80));
    console.log(`🎉 ${summary}`);
    console.log('='.repeat(80));
}

// 性能提升计算
export function calculateImprovement(newOps: number, legacyOps: number): string {
    if (legacyOps === 0) return 'N/A';
    const improvement = ((newOps - legacyOps) / legacyOps * 100).toFixed(1);
    const sign = parseFloat(improvement) >= 0 ? '+' : '';
    return `${sign}${improvement}%`;
}

// 内存节省计算
export function calculateMemorySaving(newMem: number, legacyMem: number): string {
    if (legacyMem === 0) return 'N/A';
    const saving = ((legacyMem - newMem) / legacyMem * 100).toFixed(1);
    return `-${saving}%`;
}

// 从内存字符串中提取数值（MB）
export function extractMemoryValue(memoryStr: string): number {
    const match = memoryStr.match(/([\d.]+)\s*MB/);
    return match ? parseFloat(match[1]) : 0;
}

// AutoStore 版本类型
export type AutoStoreVersion = 'new' | 'legacy';

// 创建对应版本的 AutoStore
export function createAutoStore(version: AutoStoreVersion, state: any): AutoStoreNew<any> | AutoStoreLegacy<any> {
    if (version === 'new') {
        return new AutoStoreNew(state);
    } else {
        return new AutoStoreLegacy(state);
    }
}

// 获取版本名称
export function getVersionName(version: AutoStoreVersion): string {
    return version === 'new' ? '混合架构 (alien-signals + Proxy)' : 'Proxy-based (v4.2.2)';
}

// 获取版本标签
export function getVersionLabel(version: AutoStoreVersion): string {
    return version === 'new' ? '[新版本]' : '[旧版本]';
}