import { css } from "lit";

export default css`
    :host{
        display: flex;
        position: relative;
    }
    :host > .auto-form{
        display: flex;
        position: relative;
        flex-direction:column;
        width:100%;        
        padding: 1em;
    }
`