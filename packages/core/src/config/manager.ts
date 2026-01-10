import { ObjectKeyMap } from '../utils/ObjectKeyMap';
import { ComputedOptions } from '../computed/types';
import { computed } from '../computed';

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
export interface AutoStoreConfigures {}

export type ConfigManagerOptions = {};
/**
 *
 *  const new config = new ConfigManager()
 *
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
