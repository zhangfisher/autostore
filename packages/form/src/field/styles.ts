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
        padding:0.5rem;
        box-sizing: border-box;
        padding-right: 0px;
        &>.label{
            color: var(--sl-color-neutral-800);           
            padding: 4px; 
            font-weight: 500;
            display: flex;
            &>.title{
                flex-grow: 1;
                &::after{
                    content: '：';                    
                }
            }
        }        
        /* 必填字段 */
        &.required{
            &>.label{                
                &>.title{
                                      
                }
            }
        }

        &.left-label{
            flex-direction:row;
            &>.label{                
                flex-shrink: 0;
            }
            &>.value{
                flex-grow: 1;
            }
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
        /* 网格线 */
        &.grid{ 
            padding:1rem;
        }
        & sl-input::part(suffix) .action-widget{
            color: red;
        }
        & .action-widget.image{
            position: relative; 
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            padding:0px;
            border-left: 1px solid var(--sl-input-border-color);
            & img{
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
        
    }
        
`