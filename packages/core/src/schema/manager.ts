import { PATH_DELIMITER } from "../consts";
import type { AutoStore } from "../store/store";
import { ComputedState, Dict, } from '../types';
import { getVal } from "../utils/getVal";
import { SchemaOptions, SchemaValidator, ComputedSchemaState } from "./types";


export class SchemaManager<
    State extends Dict,
    SchemaStore extends AutoStore<ComputedSchemaState<State>> = AutoStore<ComputedSchemaState<State>>
> {
    errors: Dict<string> = {}          // {<路径名称>:"错误信息"}
    _subscribers: any[] = []
    store: SchemaStore
    validators: Record<string, SchemaValidator<any>> = {}
    constructor(public shadow: AutoStore<any>) {
        this.store = shadow.shadow({

        }) as SchemaStore
    }
    _getKey(path: any) {
        return Array.isArray(path) ? path.join('_$_') : path.split(PATH_DELIMITER).join('_$_')
    }
    _getPath(path: string) {
        return path.split('_$_')
    }
    add<V = any, Options extends SchemaOptions<V> = SchemaOptions<V>>(
        path: string | string[],
        descriptor: Options
    ): ComputedState<Options> {
        const key = this._getKey(path);
        (this.store.state as any)[key] = Object.assign(
            {},
            descriptor.options,
            {
                path: Array.isArray(path) ? path : path.split(PATH_DELIMITER)
            })
        if (descriptor.validator) {
            this.validators[key] = Object.assign({
                onFail: 'throw'
            }, descriptor.validator)
        }
        return (this.store.state as any)[key]
    }
    get<T extends keyof SchemaStore['state'] = keyof SchemaStore['state']>(path: T): SchemaStore['state'][T] | undefined {
        return getVal(this.store.state, this._getKey(path as any))
    }
    has(path: keyof SchemaStore['state']): boolean {
        const key = this._getKey(path)
        return key in (this.store.state as any)
    }

    getValidator<T extends keyof SchemaStore['state'] = keyof SchemaStore['state']>(
        path: T
    ): SchemaValidator<SchemaStore['state'][T]> | undefined {
        const key = this._getKey(path)
        return this.validators[key]
    }

    remove(path: keyof SchemaStore['state']) {
        const key = this._getKey(path)
        delete (this.store.state as any)[key]
    }


}


