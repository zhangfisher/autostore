import { styled } from "flexstyled"
import React, { useCallback, useRef, useState } from "react"
import { Button } from "./Button"



export type SpinProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?:string
}

const SpinStyle = styled<SpinProps>({
    display: "flex",
    alignItems:"center",       
    "& label":{
        color: "#666",
        fontSize: "14px",
        marginBottom: "4px",
        flexShrink: 0,
        width: "100px",
    },
    "&>div":{
        padding:"0px",
        margin:"0px",
        display: "inline-flex",
        alignItems:"stretch",  
    },
    "&>div>input":{ 
        margin:"4px",
        padding:"8px",
        marginLeft:"0px",
        marginRight:"0px",
        width:"60px",
        textAlign:"center",
        borderTop:"1px solid #ccc",
        borderBottom:"1px solid #ccc",
    },
    "& >div > .x-button":{
        "&.before":{
            borderRadius:"4px 0px 0px 4px",            
            marginRight:"0px",
        },
        "&.after":{
            borderRadius:"0px 4px 4px 0px",
            marginLeft:"0px",
        }
    }
},{
    className:"x-spin"
})


export const Spin:React.FC<SpinProps> = (props)=>{    
    const label = props.label  || props.name || props.id
    const { onChange=()=>{} } = props
    const ref = useRef<HTMLInputElement>(null)
    
    const setCount = useCallback((n:number)=>{
        const v = Number(ref.current!.value)
        ref.current!.value = String(v+n)    
        const changeEvent = new Event('input', { bubbles: true });
        ref.current!.dispatchEvent(changeEvent);   
    },[])
    return <div 
        className={SpinStyle.className} 
        style={SpinStyle.getStyle(props)}
    >
        { label ? <label >{label}</label> : null }
        <div>
            <Button className="before" onClick={()=>setCount(-1)}>-</Button>
            {/* @ts-ignore */}
            <input            
                ref={ref}
                onChange={onChange}
                type="number"
                data-field-name={props.name}
                {...props}         
            /> 
            <Button className="after"  onClick={()=>setCount(1)}>+</Button>
        </div>
    </div>    
}