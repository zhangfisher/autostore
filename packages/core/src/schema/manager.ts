import { PATH_DELIMITER, VALUE_SCHEMA } from "../consts";
import type { AutoStore } from "../store/store";
import { ComputedState, Dict, StatePath } from '../types';
import { getValueByPath } from "../utils/getValueByPath";
import { GetSchemaObjectByPath, NewSchemaObject, SchemaObject, SchemaObjectArgs, SchemaState, SchemaStatePath } from "./types";
import { isComputedDescriptorParameter } from '../utils/isComputedDescriptorParameter';
import type { StateOperate } from "../store";
import { isAsyncComputedValue } from "../utils";
import { ObserverScopeRef } from "../observer";

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

    add<Define extends SchemaObjectArgs<any, ComputedState<State>>>(path: string | string[], schema: Define): NewSchemaObject<Define> {
        // @ts-ignore
        schema.path = Array.isArray(path) ? path : path.split(PATH_DELIMITER)
        // @ts-ignore
        schema[VALUE_SCHEMA] = true
        const key = this._getKey(path)
        if (this.has(key as any)) {
            return this.get(key as any) as NewSchemaObject<Define>
        } else {
            this.set(this._getKey(path), schema as any)
            this._createComputedSchemaObject(schema)
            return schema as NewSchemaObject<Define>
        }
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
                computedObject.watch((operate: StateOperate) => {
                    const shcmeaValue = (schema as any)[key]
                    if (operate.reply) return
                    let values: Record<string, any> = {}
                    if (operate.type === 'batch') {
                        operate.value.reduce((vals: any, cur: any) => {
                            vals[cur.path[1]] = cur.value
                            return vals
                        }, values)
                    } else {
                        values[operate.path[1]] = operate.value
                    }
                    if (isAsyncComputedValue(shcmeaValue)) {
                        Object.assign(shcmeaValue, values)
                    } else {
                        (schema as any)[key] = operate.value
                    }
                    this.store.emit("schema:updated", schema)
                }, { operates: 'write' });
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


