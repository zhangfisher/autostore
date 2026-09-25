import { test, expect } from 'bun:test'
import { resolveRenderMode } from '../src/utils/render-mode'

// ---------- 生效渲染模式判定（ADR-0032） ----------

test('view/click-edit 按声明值生效', () => {
  expect(resolveRenderMode('full', 'view')).toBe('full')
  expect(resolveRenderMode('lazy', 'view')).toBe('lazy')
  expect(resolveRenderMode('full', 'click-edit')).toBe('full')
  expect(resolveRenderMode('lazy', 'click-edit')).toBe('lazy')
})

test('mode=edit 恒为 full（edit+lazy 是被禁止的组合）', () => {
  expect(resolveRenderMode('full', 'edit')).toBe('full')
  expect(resolveRenderMode('lazy', 'edit')).toBe('full')
})
