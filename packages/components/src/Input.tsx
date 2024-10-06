 

import React, { CSSProperties } from "react"
import { ReactFC } from "./types"; 
import { styled } from "flexstyled"

export type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?:string
    visible?:boolean
    enable?:boolean
    validate?:boolean | null
    value?:string
    style?:Partial<CSSProperties>
}


const InputStyle = styled<InputProps>({
    border: (props)=>props.validate === false ? "1px solid red" : "1px solid #bbb",
    borderRadius: "4px",
    background: (props)=>props.enable===false ? "gray" : "white",
    display: (props)=>props.visible===false ? "none" : "block",
    margin: "4px",
    padding: "8px",
    flexGrow:1,
    "&:focus":{
        outline:"none",
        boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"
    }
},{
    className:"v-input"
})

export const Input:ReactFC<InputProps> = (props:InputProps)=>{
    const { id=Math.random().toString(36).slice(2), enable = true, value, ...restProps } = props;

 
    const labelStyle: CSSProperties = {
        color: "#666",
        fontSize: "14px",
        marginBottom: "4px",
        flexShrink: 0,
        width: "100px",
    };

    return (
        <div style={{display:"flex",alignItems:"center"}}>
            { props.label ? <label htmlFor={id}  style={labelStyle}>{props.label}</label> : null }
            <input
                id={id}
                value={value ?? ""}
                readOnly={!enable}
                {...restProps}
                className={InputStyle.className}
                style={InputStyle.getStyle(props)}
            />
        </div>
    );
};
      
 