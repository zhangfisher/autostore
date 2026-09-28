// 示例 9：schema.actions 节点动作（index.html → panel-actions）
import { AutoStore, configurable } from 'autostore'
import type { AutostoreViewer } from '../../src/autostore-viewer'

// 创建示例 9：schema.actions 节点动作（ADR-0030）
// onClick 契约：value = 节点当前状态值，ctx.update(v) 经 Proxy 写回该路径（树自动刷新）
const store9 = new AutoStore({
  // ① button 形态空回落四档：icon+label（翻倍，label 只作悬停兜底）/ 仅 label（加一减一，小文字按钮）/
  //    仅 icon（重置，rotate-ccw 经 iconify 拉取）/ 都无（空动作跳过 + console warn）
  counter: configurable(42, {
    label: '计数器',
    suffix: ' 次',
    help: '悬停本行：node-tools 内渲染 schema.actions 声明的动作；suffix 值装饰与节点动作并存互不干扰',
    actions: [
      { label: '加一', tooltip: 'value 加一：onClick 收到当前状态值，ctx.update 写回', onClick: (value, ctx) => ctx.update(value + 1) },
      { label: '减一', onClick: (value, ctx) => ctx.update(value - 1) },
      { icon: 'rotate-ccw', tooltip: '重置为 0（仅 icon：图标经 icon-url 拉取）', onClick: (_value, ctx) => ctx.update(0) },
      { icon: 'bolt', label: '翻倍', tooltip: 'icon+label：渲染为图标按钮，label 仅作悬停兜底', onClick: (value, ctx) => ctx.update(value * 2) },
      { label: '禁用操作', enable: false, tooltip: 'enable=false：渲染但置灰不可点' },
      { label: '隐藏操作', visible: false },
      { tooltip: 'icon 与 label 都无：跳过渲染（见 console warn）' },
    ],
  }),

  // ③ dropdown 形态：items 含 "-" 分割线与菜单项图标、caret 下拉箭头、
  //    syncMenu 选中后把该项 label/icon 回写触发按钮；菜单项 onClick 以该项为 ctx.action
  theme: configurable('深色', {
    label: '主题',
    widget: 'text',
    actions: [
      {
        type: 'dropdown',
        label: '切换主题',
        tooltip: 'dropdown 形态：菜单项点击以该项为 ctx.action',
        caret: true,
        syncMenu: true,
        items: [
          { label: '浅色', icon: 'sun', onClick: (_v, ctx) => ctx.update('浅色') },
          { label: '深色', icon: 'moon', onClick: (_v, ctx) => ctx.update('深色') },
          '-',
          { label: '跟随系统', icon: 'monitor', enable: false, tooltip: '菜单项 enable=false 同语义置灰' },
        ],
      },
    ],
  }),

  // ④ image 形态：url 渲染为图片按钮（尺寸与图标一致），点击写回
  status: configurable('运行中', {
    label: '状态',
    actions: [
      {
        type: 'image',
        url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23dc2626" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>',
        label: '停止',
        tooltip: 'image 形态：点击停止运行',
        onClick: (_value, ctx) => ctx.update('已停止'),
      },
    ],
  }),

  // ⑤ 容器节点同样支持 actions：重置整个对象
  server: configurable(
    { host: '192.168.1.10', port: 8080, debug: true },
    {
      label: '服务器',
      help: '容器节点的 actions：update 写回整个对象',
      actions: [
        {
          label: '重置配置',
          tooltip: '重置为默认值（对象整体写回）',
          onClick: (_value, ctx) => ctx.update({ host: 'localhost', port: 8080, debug: false }),
        },
      ],
    }
  ),
})

const viewer9 = document.getElementById('viewer9') as AutostoreViewer
viewer9.store = store9
// 'action' 自定义事件监听演示（ADR-0030）：bubbles+composed 穿透 shadow，
// 外部（light DOM 层）直接 addEventListener 即可收到；
// detail = { path, value, action }，path 与行 data-path 同源；
// 勾选「拦截事件」后 preventDefault，onClick 不再执行（cancelable）
const actionEvents = document.getElementById('action-events') as HTMLElement
const ctlIntercept = document.getElementById('ctl-intercept-action') as HTMLInputElement
viewer9.addEventListener('action', (e) => {
    const { path, value, action } = (e as CustomEvent).detail
    actionEvents.textContent = JSON.stringify(
        { path, value, action: { label: action.label, type: action.type ?? 'button' } },
        null,
        2,
    )
    if (ctlIntercept.checked) e.preventDefault()
})
