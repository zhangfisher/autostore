import { afterEach, beforeEach, describe, expect, test } from 'vitest'; 
import { AutoStore, createStore } from '../src/store/store';
import { deepClone } from 'flex-tools/object/deepClone';

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
    test('watch sync compute fullName value  ', () => {     
        const store = createStore({
            user:{
                firstName: 'zhang',
                lastName: 'fisher',
                fullName: (scope:any) => `${scope.firstName} ${scope.lastName}`
            }            
        });
        const oldvalues:any[] = []
        const values:any[]=[]
        store.watch("fullName",(event)=>{
            values.push(event.value)
            oldvalues.push(event.oldValue)
        },{operates:['set']})
        expect(store.state.user.fullName).toBe('zhang fisher')
        store.state.user.firstName = 'li'
        expect(store.state.user.fullName).toBe('li fisher')        
    })


})


describe('sync computed with scope', () => {




})