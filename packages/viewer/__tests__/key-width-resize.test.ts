import { test, expect } from 'bun:test'
import { KeyResizeController, MIN_KEY_WIDTH } from '../src/features/key-resize'
import type { KeyResizeHost } from '../src/features/key-resize'
import { LabelWidthController } from '../src/features/label-width'
import type { LabelWidthHost } from '../src/features/label-width'

// ---- 环境垫片：可控 rAF 队列（测试内 flush 驱动） ----
let rafQueue: (FrameRequestCallback | null)[] = []
;(globalThis as any).requestAnimationFrame = (cb: FrameRequestCallback) => {
  rafQueue.push(cb)
  return rafQueue.length
}
;(globalThis as any).cancelAnimationFrame = (id: number) => {
  if (rafQueue[id - 1]) rafQueue[id - 1] = null
}
const flushRaf = () => {
  const q = rafQueue
  rafQueue = []
  for (const cb of q) cb?.(0)
}
const resetRaf = () => {
  rafQueue = []
}

// getComputedStyle 垫片：--viewer-key-width 由 widthValue 控制，缩进恒 20px
let widthValue = '100px'
;(globalThis as any).getComputedStyle = () => ({
  getPropertyValue: (name: string) => (name === '--viewer-key-width' ? widthValue : '20px'),
})

// document 垫片：measure() 建探针 fragment（空树路径只创建不使用）
;(globalThis as any).document = (globalThis as any).document ?? {
  createDocumentFragment: () => ({ appendChild() {} }),
}

// ---- LabelWidth 锁存测试 ----

const mkLabelHost = () => {
  const calls = { probe: 0, writes: [] as string[] }
  const host: LabelWidthHost = {
    requestUpdate: () => {},
    valueAlign: 'left',
    showHint: true,
    showCount: true,
    maxKeyWidth: 300,
    disableSchema: false,
    getStore: () => ({}) as any,
    getTreeNodes: () => [],
    getLabelDepthBase: () => 0,
    getSchema: () => undefined,
    isExpandableType: () => false,
    // 探针非 null 即可：空树路径在 appendChild 之前早退，无需真实 DOM
    getMeasureProbe: () => {
      calls.probe++
      return { appendChild: () => {}, textContent: '' } as any
    },
    getHostElement: () => ({ style: { setProperty() {}, removeProperty() {} } }) as any,
    setKeyWidth: (w) => calls.writes.push(w),
  }
  return { host, calls }
}

test('锁存期间测量完全让位：不排帧、不触探针、不写值', () => {
  resetRaf()
  const { host, calls } = mkLabelHost()
  const ctrl = new LabelWidthController(host)
  ctrl.latch()
  expect(ctrl.latched).toBe(true)
  ctrl.scheduleMeasure()
  ctrl.measure()
  expect(rafQueue.length).toBe(0)
  expect(calls.probe).toBe(0)
  expect(calls.writes).toEqual([])
})

test('双击复位：解除锁存、排帧重测，并因缓存失效回落 auto（手动值不残留）', () => {
  resetRaf()
  const { host, calls } = mkLabelHost()
  const ctrl = new LabelWidthController(host)
  // 空树先测一轮：脏检查缓存已是 auto，无写入
  ctrl.measure()
  expect(calls.writes).toEqual([])
  // 模拟拖拽直写手动值（经宿主 setKeyWidth，旁路测量缓存）+ 锁存
  calls.writes.push('150px')
  ctrl.latch()
  ctrl.unlatch()
  expect(ctrl.latched).toBe(false)
  expect(rafQueue.length).toBe(1)
  flushRaf()
  // latch 失效了缓存（'' ≠ auto），复位后重测必写回 auto——否则 150px 永久残留
  expect(calls.writes).toEqual(['150px', 'auto'])
  expect(calls.probe).toBe(2)
})

// ---- KeyResize 拖拽测试 ----

