import { AutoStore, ConfigManager, configurable } from "autostore";
import type { ConfigurableState } from "autostore";
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
                widget: "number",
                min: 1,
                max: 10,
                validate: (value) => value > 0,
            }),
            quantity: configurable(10, {
                label: "订单数量",
                widget: "select",
                options: [],
                validate: (value) => value > 0,
            }),
            vip: configurable(true, {
                label: "VIP客户",
                widget: "checkbox",
                trueValue: "是",
                falseValue: "否",
                indeterminate: true,
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
                widget: "select",
                options: [],
                multiple: true,
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
                widget: "text",
                maxLength: 1,
                minLength: 1,
                multiline: true,
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
            maxLength: number;
            minLength: number;
            pattern?: RegExp | string;
            rows?: number;
            multiline?: boolean;
        };
        select: {
            options: Array<{ label: string; value: any; disabled?: boolean }>;
            multiple?: boolean;
        };
        checkbox: {
            trueValue?: string;
            falseValue?: string;
            indeterminate?: boolean;
        };
    }
}
AutoStoreConfigManager.state["app1.order.price"].value;
type OrderPriceSchema = (typeof AutoStoreConfigManager.state)["app1.order.price"];
type SchemaKeys = keyof OrderPriceSchema;

AutoStoreConfigManager.state["app1.order.price"].widget;
AutoStoreConfigManager.state["app1.order.price"].min;
AutoStoreConfigManager.state["app1.order.price"].max;
AutoStoreConfigManager.state["app1.order.price"].step;

AutoStoreConfigManager.state["app1.order.vip"].widget;
AutoStoreConfigManager.state["app1.order.vip"].trueValue;
AutoStoreConfigManager.state["app1.order.vip"].falseValue;
AutoStoreConfigManager.state["app1.order.vip"].indeterminate;
