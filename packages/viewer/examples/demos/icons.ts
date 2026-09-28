// 示例 8：图标注册链演示（index.html → panel-icons）
import { AutoStore, configurable } from 'autostore'
import type { AutostoreViewer } from '../../src/autostore-viewer'

// 创建示例 8：图标注册链演示（slot 自定义 > 内置 > icon-url 拉取，ADR-0024）
const store8 = new AutoStore({
  // ① slot 自定义图标引用（custom-user/custom-box 由 viewer8 的 template slot=icons 提供）
  user: configurable('张三', {
    label: '用户',
    icon: 'custom-user',
    help: 'schema.icon 引用 slot 自定义图标',
  }),
  box: configurable(['a', 'b'], {
    label: '容器',
    icon: 'custom-box',
    help: '容器节点同样支持 schema.icon',
  }),
  // ③ iconify 批量拉取：四个未知名渲染时攒批合并为一次请求
  home: configurable('首页', { label: '首页', icon: 'home', help: 'iconify 拉取' }),
  star: configurable('收藏', { label: '收藏', icon: 'star', help: 'iconify 拉取（与相邻未知名合并为一次批量请求）' }),
  settings: configurable('偏好', { label: '设置', icon: 'settings', help: 'iconify 拉取' }),
  lock: configurable('锁定', { label: '安全', icon: 'lock', help: 'iconify 拉取' }),
  // ④ not_found 负缓存：回落类型图标显示
  ghost: configurable('幽灵项', {
    label: '不存在图标',
    icon: 'this-icon-does-not-exist',
    help: 'iconify 无此图标：负缓存，回落类型图标显示',
  }),
  // ② 覆盖内置：object/array 图标被 viewer8 的 slot 同名覆盖（同心圆/圆角方块）
  plain: { a: 1, b: [true, false] },
})

const viewer8 = document.getElementById('viewer8') as AutostoreViewer
viewer8.store = store8
