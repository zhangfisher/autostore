import { css } from 'lit';

export const vars = css`
    :host {
        --auto-theme-color: var(--sl-color-primary-500);
        --auto-text-color: var(--sl-color-gray-700);
        --auto-gray-color: var(--sl-color-gray-500);
        --auto-bgcolor: var(--sl-color-neutral-0);
        --auto-panel-bgcolor: var(--sl-color-neutral-0);
        --auto-line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 4);
        --auto-font-size: var(--sl-font-size-medium);
        --auto-spacing: var(--sl-spacing-medium); /* 用于内边距和外边距 */
        --auto-border-color: var(--sl-color-neutral-300);
        --auto-border: 1px solid var(--auto-border-color);
        --auto-border-radius: var(--sl-border-radius-medium);
        --auto-shadow: var(--sl-shadow-medium);
        --auto-workspace-color: var(--sl-color-neutral-50);
        --auto-icon-size: calc(1.5 * var(--sl-font-size-medium));
        /* 以下变量在 overloads/field/widgets 中被引用，此前无定义处 */
        --auto-color: var(--auto-text-color);
        --auto-primary-color: var(--auto-theme-color);
        --auto-secondary-color: var(--sl-color-gray-600);
        --auto-disable-color: var(--sl-color-neutral-400);
        /* 不能写 var(--sl-input-background-color)——themeMap 中该 --sl 令牌
           反向引用本变量，会构成循环引用导致双方都失效 */
        --auto-input-bgcolor: var(--sl-color-neutral-0);
        --auto-title-bgcolor: var(--sl-color-neutral-100);
        --auto-padding: var(--auto-spacing);
        --auto-letter-spacing: var(--sl-letter-spacing-normal);
        --auto-font: var(--sl-font-sans) var(--auto-font-size)/var(--auto-line-height);
    }
    :host([size='small']) {
        --auto-font-size: var(--sl-font-size-small);
        --auto-spacing: var(--sl-spacing-small); /* 用于内边距和外边距 */
        --auto-border-radius: var(--sl-border-radius-small);
        --auto-shadow: var(--sl-shadow-small);
        --auto-line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 4);
        --auto-icon-size: calc(1.5 * var(--sl-font-size-small));
    }
    :host([size='large']) {
        --auto-font-size: var(--sl-font-size-large);
        --auto-spacing: var(--sl-spacing-large); /* 用于内边距和外边距 */
        --auto-border-radius: var(--sl-border-radius-large);
        --auto-shadow: var(--sl-shadow-large);
        --auto-line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 4);
        --auto-icon-size: calc(1.5 * var(--sl-font-size-large));
    }

    auto-form.error {
        --auto-border: 1px solid red;
        --auto-text-color: red;
    }
`;
