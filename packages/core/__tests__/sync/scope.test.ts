import { test,expect, describe } from "vitest"
import { AutoStore,ObserverScopeRef,computed } from "../.."

describe("同步计算函数Scope指向",()=>{


    describe("同步计算函数的Scope默认值",()=>{

        test("默认Scope指向Current=order",()=>{
            return new Promise<void>((resolve)=>{
                const store = new AutoStore({
                    order:{                
                        price:2,
                        count:3,
                        total:computed((scope)=>{ 
                            expect(scope.price).toBe(2)
                            expect(scope.count).toBe(3)
                            resolve()
                        })
                    }
                })
                store.state.order.total // 读取操作时创建计算属性
            })
            
        })

    })

    describe("修改同步计算函数的默认Scope指向",()=>{

        test("Scope指向Root",()=>{
            return new Promise<void>((resolve)=>{
                const store = new AutoStore({
                        order:{                
                            price:2,
                            count:3,
                            total:computed<number>((scope)=>{ 
                                expect(scope.order.price).toBe(2)
                                expect(scope.order.count).toBe(3)
                                resolve()
                                return scope.order.price * scope.order.count
                            }) 
                        }
                    },{
                        scope:()=>ObserverScopeRef.Root
                    })
                
                store.state.order.total // 读取操作时创建计算属性
            }) 
        })
        test("Scope指向parent",()=>{
            return new Promise<void>((resolve)=>{
                const store = new AutoStore({
                        root:{
                            parent:{
                                order:{                
                                    price:2,
                                    count:3,
                                    total:computed<number>((scope)=>{ 
                                        expect(scope.order.price).toBe(2)
                                        expect(scope.order.count).toBe(3)
                                        resolve()
                                        return scope.order.price * scope.order.count
                                    }) 
                                }
                            }
                        }
                    },{
                        scope:()=>ObserverScopeRef.Parent
                    })
                
                store.state.root.parent.order.total // 读取操作时创建计算属性
            }) 
        })
        test("Scope指向Depends",()=>{
            return new Promise<void>((resolve)=>{
                const store = new AutoStore({
                        root:{
                            parent:{
                                order:{                
                                    price:2,
                                    count:3,
                                    // 当指定Depends时，同步计算通过执行计算函数不收集依赖的，所以第一次执行时，scope是空的
                                    // 所以ComputedScopeRef.Depends在同步计算下是无效的
                                    total:computed<number>((scope)=>{  
                                        expect(scope.length).toBe(0)
                                        resolve()
                                        return 0
                                    }) 
                                }
                            }
                        }
                    },{
                        scope:ObserverScopeRef.Depends
                    })            
                store.state.root.parent.order.total // 读取操作时创建计算属性
            }) 
        })
        test("Scope指向字符串指定的绝对路径",()=>{
            // 
            return new Promise<void>((resolve)=>{
                const store = new AutoStore({
                        root:{
                            parent:{
                                order:{                
                                    price:2,
                                    count:3,
                                    total:computed<number>((scope)=>{  
                                        expect(scope).toBe(1)
                                        resolve()
                                        return 0
                                    }) 
                                }
                            },
                            a:1
                        }
                    },{
                        scope:"root.a"   // 除非以./或../开头代表相对路径，否则视为绝对路径
                    })            
                store.state.root.parent.order.total // 读取操作时创建计算属性
            }) 
        })

        test("Scope指向字符串指定的当前对象的相对路径",()=>{
            //注意： . 代表的是不是total，而是total所在的对象
            return new Promise<void>((resolve)=>{
                const store = new AutoStore({
                        root:{
                            parent:{
                                order:{                
                                    price:2,
                                    count:3,
                                    total:computed<number>((scope)=>{  
                                        expect(scope).toBe(2)
                                        resolve()
                                        return 0
                                    }) 
                                }
                            },
                            a:1
                        }
                    },{
                        scope:"./price"   //.代表的是order
                    })            
                store.state.root.parent.order.total // 读取操作时创建计算属性
            }) 
        })
        test("Scope指向字符串指定的当前对象父对象的相对路径",()=>{
            //注意： .. 代表的是不是total，而是total所在的对象
            return new Promise<void>((resolve)=>{
                const store = new AutoStore({
                        root:{
                            parent:{
                                order:{                
                                    price:2,
                                    count:3,
                                    total:computed<number>((scope)=>{  
                                        expect(scope).toBe(100)
                                        resolve()
                                        return 0
                                    }) 
                                },
                                x:100
                            },
                            a:1
                        }
                    },{
                        scope:"../x"   // ..指向parent
                    })            
                store.state.root.parent.order.total // 读取操作时创建计算属性
            }) 
        })
        test("Scope指向字符串指定的多级相对父对象路径",()=>{
            //注意： .. 代表的是不是total，而是total所在的对象
            return new Promise<void>((resolve)=>{
                const store = new AutoStore({
                        root:{
                            parent:{
                                order:{                
                                    price:2,
                                    count:3,
                                    total:computed<number>((scope)=>{  
                                        expect(scope).toBe(1)
                                        resolve()
                                        return 0
                                    }) 
                                },
                                x:100
                            },
                            a:1
                        }
                    },{
                        scope:"../../a"   //  
                    })            
                store.state.root.parent.order.total // 读取操作时创建计算属性
            }) 
        })
        test("使用字符串数组作为Scope指向的绝对路径",()=>{
            //注意： .. 代表的是不是total，而是total所在的对象
            return new Promise<void>((resolve)=>{
                const store = new AutoStore({
                        root:{
                            parent:{
                                order:{                
                                    price:2,
                                    count:3,
                                    total:computed<number>((scope)=>{  
                                        expect(scope).toBe(3)
                                        resolve()
                                        return 0
                                    }) 
                                }
                            }
                        }
                    },{
                        scope:["root","parent","order","count"]
                    })            
                store.state.root.parent.order.total // 读取操作时创建计算属性
            }) 
        })
    })

    describe("同步计算函数单独指定Scope指向",()=>{

        test('sync compute fullName value default scope=CURRENT ', () => {     
            const store = new AutoStore({
                user:{
                    firstName: 'zhang',
                    lastName: 'fisher',
                    fullName: computed((scope:any) => `${scope.firstName} ${scope.lastName}`)
                }            
            });
            expect(store.state.user.fullName).toBe('zhang fisher')
            store.state.user.firstName = 'li'
            expect(store.state.user.fullName).toBe('li fisher')        
        })
        test('sync compute fullName value scope=ROOT ', () => {
            const store = new AutoStore({
                user:{
                    firstName: 'zhang',
                    lastName: 'fisher',
                    fullName: computed((scope:any) => `${scope.user.firstName} ${scope.user.lastName}`,{
                        scope:ObserverScopeRef.Root
                    })
                }                
            });
            expect(store.state.user.fullName).toBe('zhang fisher')
            store.state.user.firstName = 'li'
            expect(store.state.user.fullName).toBe('li fisher')
        })
        test('sync compute fullName value scope=PARENT ', () => {
            const store = new AutoStore({
                root:{
                    admin:{
                        user:{
                            firstName: 'zhang',
                            lastName: 'fisher',
                            fullName: computed((admin:any) => `${admin.user.firstName} ${admin.user.lastName}`,{
                                scope:ObserverScopeRef.Parent
                            })
                        }                
                    }                
                }
                
            });        
            expect(store.state.root.admin.user.fullName).toBe('zhang fisher')
            store.state.root.admin.user.firstName = 'li'
            expect(store.state.root.admin.user.fullName).toBe('li fisher')
        }) 
    })
})