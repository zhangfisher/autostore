import { describe, expect, test } from "bun:test";
import { isStatePath } from "../../utils/isStatePath";

describe("isStatePath - 合法路径（基础结构）", () => {
	test("单段路径返回 true", () => {
		expect(isStatePath("a")).toBe(true);
	});

	test("多段对象路径返回 true", () => {
		expect(isStatePath("user.name")).toBe(true);
	});

	test("三层以上嵌套路径返回 true", () => {
		expect(isStatePath("a.b.c")).toBe(true);
	});
});

describe("isStatePath - 合法路径（数组索引）", () => {
	test("纯数字单段返回 true", () => {
		expect(isStatePath("0")).toBe(true);
	});

	test("对象后接数字索引返回 true", () => {
		expect(isStatePath("items.0")).toBe(true);
	});

	test("数字索引后继续嵌套返回 true", () => {
		expect(isStatePath("items.0.name")).toBe(true);
	});

	test("多位数字索引返回 true", () => {
		expect(isStatePath("list.99.title")).toBe(true);
	});
});

describe("isStatePath - 合法路径（除 . 外任意字符均合法）", () => {
	test("含连字符的 key 返回 true", () => {
		expect(isStatePath("user-name")).toBe(true);
	});

	test("含空格的 key 返回 true", () => {
		expect(isStatePath("us er.name")).toBe(true);
	});

	test("含 @ 符号的 key 返回 true", () => {
		expect(isStatePath("user@name")).toBe(true);
	});

	test("含 # 符号的 key 返回 true", () => {
		expect(isStatePath("a#b.c#d")).toBe(true);
	});

	test("含 $ 与 _ 的标识符返回 true", () => {
		expect(isStatePath("$var._field")).toBe(true);
	});

	test("含中文的 key 返回 true", () => {
		expect(isStatePath("用户.姓名")).toBe(true);
	});
});

describe("isStatePath - 非法结构（点分隔符相关）", () => {
	test("空字符串返回 false", () => {
		expect(isStatePath("")).toBe(false);
	});

	test("单个点返回 false", () => {
		expect(isStatePath(".")).toBe(false);
	});

	test("以点开头返回 false", () => {
		expect(isStatePath(".user")).toBe(false);
	});

	test("以点结尾返回 false", () => {
		expect(isStatePath("user.")).toBe(false);
	});

	test("连续点返回 false", () => {
		expect(isStatePath("user..name")).toBe(false);
	});

	test("仅连续两个点返回 false", () => {
		expect(isStatePath("..")).toBe(false);
	});

	test("开头即连续点返回 false", () => {
		expect(isStatePath(".a.b")).toBe(false);
	});

	test("结尾前出现点返回 false", () => {
		expect(isStatePath("a.b.")).toBe(false);
	});
});

describe("isStatePath - 非字符串输入", () => {
	test("null 返回 false", () => {
		expect(isStatePath(null)).toBe(false);
	});

	test("undefined 返回 false", () => {
		expect(isStatePath(undefined)).toBe(false);
	});

	test("数字返回 false", () => {
		expect(isStatePath(123)).toBe(false);
	});

	test("对象返回 false", () => {
		expect(isStatePath({})).toBe(false);
	});

	test("数组返回 false", () => {
		expect(isStatePath([])).toBe(false);
	});

	test("NaN 返回 false", () => {
		expect(isStatePath(NaN)).toBe(false);
	});
});

describe("isStatePath - 边界", () => {
	test("纯数字字符串视为合法单段返回 true", () => {
		expect(isStatePath("123")).toBe(true);
	});

	test("含前后空格的路径视为合法（空格为合法 key 字符）返回 true", () => {
		expect(isStatePath(" user.name ")).toBe(true);
	});
});
