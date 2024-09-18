import React from "react"
import { Dict, ReactFC } from "./types"
// import { ColorBlock } from "./ColorBlock"
import { Loading } from "./Loading"
import { ChangeEventHandler } from "react"

// 默认同步字段属性
export interface DefaultFieldPropTypes{
    value        : any
    initial?     : any                   // 表单默认值
    oldValue?    : any                   // 旧值
    title?       : string;               // 标题
    help?        : string;               // 提示信息
    placeholder? : string;               // 占位符
    required?    : boolean;              // 是否必填
    readonly?    : boolean;              // 是否只读
    visible?     : boolean;              // 是否可见
    enable?      : boolean               // 是否可用
    dirty?       : boolean                // 数据已经更新过
    validate?    : boolean;              // 验证
    select?      : any[]                 // 枚举值
  }  
  
  
   // 完整的字段描述
  export type Value = {value:any}
  
  
  // 传递给字段组件的渲染参数
  export type FieldRenderProps<PropTypes extends Dict>= Required<Omit<DefaultFieldPropTypes,keyof PropTypes> & PropTypes> & {
    sync	  	    : (debounce?:number)=>ChangeEventHandler	   		  		                    // 同步状态表单计算
    update	  	  : (valueOrUpdater:PropTypes['value'] | ((field:PropTypes)=>void),options?:{debounce?:number})=>any
    cancel        : ()=>void        	  	   
    initial       : PropTypes['value'] | undefined
    oldValue      : PropTypes['value'] 
  } 

  
  
export const ValidResult:React.FC<FieldProps> = ({validate,help})=>{
    if(validate==undefined) return 
    // 如果是同步校验，则validate是一个boolean
    const isAsycValidate = typeof(validate)!=='boolean'
    //
    const isValid = isAsycValidate ? validate?.result :  validate 
    
    const isValiding = isAsycValidate ? validate?.loading: false
    
    // 无效时的提示
    const invalidTips:string= isAsycValidate ? validate?.error : help
    return <span style={{
        color:'red',
        display: isValiding || !isValid ? 'flex'  : 'none' 
    }}>         
    <Loading visible={isValiding} tips="正在验证..."/>
    { !isValiding && (isValid ?  '' : invalidTips ) }
</span>
}


export type FieldProps = Partial<FieldRenderProps<any>> & {memo?:string}

export const Field:ReactFC<FieldProps> = (props)=>{
    const {enable=true,visible=true,label='',children='',memo} = props 
    return  (
        <div  className="field"  style={{
            position:'relative',
            display: visible===false ? 'none' : 'flex',
            boxSizing:"border-box",
            flexDirection:"row",
            width:'100%',
            alignItems:"center",
            padding:"8px"
        }}>   
            <label  className="field-label"  style={{
                minWidth:'160px',
                fontWeight:'bold',
                color: enable===false ? 'gray' : 'inherit'
            }}>{label}:</label>
            <span className="field-value" style={{
                flexGrow:1,
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                color: enable===false ? 'gray' : 'inherit'
            }}>{typeof(children) === 'function' ? '' : children}{memo && <span style={{color:'gray'}}>{memo}</span>}</span>  
            
            <ValidResult {...props}/>
            {/* <ColorBlock style={{
                position:'absolute',
                right:0,
                fontSize:'10px',
                borderRadius: '4px',
            }}  title="渲染计数"/>      */}
        </div>   
    )
}
