/**
 * 
 * 用来获取状态中的的函数属性的
 *   
 * 
 */
import { OBJECT_PATH_DELIMITER } from "./consts";
import { type ComputedScope, ComputedScopeRef, StoreOptions, IStore } from "./store/types";
import { getRelValuePath, getValueByPath } from "./utils";
import { ComputedOptions,  ComputedType, StateComputedType } from "./computed/types";
import { Dict } from "./types";
import { AutoStore } from "./store/store";
import { DynamicValueContext, DynamicValueType } from './extend/types';
 
/*
* 计算函数的context可以在全局Store中通过computedThis参数指定
* 也可以在computed(fn,{context})函数中指定
*
* computed配置的context优先级高于store配置的context
*
*
*
* @param state
* @param computedThis
* @param storeCtxOption
*/
function getScopeOptions(state: any,valuePath:string[],computedScope?: ComputedScope,storeScope?: ComputedScope) {
  let scope = computedScope == undefined ? storeScope : computedScope;
  if (typeof scope === "function") {
    try { scope = scope.call(state, state) } catch { }
  }
  return scope == undefined ? (storeScope == undefined ? ComputedScopeRef.Current: storeScope) : scope;
}

export type GetComputedContextOptions<T extends Dict =Dict> ={
    // type:'context' | 'scope',                   // 要获取的是什么: context或scope
    computedType:StateComputedType,             // 取值， 'Computed' | 'Watch 
    dependValues:any[],                         // 当前计算函数依赖值，或watch的侦听的值
    valuePath:string[],
    funcOptions: {                              // computed或者watch的配置参数
        context?:any,
        scope?:any
    }, 
    storeOptions: StoreOptions<T>                // 全局Store配置参数
}



/**
 * 
 * 获取计算函数的作用域Scope
 * 
 * @param draft 
 * @param params 
 * @returns 
 */
export function getExtendScope(store:AutoStore,extendType:DynamicValueType,extendContext:DynamicValueContext, computedOptions: ComputedOptions) {


    let rootDraft = draft;
      // 1. 执行hook：可以在hook函数中修改计算函数的根上下文以及相关配置参数
    if (typeof store.options.getRootScope=== "function") {
      const newDraft = store.options.getRootScope.call(store,store,{valuePath});
      if (newDraft !== undefined) {
        rootDraft = newDraft;
      }
    }
    
    const parentPath = valuePath.length>=1 ? valuePath.slice(0, valuePath.length - 1) : [];

   // 2. 读取计算函数的上下文配置参数
   const scopeRef = getScopeOptions(draft,valuePath,computedOptions.scope, (store.options.scope && store.options.scope(computedType,valuePath)))
  
    let scope = draft

    // 3. 根据配置参数获取计算函数的上下文对象
    try { 
      if(scopeRef === ComputedScopeRef.Current) {
        scope = getValueByPath(draft, parentPath);
      }else if (scopeRef === ComputedScopeRef.Parent) {
        scope = getValueByPath(draft,valuePath.slice(0, valuePath.length - 2));
      }else if (scopeRef === ComputedScopeRef.Root) {
        scope = rootDraft;
      }else if (scopeRef === ComputedScopeRef.Depends) {      // 异步计算的依赖值      
        scope = Array.isArray(dependValues) ? dependValues.map(dep=>typeof(dep) === 'function' ? dep() : dep) : [];
      }else{
       if (typeof scopeRef === "string") {       
          // 当scope是以@开头的字符串时，代表是一个路径指向，如：@./user，代表其scope是由user属性值指向的对象路径
          if(scopeRef.startsWith("@")){ // 
            scope = getExtendScope(store,{
                ...computedOptions,
                scope:getExtendScope(store,{
                    ...computedOptions,scope:scopeRef.slice(1)
                  },ctx)
              },ctx)          
          }else{
            scope = getValueByPath(draft, getRelValuePath(valuePath,scopeRef)); 
          } 
        }else if (Array.isArray(scopeRef)) {                   // 从根对象开始的完整路径
          scope = getValueByPath(draft, scopeRef);
        }
      }
    }catch (e:any) {
        store.options.log(`Error while getting computed scope ${valuePath.join(OBJECT_PATH_DELIMITER)}: ${e.message}`);
    } 
    return scope
  }
