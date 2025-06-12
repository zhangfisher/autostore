import { PATH_DELIMITER } from "../consts";
import type { AutoStore } from "../store/store";
import { ComputedState, Dict, } from '../types';
import { forEachObject, setVal } from "../utils";
import { getVal } from "../utils/getVal";
import { SchemaOptions, SchemaValidator, ComputedSchemaState, SchemaDescriptor } from "./types";


export class SchemaManager<
    State extends Dict,
    SchemaStore extends AutoStore<ComputedSchemaState<State>> = AutoStore<ComputedSchemaState<State>>
> {
    errors: Dict<string> = {}          // {<路径名称>:"错误信息"}
    _subscribers: any[] = []
    store!: SchemaStore
    validators: Record<string, SchemaValidator<any>> = {}
    _descriptors?: Record<string, SchemaDescriptor<any, any>>
    constructor(public shadow: AutoStore<any>) {
    }
    _getKey(path: any): string {
        return Array.isArray(path) ? path.join('_$_') : path.split(PATH_DELIMITER).join('_$_')
    }
    _getPath(path: string) {
        return path.split('_$_')
    }
    add<V = any, Options extends SchemaOptions<V> = SchemaOptions<V>>(
        path: string | string[],
        descriptor: SchemaDescriptor<V, Options>
    ): void {
        const pathKey = Array.isArray(path) ? path : path.split(PATH_DELIMITER)
        const key = this._getKey(path);
        if (!this._descriptors) this._descriptors = {}
        this._descriptors[key] = Object.assign(
            {},
            descriptor.options,
            {
                path: pathKey
            }) as unknown as SchemaDescriptor
        if (descriptor.validator) {
            this.validators[key] = Object.assign({
                onFail: 'throw'
            }, descriptor.validator)
        }
        // 
        this.shadow.peep((state) => {
            setVal(state, pathKey, descriptor.value)
        })
    }
    /**
     * 等store的所有计算属性处理完毕再创建schemas
     * 
     */
    build() {
        if (this.store) return
        if (!this._descriptors) return
        this.store = this.shadow.shadow(this._descriptors) as unknown as SchemaStore
    }
    get<T extends keyof SchemaStore['state'] = keyof SchemaStore['state']>(path: T): SchemaStore['state'][T] | undefined {
        if (!this.store) return undefined
        return getVal(this.store.state, this._getKey(path as any))
    }
    has(path: keyof SchemaStore['state']): boolean {
        if (!this.store) return false
        const key = this._getKey(path)
        return key in (this.store.state as any)
    }
    watch() {
        // @ts-ignore
        return this.store.watch(...arguemnts)
    }
    getValidator<T extends keyof SchemaStore['state'] = keyof SchemaStore['state']>(
        path: T
    ): SchemaValidator<SchemaStore['state'][T]> | undefined {
        if (!this.store) return undefined
        const key = this._getKey(path)
        return this.validators[key]
    }

    remove(path: keyof SchemaStore['state']) {
        if (!this.store) return undefined
        const key = this._getKey(path)
        delete (this.store.state as any)[key]
    }


}


