import React from "react"
import { useStore,computed } from "@autostorejs/react"
import { Box,Button,ColorBlock } from "x-react-components"
import { useRef } from "react"
    // 转义HTML特殊字符
const escapeHtml = (str: string) => str.replace(/&/g, "&amp;")
                                        .replace(/</g, "&lt;")
                                        .replace(/>/g, "&gt;")
                                        .replace(/"/g, "&quot;")
                                        .replace(/'/g, "&#039;");
export default ()=>{
  const ref = useRef<any>()
  const { state, $ } = useStore({
    price:100,
    count:2,
    total:computed((scope)=>scope.price*scope.count)
  },{
      debug:true,  // 开启调试模式
      log:(info,level='info')=>{
        const message = typeof(info)==='function' ? info() : (info instanceof Error ? info.message : info)
        ref.current && ref.current.insertAdjacentHTML("beforeend",
        `<p style='margin:2px;'}>
        <b>[${level}]</b> - ${escapeHtml(message)}</p>`)
      }
  })
 
  return <div> 
      <ColorBlock name="Price">{$('price')}</ColorBlock>
      <ColorBlock name="Count">
        <Button onClick={()=>state.count--}>-</Button>
        {$('count')}
        <Button onClick={()=>state.count++}>+</Button>
      </ColorBlock>
      <ColorBlock name="Total">{$('total')}</ColorBlock> 
      <Button onClick={()=>ref.current.innerHTML=''}>Clear</Button>
    <Box ref={ref}>
    </Box>
  </div>
} 