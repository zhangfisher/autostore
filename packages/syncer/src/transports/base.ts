import type { StateRemoteOperate } from '../types';

export interface IAutoStoreSyncTransport {
    id?: string; // 额外的id标识
    ready?: boolean; // 当准备就绪时
    send(operate: StateRemoteOperate): void;
    receive(callback: (operate: StateRemoteOperate) => void): void;
    // 当接收到了远程的stop操作时触发
    onStop?: () => void;
}
