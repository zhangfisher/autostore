import type { AutoStore } from "../store/store";

export function getComputedType(
    store: AutoStore<any>,
    path: string | string[],
): "none" | "sync" | "async" | "lite-async" {
    const computedObj = store.computedObjects.find(path);
    if (computedObj) {
        if (computedObj.async) {
            return (computedObj as any).lite ? "lite-async" : "async";
        } else {
            return "sync";
        }
    }
    return "none";
}
