import type { ModifierDesc } from "../types";
import once from "./once";
import capture from "./capture";
import passive from "./passive";
import self from "./self";
import debounce from "./debounce";
import ctrl from "./ctrl";
import alt from "./alt";
import shift from "./shift";
import meta from "./meta";
import exact from "./exact";
import enter from "./enter";
import tab from "./tab";
import deleteMod from "./delete";
import esc from "./esc";
import space from "./space";
import up from "./up";
import down from "./down";
import left from "./left";
import right from "./right";
import middle from "./middle";
import feedback from "./feedback";
import pending from "./pending";
import resolved from "./resolved";
import rejected from "./rejected";

/**
 * 内置修饰符注册表：name → descriptor。
 *
 * OnDirective 据 modifiers 列表按名查表，按 type 分派（option 合并 / guard AND 链 / wrapper 包裹）。
 * 未知名静默跳过（便于未来扩展或用户自定义修饰符不报错）。
 */
export const MODIFIERS: Record<string, ModifierDesc> = {
    once,
    capture,
    passive,
    self,
    debounce,
    ctrl,
    alt,
    shift,
    meta,
    exact,
    enter,
    tab,
    delete: deleteMod,
    esc,
    space,
    up,
    down,
    left,
    right,
    middle,
    feedback,
    pending,
    resolved,
    rejected,
};
