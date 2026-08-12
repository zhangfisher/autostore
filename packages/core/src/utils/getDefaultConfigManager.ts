import { GLOBAL_CONFIG_MANAGER } from "../consts";
import { ConfigManager } from "../schema/manager";
import { localConfigSource } from "../schema/sources";

export function getDefaultConfigManager(): ConfigManager {
    if (globalThis[GLOBAL_CONFIG_MANAGER]) {
        return globalThis[GLOBAL_CONFIG_MANAGER];
    } else {
        return new ConfigManager(localConfigSource);
    }
}
