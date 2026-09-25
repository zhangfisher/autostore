import type { ReactiveController } from 'lit'

// 菜单开合态宿主接口（ADR-0031 特性控制器形态）
export interface MenusHost {
  // 开合态变化时通知重渲染
  requestUpdate(): void
}

// dropdown 菜单开合态控制器（ADR-0030）：
// menuKey = 路径#声明序号；一个 document 监听器服务全部开着的菜单，
// 全关时移除（生命周期与开合态严格同步）
export class MenusController implements ReactiveController {
  // 开着的菜单键集合
  private _open = new Set<string>()

  // document 级关闭监听（点外部关闭全部菜单）
  private _docClose: (() => void) | null = null

  private _host: MenusHost

  constructor(host: MenusHost) {
    this._host = host
  }

  // 组件断开时：关闭开着的菜单并摘除 document 监听
  hostDisconnected(): void {
    if (this._docClose) {
      document.removeEventListener('click', this._docClose)
      this._docClose = null
    }
    this._open.clear()
  }

  isOpen(menuKey: string): boolean {
    return this._open.has(menuKey)
  }

  // 开合态写入：开时挂 document 监听（点外部关闭），全关时移除
  setOpen(menuKey: string, open: boolean): void {
    if (open === this._open.has(menuKey)) return
    if (open) {
      this._open.add(menuKey)
      if (!this._docClose) {
        this._docClose = () => {
          this._open.clear()
          this._docClose = null
          this._host.requestUpdate()
        }
        document.addEventListener('click', this._docClose)
      }
    } else {
      this._open.delete(menuKey)
      if (this._open.size === 0 && this._docClose) {
        document.removeEventListener('click', this._docClose)
        this._docClose = null
      }
    }
    this._host.requestUpdate()
  }
}
