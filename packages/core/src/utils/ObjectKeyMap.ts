export class ObjectKeyMap<K = any, V = any> extends Map<K, V> {
    #normalizeKey(key: any) {
        if (typeof key === 'object') {
            return JSON.stringify(key);
        }
        return key;
    }

    set(key: K, value: V) {
        return super.set(this.#normalizeKey(key), value);
    }

    get(key: K) {
        return super.get(this.#normalizeKey(key));
    }

    has(key: K) {
        return super.has(this.#normalizeKey(key));
    }

    delete(key: K) {
        return super.delete(this.#normalizeKey(key));
    }
}
