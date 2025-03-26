import { test,expect, describe } from "vitest"
import { AutoStore, computed } from "../src" 
import { b } from "vitest/dist/chunks/suite.CcK46U-P.js"

describe("克隆Store",()=>{
    test("整体克隆",async ()=>{
        const store = new AutoStore({
            order:{
                name:"fisher",
                price:2,
                count:3
            }            
        })
        const toStore = store.clone()
        expect(toStore.getSnap()).toEqual(store.getSnap())
    })   
    test("克隆部份",async ()=>{
        const store = new AutoStore({
            order:{
                name:"fisher",
                price:2,
                count:3
            }            
        })
        const toStore = store.clone({entry:"order"})
        expect(toStore.getSnap()).toEqual(store.getSnap({entry:["order"]}))
    })   
})


describe("Sync other store",()=>{
    test("同步",async ()=>{
        const store1 = new AutoStore({
            order:{
                name:"fisher",
                price:2,
                count:3,
                total: computed((order)=>order.price*order.count)
            }            
        })
        const store2 = new AutoStore<(typeof store1.state)['order']>()
        store1.sync(store2,{from:"order"})
        expect(store2.state).toEqual(store1.state.order)
        
    })   
})
