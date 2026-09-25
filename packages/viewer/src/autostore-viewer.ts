import { LitElement, html, nothing } from 'lit'
import type { PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { iconHtml, iconSprite } from './features/builtin-icons'
import { IconsController } from './features/icons'
import type { IconsHost } from './features/icons'
import { MenusController } from './features/menus'
import { ToastController } from './features/toast'
import { StoreController } from './features/store'
import type { StoreHost } from './features/store'
import { TreeController } from './features/tree'
import type { TreeHost } from './features/tree'
import { LabelWidthController } from './features/label-width'
import type { LabelWidthHost } from './features/label-width'
import { Editable } from './features/editable'
import type { EditableHost } from './features/editable'
import { EditDelegateController } from './features/edit-delegate'
import type { EditDelegateHost } from './features/edit-delegate'
import { PressEditController } from './features/press-edit'
import type { PressEditHost } from './features/press-edit'
import type { WidgetRenderContext } from './widgets/types'
import { viewerStyles } from './styles'
import { formatValue } from './utils/formatValue'
import { getNodeIconKey } from './utils/getNodeIconKey'
import { toRenderable } from './utils/toRenderable'
import { getWidgetModule, getModuleByPlanKind } from './widgets/registry'
import { resolveEditorPlan } from './features/edit-plan'
import { joinPath } from './utils/joinPath'
import { resolveControlName } from './utils/control-name'
import { resolveAffix, renderAffixed } from './utils/affix'
import { resolveRenderMode } from './utils/render-mode'
import { deleteNodeValue } from './utils/deleteNodeValue'
import { filterVisibleActions, invokeAction, renderNodeActions } from './features/actions'
import type { ActionsHost } from './features/actions'
import type { TreeNode, TreeNodeType } from './types'
import type { AutoStore, AutoStoreAction, AutoStoreStateSchema } from 'autostore'

// 组件壳（ADR-0031）：属性声明 + 渲染 + 生命周期编排 + 特性控制器宿主面。
// 特性机制（图标链/store 绑定/树/列宽测量/编辑器/常驻委托/长按/toast/菜单开合）
// 均在 features/ 一特性一文件一控制器；渲染是组件本体的表意层，留在壳
@customElement('autostore-viewer')
export class AutostoreViewer extends LitElement
  implements
    ActionsHost,
    EditableHost,
    IconsHost,
    TreeHost,
    StoreHost,
    LabelWidthHost,
    PressEditHost,
    EditDelegateHost {
  // 属性声明
  @property({ type: String, attribute: 'store-id' })
  storeId: string = ''

  // 初始展开深度（小于该深度的节点默认展开，0 表示全部折叠）。
  // 默认 2（ADR-0032）：full 全渲染下仅影响视觉首屏展开态（DOM 恒全量常驻），
  // 10 级树也默认只展开 2 级；lazy 下即初始渲染深度，需要更深时显式声明
  @property({ type: Number, attribute: 'expand-depth' })
  expandDepth: number = 2

  // 是否显示子节点数量徽章
  @property({ type: Boolean, attribute: 'show-count' })
  showCount: boolean = true

  // 是否显示折叠占位符 {...} / [...]
  @property({ type: Boolean, attribute: 'show-hint' })
  showHint: boolean = true

  // 是否显示计算属性节点（默认不显示）
  @property({ type: Boolean, attribute: 'show-computed' })
  showComputed: boolean = false

  // 编辑模式（ADR-0027）：
  // view：只读；edit：叶子成员常驻编辑控件（值写回走根事件委托），容器保持双击 JSON 编辑；
  // click-edit：双击值或按住 1s 进入编辑（编辑按钮已移除，ADR-0027 修订）（默认 view）
  @property({ type: String, attribute: 'mode' })
  mode: 'view' | 'edit' | 'click-edit' = 'view'

  // 渲染模式（ADR-0032）：full（默认）= 全部节点常驻 DOM，折叠仅以 grid 行高收起并
  // inert 封锁（编辑中输入/焦点随折叠保留）；lazy = 优化开关，展开渲染、折叠自 DOM
  // 移除（未提交编辑随折叠丢弃，固有契约非缺陷）。运行时可切换，切换即生效；
  // mode=edit 恒生效 full（显式 lazy 被忽略并警告，声明值保留、切离后按字面生效）。
  // property 名不可为 render——那是 Lit 组件的渲染入口方法名
  @property({ type: String, attribute: 'render-mode' })
  renderMode: 'full' | 'lazy' = 'full'

  // 是否允许删除节点（默认不允许；根节点不可删除）
  @property({ type: Boolean, attribute: 'allow-delete' })
  allowDelete: boolean = false

  // value 对齐方式：left=标签区统一列宽、value 左对齐（默认）；right=value 右对齐
  // reflect 用于 :host([value-align='right']) 样式分支
  @property({ type: String, attribute: 'value-align', reflect: true })
  valueAlign: 'left' | 'right' = 'left'

  // 网格线显示模式（ADR-0028）：0=无（默认）；1=水平线（每同级组末行无线）；
  // 2=key/value 间垂直线（伪元素 underlay，锚定子级行 value 左缘）；3=水平+垂直
  // reflect 用于 :host([grid='1'|'2'|'3']) 样式分支；非法值无选择器匹配，天然等效 0
  @property({ type: String, reflect: true })
  grid: '0' | '1' | '2' | '3' = '0'

  // key 列背景带（grid=2/3 时生效）：垂直线伪元素铺 hover 色淡底，形成 key 列高亮带（ADR-0028 决策六）
  // reflect 用于 :host([grid-band]) 样式门控
  @property({ type: Boolean, attribute: 'grid-band', reflect: true })
  gridBand: boolean = false

  // 根级分组背景（ADR-0028 决策七）：顶层含子节点的行（分组行）常驻固定背景色；
  // reflect 用于 :host([root-bg]) 样式门控
  @property({ type: Boolean, attribute: 'root-bg', reflect: true })
  rootBg: boolean = false

  // 状态子树入口（ADR-0029）：空 = 渲染整个 state；逗号分割多个入口（splitPath 语法：
  // 点分隔、a\.b 转义、数组下标），如 entrys="orders.1,user.name"，各入口子树按声明序
  // 平铺在顶层——容器为隐式根（入口行不渲染、expandDepth 各自重计），叶子渲染单行；
  // 任一入口路径无效则整体提示态。子树节点 data-path 保持绝对路径（含入口前缀）
  @property({ type: String, attribute: 'entrys' })
  entrys: string = ''

  // 标签区（key+hint+count）统一列宽上限（px），超出部分截断显示 ...
  @property({ type: Number, attribute: 'max-key-width' })
  maxKeyWidth: number = 300

  // 是否禁用 schema 元数据显示（label 替换 key、required 红星、help 提示、choices 标签）
  // schema 默认生效；禁用仅关闭显示，编辑（widget 决策/校验/整体编辑判定）与 schema.icon 仍读取 schema
  @property({ type: Boolean, attribute: 'disable-schema' })
  disableSchema: boolean = false

  // schema.actions 节点动作的显隐档位（ADR-0030）：'0'=隐藏；'1'=悬停行时显示（默认，
  // 与内置工具的 hover 显示同机制）；'2'=常驻显示（CSS :host 门控覆盖 node-tools 的
  // visibility:hidden）。编辑中照常显示（与内置工具 copy/edit/delete 的 isEditing
  // 隐藏行为刻意分叉）；不受 disable-schema 门控（动作是节点上的功能性附着物，
  // 与 schema.icon 同待遇）。reflect 用于 :host([show-actions='2']) 样式分支
  @property({ type: String, attribute: 'show-actions', reflect: true })
  showActions: '0' | '1' | '2' = '1'

  // 动态图标批量拉取 URL 模板：{names} 占位符替换为逗号分隔的图标名；
  // 置空禁用拉取（未知名恒回落类型图标）；变更仅影响后续新批次
  @property({ type: String, attribute: 'icon-url' })
  iconUrl: string = 'https://api.iconify.design/material-symbols-light.json?icons={names}'

  // 远程拉取的风格后缀（rounded/sharp/outline/outline-rounded/outline-sharp）：
  // 仅追加到远程请求名（home → home-outline），schema.icon 引用名不变；空 = 不处理
  @property({ type: String, attribute: 'icon-modify' })
  iconModify: string = ''

  // ---- 特性控制器（ADR-0031）：一特性一文件，生命周期自治 ----

  // 图标链：注册链持有/symbol 构造与注入/slot 提取（features/icons.ts）
  private _icons = new IconsController(this)

  // 树：构建/增量更新/路径定位/entrys（features/tree.ts）
  private _tree = new TreeController(this)

  // store 绑定：注册表查找/重试/watch 订阅/state+schema 访问面（features/store.ts）
  private _store = new StoreController(this)

  // 列宽测量：探针批量测宽/rAF 合并/隐藏重试/ResizeObserver（features/label-width.ts）
  private _labelWidth = new LabelWidthController(this)

  // 行内编辑器（即时生效模式，features/editable.ts）
  private _editable = new Editable(this)

  // edit 常驻根事件委托：写回/键盘/常驻校验错误（features/edit-delegate.ts）
  private _editDelegate = new EditDelegateController(this)

  // click-edit 长按手势：按住 1s 进入编辑（features/press-edit.ts）
  private _pressEdit = new PressEditController(this)

  // dropdown 菜单开合态（ADR-0030，features/menus.ts）
  private _menus = new MenusController(this)

  // toast（ADR-0027 修订预留机制，features/toast.ts）
  private _toast = new ToastController(this)

  // ---- 宿主承载的响应式状态（各特性经宿主接口读写）----

  @state()
  private _treeNodes: TreeNode[] = []

  // entrys 无效标记：任一入口路径不存在即整体提示态，不回落全树（ADR-0029）
  @state()
  private _entryInvalid: boolean = false

  // 无效入口清单（与 _entryInvalid 同步赋值；render 提示态显示归一化路径）
  private _entryInvalidPaths: string[] = []

  // 长按触发标记：抑制本次按住松手后引发的行 click（展开/折叠）；
  // 长按特性置位/复位，树特性 toggleExpand 消费即复位（ADR-0027 修订）
  private _suppressNextClick = false

  // 全局最后可见行（.last-row，grid=1 仅末行不画底线，ADR-0028 决策二修订）
  private _lastVisibleNode: TreeNode | null = null

  // CSS样式（提取自 styles.ts）
  static styles = viewerStyles;

  constructor() {
    super()
    // 控制器注册（ADR-0031）：添加序=被依赖者在前（hostConnected/hostUpdated 按添加序触发）；
    // 树控制器无生命周期行为（构建由 store 绑定/属性变更驱动），不作控制器注册
    this.addController(this._icons)
    this.addController(this._store)
    this.addController(this._labelWidth)
    this.addController(this._editable)
    this.addController(this._editDelegate)
    this.addController(this._pressEdit)
    this.addController(this._menus)
    this.addController(this._toast)
  }

  // 根事件委托挂载（edit 常驻写回/键盘 + click-edit 长按，控件不绑 per-node 监听）
  firstUpdated() {
    this._editDelegate.attach(this.renderRoot)
    this._pressEdit.attach(this.renderRoot)
  }

  // 连接到DOM时：store 绑定（尺寸监听由列宽控制器 hostConnected 挂载，ADR-0031）
  connectedCallback() {
    super.connectedCallback()
    this._store.tryBind()
  }

  // 断开DOM时：全部清理由各控制器 hostDisconnected 承接（ADR-0031）——
  // watcher/重试/轮询句柄（store）、测量帧/重试/尺寸监听（label-width）、
  // 长按取消（press-edit）、委托监听摘除（edit-delegate/press-edit）、
  // 菜单 document 监听（menus）、toast 定时器（toast）
  disconnectedCallback() {
    super.disconnectedCallback()
  }

  // 属性变更预处理（渲染前收敛，避免一帧陈旧渲染）
  willUpdate(changedProperties: PropertyValues) {
    // edit+lazy 禁止组合警告（ADR-0032）：进入 edit 时已声明 lazy、或 edit 期间改声明
    // 为 lazy 均提示当前被忽略；声明值本身保留（设置即声明，切离 edit 后按字面生效）
    if (
      (changedProperties.has('renderMode') || changedProperties.has('mode')) &&
      this.mode === 'edit' &&
      this.renderMode === 'lazy'
    ) {
      console.warn('[autostore-viewer] mode=edit 恒为 render-mode="full"，lazy 声明暂被忽略（切离 edit 后按字面生效）')
    }
    if (changedProperties.has('mode')) {
      // 切离 edit：常驻编辑期间的值类写入曾冻结树更新（watch 跳过，防光标重置），
      // 须统一自 store 回填收敛，否则查看态渲染陈旧值；并清常驻错误
      if (changedProperties.get('mode') === 'edit' && this._store.store) {
        this._editDelegate.clearErrors()
        this._tree.syncTreeValues(this._treeNodes)
        this._labelWidth.scheduleMeasure()
      }
      // 切到 view 退出 click-edit 编辑状态（exit 内含编辑路径回填）
      if (this.mode === 'view' && this._editable.editingPath) this._editable.exit()
    }
  }

  // 属性变更回调（动态图标注入/列宽重测门控/cm-ready 轮询由各控制器 hostUpdated 承接）
  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('storeId')) {
      this._store.tryBind()
    }
    // 影响树结构的属性须重建（showCount/showHint 仅影响渲染，无需重建）；
    // entrys 变更同理重建（入口子树整体更换，展开状态不保留，ADR-0029）
    if (
      (changedProperties.has('expandDepth') ||
        changedProperties.has('showComputed') ||
        changedProperties.has('entrys')) &&
      this._store.store
    ) {
      this._tree.buildTree()
    }
    // left 模式下重算标签区列宽：仅树结构/相关属性变化时触发。
    // 测量基于全量树数据（含折叠子树）与展开态解耦，展开/折叠不重算，避免列宽跳动。
    // （门控留壳：本版本 ReactiveController.hostUpdated 不携带 changedProperties，ADR-0031）
    if (
      this.valueAlign !== 'right' &&
      this._store.store &&
      (changedProperties.has('_treeNodes') ||
        changedProperties.has('showCount') ||
        changedProperties.has('showHint') ||
        changedProperties.has('valueAlign') ||
        changedProperties.has('maxKeyWidth') ||
        changedProperties.has('disableSchema'))
    ) {
      this._labelWidth.scheduleMeasure()
    }
  }

  // store 属性访问器（绑定逻辑在 features/store.ts，ADR-0031）
  set store(value: AutoStore<any> | null) {
    this._store.setStore(value)
  }

  get store(): AutoStore<any> | null {
    return this._store.store
  }

  // 生效渲染模式（ADR-0032）：mode=edit 强制 full（声明/生效值分离），其余按声明值
  private get _effectiveRenderMode(): 'full' | 'lazy' {
    return resolveRenderMode(this.renderMode, this.mode)
  }

  // ---- TreeHost 实现（树特性控制器的宿主回调面，ADR-0031）----

  getTreeNodes(): TreeNode[] {
    return this._treeNodes
  }

  setTreeNodes(nodes: TreeNode[]): void {
    this._treeNodes = nodes
  }

  // entrys 无效提示态写入（invalid 为 @state；paths 为归一化无效清单供 render 显示）
  setEntryInvalid(invalid: boolean, paths: string[]): void {
    this._entryInvalidPaths = paths
    this._entryInvalid = invalid
  }

  // 长按编辑触发后的展开 click 抑制（消费即复位，ADR-0027 修订）
  shouldSuppressClick(): boolean {
    if (this._suppressNextClick) {
      this._suppressNextClick = false
      return true
    }
    return false
  }

  // ---- StoreHost 实现（store 绑定控制器的宿主回调面，ADR-0031）----

  // 绑定/变更后重建树
  rebuildTree(): void {
    this._tree.buildTree()
  }

  // 标签区列宽重测调度
  scheduleLabelWidthMeasure(): void {
    this._labelWidth.scheduleMeasure()
  }

  // 状态操作编排（原 watch 回调主体，订阅在 features/store.ts）：
  // entrys 子树分流（ADR-0029 决策六）：任一入口祖先/自身的变更可能改变入口
  // 语义（路径消亡/整体替换）→ 重建收敛（含无效态切换）；全部入口子树外的变更跳过
  onStateOperate(operate: any): void {
    if (this._tree.entryPaths.length > 0 && Array.isArray(operate?.path)) {
      if (this._tree.isEntryAncestorOrSelf(operate.path)) {
        this._tree.buildTree()
        this._labelWidth.scheduleMeasure()
        this.requestUpdate()
        return
      }
      if (!this._tree.isPathWithinEntry(operate.path)) return
    }
    // 即时生效：编辑节点的自写入操作已反映在控件中，跳过树重建以免重置输入光标；
    // 退出/链式切换时经 syncNode 回填（编辑期间该节点的外部更新也在退出时一并收敛）
    const editing = this._editable.editingPath
    if (
      editing &&
      Array.isArray(operate?.path) &&
      operate.path.length === editing.length &&
      operate.path.every((p: any, i: number) => p === editing[i])
    ) {
      return
    }
    // edit 常驻：叶子值类写入同样冻结树更新（控件即真相），防委托写回重置光标；
    // 结构类 operate（insert/remove/delete）照常处理
    if (this.mode === 'edit' && operate?.type === 'set' && Array.isArray(operate.path)) {
      const node = this._tree.getNodeByPath(operate.path)
      if (node && !this._tree.isExpandableType(node.type) && this._tree.isEditableNode(node)) return
    }
    if (operate.type === 'delete') {
      // 删除操作：从树中移除对应节点
      this._tree.removeTreeNode(operate.path)
    } else if (operate.type === 'insert' || operate.type === 'remove') {
      // 数组聚合操作：value 是被插入/删除的元素而非剩余数组，
      // 须从 state 读取真实值重建该容器子树
      this._tree.updateTreeNode(operate.path, this._store.getStateByPath(operate.path))
    } else {
      // 重新构建受影响的节点
      this._tree.updateTreeNode(operate.path, operate.value)
    }
    // 树结构原地变更（不换 _treeNodes 引用），须显式调度列宽重算
    this._labelWidth.scheduleMeasure()
    this.requestUpdate()
  }

  // 异步计算完成编排（订阅在 features/store.ts）：更新对应路径节点
  onComputedDone(observer: any): void {
    if (observer?.path) {
      this._tree.updateTreeNode(observer.path, observer.value)
      this._labelWidth.scheduleMeasure()
      this.requestUpdate()
    }
  }

  // ---- LabelWidthHost 实现（列宽测量控制器的宿主回调面，ADR-0031）----

  // 节点对应 schema 元数据（展示用途由调用方以 disableSchema 门控）
  getSchema(node: TreeNode): AutoStoreStateSchema | undefined {
    return this._store.getSchemaByPath(node.path)
  }

  // 可展开类型判定（对象/数组/markRaw）：委托树特性
  isExpandableType(type: TreeNodeType): boolean {
    return this._tree.isExpandableType(type)
  }

  // 可编辑节点判定：委托树特性（编辑器/常驻委托/长按共用）
  isEditableNode(node: TreeNode): boolean {
    return this._tree.isEditableNode(node)
  }

  // 离屏宽度探针（renderRoot 提供）
  getMeasureProbe(): HTMLElement | null {
    return this.renderRoot.querySelector<HTMLElement>('.measure-probe')
  }

  // 宿主元素（--viewer-indent-size 读取 + ResizeObserver 观察目标）
  getHostElement(): HTMLElement {
    return this
  }

  // 列宽写回（宿主级 CSS 变量 --viewer-key-width）
  setKeyWidth(width: string): void {
    this.style.setProperty('--viewer-key-width', width)
  }

  // ---- EditableHost 实现（编辑器控制器的宿主回调面，ADR-0031）----

  // 按路径读取 state 值
  getStateByPath(path: string[]): any {
    return this._store.getStateByPath(path)
  }

  // 获取当前绑定的 store
  getStore(): AutoStore<any> | null {
    return this._store.store
  }

  // 查找同级中当前节点之后的第一个可编辑节点
  findNextEditable(node: TreeNode): TreeNode | null {
    return this._tree.findNextEditableSibling(node)
  }

  // 按路径从树中查找节点（常驻委托/长按的 getNodeByPath 同一实现）
  getNodeByPath(path: string[]): TreeNode | null {
    return this._tree.getNodeByPath(path)
  }

  // 按路径查找节点（编辑器状态机的重定位入口，与 getNodeByPath 同实现）
  findNodeByPath(path: string[]): TreeNode | null {
    return this._tree.getNodeByPath(path)
  }

  // 按路径读取 schema 元数据
  getSchemaByPath(path: string[]): Record<string, any> | undefined {
    return this._store.getSchemaByPath(path)
  }

  // 展示词汇门控源（label/help/值装饰等展示性读取用）：禁用 schema 展示时恒为 undefined
  getDisplaySchemaByPath(path: string[]): Record<string, any> | undefined {
    return this.disableSchema ? undefined : this._store.getSchemaByPath(path)
  }

  // 退出编辑的路径回填（编辑期间该节点树更新被冻结（watch 回调跳过），退出/链式切换时经此回填）
  syncNode(path: string[]): void {
    this._tree.updateTreeNode(path, this._store.getStateByPath(path))
    this._labelWidth.scheduleMeasure()
  }

  // 编辑器输入控件查询（进入编辑时聚焦/全选，宿主 updated 后由控制器回调）
  getEditInput(): HTMLInputElement | null {
    return this.renderRoot.querySelector<HTMLInputElement>('.edit-input')
  }

  // 树序全部可用编辑控件（Enter 焦点转移，常驻委托用）；
  // full 渲染下折叠子树常驻 DOM 但被 inert 封锁（ADR-0032），跳过不可见控件
  getEditControls(): HTMLInputElement[] {
    return Array.from(
      this.renderRoot.querySelectorAll<HTMLInputElement>('.tree-node .edit-editor .edit-input:not(:disabled)'),
    ).filter((el) => !el.closest('[inert]'))
  }

  // ---- PressEditHost 实现（长按编辑控制器的宿主回调面，ADR-0031）----

  // 进入编辑（Editable 状态机）
  startEdit(node: TreeNode): void {
    this._editable.start(node)
  }

  // 展开抑制标记写入（长按触发置位/新按压复位）
  setSuppressClick(value: boolean): void {
    this._suppressNextClick = value
  }

  // ---- IconsHost 实现（图标链控制器的宿主回调面，ADR-0031）----

  // 动态 sprite 容器（注入目标；渲染就绪后由 renderRoot 提供）
  getDynamicSprite(): HTMLElement | null {
    return this.renderRoot.querySelector('.dynamic-sprite')
  }

  // ---- ActionsHost 实现（actions 渲染模块的宿主回调面，ADR-0030）----

  // 图标链命中查询与攒批拉取（slot 自定义 > 内置 > icon-url 拉取，ADR-0024）：
  // 委托图标链控制器（ADR-0031）
  hasIcon(name: string): boolean {
    return this._icons.has(name)
  }

  requestIcons(names: string[]): void {
    this._icons.request(names)
  }

  // 动作点击：先派发 'action' 自定义事件（cancelable——监听方 preventDefault 拦截则 onClick
  // 不执行；bubbles+composed 穿透 shadow 供外部直接监听；无 onClick 的动作同样派发，
  // 事件是独立通知通道），未被拦截再委托 invokeAction 纯函数（onClick 契约见 actions.ts）
  // detail.path = joinPath(node.path)：与行 data-path 同源（entrys 下含入口前缀即完整 store 路径）
  clickAction(node: TreeNode, schema: Record<string, any> | undefined, action: AutoStoreAction, event: Event): void {
    const notPrevented = this.dispatchEvent(
      new CustomEvent('action', {
        detail: { path: joinPath(node.path), value: node.value, action },
        bubbles: true,
        composed: true,
        cancelable: true,
      }),
    )
    if (notPrevented) invokeAction(node, schema, action, event, (path) => this._store.getStateByPath(path))
  }

  // dropdown 开合态读写（menuKey = 路径#声明序号）：委托菜单开合态控制器（ADR-0031）
  isMenuOpen(menuKey: string): boolean {
    return this._menus.isOpen(menuKey)
  }

  setMenuOpen(menuKey: string, open: boolean): void {
    this._menus.setOpen(menuKey, open)
  }

  // 删除节点对应的键
  private _deleteNode(e: Event, node: TreeNode) {
    e.stopPropagation()
    const parent = this._store.getStateByPath(node.path.slice(0, -1))
    if (parent) deleteNodeValue(parent, node.path[node.path.length - 1])
  }

  // toast：组件右上方显示，2s 后自动淡隐（0.3s 过渡后移除）
  // 公开（预留入口，ADR-0027 修订）：copy 移除后暂无内部消费者，供将来操作反馈调用；
  // 机制在 features/toast.ts（ADR-0031）
  _showToast(text: string) {
    this._toast.show(text)
  }

  // 节点是否处于编辑呈现：click-edit=状态机判定；edit=叶子常驻、容器以状态机判定（双击 JSON）
  private _isNodeEditing(node: TreeNode): boolean {
    if (this.mode === 'edit') {
      if (this._tree.isExpandableType(node.type)) return this._editable.isEditing(node)
      return this._tree.isEditableNode(node)
    }
    return this._editable.isEditing(node)
  }

  // 非编辑态 node-value 渲染：toView > widget 模块 toView > choices label > formatValue
  // toView 属展示词汇，受 disable-schema 门控；抛错回落默认渲染（ADR-0025/0026）
  private _renderNodeValue(node: TreeNode, schema: AutoStoreStateSchema | undefined, choiceLabel: any): any {
    if (schema && typeof schema.toView === 'function') {
      try {
        return toRenderable(schema.toView(node.value))
      } catch (e) {
        console.warn('[autostore-viewer] toView 执行失败，回落默认渲染', e)
      }
    }
    const module = getWidgetModule(schema?.widget)
    if (module?.toView) {
      try {
        const view = module.toView(this._buildViewContext(node, schema))
        if (view) return view
      } catch (e) {
        console.warn('[autostore-viewer] widget toView 执行失败，回落默认渲染', e)
      }
    }
    if (choiceLabel && typeof choiceLabel.label === 'string') return choiceLabel.label
    // 值装饰只拼 formatValue 裸值层（schema 为门控源，禁用时无装饰）
    const text = formatValue(node.value, node.type)
    const affix = resolveAffix(schema as Record<string, any> | undefined, node.value)
    if (!affix.prefix && !affix.suffix) return text
    return html`${affix.prefix ? html`<span class="asv-affix">${affix.prefix}</span>` : nothing}${text}${affix.suffix ? html`<span class="asv-affix">${affix.suffix}</span>` : nothing}`
  }

  // 查看态渲染上下文（plan 现场解析；无编辑控制面）
  private _buildViewContext(node: TreeNode, schema: AutoStoreStateSchema | undefined): WidgetRenderContext {
    const raw = (schema ?? {}) as Record<string, any>
    return {
      value: node.value,
      schema: raw,
      plan: resolveEditorPlan(node, raw, ''),
      node,
      setValue: () => {},
      onKeydown: () => {},
    }
  }

  // 编辑态渲染：edit 常驻叶子走 widget toRender（写回走根委托，ADR-0027）；
  // 其余（click-edit 全部 / edit 容器双击）走 Editable 状态机；
  // schema.toRender 优先（自定义控件自理写回）；抛错回落默认渲染
  private _renderEditingValue(node: TreeNode, schema: AutoStoreStateSchema | undefined): any {
    const error = this.mode === 'edit' ? this._editDelegate.getInlineError(node.path) : null
    if (schema && typeof schema.toRender === 'function') {
      try {
        return this._editorShell(node, toRenderable(schema.toRender(node.value)), error)
      } catch (e) {
        console.warn('[autostore-viewer] toRender 执行失败，回落默认编辑器', e)
      }
    }
    if (this.mode === 'edit' && !this._tree.isExpandableType(node.type)) {
      // 编辑链路旁路 disable-schema：widget 决策与控件 name 同 icon 待遇，对齐 click-edit 链与
      // store 特性「编辑（widget 决策/校验）与整体编辑判定始终读取」的注释宣言；
      // 上方的 schema.toRender 判断仍用过滤后 schema（ADR-0025 刻意门控）
      const rawSchema = this.getSchema(node) as Record<string, any> | undefined
      const raw = rawSchema ?? {}
      // 常驻控件跨重渲染存在，groupId 须路径派生（稳定且跨节点不串组）：
      // radio 的 name 互斥与 combobox 的 datalist id 关联都依赖它，空值则双双失效
      const plan = resolveEditorPlan(node, raw, `asv-${joinPath(node.path)}`)
      // 常驻控件的回调为 no-op：写回/键盘经根事件委托统一处理
      const ctx: WidgetRenderContext = {
        value: node.value,
        schema: raw,
        plan,
        node,
        name: resolveControlName(rawSchema, node.path),
        setValue: () => {},
        onKeydown: () => {},
      }
      const module = getWidgetModule(raw.widget) ?? getModuleByPlanKind(plan.kind)
      const content = module.toRender!(ctx)
      return this._editorShell(node, content, error)
    }
    return this._editable.renderEditor(node)
  }

  // 编辑器外壳：edit 常驻模式 blur 不退出（不绑 focusout）；其余失焦退出（Q4a）；
  // 值装饰在 shell 层统一包裹（不侵入 widget 模块），读门控源（展示词汇家族）
  private _editorShell(node: TreeNode, content: any, error: string | null): any {
    const errorPart = error ? html`<div class="edit-error">${error}</div>` : nothing
    const affix = resolveAffix(this.getDisplaySchemaByPath(node.path), node.value)
    const body = renderAffixed(affix, content)
    if (this.mode === 'edit') {
      return html`<div class="edit-editor">${body}${errorPart}</div>`
    }
    return html`<div
      class="edit-editor"
      @focusout=${(e: FocusEvent) => {
        const container = e.currentTarget as HTMLElement
        if (container.contains(e.relatedTarget as Node)) return
        this._editable.onBlur(node)
      }}
    >${body}${errorPart}</div>`
  }

  // 渲染节点；全局最后可见行（.last-row，grid=1 仅末行不画底线，ADR-0028 决策二修订）；
  // 根级分组行（.root-group，顶层且含子节点，root-bg 常驻底色，ADR-0028 决策七）；
  // depth=嵌套深度（行恒满宽、缩进经 --row-depth 在行内容上产生，hover 整行高亮）；
  // full 渲染下折叠子树照常递归渲染（grid 收起 + inert 封锁，ADR-0032），
  // lazy 维持展开渲染/折叠移除
  private _renderNode(node: TreeNode, depth = 0): any {
    const isFullRender = this._effectiveRenderMode === 'full'
    const isLast = node === this._lastVisibleNode
    // root-group 相对深度判定：任一入口顶层分组行（ADR-0029 决策四）；
    // entrys 为空时退化为绝对根顶层（path.length === 1），与既有行为一致
    const isRootGroup = node.children.length > 0 && (
      this._tree.entryPaths.length === 0
        ? node.path.length === 1
        : this._tree.entryPaths.some(
            (ep) => node.path.length === ep.length + 1 && ep.every((p, i) => node.path[i] === p),
          )
    )
    const isExpandable = this._tree.isExpandableType(node.type)
    const isEditing = this._isNodeEditing(node)
    const canEdit = this.mode !== 'view' && this._tree.isEditableNode(node)
    // 内置删除工具的渲染条件（copy/编辑按钮已移除，ADR-0027 修订）；
    // 分隔线（actions 与内置工具之间）同据此判定，allowDelete 关闭时不悬空
    const willDelete = this.allowDelete && node.path.length > 0
    // schema 展示词汇（label/required/help/choices 标签）在未禁用 schema 显示时生效；
    // 编辑态与 schema.icon 的读取始终生效（图标为节点身份，不受 disable-schema 门控）
    const rawSchema = this.getSchema(node)
    const schema = !this.disableSchema ? rawSchema : undefined
    // schema.actions 不受 disable-schema 门控（功能性附着物，与 schema.icon 同待遇，ADR-0030）；
    // showActions 三档：'0' 隐藏 / '1' 悬停显示（默认，随 node-tools 的 hover 机制）/
    // '2' 常驻显示（CSS 门控 .node-actions 覆盖父级 visibility:hidden）；
    // 编辑中照常显示（与内置工具的 isEditing 隐藏分叉）
    const actions = this.showActions !== '0' ? filterVisibleActions(rawSchema?.actions) : []
    // 包 .node-actions 容器：常驻档的 visibility 覆盖目标 + 组内紧凑间距
    const actionsPart = actions.length > 0
      ? html`<span class="node-actions">${renderNodeActions(this, node, actions, (rawSchema ?? undefined) as Record<string, any> | undefined)}</span>`
      : nothing
    // schema.icon 命中链：slot 自定义 > 内置 > icon-url 拉取（ADR-0024）；
    // 未加载/负缓存回落类型图标，缺失时攒批拉取，注册完成后经 onLoaded 重渲染替换
    const schemaIcon = typeof rawSchema?.icon === 'string' && rawSchema.icon !== '' ? rawSchema.icon : undefined
    let iconKey = getNodeIconKey(node)
    if (schemaIcon) {
      if (this._icons.has(schemaIcon)) iconKey = schemaIcon
      else this._icons.request([schemaIcon])
    }
    // label 完全替换 key 显示
    const displayKey = schema?.label ?? node.key
    const required = schema?.required === true
    // help 仅 string 生效，挂整行 title
    const help = typeof schema?.help === 'string' ? schema.help : undefined
    // choices 严格相等匹配后显示层替换为匹配项 label（匹配不到/无 label 回落原值；编辑态显示原值）
    const choices = Array.isArray(schema?.choices) ? schema!.choices : undefined
    const choiceLabel = choices?.find((c) => {
      const item = typeof c === 'object' && c !== null ? c : { value: c }
      return item.value === node.value
    })
    const displayValue = !isExpandable ? this._renderNodeValue(node, schema, choiceLabel) : nothing

    return html`
      <div
        class="tree-node ${isEditing ? 'editing' : ''} ${isLast ? 'last-row' : ''} ${isRootGroup ? 'root-group' : ''}"
        style=${depth > 0 ? `--row-depth:${depth}` : nothing}
        data-path=${joinPath(node.path)}
        title=${help ?? nothing}
        @click=${() => this._tree.toggleExpand(node)}
      >
        <div class="node-content">
          ${isExpandable ? html`
            <span class="expand-icon ${node.expanded ? 'expanded' : ''}">
              ${iconHtml('chevron')}
            </span>
          ` : html`
            <span class="expand-icon" style="visibility: hidden;">
              ${iconHtml('chevron')}
            </span>
          `}
          <span class="type-icon">${iconHtml(iconKey)}</span>
          <span class="node-label">
            <span class="node-key">${displayKey}</span>
            ${required ? html`<span class="required-mark">*</span>` : nothing}
            ${this.showHint && isExpandable && !node.expanded && !isEditing ? html`
              <span class="collapsed-hint">${node.type === 'array' ? '[...]' : '{...}'}</span>
            ` : nothing}
            ${this.showCount && node.childCount > 0 && !isEditing ? html`
              <span class="child-count">${node.childCount}</span>
            ` : nothing}
          </span>
          ${isEditing ? this._renderEditingValue(node, schema) : html`
            <span
              class="node-value"
              @dblclick=${canEdit ? () => this._editable.start(node) : nothing}
            >${displayValue}</span>
          `}
          <span class="node-tools">
            ${actionsPart}
            ${!isEditing && actions.length > 0 && willDelete ? html`<span class="tools-divider"></span>` : nothing}
            ${!isEditing && willDelete ? html`
              <span class="node-tool" title="删除" @click=${(e: Event) => { e.stopPropagation(); this._deleteNode(e, node) }}>${iconHtml('trash')}</span>
            ` : nothing}
          </span>
        </div>
      </div>
      ${isExpandable && node.children.length > 0 && (node.expanded || isFullRender) ? html`
        <div
          class="node-children ${node.expanded ? 'expanded' : 'collapsed'}"
          ?inert=${!node.expanded}
        >
          <div class="node-children-inner">
            ${node.children.map((child) => this._renderNode(child, depth + 1))}
          </div>
        </div>
      ` : nothing}
    `
  }

  // 主渲染
  render(): any {
    if (!this._store.store) {
      return html`<div class="loading">未绑定 Store</div>`
    }
    // entrys 无效提示态（ADR-0029 决策三）：列出归一化后的无效入口清单
    if (this._entryInvalid) {
      return html`<div class="loading">entrys 路径不存在: ${this._entryInvalidPaths.join(', ')}</div>`
    }
    this._lastVisibleNode = this._treeNodes.length > 0 ? this._tree.findLastVisible(this._treeNodes) : null

    return html`
      <!-- 动态图标 sprite：置于内置 sprite 之前，同 id 时 <use> 按文档序命中前者（自定义覆盖内置，ADR-0024） -->
      <svg class="dynamic-sprite" xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true"></svg>
      <!-- 内置图标 sprite：<symbol> 定义只此一份，节点处的 iconHtml() 通过 <use> 引用 -->
      ${iconSprite}
      <slot name="icons" @slotchange=${(e: Event) => this._icons.onSlotChange(e)} style="display: none;"></slot>
      <div class="tree-container">
        ${this._treeNodes.map((node) => this._renderNode(node))}
      </div>
      ${this._toast.text ? html`
        <div class="toast ${this._toast.fading ? 'fading' : ''}">${this._toast.text}</div>
      ` : nothing}
      <!-- 离屏宽度探针：复用真实样式类测量文本自然宽，见 features/label-width.ts -->
      <div class="measure-probe" aria-hidden="true"></div>
    `
  }
}

// 类型声明
declare global {
  interface HTMLElementTagNameMap {
    'autostore-viewer': AutostoreViewer
  }
}
