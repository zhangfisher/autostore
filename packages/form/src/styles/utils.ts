import { css } from "lit";



export const scrollbar = css`
    .scrollbar{
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: thin; /* Firefox */ 
        
        /* 初始状态下滚动条透明（自动隐藏） */
        &::-webkit-scrollbar {
            width: 5px;
            height: 0; /* 没有水平方向的滚动条 */
            background-color: transparent;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        /* 鼠标悬停时显示滚动条 */
        &:hover::-webkit-scrollbar {
            opacity: 1;
        }
        
        /* 滚动条轨道 */
        &::-webkit-scrollbar-track {
            background-color: rgba(0, 0, 0, 0.05);
            border-radius: 5px;
        } 
        
        /* 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            
            /* 鼠标悬停在滑块上时的样式 */
            &:hover {
                background-color: rgba(0, 0, 0, 0.3);
            }
        }
    }
`