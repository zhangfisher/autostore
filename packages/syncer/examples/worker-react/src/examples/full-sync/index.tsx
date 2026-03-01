/**
 * 完整同步示例 - 组件
 *
 * 演示如何与 SharedWorker 中的完整 store 进行同步
 * 包括计数器、待办事项和用户信息
 */

import { useState, useEffect } from 'react';
import { AutoStore } from 'autostore';
import { AutoStoreWorkerSyncer } from '../../../../../src';
const store = new AutoStore({
    count: 0,
    messages: [] as string[],
    messageCount: (scope: any) => scope.messages.length,
    todos: [] as Array<{ id: number; text: string; completed: boolean }>,
    user: {
        name: '张三',
        age: 30,
        email: 'zhangsan@example.com',
        address: {
            city: '北京',
            district: '朝阳区',
            detail: '某某街道123号',
        },
    },
});
const worker = new SharedWorker(new URL('./shared-worker.ts', import.meta.url), {
    type: 'module',
    name: 'full-sync',
});
// 使用 AutoStoreWorkerSyncer 简化 WorkerTransport + AutoStoreSyncer 的使用
const syncer = new AutoStoreWorkerSyncer(store, worker, {
    // 指定SharedWorker中的的store的id
    peers: ['shared-worker-store'],
});
export function FullSyncExample() {
    const [connected, setConnected] = useState(false);
    const [logMessages, setLogMessages] = useState<string[]>([]);

    useEffect(() => {
        setConnected(true);
        addLogMessage('[系统] 已连接到 SharedWorker');
    }, []);

    const [count, setCount] = useState(store.state.count);
    const [todos, setTodos] = useState(store.state.todos);
    const [user, setUser] = useState(store.state.user);

    useEffect(() => {
        const unwatch = store.watch(({ path, value }) => {
            if (path[0] === 'count') {
                setCount(value);
                addLogMessage(`[更新] count = ${value}`);
            } else if (path[0] === 'todos') {
                setTodos([...store.state.todos]);
                addLogMessage(`[更新] todos (总数: ${store.state.todos.length})`);
            } else if (path[0] === 'user') {
                setUser({ ...store.state.user });
                addLogMessage(`[更新] user`);
            }
        });
        return () => unwatch.off();
    }, []);

    const addLogMessage = (msg: string) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogMessages((prev) => [`[${timestamp}] ${msg}`, ...prev].slice(0, 50));
    };

    const increment = () => {
        store.update(
            (state) => {
                state.count++;
            },
            { flags: 0 },
        );
        addLogMessage(`[本地] 手动增加 count`);
    };

    const decrement = () => {
        store.update(
            (state) => {
                state.count--;
            },
            { flags: 0 },
        );
        addLogMessage(`[本地] 手动减少 count`);
    };

    const addTodo = () => {
        const newTodo = {
            id: Date.now(),
            text: `待办事项 ${store.state.todos.length + 1}`,
            completed: false,
        };
        store.state.todos.push(newTodo);
        addLogMessage(`[本地] 添加待办: ${newTodo.text}`);
    };

    const toggleTodo = (id: number) => {
        const todo = store.state.todos.find((t) => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            addLogMessage(`[本地] 切换待办: ${todo.text}`);
        }
    };

    const deleteTodo = (id: number) => {
        const index = store.state.todos.findIndex((t) => t.id === id);
        if (index !== -1) {
            const todoText = store.state.todos[index].text;
            store.state.todos.splice(index, 1);
            addLogMessage(`[本地] 删除待办: ${todoText}`);
        }
    };

    const clearTodos = () => {
        if (store.state.todos.length === 0) {
            addLogMessage(`[本地] 待办列表已为空`);
            return;
        }
        const count = store.state.todos.length;
        store.update((state) => {
            state.todos = [];
        });
        addLogMessage(`[本地] 清空所有待办事项 (${count}条)`);
    };

    const updateUserName = () => {
        const names = ['李四', '王五', '赵六', '钱七'];
        const currentIndex = names.indexOf(store.state.user.name);
        const nextIndex = (currentIndex + 1) % names.length;
        store.state.user.name = names[nextIndex];
        addLogMessage(`[本地] 更新用户名: ${names[nextIndex]}`);
    };

    const updateUserAge = () => {
        store.state.user.age = store.state.user.age + 1;
        addLogMessage(`[本地] 增加年龄: ${store.state.user.age}`);
    };

    const updateUserCity = () => {
        const cities = ['上海', '广州', '深圳', '杭州'];
        const currentIndex = cities.indexOf(store.state.user.address.city);
        const nextIndex = (currentIndex + 1) % cities.length;
        store.state.user.address.city = cities[nextIndex];
        addLogMessage(`[本地] 更新城市: ${cities[nextIndex]}`);
    };

    return (
        <div style={styles.container}>
            <div style={styles.statusBar}>
                <span
                    style={{
                        ...styles.statusIndicator,
                        backgroundColor: connected ? '#4caf50' : '#f44336',
                    }}
                />
                <span>{connected ? '已连接' : '未连接'}</span>
            </div>

            <div style={styles.main}>
                {/* 计数器区域 */}
                <section style={styles.card}>
                    <h2>计数器（支持多方同步）</h2>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '20px',
                            margin: '10px 0',
                            minHeight: '80px',
                        }}>
                        <div
                            style={{
                                ...styles.counter,
                                margin: 0,
                                lineHeight: '1',
                                flexGrow: 1,
                                textAlign: 'center' as const,
                            }}>
                            {count}
                        </div>
                        <div style={styles.buttonContainer}>
                            <button onClick={decrement} style={styles.button}>
                                - 减少
                            </button>
                            <button onClick={increment} style={styles.button}>
                                + 增加
                            </button>
                        </div>
                    </div>
                    <p style={styles.hint}>
                        点击按钮修改计数，变更会同步到 SharedWorker 并广播到所有页签。
                        打开多个页签可以看到状态同步效果。
                    </p>
                </section>

                {/* 待办事项区域 */}
                <section style={styles.card}>
                    <h2>待办事项列表（数组同步）</h2>
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
                                            textDecoration: todo.completed
                                                ? 'line-through'
                                                : 'none',
                                            flex: 1,
                                        }}>
                                        {todo.text}
                                    </span>
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        style={{
                                            ...styles.button,
                                            padding: '5px 10px',
                                            fontSize: '14px',
                                            backgroundColor: '#f44336',
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
                            onClick={clearTodos}
                            style={{
                                ...styles.button,
                                backgroundColor: '#ff9800',
                            }}>
                            🗑️ 清空列表
                        </button>
                    </div>
                    <p style={styles.hint}>
                        数组的增删改操作会实时同步到所有页签。尝试添加、切换或删除待办事项。
                    </p>
                </section>

                {/* 用户信息区域 */}
                <section style={styles.card}>
                    <h2>用户信息（对象同步）</h2>
                    <div style={styles.userInfo}>
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
                            <label>地址：</label>
                            <span style={styles.userValue}>
                                {user.address.city} {user.address.district}
                                {user.address.detail}
                            </span>
                        </div>
                    </div>
                    <div style={styles.buttonContainer}>
                        <button onClick={updateUserName} style={styles.button}>
                            切换姓名
                        </button>
                        <button onClick={updateUserAge} style={styles.button}>
                            增加年龄
                        </button>
                        <button onClick={updateUserCity} style={styles.button}>
                            切换城市
                        </button>
                    </div>
                    <p style={styles.hint}>
                        嵌套对象的修改会实时同步。尝试修改用户信息，所有页签都会同步更新。
                    </p>
                </section>

                {/* 日志区域 */}
                <section style={styles.card}>
                    <h2>同步日志</h2>
                    <div style={styles.logContainer}>
                        {logMessages.map((msg, idx) => (
                            <div key={idx} style={styles.logItem}>
                                {msg}
                            </div>
                        ))}
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    counter: {
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#2196f3',
        textAlign: 'center' as const,
        margin: '20px 0',
    },
    buttonContainer: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
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
    },
    todoList: {
        maxHeight: '300px',
        overflowY: 'auto' as const,
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        padding: '10px',
        marginBottom: '5px',
        backgroundColor: '#fafafa',
    },
    todoItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '4px',
        backgroundColor: 'white',
        borderRadius: '4px',
        marginBottom: '4px',
        border: '1px solid #e0e0e0',
    },
    userInfo: {
        backgroundColor: '#f8f8f8',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        padding: '15px',
        marginBottom: '15px',
    },
    userField: {
        display: 'flex',
        marginBottom: '10px',
        fontSize: '16px',
    },
    userValue: {
        fontWeight: '500',
        color: '#333',
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
};
