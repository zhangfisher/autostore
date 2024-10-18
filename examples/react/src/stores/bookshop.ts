import { createStore } from "@autostorejs/react"


export const bookshop = createStore({
    books: [
        { id:1, title: "Learn JavaScript", price: 100, count: 1},
        { id:2, title: "Learn React", price: 200, count: 2 },
        { id:3, title: "Build an app", price: 300, count: 3 }
    ],
    count: (scope:any)=>scope.books.length,
    orders:[
        {id:1,bookId:1,count:1},
        {id:2,bookId:2,count:2},
        {id:3,bookId:3,count:3},
        {id:3,bookId:3,count:1},        
    ]
},{
    id:"bookshop",
    debug:true
})


// @ts-ignore
globalThis.bookshop = bookshop

 
