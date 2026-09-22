import { computed } from "../computed/computed";
import { configurable,schema } from "../schema/schema";
import { shallow } from "../decorators";


/**
 * 用于注入到洽
 */
export const  sandboxVars={
    computed,
    configurable,
    schema,
    shallow,
}