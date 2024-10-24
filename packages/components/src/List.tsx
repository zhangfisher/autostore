/**
 * 
 * 一个简单的JSON数据展示组件
 * 
 */





import React from "react"  
import { styled } from "flexstyled"
import { RichLabel } from "./RichLabel"
import { Box } from "./Box"
 
export type ListProps  = React.PropsWithChildren<{
    title?:string
    description?:string
    items:(string | [string,Record<string,string>] | [string,string])[]
}> 

const ListStyle = styled({
    listStyle:"'ο'",
    margin: 0,
    paddingLeft:"1em",
    "&>li":{
        cursor:"pointer",
        "&:hover":{
            background:"#f9f9f9",
            borderRadius:"4px"
        }
    } 
},{
    className:"x-list",
})

export const List:React.FC<ListProps> =(props:ListProps)=>{
    return (
        <Box title={props.title}>
            {props.description && <RichLabel text={props.description}/>}
            <ul className={ListStyle.className} 
                style={ListStyle.getStyle()}
            > 
                {props.items && props.items.map((item,index)=>{
                    if(Array.isArray(item)){
                        return <li key={index}><RichLabel text={item[0]} color={item[1]}/></li>
                    }else{
                        return <li key={index}><RichLabel text={item} color='red'/></li>
                    }
                })}
            </ul>
        </Box>
    )
}

