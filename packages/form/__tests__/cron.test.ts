/**
 * cron widget 纯函数单元测试
 *
 * 覆盖：解析/序列化 round-trip、连续压缩 a-b、周 0→7 兼容、高级语法透传、
 * 字段数不匹配（严格）、间隔偏移 X/N、友好描述省略规则
 */
import { describe, expect, test } from "bun:test";
import { parseCron, serializeCron, describeCron } from "../src/widgets/cron";

describe("cron 解析", () => {
    test("6 字段标准表达式解析成功", () => {
        const expr = parseCron("0 8 1 * * 2027");
        expect(expr.valid).toBe(true);
        expect(expr.minute?.pattern).toBe("pick");
        expect(expr.minute?.picks).toEqual([0]);
        expect(expr.hour?.picks).toEqual([8]);
        expect(expr.day?.picks).toEqual([1]);
        expect(expr.month?.pattern).toBe("any");
        expect(expr.week?.pattern).toBe("any");
        expect(expr.year?.picks).toEqual([2027]);
    });

    test("7 字段表达式在 enableSeconds 时解析成功", () => {
        const expr = parseCron("30 0 8 * * * *", true);
        expect(expr.valid).toBe(true);
        expect(expr.second?.picks).toEqual([30]);
    });

    test("字段数不匹配判为不可解析（严格，不静默补删）", () => {
        // 7 字段串配 6 字段模式
        expect(parseCron("30 0 8 * * * *", false).valid).toBe(false);
        // 6 字段串配 7 字段模式
        expect(parseCron("0 8 1 * * *", true).valid).toBe(false);
        // 垃圾串
        expect(parseCron("不是表达式").valid).toBe(false);
        expect(parseCron("").valid).toBe(false);
    });

    test("周 0 兼容：解析为周日(7)", () => {
        const expr = parseCron("0 0 * * 0 *");
        expect(expr.week?.picks).toEqual([7]);
        // 0 和 7 同时出现去重
        const expr2 = parseCron("0 0 * * 0,7 *");
        expect(expr2.week?.picks).toEqual([7]);
    });

    test("间隔字段：*/N 与 X/N", () => {
        const expr = parseCron("*/5 * * * * *");
        expect(expr.minute?.pattern).toBe("interval");
        expect(expr.minute?.start).toBe(0);
        expect(expr.minute?.step).toBe(5);
        const expr2 = parseCron("10/15 * * * * *");
        expect(expr2.minute?.start).toBe(10);
        expect(expr2.minute?.step).toBe(15);
    });

    test("高级语法透传：L/W/# 与混合式挂在 advanced 上", () => {
        const expr = parseCron("0 0 L * * *");
        expect(expr.day?.pattern).toBe("any");
        expect(expr.day?.advanced).toBe("L");
        const expr2 = parseCron("0 0 1-15/2 * * *");
        expect(expr2.day?.advanced).toBe("1-15/2");
    });

    test("值域外数字透传而非崩溃", () => {
        const expr = parseCron("0 25 * * * *");
        expect(expr.hour?.advanced).toBe("25");
        // 月份 0 越界（1-12）
        const expr2 = parseCron("0 0 * 0 * *");
        expect(expr2.month?.advanced).toBe("0");
    });
});

describe("cron 序列化", () => {
    test("round-trip：解析再序列化还原表达式", () => {
        const cases = ["0 8 1 * * 2027", "*/5 * * * * *", "10/15 * * * * *", "0 0 1,15 3 * 2027-2028"];
        for (const c of cases) {
            expect(serializeCron(parseCron(c), false)).toBe(c);
        }
    });

    test("连续数字压缩为 a-b 区间", () => {
        const expr = parseCron("0 0 1,2,3,4,5,10,11 * * *");
        expect(serializeCron(expr, false)).toBe("0 0 1-5,10-11 * * *");
    });

    test("高级语法序列化原样透传", () => {
        const expr = parseCron("0 0 L * 1#1 *");
        expect(serializeCron(expr, false)).toBe("0 0 L * 1#1 *");
    });

    test("周 7 序列化不回退为 0", () => {
        const expr = parseCron("0 0 * * 0 *");
        expect(serializeCron(expr, false)).toBe("0 0 * * 7 *");
    });

    test("间隔起始为字段最小值时序列化为 */N", () => {
        const expr = parseCron("*/5 * * * * *");
        expect(serializeCron(expr, false)).toBe("*/5 * * * * *");
    });
});

describe("cron 友好描述", () => {
    test("全 * 显示每分钟/每秒兜底", () => {
        expect(describeCron("* * * * * *", false)).toBe("每分钟");
        expect(describeCron("* * * * * * *", true)).toBe("每秒");
    });

    test("省略 * 字段：只说出具体指定的维度", () => {
        // 每月 1 日 8 点 0 分（年/月/周为 * 省略）
        expect(describeCron("0 8 1 * * *", false)).toBe("1日、8点、0分");
    });

    test("间隔描述：每N<单位>与从X开始", () => {
        expect(describeCron("*/5 * * * * *", false)).toBe("每5分钟");
        expect(describeCron("10/15 * * * * *", false)).toBe("每15分钟从10开始");
    });

    test("周显示中文全名", () => {
        expect(describeCron("0 0 * * 1 *", false)).toBe("周一、0点、0分");
    });

    test("秒为单值 0 时省略", () => {
        // 7 字段：秒=0 分=0 时=8
        expect(describeCron("0 0 8 * * * *", true)).toBe("8点、0分");
        // 秒非 0 时显式说出
        expect(describeCron("30 0 8 * * * *", true)).toContain("30秒");
    });

    test("多值 pick 连续值压缩为区间", () => {
        // 3,4 连续 → 3-4月
        expect(describeCron("0 0 * 3,4 * *", false)).toBe("3-4月、0点、0分");
        // 1,2,3,10 → 1-3分钟、10分钟（分字段）
        expect(describeCron("1,2,3,10 * * * * *", false)).toBe("1-3分、10分");
        // 1,2,3 → 1-3分钟（全连续）
        expect(describeCron("1,2,3 * * * * *", false)).toBe("1-3分");
    });

    test("不可解析表达式原样返回", () => {
        expect(describeCron("garbage", false)).toBe("garbage");
    });

    test("i18n 覆盖文案", () => {
        const out = describeCron("*/5 * * * * *", false, { descEveryField: "every {value}", minute: "min" });
        expect(out).toBe("every 5min");
    });
});
