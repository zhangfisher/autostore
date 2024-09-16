import { test,expect, describe,vi } from "vitest"
import { watch } from "../../src/watch/watch"
import {  createStore } from "../../src"
import { WatchObject } from "../../src/watch/watchObject"
  
describe("watch功能测试",()=>{


    describe("静态声明watch",()=>{
        test("创建监视对象",async ()=>{
            const store = createStore({
                books:{            
                    price:10,
                    count:10,
                    total:watch(()=>{ 
                        return  100
                    },()=>true,{initial:1,group:'x'})
                    
                }
            })
            store.state.books.total // 注意：watch仅在第一次读取时创建        
            const watchId = 'books_total'
            expect(store.watchObjects.size).toBe(1)
            expect(store.watchObjects.has(watchId)).toBeDefined()
            expect(store.watchObjects.get(watchId)?.id).toBe(watchId)
            expect(store.watchObjects.get(watchId)?.options.initial).toBe(1)
            expect(store.watchObjects.get(watchId)?.path).toEqual(['books','total'])
            expect(store.watchObjects.get(watchId)?.options.group).toBe("x")

        })
        
        test("监视字段total的初始值为1",async ()=>{
            const store = createStore({
                books:{            
                    price:10,
                    count:10,
                    total:watch(()=>{ 
                        return  100
                    },()=>true,{initial:1,group:'x'})
                    
                }
            })
            store.state.books.total // 注意：watch仅在第一次读取时创建        
            expect(store.state.books.total).toBe(1)
        })
        test("立刻创建监视字段total对象",async ()=>{
            const store = createStore({
                books:{            
                    price:10,
                    count:10,
                    total:watch(()=>{ 
                        return  100
                    },()=>true,{initial:1,group:'x'})                
                }
            },{
                immediate:true
            })
            expect(store.state.books.total).toBe(1)
        })
        test("侦听count变化后更新total值",async ()=>{
            const store = createStore({
                books:{            
                    price:10,
                    count:10,
                    total:watch(({value})=>{ 
                        return  value+1
                    },{initial:1,group:'x'})                
                }
            },{
                immediate:true
            })
            expect(store.state.books.total).toBe(1)
            store.state.books.count = 10
            expect(store.state.books.total).toBe(11)
        })

        test("通过enable控制total是否侦听",async ()=>{
            const listener = vi.fn() 
            const store = createStore({
                books:{            
                    price:10,
                    count:10,
                    total:watch<number,number>(({value})=>{  
                        listener()
                        return value * 100 
                    },(path:string[])=>{
                        return path[path.length-1]=='count'
                    },{              
                        id:"total",  
                        initial:1,
                        group:'x', 
                    })
                }
            })
            // 注意：watch仅在第一次读取时创建，如果没有读一下，则不会创建watch对象
            store.state.books.total   

            const watchObj = store.watchObjects.get('total')!
            for(let i = 0;i<10;i++){
                watchObj.options.enable = i%2==0            
                // 修改count值，导致total值变化
                store.state.books.count++ 
            }
            expect(store.state.books.total).toBe(1900)  // 1900
            expect(listener).toHaveBeenCalledTimes(5)                

        })
        test("侦听所有变化", ()=>{
            return new Promise<void>((resolve)=>{ 
                const changed:string[][] = []
                const paths:string[][] = []
                const values:number[] = []

                const store = createStore({
                    a:1,b:2,
                    diary:watch(({path,value},watchObj)=>{
                        expect(watchObj).toBeInstanceOf(WatchObject)                    
                        changed.push(path)
                        return value
                    },()=>true,{initial:0})
                },{immediate:true})

                store.watch("diary",({path})=>{
                    paths.push(path)
                    values.push(store.state.diary)                
                    if(paths.length==2){
                        expect(changed).toStrictEqual([['a'],['b']])
                        expect(paths).toStrictEqual([['diary'],['diary']])
                        expect(values).toStrictEqual([100,200])
                        resolve()
                    }
                })
                store.state.a = 100 
                store.state.b = 200  
            })        
        })
    })


    describe("使用watch实现diary",()=>{

        test("当所依赖的字段value发生变化时, diary的值也发生变化", ()=>{
            return new Promise<void>((resolve)=>{ 
                const changed:string[][] = []
                const paths:string[][] = []
                const values:boolean[] = []

                const store = createStore({
                    a:{
                        value:1
                    },b:{
                        value:2
                    },
                    diary:watch<boolean,number>(({path})=>{
                        changed.push(path)
                        return true                    
                    },(path)=>path[path.length-1]=='value',{initial:false})
                },{immediate:true})

                store.watch("diary",({path})=>{
                    paths.push(path)
                    values.push(store.state.diary) 
                    expect(changed).toStrictEqual([['a','value']])
                    resolve()                
                })
                expect(store.state.diary).toBe(false)
                store.state.a.value = 100 
                expect(store.state.diary).toBe(true) 
            })        
        })
        test("重置diary的值", ()=>{
            return new Promise<void>((resolve)=>{ 
                const changed:string[][] = []
                const paths:string[][] = []
                const values:boolean[] = []

                const store = createStore({
                    a:{
                        value:1
                    },b:{
                        value:2
                    },
                    diary:watch<boolean,number>(({path})=>{
                        changed.push(path)
                        return true                    
                    },(path)=>path[path.length-1]=='value',{initial:false,id:"x"})
                },{immediate:true})

                store.watch("diary",({path})=>{
                    paths.push(path)
                    values.push(store.state.diary) 
                    if(paths.length==3){
                        expect(changed).toStrictEqual([['a','value'],['b','value']])
                        expect(paths).toStrictEqual([['diary'],['diary'],['diary']])
                        expect(values).toStrictEqual([true,false,true])
                        resolve()                
                    }                
                })
                expect(store.state.diary).toBe(false)
                store.state.a.value = 100 
                expect(store.state.diary).toBe(true) 
                
                store.watchObjects.get('x')?.reset()
                expect(store.state.diary).toBe(false)
                store.state.b.value = 100 
                expect(store.state.diary).toBe(true) 
            })        
        })
    })

    describe("使用watch实现validate",()=>{
        test("validate初始状态为true,当所有的字段都通过验证时，返回true，否则返回false", ()=>{
        // validate的逻辑是当所有的字段都通过验证时，返回true，否则返回false
            return new Promise<void>((resolve)=>{  

                const store = createStore({
                    a:{
                        validate:true
                    },
                    b:{
                        validate:true
                    },            
                    c:{
                        validate:true
                    },
                    validate:watch<boolean,boolean>(({path,value},watchObj)=>{   
                        if(typeof(value) === 'boolean'){
                            const srcKey = path.join('.')
                            if(value){
                                delete watchObj.cache[srcKey]
                            }else{
                                watchObj.cache[srcKey] = value
                            }
                        }
                        // 由于cache里面只记录validate=false的值，所以如果cache不为空则代表有字段的validate=false
                        return Object.keys(watchObj.cache).length==0

                    },
                    (path)=>path[path.length-1]=='validate', // 只侦听validate字段的值变化
                    {initial:true,id:"x"})
                },{immediate:true}) 

                // 初始值为true
                expect(store.state.validate).toBe(true)

                store.state.a.validate = true
                expect(store.state.validate).toBe(true)        
                store.state.b.validate = false
                expect(store.state.validate).toBe(false)
                store.state.c.validate = false
                expect(store.state.validate).toBe(false)
                store.state.b.validate = true
                expect(store.state.validate).toBe(false)
                store.state.c.validate = true
                expect(store.state.validate).toBe(true)            
                resolve()

            })
        })
    })

    describe("动态声明watch",()=>{
        test("动态创建监视对象",async ()=>{
            const store = createStore({
                books:{            
                    price:10,
                    count:10                   
                }
            })
            const watchObj = store.watchObjects.create<number,number>(()=>{                
                return  100
            },()=>true,{id:"w",initial:1,group:'x'})

            expect(store.watchObjects.size).toBe(1)
            expect(store.watchObjects.has('w')).toBeDefined()
            expect(store.watchObjects.get('w')?.id).toBe('w')

            expect(watchObj.id).toBe('w')
            expect(watchObj.initial).toBe(1)
            expect(watchObj.path).toBeUndefined()
            expect(watchObj.group).toBe("x")
            expect(watchObj.attched).toBe(false)

        })
        
        test("动态监视字段total的计算",async ()=>{
            const store = createStore({
                books:{            
                    price:10,
                    count:2                    
                }
            })
            const watchObj = store.watchObjects.create<number,number>(({value})=>{ 
                return  value
            },()=>true,{initial:1,id:'total'})
            expect(watchObj.initial).toBe(1)
            expect(watchObj.value).toBe(1)
            expect(watchObj.attched).toBe(false)
            store.state.books.count = 3
            expect(watchObj).toBe(store.watchObjects.get('total'))
            expect(watchObj.value).toBe(3)                        
        })  

        test("通过enable控制动态对象total是否侦听",async ()=>{
            const listener = vi.fn() 
            const store = createStore({
                books:{            
                    price:10,
                    count:2                    
                }
            })
            const watchObj = store.watchObjects.create<number,number>(({value})=>{ 
                listener()
                return  value
            },()=>true,{initial:1,id:'total',enable:false})
            expect(watchObj.initial).toBe(1)
            expect(watchObj.value).toBe(1)
            expect(watchObj.attched).toBe(false)
            store.state.books.count = 3
            expect(watchObj).toBe(store.watchObjects.get('total'))
            expect(watchObj.value).toBe(1)     
            watchObj.enable = true             
            store.state.books.count = 4
            expect(watchObj.value).toBe(4)
            expect(listener).toHaveBeenCalledTimes(1)

        })
    })

})    