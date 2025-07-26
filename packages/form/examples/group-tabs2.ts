import { customElement, query } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import { AutoStore, configurable } from 'autostore';

@customElement('auto-form-example-tabs2')
class AutoFormExampleTabs2 extends LitElement {
    //@ts-ignore
    @query('auto-form-tabs')
    tabs?: any;

    updated() {
        this.tabs?.bind(this.store);
    }
    store = new AutoStore({
        user: {
            name: configurable('Bob', {
                label: '姓名',
            }),
            age: configurable(25, {
                label: '年龄',
                widget: 'number',
            }),
            sex: configurable('male', {
                label: '性别',
                widget: 'radio',
                select: [
                    { label: '男', value: 'male' },
                    { label: '女', value: 'female' },
                ],
            }),
            country: configurable('China', {
                label: '国家',
                widget: 'select',
                select: [
                    { label: '中国', value: 'China' },
                    { label: '美国', value: 'America' },
                    { label: '泰国', value: 'Thailand' },
                    { label: '印度', value: 'India' },
                    { label: '墨西哥', value: 'Mexico' },
                    { label: '南非', value: 'SouthAfrica' },
                    { label: '法国', value: 'France' },
                    { label: '荷兰', value: 'Netherlands' },
                    { label: '德国', value: 'Germany' },
                ],
            }),
        },
        network: {
            ip: configurable('192.168.1.1', {
                label: 'IP',
                widget: 'ipaddress',
                group: 'network',
            }),
            dhcp: configurable(true, {
                label: 'DHCP',
                widget: 'switch',
                group: 'network',
            }),
            subnetMask: configurable('255.255.255.0', {
                label: '子网掩码',
                widget: 'ipaddress',
                group: 'network',
            }),
            gateway: configurable('192.168.1.254', {
                label: '默认网关',
                widget: 'ipaddress',
                group: 'network',
            }),
            dns: configurable('8.8.8.8', {
                label: 'DNS',
                widget: 'ipaddress',
                group: 'network',
            }),
        },
        safe: {
            password: configurable('123456', {
                label: '密码',
                widget: 'password',
                group: 'safe',
            }),
            verifycode: configurable('PASSWORD', {
                label: '确认密码',
                widget: 'verifycode',
                group: 'safe',
            }),
        },
        advanced: {
            password: configurable('123456', {
                label: '密码',
                widget: 'password',
                group: 'advanced',
            }),
            verifycode: configurable('PASSWORD', {
                label: '确认密码',
                widget: 'verifycode',
                group: 'advanced',
            }),
            password2: configurable('123456', {
                label: '密码',
                widget: 'password',
                group: 'advanced',
            }),
            verifycode1: configurable('PASSWORD', {
                label: '确认密码',
                widget: 'verifycode',
                group: 'advanced',
            }),
            password4: configurable('123456', {
                label: '密码',
                widget: 'password',
                group: 'advanced',
            }),
            verifycode4: configurable('PASSWORD', {
                label: '确认密码',
                widget: 'verifycode',
                group: 'advanced',
            }),
        },
    });

    render() {
        return html`<div
            style="padding: 1em; border: 1px solid #ccc; margin: 1em; position: relative"
        >
            <auto-form-tabs direction="top" active="network" style="border: 1px solid #ccc">
                <auto-form name="user" path="user" icon="user" label="用户资料"></auto-form>
                <auto-form name="safe" group="safe" icon="lock" label="安全设置"></auto-form>
                <auto-form
                    name="network"
                    group="network"
                    icon="network"
                    label="网络设置"
                ></auto-form>
                <auto-form
                    name="advanced"
                    group="advanced"
                    icon="airplay"
                    label="高级设置"
                ></auto-form>
            </auto-form-tabs>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-form-example-tabs2': AutoFormExampleTabs2;
    }
}

// <auto-form group="general" title="常规"> </auto-form>
// <auto-form group="car" title="汽车"> </auto-form>
// <auto-form group="network" title="网络"> </auto-form>
// <auto-form group="admin" title="管理"> </auto-form>
// <auto-form group="safe" title="安全"> </auto-form>
