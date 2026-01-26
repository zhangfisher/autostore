import type { StateRemoteOperate } from '../types';
import { EventEmitter } from '../utils/emitter';
 
/**
 * 传输层事件类型
 */
export type TransportEvents = {
    /** 连接建立时触发 */
    connect: void;
    /** 连接断开时触发 */
    disconnect: void;
    /** 接收到远程操作时触发 */
    operate: StateRemoteOperate;
    /** 发生错误时触发 */
    error: Error;
};

export type AutoStoreSyncTransportReceiver  = (operate: StateRemoteOperate) => void


export type AutoStoreSyncTransportOptions = {
    debug?:boolean // 启用时会在接收到每一条消息时触发operate事件
}

/**
 * AutoStore 同步传输基类
 * 支持注册多个 receiver 来接收远程操作
 * 继承 EventEmitter 提供完整的事件系统
 */
export class AutoStoreSyncTransportBase<Options extends Record<string,any>=Record<string,any>> extends EventEmitter<TransportEvents> {
    protected receivers = new Map<string,AutoStoreSyncTransportReceiver>();
    protected stopCallbacks = new Map<string, () => void>();
    connected: boolean = false;
    options={} as AutoStoreSyncTransportOptions & Options;
    static seq: number = 0;
    readonly id: string;

    constructor(options?:AutoStoreSyncTransportOptions & Options ) {
        super();
        Object.assign(this.options,options)
        this.id = `transport-${++AutoStoreSyncTransportBase.seq}`;
    }

    /**
     * 添加 receiver
     * @param id 接收器唯一标识
     * @param callback 接收远程操作的回调函数
     */
    addReceiver(id: string, callback:AutoStoreSyncTransportReceiver)  {
        this.receivers.set(id, callback);
        return ()=>{
            this.receivers.delete(id);    
        }
    }

    /**
     * 移除 receiver
     * @param id 接收器的唯一标识
     */
    removeReceiver(id: string): void {
        this.receivers.delete(id);
    }
    /**
     * 供子类继承
     */
    protected _send(operate: StateRemoteOperate){
        if(!this.connected) throw new Error()
        
    }   
 
    /**
     * 建立连接
     * 触发 connect 事件
     */
    async connect() {
        if (this.connected) {
            return;
        }
        if(await this.onCreateConnect()){
            this.connected = true
            this.emit('connect', undefined);
        }
    }
    /**
     * 本方法供子类重载用于创建连接
     */
    protected onCreateConnect():boolean | Promise<boolean> {
        return true
    }
    /**
     * 本方法供子类重载用于销毁连接
     */
    protected onDestoryConnect():void{
        
    }
    /**
     * 本方法用于监听消息事件
     */
    protected onSendOperate(operate: StateRemoteOperate): void {
    }
    /**
     * 本方法用于监听消息事件
     */
    protected onReceiveOperate(operate: StateRemoteOperate): void {
        // 通知所有注册的 receivers，让它们自己决定是否处理该消息
        for (const callback of this.receivers.values()) {
            callback(operate);
        }
    }
    send(operate:StateRemoteOperate){
        if (!this.connected) {
            throw new Error('Transport is not connected')
        }
        this.onSendOperate(operate)
        if(this.options.debug){
            this.emit('operate',operate)
        }
    }
    /**
     * 断开连接
     * 触发 disconnect 事件
     */
    disconnect(): void {
        if (!this.connected) {
            return;
        }
        try{
            this.onDestoryConnect()
        }finally{
            this.connected = false;
            this.emit('disconnect', undefined);
        }
    }
    /**
     * 注册事件监听器（继承自 EventEmitter）
     * @param event 事件名称
     * @param handler 事件处理函数
     * @returns 取消订阅的函数
     */
    on<K extends keyof TransportEvents>(
        event: K,
        handler: (value: TransportEvents[K]) => void,
    ): { off: () => void } {
        return super.on(event, handler);
    }

    /**
     * 移除事件监听器（继承自 EventEmitter）
     * @param event 事件名称
     * @param handler 事件处理函数
     */
    off<K extends keyof TransportEvents>(
        event: K,
        handler: (value: TransportEvents[K]) => void,
    ): void {
        super.off(event, handler);
    }

    /**
     * 移除所有事件监听器
     */
    offAll(): void {
        this.all.clear();
    }
}
