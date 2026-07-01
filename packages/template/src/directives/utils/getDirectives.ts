import { toJson } from "really-relaxed-json";
import type { DirectiveInfo } from "../types";

/** 事件绑定快捷前缀 */
const EVENT_PREFIX = "@";
/** 属性绑定快捷前缀 */
const BIND_PREFIX = ":";
/** 指令 options 补充参数的后缀，如 x-if-options */
const OPTIONS_SUFFIX = "-options";
/** 事件绑定指令名称 */
const EVENT_DIRECTIVE_NAME = "event";
/** 属性绑定指令名称 */
const BIND_DIRECTIVE_NAME = "bind";

/**
 * 拆分名称主体与修饰符
 *
 * 句点（.）为首段与其后修饰符的分隔符。首段可能进一步含冒号分隔的属性参数
 * （由调用方处理），这里只负责按 . 切分。
 *
 * @example
 * splitHeadAndModifiers("click")            // { head:"click", modifiers:[] }
 * splitHeadAndModifiers("click.debounce")   // { head:"click", modifiers:["debounce"] }
 * splitHeadAndModifiers("if.once.y")        // { head:"if", modifiers:["once","y"] }
 */
function splitHeadAndModifiers(rest: string): { head: string; modifiers: string[] } {
    const segments = rest.split(".");
    const head = segments[0] ?? "";
    const modifiers = segments.slice(1).filter((mod) => mod.length > 0);
    return { head, modifiers };
}

/**
 * 解析 options 补充参数值
 *
 * 使用 really-relaxed-json 解析宽松 JSON（允许无引号键、尾逗号、注释等），
 * 解析结果必须是普通对象，否则抛出错误。
 *
 * @param rawValue - 属性原始值，如 `{a:1}` 或 `{ name: "x", count: 3 }`
 */
function parseOptions(rawValue: string): Record<string, any> {
    const parsed: unknown = JSON.parse(toJson(rawValue));
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error(`指令 options 必须是对象字符串，实际解析得到：${JSON.stringify(parsed)}`);
    }
    return parsed as Record<string, any>;
}

/**
 * 解析长前缀指令体
 *
 * 将形如 `bind:title.once` 的字符串解析为指令信息：
 * - 冒号（:）分隔指令名称与属性参数（attr）
 * - 句点（.）分隔修饰符（modifiers）
 *
 * @example
 * parsePrefixedDirective("if", "xxx")             // { name:"if", value:"xxx" }
 * parsePrefixedDirective("bind:title", "xxx")     // { name:"bind", attr:"title", value:"xxx" }
 * parsePrefixedDirective("if.once.y", "xxx")      // { name:"if", value:"xxx", modifiers:["once","y"] }
 */
function parsePrefixedDirective(rest: string, rawValue: string): DirectiveInfo {
    const { head, modifiers } = splitHeadAndModifiers(rest);
    const info: DirectiveInfo = { name: head };

    // head 可能形如 "name:attr"
    const colonIndex = head.indexOf(":");
    if (colonIndex >= 0) {
        info.name = head.slice(0, colonIndex);
        info.attr = head.slice(colonIndex + 1);
    }

    // 空值视为无值指令（如 x-calk），不输出 value 字段
    if (rawValue !== "") {
        info.value = rawValue;
    }
    if (modifiers.length > 0) {
        info.modifiers = modifiers;
    }
    return info;
}

