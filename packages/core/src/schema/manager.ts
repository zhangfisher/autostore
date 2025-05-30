import { PATH_DELIMITER, VALUE_SCHEMA } from "../consts";
import type { AutoStore } from "../store/store";
import { ComputedState, Dict, StatePath } from '../types';
import { getValueByPath } from "../utils/getValueByPath";
import { GetSchemaObjectByPath, NewSchemaObject, SchemaObject, SchemaState, SchemaStatePath } from "./types";
import { isComputedDescriptorParameter } from '../utils/isComputedDescriptorParameter';

export class SchemaManager<State extends Dict> extends Map<string, SchemaObject<any, ComputedState<State>>> {
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

    add<Define extends SchemaObject<any, ComputedState<State>>>(path: string | string[], schema: Define): NewSchemaObject<Define> {
        // @ts-ignore
        schema.path = Array.isArray(path) ? path : path.split(PATH_DELIMITER)
        schema[VALUE_SCHEMA] = true
        this.set(this._getKey(path), schema as any)
        this._createComputedSchemaObject(schema)
        return schema as NewSchemaObject<Define>
    }
    /**
     * Schema对象的所有属性均可以是一个computed对象
     * 
     * 当目标数据变化时
     * 
     * @param schema 
     */
    private _createComputedSchemaObject(schema: any) {
        Object.entries(schema).forEach(([key, value]) => {
            if (['path', 'value'].includes(key)) return
            if (isComputedDescriptorParameter(value)) {
                const computedObject = this.store.computedObjects.create((value as any)() as any)
                this.store.watch(schema.path, ({ value }: any) => {
                    (schema as any)[key] = value
                    this.store.emit("schema:updated", schema)
                });
                (schema as any)[key] = computedObject.value
            }
        })
    }

    get<T extends SchemaStatePath<State> = SchemaStatePath<State>>(path: T): GetSchemaObjectByPath<State, T> | undefined {
        return super.get(this._getKey(path)) as unknown as GetSchemaObjectByPath<State, T> | undefined
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


