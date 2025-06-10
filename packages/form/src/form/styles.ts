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
    .auto-form > .fields{
        padding-right: -1em;
    }
    .auto-form > .fields > *{
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
        padding-right:1em;
    }    
    .auto-form > .fields.row-layout{
        display: flex;
        flex-direction: row;
    }
    .auto-form > .fields.col-layout{
        display: flex;
        flex-direction: column;
    }
`