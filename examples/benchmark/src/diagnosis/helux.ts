import { derive, share } from 'helux';


const [count,setCount] = share({
  count: 0
});
const a1 = derive(() => {
  return count.count+1
});
const a2 = derive(() =>a1.val+1)
const a3 = derive(() =>a2.val+1)
const a4 = derive(() =>a3.val+1)
const a5 = derive(() =>a4.val+1)
const a6 = derive(() =>a5.val+1)
const a7 = derive(() =>a6.val+1)
const a8 = derive(() =>a7.val+1)
const a9 = derive(() =>{
  return a8.val+1
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
 const a10 = derive(() =>{
  return a9.val+1
}) 
for(let i = 1; i <= 10000; i++){
    setCount(draft=>{
        draft.count = i
    })
}

console.log("end")