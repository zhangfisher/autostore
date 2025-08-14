import { css } from "lit";

export const overloads = css`
    sl-option::part(label),
    sl-input::part(input),
    sl-popup::part(display-input){        
        color: var(--auto-color);
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
`;
