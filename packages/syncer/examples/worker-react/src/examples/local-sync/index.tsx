/**
 * 本地 Store 同步示例
 *
 * 展示四种不同的同步方式：
 * 1. LocalTransport - 通过 LocalTransport 进行同步
 * 2. EventEmitterTransport - 通过 EventEmitterTransport 进行同步
 * 3. store.sync() - 直接使用 store.sync() 方法同步
 * 4. store.clone() - 克隆 store 并自动同步
 *
 * 单个 Store 同时包含计数器、数组、对象三种数据类型
 */

import { useState, useEffect } from 'react';
import { AutoStore } from 'autostore';
import { AutoStoreSyncer, LocalTransport, EventEmitterTransport } from '@autostorejs/syncer';

// 简单的 EventEmitter 实现
class SimpleEventEmitter {
    private listeners = new Map<string, Set<(...args: any[]) => void>>();
    on(event: string, listener: (...args: any[]) => void): this {
        if (!this.listeners.has(event)) this.listeners.set(event, new Set());
        this.listeners.get(event)!.add(listener);
        return this;
    }
    off(event: string, listener: (...args: any[]) => void): this {
        this.listeners.get(event)?.delete(listener);
        return this;
    }
    emit(event: string, ...args: any[]): boolean {
        this.listeners.get(event)?.forEach((l) => l(...args));
        return !!this.listeners.get(event);
    }
}

