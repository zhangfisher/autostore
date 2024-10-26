import path from 'path';
import { defineConfig } from 'vitepress'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin'; 

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AutoStore",
  description: "极致优雅的全自动React状态库",
  base: '/autostore/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline:{
      label:"目录",  
      level:[2,5]
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' }, 
      { text: '指南', link: '/guide/' }, 
    ],
    sidebar: [ 
      { text: '关于',
        items:[
          { text: '安装', link: '/intro/install' },
          { text: '快速入门', link: '/intro/get-started' },
          { text: '更新历史', link: '/intro/history' },
          { text: '常见问题', link: '/intro/question' },
        ]
      },      
      { 
        text: '指南',
        items:[
          { 
            text: 'Store', 
            link: '/guide/store',
            items:[
              { text: '关于', link: '/guide/store/about' },
              { text: '创建', link: '/guide/store/create' },              
            ]
          }, 
          {
            text: '计算属性',
            link: '/guide/computed',
            items:[
              { text: '关于', link: '/guide/computed/about' },
              { text: '创建', link: '/guide/computed/create' },
              { text: '计算函数', link: '/guide/computed/getter' },
              { text: '依赖收集', link: '/guide/computed/deps' },
              { text: '作用域', link: '/guide/computed/scope'},
              { text: '同步计算', link: '/guide/computed/sync'},
              { text: '异步计算', link: '/guide/computed/async'},
              { text: '计算选项', link: '/guide/computed/options'},
              { text: '计算对象', link: '/guide/computed/objects' },
              { text: '手动执行', link: '/guide/computed/run'}
            ]
          },
          {
            text: '监视',
            link: '/guide/watch',
            items:[
            ]
          },
          {
            text: '信号',
            link: '/guide/signal/',
            items:[
            ]
          },
          {
            text: '表单',
            link: '/guide/form',
            items:[
            ]
          }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhangfisher/autostore/' }
    ]
  },
  markdown: { 
    config(md) { 
      md.use(vitepressDemoPlugin,{
        demoDir: path.resolve(__dirname, '../demos'), 
        stackblitz: { 
          show: true, 
        }, 
        codesandbox: { 
          show: true, 
        }, 
      }); 
    }, 
  },
})
