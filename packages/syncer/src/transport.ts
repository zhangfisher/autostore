import type { StateOperateType } from "autostore";


export type StateRemoteOperate<Value = any> = {
    id: string                       // 同步器id，在一对多/多对一时，用于区分不同的同步器
    type: StateOperateType | '$stop' | '$update',
    path: string[],
    value: Value,
    indexs?: number[],               // 数组操作时，操作的索引，如[1,2]表示操作了数组的第1个和第2个元素
    parentPath?: string[],
    reply?: boolean
    flags: number
}



export interface IAutoStoreSyncTransport {
    id?: string                          // 额外的id标识
    ready?: boolean
    send(operate: StateRemoteOperate): void
    receive(callback: (operate: StateRemoteOperate) => void): void
    // 当接收到了远程的stop操作时触发
    onStop?: () => void
}
