/**
 * really-relaxed-json 模块类型声明
 *
 * 该库未自带 TypeScript 类型，这里仅声明 findDirectives 用到的解析能力。
 * 详见：https://github.com/eplawless/really-relaxed-json
 */
declare module "really-relaxed-json" {
    /**
     * 将宽松 JSON 字符串（允许无引号键、尾逗号、注释等）转换为标准 JSON 字符串。
     *
     * @param rjsonString - 宽松 JSON 字符串，如 `{a:1}`
     * @param compact - 是否输出紧凑形式，默认 true
     * @returns 标准 JSON 字符串，如 `{"a":1}`
     */
    export function toJson(rjsonString: string, compact?: boolean): string;

    /**
     * 将标准 JSON 字符串转换为宽松 JSON 字符串。
     */
    export function toRJson(jsonString: string, compact?: boolean): string;

    /**
     * 将宽松 JSON 字符串转换为 JavaScript 字面量字符串。
     */
    export function toJs(rjsonString: string, compact?: boolean): string;

    /**
     * 创建一个宽松 JSON 解析器实例。
     */
    export function createParser(): {
        stringToValue(rjsonString: string): unknown;
        stringToJson(rjsonString: string): string;
    };
}
