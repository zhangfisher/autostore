import path from 'path';
import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'

export default defineConfig({
    base: '/autostore/',
    title: "AutoStore",
    description: "极致优雅的全自动React状态库",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        outline: {
            label: "目录",
            level: [2, 5]
        },
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            { text: '指南', link: '/zh/guide/' },
            { text: '表单', link: '/zh/form/' },
            { text: '开源推荐', link: 'https://zhangfisher.github.io/repos/' },
        ],
        sidebar: {
            "/zh/guide/": [
                {
                    text: '关于',
                    collapsed: false,
                    items: [
                        { text: '安装', link: '/zh/guide/intro/install' },
                        { text: '快速入门', link: '/zh/guide/intro/get-started' },
                        { text: '更新历史', link: '/zh/guide/intro/history' },
                        { text: '示例', link: '/zh/guide/intro/examples' },
                        { text: '常见问题', link: '/zh/guide/intro/question' },
                    ]
                },
                {
                    text: '指南',
                    items: [
                        {
                            text: 'Store',
                            collapsed: true,
                            items: [
                                { text: '关于', link: '/zh/guide/store/about' },
                                { text: 'Store', link: '/zh/guide/store/store' },
                                { text: 'State', link: '/zh/guide/store/state' },
                                { text: '渲染优化', link: '/zh/guide/store/render' },
                                { text: '事件', link: '/zh/guide/store/events' },
                                { text: '批量更新', link: '/zh/guide/store/batchUpdate' },
                                { text: '校验模式', link: '/zh/guide/store/schema' },
                                { text: '同步', link: '/zh/guide/store/sync' },
                                { text: 'Shadow', link: '/zh/guide/store/shadow' },
                            ]
                        },
                        {
                            text: '计算属性',
                            collapsed: true,
                            items: [
                                { text: '关于', link: '/zh/guide/computed/about' },
                                { text: '创建', link: '/zh/guide/computed/create' },
                                { text: '计算函数', link: '/zh/guide/computed/getter' },
                                { text: '依赖收集', link: '/zh/guide/computed/deps' },
                                { text: '作用域', link: '/zh/guide/computed/scope' },
                                { text: '同步计算', link: '/zh/guide/computed/sync' },
                                { text: '异步计算', link: '/zh/guide/computed/async' },
                                { text: '计算选项', link: '/zh/guide/computed/options' },
                                { text: '计算对象', link: '/zh/guide/computed/objects' },
                                { text: '手动执行', link: '/zh/guide/computed/run' }
                            ]
                        },
                        {
                            text: '监视',
                            collapsed: true,
                            items: [
                                { text: '关于', link: '/zh/guide/watch/about' },
                                { text: '全局监视', link: '/zh/guide/watch/store-watch' },
                                { text: '状态内监视', link: '/zh/guide/watch/watch' },
                                { text: 'useWatch', link: '/zh/guide/watch/use-watch' },
                                { text: '监视对象', link: '/zh/guide/watch/objects' }
                            ]
                        },
                        {
                            text: '信号',
                            collapsed: true,
                            items: [
                                { text: '关于', link: '/zh/guide/signal/about' },
                                { text: '信号组件', link: '/zh/guide/signal/component' },
                                { text: '状态信号组件', link: '/zh/guide/signal/state-render' },
                                { text: '自定义渲染', link: '/zh/guide/signal/custom-render' },
                                { text: '计算信号组件', link: '/zh/guide/signal/computed-render' },
                                { text: '监听信号组件', link: '/zh/guide/signal/watch' },
                                { text: '错误处理', link: '/zh/guide/signal/error-boundary' }
                            ]
                        },
                        {
                            text: '表单绑定',
                            collapsed: true,
                            items: [
                                { text: '关于', link: '/zh/guide/form/about' },
                                { text: "快速入门", link: "/zh/guide/form/get-started" },
                                {
                                    text: '表单',
                                    collapsed: true,
                                    items: [
                                        { text: "创建", link: "/zh/guide/form/form/create" },
                                        { text: "useForm", link: "/zh/guide/form/form/use-form" },
                                        { text: "提交表单", link: "/zh/guide/form/form/submit" },
                                    ]
                                },
                                {
                                    text: "字段",
                                    collapsed: false,
                                    items: [
                                        { text: '关于', link: '/zh/guide/form/field/about' },
                                        { text: '简单字段', link: '/zh/guide/form/field/simple-field' },
                                        { text: 'useField', link: '/zh/guide/form/field/use-field' },
                                        { text: 'useFields', link: '/zh/guide/form/field/use-fields' },
                                        { text: "字段拆分", link: "/zh/guide/form/field/split-field" },
                                        { text: "字段组件", link: "/zh/guide/form/field/field-component" }
                                    ]
                                },
                                {
                                    text: "表单校验",
                                    collapsed: false,
                                    link: "/zh/guide/form/validate"
                                },
                                {
                                    text: "脏检查",
                                    link: "/zh/guide/form/dirty"
                                }
                            ]
                        },
                        {
                            text: '调试与诊断',
                            collapsed: true,
                            items: [
                                { text: 'DevTools', link: '/zh/guide/debug/devTools' },
                                { text: 'trace', link: '/zh/guide/debug/trace' },
                                { text: '依赖收集', link: '/zh/guide/debug/collectDeps' },
                                { text: '日志', link: '/zh/guide/debug/log' },
                                { text: '循环依赖', link: '/zh/guide/debug/circular-dependency' },
                            ]
                        }
                    ]
                }
            ],
            "/zh/form/": [
                {
                    text: '关于',
                    items: [
                        { text: '安装', link: '/zh/form/intro/install' },
                        { text: '快速入门', link: '/zh/form/intro/get-started' },
                    ]
                },
                {
                    text: '指南',
                    items: [
                        { text: '表单', link: '/zh/form/guide/form' },
                        { text: '字段', link: '/zh/form/guide/field' },
                        { text: '校验', link: '/zh/form/guide/validate' },
                        { text: '提交表单', link: '/zh/form/guide/submit' },
                        { text: '图标', link: '/zh/form/guide/icons' },
                    ]
                },
                {
                    text: '字段组件',
                    items: [
                        { text: 'Input', link: '/zh/form/guide/fields/input' },
                        { text: 'Number', link: '/zh/form/guide/fields/number' },
                        { text: 'Date', link: '/zh/form/guide/fields/date' },
                        { text: 'Time', link: '/zh/form/guide/fields/time' },
                        { text: 'DateTime', link: '/zh/form/guide/fields/datetime' },
                        { text: 'Phone', link: '/zh/form/guide/fields/phone' },
                        { text: 'Email', link: '/zh/form/guide/fields/email' },
                        { text: 'DateRange', link: '/zh/form/guide/fields/date-range' },
                        { text: 'Url', link: '/zh/form/guide/fields/url' },
                        { text: 'Search', link: '/zh/form/guide/fields/search' },
                        { text: 'Checkbox', link: '/zh/form/guide/fields/checkbox' },
                        { text: 'CheckboxGroup', link: '/zh/form/guide/fields/checkbox-group' },
                        { text: 'ColorPicker', link: '/zh/form/guide/fields/colorpicker' },
                        { text: 'Cascader', link: '/zh/form/guide/fields/cascader' },
                        { text: 'Switch', link: '/zh/form/guide/fields/switch' },
                        { text: 'Radio', link: '/zh/form/guide/fields/radio' },
                        { text: 'RadioButton', link: '/zh/form/guide/fields/radio-button' },
                        { text: 'List', link: '/zh/form/guide/fields/list' },
                        { text: 'Select', link: '/zh/form/guide/fields/select' },
                        { text: 'TreeSelect', link: '/zh/form/guide/fields/tree-select' },
                        { text: 'TreeDropdown', link: '/zh/form/guide/fields/tree-dropdown' },
                        { text: 'Rating', link: '/zh/form/guide/fields/rating' },
                        { text: 'Range', link: '/zh/form/guide/fields/range' },
                        { text: 'Textarea', link: '/zh/form/guide/fields/textarea' },
                        { text: 'Upload', link: '/zh/form/guide/fields/upload' },
                        { text: 'Parts', link: '/zh/form/guide/fields/parts' },
                        { text: 'Captcha', link: '/zh/form/guide/fields/captcha' },
                        { text: 'VerifyCode', link: '/zh/form/guide/fields/verify-code' },
                        { text: 'IpAddress', link: '/zh/form/guide/fields/ipaddress' },
                        { text: 'Icons', link: '/zh/form/guide/fields/icons' },
                        { text: 'Combine', link: '/zh/form/guide/fields/combine' },
                        { text: 'Custom', link: '/zh/form/guide/fields/custom' },
                        { text: 'QrCode', link: '/zh/form/guide/fields/qrcode' },
                    ]
                },
            ]
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/zhangfisher/autostore/' }
        ]
    },
    vue: {
        template: {
            compilerOptions: {
                whitespace: 'preserve'
            }
        }
    },
    markdown: {
        config(md) {
            md.use(vitepressDemoPlugin, {
                demoDir: path.resolve(__dirname, '../../demos'),
                stackblitz: {
                    show: true,
                },
                codesandbox: {
                    show: true,
                },
            });
        },
        //   codeTransformers: [
        //     transformerTwoslash() 
        //   ]
    },
    // @ts-ignore
    build: {
        chunkSizeWarningLimit: 10000000,
        rollupOptions: {
            output: {
                manualChunks: {
                    // 将较大的依赖项分组到单独的块中
                    'vendor': ['vue', 'vue-router'],
                    'shiki': ['shiki', '@shikijs/vitepress-twoslash'],
                    // 添加其他大型依赖项
                }
            }
        }
    }
})
