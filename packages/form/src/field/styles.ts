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
            padding: calc(var(--auto-spacing) * 0.5);
            box-sizing: border-box;
            padding-right: 0px;
            &>.label{
                display: flex;   
                color: var(--auto-text-color);   
                padding: 4px; 
                font-weight: 600;                             
                &>.title{
                    font-size: var(--auto-font-size);
                    flex-grow: 1;
                    line-height: var(--auto-line-height);
                    &::after{
                        content: '：';                    
                    }
                }
            }    
            &>.value{
                position: relative;
            }
            
            & .help{
                display: flex;
                align-items: center;
                font-size: calc(var(--auto-font-size) * 0.9);
                color: var(--auto-gray-color);
                padding:  calc(var(--auto-spacing) * 0.3) 0px;
            }    
        }    

        & > .autofield:hover{
            background-color: var(--sl-color-gray-50);
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
    /* 隐藏 */
    :host(.hidden){
        display: none!important;        
    }
    /* 错误样式 */
    :host(.error){
        & > .autofield{
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
            & .mark-err{
                border-color: red;
            }
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
                display: flex;
                align-items: stretch;
                flex-direction: column;
                justify-content: center;
               
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
                pointer-events: none;
            }
            & sl-textarea::part(textarea){
                color: var(--sl-color-gray-400);
                user-select: none; 
                pointer-events: none;
            }
        }        
    }
    /* 网格线 */
    :host(.grid){ 
        & > .autofield{ 
            padding: var(--auto-spacing);
        }
    } 
    :host(.viewonly){
        & > .autofield > .value{
                display:flex;
                align-items: end;
        } 
    }
    :host(.viewonly.view-left){
        & > .autofield > .value{ 
            align-items: start;
        }
    }    
    :host(.viewonly.view-center){
        & > .autofield > .value{ 
            align-items: center;
        }
    }


    :host(.readonly){
        & > .autofield{
            &>.value:after{
                content: ' ';
                position:absolute;
                top:0px;
                left:0px;
                width:100%;
                height:100%;
                opacity: 0; 
                user-select: none;
                z-index: 1;
            }
        }
    }
   
`