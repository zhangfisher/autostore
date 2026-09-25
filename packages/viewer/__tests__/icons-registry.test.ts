import { test, expect } from 'bun:test'
import { buildIconsUrl, parseIconsResponse, IconsRegistry } from '../src/features/icons-registry'

// 等待攒批定时器与异步 flush 完成
const tick = () => new Promise((resolve) => setTimeout(resolve, 20))

test('buildIconsUrl 替换 {names} 为逗号连接', () => {
  const template = 'https://api.iconify.design/material-symbols-light.json?icons={names}'
  expect(buildIconsUrl(template, ['home', 'account'])).toBe(
    'https://api.iconify.design/material-symbols-light.json?icons=home,account',
  )
  expect(buildIconsUrl(template, [])).toBe(template.replace('{names}', ''))
})

test('parseIconsResponse 解析命中图标与尺寸链（per-icon 覆盖包级覆盖默认 24）', () => {
  const { icons, notFound } = parseIconsResponse({
    width: 24,
    height: 24,
    icons: {
      a: { body: '<path d="M0 0"/>' },
      b: { body: '<path d="M1 1"/>', width: 20, height: 20 },
    },
    not_found: ['c'],
  })
  expect(icons).toEqual([
    { name: 'a', body: '<path d="M0 0"/>', width: 24, height: 24 },
    { name: 'b', body: '<path d="M1 1"/>', width: 20, height: 20 },
  ])
  expect(notFound).toEqual(['c'])
  // 无包级尺寸时默认 24
  const fallback = parseIconsResponse({ icons: { a: { body: 'x' } } })
  expect(fallback.icons[0].width).toBe(24)
})

test('parseIconsResponse 忽略 aliases 与非法条目', () => {
  const { icons, notFound } = parseIconsResponse({
    icons: { a: { body: 'ok' }, bad: {} },
    aliases: { aliasA: { parent: 'a' } },
    not_found: ['ghost'],
  })
  expect(icons.map((i) => i.name)).toEqual(['a'])
  expect(notFound).toEqual(['ghost'])
})

test('request 攒批合并：同帧多个缺失 key 合并为一次请求', async () => {
  const calls: string[] = []
  const registry = new IconsRegistry(
    () => 'https://icons.test/?icons={names}',
    () => {},
    () => '',
    async (url) => {
      calls.push(url)
      return new Response(JSON.stringify({ icons: { home: { body: '<path/>' } } }), { status: 200 })
    },
  )
  registry.request(['home', 'star'])
  registry.request(['home', 'heart'])
  await tick()
  expect(calls).toEqual(['https://icons.test/?icons=home,star,heart'])
  expect(registry.has('home')).toBe(true)
})

test('icon-modify：请求名追加风格后缀，注册与引用用原名', async () => {
  const calls: string[] = []
  const loaded: string[] = []
  const registry = new IconsRegistry(
    () => 'https://icons.test/?icons={names}',
    (icons) => loaded.push(...icons.map((i) => i.name)),
    () => 'outline',
    async (url) => {
      calls.push(url)
      // 服务器按远程名返回键
      return new Response(JSON.stringify({ icons: { 'home-outline': { body: '<path/>' } }, not_found: ['star-outline'] }), {
        status: 200,
      })
    },
  )
  registry.request(['home', 'star'])
  await tick()
  // 请求名带后缀
  expect(calls).toEqual(['https://icons.test/?icons=home-outline,star-outline'])
  // 注册与回调均用原名
  expect(loaded).toEqual(['home'])
  expect(registry.has('home')).toBe(true)
  // star-outline not_found → 原名 star 负缓存
  expect(registry.has('star')).toBe(false)
  registry.request(['star'])
  await tick()
  expect(calls.length).toBe(1)
})

test('not_found 负缓存：会话内不再请求', async () => {
  const calls: string[] = []
  const registry = new IconsRegistry(
    () => 'https://icons.test/?icons={names}',
    () => {},
    () => '',
    async (url) => {
      calls.push(url)
      return new Response(JSON.stringify({ icons: {}, not_found: ['ghost'] }), { status: 200 })
    },
  )
  registry.request(['ghost'])
  await tick()
  registry.request(['ghost'])
  await tick()
  expect(calls.length).toBe(1)
})

test('请求失败同样负缓存', async () => {
  const calls: string[] = []
  const registry = new IconsRegistry(
    () => 'https://icons.test/?icons={names}',
    () => {},
    () => '',
    async (url) => {
      calls.push(url)
      throw new Error('network')
    },
  )
  registry.request(['x'])
  await tick()
  registry.request(['x'])
  await tick()
  expect(calls.length).toBe(1)
})

test('icon-url 置空禁用拉取', async () => {
  const calls: string[] = []
  const registry = new IconsRegistry(
    () => null,
    () => {},
    () => '',
    async (url) => {
      calls.push(url)
      return new Response('{}', { status: 200 })
    },
  )
  registry.request(['home'])
  await tick()
  expect(calls.length).toBe(0)
})

test('已注册与 inflight 的 key 不重复请求', async () => {
  const calls: string[] = []
  // 挂起响应以维持 inflight 状态
  let release: (() => void) | null = null
  const gate = new Promise<void>((r) => (release = r))
  const registry = new IconsRegistry(
    () => 'https://icons.test/?icons={names}',
    () => {},
    () => '',
    async (url) => {
      calls.push(url)
      await gate
      return new Response(JSON.stringify({ icons: { home: { body: '<path/>' } } }), { status: 200 })
    },
  )
  registry.markRegistered(['builtin'])
  registry.request(['builtin', 'home'])
  await tick()
  registry.request(['home'])
  await tick()
  expect(calls).toEqual(['https://icons.test/?icons=home'])
  release?.()
})

test('markRegistered 撤销攒批请求与负缓存（slot 注册优先于远程）', async () => {
  const calls: string[] = []
  const registry = new IconsRegistry(
    () => 'https://icons.test/?icons={names}',
    () => {},
    () => '',
    async (url) => {
      calls.push(url)
      return new Response(JSON.stringify({ icons: {}, not_found: ['custom'] }), { status: 200 })
    },
  )
  // 渲染期先发起缺失请求（攒批中），slot 随后注册同名图标
  registry.request(['custom'])
  registry.markRegistered(['custom'])
  await tick()
  // 攒批已撤销：不发请求；负缓存被清除，has 命中注册
  expect(calls.length).toBe(0)
  expect(registry.has('custom')).toBe(true)
})
