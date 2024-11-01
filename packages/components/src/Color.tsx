 

import React, { CSSProperties, useRef } from "react"
import { ReactFC } from "./types"; 
import { styled } from "flexstyled"
import { Button } from "./Button";

export type ColorProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?   : string
    visible? : boolean
    enable?  : boolean
    validate?: boolean | null
    value?   : string
    style?   : Partial<CSSProperties>
    onAction?: (id:string,value:any,e:any)=>void,
    actions? : string[]
    inline?  : boolean
    width?   : number
    height?  : number
    center?  : boolean
}


const ColorStyle = styled<ColorProps>({
    display:(props)=> props.inline===false ? "flex" : "inline-flex" ,
    alignItems:"center",
    "& input": {
        border: (props)=>props.validate === false ? "1px solid red" : "1px solid #ccc",
        borderRadius: "4px",
        background: (props)=>props.enable===false ? "gray" : "white",
        display: (props)=>props.visible===false ? "none" : "flex",
        margin: "4px",
        flexGrow:1, 
        textAlign:(props)=>props.center ? "center" : "left",
        "&:focus":{
            outline:"none",
            boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"
        },
        "&.invalid":{
            border:"1px solid red",
            color:"red"
        },
        width:(props)=>props.width ? `${props.width}px` : "2em",
        height:(props)=>props.height ? `${props.height}px` : "2em",
        cursor:"pointer"

    },    
    "& label":{
        color: "#666",
        fontSize: "14px",
        marginBottom: "4px",
        flexShrink: 0,
        width: "100px",
    },
    "&.invalid>label": {
        color: "red"
    },
    "& .error":{
        display: "none",
        "&.invalid":{
            display:"block", 
            color:"red"
        }
    },
    "& .x-color-wrapper":{
        display:'flex',
        alignItems:'center',
        "& > input ~ .x-color-action":{
            borderRadius:'0px',
            marginLeft:0,
            marginRight:0,
            borderLeft: 'none',
            paddingLeft:"1.2em",
            paddingRight:"1.2em",
        },
        "& > input + .x-color-action":{
            marginLeft: "-8px",
            borderLeft:(props)=>props.validate === false ? "1px solid red" : "1px solid #ccc"
        },
        "& > input ~ .x-color-action:last-child":{
            borderTopRightRadius: "4px",
            borderBottomRightRadius:"4px"
        }
    }

},{
    className:"x-color"
})

export const Color:ReactFC<ColorProps> = (props:ColorProps)=>{
    const { id=Math.random().toString(36).slice(2), enable = true, style={},value, actions,...restProps } = props;
    const label = props.label || props.name || props.id
    const ref = useRef<HTMLInputElement>(null)
    return (
        <div         
            className={ColorStyle.className}
            style={ColorStyle.getStyle(props,style as any)}
            data-field-name={props.name}
        >
            { label ? <label htmlFor={id}>{label}</label> : null }
            <div style={{
                display:"flex",
                flexDirection:"column",
            }}>
                <div className="x-color-wrapper">
                    <input
                        ref={ref}
                        id={id}
                        value={value}
                        readOnly={!enable}
                        {...restProps}
                        type="color"
                    />
                    {
                        actions?.map((action,index)=>{
                            return <Button className="x-color-action" key={index} onClick={(e)=>{
                                props.onAction?.(action,ref.current!.value,e)
                            }}>{action}</Button>
                        })
                    }
                </div>
                <span className="error" data-validate-field={props.name}></span>            
            </div>

        </div>
    );
};
      
 