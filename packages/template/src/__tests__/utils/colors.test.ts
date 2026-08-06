import { describe, expect, test } from "bun:test";
import "../setup";
import { parseColor, rgba } from "../../utils/colors";

describe("colors 颜色解析（parseColor）", () => {
    test("hex 全形态", () => {
        expect(parseColor("#000")).toEqual([0, 0, 0]);
        expect(parseColor("#000000")).toEqual([0, 0, 0]);
        expect(parseColor("#888")).toEqual([136, 136, 136]);
        expect(parseColor("#ffa516")).toEqual([255, 165, 22]);
        // #rgba / #rrggbbaa 丢弃 alpha
        expect(parseColor("#000f")).toEqual([0, 0, 0]);
        expect(parseColor("#ffa516ff")).toEqual([255, 165, 22]);
    });
    test("rgb()/rgba()", () => {
        expect(parseColor("rgb(255, 165, 0)")).toEqual([255, 165, 0]);
        expect(parseColor("rgba(0,0,0,0.5)")).toEqual([0, 0, 0]);
    });
    test("hsl()", () => {
        expect(parseColor("hsl(0, 100%, 50%)")).toEqual([255, 0, 0]);
    });
    test("颜色名表", () => {
        expect(parseColor("black")).toEqual([0, 0, 0]);
        expect(parseColor("white")).toEqual([255, 255, 255]);
        expect(parseColor("red")).toEqual([255, 0, 0]);
    });
    test("非法输入返回 null", () => {
        expect(parseColor("notacolor")).toBeNull();
        expect(parseColor("")).toBeNull();
    });
});

describe("colors alpha 合成（rgba）", () => {
    test("合法颜色 + alpha → rgba 字符串", () => {
        expect(rgba("white", 0.5)).toBe("rgba(255, 255, 255, 0.5)");
        expect(rgba("#000", 0.5)).toBe("rgba(0, 0, 0, 0.5)");
        expect(rgba("red", 1)).toBe("rgba(255, 0, 0, 1)");
    });
    test("alpha 超界 clamp 到 [0,1]", () => {
        expect(rgba("black", 2)).toBe("rgba(0, 0, 0, 1)");
        expect(rgba("black", -1)).toBe("rgba(0, 0, 0, 0)");
    });
    test("不可识别颜色回退黑色", () => {
        expect(rgba("notacolor", 0.5)).toBe("rgba(0, 0, 0, 0.5)");
    });
});
