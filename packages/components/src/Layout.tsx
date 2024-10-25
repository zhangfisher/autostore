
import React from "react"
import { ReactFC } from "./types";
import { styled } from "flexstyled";
 
const LayoutStyle = styled<LayoutProps>({
  display: (props)=>props.visible===false ? 'none' : 'flex',
  position:"relative",
  flexDirection:(props)=>props.direction || 'row',
  padding:'4px',
  margin:"4px",
  boxSizing:"border-box",
  alignItems:"stretch",
  "&>*":{
    flex: 1,
    boxSizing:"border-box",
    position:"relative",
    borderLeft:"1px solid #ccc",
    borderTop:"1px solid #ccc",
    borderBottom:(props)=>props.direction ==='column' ?  'none' : "1px solid #ccc",    
    borderRight:(props)=>props.direction ==='column' ?  "1px solid #ccc" : 'none',    
    padding:"8px",
  },
  "&>:last-child":{
    borderRight: "1px solid #ccc",    
    borderBottom:"1px solid #ccc"    
  },
  "&+.x-layout":{
    borderTop:"none",
    marginTop:"-12px",
    "&>*":{
      borderTop:"none",
      paddingTop:"12px"
    }
  }


},{
  className:"x-layout"
})


export type LayoutProps = React.PropsWithChildren<{
  direction?:'row'|'column'
  visible?:boolean    
  border?:boolean  
  style?:React.CSSProperties
}>
  

  
export const Layout:ReactFC<LayoutProps> = (props)=>{
      return (
        <div  className={LayoutStyle.className}  style={LayoutStyle.getStyle(props,props.style as any)}>             
            {props.children}
        </div>
      );
    };