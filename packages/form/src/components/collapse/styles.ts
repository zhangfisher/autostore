import { scrollbar } from '@/styles/utils';
import { css } from 'lit';

export default css`
    :host {
        display: flex;
        position: relative;
        flex-direction: column; /* 组件只使用column布局 */
        box-sizing: border-box;
        width: 100%;
        --auto-icon-size: 1.5em;
    }

    :host([fit]) {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
    }
    .header {
        display: flex;
        align-items: center;
        padding: 10px 15px;
        gap: 0.5em;
        cursor: pointer;
        background-color: var(--sl-color-neutral-50, #f8fafc);
        transition: background-color 0.2s ease;
        border-bottom: 1px solid var(--sl-color-neutral-200, #e2e8f0);
        box-sizing: border-box;
    }
    .header:hover {
        background-color: var(--sl-color-neutral-50, #f1f5f9);
    }
    .header.active {
        background-color: var(--sl-color-neutral-50, #f1f5f9);
        font-weight: 500;
    }
    .icon {
        font-size: var(--auto-icon-size);
        &.action {
            padding: 2px;
            cursor: pointer;
            box-sizing: border-box;
        }
        &.action:hover {
            color: var(--auto-theme-color);
            border-radius: 50%;
            background-color: var(--sl-color-neutral-200, #e2e8f0);
        }
        &.action:active {
            background-color: var(--sl-color-neutral-100);
        }
    }
    sl-icon-button sl-icon::part(svg) {
        stroke-width: 1;
    }
    .icon::part(svg) {
        stroke-width: 1;
    }
    .label {
        flex-grow: 1;
    }
    .panel-arrow {
        transition: transform 0.3s ease;
    }
    .header.active .panel-arrow {
        transform: rotate(180deg);
    }
    .content {
        position: relative;
        max-height: 0;
        padding: 0 15px;
        overflow: hidden;
        background-color: var(--sl-color-neutral-0, #ffffff);
        border-bottom: 1px solid var(--sl-color-neutral-200, #e2e8f0);
        visibility: hidden;
        flex-direction: column;
        box-sizing: border-box;
        transition: max-height 0.3s ease-out, padding 0.2s ease, opacity 0.2s ease,
            visibility 0s 0.3s; /* 延迟visibility变化，确保在动画完成后才隐藏 */
    }
    .content.active {
        max-height: 2000px;
        padding: 15px;
        transition: max-height 2s ease-out, padding 0.3s ease, visibility 0s; /* 立即改变visibility */
        visibility: visible;
        flex-grow: 1; /* 当指定高度时，内容区域配置flex-grow=1 */
        display: flex;
    }
    /* 当组件有高度时，内容区域自动填充剩余空间 */
    :host([style*='height']) .content.active {
        overflow: auto;
    }
    /* 最后一个面板的内容区域不需要底部边框 */
    .content:last-of-type {
        border-bottom: none;
    }
    /* 隐藏slot元素但保持其功能 */
    .hidden-slot {
        display: none !important;
        visibility: hidden;
        position: absolute;
        pointer-events: none;
    }
    :host:first-child {
        border-top: none;
    }
    .header:last-of-type {
        border-bottom: none;
    }
    ${scrollbar}
`;
