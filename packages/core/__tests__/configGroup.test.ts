/**
 * ConfigManager 配置组功能单元测试
 *
 * 测试核心功能：
 * - configurable 的 group 字符串声明（单组/逗号分隔多组）
 * - configurable 的 group SchemaGroup 对象声明（title/icon/order 元数据）
 * - configManager.groups 组清单的聚合与元数据合并
 */
import { describe, test, expect, beforeEach } from "bun:test";
import { AutoStore, ConfigManager, configurable } from "../src";

describe("ConfigManager - 配置组", () => {
    let configManager: ConfigManager;
    beforeEach(() => {
        configManager = new ConfigManager(
            { load: () => ({}) },
            { global: false, autoload: false },
        );
    });

    test("字符串 group 应该在 configManager.groups 中登记", () => {
        new AutoStore(
            {
                a: configurable(1, { label: "A", group: "basic" }),
                b: configurable(2, { label: "B", group: "basic,advanced" }),
                c: configurable(3, { label: "C" }),
            },
            { configManager, configKey: "app" },
        );

        expect(Object.keys(configManager.groups!)).toEqual(["basic", "advanced"]);
        expect(configManager.groups!.basic).toEqual({ name: "basic" });
    });

    test("未声明 group 的配置项不应该产生配置组", () => {
        new AutoStore(
            {
                a: configurable(1, { label: "A" }),
            },
            { configManager, configKey: "app" },
        );

        expect(configManager.groups).toBeUndefined();
    });

    test("SchemaGroup 对象应该登记组名与 title/icon/order 元数据", () => {
        new AutoStore(
            {
                a: configurable(1, {
                    label: "A",
                    group: { name: "network", title: "网络", icon: "globe", order: 0 },
                }),
            },
            { configManager, configKey: "app" },
        );

        expect(configManager.groups!.network).toEqual({
            name: "network",
            title: "网络",
            icon: "globe",
            order: 0,
        });
    });

    test("SchemaGroup 对象的 name 支持逗号分隔声明多个组", () => {
        new AutoStore(
            {
                a: configurable(1, {
                    label: "A",
                    group: { name: "editor,remote", title: "编辑" },
                }),
            },
            { configManager, configKey: "app" },
        );

        expect(configManager.groups!.editor).toEqual({ name: "editor", title: "编辑" });
        expect(configManager.groups!.remote).toEqual({ name: "remote", title: "编辑" });
    });

    test("同名组重复登记应该合并元数据且不丢弃先登记的字段", () => {
        new AutoStore(
            { a: configurable(1, { group: { name: "base", title: "基础" } }) },
            { configManager, configKey: "x" },
        );
        new AutoStore(
            { b: configurable(2, { group: { name: "base", icon: "gear" } }) },
            { configManager, configKey: "y" },
        );

        expect(configManager.groups!.base).toEqual({ name: "base", title: "基础", icon: "gear" });
    });

    test("多个 Store 共享同一配置管理器时配置组应该跨 Store 聚合", () => {
        new AutoStore(
            { a: configurable(1, { group: "shop" }) },
            { configManager, configKey: "shop" },
        );
        new AutoStore(
            { b: configurable(2, { group: "user" }) },
            { configManager, configKey: "user" },
        );

        expect(Object.keys(configManager.groups!)).toEqual(["shop", "user"]);
    });

    test("空 group 不应该登记任何配置组", () => {
        new AutoStore(
            {
                a: configurable(1, { group: "" }),
                b: configurable(2, { group: ",," }),
            },
            { configManager, configKey: "app" },
        );

        expect(Object.keys(configManager.groups!)).toEqual([]);
    });
});
