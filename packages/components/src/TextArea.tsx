import React from "react"
import { styled } from "flexstyled"



export type TextAreaProps = React.PropsWithChildren<React.InputHTMLAttributes<HTMLInputElement> & {
    label?:string
    labelPos?: 'left' | 'right'
    height?:string
}>

const TextAreaStyle = styled<TextAreaProps>({
    padding:"0px", 
    display:"flex",
    "&>label":{
        color: "#666",
        fontSize: "14px",
        marginBottom: "4px",
        flexShrink: 0,
        width: "100px",
    },
    "&>textarea":{
        margin: "4px",
        padding: "8px",
        minHeight:"80px",
        borderRadius: "4px",
        border: "1px solid #bbb",
        flexGrow:1,        
        "&:focus":{
            outline:"none",
            boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"
        }
    },
},{
    className:"x-textArea"
})


export const TextArea:React.FC<TextAreaProps> = (props)=>{
    
    // @ts-ignore
    const { id=Math.random().toString(36).slice(2)} = props

     // @ts-ignore
    const label = props.label || props.name || props.id
    return <div className={TextAreaStyle.className} style={TextAreaStyle.getStyle(props)}>
               <label htmlFor={id}>{label}</label>    
              {/* @ts-ignore */}
              <textarea {...props} id={id}>                      
            </textarea>
    </div>    
}