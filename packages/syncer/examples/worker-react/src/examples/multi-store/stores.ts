/**
 * 多 Store 同步示例 - Stores 定义
 *
 * 定义三个独立的 store，演示 AutoStoreSwitchSyncer 的 N-N 同步能力
 */

import { AutoStore } from "autostore";

// Store 1: 计数器 store
// 用于演示简单的基础类型同步
export const counterStore = new AutoStore(
    {
        count: 0,
        // 计算属性：双倍值
        doubleCount: (scope: any) => scope.count * 2,
    },
    {
        id: "counter-store",
    }
);

// Store 2: 待办事项 store
// 用于演示数组类型的数据同步
export const todoStore = new AutoStore(
    {
        todos: [] as Array<{
            id: number;
            text: string;
            completed: boolean;
            priority: "low" | "medium" | "high";
            createdAt: number;
        }>,
        // 计算属性：待办总数
        totalCount: (scope: any) => scope.todos.length,
        // 计算属性：已完成数量
        completedCount: (scope: any) =>
            scope.todos.filter((t: any) => t.completed).length,
    },
    {
        id: "todo-store",
    }
);

// Store 3: 用户信息 store
// 用于演示嵌套对象的数据同步
export const userStore = new AutoStore(
    {
        user: {
            name: "张三",
            age: 30,
            email: "zhangsan@example.com",
            avatar: "👤",
            address: {
                city: "北京",
                district: "朝阳区",
                detail: "某某街道123号",
            },
            preferences: {
                theme: "light" as "light" | "dark",
                language: "zh-CN",
                notifications: true,
            },
        },
    },
    {
        id: "user-store",
    }
);

// 监听变化用于调试
counterStore.watch(({ path, value }) => {
    console.log(
        "[CounterStore]",
        path.join("."),
        "=",
        JSON.stringify(value)
    );
});

todoStore.watch(({ path, value }) => {
    console.log("[TodoStore]", path.join("."), "=", JSON.stringify(value));
});

userStore.watch(({ path, value }) => {
    console.log("[UserStore]", path.join("."), "=", JSON.stringify(value));
});
