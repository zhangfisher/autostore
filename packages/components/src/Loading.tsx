
import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'


export type LoadingProps ={
    visible?:boolean
    size?: number
    color?:string
    tips?:string
} 
export const Loading:React.FC<LoadingProps> = (props)=>{
    const { size=20,visible=true,color,tips='loading...' } =props    
    return <span 
        title={tips}
        style={{
            display: visible ? 'inline-block' : 'none',
            cursor:"pointer",
            padding:"2px"
        }}>
        <ThreeCircles width={size} height={size} color={color}/>
    </span>
}
