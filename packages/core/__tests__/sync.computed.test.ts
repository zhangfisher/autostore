import { afterEach, beforeEach, describe, expect, test } from 'vitest'; 
import { createStore } from '../src/store/store';
import { computed } from '../src/computed/computed';
import { ComputedScopeRef } from '../src/computed';

const data = {
    firstName: 'zhang',
    lastName: 'fisher',
    fullName: (scope:any) => `${scope.firstName} ${scope.lastName}`,
    orders: [
        {id: 1, price: 100, count: 2, total: (scope:any) => scope.price * scope.count},
        {id: 2, price: 200, count: 3, total: (scope:any) => scope.price * scope.count},
        {id: 3, price: 300, count: 4, total: (scope:any) => scope.price * scope.count},
        {id: 4, price: 400, count: 5, total: (scope:any) => scope.price * scope.count},
        {id: 5, price: 500, count: 6, total: (scope:any) => scope.price * scope.count},
    ],
    job: {
        title: 'Software Engineer',
        company: 'Google',
        salary: 100000
    }
}


describe('sync computed', () => { 

    test('sync compute fullName value  ', () => {     
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
    test('watch sync compute fullName value  ',async  () => {     
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


})


describe('sync computed with scope', () => {

    test('sync compute fullName value default scope=CURRENT ', () => {     
        const store = createStore({
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
        const store = createStore({
            user:{
                firstName: 'zhang',
                lastName: 'fisher',
                fullName: computed((scope:any) => `${scope.user.firstName} ${scope.user.lastName}`,{
                    scope:ComputedScopeRef.Root
                })
            }                
        });
        expect(store.state.user.fullName).toBe('zhang fisher')
        store.state.user.firstName = 'li'
        expect(store.state.user.fullName).toBe('li fisher')
    })
    test('sync compute fullName value scope=PARENT ', () => {
        const store = createStore({
            root:{
                admin:{
                    user:{
                        firstName: 'zhang',
                        lastName: 'fisher',
                        fullName: computed((admin:any) => `${admin.user.firstName} ${admin.user.lastName}`,{
                            scope:ComputedScopeRef.Parent
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

describe('sync computed with enable', () => {
    test('sync compute fullName value enable=false ', () => {     
        const store = createStore({
            user:{
                firstName: 'zhang',
                lastName: 'fisher',
                fullName: computed((scope:any) => `${scope.firstName} ${scope.lastName}`,{
                    enable:false,        // 由于禁用计算属性，所以不会计算fullName的值，因此也无法收集依赖
                })
            }            
        });
        expect(store.state.user.fullName).toBe('zhang fisher')
        store.state.user.firstName = 'li'
        expect(store.state.user.fullName).toBe('zhang fisher')    
    })

    test('disable all sync compute fullName', () => {     
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
})