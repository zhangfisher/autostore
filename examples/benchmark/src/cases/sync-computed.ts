import { Bench } from 'tinybench';
import {  AutoStore } from "autostore"
import { derive, share } from 'helux';
import { MobxStore } from './mobx.store';


const bench = new Bench({ 
  time: 1000, 
  iterations: 100,
});
const autoStore = new AutoStore({ 
    a: 50,
    b: (scope:any)=>{
      return scope.a + 1
    }
});
const heluxStore =share({
    value: 0
});

bench   
  // *********  基本的依赖计算  *********  
  .add('[AutoStore] 同步依赖计算', () => { 
   
    for(let i = 1; i <= 1000; i++){      
        autoStore.state.a = i
    } 
  }) 
  .add('[Helux] 同步依赖计算', () => { 
    const [a,setA] =heluxStore
      const b = derive(() => {
        return a.value+1
      }); 
      for(let i = 1; i <= 1000; i++){
        setA(draft=>{
              draft.value = i
          }) 
      } 
  }) 
  .add('[Mobx] 简单的依赖计算', () => { 
    const store = new MobxStore();
    for (let i = 1; i <= 1000; i++) {
      store.setA0(i); 
    }
  });  

(async () => {
    //await bench.warmup(); // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
    await bench.run();
    console.table(bench.table());
})();
