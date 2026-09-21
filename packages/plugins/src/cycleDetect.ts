/**
 * cycleDetect 插件
 *
 * 为 AutoStore 注入循环依赖检测能力：
 *   - 构造阶段：检测 observer 创建期间的同步循环依赖
 *   - 执行阶段：检测同步计算属性 getter 执行期间的循环依赖
 *
 * 检测覆盖：
 *   - 同步静态计算属性（构造期间 getter 执行）
 *   - 动态创建的计算属性（computedObjects.create）
 *   - watch 对象不参与循环检测
 *
 * 异步计算属性不参与循环依赖检测：
 *   - 异步 getter 的执行链路存在 await 边界，依赖变化触发的重算由 core 的
 *     重入保护(_running + cancel 事件)兜底，不会产生同步无限递归
 *   - 循环检测错误记录在 observer.error 上(onObserverError 可监听)，
 *     不会中断 store 构造
 *
 * @example
 *
 * import { AutoStore } from "autostore";
 * import { cycleDetect } from "@autostorejs/plugins";
 *
 * cycleDetect();  // 全局安装，对后续所有 store 生效
 *
 * const store = new AutoStore({
 *     a: (scope) => scope.b,
 *     b: (scope) => scope.a,  // b 的 observer.error 为 CyleDependError
 * });
 */
import { CyleDependError, installPlugin } from "autostore";
import type { AnyAutoStore, Dict } from "autostore";

/**
 * 全局活跃 getter 追踪表
 *
 * Key: getter 函数引用
 * Value: 路径信息（用于错误消息）
 *
 * 用于检测同步计算属性执行期间的循环依赖：
 * 当 getter A 执行期间（嵌套调用链上）再次进入同一 getter A，
 * 通过此表可检测到 A 仍在执行中。
 */
const activeGetters = new Map<Function, string>();

/**
 * cycleDetect 插件入口
 *
 * 无参调用时全局安装，对后续所有 store 实例生效。
 * 传入 store 时仅对该 store 生效。
 *
 * @param store - 可选，指定要安装插件的 store 实例
 */
export function cycleDetect(store?: AnyAutoStore) {
    if (store) {
        installCyclicDetection(store);
    } else {
        installPlugin(installCyclicDetection);
    }
}

/**
 * 为单个 store 安装循环依赖检测
 */
function installCyclicDetection(store: AnyAutoStore) {
    // ========== 阶段 1：构造期间检测 ==========
    // 使用 Set<string> 追踪正在创建的 observer 路径
    const creatingPaths = new Set<string>();

    // 保存原始 handleReactiveObject 引用（proxy 使用此方法创建 observer）
    const originalHandle = (store as any).handleReactiveObject?.bind(store);
    if (!originalHandle) return;

    // 覆盖 handleReactiveObject
    (store as any).handleReactiveObject = function (
        path: string[],
        value: any,
        parentPath: string[],
        parent: any,
    ): any {
        const pathKey = path.join(".");

        // 检测构造期间循环
        if (creatingPaths.has(pathKey)) {
            const cylePaths = [...creatingPaths.keys(), pathKey];
            creatingPaths.clear();
            throw new CyleDependError(
                `Find circular dependency at <"${pathKey}">, steps: ${cylePaths.join(" -> ")}`,
            );
        }

        // 标记正在创建
        if (pathKey) {
            creatingPaths.add(pathKey);
        }

        try {
            // 调用原始方法创建 observer
            const result = originalHandle(path, value, parentPath, parent);

            // ========== 阶段 2：getter 执行期间检测 ==========
            // 包装 run() 方法，检测同步计算属性执行期间的循环
            // 异步计算属性不参与检测(见文件头说明)
            // result 是 observerObj.initial，但我们需要 observer 对象本身
            // 通过 store.computedObjects 查找刚创建的 observer
            if (pathKey && store.computedObjects) {
                for (const observer of store.computedObjects.values()) {
                    if (observer && typeof observer === "object" && typeof observer.run === "function") {
                        const observerPath = observer.path?.join(".");
                        if (observerPath === pathKey) {
                            wrapRunMethod(observer, pathKey);
                            break;
                        }
                    }
                }
            }

            return result;
        } finally {
            // 清除创建标记
            if (pathKey) {
                creatingPaths.delete(pathKey);
            }
        }
    };
}

/**
 * 包装 observer 的 run() 方法
 *
 * 在 getter 执行期间追踪活跃的 getter 函数，
 * 检测同步计算属性执行期间的循环依赖。
 *
 * 异步计算属性不包装：检测错误在事件总线链路上同步抛出时无法进入
 * observer 错误处理流程，而异步重入已由 core 的 _running 重入保护兜底。
 */
function wrapRunMethod(observer: any, pathKey: string) {
    // 异步计算属性不参与循环检测
    if (observer.async === true) return;

    const originalRun = observer.run.bind(observer);

    // 同步计算：run() 同步执行
    observer.run = function (this: any, options?: any) {
        const getter = this.getter;
        if (!getter) {
            return originalRun(options);
        }

        // 检测同步 getter 执行期间循环
        if (activeGetters.has(getter)) {
            const prevPath = activeGetters.get(getter);
            throw new CyleDependError(
                `Find circular dependency at <"${pathKey}">, steps: ${prevPath} -> ${pathKey}`,
            );
        }

        // 标记活跃
        activeGetters.set(getter, pathKey);
        try {
            return originalRun(options);
        } finally {
            activeGetters.delete(getter);
        }
    };
}

declare module "autostore" {
    interface AutoStore<State extends Dict, Options = unknown> {
        /**
         * 是否已安装循环依赖检测插件
         */
        cycleDetect?: boolean;
    }
}

installPlugin(installCyclicDetection);
