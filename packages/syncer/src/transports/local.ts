import type { StateRemoteOperate } from '../types';
import type { IAutoStoreSyncTransport } from './base';

export class LocalTansport implements IAutoStoreSyncTransport {
    ready = true;
    receiveCallback: any;
    isStop: boolean = false;
    constructor(public getPeer: () => LocalTansport) {}
    send(operate: StateRemoteOperate) {
        this.getPeer().receiveCallback(operate);
    }
    receive(callback: any) {
        this.receiveCallback = callback;
    }
    onStop() {
        this.isStop = true;
    }
}
