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
        company: 'Google'
    }
}


describe('sync computed', () => {

    let store:AutoStore<typeof data>; 
    beforeEach(() => {
        store = createStore(deepClone(data));
    })
    afterEach(() => {
         
    })

    test('sync compute fullName value  ', () => {     
        expect(store.state.fullName).toBe('zhang fisher')

    })



})


describe('sync computed with scope', () => {




})