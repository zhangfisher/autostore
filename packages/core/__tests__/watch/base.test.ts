import { test,expect, describe, beforeEach,vi } from "vitest"
import { watch } from "../../src/watch/watch"
import { AutoStore, createStore } from "../../src"
 
type watchParams = Parameters<typeof watch<number,number>>

function getBookShop(opts?: {listener?:watchParams[0],depends?:watchParams[1],options?:watchParams[2]}){
    const {listener=()=>100,depends,options}  =  Object.assign({},opts)
    return {
            books:{            
                price:10,
                count:10,
                total:watch<number,number>((path,value,watchObj)=>{  
                    return listener(path,value,watchObj) as number
                },(path:string[],value:any)=>{
                    return typeof(depends) === 'function' ? depends!(path,value) : path[path.length-1]=='count'
                },{              
                    id:"total",  
                    initial:1,
                    group:'x',
                    ...options
                })
            }
        }

}
const BookShop = {
        books:{            
            price:10,
            count:10,
            total:watch((scope)=>{ 
                return  100
            },(path:string[],value:any)=>{
                return path[path.length-1]=='count'
            },{                
                initial:1,
                group:'x'
            })
            
        }
}
 

describe("静态声明watch",()=>{
    let store:AutoStore<typeof BookShop>
    beforeEach(()=>{
        store = createStore(BookShop)
    })
    test("创建监视对象",async ()=>{
        store.state.books.total // 注意：watch仅在第一次读取时创建        
        const watchId = 'books.total'
        expect(store.watchObjects.size).toBe(1)
        expect(store.watchObjects.has(watchId)).toBeDefined()
        expect(store.watchObjects.get(watchId)?.id).toBe(watchId)
        expect(store.watchObjects.get(watchId)?.options.initial).toBe(1)
        expect(store.watchObjects.get(watchId)?.path).toEqual(['books','total'])
        expect(store.watchObjects.get(watchId)?.options.group).toBe("x")

    })
    
    test("监视字段total的初始值为1",async ()=>{
        store.state.books.total // 注意：watch仅在第一次读取时创建        
        expect(store.state.books.total).toBe(1)
    })

    test("侦听count变化后更新total值",async ()=>{
        store.state.books.total // 注意：watch仅在第一次读取时创建
        store.state.books.count = 11 
        expect(store.state.books.total).toBe(100)
    })

    test("通过enable控制total是否侦听",async ()=>{
        const listener = vi.fn()
        const bookShop= getBookShop({
            listener:(_,value:number)=>{
                listener()
                return value * 100
            }
        })
        const store = createStore(bookShop)
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
                diary:watch((path,value,watchObj)=>{
                    changed.push(path)
                    return value
                },[],{initial:0})
            },{immediate:true})
            store.watch((changedPaths)=>{
                paths.push(...changedPaths)
                values.push(store.state.diary)                
                if(paths.length==2){
                    expect(changed).toStrictEqual([['a'],['b']])
                    expect(paths).toStrictEqual([['diary'],['diary']])
                    expect(values).toStrictEqual([100,200])
                    resolve()
                }
            },["diary"])
            store.state.a = 100 
            store.state.b = 200 
        })        
    })
})