import { AutoStore, configurable, isSchemaBuilder, SchemaOptions } from 'autostore';
/**
 *
 *
 *   createFormStore({
 *      ip:{
 *          value:1,
 *          widget:'ipaddress'
 *      }
 *
 *   })
 *
 */

export function createFormStore<State extends Dict>(
    fields: Record<string, SchemaOptions>,
    options?: AutoStoreOptions,
) {
    Object.entries(fields).forEach(([key, value]) => {
        if (typeof value === 'object' && !isSchemaBuilder(value)) {
            fields[key] = configurable(value.value, value) as any;
        }
    });
    return new AutoStore(fields);
}
