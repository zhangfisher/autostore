import { createContext } from '@lit/context';
import { AutoStore, Dict } from 'autostore';
import type { AutoForm } from './form';

export type AutoFormContext = {
    store: AutoStore<Dict>
    form: AutoForm
    labelPos?: 'none' | 'top' | 'left'
    labelWidth: string
    helpPos?: 'default' | 'value' | 'label'
    grid: boolean                       // 显示网格线
    dark: boolean
    size: 'small' | 'medium' | 'large'
}

export const context = createContext<AutoFormContext>('autoform');