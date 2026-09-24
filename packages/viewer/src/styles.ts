import { css } from 'lit'

// autostore-viewer 组件样式
export const viewerStyles = css`
  :host {
    --viewer-icon-size: 24px;
    --viewer-font-size: 1em;
    --viewer-bg: #ffffff;
    --viewer-text: #333333;
    --viewer-border: #e5e7eb;
    --viewer-hover-bg: #f3f4f6;
    --viewer-badge-bg: #e5e7eb;
    --viewer-badge-text: #6b7280;
    --viewer-indent-size: 20px;
    --viewer-required-color: #dc2626;
    /* grid-band key 列背景带底色（暗色模式 hover-bg 覆盖时 color-mix 结果自动跟随） */
    --viewer-grid-band-bg: color-mix(in srgb, var(--viewer-hover-bg) 20%, transparent);
    /* root-bg 根级分组行常驻底色（暗色模式同上自动跟随） */
    --viewer-root-bg: color-mix(in srgb, var(--viewer-hover-bg) 60%, transparent);

    display: block;
    position: relative;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: var(--viewer-font-size);
    color: var(--viewer-text);
    background: var(--viewer-bg);
    border: 1px solid var(--viewer-border);
    border-radius: 8px;
    overflow: hidden;
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --viewer-bg: #1f2937;
      --viewer-text: #f9fafb;
      --viewer-border: #f3f3f3;
      --viewer-hover-bg: #f8f8f8;
      --viewer-badge-bg: #4b5563;
      --viewer-badge-text: #d1d5db;
    }
  }

  .tree-node {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    cursor: pointer;
    transition: background-color 0.15s ease;
    min-height: 32px;
  }

  .tree-node:hover {
    background: color-mix(in srgb, var(--viewer-hover-bg) 50%, transparent);
  }

  .node-content {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
    /* 行恒满宽（hover 整行高亮），缩进在行内容上产生：depth × 步进（indent-size - 8px，
       行内左 padding 8px 由 .tree-node 统一提供；grid=2 垂直线 calc 的 20px 锚定依赖此几何） */
    padding-left: calc(var(--row-depth, 0) * (var(--viewer-indent-size) - 8px));
  }

  .expand-icon {
    width: var(--viewer-icon-size);
    height: var(--viewer-icon-size);
    flex-shrink: 0;
    transition: transform 0.2s ease;
    margin-right: 4px;
  }

  .expand-icon.expanded {
    transform: rotate(90deg);
  }

  .type-icon {
    width: var(--viewer-icon-size);
    height: var(--viewer-icon-size);
    flex-shrink: 0;
    margin-right: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .expand-icon svg,
  .type-icon svg {
    width: 100%;
    height: 100%;
  }

  /* 标签区：key + 折叠提示 + 数量徽章；left 模式下吃统一列宽（由 JS 测量写入 --viewer-key-width） */
  .node-label {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin-right: 6px;
    overflow: hidden;
    width: var(--viewer-key-width, auto);
  }

  .node-key {
    font-weight: 500;
    margin-right: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /* 作为 .node-label 的 flex 子项，允许收缩以吸收列宽截断 */
    min-width: 0;
  }

  /* 徽章不参与截断，超限时只截 key */
  .collapsed-hint,
  .child-count {
    flex-shrink: 0;
  }

  /* schema required 标记：label 后红色星号，列宽截断时永不被切 */
  .required-mark {
    color: var(--viewer-required-color);
    flex-shrink: 0;
    margin-left: 2px;
    margin-right: 4px;
    font-weight: 500;
  }

  /* right 模式：标签区内容自适应、value 右对齐（CSS 覆盖，JS 无需清理列宽变量） */
  :host([value-align='right']) .node-label {
    width: auto;
  }

  :host([value-align='right']) .node-value {
    text-align: right;
  }

  .child-count {
    background: var(--viewer-badge-bg);
    color: var(--viewer-badge-text);
    font-size: 0.75em;
    padding: 1px 6px;
    border-radius: 10px;
    margin-right: 6px;
    white-space: nowrap;
    font-weight: 500;
  }

  .collapsed-hint {
    color: #9ca3af;
    font-family: ui-monospace, monospace;
    font-size: 0.9em;
    margin-right: 6px;
    white-space: nowrap;
  }

  @media (prefers-color-scheme: dark) {
    .collapsed-hint {
      color: #6b7280;
    }
  }

  .node-value {
    color: #6b7280;
    font-family: ui-monospace, monospace;
    font-size: 0.9em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
    min-width: 0;
    /* 空值时保留可交互高度：node-value 是双击进入编辑的触发区，高度为 0 将无法响应 */
    min-height: 1em;
  }

  @media (prefers-color-scheme: dark) {
    .node-value {
      color: #9ca3af;
    }
  }

  /* 节点工具区：hover 时显示，编辑时常驻 */
  .node-tools {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    margin-left: 4px;
    visibility: hidden;
  }

  .tree-node:hover .node-tools,
  .tree-node.editing .node-tools {
    visibility: visible;
  }

  .node-tool {
    width: var(--viewer-icon-size);
    height: var(--viewer-icon-size);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 4px;
    color: var(--viewer-badge-text);
  }

  .node-tool:hover {
    background: var(--viewer-hover-bg);
    color: var(--viewer-text);
  }

  .node-tool svg {
    width: 100%;
    height: 100%;
  }

  /* 行内编辑输入框 */
  .edit-input {
    font: inherit;
    font-family: ui-monospace, monospace;
    font-size: 0.9em;
    border: 1px solid var(--viewer-border);
    border-radius: 4px;
    padding: 0 4px;
    min-width: 0;
    flex-grow: 1;
    background: var(--viewer-bg);
    color: var(--viewer-text);    
    outline: none;
    padding: 6px;
  }

  .edit-input:focus {
    border-color: var(--viewer-badge-text);
  }

  input[type='checkbox'].edit-input {
    flex-grow: 0;
    width: 14px;
    height: 14px;
    cursor: pointer;
  }

  /* 编辑态勾选框行：编辑容器为纵向 flex，勾选框与文案横排成行（点文案亦可切换勾选） */
  .edit-checkbox {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    min-height: 26px;
    cursor: pointer;
  }

  /* 勾选框旁文案：schema checkLabel / choices 当前项 label / switchValues 当前值 */
  .check-label {
    margin-left: 6px;
    white-space: nowrap;
  }

  /* 编辑器容器：所有编辑控件的公共宿主（统一 focusout 失焦判定）；
     纵向排列控件与错误条（错误显示在 node-value 内的控件下方） */
  .edit-editor {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-grow: 1;
    min-width: 0;
  }

  /* 多行编辑器：整体编辑 JSON 与 widget=textarea */
  .edit-textarea {
    min-height: 72px;
    resize: vertical;
    line-height: 1.4;
  }

  /* radio 组：行内平铺可换行；纵排容器中不随 stretch 拉满宽 */
  .edit-radio-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px 12px;
    flex-grow: 1;
    min-width: 0;
    align-self: flex-start;
  }

  .edit-radio-item {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    white-space: nowrap;
  }

  .edit-radio {
    cursor: pointer;
  }

  /* 校验错误：控件下方红色文字，无背景 */
  .edit-error {
    color: var(--viewer-required-color);
    font-size: 0.85em;
    padding-top: 2px;
    cursor: default;
    user-select: text;
  }

  /* widget=color 默认查看渲染：相框结构（白底 + 1px 边框 + 3px 内边距，ADR-0025）——
     颜色块由 ::before 铺满 content 区域，色值经 --swatch-color 内联传入 */
  .to-view-color {
    display: inline-block;
    width: 3em;
    height: 1em;
    border: 1px solid var(--viewer-border);
    border-radius: 5px;
    background: white;
    padding: 3px;
    vertical-align: middle;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  }

  .to-view-color::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: var(--swatch-color);
  }

  /* widget=color 编辑态：色板与 hex 文本横排（编辑容器为纵向 flex） */
  .edit-color {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    gap: 6px;
    min-height: 26px;
    cursor: pointer;
  }

  .edit-color input[type='color'].edit-input {
    flex-grow: 0;
    width: 36px;
    height: 26px;
    padding: 2px;
    cursor: pointer;
  }

  .color-hex {
    font-family: ui-monospace, monospace;
    font-size: 0.9em;
    white-space: nowrap;
  }

  /* widget=checkbox 默认查看渲染：只读勾选框——包裹层 ::before 透明遮罩命中自身而非 input，
     点击不切换勾选且保持正常视觉（不用 disabled：不派发鼠标事件致双击进编辑失效，部分主题下灰化） */
  .to-view-checkbox {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .to-view-checkbox::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  .node-children {
    overflow: hidden;
    transition: max-height 0.2s ease-out;
  }

  .node-children.collapsed {
    max-height: 0 !important;
  }

  .node-children.expanded {
    max-height: none;
  }

  /* —— 网格线（ADR-0028）：grid 属性经 :host attr 门控，非法值无选择器匹配天然等效 0 —— */

  /* grid=2 垂直线的层叠宿主：建立层叠上下文，使 z-index:-1 的伪元素线
     画在行内容（文字/控件/hover 高亮）之下——underlay 不覆盖 */
  .tree-container {
    position: relative;
    z-index: 0;
  }

  /* grid=1/3 水平线：仅整棵树最后可见行（.last-row，渲染期沿展开链下钻判定）无线，
     展开容器的末项后随子树行，照画底线 */
  :host([grid='1']) .tree-node:not(.last-row),
  :host([grid='3']) .tree-node:not(.last-row) {
    border-bottom: 1px solid var(--viewer-border);
  }

  /* grid=2/3 key/value 垂直分隔线：宽度自子级行左缘铺至 value 左缘左移（锚定子级行：
     子级 padding-left 20px + 展开图标+4 + 类型图标+6 + 标签列-1em，与 value 文本保持
     间距，布局常量与 .tree-node/.node-label 联动，改动须同步）；
     排除 right 对齐：该模式不测量列宽，calc 无长度可用，且 width 失效后
     shrink-to-fit 的 1px 边框会贴左残留（ADR-0028 决策五的技术修正） */
  :host(:is([grid='2'],[grid='3']):not([value-align='right'])) .tree-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: calc(
      20px + var(--viewer-icon-size) + 4px + var(--viewer-icon-size) + 6px +
      var(--viewer-key-width, 0px) - 1em
    );
    border-right: 1px solid var(--viewer-border);
    z-index: -1;
  }

  /* grid-band：key 列背景带——垂直线伪元素铺底色（underlay 同层叠，不覆盖内容；
     仅 grid=2/3 有伪元素，grid=0/1 时本规则无载体天然失效） */
  :host([grid-band]:is([grid='2'],[grid='3']):not([value-align='right'])) .tree-container::before {
    background-color: var(--viewer-grid-band-bg);
  }

  /* root-bg：根级分组行常驻底色（.root-group 渲染期标注，顶层且含子节点）；
     :not(:hover) 让出 hover 态——本规则特异性高于 .tree-node:hover，不排除会压掉交互反馈 */
  :host([root-bg]) .tree-node.root-group:not(:hover) {
    background-color: var(--viewer-root-bg);
  }

  /* 离屏宽度探针：复用真实样式类测文本自然宽，inline-block 才有布局盒 */
  .measure-probe {
    position: absolute;
    visibility: hidden;
    pointer-events: none;
    top: 0;
    left: 0;
    white-space: nowrap;
  }

  .measure-probe span {
    display: inline-block;
    width: auto;
  }

  .loading {
    padding: 16px;
    text-align: center;
    color: var(--viewer-badge-text);
  }

  /* toast：组件右上方浮层，2s 后经 .fading 淡隐（transition opacity） */
  .toast {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 10;
    padding: 4px 12px;
    border-radius: 6px;
    background: #1f2937;
    color: #f9fafb;
    font-size: 0.85em;
    pointer-events: none;
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  .toast.fading {
    opacity: 0;
  }

  @media (prefers-color-scheme: dark) {
    .toast {
      background: #e5e7eb;
      color: #1f2937;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .toast {
      transition: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .expand-icon {
      transition: none;
    }
    .node-children {
      transition: none;
    }
  }
`
