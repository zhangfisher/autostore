import { expect,test,describe, beforeEach, afterEach } from "vitest"
import { createState, Stateable } from "../src";
import { deepClone } from "flex-tools/object/deepClone";

const data = {
    firstName: 'John',
    lastName: 'Doe',
    fullName: (data:any) => `${data.firstName} ${data.lastName}`,
    age: 30,
    address: [
        { city: 'New York', street: 'Wall Street' },
        { city: 'Los Angeles', street: 'Hollywood Blvd' },
        { city: 'San Francisco', street: 'Golden Gate' },
        { city: 'Washington', street: 'White House' },
        { city: 'Beijing', street: 'Tiananmen' },
        { city: 'Shanghai', street: 'Nanjing Road' }
    ],
    job: {
        title: 'Software Engineer',
        company: 'Google',
        salary: 100000
    }
}



describe("watch object", () => {
    let signal:Stateable<typeof data>;
    let listenerId:number = 0
    beforeEach(() => {
        signal = createState(deepClone(data));
    })
    afterEach(() => {
        signal.off(listenerId);
    })

    test("read operate events", () => {
        let events:any[] = [];
        listenerId = signal.on((event) => {
            events.push(event);
        })
        signal.data.firstName;
        signal.data.address[0].city;
        signal.data.job.title;    
        expect(events).toStrictEqual([
            { type: 'get', path: ['firstName'], indexs:[],value: data.firstName,parent:data,parentPath:[],oldValue:undefined },
            { type: 'get', path: ['address'], indexs:[], value: data.address,parent:data,parentPath:[],oldValue:undefined },
            { type: 'get', path: ['address','0'], indexs:[], value: data.address[0] ,parent:data.address,parentPath:["address"],oldValue:undefined},
            { type: 'get', path: ['address', '0', 'city'], indexs:[], value: data.address[0].city,parent:data.address[0],parentPath:["address",'0'],oldValue:undefined },
            { type: 'get', path: ['job'], indexs:[], value: data.job,parent:data,parentPath:[],oldValue:undefined },
            { type: 'get', path: ['job', 'title'], indexs:[], value: data.job.title,parent:data.job,parentPath:["job"],oldValue:undefined }
        ])
    })
    test("Write operage events",()=>{
        let events:any[] = [];
        listenerId = signal.on((event) => {
            if(event.type === 'set'){
                events.push(event);
            }
        })      
        signal.data.firstName = "Li";
        signal.data.address[0].city = "Shanghai";
        signal.data.job.title = "Frontend Engineer";
        expect(events[0]).toStrictEqual({ type: 'set', path: ['firstName'], indexs:[], value: "Li",parent:signal.data,parentPath:[] ,oldValue: 'John'})
        expect(events[1]).toStrictEqual({ type: 'set', path: ['address', '0', 'city'], indexs:[], value: "Shanghai",parent:signal.data.address[0],parentPath:["address",'0'],oldValue: 'New York' })
        expect(events[2]).toStrictEqual({ type: 'set', path: ['job', 'title'], indexs:[], value: "Frontend Engineer",parent:signal.data.job,parentPath:["job"],oldValue: 'Software Engineer'})
    })
    test("delete object items",()=>{
        let events:any[] = [];
        listenerId = signal.on((event) => {
            if(event.type === 'delete'){
                events.push(event);
            }
        })      
        // @ts-ignore
        delete signal.data.firstName;
        // @ts-ignore
        delete signal.data.address[0].city;
        // @ts-ignore
        delete signal.data.job.title;
        // @ts-ignore
        delete signal.data.job;
        expect(events[0]).toStrictEqual({ type: 'delete', path: ['firstName'], indexs:[], value: 'John',parent:signal.data,parentPath:[] ,oldValue: undefined})
        expect(events[1]).toStrictEqual({ type: 'delete', path: ['address', '0', 'city'], indexs:[], value:'New York',parent:signal.data.address[0],parentPath:["address",'0'],oldValue: undefined})
        expect(events[2]).toStrictEqual({ type: 'delete', path: ['job', 'title'], indexs:[], value: 'Software Engineer',parent:{company: 'Google',
            salary: 100000},parentPath:["job"],oldValue: undefined})
    })

})
 

