import { expect,test,describe, beforeEach, afterEach } from "vitest"
import { AutoStore } from "../../src";
import { deepClone } from "flex-tools/object/deepClone";
import { Watcher } from "../../src/watch/types";

const data = {
    firstName: 'John',
    lastName: 'Doe',
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
describe("watch events",()=>{

    describe("watch object", () => {
        let store:AutoStore<typeof data>;
        let watcher:Watcher
        beforeEach(() => {
            store = new AutoStore(deepClone(data));
        })
        afterEach(() => {
            watcher.off();
        })
    
        test("read operate events", () => {
            const events:any[] = [];
            watcher = store.watch((event) => {
                events.push(event);
            },{operates:['get']})
            store.state.firstName;
            store.state.address[0].city;
            store.state.job.title;    
            expect(events).toStrictEqual([
                { type: 'get', path: ['firstName'], indexs:[],value: data.firstName,parent:data,parentPath:[],oldValue:undefined ,
                    flags:0},
                { type: 'get', path: ['address'], indexs:[], value: data.address,parent:data,parentPath:[],oldValue:undefined,
                    flags:0 },
                { type: 'get', path: ['address','0'], indexs:[], value: data.address[0] ,parent:data.address,parentPath:["address"],oldValue:undefined,
                    flags:0},
                { type: 'get', path: ['address', '0', 'city'], indexs:[], value: data.address[0].city,parent:data.address[0],parentPath:["address",'0'],oldValue:undefined,
                    flags:0 },
                { type: 'get', path: ['job'], indexs:[], value: data.job,parent:data,parentPath:[],oldValue:undefined ,
                    flags:0},
                { type: 'get', path: ['job', 'title'], indexs:[], value: data.job.title,parent:data.job,parentPath:["job"],oldValue:undefined,
                    flags:0 }
            ])
        })
        test("Write operage events",()=>{
            const events:any[] = [];
            watcher = store.watch((event) => {            
                events.push(event);
            },{operates:['set','update']})      
            store.state.firstName = "Li";
            store.state.address[0].city = "Shanghai";
            store.state.job.title = "Frontend Engineer";
            expect(events[0]).toStrictEqual({ type: 'set', path: ['firstName'], indexs:[], value: "Li",parent:store.state,parentPath:[] ,oldValue: 'John',
                flags:0})
            expect(events[1]).toStrictEqual({ type: 'set', path: ['address', '0', 'city'], indexs:[], value: "Shanghai",parent:store.state.address[0],parentPath:["address",'0'],oldValue: 'New York',
                flags:0 })
            expect(events[2]).toStrictEqual({ type: 'set', path: ['job', 'title'], indexs:[], value: "Frontend Engineer",parent:store.state.job,parentPath:["job"],oldValue: 'Software Engineer',
                flags:0})
        })
        test("delete object items",()=>{
            const events:any[] = [];
            watcher =  store.watch((event) => {
                events.push(event);
            },{operates:['delete']})      
            // @ts-ignore
            delete store.state.firstName;
            // @ts-ignore
            delete store.state.address[0].city;
            // @ts-ignore
            delete store.state.job.title;
            // @ts-ignore
            delete store.state.job;
            expect(events[0]).toStrictEqual({ type: 'delete', path: ['firstName'], indexs:[], value: 'John',parent:store.state,parentPath:[] ,oldValue: undefined,
                flags:0})
            expect(events[1]).toStrictEqual({ type: 'delete', path: ['address', '0', 'city'], indexs:[], value:'New York',parent:store.state.address[0],parentPath:["address",'0'],oldValue: undefined,
                flags:0})
            expect(events[2]).toStrictEqual({ type: 'delete', path: ['job', 'title'], indexs:[], value: 'Software Engineer',parent:{company: 'Google',
                salary: 100000},parentPath:["job"],oldValue: undefined,
                flags:0})
        })
    
    })
     
    
    describe("watch array", () => {
        let state:AutoStore<typeof data>;
        let watcher:Watcher
        beforeEach(() => {
            state = new AutoStore(deepClone(data));
        })
        afterEach(() => {
            watcher.off();
        })
     
        test("array push operage event",()=>{
            const events:any[] = [];
            watcher =  state.watch((event) => {
                events.push(event);
            },{operates:['insert']})      
            const newItems =Array.from({length:5}).map((_,i)=>({city:"Beijing",street:"Wangfujing",i}))
            state.state.address.push(...newItems) 
    
            expect(events[0]).toStrictEqual({ 
                type      : 'insert', 
                path      : ['address'],
                indexs    : [6,7,8,9,10],
                value     : newItems,
                parent    : state.state.address,
                parentPath: ['address'],
                oldValue  : undefined,
                flags:0
            })  
        })
        test("array splice operage event",()=>{
            const events:any[] = [];
            watcher =  state.watch((event) => {
                events.push(event);
            },{operates:['insert']})      
            const newItems =Array.from({length:5}).map((_,i)=>({city:"Beijing",street:"Wangfujing",i}))
            state.state.address.splice(1,0,...newItems)
    
            expect(events[0]).toStrictEqual({ 
                type      : 'insert', 
                path      : [ 'address'],
                indexs    : [1,2,3,4,5],
                value     : newItems,
                parent    : [data.address[0],...newItems,...data.address.slice(1)],
                parentPath: ['address'],
                oldValue  : undefined,
                flags:0
            })  
        })
        test("array splice with delete operage event",()=>{
            const events:any[] = [];
            watcher =  state.watch((event) => {
                events.push(event);
            },{
                operates:['remove','insert']
            })      
            const newItems =Array.from({length:5}).map((_,i)=>({city:"Beijing",street:"Wangfujing",i}))
            state.state.address.splice(1,2,...newItems)
            expect(events[0]).toStrictEqual({ 
                type      : 'remove', 
                path      : ['address'],
                indexs    : [1,2],
                value     : data.address.slice(1,3),     // 删除的值
                parent    : [data.address[0],...newItems,...data.address.slice(3)],
                parentPath: ['address'],
                oldValue  : undefined,
                flags:0
            })  
            expect(events[1]).toStrictEqual({ 
                type      : 'insert', 
                path      : ['address'],
                indexs    : [1,2,3,4,5],
                value     : newItems,
                parent    : [data.address[0],...newItems,...data.address.slice(3)],
                parentPath: ['address'],
                oldValue  : undefined,
                flags:0
            })            
        })
    
        test("array unshift operage event",()=>{
            const events:any[] = [];
            watcher =  state.watch((event) => {
                events.push(event);
            },{operates:['insert']})      
            const newItems =Array.from({length:5}).map((_,i)=>({city:"Beijing",street:"Wangfujing",i}))
            state.state.address.unshift(...newItems)
    
            expect(events[0]).toStrictEqual({ 
                type      : 'insert', 
                path      : [ 'address'],
                indexs    : [0,1,2,3,4],
                value     : newItems,
                parent    : [...newItems,...data.address],
                parentPath: ['address'],
                oldValue  : undefined,
                flags:0
            })  
        })
    
        test("update array member",()=>{
            const events:any[] = [];
            watcher =  state.watch((event) => {
                events.push(event);
            },{
                operates:'write'
            })      
            state.state.address[0] = {city:"QuanZhou",street:"TongYang"}
            expect(events[0]).toStrictEqual({ 
                type      : 'update', 
                path      : ['address','0'],
                indexs    : [],
                value     : {city:"QuanZhou",street:"TongYang"},
                parent    : state.state.address,
                parentPath: ['address'],
                oldValue  : data.address[0],
                flags:0
            })  
        })
        test("remove array member",()=>{
            const events:any[] = [];
            watcher =  state.watch((event) => {
                events.push(event);
            },{
                operates:['remove']
            })      
            state.state.address.splice(1,1)
            expect(events[0]).toStrictEqual({ 
                type      : 'remove', 
                path      : ['address'],
                indexs    : [1],
                value     : [data.address[1]],
                parent    : [data.address[0],...data.address.slice(2)],
                parentPath: ['address'],
                oldValue  : undefined,
                flags:0
            })  
        })
        test("remove array multi member",()=>{
            const events:any[] = []; 
            watcher =  state.watch((event) => {
                events.push(event);
            },{
                operates:['remove']
            })      
            state.state.address.splice(1,5)
            expect(events[0]).toStrictEqual({ 
                type      : 'remove', 
                path      : ['address'],
                indexs    : [1,2,3,4,5],
                value     : data.address.slice(1),
                parent    : [data.address[0]],
                parentPath: ['address'],
                oldValue  : undefined, 
                flags:0
            })  
        })
    })
     
    describe("watch for keypaths", () => {
        let state:AutoStore<typeof data>;
        let watcher:Watcher
        beforeEach(() => {
            state = new AutoStore(deepClone(data));
        })
        afterEach(() => {
            // @ts-ignore
            watcher && watcher.off();
        })
     
        test("watch object keypath",()=>{
            const events:any[] = [];
            state.watch("firstName",(event) => {
                events.push(event);
            },{once:true})
            state.watch("address.0.city",(event) => {
                events.push(event);
            },{once:true})
            state.watch("job.title",(event) => {
                events.push(event);
            },{once:true})
    
            state.state.firstName = "Li";
            state.state.address[0].city = "Shanghai";
            state.state.job.title = "Frontend Engineer";
            expect(events).toStrictEqual([
                { type: 'set', path: ['firstName'], indexs:[], value: "Li",parent:state.state,parentPath:[] ,oldValue: 'John',flags:0},
                { type: 'set', path: ['address', '0', 'city'], indexs:[], value: "Shanghai",parent:state.state.address[0],parentPath:["address",'0'],oldValue: 'New York' ,flags:0},
                { type: 'set', path: ['job', 'title'], indexs:[], value: "Frontend Engineer",parent:state.state.job,parentPath:["job"],oldValue: 'Software Engineer',flags:0}
            ])
    
        })
        test("watch object keypath only once",()=>{
            const events:any[] = [];
            state.watch("firstName",(event) => {
                events.push(event);
            },{once:true})
            state.watch("address.0.city",(event) => {
                events.push(event);
            },{once:true})
            state.watch("job.title",(event) => {
                events.push(event);
            },{once:true})
    
            state.state.firstName = "Li1";
            state.state.firstName = "Li2";
            state.state.firstName = "Li3";
            state.state.address[0].city = "Shanghai1";
            state.state.address[0].city = "Shanghai2";
            state.state.address[0].city = "Shanghai3";
            state.state.job.title = "Frontend Engineer1";
            state.state.job.title = "Frontend Engineer2";
            state.state.job.title = "Frontend Engineer3";
            expect(events.length).toBe(3)
        })
    
        test("watch object keypath with muilt",()=>{
            const events:any[] = [];
            const watchers=[]
            watchers.push(state.watch("firstName",(event) => {
                events.push(event);
            }))
            watchers.push(state.watch("address.0.city",(event) => {
                events.push(event);
            }))
            watchers.push(state.watch("job.title",(event) => {
                events.push(event);
            }))
    
            state.state.firstName = "Li1";
            state.state.firstName = "Li2";
            state.state.firstName = "Li3";
            state.state.address[0].city = "Shanghai1";
            state.state.address[0].city = "Shanghai2";
            state.state.address[0].city = "Shanghai3";
            state.state.job.title = "Frontend Engineer1";
            state.state.job.title = "Frontend Engineer2";
            state.state.job.title = "Frontend Engineer3";
            expect(events.length).toBe(9)
    
            watchers.forEach(watcher=>watcher.off())
    
        })
    })
    describe("watch all events", () => {
        const state = {
            order:{
                price:100,
                count:1,
                // 在计算函数中的get操作不会触发事件
                total: (scope:any)=>scope.price* scope.count
            }
        }
        let store:AutoStore<typeof state>;
        let watcher:Watcher
        beforeEach(() => {
            store = new AutoStore(deepClone(state));
        })
        afterEach(() => {
            watcher.off();
        })

        test("default watch all events ",()=>{
            const ops:string[] = []
            watcher = store.watch((op)=>{
                ops.push(`${op.type} ${op.path.join(".")}`)
            },{
                operates:"*"
            })            
            store.state.order.count++
            expect(ops).toStrictEqual([
                'get order',
                'get order.count',
                'set order.count',
                'set order.total'
            ])
        })

        test("use watch all events",()=>{
            const ops:string[] = []
            watcher = store.watch("*",(op)=>{
                ops.push(`${op.type} ${op.path.join(".")}`)
            },{
                operates:"*"
            })            
            store.state.order.count++
            expect(ops).toStrictEqual([
                'get order',
                'get order.count',
                'set order.count',
                'set order.total'
            ])
        })
    })
    describe("watch keypath use wildcard", () => {
        let store:AutoStore<typeof data>;
        let watcher:Watcher
        beforeEach(() => {
            store = new AutoStore(deepClone(data));
        })
        afterEach(() => {
            watcher.off();
        })
    
        test("use wildcard watch children ",()=>{            
            const ops:string[] = []
            watcher = store.watch("address.*",(op)=>{
                ops.push(op.path.join("."))
            },{operates:"read"})
            store.state.address[0]
            store.state.address[0].city
            store.state.address[1].street
            expect(ops).toStrictEqual([
                'address.0',
                'address.0',
                'address.1'
            ])
        })        
        test("use wildcard watch all descendants ",()=>{            
            const ops:string[] = []
            // **代表所有子孙
            watcher = store.watch("address.**",(op)=>{
                ops.push(op.path.join("."))
            },{operates:"read"})
            store.state.address[0]
            store.state.address[0].city
            store.state.address[1].street
            expect(ops).toStrictEqual([
                'address.0',
                'address.0',
                'address.0.city',
                'address.1',
                'address.1.street'
            ])
        })  
    })
    
})

