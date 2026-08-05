/**
 * 修饰符共享守卫工厂与常量（DRY 基石）。
 *
 * 各按键/鼠标/系统修饰符文件经工厂产出 GuardModifierDesc，避免重复；
 * left/right 双义守卫复用此处的 createKeyAliasGuard/createMouseButtonGuard.apply。
 */
import type { GuardModifierDesc } from "../types";

/** 键盘事件类型集合：.left/.right/.up/.down 在此类事件中按方向键语义（e.key） */
export const KEY_EVENTS = new Set(["keydown", "keyup", "keypress"]);
/** 鼠标事件类型集合：.left/.right/.middle 在此类事件中按鼠标按键语义（e.button） */
export const MOUSE_EVENTS = new Set(["mousedown", "mouseup", "click", "contextmenu"]);

/** 按键别名 → KeyboardEvent.key 标准值 */
export const KEY_ALIAS: Record<string, string> = {
    enter: "Enter",
    tab: "Tab",
    esc: "Escape",
    space: " ",
    delete: "Delete",
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
};

/** 鼠标按键名 → MouseEvent.button 值 */
export const MOUSE_BUTTON: Record<string, number> = {
    left: 0,
    middle: 1,
    right: 2,
};

/** 系统修饰符键名（ctrl/alt/shift/meta），对应 KeyboardEvent 上的 ctrlKey 等布尔属性 */
export const SYS_KEYS = ["ctrl", "alt", "shift", "meta"] as const;

/**
 * 按键别名守卫工厂（enter/tab/delete/esc/space/up/down）。
 *
 * 匹配 `KeyboardEvent.key`（KEY_ALIAS 已用标准值，大小写敏感）。
 * `delete` 别名额外捕获 Backspace（Vue 语义）。
 */
export function createKeyAliasGuard(alias: string): GuardModifierDesc {
    const expected = KEY_ALIAS[alias];
    return {
        name: alias,
        type: "guard",
        apply: (e) => {
            const key = (e as KeyboardEvent).key;
            if (alias === "delete") return key === "Delete" || key === "Backspace";
            return key === expected;
        },
    };
}

/**
 * 鼠标按键守卫工厂（middle；left/right 因双义见各自文件）。
 * 匹配 `MouseEvent.button`。
 */
export function createMouseButtonGuard(name: string): GuardModifierDesc {
    const expected = MOUSE_BUTTON[name];
    return {
        name,
        type: "guard",
        apply: (e) => (e as MouseEvent).button === expected,
    };
}

/**
 * 系统修饰符守卫工厂（ctrl/alt/shift/meta）。
 * 默认"包含"语义：对应修饰键按下即放行（不排斥其他修饰键）；精确控制组合用 `.exact`。
 */
export function createSystemGuard(name: string): GuardModifierDesc {
    const prop = `${name}Key` as "ctrlKey" | "altKey" | "shiftKey" | "metaKey";
    return {
        name,
        type: "guard",
        apply: (e) => !!((e as KeyboardEvent)[prop]),
    };
}
