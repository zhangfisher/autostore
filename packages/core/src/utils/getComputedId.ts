import type { ComputedOptions } from "../computed/types";
import { joinPath } from "./joinPath";

/**
 * 生成计算属性的id
 * @param valuePath
 * @param idArg ()=>string
 * @returns
 */
export function getComputedId(valuePath: string[], computedOptions: ComputedOptions) {
    let id = "";
    if (computedOptions.id) {
        id = computedOptions.id;
    } else {
        id = joinPath(valuePath);
    }
    return id;
}
