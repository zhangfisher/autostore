import { PATH_DELIMITER } from "../consts";
import type { AutoStore } from "../store/store";
import { Dict } from "../types";
import { getValueByPath } from "../utils/getValueByPath";
import { SchemaObject, SchemaState } from "./types";

export class SchemaManager<State extends Dict> extends Map<string, SchemaObject> {
    errors: Dict<string> = {}          // {<路径名称>:"错误信息"}
    constructor(public store: AutoStore<any>) {
        super()
    }
    _getKey(path: string | string[]) {
        return Array.isArray(path) ? path.join('_$_') : path.split(PATH_DELIMITER).join('_$_')
    }
    _getPath(path: string) {
        return path.split('_$_')
    }
    add(path: string | string[], validator: SchemaObject) {
        this.set(this._getKey(path), validator)
    }

    get(path: string | string[]) {
        return super.get(this._getKey(path),)
    }
    remove(path: string | string[]) {
        super.delete(this._getKey(path))
    }
    delete(path: string | string[]) {
        return super.delete(this._getKey(path))
    }
    has(path: string | string[]) {
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


