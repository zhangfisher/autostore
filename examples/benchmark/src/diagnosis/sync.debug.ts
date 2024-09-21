import  { createStore } from "@autostorejs/core"


const store = createStore({ 
    a0: 50,
    a1: (scope:any)=>{
      return scope.a0 + 1
    },
    a2: (scope:any)=>{
      return scope.a1 + 1
    },
    a3: (scope:any)=>{
      return scope.a2 + 1
    },
    a4: (scope:any)=>{
      return scope.a3 + 1
    },
    a5: (scope:any)=>{
      return scope.a4 + 1
    },
    a6: (scope:any)=>{
      return scope.a5 + 1
    },
    a7: (scope:any)=>{
      return scope.a6 + 1
    },
    a8: (scope:any)=>{
      return scope.a7 + 1
    },
    a9: (scope:any)=>{
      return scope.a8 + 1
    },
    a10: (scope:any)=>{
      return scope.a9 + 1
    },
},{immediate:true});
for(let i = 1; i <= 1; i++){
    store.state.a0 = i
}


console.log("end")