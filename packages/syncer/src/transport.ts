import type { StateOperate } from "autostore";


export type StateRemoteOperate = Omit<StateOperate, 'parent' | 'oldValue'> & {
    flags: number
} 
export interface IAutoStoreSyncTransport{
    ready?:boolean
    send(operate:StateRemoteOperate):void
    receive(callback:(operate:StateRemoteOperate)=>void):void
}