export function LocalSyncExample() {
    const [logs, setLogs] = useState<string[]>([]);
    const [syncType, setSyncType] = useState<'local' | 'event' | 'sync' | 'clone'>('local');

    // Store 状态
    const [stores, setStores] = useState<{
        store1: AutoStore<any> | null;
        store2: AutoStore<any> | null;
        syncer: any;
    }>({ store1: null, store2: null, syncer: null });

    // 显示状态
    const [display1, setDisplay1] = useState<any>({});
    const [display2, setDisplay2] = useState<any>({});

    const addLog = (msg: string) => {
        const time = new Date().toLocaleTimeString();
        setLogs((p) => [`[${time}] ${msg}`, ...p].slice(0, 30));
    };

    // 初始化同步
    useEffect(() => {
        if (!stores.store1 || !stores.store2) return;

        const updateDisplay = () => {
            setDisplay1({ ...stores.store1!.state });
            setDisplay2({ ...stores.store2!.state });
        };

        const unwatch1 = stores.store1.watch(updateDisplay);
        const unwatch2 = stores.store2.watch(updateDisplay);
        updateDisplay();

        return () => {
            unwatch1.off();
            unwatch2.off();
        };
    }, [stores]);

    // 创建同步
    useEffect(() => {
        // 单个 Store 包含所有数据类型
        const initialData = {
            count: 0,
            items: ['A', 'B', 'C'] as string[],
            user: { name: '张三', age: 30, city: '北京' },
        };

        const s1 = new AutoStore(initialData, { id: `s1-${syncType}` });
        const s2 = new AutoStore({ count: 1, items: [], user: {} }, { id: `s2-${syncType}` });

        let syncer: any = null;

        if (syncType === 'local') {
            let t1: LocalTransport, t2: LocalTransport;
            t1 = new LocalTransport(() => t2);
            t2 = new LocalTransport(() => t1);
            t1.connect();
            t2.connect();
            // Store1: 默认 mode (push)
            new AutoStoreSyncer(s1, { transport: t1 });
            // Store2: pull 模式
            new AutoStoreSyncer(s2, { transport: t2, mode: 'pull' });
            syncer = {
                stop: () => {
                    t1.disconnect();
                    t2.disconnect();
                },
            };
        } else if (syncType === 'event') {
            const emitter = new SimpleEventEmitter();
            const t1 = new EventEmitterTransport({
                emitter: emitter as any,
                localEventName: 'ch2',
                remoteEventName: 'ch1',
            });
            const t2 = new EventEmitterTransport({
                emitter: emitter as any,
                localEventName: 'ch1',
                remoteEventName: 'ch2',
            });
            t1.connect();
            t2.connect();
            // Store1: 默认 mode (push)
            new AutoStoreSyncer(s1, { transport: t1 });
            // Store2: pull 模式
            new AutoStoreSyncer(s2, { transport: t2, mode: 'pull' });
            syncer = {
                stop: () => {
                    t1.disconnect();
                    t2.disconnect();
                },
            };
        } else if (syncType === 'sync') {
            syncer = s1.sync(s2);
        } else if (syncType === 'clone') {
            const cloned = s1.clone();
            setStores({ store1: s1, store2: cloned, syncer: { stop: () => {} } });
            return;
        }

        setStores({ store1: s1, store2: s2, syncer });
        addLog(`[${syncType.toUpperCase()}] 已初始化单向同步 Store1→Store2 (计数器+数组+对象)`);

        return () => syncer?.stop();
    }, [syncType]);

    // 操作函数
    const ops = {
        counter: {
            inc: () => {
                stores.store1!.state.count++;
                addLog('count++');
            },
            dec: () => {
                stores.store1!.state.count--;
                addLog('count--');
            },
        },
        array: {
            add: () => {
                const items = stores.store1!.state.items as string[];
                items.push(String.fromCharCode(65 + items.length));
                addLog(`push ${items[items.length - 1]}`);
            },
            remove: () => {
                const items = stores.store1!.state.items as string[];
                if (items.length > 0) {
                    const removed = items.pop()!;
                    addLog(`pop ${removed}`);
                }
            },
            clear: () => {
                (stores.store1!.state.items as string[]).splice(0);
                addLog('清空数组');
            },
        },
        object: {
            updateName: () => {
                const names = ['张三', '李四', '王五', '赵六'];
                const idx = names.indexOf(stores.store1!.state.user.name);
                stores.store1!.state.user.name = names[(idx + 1) % names.length];
                addLog(`user.name = ${stores.store1!.state.user.name}`);
            },
            updateAge: () => {
                stores.store1!.state.user.age++;
                addLog(`user.age = ${stores.store1!.state.user.age}`);
            },
            updateCity: () => {
                const cities = ['北京', '上海', '广州', '深圳'];
                const idx = cities.indexOf(stores.store1!.state.user.city);
                stores.store1!.state.user.city = cities[(idx + 1) % cities.length];
                addLog(`user.city = ${stores.store1!.state.user.city}`);
            },
        },
    };

    const renderStoreData = (data: any) => (
        <div style={styles.dataContainer}>
            {/* 计数器 */}
            <div style={styles.dataSection}>
                <div style={styles.dataLabel}>计数器</div>
                <div style={styles.bigNum}>{data.count ?? 0}</div>
                <div style={styles.btnGroup}>
                    <button onClick={ops.counter.inc} style={styles.btnSmall}>
                        +
                    </button>
                    <button onClick={ops.counter.dec} style={styles.btnSmall}>
                        -
                    </button>
                </div>
            </div>

            {/* 数组 */}
            <div style={styles.dataSection}>
                <div style={styles.dataLabel}>数组</div>
                <div style={styles.arrayBox}>
                    {(data.items ?? []).length === 0 ? (
                        <span style={styles.empty}>空数组</span>
                    ) : (
                        (data.items ?? []).map((v: string, i: number) => (
                            <span key={i} style={styles.arrayItem}>
                                {v}
                            </span>
                        ))
                    )}
                </div>
                <div style={styles.btnGroup}>
                    <button onClick={ops.array.add} style={styles.btnSmall}>
                        +添加
                    </button>
                    <button onClick={ops.array.remove} style={styles.btnSmallDanger}>
                        -删除
                    </button>
                    <button onClick={ops.array.clear} style={styles.btnSmallWarn}>
                        清空
                    </button>
                </div>
            </div>

            {/* 对象 */}
            <div style={styles.dataSection}>
                <div style={styles.dataLabel}>对象</div>
                <div style={styles.objBox}>
                    <div>
                        <span style={styles.objLabel}>姓名:</span> {data.user?.name ?? '-'}
                    </div>
                    <div>
                        <span style={styles.objLabel}>年龄:</span> {data.user?.age ?? '-'}
                    </div>
                    <div>
                        <span style={styles.objLabel}>城市:</span> {data.user?.city ?? '-'}
                    </div>
                </div>
                <div style={styles.btnGroup}>
                    <button onClick={ops.object.updateName} style={styles.btnSmall}>
                        姓名
                    </button>
                    <button onClick={ops.object.updateAge} style={styles.btnSmall}>
                        年龄+
                    </button>
                    <button onClick={ops.object.updateCity} style={styles.btnSmall}>
                        城市
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div style={styles.container}>
            {/* 工具栏 */}
            <div style={styles.toolbar}>
                <label style={styles.label}>同步方式:</label>
                <select
                    value={syncType}
                    onChange={(e) => setSyncType(e.target.value as any)}
                    style={styles.select}>
                    <option value="local">LocalTransport</option>
                    <option value="event">EventEmitter</option>
                    <option value="sync">store.sync()</option>
                    <option value="clone">store.clone()</option>
                </select>
                <span style={styles.divider}>|</span>
                <span style={styles.info}>
                    Store1(默认push) + Store2(mode:pull) - 启动后双向同步
                </span>
            </div>

            {/* 内容 */}
            <div style={styles.main}>
                <div style={styles.panel}>
                    <h3 style={styles.panelTitle}>Store 1 (mode: push - 默认)</h3>
                    <div style={styles.panelSubtitle}>启动时执行 push，将数据推送到 Store2</div>
                    {renderStoreData(display1)}
                </div>

                <div style={styles.arrow}>
                    <span style={styles.arrowIcon}>⇄</span>
                    <span style={styles.arrowText}>
                        {syncType === 'local' && 'LocalTransport'}
                        {syncType === 'event' && 'EventEmitter'}
                        {syncType === 'sync' && 'store.sync()'}
                        {syncType === 'clone' && 'store.clone()'}
                    </span>
                </div>

                <div style={styles.panel}>
                    <h3 style={styles.panelTitle}>Store 2 (mode: pull)</h3>
                    <div style={styles.panelSubtitle}>启动时执行 pull，从 Store1 拉取数据</div>
                    {renderStoreData(display2)}
                    <div style={styles.hint}>启动后双向同步，任一 Store 的修改都会同步</div>
                </div>
            </div>

            {/* 日志 */}
            <div style={styles.logBox}>
                <h4 style={styles.logTitle}>操作日志</h4>
                <div style={styles.logList}>
                    {logs.map((l, i) => (
                        <div key={i} style={styles.logItem}>
                            {l}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: { display: 'flex', flexDirection: 'column' as const, gap: '10px' },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 12px',
        backgroundColor: '#f5f5f5',
        borderRadius: '6px',
        fontSize: '13px',
    },
    label: { color: '#666', fontWeight: 500, whiteSpace: 'nowrap' as const },
    select: {
        padding: '5px 8px',
        fontSize: '13px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: 'white',
    },
    divider: { color: '#ddd' },
    info: { color: '#666', fontSize: '12px' },
    main: { display: 'flex', alignItems: 'stretch', gap: '12px' },
    panel: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '12px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        overflow: 'auto',
    },
    panelTitle: { margin: '0 0 4px', fontSize: '14px', fontWeight: 600, color: '#333' },
    panelSubtitle: { margin: '0 0 10px', fontSize: '11px', color: '#999', fontStyle: 'italic' },
    dataContainer: { display: 'flex', flexDirection: 'column' as const, gap: '10px' },
    dataSection: {
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
        border: '1px solid #e9ecef',
    },
    dataLabel: {
        fontSize: '12px',
        color: '#666',
        fontWeight: 600,
        marginBottom: '8px',
        textTransform: 'uppercase' as const,
    },
    bigNum: { fontSize: '36px', fontWeight: 'bold', color: '#2196f3', marginBottom: '8px' },
    arrayBox: {
        display: 'flex',
        gap: '4px',
        flexWrap: 'wrap' as const,
        marginBottom: '8px',
        minHeight: '32px',
    },
    arrayItem: {
        padding: '4px 8px',
        backgroundColor: '#e3f2fd',
        color: '#1976d2',
        borderRadius: '3px',
        fontSize: '12px',
        fontWeight: 500,
    },
    empty: { color: '#999', fontSize: '12px', fontStyle: 'italic' },
    objBox: {
        fontSize: '12px',
        lineHeight: 1.6,
        textAlign: 'left' as const,
        marginBottom: '8px',
    },
    objLabel: { color: '#666', fontWeight: 500, marginRight: '4px' },
    btnGroup: { display: 'flex', gap: '4px' },
    btnSmall: {
        flex: 1,
        padding: '4px 8px',
        fontSize: '11px',
        fontWeight: 500,
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
        backgroundColor: '#2196f3',
        color: 'white',
    },
    btnSmallDanger: {
        flex: 1,
        padding: '4px 8px',
        fontSize: '11px',
        fontWeight: 500,
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
        backgroundColor: '#f44336',
        color: 'white',
    },
    btnSmallWarn: {
        flex: 1,
        padding: '4px 8px',
        fontSize: '11px',
        fontWeight: 500,
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
        backgroundColor: '#ff9800',
        color: 'white',
    },
    readonlyBadge: {
        fontSize: '10px',
        color: '#999',
        fontStyle: 'italic',
        textAlign: 'center' as const,
        padding: '4px',
    },
    hint: {
        fontSize: '11px',
        color: '#999',
        textAlign: 'center' as const,
        marginTop: '8px',
        fontStyle: 'italic',
    },
    arrow: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        padding: '0 4px',
    },
    arrowIcon: { fontSize: '20px', color: '#2196f3' },
    arrowText: { fontSize: '10px', color: '#666', fontWeight: 500, textAlign: 'center' as const },
    logBox: {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    },
    logTitle: { margin: '0 0 6px', fontSize: '13px', fontWeight: 600, color: '#333' },
    logList: {
        maxHeight: '120px',
        overflowY: 'auto' as const,
        backgroundColor: '#f8f9fa',
        borderRadius: '4px',
        padding: '6px',
        fontFamily: 'monospace',
        fontSize: '11px',
    },
    logItem: { padding: '2px 0', borderBottom: '1px solid #eee' },
};
