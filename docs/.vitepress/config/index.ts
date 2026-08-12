import path from "path";
import { defineConfig } from "vitepress";
import { vitepressDemoPlugin } from "vitepress-demo-plugin";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";

export default defineConfig({
    base: "/autostore/",
    title: "AutoStore",
    description: "响应式数据管理库",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        outline: {
            label: "目录",
            level: [2, 5],
        },
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "首页", link: "/" },
            { text: "核心库", link: "/zh/store/" },
            { text: "同步", link: "/zh/sync/" },
            { text: "React", link: "/zh/react/" },
            { text: "模板", link: "/zh/template/" },
            { text: "开源推荐", link: "https://zhangfisher.github.io/repos/" },
        ],
        sidebar: {
            "/zh/store/": [
                {
                    text: "关于",
                    items: [
                        { text: "概念", link: "/zh/store/guide/store/about" },
                        { text: "安装", link: "/zh/store/guide/install" },
                    ],
                },
                {
                    text: "指南",
                    items: [
                        { text: "创建", link: "/zh/store/guide/store/create" },
                        { text: "状态更新", link: "/zh/store/guide/store/read-write" },
                        { text: "事件", link: "/zh/store/guide/store/events" },
                        { text: "批量更新", link: "/zh/store/guide/store/batchUpdate" },
                        {
                            text: "计算属性",
                            collapsed: true,
                            items: [
                                { text: "关于", link: "/zh/store/guide/computed/about" },
                                { text: "创建", link: "/zh/store/guide/computed/create" },
                                { text: "计算函数", link: "/zh/store/guide/computed/getter" },
                                { text: "依赖收集", link: "/zh/store/guide/computed/deps" },
                                { text: "作用域", link: "/zh/store/guide/computed/scope" },
                                { text: "同步计算", link: "/zh/store/guide/computed/sync" },
                                { text: "异步计算", link: "/zh/store/guide/computed/async" },
                                { text: "计算选项", link: "/zh/store/guide/computed/options" },
                                { text: "计算对象", link: "/zh/store/guide/computed/objects" },
                                { text: "手动执行", link: "/zh/store/guide/computed/run" },
                            ],
                        },
                        {
                            text: "监视",
                            collapsed: true,
                            items: [
                                { text: "关于", link: "/zh/store/guide/watch/about" },
                                { text: "全局监视", link: "/zh/store/guide/watch/store-watch" },
                                { text: "状态内监视", link: "/zh/store/guide/watch/watch" },
                                { text: "useWatch", link: "/zh/store/guide/watch/use-watch" },
                                { text: "监视对象", link: "/zh/store/guide/watch/objects" },
                            ],
                        },
                        { text: "数据校验", link: "/zh/store/guide/store/validate" },
                        { text: "Shadow", link: "/zh/store/guide/store/shadow" },
                        { text: "RefStore", link: "/zh/store/guide/store/refStore" },
                        { text: "配置系统", link: "/zh/store/guide/store/config" },
                        { text: "选项", link: "/zh/store/guide/store/options" },
                        { text: "Typescript", link: "/zh/store/guide/store/typescript" },
                    ],
                },
            ],
            "/zh/react/": [
                {
                    text: "关于",
                    collapsed: false,
                    items: [
                        { text: "安装", link: "/zh/react/intro/install" },
                        { text: "快速入门", link: "/zh/react/intro/get-started" },
                        { text: "示例", link: "/zh/react/intro/examples" },
                        { text: "常见问题", link: "/zh/react/intro/question" },
                    ],
                },
                {
                    text: "指南",
                    items: [
                        {
                            text: "Store",
                            collapsed: true,
                            items: [
                                { text: "关于", link: "/zh/react/store/about" },
                                { text: "Store", link: "/zh/react/store/store" },
                                { text: "State", link: "/zh/react/store/state" },
                                { text: "渲染优化", link: "/zh/react/store/render" },
                                { text: "事件", link: "/zh/react/store/events" },
                                { text: "批量更新", link: "/zh/react/store/batchUpdate" },
                            ],
                        },
                        {
                            text: "计算属性",
                            collapsed: true,
                            items: [
                                { text: "关于", link: "/zh/react/computed/about" },
                                { text: "创建", link: "/zh/react/computed/create" },
                                { text: "计算函数", link: "/zh/react/computed/getter" },
                                { text: "依赖收集", link: "/zh/react/computed/deps" },
                                { text: "作用域", link: "/zh/react/computed/scope" },
                                { text: "同步计算", link: "/zh/react/computed/sync" },
                                { text: "异步计算", link: "/zh/react/computed/async" },
                                { text: "计算选项", link: "/zh/react/computed/options" },
                                { text: "计算对象", link: "/zh/react/computed/objects" },
                                { text: "手动执行", link: "/zh/react/computed/run" },
                            ],
                        },
                        {
                            text: "监视",
                            collapsed: true,
                            items: [
                                { text: "关于", link: "/zh/react/watch/about" },
                                { text: "全局监视", link: "/zh/react/watch/store-watch" },
                                { text: "状态内监视", link: "/zh/react/watch/watch" },
                                { text: "useWatch", link: "/zh/react/watch/use-watch" },
                                { text: "监视对象", link: "/zh/react/watch/objects" },
                            ],
                        },
                        {
                            text: "信号",
                            collapsed: true,
                            items: [
                                { text: "关于", link: "/zh/react/signal/about" },
                                { text: "信号组件", link: "/zh/react/signal/component" },
                                { text: "状态信号组件", link: "/zh/react/signal/state-render" },
                                { text: "自定义渲染", link: "/zh/react/signal/custom-render" },
                                { text: "计算信号组件", link: "/zh/react/signal/computed-render" },
                                { text: "监听信号组件", link: "/zh/react/signal/watch" },
                                { text: "错误处理", link: "/zh/react/signal/error-boundary" },
                            ],
                        },
                        {
                            text: "表单绑定",
                            collapsed: true,
                            items: [
                                { text: "关于", link: "/zh/react/form/about" },
                                { text: "快速入门", link: "/zh/react/form/get-started" },
                                {
                                    text: "表单",
                                    collapsed: true,
                                    items: [
                                        { text: "创建", link: "/zh/react/form/form/create" },
                                        { text: "useForm", link: "/zh/react/form/form/use-form" },
                                        { text: "提交表单", link: "/zh/react/form/form/submit" },
                                    ],
                                },
                                {
                                    text: "字段",
                                    collapsed: false,
                                    items: [
                                        { text: "关于", link: "/zh/react/form/field/about" },
                                        {
                                            text: "useField",
                                            link: "/zh/react/form/field/use-field",
                                        },
                                        {
                                            text: "useFields",
                                            link: "/zh/react/form/field/use-fields",
                                        },
                                        {
                                            text: "字段拆分",
                                            link: "/zh/react/form/field/split-field",
                                        },
                                        {
                                            text: "字段组件",
                                            link: "/zh/react/form/field/field-component",
                                        },
                                    ],
                                },
                                {
                                    text: "表单校验",
                                    collapsed: false,
                                    link: "/zh/react/form/validate",
                                },
                                {
                                    text: "脏检查",
                                    link: "/zh/react/form/dirty",
                                },
                            ],
                        },
                        {
                            text: "调试与诊断",
                            collapsed: true,
                            items: [
                                { text: "DevTools", link: "/zh/react/debug/devTools" },
                                { text: "trace", link: "/zh/react/debug/trace" },
                                { text: "依赖收集", link: "/zh/react/debug/collectDeps" },
                                { text: "日志", link: "/zh/react/debug/log" },
                                { text: "循环依赖", link: "/zh/react/debug/circular-dependency" },
                            ],
                        },
                    ],
                },
            ],
            "/zh/sync/": [
                {
                    text: "关于",
                    items: [
                        { text: "安装", link: "/zh/sync/guide/install" },
                        { text: "快速入门", link: "/zh/sync/guide/get-starts" },
                    ],
                },
                {
                    text: "指南",
                    items: [
                        {
                            text: "Syncer",
                            link: "/zh/sync/guide/syncers/syncer",
                        },
                        {
                            text: "Clone",
                            link: "/zh/sync/guide/syncers/clone",
                        },
                        {
                            text: "WorkerSyncer",
                            link: "/zh/sync/guide/syncers/worker-syncer",
                        },
                        {
                            text: "BroadcastSyncer",
                            link: "/zh/sync/guide/syncers/broadcast-syncer",
                        },
                        {
                            text: "broadcastChannelSyncer",
                            link: "/zh/sync/guide/syncers/broadcast-channel-syncer",
                        },
                        {
                            text: "SwitchSyncer",
                            link: "/zh/sync/guide/syncers/switch-syncer",
                        },
                    ],
                },
            ],
            "/zh/template/": [
                {
                    text: "关于",
                    link: "/zh/template/intro/about",
                    items: [
                        { text: "安装", link: "/zh/template/intro/install" },
                        { text: "名词解释", link: "/zh/template/intro/glossary" },
                        { text: "快速入门", link: "/zh/template/intro/get-started" },
                        { text: "特征和优势", link: "/zh/template/intro/features" },
                        { text: "常见问题", link: "/zh/template/intro/question" },
                    ],
                },
                {
                    text: "指南",
                    items: [
                        { text: "初始化", link: "/zh/template/guide/initial" },
                        { text: "响应式", link: "/zh/template/guide/reactive" },
                        { text: "动作", link: "/zh/template/guide/action" },
                        { text: "指令类型", link: "/zh/template/guide/directive" },
                        { text: "指令配置", link: "/zh/template/guide/config" },
                        { text: "动态模板", link: "/zh/template/guide/patch" },
                        { text: "模板块", link: "/zh/template/guide/block" },
                    ],
                },
                {
                    text: "指令",
                    items: [
                        { text: "x-bind", link: "/zh/template/guide/directives/x-bind" },
                        { text: "x-text", link: "/zh/template/guide/directives/x-text" },
                        { text: "x-html", link: "/zh/template/guide/directives/x-html" },
                        { text: "x-style", link: "/zh/template/guide/directives/x-style" },
                        { text: "x-class", link: "/zh/template/guide/directives/x-class" },
                        { text: "x-data", link: "/zh/template/guide/directives/x-data" },
                        { text: "x-scope", link: "/zh/template/guide/directives/x-scope" },
                        { text: "x-if", link: "/zh/template/guide/directives/x-if" },
                        { text: "x-show", link: "/zh/template/guide/directives/x-show" },
                        { text: "x-for", link: "/zh/template/guide/directives/x-for" },
                        { text: "x-on", link: "/zh/template/guide/directives/x-on" },
                        { text: "x-loading", link: "/zh/template/guide/directives/x-loading" },
                        { text: "x-slot", link: "/zh/template/guide/directives/x-slot" },
                        { text: "x-patch", link: "/zh/template/guide/directives/x-patch" },
                        { text: "x-model", link: "/zh/template/guide/directives/x-model" },
                        { text: "x-switch", link: "/zh/template/guide/directives/x-switch" },
                        { text: "x-table", link: "/zh/template/guide/directives/x-table" },
                        { text: "x-teleport", link: "/zh/template/guide/directives/x-teleport" },
                        {
                            text: "x-transition",
                            link: "/zh/template/guide/directives/x-transition",
                        },
                    ],
                },
            ],
        },
        socialLinks: [{ icon: "github", link: "https://github.com/zhangfisher/autostore/" }],
    },
    vue: {
        template: {
            compilerOptions: {
                whitespace: "preserve",
            },
        },
    },
    markdown: {
        config(md) {
            md.use(vitepressDemoPlugin, {
                demoDir: path.resolve(__dirname, "../../demos"),
                stackblitz: {
                    show: true,
                },
                codesandbox: {
                    show: true,
                },
            });
        },
        // 版本兼容性问题：@shikijs/vitepress-twoslash v4.0.1 与 VitePress 内置 shiki v2.5.0 类型不匹配
        codeTransformers: [
            transformerTwoslash({
                throws: false,
                errorRendering: "hover",
                explicitTrigger: true,
                twoslashOptions: {
                    compilerOptions: {
                        ignoreDeprecations: "6.0",
                    },
                },
            }),
        ] as any,
        // @ts-ignore
        languages: ["js", "jsx", "ts", "tsx"],
    },
    // @ts-ignore
    build: {
        chunkSizeWarningLimit: 10000000,
        rollupOptions: {
            output: {
                manualChunks: {
                    // 将较大的依赖项分组到单独的块中
                    vendor: ["vue", "vue-router"],
                    shiki: ["shiki", "@shikijs/vitepress-twoslash"],
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
