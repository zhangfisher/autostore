import { css } from "lit";

export const overloads = css`
    sl-option::part(label),
    sl-input::part(input),
    sl-popup::part(display-input){        
        color: var(--auto-color);
    }  
    sl-button::part(base){        
        background: none;
    }
`;
