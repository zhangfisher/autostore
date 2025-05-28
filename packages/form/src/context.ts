import { createContext } from '@lit/context';
import { AutoStore, Dict } from 'autostore';

export type AutoFormContext = {
    store?: AutoStore<Dict>
    labelPos?: 'none' | 'top' | 'left'
    advanced?: boolean
    dark?: boolean
}

export const context = createContext<AutoFormContext>('autoform');