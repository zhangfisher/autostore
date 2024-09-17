/**
 * 
 * 用来获取动态值对象的作用域对象Scope值
 *   
 * 
 */
import { PATH_DELIMITER } from "./consts";
import { ComputedContext, ComputedOptions, ComputedScope, ComputedScopeRef, ComputedType} from "./computed/types";
import { getValueByPath } from "./utils/getValueByPath";
import { ComputedObject } from "./computed/computedObject";
import { getFullValuePath } from "./utils/getFullValuePath";
 

/**
 * 获取Scope参数的值
 * @param state 
 * @param valuePath 
 * @param computedScope 
 * @param storeScope 
 * @returns 
 */
function getScopeOptions(valueObject:ComputedObject,computedScope?: ComputedScope,storeScope?: ComputedScope) {
  let scope = computedScope == undefined ? storeScope : computedScope;
  if (typeof scope === "function") {
    try { scope = scope.call(valueObject.store,valueObject) } catch { }
  }
  return scope == undefined ? (storeScope == undefined ? ComputedScopeRef.Current: storeScope) : scope;
}
 
/**
 * 
 * 获取计算函数的作用域Scope
 * 
 * @param draft 
 * @param params 
 * @returns 
 */
export function getValueScope<Value=any,Scope=any,Options extends ComputedOptions<Value,Scope>=ComputedOptions<Value,Scope>>(computedObject:ComputedObject<Value,Options>,computedType:ComputedType,valueContext:ComputedContext<Value> | undefined, computedOptions: Options) {

  let rootDraft = computedObject.store.state;
  const storeOptions = computedObject.store.options
    // 1. 获取计算函数的根scope
  if (typeof storeOptions.getRootScope=== "function") {
    const newDraft = storeOptions.getRootScope(computedObject,{computedType: computedType,valuePath:valueContext?.path});
    if (newDraft !== undefined) {
      rootDraft = newDraft;
    }
  }    
  const {path:valuePath,parentPath} = valueContext || {}

  // 2. 读取计scope参数获取计算函数的scope值
  const scopeOption = getScopeOptions(computedObject,computedOptions.scope, storeOptions.scope )
  
  let scope:any = rootDraft

    // 3. 根据配置参数获取计算函数的上下文对象
    try { 
      if(scopeOption === ComputedScopeRef.Current) {
        scope = getValueByPath(rootDraft, parentPath);
      }else if (scopeOption === ComputedScopeRef.Parent) {
        scope = getValueByPath(rootDraft,valuePath!.slice(0, valuePath!.length - 2 < 0 ? 0 : valuePath!.length - 2));
      }else if (scopeOption === ComputedScopeRef.Root) {
        scope = rootDraft;
      }else if (scopeOption === ComputedScopeRef.Depends) {        
        scope = computedObject.depends?.map(dep => getValueByPath(rootDraft, dep));
      }else{
       if (typeof scopeOption === "string") {       
          // 当scope是以@开头的字符串时，代表是一个路径指向，如：@./user，代表其scope是由user属性值指向的对象路径
          if(scopeOption.startsWith("@")){ // 
            scope = getValueScope(computedObject,computedType,valueContext,
                { 
                  ...computedOptions,
                  scope:getValueScope(computedObject,computedType,{
                    ...valueContext!,
                    path:scopeOption.slice(1).split(PATH_DELIMITER)
                  },{
                    ...computedOptions,
                    scope:scopeOption.slice(1)
                  })
              })          
          }else{            
            scope = getValueByPath(rootDraft,getFullValuePath(computedObject.path,scopeOption)); 
          } 
        }else if (Array.isArray(scopeOption)) {                   // 从根对象开始的完整路径
          scope = getValueByPath(rootDraft, scopeOption);
        }
      }
    }catch (e:any) {
        storeOptions.log(`Error while getting computed scope ${computedObject.toString()}: ${e.message}`,'error');
    } 
    return scope
  }
