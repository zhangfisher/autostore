// @ts-nocheck
// 该脚本演示的 refstore（args.ref 跨 store 引用）功能已整体下线
// （src/observer/observer.ts 的 _createRefStateCtx 已注释），保留脚本待功能回归
import { AutoStore, computed, ConfigManager, configurable } from "../src";

const configManager = new ConfigManager({
    load: () => ({}),
    save: () => {},
});

// configManager.watch(({ path, value }) => {
//     console.log(JSON.stringify(path), "=", JSON.stringify(value));
// });
const netStore = new AutoStore(
    {
        net: {
            dhcp: true,
        },
        ip: configurable("192.168.1.1", {
            label: "IP地址",
            enable: computed((scope: any, { ref }) => {
                const dhcp = ref(["net", "dhcp"]);
                console.log("dhcp=", dhcp);
                return dhcp;
            }),
        }),
    },
    { configManager, id: "network" },
);
console.log("-----------");
netStore.state.net.dhcp = true;
console.log(configManager.state["network.ip"].enable);
console.log("-----------");
netStore.state.net.dhcp = false;
console.log(configManager.state["network.ip"].enable);
console.log("-----------");
netStore.state.net.dhcp = true;
console.log(configManager.state["network.ip"].enable);
console.log("-----------");
netStore.state.net.dhcp = false;
console.log(configManager.state["network.ip"].enable);
console.log("-----------");

// console.log(configManager.state["network.dhcp"].value);
//console.log(configManager.state["network.ip"].enable);
// netStore.state.dhcp = false;
// console.log(configManager.state["network.dhcp"].value);
// console.log(configManager.state["network.ip"].enable);
