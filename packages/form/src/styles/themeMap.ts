import { css } from 'lit';
/**
 * 将@shoelace-style/shoelace的样式映射到ThemePro
 */
export const themeMap = css`
:root,
:host,
.sl-theme-light {
    color-scheme: light;
    --sl-color-gray-50: var(--t-color-gray-0);
    --sl-color-gray-100: var(--t-color-gray-1);
    --sl-color-gray-200: var(--t-color-gray-2);
    --sl-color-gray-300: var(--t-color-gray-3);
    --sl-color-gray-400: var(--t-color-gray-4);
    --sl-color-gray-500: var(--t-color-gray-5);
    --sl-color-gray-600: var(--t-color-gray-6);
    --sl-color-gray-700: var(--t-color-gray-7);
    --sl-color-gray-800: var(--t-color-gray-8);
    --sl-color-gray-900: var(--t-color-gray-9);
    --sl-color-gray-950: var(--t-color-gray-10);

    --sl-color-red-50: var(--t-color-red-0);
    --sl-color-red-100: var(--t-color-red-1);
    --sl-color-red-200: var(--t-color-red-2);
    --sl-color-red-300: var(--t-color-red-3);
    --sl-color-red-400: var(--t-color-red-4);
    --sl-color-red-500: var(--t-color-red-5);
    --sl-color-red-600: var(--t-color-red-6);
    --sl-color-red-700: var(--t-color-red-7);
    --sl-color-red-800: var(--t-color-red-8);
    --sl-color-red-900: var(--t-color-red-9);
    --sl-color-red-950: var(--t-color-red-10);

    --sl-color-orange-50: var(--t-color-orange-0);
    --sl-color-orange-100: var(--t-color-orange-1);
    --sl-color-orange-200: var(--t-color-orange-2);
    --sl-color-orange-300: var(--t-color-orange-3);
    --sl-color-orange-400: var(--t-color-orange-4);
    --sl-color-orange-500: var(--t-color-orange-5);
    --sl-color-orange-600: var(--t-color-orange-6);
    --sl-color-orange-700: var(--t-color-orange-7);
    --sl-color-orange-800: var(--t-color-orange-8);
    --sl-color-orange-900: var(--t-color-orange-9);
    --sl-color-orange-950: var(--t-color-orange-10);

    --sl-color-amber-50: var(--t-color-amber-0);
    --sl-color-amber-100: var(--t-color-amber-1);
    --sl-color-amber-200: var(--t-color-amber-2);
    --sl-color-amber-300: var(--t-color-amber-3);
    --sl-color-amber-400: var(--t-color-amber-4);
    --sl-color-amber-500: var(--t-color-amber-5);
    --sl-color-amber-600: var(--t-color-amber-6);
    --sl-color-amber-700: var(--t-color-amber-7);
    --sl-color-amber-800: var(--t-color-amber-8);
    --sl-color-amber-900: var(--t-color-amber-9);
    --sl-color-amber-950: var(--t-color-amber-10);

    --sl-color-yellow-50: var(--t-color-yellow-0);
    --sl-color-yellow-100: var(--t-color-yellow-1);
    --sl-color-yellow-200: var(--t-color-yellow-2);
    --sl-color-yellow-300: var(--t-color-yellow-3);
    --sl-color-yellow-400: var(--t-color-yellow-4);
    --sl-color-yellow-500: var(--t-color-yellow-5);
    --sl-color-yellow-600: var(--t-color-yellow-6);
    --sl-color-yellow-700: var(--t-color-yellow-7);
    --sl-color-yellow-800: var(--t-color-yellow-8);
    --sl-color-yellow-900: var(--t-color-yellow-9);
    --sl-color-yellow-950: var(--t-color-yellow-10);

    --sl-color-lime-50: var(--t-color-lime-0);
    --sl-color-lime-100: var(--t-color-lime-1);
    --sl-color-lime-200: var(--t-color-lime-2);
    --sl-color-lime-300: var(--t-color-lime-3);
    --sl-color-lime-400: var(--t-color-lime-4);
    --sl-color-lime-500: var(--t-color-lime-5);
    --sl-color-lime-600: var(--t-color-lime-6);
    --sl-color-lime-700: var(--t-color-lime-7);
    --sl-color-lime-800: var(--t-color-lime-8);
    --sl-color-lime-900: var(--t-color-lime-9);
    --sl-color-lime-950: var(--t-color-lime-10);

    --sl-color-green-50: var(--t-color-green-0);
    --sl-color-green-100: var(--t-color-green-1);
    --sl-color-green-200: var(--t-color-green-2);
    --sl-color-green-300: var(--t-color-green-3);
    --sl-color-green-400: var(--t-color-green-4);
    --sl-color-green-500: var(--t-color-green-5);
    --sl-color-green-600: var(--t-color-green-6);
    --sl-color-green-700: var(--t-color-green-7);
    --sl-color-green-800: var(--t-color-green-8);
    --sl-color-green-900: var(--t-color-green-9);
    --sl-color-green-950: var(--t-color-green-10);

    --sl-color-emerald-50: var(--t-color-emerald-0);
    --sl-color-emerald-100: var(--t-color-emerald-1);
    --sl-color-emerald-200: var(--t-color-emerald-2);
    --sl-color-emerald-300: var(--t-color-emerald-3);
    --sl-color-emerald-400: var(--t-color-emerald-4);
    --sl-color-emerald-500: var(--t-color-emerald-5);
    --sl-color-emerald-600: var(--t-color-emerald-6);
    --sl-color-emerald-700: var(--t-color-emerald-7);
    --sl-color-emerald-800: var(--t-color-emerald-8);
    --sl-color-emerald-900: var(--t-color-emerald-9);
    --sl-color-emerald-950: var(--t-color-emerald-10);

    --sl-color-teal-50: var(--t-color-teal-0);
    --sl-color-teal-100: var(--t-color-teal-1);
    --sl-color-teal-200: var(--t-color-teal-2);
    --sl-color-teal-300: var(--t-color-teal-3);
    --sl-color-teal-400: var(--t-color-teal-4);
    --sl-color-teal-500: var(--t-color-teal-5);
    --sl-color-teal-600: var(--t-color-teal-6);
    --sl-color-teal-700: var(--t-color-teal-7);
    --sl-color-teal-800: var(--t-color-teal-8);
    --sl-color-teal-900: var(--t-color-teal-9);
    --sl-color-teal-950: var(--t-color-teal-10);

    --sl-color-cyan-50: var(--t-color-cyan-0);
    --sl-color-cyan-100: var(--t-color-cyan-1);
    --sl-color-cyan-200: var(--t-color-cyan-2);
    --sl-color-cyan-300: var(--t-color-cyan-3);
    --sl-color-cyan-400: var(--t-color-cyan-4);
    --sl-color-cyan-500: var(--t-color-cyan-5);
    --sl-color-cyan-600: var(--t-color-cyan-6);
    --sl-color-cyan-700: var(--t-color-cyan-7);
    --sl-color-cyan-800: var(--t-color-cyan-8);
    --sl-color-cyan-900: var(--t-color-cyan-9);
    --sl-color-cyan-950: var(--t-color-cyan-10);

    --sl-color-sky-50: var(--t-color-sky-0);
    --sl-color-sky-100: var(--t-color-sky-1);
    --sl-color-sky-200: var(--t-color-sky-2);
    --sl-color-sky-300: var(--t-color-sky-3);
    --sl-color-sky-400: var(--t-color-sky-4);
    --sl-color-sky-500: var(--t-color-sky-5);
    --sl-color-sky-600: var(--t-color-sky-6);
    --sl-color-sky-700: var(--t-color-sky-7);
    --sl-color-sky-800: var(--t-color-sky-8);
    --sl-color-sky-900: var(--t-color-sky-9);
    --sl-color-sky-950: var(--t-color-sky-10);

    --sl-color-blue-50: var(--t-color-blue-0);
    --sl-color-blue-100: var(--t-color-blue-1);
    --sl-color-blue-200: var(--t-color-blue-2);
    --sl-color-blue-300: var(--t-color-blue-3);
    --sl-color-blue-400: var(--t-color-blue-4);
    --sl-color-blue-500: var(--t-color-blue-5);
    --sl-color-blue-600: var(--t-color-blue-6);
    --sl-color-blue-700: var(--t-color-blue-7);
    --sl-color-blue-800: var(--t-color-blue-8);
    --sl-color-blue-900: var(--t-color-blue-9);
    --sl-color-blue-950: var(--t-color-blue-10);

    --sl-color-indigo-50: var(--t-color-indigo-0);
    --sl-color-indigo-100: var(--t-color-indigo-1);
    --sl-color-indigo-200: var(--t-color-indigo-2);
    --sl-color-indigo-300: var(--t-color-indigo-3);
    --sl-color-indigo-400: var(--t-color-indigo-4);
    --sl-color-indigo-500: var(--t-color-indigo-5);
    --sl-color-indigo-600: var(--t-color-indigo-6);
    --sl-color-indigo-700: var(--t-color-indigo-7);
    --sl-color-indigo-800: var(--t-color-indigo-8);
    --sl-color-indigo-900: var(--t-color-indigo-9);
    --sl-color-indigo-950: var(--t-color-indigo-10);

    --sl-color-violet-50: var(--t-color-violet-0);
    --sl-color-violet-100: var(--t-color-violet-1);
    --sl-color-violet-200: var(--t-color-violet-2);
    --sl-color-violet-300: var(--t-color-violet-3);
    --sl-color-violet-400: var(--t-color-violet-4);
    --sl-color-violet-500: var(--t-color-violet-5);
    --sl-color-violet-600: var(--t-color-violet-6);
    --sl-color-violet-700: var(--t-color-violet-7);
    --sl-color-violet-800: var(--t-color-violet-8);
    --sl-color-violet-900: var(--t-color-violet-9);
    --sl-color-violet-950: var(--t-color-violet-10);

    --sl-color-purple-50: var(--t-color-purple-0);
    --sl-color-purple-100: var(--t-color-purple-1);
    --sl-color-purple-200: var(--t-color-purple-2);
    --sl-color-purple-300: var(--t-color-purple-3);
    --sl-color-purple-400: var(--t-color-purple-4);
    --sl-color-purple-500: var(--t-color-purple-5);
    --sl-color-purple-600: var(--t-color-purple-6);
    --sl-color-purple-700: var(--t-color-purple-7);
    --sl-color-purple-800: var(--t-color-purple-8);
    --sl-color-purple-900: var(--t-color-purple-9);
    --sl-color-purple-950: var(--t-color-purple-10);

    --sl-color-fuchsia-50: var(--t-color-fuchsia-0);
    --sl-color-fuchsia-100: var(--t-color-fuchsia-1);
    --sl-color-fuchsia-200: var(--t-color-fuchsia-2);
    --sl-color-fuchsia-300: var(--t-color-fuchsia-3);
    --sl-color-fuchsia-400: var(--t-color-fuchsia-4);
    --sl-color-fuchsia-500: var(--t-color-fuchsia-5);
    --sl-color-fuchsia-600: var(--t-color-fuchsia-6);
    --sl-color-fuchsia-700: var(--t-color-fuchsia-7);
    --sl-color-fuchsia-800: var(--t-color-fuchsia-8);
    --sl-color-fuchsia-900: var(--t-color-fuchsia-9);
    --sl-color-fuchsia-950: var(--t-color-fuchsia-10);

    --sl-color-pink-50: var(--t-color-pink-0);
    --sl-color-pink-100: var(--t-color-pink-1);
    --sl-color-pink-200: var(--t-color-pink-2);
    --sl-color-pink-300: var(--t-color-pink-3);
    --sl-color-pink-400: var(--t-color-pink-4);
    --sl-color-pink-500: var(--t-color-pink-5);
    --sl-color-pink-600: var(--t-color-pink-6);
    --sl-color-pink-700: var(--t-color-pink-7);
    --sl-color-pink-800: var(--t-color-pink-8);
    --sl-color-pink-900: var(--t-color-pink-9);
    --sl-color-pink-950: var(--t-color-pink-10);

    --sl-color-rose-50: var(--t-color-rose-0);
    --sl-color-rose-100: var(--t-color-rose-1);
    --sl-color-rose-200: var(--t-color-rose-2);
    --sl-color-rose-300: var(--t-color-rose-3);
    --sl-color-rose-400: var(--t-color-rose-4);
    --sl-color-rose-500: var(--t-color-rose-5);
    --sl-color-rose-600: var(--t-color-rose-6);
    --sl-color-rose-700: var(--t-color-rose-7);
    --sl-color-rose-800: var(--t-color-rose-8);
    --sl-color-rose-900: var(--t-color-rose-9);
    --sl-color-rose-950: var(--t-color-rose-10);

    --sl-color-primary-50: var(--t-color-primary-0);
    --sl-color-primary-100: var(--t-color-primary-1);
    --sl-color-primary-200: var(--t-color-primary-2);
    --sl-color-primary-300: var(--t-color-primary-3);
    --sl-color-primary-400: var(--t-color-primary-4);
    --sl-color-primary-500: var(--t-color-primary-5);
    --sl-color-primary-600: var(--t-color-primary-6);
    --sl-color-primary-700: var(--t-color-primary-7);
    --sl-color-primary-800: var(--t-color-primary-8);
    --sl-color-primary-900: var(--t-color-primary-9);
    --sl-color-primary-950: var(--t-color-primary-10);

    --sl-color-success-50: var(--t-color-success-0);
    --sl-color-success-100: var(--t-color-success-1);
    --sl-color-success-200: var(--t-color-success-2);
    --sl-color-success-300: var(--t-color-success-3);
    --sl-color-success-400: var(--t-color-success-4);
    --sl-color-success-500: var(--t-color-success-5);
    --sl-color-success-600: var(--t-color-success-6);
    --sl-color-success-700: var(--t-color-success-7);
    --sl-color-success-800: var(--t-color-success-8);
    --sl-color-success-900: var(--t-color-success-9);
    --sl-color-success-950: var(--t-color-success-10);

    --sl-color-warning-50: var(--sl-color-amber-50);
    --sl-color-warning-100: var(--t-color-warning-1);
    --sl-color-warning-200: var(--t-color-warning-2);
    --sl-color-warning-300: var(--t-color-warning-3);
    --sl-color-warning-400: var(--t-color-warning-4);
    --sl-color-warning-500: var(--t-color-warning-5);
    --sl-color-warning-600: var(--t-color-warning-6);
    --sl-color-warning-700: var(--t-color-warning-7);
    --sl-color-warning-800: var(--t-color-warning-8);
    --sl-color-warning-900: var(--t-color-warning-9);
    --sl-color-warning-950: var(--sl-color-amber-950);

    --sl-color-danger-50: var(--t-color-danger-0);
    --sl-color-danger-100: var(--t-color-danger-1);
    --sl-color-danger-200: var(--t-color-danger-2);
    --sl-color-danger-300: var(--t-color-danger-3);
    --sl-color-danger-400: var(--t-color-danger-4);
    --sl-color-danger-500: var(--t-color-danger-5);
    --sl-color-danger-600: var(--t-color-danger-6);
    --sl-color-danger-700: var(--t-color-danger-7);
    --sl-color-danger-800: var(--t-color-danger-8);
    --sl-color-danger-900: var(--t-color-danger-9);
    --sl-color-danger-950: var(--t-color-danger-10);

    --sl-color-neutral-50: var(--t-color-theme-0);
    --sl-color-neutral-100: var(--t-color-theme-1);
    --sl-color-neutral-200: var(--t-color-theme-2);
    --sl-color-neutral-300: var(--t-color-theme-3);
    --sl-color-neutral-400: var(--t-color-theme-4);
    --sl-color-neutral-500: var(--t-color-theme-5);
    --sl-color-neutral-600: var(--t-color-theme-6);
    --sl-color-neutral-700: var(--t-color-theme-7);
    --sl-color-neutral-800: var(--t-color-theme-8);
    --sl-color-neutral-900: var(--t-color-theme-9);
    --sl-color-neutral-950: var(--t-color-theme-10);

    --sl-color-neutral-0: var(--t-color-theme-0);
    --sl-color-neutral-1000: var(--t-color-theme-10);

    --sl-border-radius-small: var(--t-border-radius-small);
    --sl-border-radius-medium: var(--t-border-radius-medium);
    --sl-border-radius-large: var(--t-border-radius-large);
    --sl-border-radius-x-large: var(--t-border-radius-x-large);

    --sl-border-radius-circle: var(--t-border-radius-circle);
    --sl-border-radius-pill: var(--t-border-radius-pill);

    --sl-shadow-x-small: var(--t-shadow-x-small);
    --sl-shadow-small: var(--t-shadow-small);
    --sl-shadow-medium: var(--t-shadow-medium);
    --sl-shadow-large: var(--t-shadow-large);
    --sl-shadow-x-large: var(--t-shadow-x-large);

    --sl-spacing-3x-small: 0.125rem;
    --sl-spacing-2x-small: 0.25rem;
    --sl-spacing-x-small: var(--t-spacing-x-small);
    --sl-spacing-small: var(--t-spacing-small);
    --sl-spacing-medium: var(--t-spacing-medium);
    --sl-spacing-large: var(--t-spacing-large);
    --sl-spacing-x-large: var(--t-spacing-x-large);
    --sl-spacing-2x-large: 2.25rem;
    --sl-spacing-3x-large: 3rem;
    --sl-spacing-4x-large: 4.5rem;

    --sl-transition-x-slow: 1000ms;
    --sl-transition-slow: 500ms;
    --sl-transition-medium: 250ms;
    --sl-transition-fast: 150ms;
    --sl-transition-x-fast: 50ms;

    --sl-font-mono: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
    --sl-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
    --sl-font-serif: Georgia, "Times New Roman", serif;

    --sl-font-size-2x-small: 0.625rem;
    --sl-font-size-x-small: var(--t-font-size-x-small);
    --sl-font-size-small: var(--t-font-size-small);
    --sl-font-size-medium: var(--t-font-size-medium);
    --sl-font-size-large: var(--t-font-size-large);
    --sl-font-size-x-large: var(--t-font-size-x-large);
    --sl-font-size-2x-large: 2.25rem;
    --sl-font-size-3x-large: 3rem;
    --sl-font-size-4x-large: 4.5rem;

    --sl-font-weight-light: var(--t-font-weight-small);
    --sl-font-weight-normal: var(--t-font-weight-medium);
    --sl-font-weight-semibold: var(--t-font-weight-large);
    --sl-font-weight-bold: var(--t-font-weight-x-large);

    --sl-letter-spacing-denser: -0.03em;
    --sl-letter-spacing-dense: -0.015em;
    --sl-letter-spacing-normal: normal;
    --sl-letter-spacing-loose: 0.075em;
    --sl-letter-spacing-looser: 0.15em;

    --sl-line-height-denser: var(--sl-line-height-x-small);
    --sl-line-height-dense: var(--sl-line-height-small);
    --sl-line-height-normal: var(--t-line-height-medium);
    --sl-line-height-loose: var(--sl-line-height-large);
    --sl-line-height-looser: var(--sl-line-height-x-large);

    --sl-focus-ring-color: var(--sl-color-primary-600);
    --sl-focus-ring-style: solid;
    --sl-focus-ring-width: 3px;
    --sl-focus-ring: var(--sl-focus-ring-style) var(--sl-focus-ring-width) var(--sl-focus-ring-color);
    --sl-focus-ring-offset: 1px;

    --sl-button-font-size-small: var(--sl-font-size-x-small);
    --sl-button-font-size-medium: var(--sl-font-size-small);
    --sl-button-font-size-large: var(--sl-font-size-medium);

    --sl-input-height-x-small: 1.525rem;
    --sl-input-height-small: 1.875rem;
    --sl-input-height-medium: 2.5rem;
    --sl-input-height-large: 3.125rem;
    --sl-input-height-x-large: 3.875rem;

    --sl-input-background-color: var(--auto-input-bgcolor);
    --sl-input-background-color-hover: var(--auto-input-bgcolor);
    --sl-input-background-color-focus: var(--sl-input-background-color);
    --sl-input-background-color-disabled: var(--sl-color-neutral-100);
    --sl-input-border-color: var(--auto-border-color);
    --sl-input-border-color-hover: var(--sl-color-neutral-400);
    --sl-input-border-color-focus: var(--sl-color-primary-500);
    --sl-input-border-color-disabled: var(--sl-color-neutral-300);
    --sl-input-border-width: 1px;
    --sl-input-required-content: "*";
    --sl-input-required-content-offset: -2px;
    --sl-input-required-content-color: var(--sl-input-label-color);

    --sl-input-border-radius-small: var(--sl-border-radius-medium);
    --sl-input-border-radius-medium: var(--sl-border-radius-medium);
    --sl-input-border-radius-large: var(--sl-border-radius-medium);

    --sl-input-font-family: var(--sl-font-sans);
    --sl-input-font-weight: var(--sl-font-weight-normal);
    --sl-input-font-size-small: var(--sl-font-size-small);
    --sl-input-font-size-medium: var(--sl-font-size-medium);
    --sl-input-font-size-large: var(--sl-font-size-large);
    --sl-input-letter-spacing: var(--sl-letter-spacing-normal);

    --sl-input-color: var(--auto-color);
    --sl-input-color-hover: var(--auto-primary-color);
    --sl-input-color-focus: var(--auto-primary-color);
    --sl-input-color-disabled: var(--auto-disable-color);
    --sl-input-icon-color: var(--auto-color);
    --sl-input-icon-color-hover: var(--auto-primary-color);
    --sl-input-icon-color-focus: var(--auto-primary-color);
    --sl-input-placeholder-color: var(--auto-theme-color);
    --sl-input-placeholder-color-disabled: var(--sl-color-neutral-400);
    --sl-input-spacing-small: var(--sl-spacing-small);
    --sl-input-spacing-medium: var(--sl-spacing-medium);
    --sl-input-spacing-large: var(--sl-spacing-large);

    --sl-input-focus-ring-color: hsl(198.6 88.7% 48.4% / 40%);
    --sl-input-focus-ring-offset: 0;

    --sl-input-filled-background-color: var(--sl-color-neutral-100);
    --sl-input-filled-background-color-hover: var(--auto-primary-color);
    --sl-input-filled-background-color-focus: var(--sl-color-neutral-100);
    --sl-input-filled-background-color-disabled: var(--sl-color-neutral-100);
    --sl-input-filled-color: var(--sl-color-neutral-800);
    --sl-input-filled-color-hover: var(--sl-color-neutral-800);
    --sl-input-filled-color-focus: var(--sl-color-neutral-700);
    --sl-input-filled-color-disabled: var(--sl-color-neutral-800);

    --sl-input-label-font-size-small: var(--sl-font-size-small);
    --sl-input-label-font-size-medium: var(--sl-font-size-medium);
    --sl-input-label-font-size-large: var(--sl-font-size-large);
    --sl-input-label-color: inherit;

    --sl-input-help-text-font-size-small: var(--sl-font-size-x-small);
    --sl-input-help-text-font-size-medium: var(--sl-font-size-small);
    --sl-input-help-text-font-size-large: var(--sl-font-size-medium);
    --sl-input-help-text-color: var(--sl-color-neutral-500);

    --sl-toggle-size-small: 0.875rem;
    --sl-toggle-size-medium: 1.125rem;
    --sl-toggle-size-large: 1.375rem;

    --sl-overlay-background-color: hsl(240 3.8% 46.1% / 33%);

    --sl-panel-background-color: var(--auto-panel-bgcolor);
    --sl-panel-border-color: var(--auto-border-color);
    --sl-panel-border-width: 1px;

    --sl-tooltip-border-radius: var(--auto-border-radius);
    --sl-tooltip-background-color: var(--auto-panel-bgcolor);
    --sl-tooltip-color: var(--auto-color);
    --sl-tooltip-font-family: var(--sl-font-sans);
    --sl-tooltip-font-weight: var(--sl-font-weight-normal);
    --sl-tooltip-font-size: var(--sl-font-size-small);
    --sl-tooltip-line-height: var(--sl-line-height-dense);
    --sl-tooltip-padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-small);
    --sl-tooltip-arrow-size: 6px;

    --sl-z-index-drawer: 700;
    --sl-z-index-dialog: 800;
    --sl-z-index-dropdown: 900;
    --sl-z-index-toast: 950;
    --sl-z-index-tooltip: 1000;
}

@supports (scrollbar-gutter: stable) {
    .sl-scroll-lock {
        scrollbar-gutter: var(--sl-scroll-lock-gutter) !important;
    }

    .sl-scroll-lock body {
        overflow: hidden !important;
    }
}

@supports not (scrollbar-gutter: stable) {
    .sl-scroll-lock body {
        padding-right: var(--sl-scroll-lock-size) !important;
        overflow: hidden !important;
    }
}

.sl-toast-stack {
    position: fixed;
    top: 0;
    inset-inline-end: 0;
    z-index: var(--sl-z-index-toast);
    width: 28rem;
    max-width: 100%;
    max-height: 100%;
    overflow: auto;
}

.sl-toast-stack sl-alert {
    margin: var(--sl-spacing-medium);
}

.sl-toast-stack sl-alert::part(base) {
    box-shadow: var(--sl-shadow-large);
}
`