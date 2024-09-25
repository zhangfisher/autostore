import React  from 'react'
import { Loading } from './Loading'
import { styled } from 'flexstyled'

const ButtonStyle =styled<ButtonProps>({
    padding      : "8px",
    margin       : "4px",
    cursor       : "pointer",
    display      : (props)=>props.visible!==false ? (props.block!==false ? 'inline-flex' : 'flex') : 'none',
    flexDirection: "row",
    borderRadius : "6px",
    alignItems   : "center",
    border       : `1px solid #eee`,    
    background   : "#fafafa",
    textAlign    : 'center',
    userSelect   : "none",
    color        : "#555",
    "&:hover":{
        background:"#2c7af0",
        color:"white",
        borderColor:'#2c7af0'
    },
    "&:active": {
        transform: "scale(0.95)",
        transition: "transform 0.1s"
    }
},{
    className:"speed-button"
})

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
        block?:boolean              // 是否为块级元素
    }>

export const Button:React.FC<ButtonProps> = (props)=>{
    const { loading,timeout=0,progress=0,cancel,onClick} =props 
 
    return (
        <div 
            className={ButtonStyle.className}
            style={ButtonStyle.getStyle(props)}
            onClick={onClick}
        >
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
