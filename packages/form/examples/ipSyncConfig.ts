import '@autostorejs/syncer';
import { customElement, query } from 'lit/decorators.js';
import { LitElement, type PropertyValues, html } from 'lit';
import { AutoStore, configurable } from 'autostore';
import type { AutoStoreSyncer } from '@autostorejs/syncer';

@customElement('ip-sync-config')
class IPConfigSyncForm extends LitElement {
    settingSyncer?: AutoStoreSyncer;
    store = new AutoStore({
        network: {
            dhcp: configurable(false, {
                label: '自动获取IP地址',
                widget: 'switch',
            }),
            ip: configurable('192.168.1.100', {
                label: 'IP地址',
                widget: 'ipaddress',
                enable: (state) => !state.network.dhcp,
            }),
            mask: configurable('255.255.255.0', {
                label: '子网掩码',
                widget: 'ipaddress',
                visible: (state) => !state.network.dhcp,
            }),
            gateway: configurable('192.168.1.1', {
                label: '默认网关',
                widget: 'ipaddress',
                enable: (state) => !state.network.dhcp,
            }),
            timeout: configurable(100000, {
                label: '连接超时(秒)',
                group: 'api',
                widget: 'number',
                toState: (value: any) => {
                    return value * 1000;
                },
                toInput: (value: any) => {
                    return value / 1000;
                },
            }),
        },
    });

    settingStore = new AutoStore({
        selected: {
            // video: configurable(1, {
            //     size: 'small',
            //     label: '摄像头',
            //     widget: 'select',
            //     group: 'deviceSettings',
            //     clearable: false,
            //     select: async () => {
            //         return [
            //             { id: 1, label: '默认', value: 1 },
            //             { id: 2, label: '摄像头2', value: 2 },
            //             { id: 3, label: '摄像头3', value: 3 },
            //         ];
            //     },
            // }),
            // audioIn: configurable(2, {
            //     size: 'small',
            //     label: '麦克风',
            //     widget: 'select',
            //     group: 'deviceSettings',
            //     clearable: false,
            //     select: async () => {
            //         return [
            //             { id: 1, label: '默认', value: 1 },
            //             { id: 2, label: '麦克风2', value: 2 },
            //             { id: 3, label: '麦克风3', value: 3 },
            //         ];
            //     },
            // }),
            audioOut: configurable(3, {
                size: 'small',
                label: '扬声器',
                widget: 'select',
                group: 'deviceSettings',
                clearable: false,
                select: async () => {
                    return [
                        { id: 1, label: '默认', value: 1 },
                        { id: 2, label: '扬声器2', value: 2 },
                        { id: 3, label: '扬声器3', value: 3 },
                    ];
                },
            }),
        },
    });
    constructor() {
        super();
        this._syncSettings();
        //@ts-expect-error
        window.fromStore = this.store;
        //@ts-expect-error
        window.toStore = this.settingStore;
    }
    connectedCallback(): void {
        super.connectedCallback();
        this.store.watch(() => {
            if (this.viewer) {
                this.viewer.innerText = JSON.stringify(this.store.state);
            }
        });
    }

    private _syncSettings() {
        // 只有使用schema或configurable声明的配置项才会进行同步
        const filter = (path: string[]) => {
            return this.store.schemas.has(path.join('.') as any);
        };
        const moduleStore = this.store;
        const syncSettings = {
            filter,
            remote: 'system',
            immediate: true,
            pathMap: {
                toLocal: (path: any[], value: any) => {
                    if (typeof value !== 'object') {
                        return path.reduce<string[]>((result: any[], cur: string) => {
                            result.push(...cur.split('.'));
                            return result;
                        }, []);
                    }
                },
                toRemote(path: any[], value: any) {
                    // this.store.schemas.has(path)的作用
                    // 当同步configurable时，如果是数组或对象，也需要同步
                    if (typeof value !== 'object' || moduleStore.schemas.has(path)) {
                        return [path.join('.')];
                    }
                },
            },
        };
        // 将本模块的配置项同步到全局SettingManager中，这样在应用中就可以使用SettingManager管理应用的所有配置了
        this.settingSyncer = this.store.sync(this.settingStore, syncSettings);
    }

    //@ts-expect-error
    @query('auto-form')
    formRef?: any;
    protected updated(_changedProperties: PropertyValues): void {
        this.formRef?.bind(this.settingStore);
    }

    //@ts-expect-error
    @query('#viewjson')
    viewer?: any;

    render() {
        return html`<div id="viewjson" style="padding:1em;width:100%;display:flex;"></div>
            <div style="margin: 1em; position: relative">
                <auto-form
                    data-name="general"
                    data-label="常规"
                    data-icon="settings"
                    data-actions="settings"
                >
                </auto-form>
            </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ip-sync-config': IPConfigSyncForm;
    }
    var store: AutoStore<any>;
}
