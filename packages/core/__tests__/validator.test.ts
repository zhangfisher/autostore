import { describe,  expect, test } from 'vitest'; 
import { v } from '../src/validate'
import { AutoStore } from '../src/store';
import { ValidateError } from '../src';

// 测试 isEventMatched 函数
describe("validator",()=>{

    test("number initial",()=>{
        const store = new AutoStore({
            order:{
                price: v.number(100,(val)=>val>10)
            }
        })
        expect(store.state.order.price).toBe(100)
        store.validators.has("order.price")
    })
    test("赋值时校验出错默认触发ValidateError",()=>{
        const store = new AutoStore({
            order:{
                price: v.number(100,(val)=>val>10)
            }
        })
        expect(store.state.order.price).toBe(100)
        expect(()=>store.state.order.price=10).toThrow(ValidateError)
        expect(store.state.order.price).toBe(100)
    })
    test("赋值时校验出错时不触发错误忽略",()=>{
        const store = new AutoStore({
            order:{
                price: v.number(100,(val)=>val>10)
            }
        },{
            validator:{
                behavior:'ignore'
            }
        })
        expect(store.state.order.price).toBe(100)
        expect(()=>store.state.order.price=10).not.toThrow(ValidateError)
        expect(store.state.order.price).toBe(100)
    })
    
    test("赋值时校验出错时不触发错误放行",()=>{
        const store = new AutoStore({
            order:{
                price: v.number(100,(val)=>val>10)
            }
        },{
            validator:{
                behavior:'pass'
            }
        })
        expect(store.state.order.price).toBe(100)
        expect(()=>store.state.order.price=10).not.toThrow(ValidateError)
        expect(store.state.order.price).toBe(10)
        expect("order.price" in store.validators.errors).toBe(true)
    })
    test("自定义校验提示",()=>{
        const store = new AutoStore({
            order:{
                price: v.number(100,(val)=>val>10,{errorTips:"价格必须大于10"})
            }
        })
        expect(store.state.order.price).toBe(100)
        store.validators.has("order.price")
        try{
            store.state.order.price = 10
            
        }catch(e:any){
            expect(e).toBeInstanceOf(ValidateError)
            expect(e.message).toBe("价格必须大于10")
            expect(store.validators.errors["order.price"]).toBe("价格必须大于10")
        }        
    })
    test("自定义校验提示",()=>{
        const store = new AutoStore({
            order:{
                price: v.number(100,(val)=>val>10,"价格必须大于10")
            }
        })
        expect(store.state.order.price).toBe(100)
        store.validators.has("order.price")
        try{
            store.state.order.price = 10
            
        }catch(e:any){
            expect(e).toBeInstanceOf(ValidateError)
            expect(e.message).toBe("价格必须大于10")
            expect(store.validators.errors["order.price"]).toBe("价格必须大于10")
        }        
    })
    test("使用函数自定义校验提示",()=>{
        const store = new AutoStore({
            order:{
                price: v.number(100,(val)=>val>10,{errorTips:(path)=>path+":价格必须大于10"})
            }
        })
        expect(store.state.order.price).toBe(100)
        store.validators.has("order.price")
        try{
            store.state.order.price = 10
            
        }catch(e:any){
            expect(e).toBeInstanceOf(ValidateError)
            expect(e.message).toBe("order.price:价格必须大于10")
            expect(store.validators.errors["order.price"]).toBe("order.price:价格必须大于10")
        }        
    })
    test("使用onValidate校验",()=>{
        const store = new AutoStore({
            order:{
                price: 100
            }
        },{
            onValidate:(path,newVal,oldVal)=>{
                expect(path).toEqual(["order","price"])
                expect(newVal).toBe(10)
                expect(oldVal).toBe(100)
                return newVal > 10
            }
        })
        expect(store.state.order.price).toBe(100)
        try{
            store.state.order.price= 5
        }catch(e:any){
            expect(e).toBeInstanceOf(ValidateError)
            expect("order.price" in store.validators.errors).toBe(true)
        }
    })
})
