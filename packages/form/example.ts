import { AutoStore, computed, configurable } from 'autostore';
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
        age: configurable(18, { title: '年龄', enable: () => true }),
        admin: configurable(true, { title: '管理员' }),
        sex: configurable('男', { title: '性别', widget: 'radio', select: ['男', '女'] }),
        post: configurable('程序员', { title: '职业', widget: 'select', select: ['程序员', '教师', '医生', '其他'] }),
        notes: configurable('', { title: '简历', widget: 'textarea' }),
        x: 1,
        products: [
            configurable('100', {
                title: '产品',
                widget: 'select',
                select: ['100', '200', '300'],
                enable: computed((state) => {
                    return state.user.admin
                }),
                required: computed(async (state) => {
                    return state.user.admin
                }, ['user.admin']),
            })
        ]
    },
});


const sobj = store.schemas.add("user.age", {
    value: 18,
    validate: (val: any) => val > 18,
    enable: computed((state) => {
        return state.user.admin
    }),
    required: computed(async (state) => {
        return state.user.admin
    }, ['user.admin']),
    errorTips: '年龄必须大于18岁',
})

sobj.enable
sobj.required.value
sobj.value
sobj.enable


type RawStateType = typeof store.types.rawState;
type StateType = typeof store.types.state;
const ageSchema = store.schemas.get("user.age");
ageSchema!.enable
ageSchema!.value
ageSchema!.path

const productSchema = store.schemas.get("user.products.1")!;
productSchema.value
productSchema.title
productSchema.enable
const productSchema2 = store.schemas.get("user.products.0")!;
productSchema2.value
productSchema2.title
productSchema2.required

const usernameSchema = store.schemas.get("user.name")!;
usernameSchema.enable
usernameSchema.required
usernameSchema.value
usernameSchema.path
usernameSchema.placeholder


store.schemas.get("user.age")!.title
store.schemas.get("user.age")!.enable
store.schemas.get("user.age")!.path





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