/**
 *
 * 解析返回元素上的所有指令信息
 *
 * 指令形式：
 * <div x-if="xxx"></div>  // 普通指令，{name:"if",value:"xxx"}
 * <div x-calk></div>          // 只有名称没有值 {name:"calk"}
 * <div @click="xxxx"></div>    // 事件绑定指令,{name:"event",value:"xxx"}
 * <div x-event:click="xxx"></div>    // 事件绑定指令,{name:"event",value:"xxx"}
 * <div @click.debounce="xxx"></div>    // 事件绑定指令,{name:"event",value:"xxxx",attr:"click",modifiers:[debounce]}     *
 * <div x-bind:title="xxx"></div>   //   {name:"bind",value:"xxx",attr:"title"}
 * <div :title="xxx"></div>   //  {name:"bind",value:"xxx",attr:"title"},:title是快捷方式
 * <div x-if.once.y="xxx"></div> //{name:"if",value:"xxx",modifiers:["once","y"]}
 * <div x-if="xxx" x-if-options="{a:1}"></div> // {name:"if",value:"xxx",options:{a:1}}   以-options结性的视为对x-if指令的补充额外的选项参数
 *
 * x-if-options值必须是一个对象字符串，使用really-relaxed-json进行解析
 *
 * 按顺序进行解析并返回结果
 *
 * 说明：
 * - 事件类指令（@event / x-event:name）统一解析为 name 为 "event"，事件名放入 attr，
 *   修饰符放入 modifiers；属性类指令（:attr / x-bind:name）统一解析为 name 为 "bind"。
 * - `@` 与 `:` 为固定快捷前缀，不受 prefix 参数影响；prefix 仅控制 x- 这类长前缀的识别。
 * - options 补充参数（x-{name}-options）不单独占位，而是合并到同元素上同名指令的 options 字段；
 *   若找不到同名主指令则忽略（补充参数无主指令则无意义）。
 *
 * @param el
 */
export function getDirectives(el: HTMLElement, prefix = "x-"): DirectiveInfo[] {
    if (!(el instanceof HTMLElement)) return [];
    const results: DirectiveInfo[] = [];
    // 暂存 options 补充参数，待主指令收集完毕后合并
    const pendingOptions: Array<{ name: string; value: Record<string, any> }> = [];

    const attributes = el.attributes;
    for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];
        if (!attr) continue;
        const rawName = attr.name;
        const rawValue = attr.value;

        // 1. @ 事件快捷前缀：@click / @click.debounce -> { name:"event", attr:"click"[, modifiers] }
        if (rawName.startsWith(EVENT_PREFIX)) {
            const { head, modifiers } = splitHeadAndModifiers(rawName.slice(EVENT_PREFIX.length));
            const info: DirectiveInfo = { name: EVENT_DIRECTIVE_NAME, attr: head };
            if (rawValue !== "") info.value = rawValue;
            if (modifiers.length > 0) info.modifiers = modifiers;
            results.push(info);
            continue;
        }

        // 2. : 属性绑定快捷前缀：:title / :title.mod -> { name:"bind", attr:"title"[, modifiers] }
        if (rawName.startsWith(BIND_PREFIX)) {
            const { head, modifiers } = splitHeadAndModifiers(rawName.slice(BIND_PREFIX.length));
            const info: DirectiveInfo = { name: BIND_DIRECTIVE_NAME, attr: head };
            if (rawValue !== "") info.value = rawValue;
            if (modifiers.length > 0) info.modifiers = modifiers;
            results.push(info);
            continue;
        }

        // 3. x- 长前缀指令
        if (rawName.startsWith(prefix)) {
            const rest = rawName.slice(prefix.length);

            // 3a. -options 后缀：x-if-options="..." 视为对同名指令的额外选项补充
            if (rest.endsWith(OPTIONS_SUFFIX)) {
                const directiveName = rest.slice(0, rest.length - OPTIONS_SUFFIX.length);
                if (directiveName.length > 0) {
                    pendingOptions.push({ name: directiveName, value: parseOptions(rawValue) });
                }
                continue;
            }

            // 3b. 普通长前缀指令：rest 形如 name | name:attr | name.mod | name:attr.mod
            results.push(parsePrefixedDirective(rest, rawValue));
            continue;
        }

        // 其余普通 HTML 属性（class、id 等）忽略
    }

    // 4. 将 options 合并到已解析的同名指令；同名取最后一个（与"后声明生效"一致）
    for (const opt of pendingOptions) {
        let target: DirectiveInfo | undefined;
        for (const info of results) {
            if (info.name === opt.name) target = info;
        }
        if (target) {
            target.options = { ...target.options, ...opt.value };
        }
    }

    return results;
}
