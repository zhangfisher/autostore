/**
 * 空值判定的默认集：`null` / `undefined` / `NaN`（ADR-0014 决策 2）。
 *
 * 这三者几乎总是「缺失值」，默认即算空。它们在代码内**硬编码**——刻意不经过 `x-*-options` 的宽松
 * JSON 解析：relaxed-json 无法可靠表达 `undefined`（被解析为字符串 `"undefined"`）与 `NaN`
 * （解析抛 `not a float`），仅 `null` 可正确表达。故用户经 `emptyValues` 只能**附加**更多算空
 * 的值（如 `0`/`""`），不能移除这三个默认成员（见 `resolveEmptyValues`）。
 */
export const DEFAULT_EMPTY_VALUES = [null, undefined, NaN];

/**
 * 解析用户声明的 emptyValues：**附加到默认集**，而非覆盖。
 *
 * `x-text-options="{emptyValues:[0]}"` → 最终 `[null, undefined, NaN, 0]`。
 * 如此用户无需重写 null/undefined/NaN，且即便误写 `undefined`/`NaN` 字面量（relaxed-json 会
 * 误解析），默认集仍兜底保证这三者算空。
 *
 * @param user 用户声明的附加空值（来自 `getOption("emptyValues")`，可能 undefined/非数组）
 * @returns 最终判空集（默认集 + 用户附加；includes 不受重复元素影响，故不去重）
 */
export function resolveEmptyValues(user: any): any[] {
    return Array.isArray(user) ? [...DEFAULT_EMPTY_VALUES, ...user] : DEFAULT_EMPTY_VALUES;
}

/**
 * 空值占位与 `.hide` 渲染器工厂（ADR-0014）。
 *
 * 统一 x-text / x-html 的「值级空状态」处理：据 `emptyValues` 判定绑定值是否为空，
 * 空时按 `hide` 决定隐藏宿主（`display:none`，惰性缓存并还原原内联 display）或写入 `empty`
 * 占位内容；非空时还原 display（若曾隐藏）并写入真实值。
 *
 * 两个指令仅「写内容的方式」不同（textContent vs innerHTML±sanitize），由 `writeContent`
 * 回调注入，故 empty/hide 逻辑单点维护（DRY）。
 *
 * 判空用 `Array.prototype.includes`（SameValueZero 算法），故 `NaN` 可命中——`indexOf` 不行。
 *
 * @param el            宿主元素（scope 通道 created 时必有）
 * @param userEmptyValues 用户声明的附加空值（经 `resolveEmptyValues` 合并默认集）
 * @param empty         空值占位内容（默认 `""`，已是字符串）
 * @param hide          是否启用 `.hide`（空值隐藏宿主）
 * @param writeContent  写入内容的回调；text 为最终字符串，调用方决定 textContent / innerHTML±sanitize
 * @returns `apply(value)` —— 传入绑定求值结果，执行渲染
 */
export function createEmptyRenderer(
    el: HTMLElement,
    userEmptyValues: any,
    empty: string,
    hide: boolean,
    writeContent: (text: string) => void,
): (value: any) => void {
    const emptyValues = resolveEmptyValues(userEmptyValues);
    // 惰性缓存原内联 display：仅在首次隐藏时读一次，恢复时还原。
    // 不读 getComputedStyle——避免把 CSS 类计算值（如 flex）固化成内联、污染 CSS 驱动布局。
    let prevDisplay: string | undefined;
    return (value: any) => {
        if (!el) return;
        const isEmpty = emptyValues.includes(value);
        if (isEmpty) {
            if (hide) {
                // `.hide` 优先（ADR-0014 决策 5）：空值时隐藏宿主，跳过内容写入
                if (prevDisplay === undefined) prevDisplay = el.style.display;
                el.style.display = "none";
                return;
            }
            writeContent(empty);
        } else {
            // 非空：若曾隐藏则还原原内联 display
            if (hide && prevDisplay !== undefined) el.style.display = prevDisplay;
            writeContent(value == null ? "" : String(value));
        }
    };
}
