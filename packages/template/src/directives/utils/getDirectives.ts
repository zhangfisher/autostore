import { toJson } from "really-relaxed-json";
import type { AutoDirectiveInfo } from "../types";

/** 事件绑定快捷前缀 */
const EVENT_PREFIX = "@";
/** 属性绑定快捷前缀 */
const BIND_PREFIX = ":";
/** 指令 options 补充参数的后缀，如 x-if-options */
const OPTIONS_SUFFIX = "-options";
/** 事件绑定指令名称（x-event 已过时重命名为 x-on，@ 与 x-on 均产出此名） */
const ON_DIRECTIVE_NAME = "on";
/** 属性绑定指令名称 */
const BIND_DIRECTIVE_NAME = "bind";
/** x-class / x-style 作为 x-bind 特化别名的指令名（解析期归一化为 bind+attr，零运行时实体） */
const CLASS_ALIAS_NAME = "class";
const STYLE_ALIAS_NAME = "style";

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
function parsePrefixedDirective(rest: string, rawValue: string): AutoDirectiveInfo {
    const { head, modifiers } = splitHeadAndModifiers(rest);
    const info: AutoDirectiveInfo = { name: head };

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
 * - 事件类指令（@event / x-on:name）统一解析为 name 为 "on"，事件名放入 attr，
 *   修饰符放入 modifiers；属性类指令（:attr / x-bind:name）统一解析为 name 为 "bind"。
 * - `@` 与 `:` 为固定快捷前缀，不受 prefix 参数影响；prefix 仅控制 x- 这类长前缀的识别。
 * - 指令选项（x-{name}-options）不单独占位，而是合并到同元素上同名指令的 options 字段；
 *   若找不到同名主指令则忽略（补充参数无主指令则无意义）。
 * - modifier（无参开关）在解析期注入为同名指令选项（options[name]=true，显式选项优先）；
 *   故指令层统一只读 options，不再读 modifiers（ADR-0007）。
 * - 元素级宿主选项（裸 x-options）不作为指令，由 getHostOptions 单独解析挂 scope。
 *
 * @param el
 */
export function getDirectives(el: HTMLElement, prefix = "x-"): AutoDirectiveInfo[] {
    if (!(el instanceof HTMLElement)) return [];
    const results: AutoDirectiveInfo[] = [];
    // 暂存 options 补充参数，待主指令收集完毕后合并
    const pendingOptions: Array<{ name: string; value: Record<string, any> }> = [];

    const attributes = el.attributes;
    for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];
        if (!attr) continue;
        const rawName = attr.name;
        const rawValue = attr.value;

        // 1. @ 事件快捷前缀：@click / @click.debounce -> { name:"on", attr:"click"[, modifiers] }
        if (rawName.startsWith(EVENT_PREFIX)) {
            const { head, modifiers } = splitHeadAndModifiers(rawName.slice(EVENT_PREFIX.length));
            const info: AutoDirectiveInfo = { name: ON_DIRECTIVE_NAME, attr: head };
            if (rawValue !== "") info.value = rawValue;
            if (modifiers.length > 0) info.modifiers = modifiers;
            results.push(info);
            continue;
        }

        // 2. : 属性绑定快捷前缀：:title / :title.mod -> { name:"bind", attr:"title"[, modifiers] }
        if (rawName.startsWith(BIND_PREFIX)) {
            const { head, modifiers } = splitHeadAndModifiers(rawName.slice(BIND_PREFIX.length));
            const info: AutoDirectiveInfo = { name: BIND_DIRECTIVE_NAME, attr: head };
            if (rawValue !== "") info.value = rawValue;
            if (modifiers.length > 0) info.modifiers = modifiers;
            results.push(info);
            continue;
        }

        // 3. x- 长前缀指令
        if (rawName.startsWith(prefix)) {
            const rest = rawName.slice(prefix.length);

            // 裸 x-options（元素级宿主选项）：不作为指令，由 getHostOptions 单独解析挂 scope（ADR-0007）
            if (rest === "options") continue;

            // 3a. -options 后缀：x-if-options="..." 视为对同名指令的额外选项补充
            if (rest.endsWith(OPTIONS_SUFFIX)) {
                const directiveName = rest.slice(0, rest.length - OPTIONS_SUFFIX.length);
                if (directiveName.length > 0) {
                    pendingOptions.push({ name: directiveName, value: parseOptions(rawValue) });
                }
                continue;
            }

            // 3b. 普通长前缀指令：rest 形如 name | name:attr | name.mod | name:attr.mod
            const info = parsePrefixedDirective(rest, rawValue);
            // x-class / x-style 作为 x-bind 的特化别名（解析期归一化，零运行时实体）。
            // :class / x-bind:class 经短/长前缀分支已产出 bind+class，此处仅处理裸 x-class / x-style。
            if (info.name === CLASS_ALIAS_NAME) {
                info.name = BIND_DIRECTIVE_NAME;
                info.attr = "class";
            } else if (info.name === STYLE_ALIAS_NAME) {
                info.name = BIND_DIRECTIVE_NAME;
                info.attr = "style";
            }
            results.push(info);
            continue;
        }

        // 其余普通 HTML 属性（class、id 等）忽略
    }

    // 4. 将 options 合并到已解析的同名指令；同名取最后一个（与"后声明生效"一致）
    for (const opt of pendingOptions) {
        let target: AutoDirectiveInfo | undefined;
        for (const info of results) {
            if (info.name === opt.name) target = info;
        }
        if (target) {
            target.options = { ...target.options, ...opt.value };
        }
    }

    // 5. modifier 注入为指令选项（显式优先，ADR-0007）：modifier 是无参开关，等价 options[name]=true。
    //    纯数字段（已废 .debounce.500 的 "500"）不注入；显式 x-{name}-options 已写的键（含 false）不被覆盖。
    for (const info of results) {
        if (!info.modifiers || info.modifiers.length === 0) continue;
        if (!info.options) info.options = {};
        for (const m of info.modifiers) {
            if (/^\d+$/.test(m)) continue;
            if (!(m in info.options)) info.options[m] = true;
        }
    }

    return results;
}

/**
 * 解析元素级宿主选项 `x-options`（ADR-0007）。
 *
 * x-options 声明元素级共享配置，挂载到 scope.hostOptions，供同元素所有指令经
 * `getOption` 回退读取（指令选项未命中时回退到此）。值用宽松 JSON 解析，须为普通对象
 * （否则抛错，与 x-{name}-options 一致）。
 *
 * 与 getDirectives 分离：x-options 不是指令，不进入指令流（getDirectives 显式跳过裸 x-options）。
 *
 * @param el
 * @param prefix 指令前缀，默认 "x-"
 * @returns 解析后的宿主选项对象；元素无 x-options 属性时返回 undefined
 */
export function getHostOptions(
    el: HTMLElement,
    prefix = "x-",
): Record<string, any> | undefined {
    if (!(el instanceof HTMLElement)) return undefined;
    const raw = el.getAttribute(`${prefix}options`);
    if (raw == null) return undefined;
    return parseOptions(raw);
}
