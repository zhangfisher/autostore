import { VALUE_SCHEMA_BUILDER_FLAG } from "../consts";
import { SchemaDescriptorBuilder } from "../schema";

export function isSchemaBuilder(value: any): value is SchemaDescriptorBuilder {
    return typeof (value) === 'function' && value[VALUE_SCHEMA_BUILDER_FLAG] === true
}