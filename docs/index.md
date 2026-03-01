---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
    name: "AutoStore"
    text: "响应式数据管理"
    tagline: 自动依赖收集/异步计算/信号组件/表单
    actions:
        - theme: brand
          text: 开始
          link: /zh/store/
        - theme: alt
          text: Github
          link: https://github.com/zhangfisher/autostore

features:
    - title: 💎计算属性
      details: 独有的移花接木式的创建同步/异步计算属性
    - title: 🔥异步计算
      details: 无以伦比的异步计算能力，支持超时、重试、取消、倒计时、进度等高级特性
    - title: 🏃嵌套状态
      details: 支持任意深度的嵌套状态，无需担心状态管理的复杂性
    - title: ☂️循环依赖
      details: 能检测循环依赖减少故障
    - title: 🎧状态监听
      details: 全方位状态变更监听能力，支持对象和数组的get/set/delete/insert等操作监听
    - title: 🚀信号组件
      details: 引入signal为React提供细粒度更新
    - title: 🖐️表单双向绑定
      details: 强大而简洁的双向表单绑定，数据收集简单快速
    - title: 🎯原地计算属性
      details: 直接在状态树中声明computed属性，计算结果原地写入
    - title: ⛏️调试工具
      details: 支持trace方法和devTools工具，方便调试
---
