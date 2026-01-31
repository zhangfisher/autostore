export function getSnap<T = any>(state: any) {
    if (typeof state === "object") {
        return JSON.parse(JSON.stringify(state));
    }
    return state as T;
}
