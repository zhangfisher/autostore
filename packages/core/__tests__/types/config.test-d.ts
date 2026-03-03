import { describe, test, it, expect } from "bun:test";
import type { Equal, Expect } from "@type-challenges/utils";
import { AutoStore, computed, ConfigManager, configurable } from "../../src";
import type {
    ObserverObject,
    ObserverOptions,
    ObserverDescriptor,
    ConfigurableState,
} from "../../src";
import { AutoStoreConfigures } from "../../src/schema/types";

const configManager = new ConfigManager({
    load: () => {
        return {};
    },
});
const orderStore = new AutoStore(
    {
        order: {
            price: configurable(99.9, {
                label: "订单价格",
                validate: (value) => value > 0,
            }),
            quantity: configurable(10, {
                label: "订单数量",
                validate: (value) => value > 0,
            }),
        },
    },
    {
        configManager,
        configKey: "app1",
    },
);

const userStore = new AutoStore(
    {
        user: {
            name: configurable("Bob", {
                label: "用户名",
                validate: (value) => typeof value === "string" && value.length > 0,
            }),
            age: configurable(25, {
                label: "年龄",
                validate: (value) => value >= 0 && value <= 150,
            }),
        },
    },
    {
        configManager,
        configKey: "app2",
    },
);

const shopStore = new AutoStore(
    {
        shop: {
            discount: configurable(0.1, {
                label: "折扣",
                validate: (value) => value >= 0 && value < 1,
            }),
            tax: configurable(0.05, {
                label: "税率",
                widget: "number",
                max: 1,
                min: 2,
                validate: (value) => value >= 0 && value < 1,
            }),
        },
    },
    {
        configManager,
        configKey: "app3",
    },
);
type orderStoreConfigurableState = ConfigurableState<typeof orderStore, "app1">;
type userConfigurableState = ConfigurableState<typeof userStore, "app2">;
type ShopConfigurableState = ConfigurableState<typeof shopStore>;

declare module "autostore" {
    interface AutoStoreConfigures
        extends orderStoreConfigurableState, userConfigurableState, ShopConfigurableState {}
    interface AutoStoreWidgets {
        number: {
            max: number;
            min: number;
            step?: number;
        };
        text: {
            maxLength?: number;
            minLength?: number;
            pattern?: RegExp | string;
            rows?: number;
            multiline?: boolean;
        };
        select: {
            options: Array<{ label: string; value: any; disabled?: boolean }>;
            multiple?: boolean;
        };
        checkbox: {
            trueValue?: any;
            falseValue?: any;
            indeterminate?: boolean;
        };
    }
}
AutoStoreConfigManager.state["app1.order.price"].value;
