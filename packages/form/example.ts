import { AutoStore, computed, ComputedState, configurable } from 'autostore';
import { AutoForm } from './src/form/index';

const store = new AutoStore({
    user: {
        name: configurable('Fisher', (value: any) => {
            return value && value.length > 5;
        }, {
            title: '姓名',
            placeholder: '请输入姓名',
            errorTips: '姓名长度必须大于3个字符',
            required: computed(async (state) => {
                return state.user.admin
            }, ['user.admin']),
            enable: computed<boolean>((state) => {
                return state.user.admin
            })
        }),
        admin: ""
        // age: configurable(18, {
        //     title: '年龄',
        //     widget: 'number', enable: () => true,
        //     max: 100,
        //     min: 1
        // }),
        // password: configurable("18", {
        //     title: '密码',
        //     widget: 'password',
        //     passwordToggle: true,
        //     maxLength: 6,
        //     minLength: 3,
        //     pill: true
        // }),
        // admin: configurable(true, { title: '管理员' }),
        // homepage: configurable("www.autostore.com", { widget: "url", title: '主页' }),
        // sex: configurable('男', { title: '性别', widget: 'radio', select: ['男', '女'] }),
        // post: configurable('程序员', {
        //     title: '职业',
        //     widget: 'select',
        //     select: ['程序员', '教师', '医生', '其他']
        // }),
        // ip: configurable('127.0.0.1', { title: '网络地址', widget: 'ipaddress' }),
        // enable: configurable(true, { title: '启用/关闭', widget: 'switch' }),
        // depts: configurable(['技术部'], {
        //     title: '部门',
        //     widget: 'tree-select',
        //     selection: 'multiple',
        //     items: [{
        //         title: '美一',
        //         children: [
        //             {
        //                 id: 1,
        //                 title: '研发中心',
        //                 children: [
        //                     { id: 11, title: '工程部' },
        //                     { id: 12, title: '产品部' },
        //                     { id: 13, title: '测试部' },
        //                     { id: 14, title: '运维部' },
        //                     { id: 15, title: '系统部' }
        //                 ]
        //             },
        //             {
        //                 id: 2,
        //                 title: "营销中心",
        //                 selected: true,
        //                 children: [
        //                     { id: 21, title: '销售部' },
        //                     { id: 22, title: '市场部' },
        //                     { id: 23, title: '客服部' }
        //                 ]
        //             },
        //             {
        //                 id: 3,
        //                 title: '生产中心',
        //                 children: [
        //                     { id: 31, title: '生产部' },
        //                     { id: 32, title: '采购部' },
        //                     { id: 33, title: '仓储部' },
        //                     { id: 34, title: '质检部' }
        //                 ]

        //             }
        //         ]
        //     },
        //     {
        //         id: 223,
        //         title: '生产中心',
        //         children: [
        //             { id: 2231, title: '生产部' },
        //             { id: 2232, title: '采购部' },
        //             { id: 2233, title: '仓储部' },
        //             { id: 2234, title: '质检部' }
        //         ]

        //     }


        //     ]
        // }),
        // tags: configurable(['前端'], { title: '标签', widget: 'radio', select: ['前端', '后端', '测试', '运维'] }),
        // rating: configurable(1, { title: '评分', widget: 'rating' }),
        // level: configurable(1, {
        //     title: '级别', widget: 'radio-button',
        //     select: [
        //         { label: '初级', value: 1 },
        //         { label: '中级', value: 2 },
        //         { label: '高级', value: 3 },
        //         { label: '专家', value: 4 },
        //     ]
        // }),

        // version: configurable(['2.0'], {
        //     title: '版本',
        //     widget: 'select',
        //     multiple: true,
        //     clearable: true,
        //     placeholder: '请选择版本',
        //     select: [
        //         { label: '1.0' },
        //         { label: '2.0' },
        //         { label: '3.0' },
        //         { label: '4.0' },
        //         { label: '5.0' },
        //         { label: '6.0' },
        //         '-',
        //         { label: '7.0' },
        //         { label: '8.0' },
        //     ]
        // }),
        // volume: configurable(18, { title: '音量', widget: 'range', min: 0, max: 100 }),
        // worktime: configurable("12:12:11", { title: '上班时间', widget: 'time' }),
        // certificate: configurable(1, {
        //     title: '证件类型', widget: 'radio', select: [
        //         { label: '身份证', value: 1 },
        //         { label: '护照', value: 2 },
        //         { label: '军官证', value: 3 },
        //         { label: '其他', value: 4 }
        //     ]
        // }),
        // birday: configurable('2025-11-01', { title: '生日', widget: 'date' }),
        // email: configurable('admin@autostore.com', { title: '电子邮件', widget: 'email' }),
        // color: configurable('#ff0000', { title: '颜色', widget: 'colorpicker' }),
        // qrcode: configurable('www.voerkai18n.com', { title: '扫描二维码', widget: 'qrcode' }),
        , notes: configurable('输入简历', { title: '简历', widget: 'textarea' }),
    },
    x: 1

}, {
    resetable: true
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