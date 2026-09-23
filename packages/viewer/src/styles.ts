import { css } from 'lit'

// autostore-viewer 组件样式
export const viewerStyles = css`
  :host {
    --viewer-icon-size: 16px;
    --viewer-font-size: 1em;
    --viewer-bg: #ffffff;
    --viewer-text: #333333;
    --viewer-border: #e5e7eb;
    --viewer-hover-bg: #f3f4f6;
    --viewer-badge-bg: #e5e7eb;
    --viewer-badge-text: #6b7280;
    --viewer-indent-size: 20px;
    --viewer-required-color: #dc2626;

    display: block;
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
      --viewer-border: #636363;
      --viewer-hover-bg: #374151;
      --viewer-badge-bg: #4b5563;
      --viewer-badge-text: #d1d5db;
    }
  }

  .tree-node {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.15s ease;
    min-height: 32px;
  }

  .tree-node:hover {
    background: var(--viewer-hover-bg);
  }

  .node-content {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
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
    padding: 4px;
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

  .node-children .tree-node {
    padding-left: 20px;
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

  @media (prefers-reduced-motion: reduce) {
    .expand-icon {
      transition: none;
    }
    .node-children {
      transition: none;
    }
  }
`
