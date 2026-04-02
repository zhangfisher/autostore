import type { AutoStore } from "../store/store";

export function isAsyncComputed(store: AutoStore<any>, path: string | string[]): boolean {
    const computedObj = store.computedObjects.find(path);
    if (computedObj) {
        return computedObj.async ?? false;
    }
    return false;
}
