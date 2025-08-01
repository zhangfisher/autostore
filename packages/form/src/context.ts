import { createContext } from '@lit/context';
import type { AutoStore, Dict } from 'autostore';
import type { AutoForm } from './form';

export type AutoFormContext = {
    store: AutoStore<Dict>
    form: AutoForm
    labelPos?: 'none' | 'top' | 'left'
    labelWidth: string
    readonly: boolean
    viewonly: boolean
    viewAlign: 'left' | 'center' | 'right'
    helpPos?: 'value' | 'label'
    dark: boolean
    compact: boolean
    invalid: boolean
    border: 'none' | 'outline' | 'grid'
    size: 'small' | 'medium' | 'large'
    validAt: 'input' | 'lost-focus'
    layout: 'auto' | 'row' | 'col'
    dirty: boolean
    validAtInit: boolean
}

export const context = createContext<AutoFormContext>('autoform');