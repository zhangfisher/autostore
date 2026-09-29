// 示例 12：独立的 only-configurable 多 store 配置面板（index.html → panel-multi-config）
// 与示例 11 的区别：不复用 sharedCm11、不挂任何控制开关——两个 viewer 都以
// only-configurable 属性常驻启用配置面板模式，专门演示共享 ConfigManager 下的多 store 形态：
// 组清单（configManager.groups）跨 store 聚合对两个面板相同，组内项各归各 store 的 configurabled。
import { AutoStore, ConfigManager, configurable } from 'autostore'
import type { AutostoreViewer } from '../../src/autostore-viewer'

// 独立的共享 ConfigManager（global:false 不接管全局键，避免影响其它示例的默认 CM）
const sharedCm12 = new ConfigManager({ load: () => ({}) }, { global: false })

// —— store A：客户端配置（网络/外观/编辑器组 + 默认区 + 高级项）——
const storeA = new AutoStore(
  {
    // 默认区（未声明 group：置顶裸排无标题条）
    language: configurable('zh-CN', { label: '界面语言', widget: 'select', choices: [
      { label: '简体中文', value: 'zh-CN' },
      { label: 'English', value: 'en-US' },
    ] }),
    autoStart: configurable(true, { label: '开机自启', widget: 'checkbox' }),

    // 网络组（对象形式 group：title/icon/order 齐全，order=0 置首）
    proxy: configurable(
      {
        // 嵌套 configurable 子项：归位容器子级不平铺（顶层只有 proxy 容器行）
        enable: configurable(false, { label: '启用代理', group: { name: 'network', title: '网络', icon: 'globe', order: 0 }, widget: 'checkbox' }),
        host: configurable('127.0.0.1', { label: '代理地址', group: 'network', widget: 'text' }),
        port: configurable(7890, { label: '代理端口', group: 'network', widget: 'number', min: 1, max: 65535 }),
        // 非 configurable 子级：作为容器值结构成员照常显示
        bypass: 'localhost,127.0.0.1',
      },
      { label: '网络代理', group: 'network' },
    ),
    dns: configurable(['8.8.8.8', '114.114.114.114'], {
      label: 'DNS 服务器',
      group: 'network',
      widget: 'text',
      help: '字符串形式 group 声明（元数据由组名注册时补齐）',
    }),

    // 外观组（order=1）
    theme: configurable('dark', {
      label: '主题',
      group: { name: 'appearance', title: '外观', icon: 'palette', order: 1 },
      widget: 'select',
      choices: [
        { label: '浅色', value: 'light' },
        { label: '深色', value: 'dark' },
        { label: '自动', value: 'auto' },
      ],
    }),
    fontSize: configurable(14, { label: '字号', group: 'appearance', suffix: ' px', widget: 'number', min: 10, max: 32 }),

    // 编辑器组（order 缺省：沉底按注册序排在有 order 的组之后）
    tabSize: configurable(2, { label: '缩进空格', group: { name: 'editor', title: '编辑器' }, widget: 'number', min: 1, max: 8 }),
    wordWrap: configurable(true, { label: '自动换行', group: 'editor', widget: 'checkbox' }),

    // advanced：优先于 group（声明了 editor 组仍收进「高级选项」虚拟组，置尾默认折叠）
    telemetry: configurable(true, {
      label: '遥测上报',
      advanced: true,
      group: 'editor',
      widget: 'checkbox',
      help: 'advanced:true 一律归入「高级选项」（优先于 group 声明），空则不产出',
    }),

    // 非 configurable：配置面板模式下不渲染
    internalCache: '不应出现在配置面板',
  },
  { configManager: sharedCm12 },
)

// —— store B：云端账户配置（在共享 CM 上注册「云端同步」组 + 网络组，与 store A 同组不同项）——
const storeB = new AutoStore(
  {
    // 云端同步组（本 store 的主场：在 viewerB 有项，在 viewerA 渲染为跨 store 空组）
    cloudSync: configurable(true, {
      label: '启用同步',
      group: { name: 'remote', title: '云端同步', icon: 'cloud', order: 5 },
      widget: 'checkbox',
    }),
    syncInterval: configurable(15, { label: '同步间隔', group: 'remote', suffix: ' 分钟', widget: 'number', min: 1 }),

    // 与 store A 同名的 network 组：组标题条共享，组内项各归各 store（互不混入）
    stun: configurable('stun.l.google.com:19302', {
      label: 'STUN 服务器',
      group: 'network',
      widget: 'text',
      help: 'store B 的 network 项只出现在 viewerB，viewerA 的 network 组不含它',
    }),

    // 默认区
    deviceName: configurable('WORKSTATION-01', { label: '设备名称', widget: 'text' }),
    conflictStrategy: configurable('ask', {
      label: '冲突策略',
      widget: 'select',
      choices: [
        { label: '每次询问', value: 'ask' },
        { label: '以云端为准', value: 'remote-wins' },
        { label: '以本地为准', value: 'local-wins' },
      ],
    }),
  },
  { configManager: sharedCm12 },
)

// 绑定：两个 viewer 都以 only-configurable 属性常驻启用配置面板（无开关、无回落）
const viewerA = document.getElementById('viewer13') as AutostoreViewer
viewerA.store = storeA
const viewerB = document.getElementById('viewer14') as AutostoreViewer
viewerB.store = storeB
