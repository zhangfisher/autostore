import { styled } from "flexstyled"
import React from "react"



export type CheckBoxProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?:string
    labelPos?: 'left' | 'right'
}

const CheckBoxStyle = styled<CheckBoxProps>({
    padding:"4px",
    margin:"4px",
    display:"flex",
    alignItems:"center",
    cursor:"pointer",
    "&>label":{
        padding:"4px",
        userSelect:"none",       
        cursor:"pointer",
    },
    "&>input":{
        margin:"0px",
        padding:"0px",
        width:"1.2em",
        height:"1.2em",
        cursor:"pointer",
    },
},{
    className:"x-checkbox"
})


export const CheckBox:React.FC<CheckBoxProps> = (props)=>{
    
    // @ts-ignore
    const { id=Math.random().toString(36).slice(2),labelPos='right' } = props
     // @ts-ignore
    const label = props.label || props.name || props.id
    return <div className={CheckBoxStyle.className} style={CheckBoxStyle.getStyle(props)}>
              { labelPos==='left' ? <label htmlFor={id}>{label}</label> : null}   
              {/* @ts-ignore */}
              <input {...props} id={id} type="checkbox"/>
              { labelPos==='right' ? <label htmlFor={id}>{label}</label> : null}   
    </div>    
}