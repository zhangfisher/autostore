import { createContext } from '@lit/context';
import { AutoStore, Dict } from 'autostore';
import type { AutoForm } from './form';

export type AutoFormContext = {
    store?: AutoStore<Dict>
    form?: AutoForm
    labelPos?: 'none' | 'top' | 'left'
    advanced?: boolean
    dark?: boolean
}

export const context = createContext<AutoFormContext>('autoform');