const mkResizeHost = (align: 'left' | 'right' = 'left') => {
  const state = {
    latched: false,
    writes: [] as string[],
    events: [] as { width: number | null; manual: boolean }[],
    userSelectSet: 0,
    userSelectRemoved: 0,
  }
  const hostEl = {
    style: {
      setProperty: (name: string) => {
        if (name === 'user-select') state.userSelectSet++
      },
      removeProperty: (name: string) => {
        if (name === 'user-select') state.userSelectRemoved++
      },
    },
  }
  const host: KeyResizeHost = {
    valueAlign: align,
    getHostElement: () => hostEl as any,
    setKeyWidth: (w) => state.writes.push(w),
    latchKeyWidth: () => {
      state.latched = true
    },
    unlatchKeyWidth: () => {
      state.latched = false
    },
    isKeyWidthLatched: () => state.latched,
    notifyKeyWidthChange: (width, manual) => state.events.push({ width, manual }),
  }
  return { host, state }
}

// 手工 DOM 垫片：根/手柄监听簿记 + 手柄 closest 判定（复刻 .key-resizer 命中）
const mkDom = () => {
  const mkBook = () => {
    const listeners = new Map<string, EventListener[]>()
    return {
      listeners,
      add: (type: string, fn: EventListener) => {
        const arr = listeners.get(type) ?? []
        // DOM 语义：同 (type, fn) 重复添加为 no-op
        if (!arr.includes(fn)) arr.push(fn)
        listeners.set(type, arr)
      },
      remove: (type: string, fn: EventListener) => {
        const arr = listeners.get(type) ?? []
        const i = arr.indexOf(fn)
        if (i >= 0) arr.splice(i, 1)
      },
    }
  }
  const rootBook = mkBook()
  const handleBook = mkBook()
  const handle = {
    closest: (sel: string) => (sel === '.key-resizer' ? (handle as any) : null),
    setPointerCapture: () => {},
    addEventListener: handleBook.add,
    removeEventListener: handleBook.remove,
  }
  const root = {
    addEventListener: rootBook.add,
    removeEventListener: rootBook.remove,
    // 起点 DOM 兜底：无行可测，回落 0
    querySelector: () => null,
  }
  const target = { closest: handle.closest }
  const fire = (book: ReturnType<typeof mkBook>, type: string, e: any) => {
    for (const fn of book.listeners.get(type) ?? []) fn(e as any)
  }
  return { root, target, rootBook, handleBook, fire }
}

const pointerDown = (target: any, clientX = 200) =>
  ({ target, button: 0, clientX, pointerId: 1, preventDefault() {}, stopPropagation() {} }) as any

test('拖拽调宽：实时写值（rAF 合并）、首次位移锁存、下限钳制、松手通知', () => {
  resetRaf()
  widthValue = '100px'
  const { host, state } = mkResizeHost()
  const { root, target, rootBook, handleBook, fire } = mkDom()
  const ctrl = new KeyResizeController(host)
  ctrl.attach(root as any)

  fire(rootBook, 'pointerdown', pointerDown(target))
  expect(state.userSelectSet).toBe(1)

  fire(handleBook, 'pointermove', { pointerId: 1, clientX: 150 })
  flushRaf()
  expect(state.writes).toEqual(['50px'])
  expect(state.latched).toBe(true)

  // 继续左拖越界：钳制到下限，无上限约束
  fire(handleBook, 'pointermove', { pointerId: 1, clientX: 20 })
  flushRaf()
  expect(state.writes).toEqual(['50px', `${MIN_KEY_WIDTH}px`])

  fire(handleBook, 'pointerup', { pointerId: 1 })
  expect(state.events).toEqual([{ width: MIN_KEY_WIDTH, manual: true }])
  expect(state.userSelectRemoved).toBe(1)
  expect(handleBook.listeners.get('pointermove')?.length ?? 0).toBe(0)
})

test('无位移单击：不锁存、不通知、不写值', () => {
  resetRaf()
  widthValue = '100px'
  const { host, state } = mkResizeHost()
  const { root, target, rootBook, handleBook, fire } = mkDom()
  const ctrl = new KeyResizeController(host)
  ctrl.attach(root as any)

  fire(rootBook, 'pointerdown', pointerDown(target))
  fire(handleBook, 'pointerup', { pointerId: 1 })
  expect(state.writes).toEqual([])
  expect(state.latched).toBe(false)
  expect(state.events).toEqual([])
  expect(state.userSelectRemoved).toBe(1)
})

