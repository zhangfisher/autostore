export default {
    nav: [
        { text: 'Home', link: '/en/' },
        { text: 'Guide', link: '/en/guide/' }, 
        { text: 'Open source', link: 'https://zhangfisher.github.io/repos/' },
    ],
    sidebar: {
        "/en/guide/":[
          {
            text: 'About',          
            collapsed: false,
            items: [
              { text: 'Install', link: '/en/guide/intro/install' },
              { text: 'Get started', link: '/en/guide/intro/get-started' },
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
                  { text: 'BatchUpdate', link: '/en/guide/store/batchUpdate' },
                  
                ]
              },
              {
                text: 'Computed',
                collapsed: true,
                items: [
                  { text: 'About', link: '/en/guide/computed/about' },
                  { text: 'Create', link: '/en/guide/computed/create' },
                  { text: 'Getter', link: '/en/guide/computed/getter' },
                  { text: 'Dependencies', link: '/en/guide/computed/deps' },
                  { text: 'Scope', link: '/en/guide/computed/scope' },
                  { text: 'Synchronous', link: '/en/guide/computed/sync' },
                  { text: 'Asynchronous', link: '/en/guide/computed/async' },
                  { text: 'Options', link: '/en/guide/computed/options' },
                  { text: 'ComputedObject', link: '/en/guide/computed/objects' },
                  { text: 'Run', link: '/en/guide/computed/run' }
                ]
              },
              {
                text: 'Watch',
                collapsed: true,
                items: [
                  { text: 'About', link: '/en/guide/watch/about' },
                  { text: 'Global Watch', link: '/en/guide/watch/store-watch' },
                  { text: 'InState Watch', link: '/en/guide/watch/watch' },
                  { text: 'useWatch', link: '/en/guide/watch/use-watch' },
                  { text: 'WatchObject', link: '/en/guide/watch/objects' }
                ]
              },
              {
                text: 'Signal',
                collapsed: true,
                items: [
                  { text: 'About', link: '/en/guide/signal/about' },
                  { text: 'Component', link: '/en/guide/signal/component' },
                  { text: 'State Signal', link: '/en/guide/signal/state-render' },
                  { text: 'Custom Signal', link: '/en/guide/signal/custom-render' },
                  { text: 'Computed Signal', link: '/en/guide/signal/computed-render' },
                  { text: 'Watch Signal', link: '/en/guide/signal/watch' },
                  { text: 'Error Boundary', link: '/en/guide/signal/error-boundary' }
                ]
              },
              {
                text: 'Form Binding',
                collapsed: true,
                items: [
                  { text: 'About', link: '/en/guide/form/about' },
                  { text:"Get started",link:"/en/guide/form/get-started"},              
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
                        { text: 'Simple', link: '/en/guide/form/field/simple-field' },
                        { text: 'useField', link: '/en/guide/form/field/use-field' },
                        { text: 'useFields', link: '/en/guide/form/field/use-fields' },
                        { text:"Split",link:"/en/guide/form/field/split-field"}, 
                        { text:"Field",link:"/en/guide/form/field/field-component"}
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
                  { text: 'DevTools', link: '/en/guide/debug/devtools' },
                  { text: 'trace', link: '/en/guide/debug/trace' },
                  { text: 'collectDeps', link: '/en/guide/debug/collectDeps' },
                  { text: 'Log', link: '/en/guide/debug/log' },
                  { text: 'Circular-dependency', link: '/en/guide/debug/circular-dependency' },
                ]
              }
            ]
          }
        ]
    }, 
}