import { defineConfig } from 'dumi';

export default defineConfig({
  base:"/autostore/",
  publicPath:"/autostore/",
  outputPath: 'dist',
  favicons:[
    "/autostore/logo.png"
  ],
  // mako:{ },
  themeConfig: {
    name: 'AutoStore',
    logo:"/autostore/logo.png",
    lastUpdated: true,
    socialLinks: {
      github: 'https://github.com/zhangfisher/autostore',
      // @ts-ignore
      // gitee:'https://gitee.com/zhangfisher/autostore'
    },
    footer:
      'Made with<span style="color: rgb(255, 255, 255);">❤</span>by <span>ZhangFisher | Copyright © 2024-present</span>',
    localesEnhance: [
      { id: 'zh-CN', switchPrefix: '中' },
      { id: 'en-US', switchPrefix: 'en' }
    ],
    title: 'AutoStore',
    description: {
      'zh-CN': '极致优雅的全自动状态管理库',
      'en-US': 'An Extremely Elegant Fully Automatic State Management Library'
    },
  },
});
