import { LitElement, css, html } from 'lit';
import { AutoForm } from './src/form/index';
import { AutoStore, computed, configurable } from 'autostore';
import { customElement } from 'lit/decorators.js';




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
        name: configurable('Fisher', (value) => {
            return value.length > 5;
        }, {
            label: '姓名',
            placeholder: '请输入姓名',
            invalidMessage: '姓名长度必须大于3个字符',
            help: "中文姓名",
            required: computed(async (state) => {
                await delay(2000)
                return state.user.admin
            }, ['user.admin']),
            enable: computed<boolean>((state) => {
                return state.user.admin
            }),
            actions: [
                {
                    label: '验证',
                    onClick: (value, { update }) => {
                        console.log('Action click:', value)
                        update(value + "*")
                    }
                },
                {
                    label: '前面',
                    position: 'before',
                    onClick: (args) => {
                        console.log('Action click:', args)
                    },

                }
            ]
        }),
        admin: configurable(true, { label: '管理员', help: "管理员拥有有所有权限" }),
        birday: configurable('2025-11-01', { label: '生日', widget: 'date' }),
        phone: configurable('138456789112', {
            label: '电话号码',
            widget: 'phone',
            clearable: true
        }),
        search: configurable('', { label: '搜索', widget: 'search' }),
        age: configurable(18, (value) => {
            return value > 0 && value < 24
        }, {
            widget: 'number',
            pill: true,
            label: '年龄',
            max: 100,
            min: 1,
            width: "50%"
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

        homepage: configurable("www.autostore.com", { widget: "url", label: '主页' }),
        sex: configurable('男', { label: '性别', widget: 'radio', select: ['男', '女'] }),
        post: configurable('程序员', {
            label: '职业',
            widget: 'select',
            select: ['程序员', '教师', '医生', '其他']
        }),
        ip: configurable('127.0.0.1', { label: '网络地址', widget: 'ipaddress' }),
        enable: configurable(true, { label: '启用/关闭', widget: 'switch' }),
        depts: configurable(['产品部'], {
            label: '部门',
            widget: 'tree-select',
            multiple: true,
            valueKey: 'label',     // 默认选择的是id
            // maxItems: 3,    // 最多选择3个
            items: orgTree
        }),
        org: configurable(['组织架构'], {
            label: '组织架构',
            widget: 'tree-dropdown-select',
            multiple: true,
            items: Object.assign({}, orgTree)
        }),
        tags: configurable(['前端'], { label: '标签', widget: 'radio', select: ['前端', '后端', '测试', '运维'] }),
        rating: configurable(1, { label: '评分', widget: 'rating' }),
        level: configurable(1, {
            label: '级别', widget: 'radio-button',
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
            max: 100
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
    const ele = document.querySelector('#state');
    ele!.innerHTML = JSON.stringify(store.state);
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
            flex-direction: row;
            align-items: center;
            position: relative;
            background-color: #fafafa;
            border-radius: 4px;
            padding: 8px;
            & > span{
                flex-grow: 1;
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
    render() {
        return html`
            <div class="toolbar">
                <span>
                    <sl-checkbox @click=${this.onToggleDark.bind(this)}>深色调</sl-checkbox>
                </span>
                <sl-button>提交</sl-button>
                <sl-button>重置</sl-button>                
            </div>
        `
    }

}


declare global {
    interface HTMLElementTagNameMap {
        'auto-form-debuger': AutoFormDebuger
    }
}
