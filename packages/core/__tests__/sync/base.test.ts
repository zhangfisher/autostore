import { test,expect, describe } from "vitest"
import { createStore,computed,  ComputedObject } from "../.." 
import { CyleDependError } from "../../src/errors"
 

describe("同步计算属性的基本特性",()=>{

    test("默认同步计算",async ()=>{
        const store = createStore({
            price:2,
            count:3,
            total:computed((scope)=>{
                return scope.price * scope.count
            })
        })
        store.state.count = 4
        expect(store.state.total).toBe(8)
    })  
    

    test('简单的同步计算,默认scope指向current', () => {     
        const store = createStore({
            user:{
                firstName: 'zhang',
                lastName: 'fisher',
                fullName: (scope:any) => `${scope.firstName} ${scope.lastName}`
            }            
        });
        expect(store.state.user.fullName).toBe('zhang fisher')
        store.state.user.firstName = 'li'
        expect(store.state.user.fullName).toBe('li fisher')        
    })
    
    test("不使用computed函数的同步计算",async ()=>{
        const store = createStore({
            price:2,
            count:3,
            total:(scope:any)=>{
                return scope.price * scope.count
            }
        })
        store.state.count = 4
        expect(store.state.total).toBe(8)
    })  
    test("默认this指向计算对象",()=>{
        return new Promise<void>((resolve)=>{
            const store = createStore({
                order:{                
                    price:2,
                    count:3,
                    total:computed(function(this:ComputedObject){ 
                        expect(this.store.state.order.price).toBe(2)
                        expect(this.store.state.order.count).toBe(3)
                        resolve()
                    })
                }
            })
            store.state.order.total // 读取操作时创建计算属性
        })        
    }) 
    test("通过计算对象实例读取同步计算值",async ()=>{
        const store = createStore({
            price:2,
            count:3,
            total:computed<number>((scope)=>{
                return scope.price * scope.count
            },{id:"a"})
        })
        store.state.count = 4
        expect(store.state.total).toBe(8)
        expect(store.computedObjects.get("a")!.value).toBe(8)
    }) 
    
    test("手动执行同步计算属性的计算函数",()=>{
        return new Promise<void>((resolve)=>{
            const results:any[]=[]
            const store = createStore({
                price:2,
                count:3,
                total:computed((scope)=>{
                    results.push(scope)
                    if(results.length===2){
                        resolve()
                    }
                    return scope.price * scope.count
                },{id:'x'}),         
            })                                    
            store.on("computed:created",()=>{
                store.computedObjects.get("x")!.run()
                expect(store.state.total).toBe(6)
                resolve()
            })
            store.state.total // 读取触发计算属性的创建
        })
    })
    test("手动传参覆盖默认的计算属性参数，然后运行",()=>{
        return new Promise<void>((resolve)=>{
            const results:any[]=[]
            // 同步计算在创建时会先执行一次用于自动收集依赖，此时的scope是默认指向的
            // 然后第二次是手动执行,此时的scope是通过run传入的。
            const store = createStore({
                price:2,
                count:3,
                total:computed((scope)=>{
                    results.push(scope)
                    if(results.length===2){
                        expect(results[1]).toBe(2)                        
                        resolve()
                    }else{
                        scope.price * scope.count
                    }
                },{id:'x'}),         
            })                                    
            store.on("computed:created",()=>{
                setTimeout(()=>{
                    store.computedObjects.get("x")!.run({scope:"price"})
                })
            })
            store.state.total // 读取触发计算属性的创建

        })
    })
    test('侦听同步计算属性的变更事件',async  () => {     
        const store = createStore({
            user:{
                firstName: 'zhang',
                lastName: 'fisher',
                fullName: (scope:any) => `${scope.firstName} ${scope.lastName}`
            }            
        });
        const oldvalues:any[] = []
        const values:any[]=[]
        return new Promise<void>((resolve)=>{
            store.watch("user.fullName",(event)=>{
                values.push(event.value)
                oldvalues.push(event.oldValue)
                expect(event.value).toBe('li fisher')
                expect(event.oldValue).toBe('zhang fisher')
                resolve()
            },{operates:['set']})
            expect(store.state.user.fullName).toBe('zhang fisher')
            store.state.user.firstName = 'li'
            expect(store.state.user.fullName).toBe('li fisher')        
        })
        
    })

    test('提供额外的同步计算属性依赖', async () => {
        let count:number=0
        const store = createStore({
            user:{
                firstName: 'zhang',
                lastName: 'fisher',                
                fullName: computed((scope:any) => `${scope.firstName} ${scope.lastName} ${count}`
                                    ,{depends:["alias"]})
            },
            alias: "x",
        });        
        return new Promise<void>((resolve)=>{
            store.watch("user.fullName",(event)=>{
                expect(event.value).toBe("zhang fisher 1")
                expect(store.state.user.fullName).toBe('zhang fisher 1')
                resolve()
            },{operates:['set']})            
            expect(store.state.user.fullName).toBe('zhang fisher 0')
            count++
            store.state.alias="y"       // trigger user.fullName recompute, beacuse it is 
        })
    })
    test('计算属性依赖于另外一个计算属性', () => {     
        const store = createStore({
            user:{
                firstName: 'zhang',
                lastName: 'fisher',
                fullName1: computed((scope:any) => `${scope.firstName} ${scope.lastName}`),
                fullName2: computed((scope:any) => `${scope.fullName1}*`),
                fullName3: computed((scope:any) => `${scope.fullName2}*`),
                fullName4: computed((scope:any) => `${scope.fullName3}*`),
                fullName5: computed((scope:any) => `${scope.fullName4}*`),
            }            
        });        
        expect(store.state.user.fullName1).toBe('zhang fisher')   
        expect(store.state.user.fullName2).toBe('zhang fisher*')   
        expect(store.state.user.fullName3).toBe('zhang fisher**')   
        expect(store.state.user.fullName4).toBe('zhang fisher***')   
        expect(store.state.user.fullName5).toBe('zhang fisher****')   
    })

})

