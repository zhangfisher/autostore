/* eslint-disable @typescript-eslint/no-unused-vars */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <noUnusedFunctionParameters> */
/** biome-ignore-all lint/correctness/noUnusedVariables: <noUnusedVariables> */
import { describe, expect, test } from "vitest";
import { AutoStore } from "../../../core/src";
import { AutoStoreSyncer } from "../syncers/syncer";
import { AutoStoreSyncTransportBase } from "../transports/base";
import type { StateRemoteOperate } from "../types";

/**
 * 手动开关的本地传输器：
 * - gate.open = false 时 connect() 不生效（等价网络未就绪）
 * - 发送的消息直接投递到对端
 * 注意：开关持有外部 gate 引用（base 构造的 Object.assign 是值拷贝，外部修改不会被 this.options 感知）
 */
class GateTransport extends AutoStoreSyncTransportBase<any> {
    peer?: GateTransport;
    gate: { open: boolean };
    constructor(gate: { open: boolean }) {
        super(gate as any);
        this.gate = gate;
    }
    onConnect() {
        return this.gate.open === true;
    }
    onSendOperate(operate: StateRemoteOperate) {
        this.peer?.onReceiveOperate(operate);
    }
}

/**
 * 创建一对通过 GateTransport 连接的 store 同步环境
 */
function createPair() {
    const gate1 = { open: false } as any;
    const gate2 = { open: false } as any;
    const t1 = new GateTransport(gate1);
    const t2 = new GateTransport(gate2);
    t1.peer = t2;
    t2.peer = t1;
    const store1 = new AutoStore({ count: 0 });
    const store2 = new AutoStore({ count: 0 });
    const s1 = new AutoStoreSyncer(store1, {
        transport: t1,
        mode: "none",
        direction: "forward",
    });
    new AutoStoreSyncer(store2, { transport: t2, mode: "none", direction: "backward" });
    return { gate1, gate2, t1, t2, store1, store2, s1 };
}

const delay = (n: number = 20) => new Promise((resolve) => setTimeout(resolve, n));

describe("断线恢复同步", () => {
    test("恢复在线后同步应继续", async () => {
        const { gate1, gate2, t1, t2, store1, store2 } = createPair();
        gate1.open = true;
        gate2.open = true;
        t1.connect();
        t2.connect();

        store1.state.count = 1;
        expect(store2.state.count).toBe(1);

        // 断线：syncer 进入暂停（保留 watch 继续收缓存、保留 connect 监听等重连）
        t1.disconnect();
        t2.disconnect();
        gate1.open = false;
        gate2.open = false;

        // 断线期间的写入进入离线缓存
        store1.state.count = 5;
        expect((store2.state as any).count).toBe(1);

        // 恢复：缓存 flush + 同步继续
        gate1.open = true;
        gate2.open = true;
        t1.connect();
        t2.connect();
        await delay();
        expect((store2.state as any).count).toBe(5);

        // 恢复后的新写入正常同步
        store1.state.count = 10;
        await delay();
        expect((store2.state as any).count).toBe(10);
    });

    test("断线期间多次写入恢复后全部补发", async () => {
        const { gate1, gate2, t1, t2, store1, store2 } = createPair();
        gate1.open = true;
        gate2.open = true;
        t1.connect();
        t2.connect();

        t1.disconnect();
        t2.disconnect();
        gate1.open = false;
        gate2.open = false;

        store1.state.count = 3;
        store1.state.count = 7;

        gate1.open = true;
        gate2.open = true;
        t1.connect();
        t2.connect();
        await delay();
        // 最终值应为最后一次写入
        expect((store2.state as any).count).toBe(7);
    });

    test("显式 stop 后不因 transport 重连而复活", async () => {
        const { gate1, gate2, t1, t2, store1, store2, s1 } = createPair();
        gate1.open = true;
        gate2.open = true;
        t1.connect();
        t2.connect();

        store1.state.count = 1;
        expect(store2.state.count).toBe(1);

        // 显式停止：注销全部监听（含 connect 监听），重连也不应恢复
        s1.stop();

        t1.disconnect();
        t2.disconnect();
        gate1.open = false;
        gate2.open = false;
        store1.state.count = 99;

        gate1.open = true;
        gate2.open = true;
        t1.connect();
        t2.connect();
        await delay();

        expect(s1.syncing).toBe(false);
        expect((store2.state as any).count).toBe(1);
    });
});
