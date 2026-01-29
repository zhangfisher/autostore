// oxlint-disable no-unused-vars
/**
 * 多 Store 同步示例 - React 组件
 *
 * 演示如何使用 AutoStoreSwitchSyncer 实现 N-N 的状态同步
 *
 * 【核心特性】
 * 1. 在 SharedWorker 中管理多个独立的 store（counter、todo、user）
 * 2. 在浏览器页面中创建多个本地 store，每个与 SharedWorker 中对应的 store 同步
 * 3. 使用 peers 选项指定要与哪个 store 同步
 * 4. 支持多个页签之间的状态同步
 *
 * 【使用场景】
 * - 多租户应用：每个租户有独立的状态
 * - 复杂应用的状态分区：不同功能模块使用不同的 store
 * - 多标签页协同工作：每个标签页可以同步不同的状态
 */

import { useState, useEffect } from 'react';
import { AutoStore } from 'autostore';
import { AutoStoreWorkerSyncer } from '@autostorejs/syncer';

// 在组件外部创建 store 实例，避免每次渲染都创建新实例
// 创建计数器 store
const counterStore = new AutoStore(
    {
        count: 0,
        doubleCount: (scope: any) => scope.count * 2,
    },
    { id: 'local-counter-store' },
);

// 创建待办事项 store
const todoStore = new AutoStore(
    {
        todos: [] as Array<{
            id: number;
            text: string;
            completed: boolean;
            priority: 'low' | 'medium' | 'high';
            createdAt: number;
        }>,
        totalCount: (scope: any) => scope.todos.length,
        completedCount: (scope: any) => scope.todos.filter((t: any) => t.completed).length,
    },
    { id: 'local-todo-store' },
);

// 创建用户信息 store
const userStore = new AutoStore(
    {
        user: {
            name: '张三',
            age: 30,
            email: 'zhangsan@example.com',
            avatar: '👤',
            address: {
                city: '北京',
                district: '朝阳区',
                detail: '某某街道123号',
            },
            preferences: {
                theme: 'light' as 'light' | 'dark',
                language: 'zh-CN',
                notifications: true,
            },
        },
    },
    { id: 'local-user-store' },
);
//@ts-ignore
globalThis.counterStore = counterStore;
//@ts-ignore
globalThis.userStore = userStore;
//@ts-ignore
globalThis.todoStore = todoStore;

// 在组件外部创建 SharedWorker 和 syncer，避免每次渲染都创建新实例
const worker = new SharedWorker(new URL('./shared-worker.ts', import.meta.url), {
    type: 'module',
    name: 'multi-store',
});

// 创建三个 syncer，分别与 SharedWorker 中的不同 store 同步
const counterSyncer = new AutoStoreWorkerSyncer(counterStore, worker, {
    peers: ['counter-store'], // 指定要与 SharedWorker 中的 counter-store 同步
});

const todoSyncer = new AutoStoreWorkerSyncer(todoStore, worker, {
    peers: ['todo-store'], // 指定要与 SharedWorker 中的 todo-store 同步
});

const userSyncer = new AutoStoreWorkerSyncer(userStore, worker, {
    peers: ['user-store'], // 指定要与 SharedWorker 中的 user-store 同步
});

