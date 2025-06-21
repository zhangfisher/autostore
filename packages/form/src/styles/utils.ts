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

/**
 * 
 * 创建根CSS变量
 * 
 * @param vars 要设置的CSS变量对象，键为变量名，值为变量值
 * @example
 * // 设置两个CSS变量
 * createRootVars({
 *   'primary-color': '#ff0000',
 *   'secondary-color': '#00ff00'
 * });
 */
export function createRootVars(vars: Record<string, string>) {
    if (!vars || typeof vars !== 'object') return;
    Object.entries(vars).forEach(([key, value]) => {
        // 确保变量名有--前缀
        const varName = key.startsWith('--') ? key : `--auto-${key}`;
        // 设置到:root (document.documentElement)
        document.documentElement.style.setProperty(varName, value);
    });
}


export function createAutoFormVars(vars: Record<string, string>) {
    createRootVars({
        // 整体尺寸
        '--auto-size': 'small'
    })
}   