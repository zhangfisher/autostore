// 示例 11：only-configurable 配置面板（index.html → panel-only-config）
import { AutoStore, ConfigManager, configurable } from 'autostore'
import type { AutostoreViewer } from '../../src/autostore-viewer'

// 创建示例 11：only-configurable 配置面板（ADR-0034）
// 跨 store 空组：两 store 显式共享同一 ConfigManager（默认 configManager:true 创建的是
// 各 store 私有实例，组记录不互通）；store11b 注册的组在 viewer11 照渲染空标题条
const sharedCm11 = new ConfigManager({ load: () => ({}) })
const store11b = new AutoStore(
  {
    // —— 云端同步组（本 store 的主场：在 viewer12 有项，在 viewer11 渲染为跨 store 空组）——
    cloudSync: configurable(true, {
      label: '启用同步',
      group: { name: 'remote', title: '云端同步', icon: 'cloud', order: 5 },
      widget: 'checkbox',
    }),
    syncInterval: configurable(15, { label: '同步间隔', group: 'remote', suffix: ' 分钟', widget: 'number', min: 1 }),
    // —— 默认区 ——
    deviceName: configurable('WORKSTATION-01', { label: '设备名称', widget: 'text' }),
    conflictStrategy: configurable('ask', {
      label: '冲突策略',
      choices: [
        { label: '每次询问', value: 'ask' },
        { label: '以云端为准', value: 'remote-wins' },
        { label: '以本地为准', value: 'local-wins' },
      ],
    }),
  },
  { configManager: sharedCm11 },
)
const store11 = new AutoStore(
  {
    // —— 默认区（未声明 group：置顶裸排无标题条）——
    lang: configurable('zh-CN', { label: '界面语言', help: '未声明 group 的配置项归入置顶默认区（无标题条裸排）' }),
    autoCheckUpdate: configurable(true, { label: '自动检查更新', widget: 'checkbox' }),

    // —— 网络组（对象形式 group：title/icon/order 元数据齐全，order=0 置首）——
    proxy: configurable(
      {
        // 嵌套 configurable 子项：归位容器子级不平铺（顶层只有 proxy 容器行）
        enable: configurable(false, { label: '启用代理', group: { name: 'network', title: '网络', icon: 'globe', order: 0 }, widget: 'checkbox' }),
        host: configurable('127.0.0.1', { label: '地址', group: 'network', widget: 'text' }),
        port: configurable(7890, { label: '端口', group: 'network', widget: 'number', min: 1, max: 65535 }),
        // 非 configurable 子级：作为容器值结构成员照常显示
        bypass: 'localhost,127.0.0.1',
      },
      { label: '网络代理', group: 'network' },
    ),

    // —— 外观组（order=1；字符串形式 group 声明）——
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
    editorFont: configurable('ui-monospace', { label: '等宽字体', group: 'appearance', widget: 'text' }),

    // —— 编辑器组（order 缺省：沉底按注册序排在有 order 的组之后）——
    tabSize: configurable(2, { label: '缩进空格', group: { name: 'editor', title: '编辑器' }, widget: 'number', min: 1, max: 8 }),
    wordWrap: configurable(true, { label: '自动换行', group: 'editor', widget: 'checkbox' }),

    // —— advanced：优先于 group（声明了 editor 组仍被收进「高级选项」虚拟组，置尾默认折叠）——
    telemetry: configurable(true, {
      label: '遥测上报',
      advanced: true,
      group: 'editor',
      widget: 'checkbox',
      help: 'advanced:true 一律归入「高级选项」（优先于 group 声明），该组默认折叠、空则不渲染',
    }),
    experimentalApi: configurable(false, { label: '实验性 API', advanced: true, widget: 'checkbox' }),

    // —— 非 configurable：配置面板模式下不渲染 ——
    internalCache: '不应出现在配置面板',
  },
  { configManager: sharedCm11 },
)

// 示例 11 绑定：only-configurable 开关 + entrys 交集过滤双通道（ADR-0034）
const viewer11 = document.getElementById('viewer11') as AutostoreViewer
viewer11.store = store11
// 多 store：viewer12 绑定共享同一 ConfigManager 的另一 store（组清单相同、组内项各归各 store）
const viewer12 = document.getElementById('viewer12') as AutostoreViewer
viewer12.store = store11b
const ctlOnlyConfig = document.getElementById('ctl-only-config') as HTMLInputElement
const ctlConfigEntry = document.getElementById('ctl-config-entry') as HTMLInputElement
ctlOnlyConfig.addEventListener('change', () => {
    viewer11.onlyConfigurable = ctlOnlyConfig.checked
})
ctlConfigEntry.addEventListener('change', () => {
    viewer11.entrys = ctlConfigEntry.value.trim()
})
