import { AutoStore, computed, ConfigManager, configurable } from "../src";

const configManager = new ConfigManager({
    load: () => ({}),
    save: () => {},
});

const user = {
    name: "dsdfds",
};

configManager.watch(({ path, value }) => {
    console.log(JSON.stringify(path), "=", JSON.stringify(value));
});
const netStore = new AutoStore(
    {
        dhcp: true,
        ip: configurable("192.168.1.1", {
            label: "IP地址",
            enable: (scope: any, { ref }) => {
                return scope["network.dhcp"].value;
            },
        }),
    },
    { configManager, id: "network" },
);
netStore.state.dhcp = true;
// console.log(configManager.state["network.dhcp"].value);
console.log(configManager.state["network.ip"].enable);
netStore.state.dhcp = false;
// console.log(configManager.state["network.dhcp"].value);
console.log(configManager.state["network.ip"].enable);
