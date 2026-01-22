/**
 * Worker React 示例 - 主组件
 *
 * 演示如何使用 AutoStoreSyncer 与 SharedWorker 中的 AutoStoreSyncManager 进行同步
 */

import { useState, useEffect, useRef } from 'react';
import { AutoStore } from 'autostore';
import { AutoStoreSyncer } from '@autostorejs/syncer';
import { WorkerTransport } from '@autostorejs/syncer/transports/worker';
import type { StateRemoteOperate } from '@autostorejs/syncer';

function App() {
    const [store] = useState(() => {
        return new AutoStore({
            count: 0,
            messages: [] as string[],
            // 客户端本地计算属性
            messageCount: (scope: any) => scope.messages.length,
        });
    });

    const [connected, setConnected] = useState(false);
    const [clientId, setClientId] = useState<string>('');
    const [logMessages, setLogMessages] = useState<string[]>([]);

    const syncerRef = useRef<AutoStoreSyncer | null>(null);
    const workerRef = useRef<SharedWorker | null>(null);

    // 初始化连接
    useEffect(() => {
        // 创建 SharedWorker
        const worker = new SharedWorker(new URL('./shared-worker.ts', import.meta.url), {
            type: 'module',
        });

        workerRef.current = worker;

        // 生成客户端 ID
        const id = `tab-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        setClientId(id);

        // 创建 transport
        const transport = new WorkerTransport({
            worker: worker.port,
            id,
        });

        // 创建 syncer
        const syncer = new AutoStoreSyncer(store, {
            transport,
            mode: 'pull', // 使用 pull 模式，从服务端拉取初始状态
            immediate: true, // 首次连接时从服务端拉取数据
            direction: 'both', // 允许双向通信
        });

        syncerRef.current = syncer;

        // 启动端口
        worker.port.start();

        setConnected(true);

        // 监听接收消息（用于日志显示）
        transport.receive((operate: StateRemoteOperate) => {
            addLogMessage(`[接收] ${operate.type} - ${operate.path.join('.')}`);
        });

        addLogMessage('[系统] 已连接到 SharedWorker');

        // 清理函数
        return () => {
            syncer.stop();
            worker.port.close();
        };
    }, []);

    // 监听 store 变化，更新 UI
    const [count, setCount] = useState(store.state.count);
    const [messages, setMessages] = useState<string[]>(store.state.messages);
    const [messageCount, setMessageCount] = useState(store.state.messageCount);

    useEffect(() => {
        const unwatch = store.watch(({ path, value, type }) => {
            if (path[0] === 'count') {
                setCount(value);
                addLogMessage(`[更新] count = ${value}`);
            } else if (path[0] === 'messages') {
                setMessages([...store.state.messages]);
                setMessageCount(store.state.messageCount);
                addLogMessage(`[更新] messages (总数: ${store.state.messageCount})`);
            }
        });
        return () => unwatch.off();
    }, []);

    // 添加日志消息
    const addLogMessage = (msg: string) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogMessages((prev) => [`[${timestamp}] ${msg}`, ...prev].slice(0, 50));
    };

    // 增加计数
    const increment = () => {
        console.log('[App] 准备增加计数，当前值:', store.state.count);
        store.update((state) => {
            state.count++;
        }, { flags: 0 }); // 确保 flags 为 0，这样 syncer 才会发送
        console.log('[App] 已增加计数，新值:', store.state.count);
        addLogMessage(`[本地] 手动增加 count`);
    };

    // 减少计数
    const decrement = () => {
        console.log('[App] 准备减少计数，当前值:', store.state.count);
        store.update((state) => {
            state.count--;
        }, { flags: 0 }); // 确保 flags 为 0，这样 syncer 才会发送
        console.log('[App] 已减少计数，新值:', store.state.count);
        addLogMessage(`[本地] 手动减少 count`);
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1>🔄 AutoStore SharedWorker 同步示例</h1>
                <div style={styles.statusBar}>
                    <span
                        style={{
                            ...styles.statusIndicator,
                            backgroundColor: connected ? '#4caf50' : '#f44336',
                        }}
                    />
                    <span>
                        {connected ? '已连接' : '未连接'} | 客户端 ID: {clientId}
                    </span>
                </div>
            </header>

            <main style={styles.main}>
                {/* 计数器区域 */}
                <section style={styles.card}>
                    <h2>计数器（支持双向同步）</h2>
                    <div style={styles.counter}>{count}</div>
                    <div style={styles.buttonContainer}>
                        <button onClick={decrement} style={styles.button}>
                            - 减少
                        </button>
                        <button onClick={increment} style={styles.button}>
                            + 增加
                        </button>
                    </div>
                    <p style={styles.hint}>
                        点击按钮修改计数，变更会同步到 SharedWorker 并广播到所有页签。
                        同时，服务端每 5 秒自动递增一次计数。
                    </p>
                </section>

                {/* 消息列表区域 */}
                <section style={styles.card}>
                    <h2>消息列表</h2>
                    <div style={styles.messageList}>
                        {messages.length === 0 ? (
                            <p style={styles.empty}>暂无消息</p>
                        ) : (
                            messages.map((msg, idx) => (
                                <div key={idx} style={styles.messageItem}>
                                    {msg}
                                </div>
                            ))
                        )}
                    </div>
                    <div style={styles.messageFooter}>
                        <span>总数: {messageCount}</span>
                    </div>
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
            </main>

            <footer style={styles.footer}>
                <p>打开多个页签可以看到状态同步效果</p>
            </footer>
        </div>
    );
}

// 样式定义
const styles = {
    container: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column' as const,
    },
    header: {
        backgroundColor: '#2196f3',
        color: 'white',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    } as any,
    statusBar: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: '10px',
        fontSize: '14px',
    },
    statusIndicator: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
    },
    main: {
        flex: 1,
        padding: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
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
        marginBottom: '15px',
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
    messageList: {
        maxHeight: '200px',
        overflowY: 'auto' as const,
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        padding: '10px',
        marginBottom: '10px',
    },
    messageItem: {
        padding: '8px',
        borderBottom: '1px solid #f0f0f0',
    },
    empty: {
        color: '#999',
        textAlign: 'center' as const,
        padding: '20px',
    },
    messageFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        color: '#666',
        fontSize: '14px',
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
    footer: {
        backgroundColor: 'white',
        padding: '15px',
        textAlign: 'center' as const,
        borderTop: '1px solid #e0e0e0',
        color: '#666',
    },
};

export default App;
