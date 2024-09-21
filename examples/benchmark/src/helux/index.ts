import { share,derive } from "helux"; 
import { Bench } from 'tinybench'; 


const bench = new Bench({ 
   time: 1000
});

bench 
  .add('多次依赖派生计算', () =>{  
    const [info,setInfo] = share({
      count: 50
    });
    
    
    const a1 = derive(() => {
      return info.count+1
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
        setInfo(draft=>{
            draft.count = i
        })
    }

  }) 
await bench.warmup(); // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
await bench.run();

console.table(bench.table());
 