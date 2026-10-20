
import {AutoStore } from "../src"

const store = new AutoStore({
    items:[
        {name:"a",count:1},
        {name:"b",count:2},
        {name:"c",count:3}
    ],
    count: (scope:any)=>scope.items.length,
    sum: (scope:any)=>{
        return scope.items.reduce((pre:number,cur:any)=>{
            return pre+cur.count
        },0)
    }
})

store.watch("items", (op) => {
    console.log(`${op.type} ${op.path.join(".")}  indexs: ${JSON.stringify(op.indexs)}`)
    console.log(`count=${store.state.count}  sum=${store.state.sum}`)    
},{
    depth:1
}); 
console.log("count=",store.state.count,"sum=",store.state.sum)
store.state.items[1].count++
console.log("count=",store.state.count,"sum=",store.state.sum)