describe('同步计算函数的启用和禁用', () => {
    test('启用和禁用同步计算函数', () => {     
        const store = createStore({
            user:{
                firstName: 'zhang',
                lastName: 'fisher',
                fullName: computed((scope:any) => {
                    return `${scope.firstName} ${scope.lastName}` 
                },{
                    id:"x",
                    enable:false,                            
                })
            }            
        });
        expect(store.state.user.fullName).toBe('zhang fisher')
        store.state.user.firstName = 'li'
        expect(store.state.user.fullName).toBe('zhang fisher')   // no computed
        store.computedObjects.get("x")!.enable = true
        store.state.user.firstName = "Wang"
        expect(store.state.user.fullName).toBe('Wang fisher')   
    })

    test('启用和禁用所有同步计算函数', () => {     
        const count = 6
        const store = createStore({
            user:{
                firstName: 'zhang',
                lastName: 'fisher',
                fullName1: computed((scope:any) => `${scope.firstName} ${scope.lastName}`),
                fullName2: computed((scope:any) => `${scope.firstName} ${scope.lastName}`),
                fullName3: computed((scope:any) => `${scope.firstName} ${scope.lastName}`),
                fullName4: computed((scope:any) => `${scope.firstName} ${scope.lastName}`),
                fullName5: computed((scope:any) => `${scope.firstName} ${scope.lastName}`),
                fullName6: computed((scope:any) => `${scope.firstName} ${scope.lastName}`),
            }            
        },{
            enableComputed:false            // 禁用所有计算
        });
        // 禁用计算属性时，第一次运行不受影响，因此可以正常收集依赖
        for(let i=1;i<=count;i++){
            expect((store.state.user as any)[`fullName${i}`]).toBe('zhang fisher')   
        }
        // 变更依赖时，不会重新计算
        store.state.user.firstName = 'li'
        for(let i=1;i<=count;i++){
            expect((store.state.user as any)[`fullName${i}`]).toBe('zhang fisher')   
        }
        // 启用计算属性，变更依赖时，会重新计算
        store.options.enableComputed = true
        store.state.user.firstName = 'li'
        for(let i=1;i<=count;i++){
            expect((store.state.user as any)[`fullName${i}`]).toBe('li fisher')   
        }
    })

    describe('同步计算函数中的循环依赖', () => {

        test("同步计算依赖了自己",async ()=>{            
            try{
                const store = createStore({
                    price:2,
                    count:3,
                    total:computed((scope)=>{
                        return scope.price * scope.total
                    })
                })
                store.state.total  
            }catch(e:any){
                expect(e).toBeInstanceOf(CyleDependError)
            }             
        })  
        test('循环依赖路径中依赖了自己', () => {    
            //  ┌───────────────↴ 
            //  1<──2<──3<──4<──5 
            try{                
                const store = createStore({
                    user:{
                        firstName: 'zhang',
                        lastName: 'fisher',
                        fullName1: computed((scope:any) => `${scope.fullName5}`),
                        fullName2: computed((scope:any) => `${scope.fullName1}*`),
                        fullName3: computed((scope:any) => `${scope.fullName2}*`),
                        fullName4: computed((scope:any) => `${scope.fullName3}*`),
                        fullName5: computed((scope:any) => `${scope.fullName4}*`),
                    }            
                });           
                store.state.user.fullName1 
            }catch(e:any){
                expect(e).toBeInstanceOf(CyleDependError)
            }
        })

        test('所依赖的数据项存在循环依赖路径', () => {    
            //      ↓───────────┐ 
            //  1──>2──>3──>4──>5 
            try{                
                const store = createStore({
                    user:{
                        firstName: 'zhang',
                        lastName: 'fisher',
                        fullName1: computed((scope:any) => `${scope.fullName2}`),
                        fullName2: computed((scope:any) => `${scope.fullName3}*`),
                        fullName3: computed((scope:any) => `${scope.fullName4}*`),
                        fullName4: computed((scope:any) => `${scope.fullName5}*`),
                        fullName5: computed((scope:any) => `${scope.fullName2}*`),
                    }            
                });           
                store.state.user.fullName1 
            }catch(e:any){
                expect(e).toBeInstanceOf(CyleDependError)
            }
        })
        test('数组中存在交叉循环依赖路径', () => {    
            try{                
                const store = createStore({
                    user:{
                        firstName: 'zhang',
                        lastName: 'fisher',
                        orders:[
                            {name:"order1",price:computed((orders:any[]) => {
                                return orders[1].price+1
                            },{scope:"PARENT"})},
                            {name:"order2",price:computed((orders:any[]) => {
                                return orders[0].price+1
                            },{scope:"PARENT"})},
                            {name:"order3"},
                            {name:"order4"},
                            {name:"order5"},
                        ]
                    }            
                });           
                store.state.user.orders[1].price  
            }catch(e:any){
                expect(e).toBeInstanceOf(CyleDependError)
            }
        })
    })
    
})