describe("watch array", () => {
    let signal:Stateable<typeof data>;
    let listenerId:number = 0
    beforeEach(() => {
        signal = createState(deepClone(data));
    })
    afterEach(() => {
        signal.off(listenerId);
    })
 
    test("array push operage event",()=>{
        let events:any[] = [];
        listenerId = signal.on((event) => {
            if(event.type === 'insert'){
                events.push(event);
            }
        })      
        const newItems =Array.from({length:5}).map((_,i)=>({city:"Beijing",street:"Wangfujing",i}))
        signal.data.address.push(...newItems) 

        expect(events[0]).toStrictEqual({ 
            type      : 'insert', 
            path      : ['address'],
            indexs    : [6,7,8,9,10],
            value     : newItems,
            parent    : signal.data.address,
            parentPath: ['address'],
            oldValue  : undefined
        })  
    })
    test("array splice operage event",()=>{
        let events:any[] = [];
        listenerId = signal.on((event) => {
            if(event.type === 'insert'){
                events.push(event);
            }
        })      
        const newItems =Array.from({length:5}).map((_,i)=>({city:"Beijing",street:"Wangfujing",i}))
        signal.data.address.splice(1,0,...newItems)

        expect(events[0]).toStrictEqual({ 
            type      : 'insert', 
            path      : [ 'address'],
            indexs    : [1,2,3,4,5],
            value     : newItems,
            parent    : [data.address[0],...newItems,...data.address.slice(1)],
            parentPath: ['address'],
            oldValue  : undefined
        })  
    })
    test("array splice with delete operage event",()=>{
        let events:any[] = [];
        listenerId = signal.on((event) => {
            if(event.type === 'remove' || event.type === 'insert'){
                events.push(event);
            }
        })      
        const newItems =Array.from({length:5}).map((_,i)=>({city:"Beijing",street:"Wangfujing",i}))
        signal.data.address.splice(1,2,...newItems)
        expect(events[0]).toStrictEqual({ 
            type      : 'remove', 
            path      : ['address'],
            indexs    : [1,2],
            value     : data.address.slice(1,3),     // 删除的值
            parent    : [data.address[0],...newItems,...data.address.slice(3)],
            parentPath: ['address'],
            oldValue  : undefined
        })  
        expect(events[1]).toStrictEqual({ 
            type      : 'insert', 
            path      : ['address'],
            indexs    : [1,2,3,4,5],
            value     : newItems,
            parent    : [data.address[0],...newItems,...data.address.slice(3)],
            parentPath: ['address'],
            oldValue  : undefined
        })            
    })

    test("array unshift operage event",()=>{
        let events:any[] = [];
        listenerId = signal.on((event) => {
            if(event.type === 'insert'){
                events.push(event);
            }
        })      
        const newItems =Array.from({length:5}).map((_,i)=>({city:"Beijing",street:"Wangfujing",i}))
        signal.data.address.unshift(...newItems)

        expect(events[0]).toStrictEqual({ 
            type      : 'insert', 
            path      : [ 'address'],
            indexs    : [0,1,2,3,4],
            value     : newItems,
            parent    : [...newItems,...data.address],
            parentPath: ['address'],
            oldValue  : undefined
        })  
    })

    test("update array member",()=>{
        let events:any[] = [];
        listenerId = signal.on((event) => {
            if(event.type === 'update'){
                events.push(event);
            }
        })      
        signal.data.address[0] = {city:"QuanZhou",street:"TongYang"}
        expect(events[0]).toStrictEqual({ 
            type      : 'update', 
            path      : ['address'],
            indexs    : [0],
            value     : {city:"QuanZhou",street:"TongYang"},
            parent    : signal.data.address,
            parentPath: ['address'],
            oldValue  : data.address[0]
        })  
    })
    test("remove array member",()=>{
        let events:any[] = [];
        listenerId = signal.on((event) => {
            if(event.type === 'remove'){
                events.push(event);
            }
        })      
        signal.data.address.splice(1,1)
        expect(events[0]).toStrictEqual({ 
            type      : 'remove', 
            path      : ['address'],
            indexs    : [1],
            value     : [data.address[1]],
            parent    : [data.address[0],...data.address.slice(2)],
            parentPath: ['address'],
            oldValue  : undefined
        })  
    })
    test("remove array multi member",()=>{
        let events:any[] = [];
        listenerId = signal.on((event) => {
            if(event.type === 'remove'){
                events.push(event);
            }
        })      
        signal.data.address.splice(1,5)
        expect(events[0]).toStrictEqual({ 
            type      : 'remove', 
            path      : ['address'],
            indexs    : [1,2,3,4,5],
            value     : data.address.slice(1),
            parent    : [data.address[0]],
            parentPath: ['address'],
            oldValue  : undefined
        })  
    })
})
 
