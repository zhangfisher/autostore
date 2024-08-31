/**
 * 测试scope算法
 */

import { describe,test,expect } from 'vitest'; 
import { createReactiveObject } from '../src/store/reactive';

describe('get scope', () => {
    test("default scope = current",()=>{
        const notify = (params:any)=>{
            console.log(params)
        }
        const user =  createReactiveObject({
            firstName:"zhang",
            lastName:"fisher"
        },{
            notify,
            createDynamicValueObject:()=>{}
        })
        const userState = Object.create(user)
        userState.notify=(params)=>{
            console.log(params)
        }
        user.firstName = "sss"        
        userState.firstName = "sss"



    })
})