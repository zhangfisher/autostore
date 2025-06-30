import { css } from "lit";

export const vars = css`
    
 
:host{
    --auto-theme-color: var(--sl-color-primary-500);    
    --auto-text-color: var(--sl-color-gray-700);    
    --auto-gray-color: var(--sl-color-gray-500);    
    --auto-bgcolor: var(--sl-color-neutral-0);    
    --auto-line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 4);    
    --auto-font-size: var(--sl-font-size-medium);    
    --auto-spacing: var(--sl-spacing-medium);                    /* 用于内边距和外边距 */
    --auto-border-color: var(--sl-color-neutral-300);
    --auto-border: 1px solid var(--auto-border-color);    
    --auto-border-radius: var(--sl-border-radius-medium);
    --auto-shadow: var(--sl-shadow-medium);  
    --auto-workspace-color: var(--sl-color-gray-100);          
}


:host([size=small]){ 
    --auto-font-size: var(--sl-font-size-small);    
    --auto-spacing: var(--sl-spacing-small);                    /* 用于内边距和外边距 */
    --auto-border-radius: var(--sl-border-radius-small);
    --auto-shadow: var(--sl-shadow-small);    
    --auto-line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 4);    

}
:host([size=large]){ 
    --auto-font-size: var(--sl-font-size-large);    
    --auto-spacing: var(--sl-spacing-large);                    /* 用于内边距和外边距 */
    --auto-border-radius: var(--sl-border-radius-large);
    --auto-shadow: var(--sl-shadow-large);    
    --auto-line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 4);    
} 

auto-form.error{
    --auto-border: 1px solid red;
    --auto-text-color: red; 
    
}`