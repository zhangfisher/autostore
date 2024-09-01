import { expect,test,describe, beforeEach, afterEach } from "vitest" 
import { createReactiveObject, createScopeObject } from "../src/store/reactive"; 

describe("reactive",()=>{

    test("use scope object",()=>{
        // const user = {
        //     first:"zhang",
        //     last:"fisher",
        //     tags:[
        //         'author','engineer','teacher','chef'
        //     ],
        //     address:{
        //         city:"beijing",
        //         street:"chang an",                
        //         zip:"100000",
        //         country:"China",
        //         flags:{
        //             isMain:true,
        //             isDefault:false
        //         }                
        //     }
        // }
        // const events:any[] = []
        // const scope1Events:any[] = []
        // const scope2Events:any[] = []
        // const userObj= createReactiveObject(user,{
        //     notify:(params)=>{
        //         if(params.type=='set' ){
        //             events.push(`${params.type} ${params.path.join(".")}= ${params.value}`)
        //         }else if(params.type=='insert'){
        //             events.push(`${params.type} ${params.path.join(".")}[${params.indexs}]= ${params.value}`)
        //         }       
        //     },
        //     createDynamicValueObject:()=>{}
        // })        
        // const userScope1= createScopeObject(userObj,(params)=>{
        //     if(params.type=='set' ){
        //         scope1Events.push(`${params.type} ${params.path.join(".")}= ${params.value}`)
        //     }else if(params.type=='insert'){
        //         scope1Events.push(`${params.type} ${params.path.join(".")}[${params.indexs}]= ${params.value}`)
        //     }       
        // }) 
        // const userScope2= createScopeObject(userObj,(params)=>{
        //     if(params.type=='set'){
        //         scope2Events.push(`${params.type} ${params.path.join(".")}= ${params.value}`)
        //     }else if(params.type=='insert'){
        //         scope2Events.push(`${params.type} ${params.path.join(".")}[${params.indexs}]= ${params.value}`)
        //     }
        // }) 
        
        // userObj.first="Li" 
        // userObj.first="Li"
        // userObj.first="Li"
        // userObj.first="Li"
        // userObj.last='WuKong'
        // userObj.tags.push("a")
        // userObj.tags.push("b")

        // userScope1.address.city ="QuanZhou"
        // userScope1.first ="Wang"
        // userScope1.last="BaJie"
        // userScope1.first ="Wang1"
        // userScope1.last="BaJie"
        // userScope1.tags.push("x")
        // userScope1.tags.push("y")
        // userScope1.address.flags.isMain = false
        // userScope1.address.flags.isDefault = true
        // userScope1.address.flags.isMain = true
        // userScope1.address.flags.isDefault = false


        // userScope2.address.city ="FuZhou"
        // userScope2.first ="Chen"
        // userScope2.last="TangZhen"
        // userScope2.tags.push("m")
        // userScope2.tags.push("n")
        // userScope2.address.flags.isMain = true
        // userScope2.address.flags.isDefault = false

        // userScope1.address.city ="QuanZhou"
        // userScope1.first ="Wang1"
        // userScope1.last="BaJie2"
        // userScope1.tags.push("x")
        // userScope1.tags.push("y")
        // userScope1.first ="Wang"
        // userScope1.last="BaJie"
        // userScope1.address.flags.isMain = false
        // userScope1.address.flags.isDefault = true


        // expect(events).toStrictEqual([
        //     "update",["first"],[],"Li","zhang",[],userObj,
        //     "update",["last"],[],"WuKong","fisher",[],userObj,
        //     "update",["tags"],[],["author","techer","","a"],["author","techer",""],[],userObj,
        //     "update",["tags"],[],["author","techer","","a","b"],["author","techer","","a"],[],userObj,
        // ]) 

    })

})
