import path from 'path';
import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';

export default defineConfig({
    base: '/autostore/',
    title: 'AutoStore',
    description: '响应式数据管理库',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        outline: {
            label: '目录',
            level: [2, 5],
        },
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            { text: '核心库', link: '/zh/store/' },
            { text: 'React', link: '/zh/react/' },
            { text: '表单', link: '/zh/form/' },
            { text: '开源推荐', link: 'https://zhangfisher.github.io/repos/' },
        ],
        sidebar: {
            '/zh/react/': [
                {
                    text: '关于',
                    collapsed: false,
                    items: [
                        { text: '安装', link: '/zh/react/intro/install' },
                        { text: '快速入门', link: '/zh/react/intro/get-started' },
                        { text: '示例', link: '/zh/react/intro/examples' },
                        { text: '常见问题', link: '/zh/react/intro/question' },
                    ],
                },
                {
                    text: '指南',
                    items: [
                        {
                            text: 'Store',
                            collapsed: true,
                            items: [
                                { text: '关于', link: '/zh/react/store/about' },
                                { text: 'Store', link: '/zh/react/store/store' },
                                { text: 'State', link: '/zh/react/store/state' },
                                { text: '渲染优化', link: '/zh/react/store/render' },
                                { text: '事件', link: '/zh/react/store/events' },
                                { text: '批量更新', link: '/zh/react/store/batchUpdate' },
                                { text: '校验模式', link: '/zh/react/store/schema' },
                                { text: '同步', link: '/zh/react/store/sync' },
                                { text: 'Shadow', link: '/zh/react/store/shadow' },
                            ],
                        },
                        {
                            text: '计算属性',
                            collapsed: true,
                            items: [
                                { text: '关于', link: '/zh/react/computed/about' },
                                { text: '创建', link: '/zh/react/computed/create' },
                                { text: '计算函数', link: '/zh/react/computed/getter' },
                                { text: '依赖收集', link: '/zh/react/computed/deps' },
                                { text: '作用域', link: '/zh/react/computed/scope' },
                                { text: '同步计算', link: '/zh/react/computed/sync' },
                                { text: '异步计算', link: '/zh/react/computed/async' },
                                { text: '计算选项', link: '/zh/react/computed/options' },
                                { text: '计算对象', link: '/zh/react/computed/objects' },
                                { text: '手动执行', link: '/zh/react/computed/run' },
                            ],
                        },
                        {
                            text: '监视',
                            collapsed: true,
                            items: [
                                { text: '关于', link: '/zh/react/watch/about' },
                                { text: '全局监视', link: '/zh/react/watch/store-watch' },
                                { text: '状态内监视', link: '/zh/react/watch/watch' },
                                { text: 'useWatch', link: '/zh/react/watch/use-watch' },
                                { text: '监视对象', link: '/zh/react/watch/objects' },
                            ],
                        },
                        {
                            text: '信号',
                            collapsed: true,
                            items: [
                                { text: '关于', link: '/zh/react/signal/about' },
                                { text: '信号组件', link: '/zh/react/signal/component' },
                                { text: '状态信号组件', link: '/zh/react/signal/state-render' },
                                { text: '自定义渲染', link: '/zh/react/signal/custom-render' },
                                { text: '计算信号组件', link: '/zh/react/signal/computed-render' },
                                { text: '监听信号组件', link: '/zh/react/signal/watch' },
                                { text: '错误处理', link: '/zh/react/signal/error-boundary' },
                            ],
                        },
                        {
                            text: '表单绑定',
                            collapsed: true,
                            items: [
                                { text: '关于', link: '/zh/react/form/about' },
                                { text: '快速入门', link: '/zh/react/form/get-started' },
                                {
                                    text: '表单',
                                    collapsed: true,
                                    items: [
                                        { text: '创建', link: '/zh/react/form/form/create' },
                                        { text: 'useForm', link: '/zh/react/form/form/use-form' },
                                        { text: '提交表单', link: '/zh/react/form/form/submit' },
                                    ],
                                },
                                {
                                    text: '字段',
                                    collapsed: false,
                                    items: [
                                        { text: '关于', link: '/zh/react/form/field/about' },
                                        { text: '简单字段', link: '/zh/react/form/field/simple-field' },
                                        { text: 'useField', link: '/zh/react/form/field/use-field' },
                                        { text: 'useFields', link: '/zh/react/form/field/use-fields' },
                                        { text: '字段拆分', link: '/zh/react/form/field/split-field' },
                                        { text: '字段组件', link: '/zh/react/form/field/field-component' },
                                    ],
                                },
                                {
                                    text: '表单校验',
                                    collapsed: false,
                                    link: '/zh/react/form/validate',
                                },
                                {
                                    text: '脏检查',
                                    link: '/zh/react/form/dirty',
                                },
                            ],
                        },
                        {
                            text: '调试与诊断',
                            collapsed: true,
                            items: [
                                { text: 'DevTools', link: '/zh/react/debug/devTools' },
                                { text: 'trace', link: '/zh/react/debug/trace' },
                                { text: '依赖收集', link: '/zh/react/debug/collectDeps' },
                                { text: '日志', link: '/zh/react/debug/log' },
                                { text: '循环依赖', link: '/zh/react/debug/circular-dependency' },
                            ],
                        },
                    ],
                },
            ],
            '/zh/store/': [
                {
                    text: '指南',
                    items: [
                        { text: '概念', link: '/zh/store/guide/store/about' },
                        { text: '安装', link: '/zh/store/guide/install' },
                        { text: '创建', link: '/zh/store/guide/store/create' },
                        { text: '读写状态', link: '/zh/store/guide/store/read-write' },
                        { text: '事件', link: '/zh/store/guide/store/events' },
                        { text: '批量更新', link: '/zh/store/guide/store/batchUpdate' },
                        { text: '校验模式', link: '/zh/store/guide/store/schema' },
                        { text: '同步', link: '/zh/store/guide/store/sync' },
                        { text: 'Shadow', link: '/zh/store/guide/store/shadow' },
                        {
                            text: '计算属性',
                            collapsed: true,
                            items: [
                                { text: '关于', link: '/zh/store/guide/computed/about' },
                                { text: '创建', link: '/zh/store/guide/computed/create' },
                                { text: '计算函数', link: '/zh/store/guide/computed/getter' },
                                { text: '依赖收集', link: '/zh/store/guide/computed/deps' },
                                { text: '作用域', link: '/zh/store/guide/computed/scope' },
                                { text: '同步计算', link: '/zh/store/guide/computed/sync' },
                                { text: '异步计算', link: '/zh/store/guide/computed/async' },
                                { text: '计算选项', link: '/zh/store/guide/computed/options' },
                                { text: '计算对象', link: '/zh/store/guide/computed/objects' },
                                { text: '手动执行', link: '/zh/store/guide/computed/run' },
                            ],
                        },
                        {
                            text: '监视',
                            collapsed: true,
                            items: [
                                { text: '关于', link: '/zh/store/guide/watch/about' },
                                { text: '全局监视', link: '/zh/store/guide/watch/store-watch' },
                                { text: '状态内监视', link: '/zh/store/guide/watch/watch' },
                                { text: 'useWatch', link: '/zh/store/guide/watch/use-watch' },
                                { text: '监视对象', link: '/zh/store/guide/watch/objects' },
                            ],
                        },
                        { text: '配置参数', link: '/zh/store/guide/store/state' },
                    ],
                },
            ],
            '/zh/form/': [
                {
                    text: '关于',
                    items: [
                        { text: '安装', link: '/zh/form/intro/install' },
                        { text: '快速入门', link: '/zh/form/intro/get-started' },
                    ],
                },
                {
                    text: '指南',
                    items: [
                        { text: '表单', link: '/zh/form/guide/form' },
                        { text: '字段', link: '/zh/form/guide/field' },
                        { text: '校验', link: '/zh/form/guide/validate' },
                        { text: '提交表单', link: '/zh/form/guide/submit' },
                        { text: '图标', link: '/zh/form/guide/icons' },
                    ],
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
                    ],
                },
                {
                    text: '示例',
                    items: [{ text: '综合', link: '/examples/demo.html', target: '_blank' }],
                },
            ],
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/zhangfisher/autostore/' }],
    },
    vue: {
        template: {
            compilerOptions: {
                whitespace: 'preserve',
            },
        },
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
                    vendor: ['vue', 'vue-router'],
                    shiki: ['shiki', '@shikijs/vitepress-twoslash'],
                    // 添加其他大型依赖项
                },
            },
        },
    },
    vite: {
        build: {
            chunkSizeWarningLimit: 2000, // 将限制提高到 1000KB
        },
    },
});
