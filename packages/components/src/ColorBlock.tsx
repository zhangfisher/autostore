/**
 * 每次渲染时变化颜色
 */


import React,{ useRef,useEffect} from "react"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import * as color from "color"
import { ReactFC } from "./types";
// const Colors:string[]=['#4bc703','#eb03c4','#1000eb',"#99170e991",'red','#778888999']
function getRandomColor(){
    const c = `${Math.floor(Math.random() * 16777215).toString(16)}`;
    return `#${c.padStart(6,'0')}`
}
export const ColorBlock:ReactFC<React.PropsWithChildren<{value?:any,name?:string,title?:string}>> =React.memo((props)=>{
  const renderCount = useRef(0)
  const { name,value=''} = props 
  const backgroundColor = getRandomColor()
  let textColor = 'block'
  if(color.rgb(backgroundColor).isDark()){
    textColor = 'white'
    }else{
      textColor ="block"
    }

    useEffect(()=>{
      renderCount.current++
    })

  return (
    <div  {...props} style={{  backgroundColor,padding:'4px',color:textColor,display:'flex',...props.style,alignItems:'center' }}>
      <span style={{flexGrow:1}}>{name ? (<span style={{padding:'2px'}}>{name}=</span>) : ''}<span style={{padding:'2px'}}>{String(value)}{props.children}</span></span>
      <span style={{fontSize:'8px'}}>{renderCount.current}</span>
    </div>
  );
},(prev,next)=>{
  return prev.name === next.name && prev.value === next.value
})
       

export const Block:ReactFC<React.PropsWithChildren<{value?:any,name?:string,title?:string}>> =(props)=>{
  const renderCount = useRef(0)
  const { name,value=''} = props 
  const backgroundColor = getRandomColor()
  let textColor = 'block'
  if(color.rgb(backgroundColor).isDark()){
    textColor = 'white'
    }else{
      textColor ="block"
    }

    useEffect(()=>{
      renderCount.current++
    })

  return (
    <div  {...props} style={{  backgroundColor,padding:'4px',color:textColor,display:'flex',...props.style,alignItems:'center' }}>
      <span style={{flexGrow:1}}>{name ? (<span style={{padding:'2px'}}>{name}=</span>) : ''}<span style={{padding:'2px'}}>{String(value)}{props.children}</span></span>
      <span style={{fontSize:'8px'}}>{renderCount.current}</span>
    </div>
  );
}
       