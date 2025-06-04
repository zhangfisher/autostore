import { css } from "lit";

export default css`
    :host{
        display: flex;
        position: relative;
    }
    .auto-field{
        display: flex;
        position: relative;
        flex-direction:column;
        width:100%;        
        padding: 0.3em;
        
        &>.label{
            color: var(--sl-color-gray-600);           
            padding: 4px; 
            font-weight: 600;
            display: flex;
            &>.title{
                flex-grow: 1;
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
            }
            .error{
                padding: 4px;
            }
        } 
    }
        
`