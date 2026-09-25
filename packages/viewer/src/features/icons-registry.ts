// 图标注册表：解析链 slot 自定义 > 内置 > icon-url 拉取（ADR-0024）
// 纯逻辑模块：URL 构造、iconify JSON 解析、攒批调度与负缓存；DOM 构造由宿主负责

// iconify JSON 响应的单图标条目
export interface IconifyIconEntry {
  body: string
  width?: number
  height?: number
}

// iconify 批量 JSON 响应（仅本功能消费的字段；aliases 忽略）
export interface IconifyResponse {
  width?: number
  height?: number
  icons?: Record<string, IconifyIconEntry>
  not_found?: string[]
}

// 构造批量拉取 URL：{names} 占位符替换为逗号连接的图标名
export function buildIconsUrl(template: string, names: string[]): string {
  return template.replace('{names}', names.join(','))
}

// 解析后的单个图标数据（宿主据此构造 <symbol>）
export interface ParsedIcon {
  name: string
  body: string
  width: number
  height: number
}

// 解析 iconify JSON：命中图标与未命中名单
// aliases 忽略——别名名不在 icons 中，随"响应未出现"一并负缓存（ADR-0024）
export function parseIconsResponse(json: any): { icons: ParsedIcon[]; notFound: string[] } {
  const pkgWidth = typeof json?.width === 'number' ? json.width : 24
  const pkgHeight = typeof json?.height === 'number' ? json.height : 24
  const icons: ParsedIcon[] = []
  for (const [name, entry] of Object.entries(json?.icons ?? {})) {
    const body = (entry as IconifyIconEntry)?.body
    if (typeof body !== 'string' || body === '') continue
    icons.push({
      name,
      body,
      width: typeof entry.width === 'number' ? entry.width : pkgWidth,
      height: typeof entry.height === 'number' ? entry.height : pkgHeight,
    })
  }
  const found = new Set(icons.map((i) => i.name))
  const notFound = Array.isArray(json?.not_found)
    ? json.not_found.filter((n: unknown): n is string => typeof n === 'string' && !found.has(n))
    : []
  return { icons, notFound }
}

// 实例级图标注册表：攒批拉取与注册状态机（缓存与 sprite 同生命周期，ADR-0024）
export class IconsRegistry {
  // 已注册（内置/slot/拉取成功）
  private registered = new Set<string>()
  // 负缓存：not_found 或请求失败，会话内不再请求
  private negative = new Set<string>()
  // 攒批待请求
  private pending = new Set<string>()
  // inflight 中
  private inflight = new Set<string>()
  private timer: ReturnType<typeof setTimeout> | null = null

  constructor(
    // 惰性读取：icon-url 属性变更仅影响后续新批次（ADR-0024）
    private getUrlTemplate: () => string | null,
    // 传解析后的图标数据，宿主负责构造 <symbol>（DOM 归宿主，本模块保持纯逻辑）
    private onLoaded: (icons: ParsedIcon[]) => void,
    // 风格后缀（icon-modify：rounded/sharp/outline/outline-rounded/outline-sharp）：
    // 仅影响远程请求名（home → home-outline），注册/负缓存/引用一律用原名
    private getModify: () => string = () => '',
    private fetchImpl: (url: string) => Promise<Response> = (url) => fetch(url),
  ) {}

  // 是否已注册
  has(name: string): boolean {
    return this.registered.has(name)
  }

  // 注册已存在的图标名（内置基线 / slot 自定义）
  // 同时清除 pending 与负缓存：slot 注册先于攒批请求到达时，撤销无谓的远程请求与失败标记
  markRegistered(names: string[]): void {
    for (const name of names) {
      this.registered.add(name)
      this.negative.delete(name)
      this.pending.delete(name)
    }
  }

  // 渲染期缺失请求：攒批微任务合并，同帧多 key 合并为一次请求
  request(names: string[]): void {
    for (const name of names) {
      if (this.registered.has(name) || this.negative.has(name) || this.pending.has(name) || this.inflight.has(name)) {
        continue
      }
      this.pending.add(name)
    }
    if (this.pending.size > 0 && this.timer === null) {
      this.timer = setTimeout(() => {
        this.timer = null
        void this.flush()
      }, 0)
    }
  }

  private async flush(): Promise<void> {
    const template = this.getUrlTemplate()
    const names = [...this.pending]
    this.pending.clear()
    // icon-url 置空 = 禁用拉取：直接丢弃（节点恒回落类型图标）
    if (!template || names.length === 0) return
    for (const name of names) this.inflight.add(name)
    // icon-modify：请求名追加风格后缀（home → home-outline），响应键按后缀映射回原名
    const modify = (this.getModify() || '').trim()
    const toRemote = (name: string) => (modify ? `${name}-${modify}` : name)
    const toLocal = (remote: string) =>
      modify && remote.endsWith(`-${modify}`) ? remote.slice(0, remote.length - modify.length - 1) : remote
    try {
      const response = await this.fetchImpl(buildIconsUrl(template, names.map(toRemote)))
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const { icons, notFound } = parseIconsResponse(await response.json())
      const loaded: ParsedIcon[] = []
      for (const icon of icons) {
        const name = toLocal(icon.name)
        this.registered.add(name)
        loaded.push({ ...icon, name })
      }
      // not_found（远程名）映射回原名后负缓存；请求了但响应未出现的名字一并负缓存
      for (const remote of notFound) {
        const name = toLocal(remote)
        if (!this.registered.has(name)) this.negative.add(name)
      }
      for (const name of names) {
        if (!this.registered.has(name)) this.negative.add(name)
      }
      if (loaded.length > 0) this.onLoaded(loaded)
    } catch {
      // 失败负缓存：会话内不重试，刷新页面重置（ADR-0024）
      for (const name of names) this.negative.add(name)
    } finally {
      for (const name of names) this.inflight.delete(name)
    }
  }
}
