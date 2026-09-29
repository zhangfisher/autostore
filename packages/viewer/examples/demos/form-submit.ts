// 示例 18：表单提交管理（index.html → panel-form-submit）
// 受管提交（ADR-0035）：保存 → 行内错误校验 → 全局遮罩（spinner）→ fetch(action,{method,FormData})
// → 成败 toast + submit-result 事件；本页 mock /api/submit-settings 演示完整流程
import { AutoStore, configurable } from 'autostore'
import type { AutostoreViewer } from '../../src/autostore-viewer'

// 开启 resetable：默认区头的「重置」按钮恢复初始状态（未开启时渲染禁用 + tooltip 提示）；
// title 作为默认区头 <store.title> 占位符的求值源
const store18 = new AutoStore(
  {
    // required：清空后保存 → 行内错误登记 → 提交被 toast 拦截（校验链演示）
    name: configurable('生产环境配置', {
      label: '配置名称',
      required: true,
      help: '必填：清空后点保存，演示校验拦截',
    }),
    endpoint: configurable('https://api.example.com/v1', { label: '服务地址', widget: 'url' }),
    // 小数值：number 输入缺省 step="any"（浏览器默认 step=1 会把小数判 stepMismatch 非法）
    threshold: configurable(0.75, { label: '告警阈值' }),
    replicas: configurable(3, { label: '副本数', suffix: ' 个' }),
    debug: configurable(false, { label: '调试模式' }),
    database: configurable(
      { host: '127.0.0.1', port: 5432, ssl: true },
      { label: '数据库' },
    ),
  },
  { title: '服务配置', resetable: true },
)

const viewer18 = document.getElementById('viewer18') as AutostoreViewer
viewer18.store = store18

// mock 服务端：拦截 /api/submit-settings（延迟 800ms 让遮罩/spinner 可见）；
// 勾选「模拟失败」返回 500；其余请求（图标拉取等）透传原生 fetch
const ctlSubmitFail = document.getElementById('ctl-submit-fail') as HTMLInputElement
const realFetch = window.fetch.bind(window)
window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
  if (!url.startsWith('/api/submit-settings')) return realFetch(input, init)
  await new Promise((resolve) => setTimeout(resolve, 800))
  if (ctlSubmitFail.checked) {
    return new Response(JSON.stringify({ error: 'internal server error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
  const saved: Record<string, string> = {}
  const body = init?.body
  if (body instanceof FormData) {
    body.forEach((value, key) => {
      saved[key] = typeof value === 'string' ? value : value.name
    })
  }
  // 提交的数据（FormData 回显）：发起时即渲染，与返回后的 submit-result 日志分列
  submitPayload.textContent = JSON.stringify(saved, null, 2)
  return new Response(JSON.stringify({ ok: true, saved }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })
}

// submit-result 事件监听演示：bubbles+composed 穿透 shadow，外部直接 addEventListener；
// detail = { ok, status, response }——外部据此接管后续（跳转/更新重置基线）
const submitEvents = document.getElementById('submit-events') as HTMLElement
const submitPayload = document.getElementById('submit-payload') as HTMLElement
viewer18.addEventListener('submit-result', (e) => {
  const { ok, status } = (e as CustomEvent).detail
  submitEvents.textContent = JSON.stringify({ ok, status }, null, 2)
})
