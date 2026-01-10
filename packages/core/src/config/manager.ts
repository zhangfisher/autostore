import { ObjectKeyMap } from '../utils/ObjectKeyMap';
import type { ComputedOptions } from '../computed/types';
import { computed } from '../computed';

export type ConfigManagerOptions = {};
/**
 *
 *  const configManager = new ConfigManager<Type>()
 *  const store = new AutoStore({
 *     age:configurable(1,{
 *          key,            // 配置键名称
 *          name,           // 配置名称
 *          title,          // 配置标题
 *          help,           // 帮助信息
 *          widget,         // 配置控件
 *          onValidate,     // 校验函数
 *     })
 *  },{
 *      configManager:{
 *          manager:configManager,
 *          key?:string,  //可选的， 在配置对象中存储配置值的key，如果
 *      }
 *
 *  })
 *
 *  AutoStoreConfigures
 *
 *  - 初始化时从configManager中读取获取配置信息
 *  - 更新配置值会调用configManager.set(key,value)
 *  config
 *
 *
 */
export class ConfigManager extends ObjectKeyMap {
    options: Required<ConfigManagerOptions>;
    constructor(options?: ConfigManagerOptions) {
        super();
        this.options = Object.assign({}, options);
    }
}

export interface ConfigurableOptions extends ComputedOptions {}
/**
 * 用于标识AutoStore对象状态中的指定成员中可配置的
 *
 *
 * const store=new AutoStore({
 *    count:configurable(1,)
 *  })
 *
 *
 */
export function configurable<V = any>(initial: V, options?: ConfigurableOptions) {
    const opts = Object.assign({}, options) as ConfigurableOptions;
    return computed((scope) => {}, opts);
}
