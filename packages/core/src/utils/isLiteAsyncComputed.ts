import type { AutoStore } from "../store/store";
import { getComputedType } from "./getComputedType";

export function isLiteAsyncComputed(store: AutoStore<any>, path: string | string[]): boolean {
    return getComputedType(store, path) === "lite-async";
}
