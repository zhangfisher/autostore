import { AutoStoreEvents } from "../store/types";
import { AnyAutoStore } from "../types";

export function emitEvent(store: AnyAutoStore, event: keyof AutoStoreEvents, args: any) {
    try {
        store.emit(event, args);
    } catch (e: any) {
        store.logger.error(`Error while emit store event ${event}: ${e.message}`);
    }
}
export function emitStoreEvent<T extends keyof AutoStoreEvents>(
    store: AnyAutoStore,
    event: T,
    args: AutoStoreEvents[T]["type"],
    nextTick: boolean = false,
) {
    if (nextTick) {
        setTimeout(() => {
            emitEvent(store, event, args);
        }, 0);
    } else {
        emitEvent(store, event, args);
    }
}
