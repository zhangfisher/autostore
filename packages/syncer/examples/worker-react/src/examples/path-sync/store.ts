/**
 * 路径指定同步示例 - Worker 端代码
 *
 * 创建一个包含共享区域的 store
 * 只允许同步 shared.* 路径到本地根级别
 */

import { AutoStore } from "autostore";

// 创建主 store
export const store = new AutoStore(
    {
        // 共享区域 - 允许被同步
        shared: {
            counter: 0,
            message: '来自 SharedWorker 的消息',
            todos: [] as Array<{ id: number; text: string; completed: boolean }>,
            user: {
                name: '张三',
                age: 30,
                email: 'zhangsan@example.com',
            },
        },
        // 私有区域 - 即使客户端请求也不会被同步
        private: {
            localCounter: 0,
            localData: '本地私有数据',
        },
    },
    {
        id: "path-sync-store", // 指定固定的 store ID
    }
);

// 监听变化，用于调试
store.watch(({ path, value, indexs }) => {
    console.log(
        "[PathSync Worker] path=",
        path.join("."),
        "value=",
        JSON.stringify(value),
        "indexs=",
        (indexs || []).join(".")
    );
});
