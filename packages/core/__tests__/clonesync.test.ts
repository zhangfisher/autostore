import { test,expect, describe } from "vitest"
import { AutoStore, computed } from "../src"   

describe("同步与克隆",()=>{
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
            expect(toStore.getSnap()).toEqual(store.getSnap({entry:"order"}))
        })   
    })

    describe("Sync to cloned store",()=>{
        test("整体克隆并且同步",async ()=>{
            const store = new AutoStore({
                order:{
                    name:"fisher",
                    price:2,
                    count:3,
                    total: computed((order)=>order.price*order.count)
                }            
            })
            const toStore = store.clone()
            expect(toStore.getSnap()).toEqual(store.getSnap())
            store.state.order.price = 10
            expect(toStore.state.order.price).toBe(10)
            toStore.state.order.price =11
            expect(store.state.order.price).toBe(11)
        })   
        test("克隆部分并且同步",async ()=>{
            const store = new AutoStore({
                order:{
                    name:"fisher",
                    price:2,
                    count:3
                }            
            })
            const toStore = store.clone({entry:"order"})
            expect(toStore.getSnap()).toEqual(store.getSnap({entry:"order"}))
            store.state.order.price = 10
            expect(toStore.state.price).toBe(10)
            toStore.state.price =11
            expect(store.state.order.price).toBe(11)
        })
        test("整体克隆时同步计算属性",async ()=>{
            const store = new AutoStore({
                order:{
                    name:"fisher",
                    price:2,
                    count:3,
                    total: computed((order)=>order.price*order.count)
                }            
            })
            const toStore = store.clone()
            expect(toStore.getSnap()).toEqual(store.getSnap())
            store.state.order.price = 10
            expect(toStore.state.order.price).toBe(10)
            expect(toStore.state.order.total).toBe(30)
            toStore.state.order.price =11
            expect(store.state.order.price).toBe(11)
            expect(store.state.order.total).toBe(33)
        })
        test("同步数组成员",async ()=>{
            const store = new AutoStore({
                order:{
                    tags:["a","b","c"]    
                }            
            })
            const toStore = store.clone()
            expect(toStore.getSnap()).toEqual(store.getSnap())        
            store.state.order.tags[1] = "*"
            expect(toStore.state.order.tags[1]).toBe("*")
            toStore.state.order.tags[1] = "b"
            expect(store.state.order.tags[1]).toBe("b")        
        })
        test("删除数组成员",async ()=>{
            const store = new AutoStore({
                order:{
                    tags:["a","b","c","d"]    
                }            
            })
            const toStore = store.clone()
            expect(toStore.getSnap()).toEqual(store.getSnap())        
            store.state.order.tags.splice(1,1)
            expect(toStore.state.order.tags).toEqual(["a","c","d"])
            toStore.state.order.tags.splice(1,1)
            expect(store.state.order.tags).toEqual(["a","d"])
        })

        test("同步删除多个数组成员",async ()=>{
            const store = new AutoStore({
                order:{
                    tags: Array.from({length:10}).map((_,i)=>i+1),
                }            
            })
            const toStore = store.clone()
            expect(toStore.getSnap()).toEqual(store.getSnap())        
            store.state.order.tags.splice(5,3)
            expect(toStore.state.order.tags).toEqual([1,2,3,4,5,9,10])
            toStore.state.order.tags.splice(2,2)
            expect(store.state.order.tags).toEqual([1,2,5,9,10])
        })
        test("克隆部分时删除数组成员",async ()=>{
            const store = new AutoStore({
                order:{
                    tags:["a","b","c","d"]    
                }            
            })
            const toStore = store.clone({entry:"order"})
            expect(toStore.getSnap()).toEqual(store.getSnap({entry:"order"}))        
            store.state.order.tags.splice(1,1)
            expect(toStore.state.tags).toEqual(["a","c","d"])
            toStore.state.tags.splice(1,1)
            expect(store.state.order.tags).toEqual(["a","d"])
        })

        test("克隆部分时同步删除多个数组成员",async ()=>{
            const store = new AutoStore({
                order:{
                    tags: Array.from({length:10}).map((_,i)=>i+1),
                }            
            })
            const toStore = store.clone({entry:"order"})
            expect(toStore.getSnap()).toEqual(store.getSnap({entry:"order"}))        
            store.state.order.tags.splice(5,3)
            expect(toStore.state.tags).toEqual([1,2,3,4,5,9,10])
            toStore.state.tags.splice(2,2)
            expect(store.state.order.tags).toEqual([1,2,5,9,10])
        })
        test("删除对象成员",async ()=>{
            type OrderType = {
                order:{
                    a?: number
                    b?: number
                    c?: number
                    d?: number
                    e?: number
                }
            }
            const store = new AutoStore<OrderType>({
                order:{
                    a:1,
                    b:2,
                    c:3,
                    d:4,
                    e:5
                }            
            })
            const toStore = store.clone()
            expect(toStore.getSnap()).toEqual(store.getSnap())        
            delete store.state.order.a
            expect(toStore.state.order).toEqual({b:2,c:3,d:4,e:5})
            delete toStore.state.order.b
            expect(store.state.order).toEqual({c:3,d:4,e:5})
            delete toStore.state.order.c
            expect(store.state.order).toEqual({d:4,e:5})
            delete toStore.state.order.d
            expect(store.state.order).toEqual({e:5})
            delete toStore.state.order.e
            expect(store.state.order).toEqual({})

        })
    })

    describe("Sync to other store",()=>{
        test("同步指定路径的对象到其他store",async ()=>{
            const store1 = new AutoStore({
                order:{
                    name:"fisher",
                    price:2,
                    count:3,
                    total: computed((order)=>order.price*order.count)
                }            
            })
            const store2 = new AutoStore<typeof store1.state.order>()
            store1.sync(store2,{from:"order"})
            expect(store2.state).toEqual(store1.state.order)        
            store1.state.order.count =4
            expect(store2.state.count).toBe(4)
            expect(store2.state.total).toBe(8)
            store2.state.count = 5
            expect(store1.state.order.count).toBe(5)
            expect(store1.state.order.total).toBe(10)
        })   
        test("同步指定路径的对象到其他store的指定路径",async ()=>{
            const store1 = new AutoStore({
                order:{
                    name:"fisher",
                    price:2,
                    count:3,
                    total: computed((order)=>order.price*order.count)
                }            
            })
            const store2 = new AutoStore<{myorder:typeof store1.state.order}>({
                // @ts-ignore
                myorder:{}
            })
            store1.sync(store2,{from:"order",to:"myorder"})
            expect(store2.state.myorder).toEqual(store1.state.order)        
            store1.state.order.count = 4
            expect(store2.state.myorder.count).toBe(4)
            expect(store2.state.myorder.total).toBe(8)
            store2.state.myorder.count = 5
            expect(store1.state.order.count).toBe(5)
            expect(store1.state.order.total).toBe(10)
        })  
        test("同步指定路径的简单数值到其他store的指定路径",async ()=>{
            const store1 = new AutoStore({
                order:{
                    name:"fisher",
                    price:2,
                    count:3,
                    total: computed((order)=>order.price*order.count)
                }            
            })
            const store2 = new AutoStore<{myorder:typeof store1.state.order}>({
                // @ts-ignore
                myorder:{
                    count:1,
                }
            })
            store1.sync(store2,{from:"order.count",to:"myorder.count"})
            expect(store2.state.myorder.count).toEqual(store1.state.order.count)        
            store1.state.order.count = 4
            expect(store2.state.myorder.count).toBe(4)
            store2.state.myorder.count = 5
            expect(store1.state.order.count).toBe(5)
            expect(store1.state.order.total).toBe(10)        
        })  
        test("同步指定路径的数组其他store的指定路径",async ()=>{
            const store1 = new AutoStore({
                order:{
                    values:[1,2,3,4,5,6,7,8,9]
                }            
            })
            const store2 = new AutoStore<{myorder:typeof store1.state.order}>({
                // @ts-ignore
                myorder:{
                    values:[]
                }
            })
            store1.sync(store2,{from:"order.values",to:"myorder.values"})
            expect(store2.state.myorder.values).toEqual(store1.state.order.values)        
            store1.state.order.values.push(0)
            expect(store2.state.myorder.values).toEqual(store1.state.order.values)        
            store1.state.order.values.splice(1,2)
            expect(store2.state.myorder.values).toEqual(store1.state.order.values)        
            store2.state.myorder.values.splice(1,3,10,11)
            expect(store1.state.order.values).toEqual(store1.state.order.values)

        })  
    })
    test("同步时仅指定to时能过滤其他无效的路径",async ()=>{
        const store1 = new AutoStore({
            x:{ a:1, b:2, c:3 },
            y:{ a:1, b:2, c:3 }
        })
        const store2 = new AutoStore({
            order:{ a:1, b:2, c:3 }            
        })

        store1.sync(store2,{to:"x.y"})
        // @ts-ignore
        expect(store2.state.x.y).toEqual(store1.state)

    })

    test("多对一同步",async ()=>{
        const store = new AutoStore({
            x:{ a1:1, b1:2, c1:3 },
            y:{ a2:1, b2:2, c2:3 },
            z:{ a3:1, b3:2, c3:3 }
        })
        const store1 = new AutoStore({
             a1:1, b1:2, c1:3 
        })
        store1.sync(store,{to:"x"})
        const store2 = new AutoStore({
            a2:1, b2:2, c2:3             
        })
        store2.sync(store,{to:"y"})
        const store3 = new AutoStore({
            a3:1, b3:2, c3:3 
        })
        store3.sync(store,{to:"z"})

        store1.state.a1 = 10
        expect(store.state.x.a1).toBe(10)
        store.state.x.a1 = 11
        expect(store1.state.a1).toBe(11)

        store2.state.a2 = 10
        expect(store.state.y.a2).toBe(10)
        store.state.y.a2 = 11
        expect(store2.state.a2).toBe(11)

        store3.state.a3 = 10
        expect(store.state.z.a3).toBe(10)
        store.state.z.a3 = 11
        expect(store3.state.a3).toBe(11)

    })
    test("一对多同步",async ()=>{
        const store = new AutoStore({
            x:{ a1:1, b1:2, c1:3 },
            y:{ a2:1, b2:2, c2:3 },
            z:{ a3:1, b3:2, c3:3 }
        })
        const store1 = new AutoStore({
             a1:1, b1:2, c1:3 
        })
        store.sync(store1,{from:"x"})

        const store2 = new AutoStore({
            a2:1, b2:2, c2:3             
        })
        store.sync(store2,{from:"y"})

        const store3 = new AutoStore({
            a3:1, b3:2, c3:3 
        })
        store.sync(store3,{from:"z"})

        store1.state.a1 = 10
        expect(store.state.x.a1).toBe(10)
        store.state.x.a1 = 11
        expect(store1.state.a1).toBe(11)

        store2.state.a2 = 10
        expect(store.state.y.a2).toBe(10)
        store.state.y.a2 = 11
        expect(store2.state.a2).toBe(11)

        store3.state.a3 = 10
        expect(store.state.z.a3).toBe(10)
        store.state.z.a3 = 11
        expect(store3.state.a3).toBe(11)

    })
    test("同步时路径映射",async ()=>{
        // order.a <-> myorder['order.a']
        const fromStore = new AutoStore({
            order:{
                a:1, b:2, c:3 
            }             
        })
        const toStore = new AutoStore({
            myorder:{}
        })
        fromStore.sync(toStore,{
            to:"myorder",
            immediate:false,
            pathMap:{
                to:(path:string[])=>{
                    return [path.join(".")]
                },
                from:(path:string[])=>{
                    return path.reduce<string[]>((result,cur)=>{
                        result.push(...cur.split("."))
                        return result
                    },[])
                }
            }
        })
        fromStore.state.order.a = 11
        fromStore.state.order.b = 12
        fromStore.state.order.c = 13

        expect(toStore.state).toEqual({
            myorder:{
                'order.a':11,
                'order.b':12,
                'order.c':13
            }})
        // @ts-ignore
        toStore.state.myorder['order.a'] = 21
        // @ts-ignore
        toStore.state.myorder['order.b'] = 22
        // @ts-ignore
        toStore.state.myorder['order.c'] = 23
        
        expect(fromStore.state).toEqual({
            order:{
                a:21, b:22, c:23 
            }})

    })
    test("指定同步路径映射时进行一次全同步",async ()=>{
        // order.a <-> myorder['order.a']
        const fromStore = new AutoStore({
            order:{
                a:1, b:2, c:3,                
            },
            user:{
                tags:['x','y','z']
            }             
        })
        const toStore = new AutoStore({
            myorder:{}
        })
        fromStore.sync(toStore,{
            to:"myorder", 
            pathMap:{
                to:(path:string[],value:any)=>{
                    if(typeof(value)!=='object'){
                        return [path.join(".")]
                    }                    
                },
                from:(path:string[],value:any)=>{
                    if(typeof(value)!=='object'){
                        return path.reduce<string[]>((result,cur)=>{
                            result.push(...cur.split("."))
                            return result
                        },[])
                    }
                }
            }
        }) 
        expect(toStore.state).toEqual({
            myorder:{
                'order.a':1,
                'order.b':2,
                'order.c':3,
                'user.tags.0':'x',
                'user.tags.1':'y',
                'user.tags.2':'z'
            }}) 

        fromStore.state.order.a = 11
        fromStore.state.order.b = 12
        fromStore.state.order.c = 13

        expect(toStore.state).toEqual({
            myorder:{
                'order.a':11,
                'order.b':12,
                'order.c':13,
                'user.tags.0':'x',
                'user.tags.1':'y',
                'user.tags.2':'z'
            }}) 
        // @ts-ignore
        toStore.state.myorder['order.a'] = 21
        // @ts-ignore
        toStore.state.myorder['order.b'] = 22
        // @ts-ignore
        toStore.state.myorder['order.c'] = 23
        
        expect(fromStore.state).toEqual({
            order:{
                a:21, b:22, c:23 
            },
            user:{
                tags:['x','y','z']
            }  
        })
    })
})