/**
 * 字符串插值替换工具
 *
 * 支持多种参数格式：
 * - 对象: `"{a}+{b}".params({a:1,b:2})` => "1+2"
 * - 数组: `"{}+{}".params([1,2])` => "1+2"
 *
 * undefined/null 处理：
 * - "{a}{b}".params({a:1}) => "1"
 *
 * 函数执行：
 * - "{a}".params({a:()=>"hello"}) => "hello"
 *
 * 注意：{} 内部只支持字母（a-z, A-Z, \d），允许空格，空 {} 使用位置参数
 */

declare global {
    interface String {
        params(vars: Record<string, any>): string;
        params(vars: any[]): string;
        params(...vars: any[]): string;
    }
}

/**
 * 字符串插值替换函数
 * @param str 原始字符串
 * @param args 参数，可以是对象、数组或多个值
 * @returns 替换后的字符串
 */
export function params(str: string, ...args: any[]): string {
    let result = str.valueOf();
    let opts: Record<string, any> = {};
    let vars = [...args];

    try {
        // 无参数直接返回
        if (vars.length === 0) {
            return result;
        }

        // 处理单一参数
        if (vars.length === 1) {
            const arg = vars[0];

            // null 或 undefined 直接返回
            if (arg == null) {
                return result;
            }

            // 数组类型 - 转为位置参数
            if (Array.isArray(arg)) {
                vars = arg;
            }
            // 普通对象 - 作为命名参数
            else if (typeof arg === "object") {
                opts = arg;
                vars = [];
            }
        }

        // 正则替换 {} 中的内容（只支持字母，允许空格）
        result = result.replace(/\{\s*([a-zA-Z\d]*)\s*\}/g, (_match, key) => {
            let value: any;

            // 字母键名 - 使用命名参数
            if (key && opts.hasOwnProperty(key)) {
                value = opts[key];
            }
            // 空 {} - 使用位置参数
            else if (!key && vars.length > 0) {
                value = vars.shift();
            }

            // undefined 或 null 返回空字符串
            if (value == null) {
                return "";
            }

            // 执行函数
            if (typeof value === "function") {
                value = value();
            }

            // 转换为字符串
            return String(value);
        });

        return result;
    } catch (e: any) {
        // 异常时返回原字符串
        return result;
    }
}

// 扩展 String 原型
String.prototype.params = function (this: string) {
    return params(this, ...arguments);
};
