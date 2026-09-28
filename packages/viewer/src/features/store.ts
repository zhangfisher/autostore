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
  // 配置面板模式（ADR-0034）：cm-ready 轮询条件组成（无条件参与）+ configManager 键集合订阅开关
  readonly onlyConfigurable: boolean
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

  // configManager 键集合订阅（ADR-0034）：新配置项注册/注销触发整树重建
  private _configWatcher: any = null

  // 他 store 归属订阅（ADR-0034 扩展）：配置面板渲染跨 store 的配置项，其值变更
  // 不流经绑定 store 的 watch，须逐归属 store 补订一份（unbind 时一并解订）
  private _ownerWatchers: any[] = []

  // configManager 缺失警告已发标志（ADR-0034 决策十四：仅调试通道，一次为限）
  private _cmMissingWarned = false

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
  // 折叠/整体编辑判定在 build 期读取 schema，须重建树；列宽一并重测。
  // 配置面板模式（ADR-0034）无条件参与轮询——configurabled/分组信息全在其上
  hostUpdated(): void {
    if (
      (!this._host.disableSchema || this._host.mode !== 'view' || this._host.onlyConfigurable) &&
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
        } else if (this._cmReadyRetries >= 20 && this._host.onlyConfigurable && !this._cmMissingWarned) {
          // 轮询耗尽仍未就绪（ADR-0034 决策十四）：空白无视觉提示，仅留调试通道一条
          this._cmMissingWarned = true
          console.warn('[autostore-viewer] only-configurable 依赖 store 的配置管理（configManager），当前 Store 未启用')
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

    // 配置面板模式（ADR-0034 决策六）：订阅 configManager 键集合——state 直接子键
    // （key 是带 configKey 前缀的点分单段字符串）出现/消失（新配置项注册/注销）触发
    // 整树重建；schema 内部字段与值变化（path ≥ 2 段）不触发——值变化走上方主 store
    // watch 增量链路，与此分层。开关切换时宿主重调 watch()（内部先解订）
    if (this._host.onlyConfigurable && (this.store as any).configManager) {
      this._configWatcher = (this.store as any).configManager.watch('*', (operate: any) => {
        if (Array.isArray(operate?.path) && operate.path.length === 1) {
          this._host.rebuildTree()
          this._host.scheduleLabelWidthMeasure()
        }
      })
    }

    // 配置面板模式（ADR-0034 扩展）：渲染源含他 store 的配置项，其值变更只触发 owning
    // store 的 watch，不会流经绑定 store——逐归属 store 补订一份。回调给到的 operate.path
    // 就是 owning store 的原生未前缀路径，与本树路径同形，直接复用同一条增量编排。
    // 同一 store 只订一次；绑定 store 自己的项已在上方订阅，此处跳过。
    this._ownerWatchers = []
    if (this._host.onlyConfigurable) {
      const owners = (this.store as any).configManager?.owners
      if (owners) {
        const seen = new Set<any>()
        for (const key in owners) {
          const owner = owners[key]
          if (!owner || owner === this.store || seen.has(owner)) continue
          seen.add(owner)
          this._ownerWatchers.push(
            owner.watch('*', (operate: any) => this._host.onStateOperate(operate)),
          )
        }
      }
    }
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
    if (this._configWatcher) {
      this._configWatcher.off?.()
      this._configWatcher = null
    }
    if (this._ownerWatchers.length) {
      for (const w of this._ownerWatchers) w?.off?.()
      this._ownerWatchers = []
    }
  }

  // 跨 store 归属解析（ADR-0034 扩展：配置面板的渲染源是共享 ConfigManager 的全部
  // 配置项，而非绑定 store 自己的 configurabled）。从整路径向根收缩做最长前缀匹配——
  // 顶层配置项命中自身；其值结构子级（如 dns.0 / proxy.bypass，自身非 configurable）
  // 命中最近的已注册祖先容器。非配置面板模式/无归属信息时恒回落绑定 store，
  // 整树渲染语义不变。
  resolveStore(path: string[]): AutoStore<any> | null {
    const store = this.store
    if (!store || !this._host.onlyConfigurable || path.length === 0) return store
    const owners = (store as any).configManager?.owners
    if (!owners) return store
    for (let i = path.length; i >= 1; i--) {
      const owner = owners[joinPath(path.slice(0, i))]
      if (owner) return owner
    }
    return store
  }

  // 按路径取父容器（写回/删除/动作 update 的统一入口）：先按整路径解析归属 store 再
  // 走到父级——顶层项的父即归属 store 的 state 根（跨 store 项不得写回绑定 store，
  // 否则取到 undefined 被 if(!parent) 静默丢弃）
  getParent(path: string[]): any {
    const store = this.resolveStore(path)
    if (!store) return undefined
    let obj: any = store.state
    for (let i = 0; i < path.length - 1; i++) obj = obj?.[path[i]]
    return obj
  }

  // 按路径读取 state 值（归属解析同 resolveStore：配置面板下可读到他 store 的项）
  getStateByPath(path: string[]): any {
    const store = this.resolveStore(path)
    let obj: any = store?.state
    for (const p of path) obj = obj?.[p]
    return obj
  }

  // 按路径读取 schema 元数据（对齐 ConfigManager.add 的 key 拼法：仅显式 options.configKey 参与前缀，不回落 id）
  // 独立于 disable-schema 显示开关：编辑（widget 决策/校验）与整体编辑判定始终读取
  // 配置面板下 configKey 须取归属 store 的——各 store 的 configKey 不同，沿用绑定 store 的会查空
  getSchemaByPath(path: string[]): AutoStoreStateSchema | undefined {
    const configManager = (this.store as any)?.configManager
    if (!configManager) return undefined
    const owner = this.resolveStore(path)
    const configKey = owner?.options?.configKey
    const fullKey = (configKey ? `${configKey}.` : '') + joinPath(path)
    return configManager.state[fullKey] as AutoStoreStateSchema | undefined
  }
}
