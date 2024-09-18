import React, { useEffect, useRef } from 'react'
import { Loading } from './Loading'

export type ButtonProps =React.PropsWithChildren<
    React.ButtonHTMLAttributes<any> 
    & {
        visible?:boolean
        enable?:boolean,
        loading?:boolean
        timeout?:number
        progress?:number
        error?:string
        cancel?:()=>any
    }>

export const Button:React.FC<ButtonProps> = (props)=>{
    const { visible=true,loading,timeout=0,progress=0,cancel,onClick} =props 
    const ref = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        if(ref.current){
            ref.current.style.display = visible ? 'flex' : 'none'
        }    
    })
    return (
        <div
            ref={ref}
            className='speed-button'
            onClick={onClick}
         style={{
            padding:"8px",
            margin:"4px",
            cursor:"pointer",
            display: visible ? 'flex' : 'none',
            flexDirection:"row",
            borderRadius:"6px",
            alignItems:"center",
            border:`1px solid #bbb`,
            background:"#eee",
            textAlign:'center'
        }}>
            {loading ? <Loading/> : null}
            <div 
                style={{flexGrow:1,backgroundColor:'transparent'}}
            >   
                {props.children}        
            </div>  
            {/* 显示超时  */}
                {timeout >0 ? <span style={{
                    padding:"4px",
                    color:"red",
                    backgroundColor:"#eee",
                    borderRadius:"4px",
                }}>{timeout}</span> : '' }
                
            {/* 显示进度  */}
            {progress >0 ? <span style={{
                    padding:"4px",
                    color:"red",
                    backgroundColor:"#eee",
                    borderRadius:"4px",
                }}>{progress}%</span> : '' }
            {/* 显示错误 */}            
                {
                    props.error ? <span style={{
                        padding:"4px",
                        color:"red",
                        backgroundColor:"#eee",
                        borderRadius:"4px",
                    }}>{props.error}</span> : ''
                }
            {/* 显示取消按钮 */}
            {props.loading && typeof(cancel) === 'function' ? 
                <button onClick={cancel} style={{            
                        padding:"4px",
                        color:"red",
                        margin:"2px",
                        fontSize:"10px",
                        backgroundColor:"#eee",
                        borderRadius:"4px",
                        cursor:"pointer"
                    }}> 单击取消</button> : ''}
    </div>
    )
}
