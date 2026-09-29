// 示例：多行文本值（index.html → panel-multiline）
// 值含换行的字符串保持多行渲染（white-space: pre-wrap），高度截断至内容可见区 40%，
// 超出部分裁剪且无滚动条；单击行进入 click-edit / 双击值进入编辑不受影响
import { AutoStore, configurable } from 'autostore'
import type { AutostoreViewer } from '../../src/autostore-viewer'

// 少量换行：完整可见（未触达 40% 高度上限）
const intro = [
  'AutoStore Viewer 对含换行的字符串值保持多行渲染：',
  '换行符按原样保留，文本自然折行；',
  '值仍是普通字符串，编辑行为与单行值一致。',
].join('\n')

// 超长多行：40 行日志，超过可见区 40% 后被裁剪（无滚动条）
const changelog = Array.from(
  { length: 40 },
  (_, i) =>
    `[2024-01-01 00:${String(i % 60).padStart(2, '0')}:00] 第 ${i + 1} 行日志：系统运行正常，内存占用 42%，无异常事件发生。`
).join('\n')

const store = new AutoStore({
  doc: {
    intro:configurable(intro,{
        widget:"textarea"
    }),
    changelog:configurable(changelog,{
        widget:"textarea"
    }),
    version: '1.0.0',
  },
  notes: {
    remark: '单行值不受影响：仍然是 nowrap + 省略号截断。',
  },
})

const viewer = document.getElementById('viewer17') as AutostoreViewer
viewer.style.height = '320px'
viewer.store = store
