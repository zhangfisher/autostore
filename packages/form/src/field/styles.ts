import { css } from "lit";

export default css`
    :host{
        display: flex;
        position: relative; 
        & > .autofield{
            display: flex;
            position: relative;
            flex-direction:column;
            background-color: var(--sl-color-neutral-0);        
            width:100%;        
            padding:0.5rem;
            box-sizing: border-box;
            padding-right: 0px;
            &>.label{
                color: var(--sl-color-neutral-700);           
                padding: 4px; 
                font-weight: 600;
                display: flex;
                &>.title{
                    flex-grow: 1;
                    &::after{
                        content: '：';                    
                    }
                }
            }    
            
            & .help{
                display: flex;
                align-items: center;
                font-size: 0.9rem;
                color: var(--sl-color-neutral-400);
                padding:  2px 0px;
            }    
        }
        
        sl-input::part(base){
            outline: none!important;
            box-shadow: none!important;
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
    /* 错误样式 */
    :host(.error){
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
        & .error{
            display: flex;
            align-items: center;
            padding: 4px;                
            font-size: 0.8em;
            color:red;
        }
        & > .label > .title {
            color:red;
        }
    } 
    :host(.left-label){
        & > .autofield{
            flex-direction:row;
            &>.label{                
                flex-shrink: 0;
            }
            &>.value{
                flex-grow: 1;
            }
        }
    }



    
    /* 禁用样式 */
    :host(.disable){
        & > .autofield{
            &>.label{
                color: var(--sl-color-gray-400);
                &>.title{
                    color: var(--sl-color-gray-400);
                }
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
    /* 网格线 */
    :host(.grid){ 
        & > .autofield{
            padding:1rem;
        }
    }
    /* 小尺寸 */
    :host(.small){
        & > .autofield{
            &>.label{            
                &>.title{
                    font-size: var(--sl-font-size-small);
                }
            }             
            & .help{
                font-size: var(--sl-font-size-small);     
            }   
        }
    }
    /* 大尺寸 */
    :host(.large){
        & > .autofield{
            &>.label{            
                &>.title{
                    font-size: var(--sl-font-size-large);
                }            
            }   
            & .help{
                    font-size: var(--sl-font-size-large);     
            }
        }
    }
`