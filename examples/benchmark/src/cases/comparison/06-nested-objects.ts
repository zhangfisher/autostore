/**
 * 嵌套对象操作性能对比测试
 */

import { Bench } from "tinybench";
import { AutoStore as AutoStoreNew } from "autostore";
import { AutoStore as AutoStoreLegacy } from "autostore-legacy";
import { showTestHeader, showMemoryUsage, getVersionLabel } from "./utils";

export async function runNestedObjectsTest() {
    showTestHeader("嵌套对象操作性能对比", "对比新旧版本在深层嵌套对象操作上的性能");

    const bench = new Bench({
        time: 2000,
        iterations: 10,
    });

    const nestedState = {
        user: {
            profile: {
                settings: {
                    theme: "dark" as const,
                    language: "en" as const,
                    fontSize: 14,
                },
                preferences: {
                    notifications: true,
                    updates: false,
                    autoSave: true,
                },
                account: {
                    level: 1,
                    points: 100,
                    status: "active" as const,
                },
            },
        },
    };

    // 新版本
    const storeNew = new AutoStoreNew(JSON.parse(JSON.stringify(nestedState)));

    // 旧版本
    const storeLegacy = new AutoStoreLegacy(JSON.parse(JSON.stringify(nestedState)));

    bench
        .add(`${getVersionLabel("new")} 深层嵌套对象更新`, () => {
            for (let i = 0; i < 1000; i++) {
                storeNew.state.user.profile.settings.theme = i % 2 === 0 ? "dark" : "light";
                storeNew.state.user.profile.settings.language = i % 2 === 0 ? "en" : "zh";
                storeNew.state.user.profile.settings.fontSize = 12 + (i % 4);
                storeNew.state.user.profile.preferences.notifications = i % 2 === 0;
                storeNew.state.user.profile.account.level = Math.floor(i / 100) + 1;
                storeNew.state.user.profile.account.points = i * 10;
            }
        })
        .add(`${getVersionLabel("legacy")} 深层嵌套对象更新`, () => {
            for (let i = 0; i < 1000; i++) {
                storeLegacy.state.user.profile.settings.theme = i % 2 === 0 ? "dark" : "light";
                storeLegacy.state.user.profile.settings.language = i % 2 === 0 ? "en" : "zh";
                storeLegacy.state.user.profile.settings.fontSize = 12 + (i % 4);
                storeLegacy.state.user.profile.preferences.notifications = i % 2 === 0;
                storeLegacy.state.user.profile.account.level = Math.floor(i / 100) + 1;
                storeLegacy.state.user.profile.account.points = i * 10;
            }
        });

    await bench.run();
    console.log("\n📊 深层嵌套对象操作结果:");
    console.table(bench.table());

    showMemoryUsage("内存使用情况");

    return bench.results;
}
