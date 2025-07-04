import { customElement } from 'lit/decorators.js';
import { LitElement, css, html } from 'lit';
import { AutoStore, computed, configurable } from 'autostore';
import type { AutoForm } from './src/form/index';

const orgTree = {
    id: 1,
    label: '美一',
    children: [
        {
            id: 1,
            label: '研发中心',
            children: [
                { id: 11, label: '工程部' },
                { id: 12, label: '产品部' },
                { id: 13, label: '测试部' },
                { id: 14, label: '运维部' },
                { id: 15, label: '系统部' }
            ]
        },
        {
            id: 2,
            label: "营销中心",
            selected: true,
            children: [
                { id: 21, label: '销售部' },
                { id: 22, label: '市场部' },
                { id: 23, label: '客服部' }
            ]
        },
        {
            id: 3,
            label: '生产中心',
            children: [
                { id: 31, label: '生产部' },
                { id: 32, label: '采购部' },
                { id: 33, label: '仓储部' },
                { id: 34, label: '质检部' }
            ]

        }
    ]
}



const delay = (ms: number = 1000) => new Promise((resolve) => setTimeout(resolve, ms));
const store = new AutoStore({
    price: 100,
    count: computed(scope => scope.price * 2),
    user: {
        name: configurable('Fish', {
            label: '姓名',
            placeholder: '请输入姓名',
            onValidate: (value) => {
                return value.length > 5;
            },
            invalidMessage: '姓名长度必须大于3个字符',
            help: "中文姓名(http://www.autostore.com)",
            required: computed(async (state) => {
                await delay(2000)
                return state.user.admin
            }, ['user.admin']),
            actions: [
                {
                    label: '验证',
                    icon: 'clipboard',
                    onClick: (value, { update }) => {
                        console.log('Action click:', value)
                        update(value + "*")
                    },
                    variant: "success"
                },
                {
                    label: '上传',
                    icon: 'clipboard',
                    onClick: (value, { update }) => {
                        console.log('Action click:', value)
                        update(value + "*")
                    }
                },
                {
                    label: '更新',
                    icon: 'clipboard',
                    type: 'dropdown',
                    pos: 'before',
                    syncMenu: true,
                    items: ['a', 'b', 'c', '-', {
                        label: '删除',
                        icon: 'delete',
                        onClick: (value, ctx) => {
                            console.log(value, ctx)
                        }
                    }]
                },
                {
                    label: '前面',
                    pos: 'before',
                    icon: 'atom',
                    onClick: (args) => {
                        console.log('Action click:', args)
                    },

                }
            ]
        }),
        homepage: configurable(
            "http://www.autostore.com", {
            widget: 'url',
            label: '主页',
            prefix: ['http://', 'https://'],
            suffix: [
                { label: "在新窗口打开", value: '?_blank' },
                { label: "在当前窗口打开", value: '?_self' },
                '-',
                { label: "空白", value: '' }
            ]
        }),
        padding: configurable("10px 10px", {
            widget: 'combine',
            label: '内边距',
            fields: [
                {
                    label: "单位",
                    widget: "radio-button",
                    labelPos: 'left',
                    select: [
                        { label: 'px' },
                        { label: 'em' },
                        { label: 'rem' },
                        { label: '%' },
                    ]
                },
                { label: "上", widget: "range" },
                { label: "下", widget: "range" },
                { label: "左", widget: "range" },
                { label: "右", widget: 'range' }
            ]
        }),
        admin: configurable('是', {
            label: '管理员',
            help: "管理员拥有所有权限",
            widget: 'checkbox',
            // checkLabel: "是",
            switchValues: ['是', '否']
        }),
        admin2: configurable(true, {
            label: '管理员',
            help: "管理员拥有所有权限",
            widget: 'switch',
            // checkLabel: "是",
            // switchValues: ['是', '否']
        }),
        custom: configurable('AAA', {
            label: '自定义',
            widget: 'custom',
            content: "#custom_panel",
            toRender: (value) => {
                return `<span style="color:red;border:1px solid red;padding: 4px;border-radius: 4px;">${value}</span>`
            }
        }),
        files: configurable(['aaa.png', 'b.pdf', '/updates/a.png'], {
            label: "上传图片",
            widget: 'upload',
            url: 'api/upload',
            placeholder: '请选择规格为128*128的相片',
            fileFieldName: "files",
            help: '上传文件支持.pnp,.jpg,不能大于5M',
            preview: true,
            // multiple: false,
            // 当删除文件时向服务器发起删除请求
            onRemove: async (file) => {
                await delay(2000)
                console.log("delete file:", file)
            },
            actions: [
                {
                    label: '验证',
                    icon: 'clipboard',
                    onClick: (value, { update }) => {
                        console.log('Action click:', value)
                        update(value + "*")
                    },
                    variant: "primary"
                },
                {
                    label: '前面',
                    pos: 'before',
                    icon: 'atom',
                    onClick: (args) => {
                        console.log('Action click:', args)
                    },

                }
            ]
        }),
        file: configurable({ url: '/public/uploads/d.jpg' }, {
            label: "上传图片",
            widget: 'upload',
            url: 'api/upload',
            placeholder: '请选择图片',
            fileFieldName: "files",
            multiple: false,
            // selector: 'rectangle',
            // 当删除文件时向服务器发起删除请求
            onRemove: (file) => {

            }
        }),
        verifyCode: configurable('12-65', {
            label: "邮件验证码",
            widget: "parts",
            delimiter: '-', //当没有指定delimiter时，使用空格分隔
            // 模板字符串
            template: '00-00-00-00' // 每一组之间的分割符
        }),


        smsVerify: configurable(false, {
            label: '短信验证',
            widget: 'switch',
            // checkLabel: "是",
            // switchValues: ['是', '否']
        }),
        smsCode: configurable('', {
            label: '短信验证码',
            placeholder: '请输入验证码',
            maxLength: 6,
            widget: 'verifycode',
            timeout: 60 * 1000,
            template: '{timeout}秒后重试',
            onRequest: () => {
                console.log("发送短信")
            },
            visible: (state) => state.user.smsVerify
        }),
        tcpFlags: configurable(3, {
            label: 'TCP标识',
            widget: 'checkbox-group',
            select: [
                { label: 'URG', value: 1 },
                { label: 'ACK', value: 2 },
                { label: 'PSH', value: 4 },
                { label: 'RST', value: 8 },
                { label: 'SYN', value: 16 },
                { label: 'FIN', value: 32 },
                { label: 'CRC', value: 64 }
            ],
            toInput: (value) => {
                const vals: number[] = []
                if ((value & 1) > 0) vals.push(1)
                if ((value & 2) > 0) vals.push(2)
                if ((value & 4) > 0) vals.push(4)
                if ((value & 8) > 0) vals.push(8)
                if ((value & 16) > 0) vals.push(16)
                if ((value & 32) > 0) vals.push(32)
                if ((value & 64) > 0) vals.push(64)
                return vals
            },
            toState: (vals) => {
                let value = 0
                if (vals.includes(1)) value += 1
                if (vals.includes(2)) value += 2
                if (vals.includes(4)) value += 4
                if (vals.includes(8)) value += 8
                if (vals.includes(16)) value += 16
                if (vals.includes(32)) value += 32
                if (vals.includes(64)) value += 64
                return value
            }
        }),
        layout: configurable('卡片集', {
            // divider: true,
            label: '布局',
            required: true,
            widget: 'radio',
            itemWidth: '33.33%',
            card: true,
            select: [
                { label: '简约风', description: '极简设计，突出内容' },
                { label: '经典式', description: '传统布局，平衡稳重' },
                { label: '卡片集', description: '模块化卡片，灵活组合' },
                { label: '瀑布流', enable: false, description: '动态滚动，视觉延展' },
                { label: '分屏式', description: '双栏对比，高效浏览双栏对比，高效浏览双栏对比，高效浏览双栏对比，高效浏览双栏对比，高效浏览' },
                { label: '导航型', description: '侧边主导，层级清晰' },
                { label: '全屏化', description: '沉浸体验，无界视觉' },
                { label: '网格阵', description: '整齐排列，规整直观' },
                { label: '自由板', description: '可拖拽定制，随心布局' }
            ]
        }),
        useLayout: configurable(['经典式', '全屏化'], {
            label: '可用布局',
            widget: 'checkbox-group',
            itemWidth: '33.33%',
            valueKey: "label",
            card: true,
            select: [
                { label: '简约风', description: '极简设计，突出内容' },
                { label: '经典式', description: '传统布局，平衡稳重' },
                { label: '卡片集', description: '模块化卡片，灵活组合' },
                { label: '瀑布流', enable: false, description: '动态滚动，视觉延展' },
                { label: '分屏式', description: '双栏对比，高效浏览双栏对比，高效浏览双栏对比，高效浏览双栏对比，高效浏览双栏对比，高效浏览' },
                { label: '导航型', description: '侧边主导，层级清晰' },
                { label: '全屏化', description: '沉浸体验，无界视觉' },
                { label: '网格阵', description: '整齐排列，规整直观' },
                { label: '自由板', description: '可拖拽定制，随心布局' }
            ]
        }),
        products: configurable(['电脑'], {
            label: '产品',
            onValidate: (value) => {
                return value.length > 2
            },
            widget: 'list',
            multiple: true,
            valueKey: 'label',     // 默认选择的是id
            labelKey: 'label',     // 用于显示，当showResults为true时，显示的是label
            invalidMessage: '至少选择两个产品',
            itemTemplate: "<span>{label}</span><span>{price}</span>",
            height: '200px',
            showResults: true,// 是否显示结果框
            select: [
                { id: 1, label: "手机", price: 1000, icon: "phone" },
                { id: 2, label: "电脑", price: 2000, icon: "laptop" },
                { id: 3, label: "手表", price: 3000, icon: "watch" },
                { id: 4, label: "耳机", price: 4000, icon: "headphones" },
                { id: 5, label: "鼠标", price: 5000, icon: "mouse" },
                { id: 6, label: "键盘", price: 6000, icon: "keyboard" },
                { id: 7, label: "鼠标垫", price: 7000, icon: "mousepad" },
                { id: 8, label: "U盘", price: 8000, icon: "usb" },
                { id: 9, label: "硬盘", price: 9000, icon: "hdd" },
                { id: 10, label: "内存", price: 10000, icon: "memory" },
                { id: 11, label: "硬盘盒", price: 11000, icon: "hdd-box" },
                { id: 12, label: "固态硬盘", price: 12000, icon: "ssd" },
                { id: 13, label: "机械硬盘", price: 13000, icon: "hdd" },
                { id: 14, label: "显卡", price: 14000, icon: "gpu" },
                { id: 15, label: "蓝牙耳机", price: 15000, icon: "bluetooth" },
                { id: 16, label: "电视", price: 16000, icon: "tv" },
                { id: 17, label: "空调", price: 17000, icon: "air-conditioner" },
                { id: 18, label: "冰箱", price: 18000, icon: "fridge" },
                { id: 19, label: "洗衣机", price: 19000, icon: "washing-machine" },
                { id: 20, label: "微波炉", price: 20000, icon: "microwave-oven" },
                { id: 21, label: "电饭煲", price: 21000, icon: "rice-cooker" },
                { id: 22, label: "电风扇", price: 22000, icon: "fan" },
                { id: 23, label: "电吹风", price: 23000, icon: "hair-dryer" },
                { id: 24, label: "吸尘器", price: 24000, icon: "vacuum-cleaner" },
            ]
        }),
        salary: configurable(3000, {
            label: '工资',
            widget: 'number',
            icon: 'japanese-yen',
            actions: [
                {
                    label: '清空',
                    icon: 'trash',
                    onClick: (value, { update }) => {
                        update('')
                    }
                }
            ]
        }),
        captcha: configurable('', {
            label: '验证码',
            widget: 'captcha',
            help: '单击刷新验证码',
            placeholder: '请输入验证码',
            url: "/captcha.png"
        }),
        birday: configurable('2025-11-01', { label: '生日', widget: 'date' }),
        phone: configurable('138456789112', {
            label: '电话号码',
            widget: 'phone',
            clearable: true,
            width: '50%'
        }),
        search: configurable('', {
            label: '搜索', widget: 'search',
            width: '50%'
        }),
        age: configurable(18, {
            widget: 'number',
            onValidate: (value) => {
                return value > 0 && value < 24
            },
            pill: true,
            label: '年龄',
            max: 100,
            min: 1,
            width: "50%",
            toView: (value: any) => `<span style="color:red;border:1px solid red;padding:4px;">${value}岁</span>`
        }),
        password: configurable("18", {
            label: '密码',
            widget: 'password',
            passwordToggle: true,
            maxLength: 6,
            minLength: 3,
            pill: true,
            width: "50%"
        }),
        sex: configurable('男', { label: '性别', widget: 'radio', select: ['男', '女'] }),
        post: configurable('程序员', {
            label: '职业',
            widget: 'select',
            select: ['程序员', '教师', '医生', '其他']
        }),
        ip: configurable('192.168.6.112', { label: '网络地址', widget: 'ipaddress' }),
        access: configurable(false, {
            label: '允许访问',
            widget: 'switch'
        }),
        depts: configurable(['产品部'], {
            label: '部门',
            widget: 'tree-select',
            multiple: true,
            valueKey: 'label',     // 默认选择的是id
            onlySelectLeaf: false,      // 只选择叶子节点
            // maxItems: 3,    // 最多选择3个
            // minItems:1
            items: orgTree,
            // onSelectionChange: (selection) => {}
        }),
        org: configurable(['工程部', '市场部'], {
            label: '组织架构',
            widget: 'tree-dropdown',
            valueKey: "label",
            multiple: true,
            showAsPath: true,
            items: Object.assign({}, orgTree)
        }),
        adminDept: configurable(undefined, {
            label: '管理部门',
            placeholder: '选择管理部门',
            widget: 'tree-dropdown',
            showAsPath: true,
            valueKey: "label",
            onlySelectLeaf: true,
            items: Object.assign({}, orgTree)
        }),
        tags: configurable(['测试'], {
            label: '标签',
            widget: 'radio',
            select: [
                '前端', '后端', '测试', '运维'
            ]
        }),
        rating: configurable(1, { label: '评分', widget: 'rating' }),
        level: configurable(2, {
            label: '级别',
            widget: 'radio-button',
            select: [
                { label: '初级', value: 1 },
                { label: '中级', value: 2 },
                { label: '高级', value: 3 },
                { label: '专家', value: 4 },
            ]
        }),
        version: configurable(['2.0'], {
            widget: 'select',
            multiple: true,
            label: '版本',
            clearable: true,
            actions: [{
                label: '升级',
                onClick: (value, { update }) => {
                    console.log("升级版本到:", JSON.stringify(value))
                    // update(['3.0', '4.0'])
                }
            }],
            // 
            placeholder: '请选择版本',
            select: [
                { label: '1.0' },
                { label: '2.0' },
                { label: '3.0' },
                { label: '4.0' },
                { label: '5.0' },
                { label: '6.0' },
                '-',
                { label: '7.0' },
                { label: '8.0' },
            ]
        }),
        volume: configurable(18, {
            widget: 'range',
            label: '音量',
            min: 0,
            max: 100,
            toView: (value: any) => `${value}%`
        }),
        worktime: configurable("12:12:11", { label: '上班时间', widget: 'time' }),
        certificate: configurable(1, {
            label: '证件类型', widget: 'radio', select: [
                { label: '身份证', value: 1 },
                { label: '护照', value: 2 },
                { label: '军官证', value: 3 },
                { label: '其他', value: 4 }
            ]
        }),
        email: configurable('admin@autostore.com', { label: '电子邮件', widget: 'email' }),
        color: configurable('#ff0000', { label: '颜色', widget: 'colorpicker' }),
        qrcode: configurable('www.voerkai18n.com', { label: '扫描二维码', widget: 'qrcode' }),
        notes: configurable('输入简历', {
            label: '简历',
            widget: 'textarea',
            enable: computed<boolean>((state) => {
                return state.user.admin
            })
        }),
        address: {
            city: configurable('北京', {
                required: true,
                label: '城市',
                pill: true,
                enable: computed<boolean>((state) => {
                    return state.user.admin
                })
            }),
            street: '长安街'
        }
    },
    x: 1

}, {
    resetable: true,
    debug: true
});


