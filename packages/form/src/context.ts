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
    grid: boolean                       // 显示网格线
    dark: boolean
    compact: boolean
    invalide: boolean
    border: 'none' | 'outline' | 'grid'
    size: 'small' | 'medium' | 'large'
    validAt: 'input' | 'lost-focus'
    layout: 'auto' | 'row' | 'col'
    dirty: boolean
    showInitialError: boolean
}

export const context = createContext<AutoFormContext>('autoform');