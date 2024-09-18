
import React from "react"
import { ReactFC } from "./types";

export type ColProps = React.PropsWithChildren<{
  visible?:boolean 
  border?:boolean
  padding?:string
  margin?:string
  grow?:number
}>

export const Col:ReactFC<ColProps> = (props)=>{
  const { visible=true,border=true,padding='8px',margin="0px",grow=1} =props
  return (
    <div className="layout-col" style={{ 
        display: visible ? 'flex' : 'none',
        position:"relative",
        flexDirection:'column',
        padding,
        flexGrow:grow,
        margin,
        boxSizing:"border-box",
        border:border ? `1px solid #eee` : 'none'
    }}>             
        {props.children}
    </div>
  );
};
      

export type RowProps = React.PropsWithChildren<{
  visible?:boolean    
  border?:boolean  
  padding?:string
  grow?:number
}>

export const Row:ReactFC<RowProps> = (props)=>{
    const { visible=true,border=true,padding='8px',grow=1 } =props
    return (
      <div  className="layout-row"  style={{ 
          display: visible ? 'flex' : 'none',
          position:"relative",
          flexDirection:'row',
          flexGrow:grow,
          padding,
          margin:"4px",
          boxSizing:"border-box",
          border:border ? `1px solid #eee` : 'none'
      }}>             
          {props.children}
      </div>
    );
  };