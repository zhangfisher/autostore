import type { AutoStoreOptions, Dict, GetTypeByPath, StateOperate, StateOperateType } from "autostore";
import { AutoStoreSyncer } from "./syncer";


export type AutoStoreSyncerOptions = {
    id?: string
    from?: string[] | string
    to?: string[] | string
    transport?: IAutoStoreSyncTransport
    autostart?: boolean
    // 发送到远程之前触发，可以在此修改operate，叠加自己的数据到了operate, 返回false可以阻止发送
    onSend?: (operate: StateRemoteOperate) => boolean | void
    // 发送到远程之前触发，可以在此修改operate，叠加自己的数据到了operate, 返回false可以阻止发送
    onReceive?: (operate: StateRemoteOperate) => boolean | void
    // 是否进行一次同步
    immediate?: boolean
    // 当启用缓存时，缓存的最大数量,超出部分会自动删除
    maxCacheSize?: number
    // 0:双向同步, 1: from->to,  2: to->from 
    direction?: 'both' | 'forward' | 'backward'
    // 是否进行一次同步
    filter?: (operate: StateOperate) => boolean
    /**
     * 将远程操作映射到本地 
     * 比如将['order','price']映射成['order.price']等
     * pathMap.toLocal在接收到更新时调用
     * pathMap.toRemote在发送到远程时调用
     * 
     * 注意：
     *  如果是双向同步，则需要同时指定from,to才可以正常工作
     */
    pathMap?: {
        toLocal?: (path: string[], value: any) => string[] | undefined
        toRemote?: (path: string[], value: any) => string[] | undefined
    }
}

export type StateRemoteOperate<Value = any> = {
    id: string                       // 同步器id，在一对多/多对一时，用于区分不同的同步器
    type: StateOperateType | '$stop' | '$update' | '$push' | '$pull' | '$pull-update',
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


export type AutoStoreCloneOptions<State extends Dict, Entry extends string> = AutoStoreOptions<State> & {
    entry?: Entry,
    sync?: 'none' | AutoStoreSyncerOptions['direction']
}



declare module "autostore" {
    interface AutoStore<State extends Dict> {
        sync(toStore: AutoStore<any>, options?: AutoStoreSyncerOptions): AutoStoreSyncer
        clone<Entry extends string, CloneState extends Record<string, any> = GetTypeByPath<State, Entry>>(
            options?: AutoStoreCloneOptions<State, Entry>
        ): AutoStore<CloneState>
    }
}