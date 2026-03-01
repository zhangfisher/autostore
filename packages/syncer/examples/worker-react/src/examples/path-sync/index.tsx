/**
 * 路径指定同步示例 - 组件
 *
 * 演示如何使用 remote 参数将远程的 shared 路径同步到本地根级别
 * 远程 shared.counter -> 本地 counter
 * 远程 shared.message -> 本地 message
 * 远程 shared.todos -> 本地 todos
 * 远程 shared.user -> 本地 user
 */

import { useState, useEffect } from 'react';
import { AutoStore } from 'autostore';
import { AutoStoreWorkerSyncer } from '@autostorejs/syncer';

export function PathSyncExample() {
    // 创建本地 store，初始为空
    // shared 路径将通过 remote 参数从远程同步过来
    const [store] = useState(() => {
        return new AutoStore({
            counter: 0,
            message: '等待同步...',
            todos: [] as Array<{ id: number; text: string; completed: boolean }>,
            user: {
                name: '张三',
                age: 30,
                email: 'zhangsan@example.com',
            },
        });
    });

    const [connected, setConnected] = useState(false);
    const [logMessages, setLogMessages] = useState<string[]>([]);

    useEffect(() => {
        const worker = new SharedWorker(new URL('./shared-worker.ts', import.meta.url), {
            type: 'module',
            name: 'path-sync',
        });

        // 使用 AutoStoreWorkerSyncer 简化 WorkerTransport + AutoStoreSyncer 的使用
        const syncer = new AutoStoreWorkerSyncer(store, worker, {
            // 指定SharedWorker中的的store的id
            peers: ['path-sync-store'],
            // 指定只同步远程的 shared 路径
            remote: 'shared',
        });

        setConnected(true);
        addLogMessage('[系统] 已连接到 SharedWorker (仅同步 shared 路径)');

        return () => {
            syncer.stop();
            worker.port.close();
        };
    }, []);

    // 监听 store 变化
    // 远程的 shared.counter 会同步到本地的 counter，shared.message -> message，shared.todos -> todos，shared.user -> user
    const [sharedData, setSharedData] = useState({
        counter: store.state.counter,
        message: store.state.message,
        todos: store.state.todos,
        user: store.state.user,
    });

    useEffect(() => {
        const unwatch = store.watch(({ path, value }) => {
            // 监听根级别的路径变化
            setSharedData({
                counter: store.state.counter,
                message: store.state.message,
                todos: [...store.state.todos],
                user: { ...store.state.user },
            });
            addLogMessage(`[同步] ${path.join('.')} = ${JSON.stringify(value)}`);
        });
        return () => unwatch.off();
    }, []);

    const addLogMessage = (msg: string) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogMessages((prev) => [`[${timestamp}] ${msg}`, ...prev].slice(0, 50));
    };

    // 共享数据操作
    const incrementSharedCounter = () => {
        store.state.counter++;
        addLogMessage('[操作] 增加共享计数器');
    };

    const decrementSharedCounter = () => {
        store.state.counter--;
        addLogMessage('[操作] 减少共享计数器');
    };

    const updateSharedMessage = () => {
        const messages = [
            '你好，世界！',
            'Hello, World!',
            'SharedWorker 同步测试',
            '路径指定同步演示',
            'AutoStore Syncer',
        ];
        const currentIndex = messages.indexOf(store.state.message);
        const nextIndex = (currentIndex + 1) % messages.length;
        store.state.message = messages[nextIndex];
        addLogMessage(`[操作] 更新共享消息: ${messages[nextIndex]}`);
    };

    // Todos 操作
    const addTodo = () => {
        const newTodo = {
            id: Date.now(),
            text: `待办事项 ${store.state.todos.length + 1}`,
            completed: false,
        };
        store.state.todos.push(newTodo);
        addLogMessage(`[操作] 添加待办: ${newTodo.text}`);
    };

    const toggleTodo = (id: number) => {
        const todo = store.state.todos.find((t) => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            addLogMessage(`[操作] 切换待办: ${todo.text}`);
        }
    };

    const deleteTodo = (id: number) => {
        const index = store.state.todos.findIndex((t) => t.id === id);
        if (index !== -1) {
            const todoText = store.state.todos[index].text;
            store.state.todos.splice(index, 1);
            addLogMessage(`[操作] 删除待办: ${todoText}`);
        }
    };

    const clearTodos = () => {
        if (store.state.todos.length === 0) {
            addLogMessage(`[操作] 待办列表已为空`);
            return;
        }
        const count = store.state.todos.length;
        store.update((state) => {
            state.todos = [];
        });
        addLogMessage(`[操作] 清空所有待办事项 (${count}条)`);
    };

    // User 操作
    const updateUserName = () => {
        const names = ['李四', '王五', '赵六', '钱七'];
        const currentIndex = names.indexOf(store.state.user.name);
        const nextIndex = (currentIndex + 1) % names.length;
        store.state.user.name = names[nextIndex];
        addLogMessage(`[操作] 更新用户名: ${names[nextIndex]}`);
    };

    const updateUserAge = () => {
        store.state.user.age = store.state.user.age + 1;
        addLogMessage(`[操作] 增加年龄: ${store.state.user.age}`);
    };

    const updateUserEmail = () => {
        const emails = [
            'zhangsan@example.com',
            'lisi@example.com',
            'wangwu@example.com',
            'zhaoliu@example.com',
        ];
        const currentIndex = emails.indexOf(store.state.user.email);
        const nextIndex = (currentIndex + 1) % emails.length;
        store.state.user.email = emails[nextIndex];
        addLogMessage(`[操作] 更新邮箱: ${emails[nextIndex]}`);
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

            <div style={styles.infoBox}>
                <h3>ℹ️ 路径指定同步说明</h3>
                <p>
                    此示例通过 <code>remote: 'shared'</code> 参数将远程 <code>shared.*</code>{' '}
                    路径的数据同步到本地根级别。
                </p>
                <p>
                    远程的 <code>shared.counter</code> 会同步到本地的 <code>counter</code>，
                    <code>shared.message</code> → <code>message</code>，<code>shared.todos</code> →{' '}
                    <code>todos</code>，<code>shared.user</code> → <code>user</code>。
                </p>
                <p>
                    打开多个页签，你会发现 <strong>共享计数器</strong>、<strong>共享消息</strong>、
                    <strong>待办事项</strong>、<strong>用户信息</strong> 会在所有页签间同步。
                </p>
            </div>

            <div style={styles.main}>
                {/* 共享数据区域 */}
                <section style={styles.card}>
                    <h2>🔄 共享数据 (会同步)</h2>
                    {!connected && (
                        <div style={styles.warningBox}>⚠️ 正在连接到 SharedWorker，请稍候...</div>
                    )}
                    <div style={styles.section}>
                        <h3>共享计数器</h3>
                        <div style={styles.counterDisplay}>
                            <span style={styles.counterValue}>{sharedData.counter}</span>
                        </div>
                        <div style={styles.buttonContainer}>
                            <button
                                onClick={decrementSharedCounter}
                                disabled={!connected}
                                style={{
                                    ...styles.button,
                                    flex: 1,
                                    width: 'auto',
                                    opacity: connected ? 1 : 0.5,
                                }}>
                                - 减少
                            </button>
                            <button
                                onClick={incrementSharedCounter}
                                disabled={!connected}
                                style={{
                                    ...styles.button,
                                    flex: 1,
                                    width: 'auto',
                                    opacity: connected ? 1 : 0.5,
                                }}>
                                + 增加
                            </button>
                        </div>
                    </div>

                    <div style={styles.section}>
                        <h3>共享消息</h3>
                        <div style={styles.messageDisplay}>{sharedData.message}</div>
                        <button
                            onClick={updateSharedMessage}
                            disabled={!connected}
                            style={{ ...styles.button, opacity: connected ? 1 : 0.5 }}>
                            切换共享消息
                        </button>
                    </div>

                    <div style={styles.section}>
                        <h3>待办事项列表</h3>
                        <div style={styles.todoList}>
                            {sharedData.todos.length === 0 ? (
                                <p style={styles.empty}>暂无待办事项</p>
                            ) : (
                                sharedData.todos.map((todo) => (
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
                                                flexGrow: 1,
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
                                                width: 'auto',
                                            }}>
                                            删除
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                        <div style={styles.buttonContainer}>
                            <button
                                onClick={addTodo}
                                disabled={!connected}
                                style={{ ...styles.button, opacity: connected ? 1 : 0.5 }}>
                                + 添加待办
                            </button>
                            <button
                                onClick={clearTodos}
                                disabled={!connected}
                                style={{
                                    ...styles.button,
                                    backgroundColor: '#ff9800',
                                    opacity: connected ? 1 : 0.5,
                                }}>
                                🗑️ 清空列表
                            </button>
                        </div>
                    </div>

                    <div style={styles.section}>
                        <h3>用户信息</h3>
                        <div style={styles.userInfo}>
                            <div style={styles.userField}>
                                <label>姓名：</label>
                                <span style={styles.userValue}>{sharedData.user.name}</span>
                            </div>
                            <div style={styles.userField}>
                                <label>年龄：</label>
                                <span style={styles.userValue}>{sharedData.user.age} 岁</span>
                            </div>
                            <div style={styles.userField}>
                                <label>邮箱：</label>
                                <span style={styles.userValue}>{sharedData.user.email}</span>
                            </div>
                        </div>
                        <div style={styles.buttonContainer}>
                            <button
                                onClick={updateUserName}
                                disabled={!connected}
                                style={{ ...styles.button, opacity: connected ? 1 : 0.5 }}>
                                切换姓名
                            </button>
                            <button
                                onClick={updateUserAge}
                                disabled={!connected}
                                style={{ ...styles.button, opacity: connected ? 1 : 0.5 }}>
                                增加年龄
                            </button>
                            <button
                                onClick={updateUserEmail}
                                disabled={!connected}
                                style={{ ...styles.button, opacity: connected ? 1 : 0.5 }}>
                                切换邮箱
                            </button>
                        </div>
                    </div>

                    <p style={styles.hint}>
                        <strong>这些数据会同步到所有页签</strong>，在任何页签修改都会立即同步。
                    </p>
                </section>

                {/* 日志区域 */}
                <section style={styles.card}>
                    <h2>📋 操作日志</h2>
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
    infoBox: {
        backgroundColor: '#e3f2fd',
        border: '2px solid #2196f3',
        borderRadius: '8px',
        padding: '20px',
        fontSize: '14px',
        lineHeight: '1.6',
    } as any,
    warningBox: {
        backgroundColor: '#fff3e0',
        border: '2px solid #ff9800',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
        fontSize: '14px',
        textAlign: 'center' as const,
        color: '#e65100',
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
    section: {
        marginBottom: '20px',
        paddingBottom: '20px',
        borderBottom: '1px solid #e0e0e0',
    },
    counterDisplay: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        marginBottom: '10px',
    },
    counterValue: {
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#2196f3',
    },
    messageDisplay: {
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        marginBottom: '10px',
        fontSize: '16px',
        textAlign: 'center' as const,
    },
    todoList: {
        maxHeight: '200px',
        overflowY: 'auto' as const,
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#fafafa',
    },
    todoItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px',
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
        width: '100%',
    } as any,
    buttonContainer: {
        display: 'flex',
        gap: '10px',
    } as any,
    hint: {
        color: '#666',
        fontSize: '14px',
        lineHeight: '1.5',
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
