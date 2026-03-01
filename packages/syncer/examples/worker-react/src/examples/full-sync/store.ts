/**
 * 完整同步示例 - Worker 端代码
 *
 * 创建一个包含多个数据类型的 store，用于完整同步演示
 */

import { AutoStore } from "autostore";

// 创建主 store，包含多种数据类型
export const store = new AutoStore(
    {
        count: 0,
        messages: [] as string[],
        // 计算属性：消息总数
        messageCount: (scope: any) => scope.messages.length,
        // 数组示例：待办事项列表
        todos: [] as Array<{ id: number; text: string; completed: boolean }>,
        // 对象示例：用户信息
        user: {
            name: "张三",
            age: 30,
            email: "zhangsan@example.com",
            address: {
                city: "北京",
                district: "朝阳区",
                detail: "某某街道123号",
            },
        },
    },
    {
        id: "shared-worker-store", // 指定固定的 store ID
    }
);

// 监听 count 变化，用于调试
store.watch(({ path, value, indexs }) => {
    console.log(
        "[FullSync Worker] path=",
        path.join("."),
        "value=",
        JSON.stringify(value),
        "indexs=",
        (indexs || []).join(".")
    );
});
