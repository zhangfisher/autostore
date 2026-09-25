import type { ReactiveController } from 'lit'
import { BUILTIN_ICON_KEYS } from './builtin-icons'
import { IconsRegistry } from './icons-registry'
import type { ParsedIcon } from './icons-registry'

// 图标链宿主接口（ADR-0031 特性控制器形态）：
// 拉取配置（icon-url/icon-modify 属性）与动态 sprite 容器查询
export interface IconsHost {
  // toast 之外的状态变化通知同渠道：图标注册完成后重渲染
  requestUpdate(): void
  // 动态图标批量拉取 URL 模板：{names} 占位符替换为逗号分隔的图标名；
  // 置空禁用拉取（未知名恒回落类型图标）；变更仅影响后续新批次
  readonly iconUrl: string
  // 远程拉取的风格后缀（rounded/sharp/outline/outline-rounded/outline-sharp）：
  // 仅追加到远程请求名（home → home-outline），schema.icon 引用名不变；空 = 不处理
  readonly iconModify: string
  // 动态 sprite 容器（注入目标；渲染就绪后由 renderRoot 提供）
  getDynamicSprite(): HTMLElement | null
}

// 图标链特性控制器（ADR-0024 命中链：slot 自定义 > 内置 > icon-url 拉取）：
// 持有 IconsRegistry、slot 自定义图标提取、动态 symbol 的构造与注入
export class IconsController implements ReactiveController {
  private _host: IconsHost

  // 动态图标注册表：命中链 slot 自定义 > 内置 > icon-url 拉取（ADR-0024）
  private _registry: IconsRegistry

  // 动态 symbol 注入队列（name → 元素）：updated 时统一 append 到动态 sprite 容器。
  // 不用 unsafeSVG——lit 的 html/unsafeSVG 以 HTML 命名空间解析字符串，
  // symbol 必须经 createElementNS 构造为 SVG 命名空间元素 <use> 才能引用
  private _dynamicQueue = new Map<string, SVGSymbolElement>()

  // SVG 命名空间（createElementNS 构造 symbol 必需）
  private static SVG_NS = 'http://www.w3.org/2000/svg'

  constructor(host: IconsHost) {
    this._host = host
    this._registry = new IconsRegistry(
      () => this._host.iconUrl || null,
      (icons) => {
        // 拉取命中：构造真实 SVG 命名空间的 symbol 入队注入
        for (const icon of icons) this._queueDynamicSymbol(icon.name, this._buildSymbol(icon))
        this._host.requestUpdate()
      },
      () => this._host.iconModify,
    )
    // 内置图标为注册链"已存在"基线：slot 同名覆盖、拉取跳过（ADR-0024）
    this._registry.markRegistered(BUILTIN_ICON_KEYS)
  }

  // 图标链命中查询与攒批拉取（slot 自定义 > 内置 > icon-url 拉取，ADR-0024）
  has(name: string): boolean {
    return this._registry.has(name)
  }

  request(names: string[]): void {
    this._registry.request(names)
  }

  // 动态图标注入：动态 sprite 容器随渲染就绪后统一 append（slotchange/拉取命中入队）
  hostUpdated(): void {
    this._flushDynamicSymbols()
  }

  // slot 自定义图标提取：template[slot=icons] 的 content 中与直接子元素中的 <symbol>；
  // slotchange 动态触发，重新提取沿用同名覆盖策略（后注册者生效）
  onSlotChange(e: Event): void {
    const slot = e.currentTarget as HTMLSlotElement
    const symbols: SVGSymbolElement[] = []
    for (const node of slot.assignedNodes()) {
      if (node instanceof HTMLTemplateElement) {
        symbols.push(...node.content.querySelectorAll('symbol'))
      } else if (node instanceof Element) {
        if (node.tagName.toLowerCase() === 'symbol') symbols.push(node as SVGSymbolElement)
        else symbols.push(...node.querySelectorAll('symbol'))
      }
    }
    const names: string[] = []
    for (const symbol of symbols) {
      // id 规范化：asv- 前缀可带可不带（引用名一律不含前缀）
      let name = symbol.id || ''
      if (name.startsWith('asv-')) name = name.slice(4)
      if (!name) continue
      // 重建为 SVG 命名空间元素（HTML 命名空间的 symbol 无法被 <use> 引用）
      this._queueDynamicSymbol(name, this._rebuildSymbol(name, symbol))
      names.push(name)
    }
    this._registry.markRegistered(names)
    this._host.requestUpdate()
  }

  // 由解析数据构造 <symbol id="asv-{name}" viewBox="0 0 {w} {h}">{body}</symbol>
  private _buildSymbol(icon: ParsedIcon): SVGSymbolElement {
    const symbol = document.createElementNS(IconsController.SVG_NS, 'symbol') as SVGSymbolElement
    symbol.setAttribute('id', `asv-${icon.name}`)
    symbol.setAttribute('viewBox', `0 0 ${icon.width} ${icon.height}`)
    symbol.innerHTML = icon.body
    return symbol
  }

  // 由 slot 提取的 symbol 重建为 SVG 命名空间元素：
  // template content 经 HTML 解析器创建的 <symbol> 是 HTML 命名空间元素，
  // cloneNode 不改变命名空间，append 后 <use> 无法引用；
  // 以属性复制 + innerHTML 经 SVG 上下文重建（与拉取构造同机制，ADR-0024）
  private _rebuildSymbol(name: string, source: SVGSymbolElement): SVGSymbolElement {
    const symbol = document.createElementNS(IconsController.SVG_NS, 'symbol') as SVGSymbolElement
    for (const attr of Array.from(source.attributes)) {
      if (attr.name !== 'id') symbol.setAttribute(attr.name, attr.value)
    }
    symbol.setAttribute('id', `asv-${name}`)
    symbol.innerHTML = source.innerHTML
    return symbol
  }

  // slot 自定义图标：深拷贝入队（template content 中的元素不可直接持有）
  private _queueDynamicSymbol(name: string, symbol: SVGSymbolElement) {
    this._dynamicQueue.set(name, symbol)
  }

  // 注入队列：append 到动态 sprite 容器（容器置于内置 sprite 之前，
  // 同 id 时 <use> 按文档序命中前者，实现"自定义覆盖内置"；
  // 同名重新注入先移除旧节点，防同 id 重复累积）
  private _flushDynamicSymbols() {
    if (this._dynamicQueue.size === 0) return
    const container = this._host.getDynamicSprite()
    if (!container) return
    for (const [name, symbol] of this._dynamicQueue) {
      container.querySelector(`symbol[id="asv-${name}"]`)?.remove()
      container.appendChild(symbol)
      this._dynamicQueue.delete(name)
    }
  }
}
