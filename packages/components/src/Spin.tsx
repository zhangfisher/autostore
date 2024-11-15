import { styled } from "flexstyled"
import React, { useCallback, useState } from "react"
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

    const [value,setValue ] = useState<number>(Number(props.value))
    const setCount = useCallback((n:number)=>{
       setValue(value + n)    
    },[value])
    return <div 
        className={SpinStyle.className} 
        style={SpinStyle.getStyle(props)}
    >
        { label ? <label >{label}</label> : null }
        <div>
            <Button className="before" onClick={()=>setCount(-1)}>-</Button>
            {/* @ts-ignore */}
            <input {...props}                      
                value={value}
                type="number"
            /> 
            <Button className="after"  onClick={()=>setCount(1)}>+</Button>
        </div>
    </div>    
}