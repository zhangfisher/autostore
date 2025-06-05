import { PATH_DELIMITER } from "../consts";
import type { AutoStore } from "../store/store";
import { ComputedState, Dict, StatePath } from '../types';
import { getValueByPath } from "../utils/getValueByPath";
import { SchemaObject } from "./schema";
import { GetSchemaOptionsByPath, SchemaOptions, SchemaDescriptor, SchemaState, SchemaStatePath } from "./types";


export class SchemaManager<State extends Dict> extends Map<string, SchemaObject<any>> {
    errors: Dict<string> = {}          // {<路径名称>:"错误信息"}
    _subscribers: any[] = []
    constructor(public store: AutoStore<any>) {
        super()
    }
    _getKey(path: string | string[]) {
        return Array.isArray(path) ? path.join('_$_') : path.split(PATH_DELIMITER).join('_$_')
    }
    _getPath(path: string) {
        return path.split('_$_')
    }

    add<Define extends SchemaOptions<any, ComputedState<State>>>(path: string | string[], descriptor: SchemaDescriptor<any>): SchemaObject<Define> {
        const key = this._getKey(path)
        if (this.has(key as any)) {
            return this.get(key as any) as unknown as SchemaObject<Define>
        } else {
            const shadow = this.store.shadow(descriptor.options) as SchemaObject<Define>
            shadow.validate = descriptor.validate
            shadow.path = Array.isArray(path) ? path : path.split(PATH_DELIMITER)
            this.set(this._getKey(path), shadow)
            return shadow as unknown as SchemaObject<Define>
        }
    }

    get<T extends SchemaStatePath<State> = SchemaStatePath<State>>(path: T): SchemaObject<GetSchemaOptionsByPath<State, T>> | undefined {
        return super.get(this._getKey(path)) as unknown as SchemaObject<GetSchemaOptionsByPath<State, T>> | undefined
    }

    remove(path: StatePath<State> | string | string[]): boolean {
        return super.delete(this._getKey(path))
    }
    delete(path: StatePath<State>): boolean {
        return super.delete(this._getKey(path))
    }
    has(path: StatePath<State>): boolean {
        return super.has(this._getKey(path))
    }
    getKeys() {
        return super.keys() as SchemaStatePath<State>
    }
    /**
     * 返回所有标注了Schema的状态值
     * {
     *    [path]:<value>
     * }
     * @returns 
     */
    getState(): SchemaState<State> {
        const state: any = {}
        for (const key of this.keys()) {
            const path = this._getPath(key)
            state[path.join(PATH_DELIMITER)] = getValueByPath(this.store.state, path)
        }
        return state as SchemaState<State>
    }

}


