import { css } from "lit";

export default css`
    :host{
        display: flex;
        position: relative;
        background-color: var(--sl-color-neutral-0);
    }
    .auto-field{
        display: flex;
        position: relative;
        flex-direction:column;
        width:100%;        
        padding: 0.3em;
        
        &>.label{
            color: var(--sl-color-neutral-800);           
            padding: 4px; 
            font-weight: 600;
            display: flex;
            &>.title{
                flex-grow: 1;
            }
        }        
        /* 必填字段 */
        &.required{
            &>.label{
                &>.title{
                }
            }
        }

        &.left{
            flex-direction:row;
        }
        

        sl-input::part(base){
            outline: none!important;
            box-shadow: none!important;
        }
        /* 错误样式 */
        &.error{
            color:red; 
            & sl-input::part(base){
                outline: none!important;
                box-shadow: none!important;
                border-color: red;
                color:red;
            }
            & sl-input::part(input){
                color:red;
            }
            .error{
                display: flex;
                align-items: center;
                padding: 4px;                
                font-size: 0.8em;
            }
            & > .label > .title {
                color:red;
            }
        } 
        /* 禁用样式 */
        &.disable{
            &>.label{
                color: var(--sl-color-gray-400);
            }
            &>.title{
                color: var(--sl-color-gray-400);
            }
            & sl-input::part(base),sl-input::part(input){
                color: var(--sl-color-gray-400);
                user-select: none;
                cursor: not-allowed;
                pointer-events: none;
            }
            & sl-textarea::part(textarea){
                color: var(--sl-color-gray-400);
                user-select: none;
                cursor: not-allowed;
                pointer-events: none;
            }
        }
    }
        
`