// @ts-ignore
window.store = store;
const updateState = () => {
    const textarea = document.querySelector('#state');
    // @ts-ignore
    textarea.value = JSON.stringify(store.state);
};
store.watch(() => updateState());
store.on('validate', () => {
    const ele = document.querySelector('#errors');
    ele!.innerHTML = JSON.stringify(store.schemas.errors);
});
updateState();
const form = document.querySelector('auto-form') as AutoForm;
// @ts-ignore
form!.bind(store);




@customElement("auto-form-debuger")
class AutoFormDebuger extends LitElement {
    static styles = css`
        .toolbar{
            display: flex;
            flex-direction: column;
            align-items: stretch;
            position: relative;
            background-color: #fafafa;
            border-radius: 4px;
            padding: 8px;
            gap:0.5rem;
            & > *{
                flex-grow: 1;
                display:flex;
                flex-direction: row;                
                align-items: center;
                position: relative;
                text-align:left;                
                gap:0.5rem;
            }
        }
    `
    /**
     * 获取下一下autoform表单元素
     */
    getNextAutoForm() {
        // 获取当前元素的下一个兄弟节点开始遍历
        let nextNode = this.nextElementSibling;

        // 遍历后续的兄弟节点
        while (nextNode) {
            // 检查节点是否是auto-form元素
            if (nextNode.tagName.toLowerCase() === 'auto-form') {
                return nextNode as HTMLElement;
            }
            nextNode = nextNode.nextElementSibling;
        }


        // 如果没有找到则返回null
        return null;
    }
    onToggleDark(e) {
        const ele = this.getNextAutoForm();
        if (ele) {
            // @ts-ignore
            ele.dark = e.target.checked;
        }
    }
    onChangelabelPos(e) {
        const ele = this.getNextAutoForm();
        if (ele) {
            // @ts-ignore
            ele.labelPos = e.target.value;
        }
    }
    onToggleGridLine(e) {
        const ele = this.getNextAutoForm();
        if (ele) {
            // @ts-ignore
            ele.grid = e.target.checked;
        }
    }
    onToggleReadonly(e) {
        const ele = this.getNextAutoForm();
        if (ele) {
            if (e.target.checked) {
                ele.setAttribute('readonly', "");
            } else {
                ele.removeAttribute('readonly');
            }
        }
    }
    onChangeViewAlign(e) {
        const ele = this.getNextAutoForm();
        if (ele) {
            ele.setAttribute('viewAlign', e.target.value);
        }
    }

