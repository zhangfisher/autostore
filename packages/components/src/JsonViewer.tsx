import React from "react"
import { JSONTree } from 'react-json-tree'; 

const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: 'white',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#444444',
    base0C: '#a1efe4',
    base0D: '#018ba7',
    base0E: '#81a9ff',
    base0F: '#cc6633',
  };

export const JsonViewer =  (props:React.PropsWithChildren<{data:unknown}>)=>{
    // 默认展开所有节点
    return <JSONTree getItemString={()=>''} hideRoot={true}  shouldExpandNodeInitially={()=>true} {...props} theme={theme}/>
}  

