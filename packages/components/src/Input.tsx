 

import React, { CSSProperties } from "react"
import { ReactFC } from "./types"; 


export type InputProps = React.PropsWithChildren<Partial<HTMLInputElement> & {
    type?:"text" | 'submit' | 'reset'
    name?:string
    visible?:boolean
    enable?:boolean
    validate?:boolean | null
    placeholder?:string
    onChange?:any
    value?:string
    style?:Partial<CSSProperties>
}>

export const Input:ReactFC<InputProps> = (props:InputProps)=>{
    const { name,enable=true,type="text",validate=true,visible=true,placeholder,onChange=()=>{},value,style} =props

    return (
        <input style={Object.assign({ 
            border:validate===false ?  `1px solid red` : `1px solid #bbb` ,
            borderRadius:"4px",
            background: enable ? "white" : 'gray',
            margin:"4px" ,
            padding:"8px",
            display: visible ? 'block' : 'none',
        },style)} 
        type={type} 
        name={name}
        placeholder={placeholder}
        value={value ?? ''}
        readOnly={!enable}
        onChange={onChange} 
        />
    );
};
      
 