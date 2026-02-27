import { ObserverObject } from "../observer";
import { AutoStore } from "./store";
import type { Dict } from "../types";
import { getVal } from "../utils/getVal";
import { Watcher } from "../watch/types";

export type RefState = {
    off: () => void;
    ref: <Value = any>(path: string | string[]) => Value | undefined;
};

export function createRefState(
    storeRef: WeakRef<AutoStore<any>>,
    observerObj: ObserverObject,
): RefState {
    let watcher: Watcher | null = null;
    return {
        ref: <Value = any>(path: string | string[], args?: Record<string, any>) => {
            const store = storeRef.deref();
            if (store) {
                if (!watcher) {
                    watcher = store.watch(path, () => {
                        observerObj.run(args);
                    });
                }
                return getVal(store.state, path) as Value;
            }
        },
        off: () => {
            watcher?.off();
        },
    };
}
