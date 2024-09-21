import { Bench } from 'tinybench';
import { createStore } from "@autostorejs/core"
import { derive, share } from 'helux';


const bench = new Bench({ 
   time: 1000
});

bench 
  .add('[AutoStore] 多重依赖链计算', () => {
    const store = createStore({ 
        a0: 50,
        a1: (scope:any)=>scope.a0 + 1,
        a2: (scope:any)=>scope.a1 + 1,
        a3: (scope:any)=>scope.a2 + 1,
        a4: (scope:any)=>scope.a3 + 1,
        a5: (scope:any)=>scope.a4 + 1,
        a6: (scope:any)=>scope.a5 + 1,
        a7: (scope:any)=>scope.a6 + 1,
        a8: (scope:any)=>scope.a7 + 1,
        a9: (scope:any)=>scope.a8 + 1,
        a10: (scope:any)=>scope.a9 + 1,
    },{immediate:true});
    for(let i = 1; i <= 10000; i++){
        store.state.a0 = i
    }
  }) 
  .add('[Helux] 多重依赖链计算', () => {
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
      const a9 = derive(() =>a8.val+1)
      const a10 = derive(() =>a9.val+1) 
      for(let i = 1; i <= 10000; i++){
          setCount(draft=>{
              draft.count = i
          })
      }
  }) 
await bench.warmup(); // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
await bench.run();

console.table(bench.table());
 