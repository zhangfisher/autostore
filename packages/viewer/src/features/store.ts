import type { ReactiveController } from 'lit'
import type { AutoStore, AutoStoreStateSchema } from 'autostore'
import { joinPath } from '../utils/joinPath'

// store 绑定宿主接口（ADR-0031 特性控制器形态）：拉取配置与绑定后的跨特性编排
export interface StoreHost {
  requestUpdate(): void
  // store-id 属性（全局注册表查找键）
  readonly storeId: string
  // 是否禁用 schema 元数据显示（cm-ready 轮询条件组成）
  readonly disableSchema: boolean
  // 编辑模式（cm-ready 轮询条件组成）
  readonly mode: 'view' | 'edit' | 'click-edit'
  // value 对齐方式（cm-ready 就绪后的列宽重测门控）
  readonly valueAlign: 'left' | 'right'
  // 绑定/变更后重建树（树特性入口）
  rebuildTree(): void
  // 标签区列宽重测调度（列宽特性入口）
  scheduleLabelWidthMeasure(): void
  // 状态操作编排（watch 回调整体转交宿主：entrys 三路分流 + 编辑冻结判定 + 树增量更新）
  onStateOperate(operate: any): void
  // 异步计算完成编排（observer 完成事件转交宿主：更新对应路径节点）
  onComputedDone(observer: any): void
}

// store 绑定特性控制器：WeakRef 注册表查找、绑定重试、watch/observer 订阅与
// configManager 就绪轮询，及 state/schema 读取访问面（ADR-0031 自宿主提炼）
export class StoreController implements ReactiveController {
  // 当前绑定的 store（null=未绑定，宿主 render 提示态）
  store: AutoStore<any> | null = null

  // 用于保存store watcher
  private _storeWatcher: any = null

  // 用于保存observer事件订阅（异步计算完成通知）
  private _observerWatcher: any = null

  // store-id 绑定重试（store 可能晚于组件挂载创建）
  private _bindRetryCount = 0
  private _bindRetryTimer: any = null

  // configManager 就绪轮询（默认 configManager:true 走异步 import 创建，晚于同步首渲染）
  private _cmReadyTimer: any = null
  private _cmReadyRetries = 0

  private _host: StoreHost

  constructor(host: StoreHost) {
    this._host = host
  }

  // 断开DOM时：解绑订阅、清理重试与轮询句柄并复位计数
  hostDisconnected(): void {
    this.unbind()
    if (this._bindRetryTimer) {
      clearTimeout(this._bindRetryTimer)
      this._bindRetryTimer = null
    }
    if (this._cmReadyTimer) {
      clearTimeout(this._cmReadyTimer)
      this._cmReadyTimer = null
    }
    this._bindRetryCount = 0
    this._cmReadyRetries = 0
  }

  // 默认 configManager:true 经异步 import 创建并注册 schema，晚于同步首渲染，
  // 须限时轮询就绪后处理：label 替换经重渲染生效（render 期读取）；
  // 折叠/整体编辑判定在 build 期读取 schema，须重建树；列宽一并重测
  hostUpdated(): void {
    if (
      (!this._host.disableSchema || this._host.mode !== 'view') &&
      this.store &&
      !(this.store as any).configManager &&
      this._cmReadyRetries < 20
    ) {
      this._cmReadyRetries++
      this._cmReadyTimer = setTimeout(() => {
        this._cmReadyTimer = null
        this._host.requestUpdate()
        if ((this.store as any)?.configManager) {
          this._cmReadyRetries = 0
          this._host.rebuildTree()
          if (this._host.valueAlign !== 'right') this._host.scheduleLabelWidthMeasure()
        }
      }, 100)
    }
  }

  // 尝试绑定store
  tryBind(): void {
    // 清理之前的watcher
    this.unbind()

    // 如果有store属性，直接使用
    if (this.store) {
      this._host.rebuildTree()
      this.watch()
      return
    }

    // 如果有store-id属性，从全局注册表查找
    if (this._host.storeId) {
      const instances = (globalThis as any).__AUTOSTORE_INSTANCES__
      if (Array.isArray(instances)) {
        for (const weakRef of instances) {
          const store = weakRef.deref?.()
          if (store && store.options?.id === this._host.storeId) {
            this.store = store
            this._host.rebuildTree()
            this.watch()
            return
          }
        }
      }
      // store 可能晚于组件挂载创建，延迟重试若干次
      if (this._bindRetryCount < 10) {
        this._bindRetryCount++
        if (this._bindRetryTimer) clearTimeout(this._bindRetryTimer)
        this._bindRetryTimer = setTimeout(() => {
          this._bindRetryTimer = null
          this.tryBind()
        }, 500)
        return
      }
      console.warn(`autostore-viewer: Store with id "${this._host.storeId}" not found`)
    }
  }

  // 绑定store属性（宿主 store 属性访问器转交）
  setStore(value: AutoStore<any> | null): void {
    const oldValue = this.store
    this.store = value
    if (value !== oldValue) {
      this.unbind()
      if (value) {
        this._host.rebuildTree()
        this.watch()
      }
      this._host.requestUpdate()
    }
  }

  // 监听store变化（回调整体转交宿主编排，见 StoreHost.onStateOperate/onComputedDone）
  watch(): void {
    if (!this.store) return

    // 移除之前的watcher
    this.unbind()

    // 监听所有状态变化
    this._storeWatcher = this.store.watch('*', (operate: any) => {
      this._host.onStateOperate(operate)
    })

    // 异步计算结果经 peep 静默回写，watch('*') 收不到通知，须订阅 observer 完成事件
    this._observerWatcher = (this.store as any).on?.('observer/*/done', (args: any) => {
      this._host.onComputedDone(args?.observer ?? args)
    })
  }

  // 解绑store watcher
  unbind(): void {
    if (this._storeWatcher) {
      this._storeWatcher.off?.()
      this._storeWatcher = null
    }
    if (this._observerWatcher) {
      this._observerWatcher.off?.()
      this._observerWatcher = null
    }
  }

  // 按路径读取 state 值
  getStateByPath(path: string[]): any {
    let obj: any = this.store?.state
    for (const p of path) obj = obj?.[p]
    return obj
  }

  // 按路径读取 schema 元数据（对齐 ConfigManager.add 的 key 拼法：仅显式 options.configKey 参与前缀，不回落 id）
  // 独立于 disable-schema 显示开关：编辑（widget 决策/校验）与整体编辑判定始终读取
  getSchemaByPath(path: string[]): AutoStoreStateSchema | undefined {
    const configManager = (this.store as any)?.configManager
    if (!configManager) return undefined
    const configKey = this.store!.options?.configKey
    const fullKey = (configKey ? `${configKey}.` : '') + joinPath(path)
    return configManager.state[fullKey] as AutoStoreStateSchema | undefined
  }
}
