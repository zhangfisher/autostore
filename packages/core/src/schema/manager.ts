import { PATH_DELIMITER } from "../consts";
import type { AutoStore } from "../store/store";
import { ComputedState, Dict, StatePath, GetTypeByPath } from '../types';
import { getVal } from "../utils/getVal";
import { SchemaObject } from "./schema";
import { SchemaOptions, SchemaDescriptor, SchemaState, SchemaKeyPaths, SchemaValidator, GetSchemaOptionsByPath, ComputedSchemaState } from "./types";


export class SchemaManager<
    State extends Dict,
    SchemaStore extends AutoStore<ComputedSchemaState<State>> = AutoStore<ComputedSchemaState<State>>
> {
    errors: Dict<string> = {}          // {<路径名称>:"错误信息"}
    _subscribers: any[] = []
    store: SchemaStore
    validators: Record<string, SchemaValidator<any>> = {}
    constructor(public shadow: AutoStore<any>) {
        this.store = shadow.shadow({}) as SchemaStore
    }
    _getKey(path: any) {
        return Array.isArray(path) ? path.join('_$_') : path.split(PATH_DELIMITER).join('_$_')
    }
    _getPath(path: string) {
        return path.split('_$_')
    }
    add<Define extends SchemaOptions<any, ComputedState<State>>>(path: string | string[], descriptor: SchemaDescriptor<any>): SchemaObject<Define> {
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


