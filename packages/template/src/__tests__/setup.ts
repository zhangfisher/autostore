/**
 * 测试环境初始化
 *
 * bun test 默认不内置浏览器 DOM，这里通过 happy-dom 的全局注册器
 * 把 document、HTMLElement、Node 等 DOM API 注入到 globalThis，
 * 使被测代码中基于 HTMLElement 的逻辑可以在测试中运行。
 */
import { GlobalRegistrator } from "@happy-dom/global-registrator";

GlobalRegistrator.register();
