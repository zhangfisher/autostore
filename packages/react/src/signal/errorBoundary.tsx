import { Dict, isPathEq, PATH_DELIMITER, Watcher } from 'autostore';
import { ReactAutoStore } from '../store';
import { SignalComponentOptions } from './types';
import { useEffect, useState } from 'react';

export function useErrorBoundary<State extends Dict>(
    store: ReactAutoStore<State>,
    deps: string[][],
    selector: any,
    options: SignalComponentOptions,
) {
    // @ts-ignore
    const ErrorBoundary: ComponentType<{ error: any }> =
        options.errorBoundary || store.options.signalErrorBoundary;
    const [error, setError] = useState<any>(null);
    useEffect(() => {
        // 当提供ErrorBoundary时
        let errorWatcher: Watcher | undefined;
        if (ErrorBoundary) {
            errorWatcher = store.on('computed:error', ({ path, error }) => {
                const strPath = Array.isArray(selector)
                    ? selector
                    : typeof selector === 'string'
                    ? selector.split(PATH_DELIMITER)
                    : null;
                if (strPath) {
                    if (isPathEq(path, strPath)) {
                        setError(error);
                    }
                }
            });
        }
        return () => {
            errorWatcher?.off();
        };
    }, [deps]);
    return [error, setError, ErrorBoundary];
}
