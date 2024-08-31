import { expect,test,describe, beforeEach, afterEach } from "vitest" 
import { createReactiveObject, createScopeObject } from "../src/store/reactive"; 

describe("reactive",()=>{

    test("use scope object",()=>{
        const user = {
            first:"zhang",
            last:"fisher",
            tags:[
                'author','techer',''
            ]
        }
        const events:any[] = []
        const scope1Events:any[] = []
        const scope2Events:any[] = []
        const userObj= createReactiveObject(user,{
            notify:(type, path, indexs , value, oldValue, parentPath, parent)=>{
                events.push(type, path, indexs , value, oldValue, parentPath, parent)
            },
            createDynamicValueObject:()=>{}
        })        
        const userScope1= createScopeObject(userObj,(type, path, indexs , value, oldValue, parentPath, parent)=>{
            scope1Events.push(type, path, indexs , value, oldValue, parentPath, parent)
        }) 
        const userScope2= createScopeObject(userObj,(type, path, indexs , value, oldValue, parentPath, parent)=>{
            scope2Events.push(type, path, indexs , value, oldValue, parentPath, parent)
        }) 
        
        userObj.first="Li"
        userObj.last='WuKong'
        userObj.tags.push("a")
        userObj.tags.push("b")

        userScope1.first ="Wang"
        userScope1.last="BaJie"
        userScope1.tags.push("x")
        userScope1.tags.push("y")

        userScope2.first ="Chen"
        userScope2.last="TangZhen"
        userScope2.tags.push("m")
        userScope2.tags.push("n")









    })

})
