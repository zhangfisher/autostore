import { AutoStoreEvents } from "../store/types";
import { AnyAutoStore } from "../types";

export function emitStoreEventWithResult<
    T = any,
    Event extends keyof AutoStoreEvents = keyof AutoStoreEvents,
>(
    store: AnyAutoStore,
    event: Event,
    args: AutoStoreEvents[Event]["type"],
    handle: (results: any[]) => T,
) {
    try {
        const results = store.emit(event, args);
        return handle(results);
    } catch (e: any) {
        store.logger.error(`Error while emit store event ${event}: ${e.message}`);
    }
}
