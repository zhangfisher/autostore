/**
 * 
 * 用来获取动态值对象的作用域对象Scope值
 *   
 * 
 */
import { OBJECT_PATH_DELIMITER } from "./consts";
import { ComputedOptions} from "./computed/types";
import { AutoStore } from "./store/store";
import { DynamicValueContext, DynamicValueScope, DynamicValueScopeRef, DynamicValueType } from './dynamic/types';
import { DynamicValueObject } from "./dynamic/valueObject";
import { getValueByPath } from "./utils/getValueByPath";
 

/**
 * 获取Scope参数的值
 * @param state 
 * @param valuePath 
 * @param computedScope 
 * @param storeScope 
 * @returns 
 */
function getScopeOptions(valueObject:DynamicValueObject,computedScope?: DynamicValueScope,storeScope?: DynamicValueScope) {
  let scope = computedScope == undefined ? storeScope : computedScope;
  if (typeof scope === "function") {
    try { scope = scope.call(valueObject.store,valueObject) } catch { }
  }
  return scope == undefined ? (storeScope == undefined ? DynamicValueScopeRef.Current: storeScope) : scope;
}
 
/**
 * 
 * 获取计算函数的作用域Scope
 * 
 * @param draft 
 * @param params 
 * @returns 
 */
export function getValueScope(valueObject:DynamicValueObject,dynamicType:DynamicValueType,valueContext:DynamicValueContext, computedOptions: ComputedOptions) {

  let rootDraft = valueObject.store.state;
  const storeOptions = valueObject.store.options
    // 1. 获取计算函数的根scope
  if (typeof storeOptions.getRootScope=== "function") {
    const newDraft = storeOptions.getRootScope(valueObject,{dynamicType,valuePath:valueContext.path});
    if (newDraft !== undefined) {
      rootDraft = newDraft;
    }
  }    
  const {path:valuePath,parentPath} = valueContext

  // 2. 读取计scope参数获取计算函数的scope值
  const scopeOption = getScopeOptions(valueObject,computedOptions.scope, storeOptions.scope )
  
  let scope:any = rootDraft

    // 3. 根据配置参数获取计算函数的上下文对象
    try { 
      if(scopeOption === DynamicValueScopeRef.Current) {
        scope = getValueByPath(rootDraft, parentPath);
      }else if (scopeOption === DynamicValueScopeRef.Parent) {
        scope = getValueByPath(rootDraft,valuePath.slice(0, valuePath.length - 2 < 0 ? 0 : valuePath.length - 2));
      }else if (scopeOption === DynamicValueScopeRef.Root) {
        scope = rootDraft;
      }else if (scopeOption === DynamicValueScopeRef.Depends) {        
        scope = valueObject.depends?.map(dep => getValueByPath(rootDraft, dep));
      }else{
       if (typeof scopeOption === "string") {       
          // 当scope是以@开头的字符串时，代表是一个路径指向，如：@./user，代表其scope是由user属性值指向的对象路径
          if(scopeOption.startsWith("@")){ // 
            scope = getValueScope(valueObject,dynamicType,valueContext,
                { 
                  ...computedOptions,
                  scope:getValueScope(valueObject,dynamicType,{
                    ...valueContext,
                    path:scopeOption.slice(1).split(OBJECT_PATH_DELIMITER)
                  },{
                    ...computedOptions,
                    scope:scopeOption.slice(1)
                  })
              })          
          }else{
            scope = getValueByPath(rootDraft,scopeOption); 
          } 
        }else if (Array.isArray(scopeOption)) {                   // 从根对象开始的完整路径
          scope = getValueByPath(rootDraft, scopeOption);
        }
      }
    }catch (e:any) {
        storeOptions.log(`Error while getting computed scope ${valueObject.toString()}: ${e.message}`,'error');
    } 
    return scope
  }