export function MultiStoreExample() {
    const [connected, setConnected] = useState(true);
    const [logMessages, setLogMessages] = useState<string[]>([]);

    // 本地状态
    const [count, setCount] = useState(counterStore.state.count);
    const [doubleCount, setDoubleCount] = useState(counterStore.state.doubleCount);
    const [todos, setTodos] = useState(todoStore.state.todos);
    const [totalCount, setTotalCount] = useState(todoStore.state.totalCount);
    const [completedCount, setCompletedCount] = useState(todoStore.state.completedCount);
    const [user, setUser] = useState(userStore.state.user);

    const addLogMessage = (msg: string) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogMessages((prev) => [`[${timestamp}] ${msg}`, ...prev].slice(0, 50));
    };

    // 初始化日志
    useEffect(() => {
        addLogMessage('[系统] 已连接到 SharedWorker (3个 stores 已同步)');
    }, []);

    // 监听 counterStore 变化
    useEffect(() => {
        const unwatch = counterStore.watch(({ path, value }) => {
            if (path[0] === 'count') {
                setCount(value);
                setDoubleCount(counterStore.state.doubleCount);
                addLogMessage(
                    `[计数器] count = ${value}, double = ${counterStore.state.doubleCount}`,
                );
            }
        });

        // 关键：在 watch 设置后立即同步当前值
        // 这确保即使 syncer.pull 在 watch 设置前完成，UI 也能显示正确值
        setCount(counterStore.state.count);
        setDoubleCount(counterStore.state.doubleCount);

        return () => unwatch.off();
    }, []);

    // 监听 todoStore 变化
    useEffect(() => {
        const unwatch = todoStore.watch(({ path }) => {
            if (path[0] === 'todos') {
                setTodos([...todoStore.state.todos]);
                setTotalCount(todoStore.state.totalCount);
                setCompletedCount(todoStore.state.completedCount);
                addLogMessage(
                    `[待办事项] 总数: ${todoStore.state.totalCount}, 已完成: ${todoStore.state.completedCount}`,
                );
            }
        });

        // 初始化同步当前值
        setTodos([...todoStore.state.todos]);
        setTotalCount(todoStore.state.totalCount);
        setCompletedCount(todoStore.state.completedCount);

        return () => unwatch.off();
    }, []);

    // 监听 userStore 变化
    useEffect(() => {
        const unwatch = userStore.watch(({ path }) => {
            if (path[0] === 'user') {
                setUser({ ...userStore.state.user });
                addLogMessage(`[用户信息] 用户数据已更新`);
            }
        });

        // 初始化同步当前值
        setUser({ ...userStore.state.user });

        return () => unwatch.off();
    }, []);

    // 计数器操作
    const increment = () => {
        counterStore.update(
            (state) => {
                state.count++;
            },
            { flags: 0 },
        );
        addLogMessage(`[计数器] + 增加`);
    };

    const decrement = () => {
        counterStore.update(
            (state) => {
                state.count--;
            },
            { flags: 0 },
        );
        addLogMessage(`[计数器] - 减少`);
    };

    const reset = () => {
        counterStore.update(
            (state) => {
                state.count = 0;
            },
            { flags: 0 },
        );
        addLogMessage(`[计数器] 重置为 0`);
    };

    // 待办事项操作
    const addTodo = () => {
        const priorities: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
        const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
        const newTodo = {
            id: Date.now(),
            text: `待办事项 ${todoStore.state.todos.length + 1}`,
            completed: false,
            priority: randomPriority,
            createdAt: Date.now(),
        };
        todoStore.state.todos.push(newTodo);
        addLogMessage(`[待办事项] 添加: ${newTodo.text} (${newTodo.priority})`);
    };

    const toggleTodo = (id: number) => {
        const todo = todoStore.state.todos.find((t) => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            addLogMessage(`[待办事项] ${todo.completed ? '完成' : '未完成'}: ${todo.text}`);
        }
    };

    const deleteTodo = (id: number) => {
        const index = todoStore.state.todos.findIndex((t) => t.id === id);
        if (index !== -1) {
            const todoText = todoStore.state.todos[index].text;
            todoStore.state.todos.splice(index, 1);
            addLogMessage(`[待办事项] 删除: ${todoText}`);
        }
    };

    const clearCompleted = () => {
        const completedCount = todoStore.state.completedCount;
        todoStore.update((state) => {
            state.todos = state.todos.filter((t) => !t.completed);
        });
        addLogMessage(`[待办事项] 清空已完成 (${completedCount}条)`);
    };

    // 用户信息操作
    const updateUserName = () => {
        const names = ['张三', '李四', '王五', '赵六', '钱七', '孙八'];
        const currentIndex = names.indexOf(userStore.state.user.name);
        const nextIndex = (currentIndex + 1) % names.length;
        userStore.state.user.name = names[nextIndex];
        addLogMessage(`[用户信息] 更新姓名: ${names[nextIndex]}`);
    };

    const updateUserAge = () => {
        userStore.state.user.age = userStore.state.user.age + 1;
        addLogMessage(`[用户信息] 增加年龄: ${userStore.state.user.age}`);
    };

    const toggleTheme = () => {
        const currentTheme = userStore.state.user.preferences.theme;
        userStore.state.user.preferences.theme = currentTheme === 'light' ? 'dark' : 'light';
        addLogMessage(`[用户信息] 切换主题: ${userStore.state.user.preferences.theme}`);
    };

    const updateCity = () => {
        const cities = ['上海', '广州', '深圳', '杭州', '成都', '西安'];
        const currentIndex = cities.indexOf(userStore.state.user.address.city);
        const nextIndex = (currentIndex + 1) % cities.length;
        userStore.state.user.address.city = cities[nextIndex];
        addLogMessage(`[用户信息] 更新城市: ${cities[nextIndex]}`);
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return '#f44336';
            case 'medium':
                return '#ff9800';
            case 'low':
                return '#4caf50';
            default:
                return '#999';
        }
    };

    const getPriorityLabel = (priority: string) => {
        switch (priority) {
            case 'high':
                return '高';
            case 'medium':
                return '中';
            case 'low':
                return '低';
            default:
                return priority;
        }
    };

    return (
        <div style={styles.container}>
            {/* 状态栏 */}
            <div style={styles.statusBar}>
                <span
                    style={{
                        ...styles.statusIndicator,
                        backgroundColor: connected ? '#4caf50' : '#f44336',
                    }}
                />
                <span>{connected ? '已连接到 SharedWorker' : '未连接'}</span>
                <span style={{ marginLeft: 'auto', color: '#666', fontSize: '14px' }}>
                    已同步 3 个独立 Store
                </span>
            </div>

            <div style={styles.main}>
                {/* 计数器 Store */}
                <section style={styles.card}>
                    <h2 style={styles.cardTitle}>
                        <span style={styles.emoji}>🔢</span>
                        计数器 Store
                        <span style={styles.storeId}>counter-store</span>
                    </h2>
                    <div style={styles.counterContainer}>
                        <div style={styles.counterValue}>{count}</div>
                        <div style={styles.counterInfo}>
                            <div>双倍值: {doubleCount}</div>
                        </div>
                    </div>
                    <div style={styles.buttonContainer}>
                        <button onClick={decrement} style={styles.button}>
                            - 减少
                        </button>
                        <button onClick={reset} style={styles.button}>
                            ↺ 重置
                        </button>
                        <button onClick={increment} style={styles.button}>
                            + 增加
                        </button>
                    </div>
                    <p style={styles.hint}>此 store 独立管理计数状态，与其他 store 互不干扰</p>
                </section>

                {/* 待办事项 Store */}
                <section style={styles.card}>
                    <h2 style={styles.cardTitle}>
                        <span style={styles.emoji}>✅</span>
                        待办事项 Store
                        <span style={styles.storeId}>todo-store</span>
                    </h2>
                    <div style={styles.todoStats}>
                        <div style={styles.statItem}>
                            <div style={styles.statValue}>{totalCount}</div>
                            <div style={styles.statLabel}>总数</div>
                        </div>
                        <div style={styles.statItem}>
                            <div style={styles.statValue}>{completedCount}</div>
                            <div style={styles.statLabel}>已完成</div>
                        </div>
                        <div style={styles.statItem}>
                            <div style={styles.statValue}>{totalCount - completedCount}</div>
                            <div style={styles.statLabel}>未完成</div>
                        </div>
                    </div>
                    <div style={styles.todoList}>
                        {todos.length === 0 ? (
                            <p style={styles.empty}>暂无待办事项</p>
                        ) : (
                            todos.map((todo) => (
                                <div key={todo.id} style={styles.todoItem}>
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleTodo(todo.id)}
                                        style={{ marginRight: '10px' }}
                                    />
                                    <span
                                        style={{
                                            ...styles.priorityBadge,
                                            backgroundColor: getPriorityColor(todo.priority),
                                        }}>
                                        {getPriorityLabel(todo.priority)}
                                    </span>
                                    <span
                                        style={{
                                            ...styles.todoText,
                                            textDecoration: todo.completed
                                                ? 'line-through'
                                                : 'none',
                                        }}>
                                        {todo.text}
                                    </span>
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        style={{
                                            ...styles.deleteButton,
                                        }}>
                                        删除
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                    <div style={styles.buttonContainer}>
                        <button onClick={addTodo} style={styles.button}>
                            + 添加待办
                        </button>
                        <button
                            onClick={clearCompleted}
                            style={{
                                ...styles.button,
                                backgroundColor: '#ff9800',
                            }}>
                            清空已完成
                        </button>
                    </div>
                    <p style={styles.hint}>此 store 独立管理待办事项，支持优先级和完成状态</p>
                </section>

                {/* 用户信息 Store */}
                <section style={styles.card}>
                    <h2 style={styles.cardTitle}>
                        <span style={styles.emoji}>👤</span>
                        用户信息 Store
                        <span style={styles.storeId}>user-store</span>
                    </h2>
                    <div style={styles.userInfo}>
                        <div style={styles.userAvatar}>{user.avatar}</div>
                        <div style={styles.userDetails}>
                            <div style={styles.userField}>
                                <label>姓名：</label>
                                <span style={styles.userValue}>{user.name}</span>
                            </div>
                            <div style={styles.userField}>
                                <label>年龄：</label>
                                <span style={styles.userValue}>{user.age} 岁</span>
                            </div>
                            <div style={styles.userField}>
                                <label>邮箱：</label>
                                <span style={styles.userValue}>{user.email}</span>
                            </div>
                            <div style={styles.userField}>
                                <label>主题：</label>
                                <span
                                    style={{
                                        ...styles.userValue,
                                        ...styles.themeBadge,
                                        backgroundColor:
                                            user.preferences.theme === 'light' ? '#fff' : '#333',
                                        color: user.preferences.theme === 'light' ? '#333' : '#fff',
                                    }}>
                                    {user.preferences.theme === 'light' ? '☀️ 浅色' : '🌙 深色'}
                                </span>
                            </div>
                            <div style={styles.userField}>
                                <label>地址：</label>
                                <span style={styles.userValue}>
                                    {user.address.city} {user.address.district}
                                    {user.address.detail}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div style={styles.buttonContainer}>
                        <button onClick={updateUserName} style={styles.button}>
                            切换姓名
                        </button>
                        <button onClick={updateUserAge} style={styles.button}>
                            增加年龄
                        </button>
                        <button onClick={toggleTheme} style={styles.button}>
                            切换主题
                        </button>
                        <button onClick={updateCity} style={styles.button}>
                            切换城市
                        </button>
                    </div>
                    <p style={styles.hint}>此 store 独立管理用户信息，包含嵌套对象和偏好设置</p>
                </section>

                {/* 日志区域 */}
                <section style={styles.card}>
                    <h2 style={styles.cardTitle}>
                        <span style={styles.emoji}>📋</span>
                        同步日志
                    </h2>
                    <div style={styles.logContainer}>
                        {logMessages.length === 0 ? (
                            <p style={styles.empty}>暂无日志</p>
                        ) : (
                            logMessages.map((msg, idx) => (
                                <div key={idx} style={styles.logItem}>
                                    {msg}
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* 说明区域 */}
                <section style={styles.card}>
                    <h2 style={styles.cardTitle}>
                        <span style={styles.emoji}>💡</span>
                        使用说明
                    </h2>
                    <div style={styles.infoContent}>
                        <p style={styles.infoText}>
                            <strong>多 Store 同步示例</strong> 演示了如何使用
                            <code>AutoStoreSwitchSyncer</code> 在 SharedWorker 中管理多个独立的
                            store，并实现 N-N 的状态同步。
                        </p>
                        <ul style={styles.infoList}>
                            <li>
                                <strong>独立管理：</strong>每个 store 管理自己的状态，互不干扰
                            </li>
                            <li>
                                <strong>按需同步：</strong>使用 <code>peers</code> 选项指定要与哪个
                                store 同步
                            </li>
                            <li>
                                <strong>自动路由：</strong>SwitchSyncer 根据
                                <code>operate.id</code> 自动路由消息到对应的 store
                            </li>
                            <li>
                                <strong>多页签协同：</strong>打开多个页签，所有页签的状态会实时同步
                            </li>
                        </ul>
                        <p style={styles.infoText}>
                            <strong>适用场景：</strong>多租户应用、状态分区、模块化应用等
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '20px',
    },
    statusBar: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '15px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    statusIndicator: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
    },
    main: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    cardTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        margin: '0 0 20px 0',
        fontSize: '20px',
        fontWeight: 'bold',
    },
    emoji: {
        fontSize: '24px',
    },
    storeId: {
        fontSize: '12px',
        fontWeight: 'normal',
        color: '#666',
        backgroundColor: '#f5f5f5',
        padding: '2px 8px',
        borderRadius: '4px',
        fontFamily: 'monospace',
    },
    counterContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '30px',
        margin: '20px 0',
    },
    counterValue: {
        fontSize: '64px',
        fontWeight: 'bold',
        color: '#2196f3',
        lineHeight: '1',
    },
    counterInfo: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '10px',
        fontSize: '18px',
        color: '#666',
    },
    todoStats: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f8f8f8',
        borderRadius: '4px',
    },
    statItem: {
        textAlign: 'center' as const,
    },
    statValue: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#2196f3',
    },
    statLabel: {
        fontSize: '14px',
        color: '#666',
        marginTop: '5px',
    },
    todoList: {
        maxHeight: '300px',
        overflowY: 'auto' as const,
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        padding: '10px',
        marginBottom: '15px',
        backgroundColor: '#fafafa',
    },
    todoItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: 'white',
        borderRadius: '4px',
        marginBottom: '8px',
        border: '1px solid #e0e0e0',
        gap: '10px',
    },
    priorityBadge: {
        padding: '2px 8px',
        borderRadius: '4px',
        color: 'white',
        fontSize: '12px',
        fontWeight: 'bold',
    },
    todoText: {
        flex: 1,
    },
    deleteButton: {
        padding: '5px 10px',
        fontSize: '14px',
        fontWeight: '500',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: '#f44336',
        color: 'white',
        transition: 'background-color 0.2s',
    },
    userInfo: {
        display: 'flex',
        gap: '20px',
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#f8f8f8',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
    },
    userAvatar: {
        fontSize: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userDetails: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '12px',
    },
    userField: {
        display: 'flex',
        fontSize: '16px',
        alignItems: 'center',
        gap: '8px',
    },
    userValue: {
        fontWeight: '500',
        color: '#333',
    },
    themeBadge: {
        padding: '4px 12px',
        borderRadius: '4px',
        border: '1px solid #e0e0e0',
    },
    buttonContainer: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        flexWrap: 'wrap' as const,
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: '500',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: '#2196f3',
        color: 'white',
        transition: 'background-color 0.2s',
    } as any,
    hint: {
        color: '#666',
        fontSize: '14px',
        textAlign: 'center' as const,
        marginTop: '15px',
        padding: '10px',
        backgroundColor: '#f8f8f8',
        borderRadius: '4px',
    },
    empty: {
        color: '#999',
        textAlign: 'center' as const,
        padding: '20px',
    },
    logContainer: {
        maxHeight: '250px',
        overflowY: 'auto' as const,
        backgroundColor: '#f8f8f8',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        padding: '10px',
        fontFamily: 'monospace',
        fontSize: '12px',
    },
    logItem: {
        padding: '4px 0',
        borderBottom: '1px solid #e8e8e8',
    },
    infoContent: {
        lineHeight: '1.6',
    },
    infoText: {
        marginBottom: '15px',
        color: '#333',
    },
    infoList: {
        paddingLeft: '20px',
        marginBottom: '15px',
    },
};
