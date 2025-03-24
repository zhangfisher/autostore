 
// https://vitepress.dev/reference/site-config
export default { 
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: {
      label: "TOC",
      level: [2, 5]
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/en/' },
      { text: 'Guide', link: '/en/guide/' }, 
      { text: 'Open Source', link: 'https://zhangfisher.github.io/repos/' },
    ],
    sidebar: {
      "/en/guide/":[
        {
          text: 'About',          
          collapsed: false,
          items: [
            { text: 'Install', link: '/en/guide/intro/install' },
            { text: 'Get Started', link: '/en/guide/intro/get-started' },
            { text: 'History', link: '/en/guide/intro/history' },
            { text: 'Examples', link: '/en/guide/intro/examples' },
            { text: 'Question', link: '/en/guide/intro/question' },
          ]
        },
        {
          text: 'Guide',
          items: [
            {
              text: 'Store',
              collapsed: true,
              items: [
                { text: 'About', link: '/en/guide/store/about' },
                { text: 'Store', link: '/en/guide/store/store' },
                { text: 'State', link: '/en/guide/store/state' },
                { text: 'Render', link: '/en/guide/store/render' },
                { text: 'Events', link: '/en/guide/store/events' },
                { text: 'Batch Update', link: '/en/guide/store/batchUpdate' },
                { text: 'Validate', link: '/en/guide/store/validate' },                
              ]
            },
            {
              text: 'Computed',
              collapsed: true,
              items: [
                { text: 'About', link: '/en/guide/computed/about' },
                { text: 'Create', link: '/en/guide/computed/create' },
                { text: 'Getter', link: '/en/guide/computed/getter' },
                { text: 'Deps', link: '/en/guide/computed/deps' },
                { text: 'Scope', link: '/en/guide/computed/scope' },
                { text: 'Sync computed', link: '/en/guide/computed/sync' },
                { text: 'Async computed', link: '/en/guide/computed/async' },
                { text: 'Computed Options', link: '/en/guide/computed/options' },
                { text: 'ComputedObject', link: '/en/guide/computed/objects' },
                { text: 'Run', link: '/en/guide/computed/run' }
              ]
            },
            {
              text: 'Watch',
              collapsed: true,
              items: [
                { text: 'About', link: '/en/guide/watch/about' },
                { text: 'Global watch', link: '/en/guide/watch/store-watch' },
                { text: 'State watch', link: '/en/guide/watch/watch' },
                { text: 'useWatch', link: '/en/guide/watch/use-watch' },
                { text: 'WatchObject', link: '/en/guide/watch/objects' }
              ]
            },
            {
              text: 'Signal',
              collapsed: true,
              items: [
                { text: 'About', link: '/en/guide/signal/about' },
                { text: 'Signal Component', link: '/en/guide/signal/component' },
                { text: 'State Render', link: '/en/guide/signal/state-render' },
                { text: 'Custom Render', link: '/en/guide/signal/custom-render' },
                { text: 'Computed Render', link: '/en/guide/signal/computed-render' },
                { text: 'Watch Compoment', link: '/en/guide/signal/watch' },
                { text: 'Error Boundary', link: '/en/guide/signal/error-boundary' }
              ]
            },
            {
              text: 'Form',
              collapsed: true,
              items: [
                { text: 'About', link: '/en/guide/form/about' },
                { text:"Get Started",link:"/en/guide/form/get-started"},              
                { 
                  text: 'Form', 
                  collapsed: true,
                  items:[
                    { text:"Create",link:"/en/guide/form/form/create"},                      
                    { text:"useForm",link:"/en/guide/form/form/use-form"},                                      
                    { text:"Submit",link:"/en/guide/form/form/submit"},                     
                  ]
                },
                { text:"Field",
                  collapsed:false,
                  items:[
                      { text: 'About', link: '/en/guide/form/field/about' },
                      { text: 'Simple Field', link: '/en/guide/form/field/simple-field' },
                      { text: 'useField', link: '/en/guide/form/field/use-field' },
                      { text: 'useFields', link: '/en/guide/form/field/use-fields' },
                      { text:"Split Field",link:"/en/guide/form/field/split-field"}, 
                      { text:"Field Component",link:"/en/guide/form/field/field-component"}
                  ]
                },  
                { 
                  text:"Validate",
                  collapsed:false,
                  link:"/en/guide/form/validate"
                }, 
                { 
                  text:"Dirty",
                  link:"/en/guide/form/dirty"
                } 
              ]
            },
            {
              text: 'Debug',
              collapsed: true,
              items: [
                { text: 'DevTools', link: '/en/guide/debug/devTools' },
                { text: 'trace', link: '/en/guide/debug/trace' },
                { text: 'Collect Deps', link: '/en/guide/debug/collectDeps' },
                { text: 'Log', link: '/en/guide/debug/log' },
                { text: 'Circular Dependency', link: '/en/guide/debug/circular-dependency' },
              ]
            }
          ]
        }
      ]
    }, 
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhangfisher/autostore/' }
    ]
  }
}