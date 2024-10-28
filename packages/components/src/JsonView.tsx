/**
 * 
 * 一个简单的JSON数据展示组件
 * 
 */





import React, { useRef,useEffect } from "react" 
// @ts-ignore
import jsonPrettyHtml from "json-pretty-html"
import { styled } from "flexstyled" 
import { prettyPrintJson } from 'pretty-print-json';

export type JsonViewProps  = React.PropsWithChildren<{
    data?:any
    border?:boolean
}> 

const JSONStyle = styled({
    "margin":"4px",
    "& .json-container ":{
        fontFamily: 'menlo, consolas, monospace',
        fontStyle: 'normal',
        fontWeight: 'bold',
        lineHeight: '1.4em',
        fontSize: '0.9rem',
        transition: 'background-color 400ms',
        backgroundColor: 'white',
    },
    "& .json-link":{
        textDecoration: 'none',
        borderBottom: '1px solid',
        outline: 'none',
        color: 'purple',
        "&:hover":{
            backgroundColor: 'transparent',
            outline: 'none',
            color: 'blueviolet',
        }
    },
    "& .json-lines":{
        whiteSpace: 'normal',
        paddingInlineStart: '3em',
        margin: '0px',
        '--colorGraphite': '#303030',
        '--colorCharcoal': '#222222',
        '--colorTar': '#161616',
        "& > li":{
            whiteSpace: 'pre',
            textIndent: '0.7em',
            lineHeight: '1.5em',
            padding: '0px',
            transition: 'all 400ms',
            "&::marker":{
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 'normal',
                color: 'dimgray',
            }

        }
    },
    "& .json-key, .json-string, .json-number, .json-boolean, .json-null, .json-mark, a.json-link, ol.json-lines >li":{ 
        transition: "all 400ms"
    },
    "& .json-container":                   { backgroundColor: "white" },
    "& .json-key":                         { color: "brown" },
    "& .json-string":                      { color: "olive" },
    "& .json-number":                      { color: "navy" },
    "& .json-boolean":                     { color: "teal" },
    "& .json-null":                        { color: "dimgray" },
    "& .json-mark":                        { color: "black" },
    "& a.json-link":                       { color: "purple" },
    "& a.json-link:visited":               { color: "slategray" },
    "& a.json-link:hover":                 { color: "blueviolet" },
    "& a.json-link:active":                { color: "slategray" },
    "& ol.json-lines >li::marker":         { color: "dimgray" },
    "& ol.json-lines >li:nth-child(odd)":  { backgroundColor: "gainsboro" },
    "& ol.json-lines >li:nth-child(even)": { backgroundColor: "whitesmoke" },
    "& ol.json-lines >li:hover":           { backgroundColor: "lemonchiffon"},
},{
    className:"x-json-view",
})
 
export const JsonView:React.FC<JsonViewProps> =(props:JsonViewProps)=>{
    const jsonData = props.data || String(props.children)
    const ref = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        if(ref.current){
            ref.current.innerHTML = prettyPrintJson.toHtml(typeof(jsonData)==='string' ? JSON.parse(jsonData) : jsonData,{
                trailingCommas:false,
                linksNewTab:true
            })
        }
    },[jsonData])
    return <pre className={JSONStyle.className}>
        <span ref={ref} className="json-container"/>
        </pre> 
    
}




// /* Dark Mode */
// .dark-mode .json-container                   { background-color: black; }
// .dark-mode .json-key                         { color: indianred; }
// .dark-mode .json-string                      { color: khaki; }
// .dark-mode .json-number                      { color: deepskyblue; }
// .dark-mode .json-boolean                     { color: mediumseagreen; }
// .dark-mode .json-null                        { color: darkorange; }
// .dark-mode .json-mark                        { color: silver; }
// .dark-mode a.json-link                       { color: mediumorchid; }
// .dark-mode a.json-link:visited               { color: slategray; }
// .dark-mode a.json-link:hover                 { color: violet; }
// .dark-mode a.json-link:active                { color: slategray; }
// .dark-mode ol.json-lines >li::marker         { color: silver; }
// .dark-mode ol.json-lines >li:nth-child(odd)  { background-color: var(--colorCharcoal); }
// .dark-mode ol.json-lines >li:nth-child(even) { background-color: var(--colorTar); }
// .dark-mode ol.json-lines >li:hover           { background-color: dimgray; }