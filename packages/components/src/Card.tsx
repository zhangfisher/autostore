/**
 * 每次渲染时变化颜色
 */


import React, { ReactNode } from "react"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { ReactFC } from "./types";
import { styled } from "flexstyled";

export type CardProps = React.PropsWithChildren<{
  title?:string
  buttons?:{onClick:()=>void,title:string}[],
  visible?:boolean
  enable?:boolean
  footer?:ReactNode
}>


const CardStyle = styled<CardProps>({  
  border       : `1px solid #e1e1e1`,
  background   : (props)=>props.enable!==false ? "white" : 'gray',
  margin       : "8px" ,
  display      : (props)=>props.visible!==false ? 'flex' : 'none',
  flexDirection: "column",        
  borderRadius : "6px",
  minWidth     : "320px",
  minHeight    : "200px",
  boxShadow    : "0 0 4px rgba(0,0,0,0.1)"
},{className:"card"})

const CardHeaderStyle = styled<CardProps>({  
  display:"flex",
  flexDirection:"row",
  backgroundColor:"#f5f5f5",
  padding:"8px",
  lineHeight:"200%",
  color:"#555"
},{className:"card-header"})

export const Card:ReactFC<CardProps> = (props:CardProps)=>{
  const { title,enable=true,buttons=[] } = props 
  const children = Array.isArray(props.children) ? props.children : [props.children]

  return (
    <div className={CardStyle.className} style={CardStyle.getStyle(props)}>
      <div  className={CardHeaderStyle.className} style={CardHeaderStyle.getStyle(props)} >
          <span style={{flexGrow:1,color:enable ? "#222" : 'gray'}}>{title}</span>
          <span style={{}}>
            {buttons.map((btn,index)=>{
              return <span key={index} className="button" style={{padding:"4px",margin:"4px",cursor:'pointer'}} onClick={btn.onClick}>{btn.title}</span>
            })}
          </span>
      </div>
      <div style={{ padding:"12px" }}>
          {children.map((child,index)=>{
            if(children.length > 1 && index===children.length-1 && (child.classList && child.classList.contains('footer'))){
              return <div key={index} className="footer" style={{
                borderTop:"1px solid #ccc",
                padding:'8px',
              }}>{child}</div>
            }else{
              return child
            }
          })}
      </div>
    </div>
  );
};

 