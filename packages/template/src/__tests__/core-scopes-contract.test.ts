import { describe, expect, test } from "bun:test";
import { AutoStore } from "autostore";
import { SCOPES_KEY } from "../engine";

/**
 * core 深层动态键响应式契约——x-data 私有域（store.state._scopes[id]）的命门假设。
 *
 * engine 运行时往 store.state._scopes 注入容器、DataDirective 运行时为每个 x-data scope
 * 建 _scopes[id] 对象并向其 Object.assign / delete 键。这依赖 core 对「初始 state 不存在、
 * 运行时在深层响应式对象上新增的对象与键」自动建代理并通知订阅者。
 *
 * 一旦 core 重构破坏此行为，x-data 响应式化将**静默失效**（订阅收不到通知、DOM 不更新），
 * 且 template 层的 e2e 不一定能精确定位到 core。本测试钉死该契约，让 core 回归先于 template 失败。
 */
describe("core 深层动态键响应式契约（_scopes 私有域命门）", () => {
    test("运行时建 _scopes[id] 并改其字段：订阅者收到通知", () => {
        const store = new AutoStore({} as any);
        // engine 行为：注入 _scopes 容器
        (store.state as any)[SCOPES_KEY] = {};
        // DataDirective 行为：运行时为某 scope 建 _scopes[id] 对象（core 须自动建响应式代理）
        (store.state as any)[SCOPES_KEY][12] = { count: 1 };

        // collectDependencies 应能收集到 _scopes.12.count 路径
        const deps = store.collectDependencies(() => {
            return (store.state as any)[SCOPES_KEY][12].count;
        });
        expect(deps.some((p) => p.join(".") === "_scopes.12.count")).toBe(true);

        // 订阅该路径，改值后应通知
        let notified = 0;
        store.watch(deps, () => notified++);
        (store.state as any)[SCOPES_KEY][12].count = 99;
        expect(notified).toBe(1);
    });

    test("运行时在已响应式的 _scopes[id] 上新增键：新键亦可订阅+通知", () => {
        const store = new AutoStore({} as any);
        (store.state as any)[SCOPES_KEY] = {};
        (store.state as any)[SCOPES_KEY][12] = { count: 1 };

        // 运行时新增 name 键（DataDirective Object.assign 写入新键的场景）
        (store.state as any)[SCOPES_KEY][12].name = "x";

        const deps = store.collectDependencies(() => {
            return (store.state as any)[SCOPES_KEY][12].name;
        });
        expect(deps.some((p) => p.join(".") === "_scopes.12.name")).toBe(true);

        let notified = 0;
        store.watch(deps, () => notified++);
        (store.state as any)[SCOPES_KEY][12].name = "y";
        expect(notified).toBe(1);
    });

    test("delete _scopes[id] 的键：订阅者收到通知（DataDirective 删消失键）", () => {
        const store = new AutoStore({} as any);
        (store.state as any)[SCOPES_KEY] = {};
        (store.state as any)[SCOPES_KEY][12] = { count: 1 };

        const deps = store.collectDependencies(() => {
            return (store.state as any)[SCOPES_KEY][12].count;
        });
        let notified = 0;
        store.watch(deps, () => notified++);
        delete (store.state as any)[SCOPES_KEY][12].count;
        expect(notified).toBe(1);
    });
});
