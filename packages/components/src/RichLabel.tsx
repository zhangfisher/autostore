/**
 * 显示一段具备格式的文本内容
 * 
 * @example
 * 
 * <RichLabel text="My name is {tom},I'm {age} years old"" color="red"></RichLabel> 
 * text内容中使用{}包裹的内容使用red进行渲染
 * 
 * @example
 * 
 * <RichLabel text="My name is {tom},I'm {age} years old" color={tom:"blue",age:"red"}></RichLabel>
 *  tom采用蓝色渲染，age采用红色渲染
 * 
 * @example
 * 
 *  <RichLabel text="My name is {tom},I'm {age} years old" color={default:"blue",age:"red"}></RichLabel>
     age采用红色渲染，其他采用蓝色渲染
 * @example  
   支持通过正则表达式进行匹配着色
   <RichLable text="{"a":1,"b"}" rules={
        "red":/\d+/,
        "green":/true|false/,
        "color:red;padding:2px":/\d{1}-\d{1}/,
   }></RichLable>       
 */ 
import React, { CSSProperties } from "react"

 export interface RichLabelProps {
    text:string
    color?:string | Record<string,string>
    rules?:Record<string,RegExp>
    style?:CSSProperties
    className?:string
}
export const RichLabel:React.FC<RichLabelProps> =(props:RichLabelProps)=>{
    const {text,color='#ff6c00',rules } = props
    const colors:Record<string,string> = typeof(color) === 'string' ? {default:color} :  Object.assign({default:""},color)
    let html = text 
    // 处理正则表达式着色，优先级高于插值
    if(rules){
       Object.entries(rules).forEach(([style,rule])=>{ 
        html = html.replace(rule,match=>{
                const css = style.includes(":") ? style : `color:${style};`
                return `<span style='${css}'>${match}</span>`
            })
        })
    }else{
        html = text.replace(/\{\s?(.*?)\s?\}/gm,(_,word)=>{
            return `<span style='color: ${ word in colors ? colors[word] : colors.default}'>${word}</span>`
        }).replaceAll("undefined","空值")
    }
    return (
        <div
            className ={props.className}
            style={{ 
                boxSizing: "border-box",
                padding: "8px",
                margin:"4px",
                color:"#222",
                ...props.style
        }}>
            <span dangerouslySetInnerHTML={{__html:html}}></span>
        </div>
    )
} 
 