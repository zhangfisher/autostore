import React from "react"
import { styled } from "flexstyled"
import { SelectHTMLAttributes } from "react"



export type SelectProps = React.PropsWithChildren<SelectHTMLAttributes<any> & {
    label?:string 
    items?:{title:string,value:any}[]
}>

const SelectStyle = styled<SelectProps>({ 
    display:"flex",
    alignItems:"center",
    cursor:"pointer",
    "&>label":{ 
        userSelect:"none",     
        fontSize: "14px",  
        cursor:"pointer",
        width: '100px',
        flexShrink: 0,
    },
    "&>select":{
        margin:"4px",
        padding:"8px", 
        borderRadius: "4px",
        border: "1px solid #bbb",
        flexGrow:1,            
        "&:focus":{
            outline:"none",
            boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"
        }
    },
},{
    className:"x-select"
})

 
export const Select:React.FC<SelectProps> = (props)=>{
    
    // @ts-ignore
    const { items=[] } = props


     // @ts-ignore
    const label = props.label || props.name || props.id

    return <div className={SelectStyle.className} style={SelectStyle.getStyle(props)}>
              { label ? <label>{label}</label> : null}
              <select {...props} value={props.value}>
                {
                    items.map(item=>{
                        return <option key={item.value} value={item.value}>{item.title}</option>
                    })
                }
            </select>              
    </div>    
}