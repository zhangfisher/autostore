import type { AutoStore } from "../store/store";

export function isComputed(store: AutoStore<any>, path: string | string[]): boolean {
    const computedObj = store.computedObjects.find(path);
    if (computedObj) {
        return true
    }
    return false;
}
