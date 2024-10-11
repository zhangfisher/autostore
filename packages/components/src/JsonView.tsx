/**
 * 
 * 一个简单的JSON数据展示组件
 * 
 */





import React from "react"
import { RichLabel } from "./RichLabel"

export type JsonViewProps  = React.PropsWithChildren<{
    data?:any
}>
    // 转义HTML特殊字符
const escapeHtml = (str: string) => str.replace(/&/g, "&amp;")
                                        .replace(/</g, "&lt;")
                                        .replace(/>/g, "&gt;")
                                        .replace(/"/g, "&quot;")
                                        .replace(/'/g, "&#039;");

export const JsonView:React.FC<JsonViewProps> =(props:JsonViewProps)=>{
    const { data } = props
    const json = escapeHtml(data ? JSON.stringify(data,null,4) : String(props.children))
    return <RichLabel text={json} rules={{
            "color:green;":/true|false/g,                         // 布尔值            
            "color:#222;padding:4px;": /\"(.*?)\"/g,            // 键    
            "color:#bd0081;padding:4px;":/(?!=\:\s*)[\d\.]+/g,       // 数字
            "color:#888;padding:4px;":/(null|defined)/g,            
            "color:#918213;paddingRight:4px;": /^\{|\}$/g,          // 大括号    
        }}
        style={{

        }}
    />
}