    onChangeSize(e) {
        const ele = this.getNextAutoForm();
        if (ele) {
            ele.setAttribute('size', e.target.value);
        }
    }
    onToggleView(e) {
        const ele = this.getNextAutoForm();
        if (ele) {
            if (e.target.checked) {
                ele.setAttribute('viewonly', "");
            } else {
                ele.removeAttribute('viewonly');
            }
        }
    }

    onToggleCompact(e) {
        const ele = this.getNextAutoForm();
        if (ele) {
            if (e.target.checked) {
                ele.setAttribute('compact', "");
            } else {
                ele.removeAttribute('compact');
            }
        }
    }
    getJson() {
        return {
            user: {
                name: '张三',
                age: 18,
                admin: true,
                certificate: 1,
                email: '<EMAIL>',
                color: '#ff0000',
                qrcode: 'www.voerkai18n.com',
                notes: '输入简历',
                address: {
                    city: '北京',
                    street: '长安街'
                },
            },
            orders: [
                { id: 1, name: 'iphone12', price: 10000, count: 10000, date: '2021-01-01' },
                { id: 2, name: 'iphone12', price: 10000, count: 10000, date: '2021-01-01' },
            ]
        }
    }
    onSubmit() {
        const form = this.getNextAutoForm() as AutoForm
        if (form) {
            form.submit((values, errors) => {
                console.log("errors=", errors)
                console.log("values=", JSON.stringify(values))
            })
        }
    }

