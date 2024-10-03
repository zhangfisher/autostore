
import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'


export type LoadingProps ={
    visible?:boolean
    size?: number
    color?:string
    tips?:string
    title?:string
} 
export const Loading:React.FC<LoadingProps> = (props)=>{
    const { size=20,visible=true,color,tips='loading...' } =props    
    return <span 
        title={tips}
        style={{
            display: visible ? 'inline-flex' : 'none',
            cursor:"pointer",
            padding:"2px",            
            alignItems:"center",
        }}>
        <ThreeCircles width={size} height={size} color={color}/>
        {props.title ? <span style={{marginLeft:"4px"}}>{props.title}</span> : null}
    </span>
}
