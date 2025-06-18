import { css } from "lit";

export default css`
    :host{
        display: flex;
        position: relative;
    } 
    .auto-form{
        display: flex;
        position: relative;
        flex-direction:column;
        width:100%;         
        &.grid{
            border: 1px solid var(--sl-input-border-color);
            border-left: none;
            .fields > :last-child{
                border-bottom:none;
            }            
            & > .fields {
                &>*{
                    border-bottom: 1px solid var(--sl-input-border-color);
                    border-left: 1px solid var(--sl-input-border-color);
                }
            }
        }
    }    
    .auto-form > .fields{
        & > * {
            display: inline-block;
            width: 100%;
            box-sizing: border-box; 
            
        }    
        &.row-layout{
            display: flex;
            flex-direction: row;
        }
        &.col-layout{
            display: flex;
            flex-direction: column;
        }
    }
`