import { ComputedObject } from "../computed";
import type { AutoStore } from "../store/store";

export function getComputedObject(
    store: AutoStore<any>,
    path: string | string[],
): ComputedObject | undefined {
    return store.computedObjects.find(path);
}
