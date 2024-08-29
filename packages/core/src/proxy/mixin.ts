import type { AutoStore } from "../store";
import { StateOperates } from "../store/types";
import { Dict } from "../types";
import { isRaw } from "../utils";

export class ProxyMixin<State extends Dict>{
    protected hookArrayMethods(this: AutoStore<State>, array: any[], name:string,method:Function, parentPath: string[]) {
        if(name==='push'){
            return (...args: any[]) => {
                const oldLength = array.length;
                const result = method.apply(array, args);
                if (array.length > oldLength) {
                    const indexs = Array.from({length: array.length - oldLength}, (_, i) => i + oldLength);                 
                    this.notify('insert',parentPath, indexs, args, undefined, parentPath, array);
                }
                return result;
            };
        }else if(name==='splice'){
            return (start: number, deleteCount: number, ...items: any[]) => {
                const deletedItems = deleteCount ===0 ?  [] : array.slice(start, start + deleteCount);
                const result = method.apply(array, [start, deleteCount, ...items]);                
                if (deletedItems.length > 0) {
                    const deleteIndexs = Array.from({ length: deletedItems.length }, (_, i) => start + i);
                    this.notify('remove',parentPath,deleteIndexs, deletedItems,undefined, parentPath, array);
                }
                if (items.length > 0) {
                    const addIndexs = Array.from({ length: items.length }, (_, i) => start + i);
                    this.notify('insert', parentPath,addIndexs, items, undefined, parentPath, array);
                }
                return result;
            };
        }else if(name ==='unshift'){            
            return (...args: any[]) => {
                const oldLength = array.length;
                const result = method.apply(array, args);
                if (array.length > oldLength) {
                    const indexs = Array.from({ length: array.length - oldLength }, (_, i) => i);
                    this.notify('insert', parentPath,indexs, args, undefined, parentPath, array);
                }
                return result;
            };
        }else{
            return method
        }        
    }

    protected createProxy(this: AutoStore<State>, target: any, parentPath: string[]): any {
        if (typeof target !== 'object' || target === null) {
            return target;
        }
        if(isRaw(target)) return target
        return new Proxy(target, {
            get: (obj, prop, receiver) => {
                const value = Reflect.get(obj, prop, receiver);                
                const path = [...parentPath, String(prop)];
                if(!Object.hasOwn(obj,prop) || typeof value === 'function'){
                    if(typeof value === 'function'){
                        if(Array.isArray(obj)){
                            return this.hookArrayMethods(obj,prop as string,value,parentPath); 
                        }else if(!isRaw(value) && Object.hasOwn(obj,prop)){ 
                            // 如果值是一个函数，则创建一个计算属性或Watch对象
                            return this.installExtends(path,value,parentPath,obj) 
                        }else{
                            return value
                        }
                    }else{
                        return value
                    }                   
                }                
                this.notify('get', path,[], value, undefined, parentPath, obj);
                return this.createProxy(value, path);
            },
            set: (obj, prop, value, receiver) => {
                const oldValue = obj[prop];
                const path = [...parentPath, String(prop)];
                const success = Reflect.set(obj, prop, value, receiver);
                if (success) {
                    if (Array.isArray(obj)) {
                        if(prop === 'length'){
                            if (value < oldValue) {
                                this.notify('remove', parentPath, [],oldValue,undefined,  parentPath, obj);
                            }
                        }else{
                            this.notify('update', parentPath, [Number(prop)], value, oldValue, parentPath, obj);
                        }                        
                    } else {
                        this.notify('set', path, [], value, oldValue, parentPath, obj); 
                    }
                }
                return success;
            },
            deleteProperty: (obj, prop) => {
                const value = obj[prop];
                const path = [...parentPath, String(prop)];
                const success = Reflect.deleteProperty(obj, prop);
                if (success) {
                    this.notify('delete', path, [],value, undefined, parentPath, obj);
                }
                return success;
            }
        });
    } 
    /**
     * 
     * 触发状态变化事件
     * 
     */
    protected notify(this: AutoStore<State>, type:StateOperates, path: string[], indexs:number[] , value: any, oldValue: any, parentPath: string[], parent: any) {          
        this.changesets.emit(path.join('.'),{
            type, path,indexs, value, oldValue, parentPath, parent
        })       
    } 
}