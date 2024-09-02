import { expect,test,describe, beforeEach, afterEach } from "vitest" 
import { createReactiveObject } from "../src/store/reactive"

describe("响应式对象",()=>{

    test("use scope object",()=>{
        const user = {
            first:"zhang",
            last:"fisher",
            tags:[
                'author','engineer','teacher','chef'
            ],
            address:{
                city:"beijing",
                street:"chang an",                
                zip:"100000",
                country:"China",
                flags:{
                    isMain:true,
                    isDefault:false
                }                
            }
        }
        const events:any[] = [] 
        const userObj= createReactiveObject(user,{
            notify:(params)=>{
                if(params.type=='set' ){
                    events.push(`${params.type} ${params.path.join(".")}= ${params.value}`)
                }else if(params.type=='insert'){
                    events.push(`${params.type} ${params.path.join(".")}[${params.indexs}]= ${params.value}`)
                }       
            },
            createComputedObject:()=>{}
        })        
        userObj.address
        userObj.address

    })

})
