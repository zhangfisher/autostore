/**
 * 
 * 一个简单的JSON数据展示组件
 * 
 */ 
import React, { useRef,useEffect } from "react"  
import { styled } from "flexstyled" 
import { prettyPrintJson } from 'pretty-print-json';

export type JsonViewProps  = React.PropsWithChildren<{
    data?:any
    border?:boolean
    title?: string;
    highlightKeys?:string[]
    highlightChar?:string
}> 

const JSONStyle = styled<JsonViewProps>({
    "padding":"8px",
    boxSizing: 'border-box',
    border: (props)=>props.border===true ? "1px solid #ccc" : "none" ,
    position: 'relative', 
    "& .json-container ":{
        fontFamily: 'menlo, consolas, monospace',
        fontStyle: 'normal',
        fontWeight: 'bold', 
        fontSize: '0.9rem',
        transition: 'background-color 400ms',
        backgroundColor: 'white',
        position: "relative",
        maxHeight:" 400px",
        overflowX: "hidden",
        overflowY: "auto",
        lineHeight:"calc(100% + 2px)",
        width: "100%",
        display: "block",
        background: "transparent"
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
    "& .json-key.highlight:after":{
        position: 'absolute',
        content:"' '",
        width: '1000px',
        height: '100%',
        top: '0px',
        left:"-2em",
        display: 'inline-block',        
        backgroundColor: '#caf9cc',
        zIndex: -1,
    },
    "& .json-container":  {         
        position: 'relative',
        maxHeight: '500px',
        overflowX: 'hidden',
        overflowY: 'auto',
    },
    "& .json-key":                         { 
        color: "brown", 
        position: 'relative',
        backgroundColor: 'transparent', 
    },
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
            const highlightKeys = props.highlightKeys
            if(highlightKeys){                
                    const els = ref.current!.querySelectorAll("span.json-key")
                    els.forEach((el:any)=>{
                        const key = el.innerText.trim()
                        if(highlightKeys.includes(key)){
                            el.classList.add('highlight')
                        }                        
                    })
            }
        }
    },[jsonData])
    return <pre className={JSONStyle.className} style={JSONStyle.getStyle(props)}>        
      {props.title  ? <span
        style={{
          position: 'absolute',
          padding: "2px 4px 2px 4px",
          top: "-16px",
          background: 'white',
          left: "8px",
          color: 'gray'
        }}
      >
        {props.title}
      </span> : null }
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