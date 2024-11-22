import { describe, it, expect, vi, test } from 'vitest';
import { AutoStore, isRaw,markRaw } from '../src';

// 测试 isEventMatched 函数
describe("reactive",()=>{
    test("use markRaw for object",()=>{
        const store = new AutoStore({
            a:1,
            b:2,
            c:3,
            x:markRaw({
                x1:1,
                x2:2,
                x3:{
                    x31:1,
                    x32:2
                }
            })
        })
        store.watch(({path})=>{
            path  // ['a']
        },{operates:'read'})  
        expect(isRaw(store.state.a)).toBe(false)
        expect(isRaw(store.state.x)).toBe(true)
        let xxx = store.state.x.x1
        store.state.x.x2        
        store.state.x.x3.x31
        store.state.x.x3.x32
    })
})