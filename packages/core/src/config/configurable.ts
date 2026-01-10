import type {
    AutoStoreWidgetTypes,
    ConfigurableSchema,
    ConfigurableSchemaDescriptorBuilder,
    ConfigurablSchemaDescriptor,
} from './types';
import { isFunction } from '../utils/isFunction';
import type { NonFunction } from '../types';
import { CONFIGURABLE_DESCRIPTOR_BUILDER_FLAG } from '../consts';
import { schema } from '../schema/schema';
export function configurable<
    Value extends NonFunction = NonFunction,
    Widget extends AutoStoreWidgetTypes = AutoStoreWidgetTypes,
>(initial: Value, schema?: ConfigurableSchema<Widget>): ConfigurableSchemaDescriptorBuilder<Value> {
    const descriptorBuilder = () => {
        return {
            value: initial,
            schema: schema,
        } as ConfigurablSchemaDescriptor<Value>;
    };
    descriptorBuilder[OBSERVER_DESCRIPTOR_FLAG] = true;
    return descriptorBuilder;
}

// configurable(1, {
//     widget: 'number',
//     max: 1,
//     min: 1,
// });
// configurable(
//     () => {
//         return 1;
//     },
//     {
//         schema: {
//             widget: 'number',
//             max: 1,
//             min: 1,
//         },
//     },
// );
