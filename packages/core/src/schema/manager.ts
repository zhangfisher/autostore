import { PATH_DELIMITER } from "../consts";
import type { AutoStore } from "../store/store";
import { ComputedState, Dict, StatePath } from "../types";
import { getValueByPath } from "../utils/getValueByPath";
import { ComputedSchemaObject, SchemaObject, SchemaState } from "./types";
import { isComputedDescriptorParameter } from '../utils/isComputedDescriptorParameter';



export class SchemaManager<State extends Dict> extends Map<string, ComputedSchemaObject<any, ComputedState<State>>> {
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
    add(path: StatePath<State>, schema: SchemaObject<any, ComputedState<State>>): SchemaObject<any, ComputedState<State>> {
        schema.path = Array.isArray(path) ? path : path.split(PATH_DELIMITER)
        this.set(this._getKey(path), schema as ComputedSchemaObject<any, ComputedState<State>>)
        return schema
    }
    /**
     * Schema对象的所有属性均可以是一个computed对象
     * 
     * @param schema 
     */
    private _createComputedSchemaObject(schema: SchemaObject) {
        Object.entries(schema).forEach(([key, value]) => {
            if (['path', 'value'].includes(key)) return
            if (isComputedDescriptorParameter(value)) {
                const computedObject = this.store.computedObjects.create(value as any)
                computedObject.watch(({ value }) => {
                    (schema as any)[key] = value
                    this.store.emit("schema:updated", schema)
                })
            }
        })
    }

    get(path: StatePath<State>): ComputedSchemaObject<any, ComputedState<State>> | undefined {
        return super.get(this._getKey(path)) as ComputedSchemaObject<any, ComputedState<State>> | undefined
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


