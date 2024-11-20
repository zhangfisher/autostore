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

 export type RichLabelProps  = React.PropsWithChildren<{
    text?:string
    color?:string | Record<string,string>
    rules?:Record<string,RegExp>
    style?:CSSProperties
    className?:string
    inline?:boolean
}>
function escapeHtmlString(str:string){
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
export const RichLabel:React.FC<RichLabelProps> =(props:RichLabelProps)=>{
    const {text,color='#ff6c00',rules } = props
    const colors:Record<string,string> = typeof(color) === 'string' ? {default:color} :  Object.assign({default:""},color)
    let html = escapeHtmlString(text || String(props.children))

    // 处理正则表达式着色，优先级高于插值
    if(rules){
       Object.entries(rules).forEach(([style,rule])=>{ 
        html = html.replace(rule,match=>{
                const css = style.includes(":") ? style : `color:${style};`
                return `<span style='${css}'>${match}</span>`
            })
        })
    }else{
        html = html.replace(/\{\s?(.*?)\s?\}/gm,(_,word)=>{
            return `<span style='color: ${ word in colors ? colors[word] : colors.default}'>${word}</span>`
        }).replaceAll("undefined","空值")
    }
    return (
        <div
            className={'x-richlabel ' + (props.className || '')}
            style={{ 
                display:props.inline ? "inline-block" : "block",
                boxSizing: "border-box",
                padding: "2px 0px 2px 0px",
                margin:"0px",
                color:"#222",
                ...props.style
        }}>
            <span dangerouslySetInnerHTML={{__html:html}}></span>
        </div>
    )
} 
 