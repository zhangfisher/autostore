import React from 'react';
import { createStore } from '@autostorejs/react';
import{ Button,Table } from "x-react-components"

const store = createStore({
  books:[
    {name:'张三',price:18,author:'tom',count:2,total:(book)=>book.price*book.count},
    {name:'李四',price:19,author:'jack',count:3,total:(book)=>book.price*book.count}
  ],
  total:(state)=>state.books.reduce((total,book)=>total+book.total,0)
})

export default ()=>{
  const [state,setState] = store.useReactive()
  return <Table 
    cols={[
        '书名','作者','单价','数量','小计'
    ]}
    rows={[
            ...state.books.map((book,index)=>{
                return [   
                    book.name,
                    book.author,
                    book.price,
                    ()=>{
                        return <>    <Button onClick={()=>store.state.books[index].count--}>-</Button>
                        {book.count}
                        <Button onClick={()=>store.state.books[index].count++}>+</Button>
                        </>
                    },
                    book.total
                ]
            }),
            ['总计',null,null,'',state.total]
        ]}
  />
    
}