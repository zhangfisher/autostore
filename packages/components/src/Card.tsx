/**
 * 每次渲染时变化颜色
 */


import React, { ReactNode, useEffect } from "react"
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
  border       : `1px solid #ccc`,
  background   : (props)=>props.enable ? "white" : 'gray',
  margin       : "8px" ,
  display      : (props)=>props.visible ? 'flex' : 'none',
  flexDirection: "column",        
},{className:"card"})

export const Card:ReactFC<CardProps> = (props:CardProps)=>{
  const { title,enable=true,buttons=[] } = props 
  const children = Array.isArray(props.children) ? props.children : [props.children]

  return (
    <div className={CardStyle.className}>
      <div className="header"  style={{display:"flex",flexDirection:"row",backgroundColor:"#eee",padding:"6px",lineHeight:"150%"}}>
          <span style={{flexGrow:1,color:enable ? "#222" : 'gray'}}>{title}</span>
          <span style={{}}>
            {buttons.map((btn,index)=>{
              return <span key={index} className="button" style={{padding:"4px",margin:"4px",cursor:'pointer'}} onClick={btn.onClick}>{btn.title}</span>
            })}
          </span>
      </div>
      <div style={{ padding:"12px" }}>
          {children.map((child,index)=>{
            if(children.length > 1 && index==children.length-1 && (child.classList && child.classList.contains('footer'))){
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

 