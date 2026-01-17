import { AutoStore, describe, test, expect } from 'bun:test';

describe('测试 computed:done 事件', () => {
    test('同步计算应该触发 done 事件', () => {
        let doneCount = 0;
        let lastValue: any = undefined;

        const store = new AutoStore(
            {
                count: 1,
                double: (scope: any) => scope.count * 2,
            },
            {
                onComputedDone(args) {
                    console.log("onComputedDone 被调用:", args);
                    doneCount++;
                    lastValue = args.value;
                },
            }
        );

        console.log("初始值:", store.state.double);
        console.log("doneCount 初始:", doneCount);

        store.state.count = 5;
        console.log("修改后读取:", store.state.double);
        console.log("doneCount 修改后:", doneCount);
        console.log("lastValue:", lastValue);

        expect(doneCount).toBe(1);
        expect(lastValue).toBe(10);
    });
});
