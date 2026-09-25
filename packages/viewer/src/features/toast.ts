import type { ReactiveController } from 'lit'

// toast 宿主接口（ADR-0031 特性控制器形态）
export interface ToastHost {
  // toast 状态变化时通知重渲染
  requestUpdate(): void
}

// toast 特性控制器：组件右上方显示提示，2s 后自动淡隐（0.3s 过渡后移除）
// 机制保留（ADR-0027 修订）：copy 功能已移除，暂无内部消费者，
// 预留将来「已删除」等操作反馈；宿主的 _showToast 即其入口
export class ToastController implements ReactiveController {
  // toast 文案与淡隐态（2s 自动淡隐，见 show）
  text: string | null = null
  fading = false

  // toast 定时句柄（重复触发与组件断开时清理）
  private _timers: any[] = []

  private _host: ToastHost

  constructor(host: ToastHost) {
    this._host = host
  }

  // 组件断开时清理定时句柄
  hostDisconnected(): void {
    this._clearTimers()
  }

  // 显示 toast：2s 后自动淡隐（0.3s 过渡后移除）
  show(text: string): void {
    this._clearTimers()
    this.text = text
    this.fading = false
    this._timers = [
      setTimeout(() => {
        this.fading = true
        this._host.requestUpdate()
      }, 1500),
      setTimeout(() => {
        this.text = null
        this.fading = false
        this._host.requestUpdate()
      }, 1600),
    ]
    this._host.requestUpdate()
  }

  private _clearTimers(): void {
    this._timers.forEach(clearTimeout)
    this._timers = []
  }
}
