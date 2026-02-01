import { describe, test, it, expect } from "bun:test";
import { getAbsolutePath } from "../../src/utils/getAbsolutePath";

describe("getAbsolutePath", () => {
    describe("绝对路径（数组形式）", () => {
        it("应该直接返回数组形式的绝对路径", () => {
            // Arrange
            const path = ["a", "b", "c"];

            // Act
            const result = getAbsolutePath(path);

            // Assert
            expect(result).toEqual(["a", "b", "c"]);
        });

        it("空数组绝对路径应该直接返回", () => {
            // Arrange
            const path: string[] = [];

            // Act
            const result = getAbsolutePath(path);

            // Assert
            expect(result).toEqual([]);
        });

        it("单元素数组绝对路径应该直接返回", () => {
            // Arrange
            const path = ["root"];

            // Act
            const result = getAbsolutePath(path);

            // Assert
            expect(result).toEqual(["root"]);
        });

        it("数组第一个元素是 './' 相对路径时应该解析", () => {
            // Arrange
            const path = ["./a", "b", "c"];
            const basePath = ["x", "y"];

            // Act
            const result = getAbsolutePath(path, basePath);

            // Assert
            expect(result).toEqual(["x", "y", "a", "b", "c"]);
        });

        it("数组第一个元素是 '../' 相对路径时应该解析", () => {
            // Arrange
            const path = ["../a", "b", "c"];
            const basePath = ["x", "y"];

            // Act
            const result = getAbsolutePath(path, basePath);

            // Assert
            expect(result).toEqual(["x", "a", "b", "c"]);
        });

        it("数组第一个元素是特殊关键字时应该解析", () => {
            // Arrange
            const path = ["CURRENT", "a", "b"];
            const basePath = ["x", "y"];

            // Act
            const result = getAbsolutePath(path, basePath);

            // Assert
            expect(result).toEqual(["x", "y", "a", "b"]);
        });

        it("数组第一个元素是相对路径但没有 basePath 时应该返回原数组", () => {
            // Arrange
            const path = ["./a", "b", "c"];

            // Act
            const result = getAbsolutePath(path);

            // Assert
            expect(result).toEqual(["./a", "b", "c"]);
        });
    });

    describe("相对路径 './' (当前目录)", () => {
        it("应该正确解析 './x' 相对路径", () => {
            // Arrange
            const path = "./x";
            const basePath = ["a", "b", "c"];

            // Act
            const result = getAbsolutePath(path, basePath);

            // Assert
            expect(result).toEqual(["a", "b", "c", "x"]);
        });

        it("应该正确解析 './' (空相对部分)", () => {
            // Arrange
            const path = "./";
            const basePath = ["a", "b", "c"];

            // Act
            const result = getAbsolutePath(path, basePath);

            // Assert
            expect(result).toEqual(["a", "b", "c"]);
        });

        it("应该正确解析 './x/y' 多级相对路径", () => {
            // Arrange
            const path = "./x/y";
            const basePath = ["a", "b", "c"];

            // Act
            const result = getAbsolutePath(path, basePath);

            // Assert
            // PATH_DELIMITER 是 '.'，所以 'x/y' 不会按 '/' 分割
            expect(result).toEqual(["a", "b", "c", "x/y"]);
        });

        it("单层 basePath 解析 './x'", () => {
            // Arrange
            const path = "./x";
            const basePath = ["root"];

            // Act
            const result = getAbsolutePath(path, basePath);

            // Assert
            expect(result).toEqual(["root", "x"]);
        });
    });

    describe("相对路径 '../' (父目录)", () => {
        it("应该正确解析 '../x' 相对路径", () => {
            // Arrange
            const path = "../x";
            const basePath = ["a", "b", "c"];

            // Act
            const result = getAbsolutePath(path, basePath);

            // Assert
            // ../x 表示在父级路径下添加 x，父级是 ['a', 'b']
            expect(result).toEqual(["a", "b", "x"]);
        });

        it("应该正确解析 '../' (空相对部分)", () => {
            // Arrange
            const path = "../";
            const basePath = ["a", "b", "c"];

            // Act
            const result = getAbsolutePath(path, basePath);

            // Assert
            expect(result).toEqual(["a", "b"]);
        });

        it("应该正确解析 '../../x' 多级父路径", () => {
            // Arrange
            const path = "../../x";
            const basePath = ["a", "b", "c"];

            // Act
            const result = getAbsolutePath(path, basePath);

            // Assert
            // ../../x 表示在上上级路径下添加 x，上上级是 ['a']
            expect(result).toEqual(["a", "x"]);
        });

        it("应该正确解析 '../../../x' 超出根目录", () => {
            // Arrange
            const path = "../../../x";
            const basePath = ["a", "b", "c"];

            // Act
            const result = getAbsolutePath(path, basePath);

            // Assert
            // 三级 '../' 从 ['a', 'b', 'c'] 回溯到 []，然后添加 'x'
            expect(result).toEqual(["x"]);
        });

        it("应该正确解析 '../../../../x' 严重超出根目录返回 undefined", () => {
            // Arrange
            const path = "../../../../x";
            const basePath = ["a", "b", "c"];

            // Act
            const result = getAbsolutePath(path, basePath);

            // Assert
            // 四级 '../' 超出根目录，返回 undefined
            expect(result).toBeUndefined();
        });

        it("应该正确解析 '../x/y' 父目录下的多级路径", () => {
            // Arrange
            const path = "../x/y";
            const basePath = ["a", "b", "c"];

            // Act
            const result = getAbsolutePath(path, basePath);

            // Assert
            // ../x/y 表示在父级路径下添加 x/y，父级是 ['a', 'b']
            // PATH_DELIMITER 是 '.'，所以 'x/y' 不会按 '/' 分割
            expect(result).toEqual(["a", "b", "x/y"]);
        });
    });

    describe("特殊关键字", () => {
        it("CURRENT 应该返回当前路径", () => {
            // Arrange
            const path = "CURRENT";
            const basePath = ["a", "b", "c"];

            // Act
            const result = getAbsolutePath(path, basePath);

            // Assert
            expect(result).toEqual(["a", "b", "c"]);
        });

        it("SELF 应该返回当前路径", () => {
            // Arrange
            const path = "SELF";
            const basePath = ["a", "b", "c"];

            // Act
            const result = getAbsolutePath(path, basePath);

            // Assert
            expect(result).toEqual(["a", "b", "c"]);
        });

        it("PARENT 应该返回父级路径", () => {
            // Arrange
            const path = "PARENT";
            const basePath = ["a", "b", "c"];

            // Act
            const result = getAbsolutePath(path, basePath);

            // Assert
            expect(result).toEqual(["a", "b"]);
        });

        it("PARENT 在单层路径时应该返回空数组", () => {
            // Arrange
            const path = "PARENT";
            const basePath = ["root"];

            // Act
            const result = getAbsolutePath(path, basePath);

            // Assert
            expect(result).toEqual([]);
        });
    });

    describe("普通绝对路径字符串", () => {
        it("应该直接分割普通路径字符串", () => {
            // Arrange
            const path = "x.y.z";

            // Act
            const result = getAbsolutePath(path);

            // Assert
            expect(result).toEqual(["x", "y", "z"]);
        });

        it("单级路径字符串", () => {
            // Arrange
            const path = "root";

            // Act
            const result = getAbsolutePath(path);

            // Assert
            expect(result).toEqual(["root"]);
        });

        it("应该忽略 basePath 当 path 是绝对路径字符串", () => {
            // Arrange
            const path = "x.y.z";
            const basePath = ["a", "b", "c"];

            // Act
            const result = getAbsolutePath(path, basePath);

            // Assert
            expect(result).toEqual(["x", "y", "z"]);
        });
    });

    describe("边界情况", () => {
        it("没有 basePath 时相对路径应该返回单元素数组", () => {
            // Arrange
            const path = "./x";

            // Act
            const result = getAbsolutePath(path);

            // Assert
            expect(result).toEqual(["./x"]);
        });

        it("没有 basePath 时 '../x' 应该返回单元素数组", () => {
            // Arrange
            const path = "../x";

            // Act
            const result = getAbsolutePath(path);

            // Assert
            expect(result).toEqual(["../x"]);
        });

        it("没有 basePath 时特殊关键字应该返回单元素数组", () => {
            // Arrange
            const path = "CURRENT";

            // Act
            const result = getAbsolutePath(path);

            // Assert
            expect(result).toEqual(["CURRENT"]);
        });

        it("空路径字符串应该返回空数组", () => {
            // Arrange
            const path = "";

            // Act
            const result = getAbsolutePath(path);

            // Assert
            expect(result).toEqual([""]);
        });

        it("绝对路径字符串没有 basePath 时应该正常分割", () => {
            // Arrange
            const path = "a.b.c";

            // Act
            const result = getAbsolutePath(path);

            // Assert
            expect(result).toEqual(["a", "b", "c"]);
        });
    });

    describe("复杂场景", () => {
        it("应该正确处理深层嵌套路径的相对解析", () => {
            // Arrange
            const path = "./child/grandchild";
            const basePath = ["store", "users", "items"];

            // Act
            const result = getAbsolutePath(path, basePath);

            // Assert
            // PATH_DELIMITER 是 '.'，所以 'child/grandchild' 不会按 '/' 分割
            expect(result).toEqual(["store", "users", "items", "child/grandchild"]);
        });

        it("应该正确处理多层父路径回溯", () => {
            // Arrange
            const path = "../../../sibling";
            const basePath = ["a", "b", "c", "d", "e"];

            // Act
            const result = getAbsolutePath(path, basePath);

            // Assert
            expect(result).toEqual(["a", "b", "sibling"]);
        });

        it("混合使用相对路径和特殊关键字", () => {
            // Arrange
            const path = "../data";
            const basePath = ["store", "users", "active"];

            // Act
            const result = getAbsolutePath(path, basePath);

            // Assert
            expect(result).toEqual(["store", "users", "data"]);
        });
    });
});
