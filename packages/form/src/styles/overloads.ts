import { css } from "lit";

export const overloads = css`
    
    sl-input::part(input),
    sl-popup::part(display-input){        
        color: var(--auto-color);
    }  
 
    sl-input::part(input)::placeholder{
        color: var(--auto-disable-color);
    }
    sl-button::part(label){
        color: color-mix(in hsl, var(--auto-primary-color), white 80%);
    }
     sl-button[variant=default]::part(label){
        color: var(--auto-color);
    }
    input,textarea{ 
        background-color: var(--auto-input-bgcolor);
    }

    sl-button{
        /* ThemePro 未安装时回落 shoelace 官方 primary-50 */
        --sl-color-primary-50: color-mix(in srgb, var(--t-color-primary-5, hsl(198.6 88.7% 48.4%)) 20%, transparent);
    }
    

`;
