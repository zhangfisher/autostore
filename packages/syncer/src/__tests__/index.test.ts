import { describe, expect, test} from "vitest"
import { IAutoStoreSyncTransport, StateRemoteOperate } from "../transport"
import { computed, SYNC_INIT_FLAG,AutoStore } from '../../../core/src';
import { AutoStoreSyncer } from "../syncer";


describe("远程同步",()=>{
    class WebSocketTansport implements IAutoStoreSyncTransport{
        ready = true
        receiveCallback:any
        isStop:boolean = false
        constructor(public getPeer:()=>WebSocketTansport){

        }
        send(operate:StateRemoteOperate){
            this.getPeer().receiveCallback(operate)
        }
        receive(callback:any){
            this.receiveCallback=callback
        }
        onStop(){
            this.isStop = true
        }
    }

    const localTransport: WebSocketTansport = new WebSocketTansport(()=>remoteTransport )
    const remoteTransport: WebSocketTansport =  new WebSocketTansport(()=>localTransport)

    test("一对一完全对象同步",()=>{
        const localStore = new AutoStore({
            order:{
                price:100,
                count:2,
                total:computed(order=>order.price * order.count)
            }
        })
        const remoteStore = new AutoStore({
            order:{
                price:100,
                count:2,
                total:computed(order=>order.price * order.count)
            }
        })
        
        new AutoStoreSyncer(localStore,{transport:localTransport})
        new AutoStoreSyncer(remoteStore,{transport:remoteTransport})

        localStore.state.order.count = 3 
        expect(remoteStore.state).toEqual(localStore.state) 
        
    })

    test("初始化时进行一次完全同步对象",()=>{
        const localStore = new AutoStore({
            order:{
                price:100,
                count:2,
                total:computed(order=>order.price * order.count)
            }
        },{id:"local"})
        const remoteStore = new AutoStore({},{id:"remote"})
        remoteStore.watch((operate)=>{
            expect(operate.flags! & SYNC_INIT_FLAG).toBeGreaterThan(0)
        })
        
        new AutoStoreSyncer(remoteStore,{transport:remoteTransport})
        new AutoStoreSyncer(localStore,{transport:localTransport,immediate:true})        
        expect(remoteStore.state).toEqual(localStore.state)          
    })


    test("同步对象成员到远程对象",()=>{
        const localStore = new AutoStore({
            order:{
                price:100,
                count:2,
                total:computed(order=>order.price * order.count)
            }
        })
        const remoteStore = new AutoStore()
        
        new AutoStoreSyncer(localStore,{
            transport:localTransport,
            entry:["order"]
        })
        new AutoStoreSyncer(remoteStore,{transport:remoteTransport})

        localStore.state.order.count = 3 
        expect(remoteStore.state.count).toBe(3)
        remoteStore.state.count = 4 
        expect(localStore.state.order.count).toBe(4)        
    })


    test("同步对象成员到远程对象的指定路径",()=>{
        const localStore = new AutoStore({
            order:{
                price:100,
                count:2,
                total:computed(order=>order.price * order.count)
            }
        })
        const remoteStore = new AutoStore({
            remoteOrder:{
                count:0
            }
        })
        
        new AutoStoreSyncer(localStore,{
            transport:localTransport,
            entry:["order"],
            remoteEntry:["remoteOrder"]
        })
        new AutoStoreSyncer(remoteStore,{transport:remoteTransport})

        localStore.state.order.count = 3 
        expect(remoteStore.state.remoteOrder.count).toBe(3)
        remoteStore.state.remoteOrder.count = 4 
        expect(localStore.state.order.count).toBe(4)        
    })

    test("停止同步时通知对方断开连接",()=>{
        const localStore = new AutoStore({
            order:{
                price:100,
                count:2,
                total:computed(order=>order.price * order.count)
            }
        })
        const remoteStore = new AutoStore({
            order:{
                price:100,
                count:2,
                total:computed(order=>order.price * order.count)
            }
        })
        
        const localSyncer = new AutoStoreSyncer(localStore,{transport:localTransport})
        const remoteSyncer = new AutoStoreSyncer(remoteStore,{transport:remoteTransport})

        localStore.state.order.count = 3
        expect(remoteStore.state).toEqual(localStore.state)
        localSyncer.stop()
        expect(localTransport.isStop).toBeTruthy()
        expect(remoteTransport.isStop).toBeTruthy()
        localStore.state.order.count = 4
        expect(remoteStore.state).not.toEqual(localStore.state)
    })


})
