import { Bench } from 'tinybench';
import { createStore } from "@autostorejs/core"


const bench = new Bench({ 
   time: 1000
});

bench
//   .add('简单同步计算', () => {
//     const store = createStore({ 
//         price: 100,
//         count: 1,
//         total: (scope:any)=>scope.price * scope.count
//     },{immediate:true});
//     for(let i = 1; i <= 10000; i++){
//         store.state.count = i
//     }
//   }) 
  .add('多次依赖简单同步计算', () => {
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
await bench.warmup(); // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
await bench.run();

console.table(bench.table());

// Output:
// ┌─────────┬───────────────┬──────────┬────────────────────┬───────────┬─────────┐
// │ (index) │   Task Name   │ ops/sec  │ Average Time (ns)  │  Margin   │ Samples │
// ├─────────┼───────────────┼──────────┼────────────────────┼───────────┼─────────┤
// │    0    │ 'faster task' │ '41,621' │ 24025.791819761525 │ '±20.50%' │  4257   │
// │    1    │ 'slower task' │  '828'   │ 1207382.7838323202 │ '±7.07%'  │   83    │
// └─────────┴───────────────┴──────────┴────────────────────┴───────────┴─────────┘
 