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
 * 
 */ 
import React from "react"

 export interface RichLabelProps {
    text:string
    color?:string | Record<string,string>
}
export const RichLabel:React.FC<RichLabelProps> =(props:RichLabelProps)=>{
    const {text,color='#ff6c00' } = props
    const colors:Record<string,string> = typeof(color) === 'string' ? {default:color} :  Object.assign({default:""},color)
    const html = text.replace(/\{\s?(.*?)\s?\}/gm,(_,word)=>{
        return `<span style='color: ${ word in colors ? colors[word] : colors.default}'>${word}</span>`
    }).replaceAll("undefined","空值")
    return (
        <div style={{
            backgroundColor: "#fffcda",
            borderLeft: "2px solid rgb(253, 138, 6)",
            boxSizing: "border-box",
            padding: "8px",
            margin:"4px"
        }}>
            <span dangerouslySetInnerHTML={{__html:html}}></span>
        </div>
    )
} 
 