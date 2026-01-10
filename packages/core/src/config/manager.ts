import { AutoStore } from '../store/store';
import type { AutoStoreConfigures } from './types';
import type { AutoStoreOptions } from '../store';
import type { Dict } from '../types';

export type ConfigManagerOptions<State extends Dict> = AutoStoreOptions<State> & {};
/**
 *
 *  const configManager = new AutoStoreConfigManager<Type>()
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
export class AutoStoreConfigManager extends AutoStore<AutoStoreConfigures> {
    constructor(options?: ConfigManagerOptions<AutoStoreConfigures>) {
        super(Object.assign({}, options));
    }
}
