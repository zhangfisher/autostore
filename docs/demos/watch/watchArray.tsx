import React from "react"
import { createStore } from "@autostorejs/react"
import { Button,Layout,Input} from "x-react-components"
import { useEffect,useRef } from "react" 

const { state,watch,useFields } = createStore({
  order:{
    price:10,
    count:2,
    books:[
      "AutoStore实战指南",
      "深入浅出AutoStore",
      "AutoStore最佳实践"
    ]
  } 
})


export default ()=>{
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null) 
 
  useEffect(()=>{
    const watcher = watch("order.books",(operate)=>{      
        ref.current!.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
          ${operate.type} ${operate.path.join('.')}[${operate.indexs![0]}]
        </p>`)
      },{
        operates:['insert','remove','update']
      })
    return ()=>watcher.off()
  },[])  

  const bindBooks = useFields('order.books')


  return (<Layout style={{maxHeight:'400px'}}>
    <div>
        {
          state.order.books.map((book,index)=>{
            return <Input key={index} {...bindBooks[index]} actions={["X"]} 
                onAction={()=>{
                    state.order.books.splice(index,1)
                }}
            />
          })
        }
        <Input ref={inputRef} actions={["+"]} 
            placeholder="请输入书名"
            onAction={(id,val)=>{
                if(String(val).length>0){
                    state.order.books.push(val)
                    inputRef.current!.value=''
                }      
            }}/>       
        <Button onClick={()=>{
          ref.current!.innerHTML = ''
        }}>Clear</Button> 
    </div>
    <div ref={ref} style={{      
        overflowY:'auto',        
      }}>
    </div>
  </Layout>)
}