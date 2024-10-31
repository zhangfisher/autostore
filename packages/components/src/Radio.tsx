import { styled } from "flexstyled"
import React from "react"



export type RadioProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?:string 
    inline?:boolean
}

const RadioStyle = styled<RadioProps>({
    padding:"4px",
    margin:"4px",
    display:(props)=>props.inline===false ? "flex" : "inline-flex",
    alignItems:"center",
    cursor:"pointer",
    "&>label":{
        padding:"4px",
        userSelect:"none",       
        cursor:"pointer",
        marginRight:"4px",
    },
    "&>input":{
        margin:"0px",
        padding:"0px",
        width:"1.2em",
        height:"1.2em",
        cursor:"pointer",
    },
},{
    className:"x-radio"
})


export const Radio:React.FC<RadioProps> = (props)=>{    
    // @ts-ignore
    const { id=Math.random().toString(36).slice(2) } = props
     // @ts-ignore
    const label = props.label || props.name || props.id
    return <div 
        className={RadioStyle.className} 
        style={RadioStyle.getStyle(props)}
    >
        {/* @ts-ignore */}
        <input {...props} id={id} 
            checked={props.checked}                     
            value={props.value}
            type="radio"
        /> 
        <label htmlFor={id}>{label}</label> 
    </div>    
}