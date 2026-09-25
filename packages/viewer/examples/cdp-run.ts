// CDP 真时间验证驱动器：无头浏览器加载页面并轮询 #result 文本直至非 PENDING
// 用法：bun examples/cdp-run.ts <url>
import { spawn } from 'child_process'

const url = process.argv[2]
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9333

const proc = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-sandbox',
  `--remote-debugging-port=${PORT}`, 'about:blank',
], { stdio: 'ignore' })

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function main() {
  // 等 CDP 端口就绪
  let targets: any[] = []
  for (let i = 0; i < 40; i++) {
    await sleep(250)
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`)
      targets = await res.json()
      if (targets.length) break
    } catch {}
  }
  const page = targets.find((t) => t.type === 'page')
  if (!page) throw new Error('no page target')
  const ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j })
  let seq = 0
  const send = (method: string, params: any = {}): Promise<any> =>
    new Promise((resolve) => {
      const id = ++seq
      const onMsg = (ev: MessageEvent) => {
        const msg = JSON.parse(String(ev.data))
        if (msg.id === id) { ws.removeEventListener('message', onMsg); resolve(msg.result) }
      }
      ws.addEventListener('message', onMsg)
      ws.send(JSON.stringify({ id, method, params }))
    })
  await send('Runtime.enable')
  await send('Page.navigate', { url })
  let result = 'PENDING'
  for (let i = 0; i < 40; i++) {
    await sleep(500)
    const r = await send('Runtime.evaluate', {
      expression: "document.getElementById('result')?.textContent ?? 'PENDING'",
      returnByValue: true,
    })
    const text = r?.result?.value ?? 'PENDING'
    if (text !== 'PENDING') { result = text; break }
  }
  console.log(result)
  proc.kill()
  process.exit(0)
}

main().catch((e) => { console.error('DRIVER-FAIL ' + e.message); proc.kill(); process.exit(1) })
