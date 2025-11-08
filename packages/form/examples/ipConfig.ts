import { customElement, query } from 'lit/decorators.js';
import { LitElement, PropertyValues, html } from 'lit';
import { AutoStore, configurable } from 'autostore';

@customElement('ip-config')
class IPConfigForm extends LitElement {
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

    connectedCallback(): void {
        super.connectedCallback();
        this.store.watch(() => {
            if (this.viewer) {
                this.viewer.innerText = JSON.stringify(this.store.state);
            }
        });
    }

    //@ts-ignore
    @query('auto-form')
    formRef?: any;
    protected updated(_changedProperties: PropertyValues): void {
        this.formRef?.bind(this.store);
    }
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
        'ip-config': IPConfigForm;
    }
    var store: AutoStore<any>;
}
