/**
 * AutoStore 同步示例 - 主应用
 *
 * 提供侧边导航菜单切换不同示例
 */

import { useState } from 'react';
import { FullSyncExample } from './examples/full-sync';
import { PathSyncExample } from './examples/path-sync';
import { BroadcastChannelExample } from './examples/broadcast-channel';
import { MultiStoreExample } from './examples/multi-store';
import { LocalSyncExample } from './examples/local-sync';

// 示例配置
const examples = [
    {
        id: 'local-sync',
        title: '本地同步方式',
        description:
            '展示 4 种不同的本地同步方式：LocalTransport、EventEmitterTransport、store.sync、store.clone',
        icon: '🔗',
    },
    {
        id: 'multi-store',
        title: '多 Store 同步',
        description: '使用 AutoStoreSwitchSyncer 管理多个独立的 store，实现 N-N 状态同步',
        icon: '🔀',
    },
    {
        id: 'broadcast-channel',
        title: '广播频道',
        description: '使用 BroadcastChannel API 在多个页签之间同步状态，无需 Worker',
        icon: '📡',
    },
    {
        id: 'full-sync',
        title: '完整同步',
        description: '演示完整的 store 同步，包括计数器、待办事项和用户信息',
        icon: '🔄',
    },
    {
        id: 'path-sync',
        title: '同步局部状态',
        description: '演示如何只同步 store 中的指定路径，实现选择性同步',
        icon: '🎯',
    },
];

function App() {
    const [activeExample, setActiveExample] = useState(examples.length > 0 ? examples[0].id : '');

    // 渲染当前激活的示例
    const renderExample = () => {
        switch (activeExample) {
            case 'local-sync':
                return <LocalSyncExample />;
            case 'broadcast-channel':
                return <BroadcastChannelExample />;
            case 'full-sync':
                return <FullSyncExample />;
            case 'path-sync':
                return <PathSyncExample />;
            case 'multi-store':
                return <MultiStoreExample />;
            default:
                return <LocalSyncExample />;
        }
    };

    return (
        <div style={styles.container}>
            {/* 侧边导航 */}
            <aside style={styles.sidebar}>
                <div style={styles.sidebarHeader}>
                    <h1 style={styles.sidebarTitle}>
                        <span style={styles.logo}>🔄</span>
                        AutoStore 同步示例
                    </h1>
                    <p style={styles.sidebarSubtitle}>SharedWorker 状态同步演示</p>
                </div>

                <nav style={styles.nav}>
                    {examples.map((example) => (
                        <button
                            key={example.id}
                            onClick={() => setActiveExample(example.id)}
                            style={{
                                ...styles.navItem,
                                ...(activeExample === example.id ? styles.navItemActive : {}),
                            }}>
                            <span style={styles.navItemIcon}>{example.icon}</span>
                            <div style={styles.navItemContent}>
                                <div style={styles.navItemTitle}>{example.title}</div>
                                <div style={styles.navItemDescription}>{example.description}</div>
                            </div>
                        </button>
                    ))}
                </nav>

                <div style={styles.sidebarFooter}>
                    <p style={styles.footerText}>💡 打开多个页签可以看到状态同步效果</p>
                </div>
            </aside>

            {/* 主内容区 */}
            <main style={styles.main}>
                <header style={styles.header}>
                    <h2 style={styles.headerTitle}>
                        {examples.find((e) => e.id === activeExample)?.title}
                    </h2>
                    <p style={styles.headerDescription}>
                        {examples.find((e) => e.id === activeExample)?.description}
                    </p>
                </header>

                <div style={styles.content}>{renderExample()}</div>
            </main>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#f5f5f5',
    },
    sidebar: {
        width: '220px',
        backgroundColor: '#1976d2',
        color: 'white',
        display: 'flex',
        flexDirection: 'column' as const,
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        position: 'sticky' as const,
        top: 0,
        height: '100vh',
        overflowY: 'auto' as const,
    },
    sidebarHeader: {
        padding: '16px 12px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
    },
    logo: {
        fontSize: '20px',
        display: 'block',
        marginBottom: '6px',
    },
    sidebarTitle: {
        fontSize: '14px',
        fontWeight: 'bold',
        margin: 0,
        lineHeight: '1.3',
    },
    sidebarSubtitle: {
        fontSize: '11px',
        color: 'rgba(255,255,255,0.7)',
        margin: '4px 0 0 0',
    },
    nav: {
        flex: 1,
        padding: '12px 8px',
    },
    navItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        padding: '8px',
        marginBottom: '4px',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        textAlign: 'left' as const,
        transition: 'all 0.2s',
        color: 'rgba(255,255,255,0.8)',
    } as any,
    navItemActive: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
    },
    navItemIcon: {
        fontSize: '18px',
        flexShrink: 0,
    },
    navItemContent: {
        flex: 1,
        minWidth: 0,
    },
    navItemTitle: {
        fontSize: '13px',
        fontWeight: '600',
        marginBottom: '2px',
    },
    navItemDescription: {
        fontSize: '11px',
        lineHeight: '1.3',
        opacity: 0.7,
    },
    sidebarFooter: {
        padding: '12px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
    },
    footerText: {
        fontSize: '10px',
        color: 'rgba(255,255,255,0.6)',
        margin: 0,
        lineHeight: '1.4',
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column' as const,
        overflow: 'hidden',
    },
    header: {
        backgroundColor: 'white',
        padding: '20px 24px',
        borderBottom: '1px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    headerTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        margin: '0 0 6px 0',
        color: '#2c3e50',
    },
    headerDescription: {
        fontSize: '13px',
        color: '#7f8c8d',
        margin: 0,
    },
    content: {
        flex: 1,
        padding: '20px 24px',
        overflowY: 'auto' as const,
    },
};

export default App;