    onReset() {
        const form = this.getNextAutoForm() as AutoForm
        if (form) {
            form.reset()
        }
    }
    render() {
        return html`
            <div class="toolbar">
                <div>
                <sl-select label="标签位置" style="width:100px;" value="top" @sl-change=${this.onChangelabelPos.bind(this)}>
                    <sl-option value="top">上方</sl-option>
                    <sl-option value="left">左侧</sl-option>
                    <sl-option value="none">隐藏</sl-option>
                </sl-select>   
                <sl-select label="尺寸" style="width:100px;" value="medium" @sl-change=${this.onChangeSize.bind(this)}>
                    <sl-option value="small">小</sl-option>
                    <sl-option value="medium">中</sl-option>
                    <sl-option value="large">大</sl-option>
                </sl-select>   
                <sl-select label="帮助信息" style="width:100px;" value="label" @sl-change=${this.onChangeSize.bind(this)}>
                    <sl-option value="label">标签</sl-option>
                    <sl-option value="value">值</sl-option>
                </sl-select>  
                <sl-select label="浏览对齐" style="width:150px;" value="right" @sl-change=${this.onChangeViewAlign.bind(this)}>
                    <sl-option value="left">左对齐</sl-option>
                    <sl-option value="center">居中</sl-option>
                    <sl-option value="right">右对齐</sl-option>
                </sl-select>   
                </div>
                <div>
                    <sl-checkbox @click=${this.onToggleDark.bind(this)}>暗色调</sl-checkbox>                    
                    <sl-checkbox @click=${this.onToggleGridLine.bind(this)}>网格线</sl-checkbox>                    
                    <sl-checkbox @click=${this.onToggleReadonly.bind(this)}>只读</sl-checkbox>                    
                    <sl-checkbox @click=${this.onToggleView.bind(this)}>浏览视图</sl-checkbox>                    
                    <sl-checkbox @click=${this.onToggleCompact.bind(this)}>紧凑模式</sl-checkbox>                    
                </div>
                <div>
                    <sl-button @click=${this.onSubmit.bind(this)}>提交</sl-button>
                    <sl-button @click=${this.onReset.bind(this)}>重置</sl-button> 
                </div>               
            </div>
        `
    }

}


declare global {
    interface HTMLElementTagNameMap {
        'auto-form-debuger': AutoFormDebuger
    }
}
