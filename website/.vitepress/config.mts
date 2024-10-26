import path from 'path';
import { defineConfig } from 'vitepress'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin'; 

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AutoStore",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
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