test('松手前未落地的末帧在松手时落值并通知', () => {
  resetRaf()
  widthValue = '100px'
  const { host, state } = mkResizeHost()
  const { root, target, rootBook, handleBook, fire } = mkDom()
  const ctrl = new KeyResizeController(host)
  ctrl.attach(root as any)

  fire(rootBook, 'pointerdown', pointerDown(target))
  fire(handleBook, 'pointermove', { pointerId: 1, clientX: 190 })
  // 不 flushRaf，直接松手
  fire(handleBook, 'pointerup', { pointerId: 1 })
  expect(state.writes).toEqual(['90px'])
  expect(state.events).toEqual([{ width: 90, manual: true }])
})

test('双击手柄复位：锁存唯一出口（未锁存时幂等不通知）', () => {
  resetRaf()
  widthValue = '100px'
  const { host, state } = mkResizeHost()
  const { root, target, rootBook, handleBook, fire } = mkDom()
  const ctrl = new KeyResizeController(host)
  ctrl.attach(root as any)

  const dblclick = { target, preventDefault() {}, stopPropagation() {} } as any
  // 未锁存：双击不通知
  fire(rootBook, 'dblclick', dblclick)
  expect(state.events).toEqual([])
  expect(state.latched).toBe(false)

  // 拖出锁存
  fire(rootBook, 'pointerdown', pointerDown(target))
  fire(handleBook, 'pointermove', { pointerId: 1, clientX: 150 })
  flushRaf()
  fire(handleBook, 'pointerup', { pointerId: 1 })
  expect(state.latched).toBe(true)

  fire(rootBook, 'dblclick', dblclick)
  expect(state.latched).toBe(false)
  expect(state.events.at(-1)).toEqual({ width: null, manual: false })
})

test('right 模式不响应拖拽（无分界，手柄由 CSS 隐藏）', () => {
  resetRaf()
  widthValue = '100px'
  const { host, state } = mkResizeHost('right')
  const { root, target, rootBook, handleBook, fire } = mkDom()
  const ctrl = new KeyResizeController(host)
  ctrl.attach(root as any)

  fire(rootBook, 'pointerdown', pointerDown(target))
  expect(state.userSelectSet).toBe(0)
  expect(handleBook.listeners.get('pointermove')?.length ?? 0).toBe(0)
})

test('起点变量非 px 时 DOM 兜底：无行可测回落 0，位移仍受下限钳制', () => {
  resetRaf()
  widthValue = 'auto'
  const { host, state } = mkResizeHost()
  const { root, target, rootBook, handleBook, fire } = mkDom()
  const ctrl = new KeyResizeController(host)
  ctrl.attach(root as any)

  fire(rootBook, 'pointerdown', pointerDown(target))
  fire(handleBook, 'pointermove', { pointerId: 1, clientX: 210 })
  flushRaf()
  // 起点 0 + 位移 10 → 钳制到下限
  expect(state.writes).toEqual([`${MIN_KEY_WIDTH}px`])
  fire(handleBook, 'pointerup', { pointerId: 1 })
  expect(state.events).toEqual([{ width: MIN_KEY_WIDTH, manual: true }])
})

test('断开连接：终止会话不通知、摘除根监听，重连恢复挂载', () => {
  resetRaf()
  widthValue = '100px'
  const { host, state } = mkResizeHost()
  const { root, target, rootBook, handleBook, fire } = mkDom()
  const ctrl = new KeyResizeController(host)
  ctrl.attach(root as any)

  fire(rootBook, 'pointerdown', pointerDown(target))
  fire(handleBook, 'pointermove', { pointerId: 1, clientX: 150 })
  flushRaf()
  expect(state.latched).toBe(true)

  ctrl.hostDisconnected()
  expect(state.events).toEqual([])
  expect(rootBook.listeners.get('pointerdown')?.length ?? 0).toBe(0)

  // 重连：hostConnected 重新挂载（同 (type, fn) 不产生重复）
  ctrl.hostConnected()
  ctrl.hostConnected()
  expect(rootBook.listeners.get('pointerdown')?.length ?? 0).toBe(1)
})
