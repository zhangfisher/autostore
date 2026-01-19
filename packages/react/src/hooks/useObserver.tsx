import {
    createObserverObject,
    type Dict,
    type ObserverBuilder,
    type ObserverObject,
} from 'autostore';
import { useEffect, useRef } from 'react';
import type { ReactAutoStore } from '../store';
import type { UseObserverObjectType } from './types';

export function createUseObserverObject<State extends Dict>(store: ReactAutoStore<State>) {
    return function <Value>(params: ObserverBuilder, options?: Dict) {
        if (!params) return undefined;
        const ref = useRef<ObserverObject<Value>>();
        if (!ref.current) {
            ref.current = createObserverObject(store, params, options) as ObserverObject<Value>;
        }
        useEffect(() => {
            return () => {
                ref.current?.detach();
                ref.current = undefined;
            };
        }, []);
        return ref.current;
    } as UseObserverObjectType<State>;
}
