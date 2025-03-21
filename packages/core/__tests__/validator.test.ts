import { describe, it, expect, vi, test } from 'vitest'; 
import { v } from '../src/validate'
import { AutoStore } from '../src/store';
import { ValidateError } from '../src';
// 测试 isEventMatched 函数
describe("validator",()=>{

    test("number initial",()=>{
        const store = new AutoStore({
            a:v.number(100)
        })
        expect(store.state.a).toBe(100)
    })
    test("number initial",()=>{
        const store = new AutoStore({
            order:{
                price: v.number(100,(val)=>val>10)
            }
        })
        expect(store.state.order.price).toBe(100)
        expect(()=>store.state.order.price=10).toThrow(ValidateError)
    })
})
