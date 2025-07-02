import { css } from "lit";
import { vars } from './vars'
export default css`
    ${vars}
    :host{
        display: flex;
        position: relative;
        flex-direction:column;
        width:100%;         
        font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu;
        & > .fields{
            & > * {
                width: 100%;
                box-sizing: border-box;                 
            }
        }    
    }   
    :host(.auto-layout){
        & > .fields{
            & > * {
                width: 100%;
                box-sizing: border-box;                 
                display: inline-block;
            }    
        }
    }
    :host(.row-layout){
        display: flex;
        flex-direction: row;
    }
    :host(.col-layout){
        display: flex;
        flex-direction: column;
    }
    :host(.grid){
        border: 1px solid var(--sl-input-border-color);
        border-left: none;
        .fields > :last-child{
            border-bottom:none;
        }            
        & > .fields {
            & > * {
                border-bottom: 1px solid var(--sl-input-border-color);
                border-left: 1px solid var(--sl-input-border-color);
            }
        }
    }
    
`