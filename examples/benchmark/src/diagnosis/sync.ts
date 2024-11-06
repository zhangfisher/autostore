import { AutoStore } from "autostore"


const store = new AutoStore({ 
    a0: 50,
    a1: (scope:any)=>{
      return scope.a0 + 1
    },
    // a2: (scope)=>scope.a1 + 1,
    // a3: (scope)=>scope.a2 + 1,
    // a4: (scope)=>scope.a3 + 1,
    // a5: (scope)=>scope.a4 + 1,
    // a6: (scope)=>scope.a5 + 1,
    // a7: (scope)=>scope.a6 + 1,
    // a8: (scope)=>scope.a7 + 1,
    // a9: (scope)=>scope.a8 + 1,
    // a10: (scope)=>scope.a9 + 1,
});
for(let i = 1; i <= 1; i++){
    store.state.a0 = i
}


console.log("end")