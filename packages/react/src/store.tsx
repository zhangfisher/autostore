import React from 'react';
import { AutoStore, type Dict, type AutoStoreOptions } from 'autostore';
import { createUseReactive } from './hooks/useReactive';
import { createUseDeps } from './hooks/useDeps';
import { createSignalComponent } from './signal';
import type { SignalComponentType } from './signal/types';
import { createUseField } from './form/useField';
import type {
    UseDepsType,
    UseWatchType,
    UseReactiveType,
    UseComputedObjectType,
    UseAsyncReactiveType,
    UseComputedType,
    UseObserverObjectType,
} from './hooks/types';
import type { UseFieldType, UseFieldsType } from './form/types';
import '@autostorejs/plugins/asyncpro';
import { createUseWatch } from './hooks/useWatch';
import { createUseFields } from './form/useFields';
import { createUseComputed } from './hooks/useComputed';
import { createUseAsyncReactive } from './hooks/useAsyncReactive';
import { createUseComputedObject } from './hooks/useComputedObject';
import { createUseObserverObject } from './hooks/useObserver';

export class ReactAutoStore<State extends Dict> extends AutoStore<State> {
    useReactive: UseReactiveType<State>;
    useAsyncReactive: UseAsyncReactiveType<State>;
    useDeps: UseDepsType<State>;
    $: SignalComponentType<State>;
    signal: SignalComponentType<State>;
    useWatch: UseWatchType<State>;
    useField: UseFieldType<State>;
    useFields: UseFieldsType<State>;
    useObserverObject: UseObserverObjectType<State>;
    useComputedObject: UseComputedObjectType<State>;
    useComputed: UseComputedType<State>;

    constructor(initial: State, options?: AutoStoreOptions<State>) {
        super(
            initial,
            Object.assign(
                {
                    signalErrorBoundary: () => <>ERROR</>,
                    resetable: true,
                    configManager: false,
                },
                options,
            ),
        );
        this.signal = this.$ = createSignalComponent(this).bind(this);
        this.useReactive = createUseReactive(this).bind(this);
        this.useAsyncReactive = createUseAsyncReactive(this).bind(this);
        this.useDeps = createUseDeps(this).bind(this);
        this.useWatch = createUseWatch(this).bind(this);
        this.useField = createUseField(this).bind(this);
        this.useFields = createUseFields(this).bind(this);
        this.useObserverObject = createUseObserverObject(this).bind(this);
        this.useComputedObject = createUseComputedObject(this).bind(this);
        this.useComputed = createUseComputed(this).bind(this);
        this.reset = this.reset.bind(this);
    }
}

export function createStore<State extends Dict>(initial: State, options?: AutoStoreOptions<State>) {
    return new ReactAutoStore<State>(initial, options);
}
