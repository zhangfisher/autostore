/**
 * 内存占用对比测试
 */

import { AutoStore as AutoStoreNew } from 'autostore';
import { AutoStore as AutoStoreLegacy } from 'autostore-legacy';
import { showTestHeader, showMemoryUsage, getVersionLabel, extractMemoryValue, calculateMemorySaving } from './utils';

export async function runMemoryUsageTest() {
    showTestHeader(
        '内存占用对比测试',
        '对比新旧版本在创建大量状态和计算属性时的内存使用'
    );

    showMemoryUsage('初始内存状态');

    const stateSize = 1000;
    console.log(`\n创建 ${stateSize} 个状态对象和计算属性...`);

    // 新版本
    console.log(`\n🔧 创建新版本 store...`);
    const newStoreStates: any = {};
    for (let i = 0; i < stateSize; i++) {
        newStoreStates[`key${i}`] = i;
        newStoreStates[`computed${i}`] = (scope: any) => scope[`key${i}`] * 2;
    }

    const storeNew = new AutoStoreNew(newStoreStates);
    const memoryAfterNewCreation = showMemoryUsage(`${getVersionLabel('new')} 内存使用 (创建后)`);

    // 强制垃圾回收（如果可用）
    if (global.gc) {
        console.log('\n🧹 执行垃圾回收...');
        global.gc();
    }

    // 旧版本
    console.log(`\n🔧 创建旧版本 store...`);
    const legacyStoreStates: any = {};
    for (let i = 0; i < stateSize; i++) {
        legacyStoreStates[`key${i}`] = i;
        legacyStoreStates[`computed${i}`] = (scope: any) => scope[`key${i}`] * 2;
    }

    const storeLegacy = new AutoStoreLegacy(legacyStoreStates);
    const memoryAfterLegacyCreation = showMemoryUsage(`${getVersionLabel('legacy')} 内存使用 (创建后)`);

    // 执行大量更新操作
    console.log(`\n执行 ${stateSize} 次更新操作...`);

    // 新版本更新
    for (let i = 0; i < 100; i++) {
        const key = `key${i % stateSize}`;
        storeNew.state[key] = i * 2;
    }
    const memoryAfterNewUpdate = showMemoryUsage(`${getVersionLabel('new')} 内存使用 (更新后)`);

    // 强制垃圾回收（如果可用）
    if (global.gc) {
        console.log('\n🧹 执行垃圾回收...');
        global.gc();
    }

    // 旧版本更新
    for (let i = 0; i < 100; i++) {
        const key = `key${i % stateSize}`;
        storeLegacy.state[key] = i * 2;
    }
    const memoryAfterLegacyUpdate = showMemoryUsage(`${getVersionLabel('legacy')} 内存使用 (更新后)`);

    // 访问所有计算属性
    console.log(`\n访问所有计算属性...`);
    let newSum = 0;
    for (let i = 0; i < 100; i++) {
        const key = `computed${i % stateSize}`;
        newSum += storeNew.state[key];
    }
    const memoryAfterNewComputed = showMemoryUsage(`${getVersionLabel('new')} 内存使用 (计算后)`);

    // 强制垃圾回收（如果可用）
    if (global.gc) {
        console.log('\n🧹 执行垃圾回收...');
        global.gc();
    }

    let legacySum = 0;
    for (let i = 0; i < 100; i++) {
        const key = `computed${i % stateSize}`;
        legacySum += storeLegacy.state[key];
    }
    const memoryAfterLegacyComputed = showMemoryUsage(`${getVersionLabel('legacy')} 内存使用 (计算后)`);

    console.log(`\n✅ 验证计算结果:`);
    console.log(`${getVersionLabel('new')} 计算结果: ${newSum}`);
    console.log(`${getVersionLabel('legacy')} 计算结果: ${legacySum}`);

    // 计算内存节省
    if (memoryAfterNewCreation && memoryAfterLegacyCreation) {
        const newMem = extractMemoryValue(memoryAfterNewCreation.heapUsed);
        const legacyMem = extractMemoryValue(memoryAfterLegacyCreation.heapUsed);
        const saving = calculateMemorySaving(newMem, legacyMem);
        console.log(`\n📊 内存使用对比 (创建 ${stateSize} 个状态):`);
        console.log(`${getVersionLabel('new')}: ${memoryAfterNewCreation.heapUsed}`);
        console.log(`${getVersionLabel('legacy')}: ${memoryAfterLegacyCreation.heapUsed}`);
        console.log(`内存节省: ${saving}`);
    }

    return {
        newVersion: {
            afterCreation: memoryAfterNewCreation,
            afterUpdate: memoryAfterNewUpdate,
            afterComputed: memoryAfterNewComputed,
        },
        legacyVersion: {
            afterCreation: memoryAfterLegacyCreation,
            afterUpdate: memoryAfterLegacyUpdate,
            afterComputed: memoryAfterLegacyComputed,
        },
    };
}