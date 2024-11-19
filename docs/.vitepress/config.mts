import path from 'path';
import { defineConfig } from 'vitepress'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
// import { codeInspectorPlugin } from 'code-inspector-plugin';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AutoStore",
  description: "极致优雅的全自动React状态库",
  base: '/autostore/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: {
      label: "目录",
      level: [2, 5]
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' }, 
      { text: '开源推荐', link: 'https://zhangfisher.github.io/repos/' },
    ],
    sidebar: {
      "/guide/":[
        {
          text: '关于',          
          collapsed: false,
          items: [
            { text: '安装', link: '/guide/intro/install' },
            { text: '快速入门', link: '/guide/intro/get-started' },
            { text: '更新历史', link: '/guide/intro/history' },
            { text: '示例', link: '/guide/intro/examples' },
            { text: '常见问题', link: '/guide/intro/question' },
          ]
        },
        {
          text: '指南',
          items: [
            {
              text: 'Store',
              collapsed: true,
              items: [
                { text: '关于', link: '/guide/store/about' },
                { text: 'Store', link: '/guide/store/store' },
                { text: 'State', link: '/guide/store/state' },
                { text: '渲染优化', link: '/guide/store/render' },
                { text: '事件', link: '/guide/store/events' },
                { text: '批量更新', link: '/guide/store/batchUpdate' },
                
              ]
            },
            {
              text: '计算属性',
              collapsed: true,
              items: [
                { text: '关于', link: '/guide/computed/about' },
                { text: '创建', link: '/guide/computed/create' },
                { text: '计算函数', link: '/guide/computed/getter' },
                { text: '依赖收集', link: '/guide/computed/deps' },
                { text: '作用域', link: '/guide/computed/scope' },
                { text: '同步计算', link: '/guide/computed/sync' },
                { text: '异步计算', link: '/guide/computed/async' },
                { text: '计算选项', link: '/guide/computed/options' },
                { text: '计算对象', link: '/guide/computed/objects' },
                { text: '手动执行', link: '/guide/computed/run' }
              ]
            },
            {
              text: '监视',
              collapsed: true,
              items: [
                { text: '关于', link: '/guide/watch/about' },
                { text: '全局监视', link: '/guide/watch/store-watch' },
                { text: '状态内监视', link: '/guide/watch/watch' },
                { text: 'useWatch', link: '/guide/watch/use-watch' },
                { text: '监视对象', link: '/guide/watch/objects' }
              ]
            },
            {
              text: '信号',
              collapsed: true,
              items: [
                { text: '关于', link: '/guide/signal/about' },
                { text: '信号组件', link: '/guide/signal/component' },
                { text: '状态信号组件', link: '/guide/signal/state-render' },
                { text: '自定义渲染', link: '/guide/signal/custom-render' },
                { text: '计算信号组件', link: '/guide/signal/computed-render' },
                { text: '监听信号组件', link: '/guide/signal/watch' },
                { text: '错误处理', link: '/guide/signal/error-boundary' }
              ]
            },
            {
              text: '表单绑定',
              collapsed: true,
              items: [
                { text: '关于', link: '/guide/form/about' },
                { text:"快速入门",link:"/guide/form/get-started"},              
                { 
                  text: '表单', 
                  collapsed: true,
                  items:[
                    { text:"创建",link:"/guide/form/form/create"},                      
                    { text:"useForm",link:"/guide/form/form/use-form"},                                      
                    { text:"提交表单",link:"/guide/form/form/submit"},                     
                  ]
                },
                { text:"字段",
                  collapsed:false,
                  items:[
                      { text: '关于', link: '/guide/form/field/about' },
                      { text: '简单字段', link: '/guide/form/field/simple-field' },
                      { text: 'useField', link: '/guide/form/field/use-field' },
                      { text: 'useFields', link: '/guide/form/field/use-fields' },
                      { text:"字段拆分",link:"/guide/form/field/split-field"}, 
                      { text:"字段组件",link:"/guide/form/field/field-component"}
                  ]
                },  
                { 
                  text:"表单校验",
                  collapsed:false,
                  link:"/guide/form/validate"
                }, 
                { 
                  text:"脏检查",
                  link:"/guide/form/dirty"
                } 
              ]
            },
            {
              text: '调试与诊断',
              collapsed: true,
              items: [
                { text: 'DevTools', link: '/guide/debug/devtools' },
                { text: 'trace', link: '/guide/debug/trace' },
                { text: '依赖收集', link: '/guide/debug/collectDeps' },
                { text: '日志', link: '/guide/debug/log' },
                { text: '循环依赖', link: '/guide/debug/circular-dependency' },
              ]
            }
          ]
        }
      ]
    }, 
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhangfisher/autostore/' }
    ]
  },
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin, {
        demoDir: path.resolve(__dirname, '../demos'),
        stackblitz: {
          show: true,
        },
        codesandbox: {
          show: true,
        },
      });
    },
    codeTransformers: [
      transformerTwoslash() 
    ]
  },
  vue: {
    template: {
      compilerOptions: {
        whitespace: 'preserve'
      }
    }
  },
  // vite:{
  //   plugins: [codeInspectorPlugin({ bundler: 'vite'})]
  // }
})
