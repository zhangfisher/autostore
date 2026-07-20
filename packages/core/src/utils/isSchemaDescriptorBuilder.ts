import { OBSERVER_TYPE_FLAG } from "../consts";
import type { SchemaDescriptorBuilder } from "../schema";

export function isSchemaDescriptorBuilder(value: any): value is SchemaDescriptorBuilder {
    return typeof value === "function" && value[OBSERVER_TYPE_FLAG] === "schema";
}
