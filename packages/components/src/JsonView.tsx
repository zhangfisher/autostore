/**
 * 
 * 一个简单的JSON数据展示组件
 * 
 */





import React from "react" 
// @ts-ignore
import jsonPrettyHtml from "json-pretty-html"
import { styled } from "flexstyled"
 
export type JsonViewProps  = React.PropsWithChildren<{
    data?:any
}> 

const JSONStyle = styled({
    "&>.json-pretty":{
        lineHeight:"150%",
        "& .json-key":{
            color:"#5a5a5ac6",
            padding:"2px"
        },
        "& .json-string":{
            color:"#007912",
            padding:"2px"
        },
        "& .json-number":{
            color:"#e67206",
            padding:"2px"
        },
        "& .json-boolean":{
            color:"red"
        },

    } 
},{
    className:"x-json-view",
})

export const JsonView:React.FC<JsonViewProps> =(props:JsonViewProps)=>{
    const { data } = props 
    return <div className={JSONStyle.className} 
                dangerouslySetInnerHTML={{__html:jsonPrettyHtml(data)}}
            /> 
    
}

