// .vitepress/config/index.ts
import path from "path";
import { defineConfig } from "file:///E:/Work/Code/autostore/node_modules/.bun/vitepress@1.6.4+4c526a0bbe0c3abf/node_modules/vitepress/dist/node/index.js";
import { vitepressDemoPlugin } from "file:///E:/Work/Code/autostore/node_modules/.bun/vitepress-demo-plugin@1.5.1+c0927b011486ef1b/node_modules/vitepress-demo-plugin/dist/index.js";
import { transformerTwoslash } from "file:///E:/Work/Code/autostore/node_modules/.bun/@shikijs+vitepress-twoslash@4.0.2+7524df1edfed9f02/node_modules/@shikijs/vitepress-twoslash/dist/index.mjs";
var __vite_injected_original_dirname = "E:\\Work\\Code\\autostore\\docs\\.vitepress\\config";
var config_default = defineConfig({
  base: "/autostore/",
  title: "AutoStore",
  description: "\u54CD\u5E94\u5F0F\u6570\u636E\u7BA1\u7406\u5E93",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: {
      label: "\u76EE\u5F55",
      level: [2, 5]
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "\u9996\u9875", link: "/" },
      { text: "\u6838\u5FC3\u5E93", link: "/zh/store/" },
      { text: "\u540C\u6B65", link: "/zh/sync/" },
      { text: "React", link: "/zh/react/" },
      { text: "\u6A21\u677F", link: "/zh/template/" },
      { text: "\u5F00\u6E90\u63A8\u8350", link: "https://zhangfisher.github.io/repos/" }
    ],
    sidebar: {
      "/zh/store/": [
        {
          text: "\u5173\u4E8E",
          items: [
            { text: "\u6982\u5FF5", link: "/zh/store/guide/store/about" },
            { text: "\u5B89\u88C5", link: "/zh/store/guide/install" }
          ]
        },
        {
          text: "\u6307\u5357",
          items: [
            { text: "\u521B\u5EFA", link: "/zh/store/guide/store/create" },
            { text: "\u72B6\u6001\u66F4\u65B0", link: "/zh/store/guide/store/read-write" },
            { text: "\u4E8B\u4EF6", link: "/zh/store/guide/store/events" },
            { text: "\u6279\u91CF\u66F4\u65B0", link: "/zh/store/guide/store/batchUpdate" },
            {
              text: "\u8BA1\u7B97\u5C5E\u6027",
              collapsed: true,
              items: [
                { text: "\u5173\u4E8E", link: "/zh/store/guide/computed/about" },
                { text: "\u521B\u5EFA", link: "/zh/store/guide/computed/create" },
                { text: "\u8BA1\u7B97\u51FD\u6570", link: "/zh/store/guide/computed/getter" },
                { text: "\u4F9D\u8D56\u6536\u96C6", link: "/zh/store/guide/computed/deps" },
                { text: "\u4F5C\u7528\u57DF", link: "/zh/store/guide/computed/scope" },
                { text: "\u540C\u6B65\u8BA1\u7B97", link: "/zh/store/guide/computed/sync" },
                { text: "\u5F02\u6B65\u8BA1\u7B97", link: "/zh/store/guide/computed/async" },
                { text: "\u8BA1\u7B97\u9009\u9879", link: "/zh/store/guide/computed/options" },
                { text: "\u8BA1\u7B97\u5BF9\u8C61", link: "/zh/store/guide/computed/objects" },
                { text: "\u624B\u52A8\u6267\u884C", link: "/zh/store/guide/computed/run" }
              ]
            },
            {
              text: "\u76D1\u89C6",
              collapsed: true,
              items: [
                { text: "\u5173\u4E8E", link: "/zh/store/guide/watch/about" },
                { text: "\u5168\u5C40\u76D1\u89C6", link: "/zh/store/guide/watch/store-watch" },
                { text: "\u72B6\u6001\u5185\u76D1\u89C6", link: "/zh/store/guide/watch/watch" },
                { text: "useWatch", link: "/zh/store/guide/watch/use-watch" },
                { text: "\u76D1\u89C6\u5BF9\u8C61", link: "/zh/store/guide/watch/objects" }
              ]
            },
            { text: "\u6570\u636E\u6821\u9A8C", link: "/zh/store/guide/store/validate" },
            { text: "Shadow", link: "/zh/store/guide/store/shadow" },
            { text: "RefStore", link: "/zh/store/guide/store/refStore" },
            { text: "\u914D\u7F6E\u7CFB\u7EDF", link: "/zh/store/guide/store/config" },
            { text: "\u9009\u9879", link: "/zh/store/guide/store/options" },
            { text: "Typescript", link: "/zh/store/guide/store/typescript" }
          ]
        }
      ],
      "/zh/react/": [
        {
          text: "\u5173\u4E8E",
          collapsed: false,
          items: [
            { text: "\u5B89\u88C5", link: "/zh/react/intro/install" },
            { text: "\u5FEB\u901F\u5165\u95E8", link: "/zh/react/intro/get-started" },
            { text: "\u793A\u4F8B", link: "/zh/react/intro/examples" },
            { text: "\u5E38\u89C1\u95EE\u9898", link: "/zh/react/intro/question" }
          ]
        },
        {
          text: "\u6307\u5357",
          items: [
            {
              text: "Store",
              collapsed: true,
              items: [
                { text: "\u5173\u4E8E", link: "/zh/react/store/about" },
                { text: "Store", link: "/zh/react/store/store" },
                { text: "State", link: "/zh/react/store/state" },
                { text: "\u6E32\u67D3\u4F18\u5316", link: "/zh/react/store/render" },
                { text: "\u4E8B\u4EF6", link: "/zh/react/store/events" },
                { text: "\u6279\u91CF\u66F4\u65B0", link: "/zh/react/store/batchUpdate" }
              ]
            },
            {
              text: "\u8BA1\u7B97\u5C5E\u6027",
              collapsed: true,
              items: [
                { text: "\u5173\u4E8E", link: "/zh/react/computed/about" },
                { text: "\u521B\u5EFA", link: "/zh/react/computed/create" },
                { text: "\u8BA1\u7B97\u51FD\u6570", link: "/zh/react/computed/getter" },
                { text: "\u4F9D\u8D56\u6536\u96C6", link: "/zh/react/computed/deps" },
                { text: "\u4F5C\u7528\u57DF", link: "/zh/react/computed/scope" },
                { text: "\u540C\u6B65\u8BA1\u7B97", link: "/zh/react/computed/sync" },
                { text: "\u5F02\u6B65\u8BA1\u7B97", link: "/zh/react/computed/async" },
                { text: "\u8BA1\u7B97\u9009\u9879", link: "/zh/react/computed/options" },
                { text: "\u8BA1\u7B97\u5BF9\u8C61", link: "/zh/react/computed/objects" },
                { text: "\u624B\u52A8\u6267\u884C", link: "/zh/react/computed/run" }
              ]
            },
            {
              text: "\u76D1\u89C6",
              collapsed: true,
              items: [
                { text: "\u5173\u4E8E", link: "/zh/react/watch/about" },
                { text: "\u5168\u5C40\u76D1\u89C6", link: "/zh/react/watch/store-watch" },
                { text: "\u72B6\u6001\u5185\u76D1\u89C6", link: "/zh/react/watch/watch" },
                { text: "useWatch", link: "/zh/react/watch/use-watch" },
                { text: "\u76D1\u89C6\u5BF9\u8C61", link: "/zh/react/watch/objects" }
              ]
            },
            {
              text: "\u4FE1\u53F7",
              collapsed: true,
              items: [
                { text: "\u5173\u4E8E", link: "/zh/react/signal/about" },
                { text: "\u4FE1\u53F7\u7EC4\u4EF6", link: "/zh/react/signal/component" },
                { text: "\u72B6\u6001\u4FE1\u53F7\u7EC4\u4EF6", link: "/zh/react/signal/state-render" },
                { text: "\u81EA\u5B9A\u4E49\u6E32\u67D3", link: "/zh/react/signal/custom-render" },
                { text: "\u8BA1\u7B97\u4FE1\u53F7\u7EC4\u4EF6", link: "/zh/react/signal/computed-render" },
                { text: "\u76D1\u542C\u4FE1\u53F7\u7EC4\u4EF6", link: "/zh/react/signal/watch" },
                { text: "\u9519\u8BEF\u5904\u7406", link: "/zh/react/signal/error-boundary" }
              ]
            },
            {
              text: "\u8868\u5355\u7ED1\u5B9A",
              collapsed: true,
              items: [
                { text: "\u5173\u4E8E", link: "/zh/react/form/about" },
                { text: "\u5FEB\u901F\u5165\u95E8", link: "/zh/react/form/get-started" },
                {
                  text: "\u8868\u5355",
                  collapsed: true,
                  items: [
                    { text: "\u521B\u5EFA", link: "/zh/react/form/form/create" },
                    { text: "useForm", link: "/zh/react/form/form/use-form" },
                    { text: "\u63D0\u4EA4\u8868\u5355", link: "/zh/react/form/form/submit" }
                  ]
                },
                {
                  text: "\u5B57\u6BB5",
                  collapsed: false,
                  items: [
                    { text: "\u5173\u4E8E", link: "/zh/react/form/field/about" },
                    {
                      text: "useField",
                      link: "/zh/react/form/field/use-field"
                    },
                    {
                      text: "useFields",
                      link: "/zh/react/form/field/use-fields"
                    },
                    {
                      text: "\u5B57\u6BB5\u62C6\u5206",
                      link: "/zh/react/form/field/split-field"
                    },
                    {
                      text: "\u5B57\u6BB5\u7EC4\u4EF6",
                      link: "/zh/react/form/field/field-component"
                    }
                  ]
                },
                {
                  text: "\u8868\u5355\u6821\u9A8C",
                  collapsed: false,
                  link: "/zh/react/form/validate"
                },
                {
                  text: "\u810F\u68C0\u67E5",
                  link: "/zh/react/form/dirty"
                }
              ]
            },
            {
              text: "\u8C03\u8BD5\u4E0E\u8BCA\u65AD",
              collapsed: true,
              items: [
                { text: "DevTools", link: "/zh/react/debug/devTools" },
                { text: "trace", link: "/zh/react/debug/trace" },
                { text: "\u4F9D\u8D56\u6536\u96C6", link: "/zh/react/debug/collectDeps" },
                { text: "\u65E5\u5FD7", link: "/zh/react/debug/log" },
                { text: "\u5FAA\u73AF\u4F9D\u8D56", link: "/zh/react/debug/circular-dependency" }
              ]
            }
          ]
        }
      ],
      "/zh/sync/": [
        {
          text: "\u5173\u4E8E",
          items: [
            { text: "\u5B89\u88C5", link: "/zh/sync/guide/install" },
            { text: "\u5FEB\u901F\u5165\u95E8", link: "/zh/sync/guide/get-starts" }
          ]
        },
        {
          text: "\u6307\u5357",
          items: [
            {
              text: "Syncer",
              link: "/zh/sync/guide/syncers/syncer"
            },
            {
              text: "Clone",
              link: "/zh/sync/guide/syncers/clone"
            },
            {
              text: "WorkerSyncer",
              link: "/zh/sync/guide/syncers/worker-syncer"
            },
            {
              text: "BroadcastSyncer",
              link: "/zh/sync/guide/syncers/broadcast-syncer"
            },
            {
              text: "broadcastChannelSyncer",
              link: "/zh/sync/guide/syncers/broadcast-channel-syncer"
            },
            {
              text: "SwitchSyncer",
              link: "/zh/sync/guide/syncers/switch-syncer"
            }
          ]
        }
      ],
      "/zh/template/": [
        {
          text: "\u5173\u4E8E",
          link: "/zh/template/index",
          items: [
            { text: "\u5B89\u88C5", link: "/zh/template/intro/install" },
            { text: "\u540D\u8BCD\u89E3\u91CA", link: "/zh/template/intro/glossary" },
            { text: "\u5FEB\u901F\u5165\u95E8", link: "/zh/template/intro/get-started" },
            { text: "\u7279\u5F81\u548C\u4F18\u52BF", link: "/zh/template/intro/features" },
            { text: "\u5E38\u89C1\u95EE\u9898", link: "/zh/template/intro/question" }
          ]
        },
        {
          text: "\u6307\u5357",
          items: [
            { text: "\u521D\u59CB\u5316", link: "/zh/template/guide/initial" },
            { text: "\u54CD\u5E94\u5F0F", link: "/zh/template/guide/reactive" },
            { text: "\u52A8\u4F5C", link: "/zh/template/guide/action" },
            { text: "\u6307\u4EE4\u7C7B\u578B", link: "/zh/template/guide/directive" },
            { text: "\u6307\u4EE4\u914D\u7F6E", link: "/zh/template/guide/config" },
            { text: "\u52A8\u6001\u6A21\u677F", link: "/zh/template/guide/patch" },
            { text: "\u7EC4\u4EF6", link: "/zh/template/guide/component" }
          ]
        },
        {
          text: "\u6307\u4EE4",
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
              link: "/zh/template/guide/directives/x-transition"
            }
          ]
        }
      ]
    },
    socialLinks: [{ icon: "github", link: "https://github.com/zhangfisher/autostore/" }]
  },
  vue: {
    template: {
      compilerOptions: {
        whitespace: "preserve"
      }
    }
  },
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin, {
        demoDir: path.resolve(__vite_injected_original_dirname, "../../demos"),
        stackblitz: {
          show: true
        },
        codesandbox: {
          show: true
        }
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
            ignoreDeprecations: "6.0"
          }
        }
      })
    ],
    // @ts-ignore
    languages: ["js", "jsx", "ts", "tsx"]
  },
  // @ts-ignore
  build: {
    chunkSizeWarningLimit: 1e7,
    rollupOptions: {
      output: {
        manualChunks: {
          // 将较大的依赖项分组到单独的块中
          vendor: ["vue", "vue-router"],
          shiki: ["shiki", "@shikijs/vitepress-twoslash"]
        }
      }
    }
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 2e3
      // 将限制提高到 1000KB
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcvaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxXb3JrXFxcXENvZGVcXFxcYXV0b3N0b3JlXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFdvcmtcXFxcQ29kZVxcXFxhdXRvc3RvcmVcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxpbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovV29yay9Db2RlL2F1dG9zdG9yZS9kb2NzLy52aXRlcHJlc3MvY29uZmlnL2luZGV4LnRzXCI7aW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVwcmVzc1wiO1xyXG5pbXBvcnQgeyB2aXRlcHJlc3NEZW1vUGx1Z2luIH0gZnJvbSBcInZpdGVwcmVzcy1kZW1vLXBsdWdpblwiO1xyXG5pbXBvcnQgeyB0cmFuc2Zvcm1lclR3b3NsYXNoIH0gZnJvbSBcIkBzaGlraWpzL3ZpdGVwcmVzcy10d29zbGFzaFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIGJhc2U6IFwiL2F1dG9zdG9yZS9cIixcclxuICAgIHRpdGxlOiBcIkF1dG9TdG9yZVwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiXHU1NENEXHU1RTk0XHU1RjBGXHU2NTcwXHU2MzZFXHU3QkExXHU3NDA2XHU1RTkzXCIsXHJcbiAgICB0aGVtZUNvbmZpZzoge1xyXG4gICAgICAgIC8vIGh0dHBzOi8vdml0ZXByZXNzLmRldi9yZWZlcmVuY2UvZGVmYXVsdC10aGVtZS1jb25maWdcclxuICAgICAgICBvdXRsaW5lOiB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcIlx1NzZFRVx1NUY1NVwiLFxyXG4gICAgICAgICAgICBsZXZlbDogWzIsIDVdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gaHR0cHM6Ly92aXRlcHJlc3MuZGV2L3JlZmVyZW5jZS9kZWZhdWx0LXRoZW1lLWNvbmZpZ1xyXG4gICAgICAgIG5hdjogW1xyXG4gICAgICAgICAgICB7IHRleHQ6IFwiXHU5OTk2XHU5ODc1XCIsIGxpbms6IFwiL1wiIH0sXHJcbiAgICAgICAgICAgIHsgdGV4dDogXCJcdTY4MzhcdTVGQzNcdTVFOTNcIiwgbGluazogXCIvemgvc3RvcmUvXCIgfSxcclxuICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NTQwQ1x1NkI2NVwiLCBsaW5rOiBcIi96aC9zeW5jL1wiIH0sXHJcbiAgICAgICAgICAgIHsgdGV4dDogXCJSZWFjdFwiLCBsaW5rOiBcIi96aC9yZWFjdC9cIiB9LFxyXG4gICAgICAgICAgICB7IHRleHQ6IFwiXHU2QTIxXHU2NzdGXCIsIGxpbms6IFwiL3poL3RlbXBsYXRlL1wiIH0sXHJcbiAgICAgICAgICAgIHsgdGV4dDogXCJcdTVGMDBcdTZFOTBcdTYzQThcdTgzNTBcIiwgbGluazogXCJodHRwczovL3poYW5nZmlzaGVyLmdpdGh1Yi5pby9yZXBvcy9cIiB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc2lkZWJhcjoge1xyXG4gICAgICAgICAgICBcIi96aC9zdG9yZS9cIjogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXHU1MTczXHU0RThFXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1Njk4Mlx1NUZGNVwiLCBsaW5rOiBcIi96aC9zdG9yZS9ndWlkZS9zdG9yZS9hYm91dFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJcdTVCODlcdTg4QzVcIiwgbGluazogXCIvemgvc3RvcmUvZ3VpZGUvaW5zdGFsbFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcdTYzMDdcdTUzNTdcIixcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU1MjFCXHU1RUZBXCIsIGxpbms6IFwiL3poL3N0b3JlL2d1aWRlL3N0b3JlL2NyZWF0ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJcdTcyQjZcdTYwMDFcdTY2RjRcdTY1QjBcIiwgbGluazogXCIvemgvc3RvcmUvZ3VpZGUvc3RvcmUvcmVhZC13cml0ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJcdTRFOEJcdTRFRjZcIiwgbGluazogXCIvemgvc3RvcmUvZ3VpZGUvc3RvcmUvZXZlbnRzXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NjI3OVx1OTFDRlx1NjZGNFx1NjVCMFwiLCBsaW5rOiBcIi96aC9zdG9yZS9ndWlkZS9zdG9yZS9iYXRjaFVwZGF0ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXHU4QkExXHU3Qjk3XHU1QzVFXHU2MDI3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJcdTUxNzNcdTRFOEVcIiwgbGluazogXCIvemgvc3RvcmUvZ3VpZGUvY29tcHV0ZWQvYWJvdXRcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJcdTUyMUJcdTVFRkFcIiwgbGluazogXCIvemgvc3RvcmUvZ3VpZGUvY29tcHV0ZWQvY3JlYXRlXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU4QkExXHU3Qjk3XHU1MUZEXHU2NTcwXCIsIGxpbms6IFwiL3poL3N0b3JlL2d1aWRlL2NvbXB1dGVkL2dldHRlclwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NEY5RFx1OEQ1Nlx1NjUzNlx1OTZDNlwiLCBsaW5rOiBcIi96aC9zdG9yZS9ndWlkZS9jb21wdXRlZC9kZXBzXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU0RjVDXHU3NTI4XHU1N0RGXCIsIGxpbms6IFwiL3poL3N0b3JlL2d1aWRlL2NvbXB1dGVkL3Njb3BlXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU1NDBDXHU2QjY1XHU4QkExXHU3Qjk3XCIsIGxpbms6IFwiL3poL3N0b3JlL2d1aWRlL2NvbXB1dGVkL3N5bmNcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJcdTVGMDJcdTZCNjVcdThCQTFcdTdCOTdcIiwgbGluazogXCIvemgvc3RvcmUvZ3VpZGUvY29tcHV0ZWQvYXN5bmNcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJcdThCQTFcdTdCOTdcdTkwMDlcdTk4NzlcIiwgbGluazogXCIvemgvc3RvcmUvZ3VpZGUvY29tcHV0ZWQvb3B0aW9uc1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1OEJBMVx1N0I5N1x1NUJGOVx1OEM2MVwiLCBsaW5rOiBcIi96aC9zdG9yZS9ndWlkZS9jb21wdXRlZC9vYmplY3RzXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU2MjRCXHU1MkE4XHU2MjY3XHU4ODRDXCIsIGxpbms6IFwiL3poL3N0b3JlL2d1aWRlL2NvbXB1dGVkL3J1blwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1NzZEMVx1ODlDNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU1MTczXHU0RThFXCIsIGxpbms6IFwiL3poL3N0b3JlL2d1aWRlL3dhdGNoL2Fib3V0XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU1MTY4XHU1QzQwXHU3NkQxXHU4OUM2XCIsIGxpbms6IFwiL3poL3N0b3JlL2d1aWRlL3dhdGNoL3N0b3JlLXdhdGNoXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU3MkI2XHU2MDAxXHU1MTg1XHU3NkQxXHU4OUM2XCIsIGxpbms6IFwiL3poL3N0b3JlL2d1aWRlL3dhdGNoL3dhdGNoXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwidXNlV2F0Y2hcIiwgbGluazogXCIvemgvc3RvcmUvZ3VpZGUvd2F0Y2gvdXNlLXdhdGNoXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU3NkQxXHU4OUM2XHU1QkY5XHU4QzYxXCIsIGxpbms6IFwiL3poL3N0b3JlL2d1aWRlL3dhdGNoL29iamVjdHNcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NjU3MFx1NjM2RVx1NjgyMVx1OUE4Q1wiLCBsaW5rOiBcIi96aC9zdG9yZS9ndWlkZS9zdG9yZS92YWxpZGF0ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJTaGFkb3dcIiwgbGluazogXCIvemgvc3RvcmUvZ3VpZGUvc3RvcmUvc2hhZG93XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlJlZlN0b3JlXCIsIGxpbms6IFwiL3poL3N0b3JlL2d1aWRlL3N0b3JlL3JlZlN0b3JlXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1OTE0RFx1N0Y2RVx1N0NGQlx1N0VERlwiLCBsaW5rOiBcIi96aC9zdG9yZS9ndWlkZS9zdG9yZS9jb25maWdcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU5MDA5XHU5ODc5XCIsIGxpbms6IFwiL3poL3N0b3JlL2d1aWRlL3N0b3JlL29wdGlvbnNcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiVHlwZXNjcmlwdFwiLCBsaW5rOiBcIi96aC9zdG9yZS9ndWlkZS9zdG9yZS90eXBlc2NyaXB0XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCIvemgvcmVhY3QvXCI6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1NTE3M1x1NEU4RVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NUI4OVx1ODhDNVwiLCBsaW5rOiBcIi96aC9yZWFjdC9pbnRyby9pbnN0YWxsXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NUZFQlx1OTAxRlx1NTE2NVx1OTVFOFwiLCBsaW5rOiBcIi96aC9yZWFjdC9pbnRyby9nZXQtc3RhcnRlZFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJcdTc5M0FcdTRGOEJcIiwgbGluazogXCIvemgvcmVhY3QvaW50cm8vZXhhbXBsZXNcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU1RTM4XHU4OUMxXHU5NUVFXHU5ODk4XCIsIGxpbms6IFwiL3poL3JlYWN0L2ludHJvL3F1ZXN0aW9uXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1NjMwN1x1NTM1N1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiU3RvcmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NTE3M1x1NEU4RVwiLCBsaW5rOiBcIi96aC9yZWFjdC9zdG9yZS9hYm91dFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlN0b3JlXCIsIGxpbms6IFwiL3poL3JlYWN0L3N0b3JlL3N0b3JlXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiU3RhdGVcIiwgbGluazogXCIvemgvcmVhY3Qvc3RvcmUvc3RhdGVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJcdTZFMzJcdTY3RDNcdTRGMThcdTUzMTZcIiwgbGluazogXCIvemgvcmVhY3Qvc3RvcmUvcmVuZGVyXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU0RThCXHU0RUY2XCIsIGxpbms6IFwiL3poL3JlYWN0L3N0b3JlL2V2ZW50c1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NjI3OVx1OTFDRlx1NjZGNFx1NjVCMFwiLCBsaW5rOiBcIi96aC9yZWFjdC9zdG9yZS9iYXRjaFVwZGF0ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1OEJBMVx1N0I5N1x1NUM1RVx1NjAyN1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU1MTczXHU0RThFXCIsIGxpbms6IFwiL3poL3JlYWN0L2NvbXB1dGVkL2Fib3V0XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU1MjFCXHU1RUZBXCIsIGxpbms6IFwiL3poL3JlYWN0L2NvbXB1dGVkL2NyZWF0ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1OEJBMVx1N0I5N1x1NTFGRFx1NjU3MFwiLCBsaW5rOiBcIi96aC9yZWFjdC9jb21wdXRlZC9nZXR0ZXJcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJcdTRGOURcdThENTZcdTY1MzZcdTk2QzZcIiwgbGluazogXCIvemgvcmVhY3QvY29tcHV0ZWQvZGVwc1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NEY1Q1x1NzUyOFx1NTdERlwiLCBsaW5rOiBcIi96aC9yZWFjdC9jb21wdXRlZC9zY29wZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NTQwQ1x1NkI2NVx1OEJBMVx1N0I5N1wiLCBsaW5rOiBcIi96aC9yZWFjdC9jb21wdXRlZC9zeW5jXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU1RjAyXHU2QjY1XHU4QkExXHU3Qjk3XCIsIGxpbms6IFwiL3poL3JlYWN0L2NvbXB1dGVkL2FzeW5jXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU4QkExXHU3Qjk3XHU5MDA5XHU5ODc5XCIsIGxpbms6IFwiL3poL3JlYWN0L2NvbXB1dGVkL29wdGlvbnNcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJcdThCQTFcdTdCOTdcdTVCRjlcdThDNjFcIiwgbGluazogXCIvemgvcmVhY3QvY29tcHV0ZWQvb2JqZWN0c1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NjI0Qlx1NTJBOFx1NjI2N1x1ODg0Q1wiLCBsaW5rOiBcIi96aC9yZWFjdC9jb21wdXRlZC9ydW5cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcdTc2RDFcdTg5QzZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NTE3M1x1NEU4RVwiLCBsaW5rOiBcIi96aC9yZWFjdC93YXRjaC9hYm91dFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NTE2OFx1NUM0MFx1NzZEMVx1ODlDNlwiLCBsaW5rOiBcIi96aC9yZWFjdC93YXRjaC9zdG9yZS13YXRjaFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NzJCNlx1NjAwMVx1NTE4NVx1NzZEMVx1ODlDNlwiLCBsaW5rOiBcIi96aC9yZWFjdC93YXRjaC93YXRjaFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcInVzZVdhdGNoXCIsIGxpbms6IFwiL3poL3JlYWN0L3dhdGNoL3VzZS13YXRjaFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NzZEMVx1ODlDNlx1NUJGOVx1OEM2MVwiLCBsaW5rOiBcIi96aC9yZWFjdC93YXRjaC9vYmplY3RzXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXHU0RkUxXHU1M0Y3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJcdTUxNzNcdTRFOEVcIiwgbGluazogXCIvemgvcmVhY3Qvc2lnbmFsL2Fib3V0XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU0RkUxXHU1M0Y3XHU3RUM0XHU0RUY2XCIsIGxpbms6IFwiL3poL3JlYWN0L3NpZ25hbC9jb21wb25lbnRcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJcdTcyQjZcdTYwMDFcdTRGRTFcdTUzRjdcdTdFQzRcdTRFRjZcIiwgbGluazogXCIvemgvcmVhY3Qvc2lnbmFsL3N0YXRlLXJlbmRlclwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1ODFFQVx1NUI5QVx1NEU0OVx1NkUzMlx1NjdEM1wiLCBsaW5rOiBcIi96aC9yZWFjdC9zaWduYWwvY3VzdG9tLXJlbmRlclwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1OEJBMVx1N0I5N1x1NEZFMVx1NTNGN1x1N0VDNFx1NEVGNlwiLCBsaW5rOiBcIi96aC9yZWFjdC9zaWduYWwvY29tcHV0ZWQtcmVuZGVyXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU3NkQxXHU1NDJDXHU0RkUxXHU1M0Y3XHU3RUM0XHU0RUY2XCIsIGxpbms6IFwiL3poL3JlYWN0L3NpZ25hbC93YXRjaFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1OTUxOVx1OEJFRlx1NTkwNFx1NzQwNlwiLCBsaW5rOiBcIi96aC9yZWFjdC9zaWduYWwvZXJyb3ItYm91bmRhcnlcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcdTg4NjhcdTUzNTVcdTdFRDFcdTVCOUFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NTE3M1x1NEU4RVwiLCBsaW5rOiBcIi96aC9yZWFjdC9mb3JtL2Fib3V0XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU1RkVCXHU5MDFGXHU1MTY1XHU5NUU4XCIsIGxpbms6IFwiL3poL3JlYWN0L2Zvcm0vZ2V0LXN0YXJ0ZWRcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcdTg4NjhcdTUzNTVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NTIxQlx1NUVGQVwiLCBsaW5rOiBcIi96aC9yZWFjdC9mb3JtL2Zvcm0vY3JlYXRlXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJ1c2VGb3JtXCIsIGxpbms6IFwiL3poL3JlYWN0L2Zvcm0vZm9ybS91c2UtZm9ybVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU2M0QwXHU0RUE0XHU4ODY4XHU1MzU1XCIsIGxpbms6IFwiL3poL3JlYWN0L2Zvcm0vZm9ybS9zdWJtaXRcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1NUI1N1x1NkJCNVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NTE3M1x1NEU4RVwiLCBsaW5rOiBcIi96aC9yZWFjdC9mb3JtL2ZpZWxkL2Fib3V0XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcInVzZUZpZWxkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluazogXCIvemgvcmVhY3QvZm9ybS9maWVsZC91c2UtZmllbGRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJ1c2VGaWVsZHNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiBcIi96aC9yZWFjdC9mb3JtL2ZpZWxkL3VzZS1maWVsZHNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcdTVCNTdcdTZCQjVcdTYyQzZcdTUyMDZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiBcIi96aC9yZWFjdC9mb3JtL2ZpZWxkL3NwbGl0LWZpZWxkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXHU1QjU3XHU2QkI1XHU3RUM0XHU0RUY2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluazogXCIvemgvcmVhY3QvZm9ybS9maWVsZC9maWVsZC1jb21wb25lbnRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXHU4ODY4XHU1MzU1XHU2ODIxXHU5QThDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6IFwiL3poL3JlYWN0L2Zvcm0vdmFsaWRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcdTgxMEZcdTY4QzBcdTY3RTVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluazogXCIvemgvcmVhY3QvZm9ybS9kaXJ0eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1OEMwM1x1OEJENVx1NEUwRVx1OEJDQVx1NjVBRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiRGV2VG9vbHNcIiwgbGluazogXCIvemgvcmVhY3QvZGVidWcvZGV2VG9vbHNcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJ0cmFjZVwiLCBsaW5rOiBcIi96aC9yZWFjdC9kZWJ1Zy90cmFjZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NEY5RFx1OEQ1Nlx1NjUzNlx1OTZDNlwiLCBsaW5rOiBcIi96aC9yZWFjdC9kZWJ1Zy9jb2xsZWN0RGVwc1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NjVFNVx1NUZEN1wiLCBsaW5rOiBcIi96aC9yZWFjdC9kZWJ1Zy9sb2dcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJcdTVGQUFcdTczQUZcdTRGOURcdThENTZcIiwgbGluazogXCIvemgvcmVhY3QvZGVidWcvY2lyY3VsYXItZGVwZW5kZW5jeVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcIi96aC9zeW5jL1wiOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcdTUxNzNcdTRFOEVcIixcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU1Qjg5XHU4OEM1XCIsIGxpbms6IFwiL3poL3N5bmMvZ3VpZGUvaW5zdGFsbFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJcdTVGRUJcdTkwMUZcdTUxNjVcdTk1RThcIiwgbGluazogXCIvemgvc3luYy9ndWlkZS9nZXQtc3RhcnRzXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1NjMwN1x1NTM1N1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiU3luY2VyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiBcIi96aC9zeW5jL2d1aWRlL3N5bmNlcnMvc3luY2VyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQ2xvbmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6IFwiL3poL3N5bmMvZ3VpZGUvc3luY2Vycy9jbG9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIldvcmtlclN5bmNlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluazogXCIvemgvc3luYy9ndWlkZS9zeW5jZXJzL3dvcmtlci1zeW5jZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJCcm9hZGNhc3RTeW5jZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6IFwiL3poL3N5bmMvZ3VpZGUvc3luY2Vycy9icm9hZGNhc3Qtc3luY2VyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiYnJvYWRjYXN0Q2hhbm5lbFN5bmNlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluazogXCIvemgvc3luYy9ndWlkZS9zeW5jZXJzL2Jyb2FkY2FzdC1jaGFubmVsLXN5bmNlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlN3aXRjaFN5bmNlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluazogXCIvemgvc3luYy9ndWlkZS9zeW5jZXJzL3N3aXRjaC1zeW5jZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCIvemgvdGVtcGxhdGUvXCI6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1NTE3M1x1NEU4RVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbms6IFwiL3poL3RlbXBsYXRlL2luZGV4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NUI4OVx1ODhDNVwiLCBsaW5rOiBcIi96aC90ZW1wbGF0ZS9pbnRyby9pbnN0YWxsXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NTQwRFx1OEJDRFx1ODlFM1x1OTFDQVwiLCBsaW5rOiBcIi96aC90ZW1wbGF0ZS9pbnRyby9nbG9zc2FyeVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJcdTVGRUJcdTkwMUZcdTUxNjVcdTk1RThcIiwgbGluazogXCIvemgvdGVtcGxhdGUvaW50cm8vZ2V0LXN0YXJ0ZWRcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU3Mjc5XHU1RjgxXHU1NDhDXHU0RjE4XHU1MkJGXCIsIGxpbms6IFwiL3poL3RlbXBsYXRlL2ludHJvL2ZlYXR1cmVzXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NUUzOFx1ODlDMVx1OTVFRVx1OTg5OFwiLCBsaW5rOiBcIi96aC90ZW1wbGF0ZS9pbnRyby9xdWVzdGlvblwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcdTYzMDdcdTUzNTdcIixcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU1MjFEXHU1OUNCXHU1MzE2XCIsIGxpbms6IFwiL3poL3RlbXBsYXRlL2d1aWRlL2luaXRpYWxcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU1NENEXHU1RTk0XHU1RjBGXCIsIGxpbms6IFwiL3poL3RlbXBsYXRlL2d1aWRlL3JlYWN0aXZlXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NTJBOFx1NEY1Q1wiLCBsaW5rOiBcIi96aC90ZW1wbGF0ZS9ndWlkZS9hY3Rpb25cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwiXHU2MzA3XHU0RUU0XHU3QzdCXHU1NzhCXCIsIGxpbms6IFwiL3poL3RlbXBsYXRlL2d1aWRlL2RpcmVjdGl2ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJcdTYzMDdcdTRFRTRcdTkxNERcdTdGNkVcIiwgbGluazogXCIvemgvdGVtcGxhdGUvZ3VpZGUvY29uZmlnXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NTJBOFx1NjAwMVx1NkEyMVx1Njc3RlwiLCBsaW5rOiBcIi96aC90ZW1wbGF0ZS9ndWlkZS9wYXRjaFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJcdTdFQzRcdTRFRjZcIiwgbGluazogXCIvemgvdGVtcGxhdGUvZ3VpZGUvY29tcG9uZW50XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1NjMwN1x1NEVFNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJ4LWJpbmRcIiwgbGluazogXCIvemgvdGVtcGxhdGUvZ3VpZGUvZGlyZWN0aXZlcy94LWJpbmRcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwieC10ZXh0XCIsIGxpbms6IFwiL3poL3RlbXBsYXRlL2d1aWRlL2RpcmVjdGl2ZXMveC10ZXh0XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIngtaHRtbFwiLCBsaW5rOiBcIi96aC90ZW1wbGF0ZS9ndWlkZS9kaXJlY3RpdmVzL3gtaHRtbFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJ4LXN0eWxlXCIsIGxpbms6IFwiL3poL3RlbXBsYXRlL2d1aWRlL2RpcmVjdGl2ZXMveC1zdHlsZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJ4LWNsYXNzXCIsIGxpbms6IFwiL3poL3RlbXBsYXRlL2d1aWRlL2RpcmVjdGl2ZXMveC1jbGFzc1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJ4LWRhdGFcIiwgbGluazogXCIvemgvdGVtcGxhdGUvZ3VpZGUvZGlyZWN0aXZlcy94LWRhdGFcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwieC1zY29wZVwiLCBsaW5rOiBcIi96aC90ZW1wbGF0ZS9ndWlkZS9kaXJlY3RpdmVzL3gtc2NvcGVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwieC1pZlwiLCBsaW5rOiBcIi96aC90ZW1wbGF0ZS9ndWlkZS9kaXJlY3RpdmVzL3gtaWZcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwieC1zaG93XCIsIGxpbms6IFwiL3poL3RlbXBsYXRlL2d1aWRlL2RpcmVjdGl2ZXMveC1zaG93XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIngtZm9yXCIsIGxpbms6IFwiL3poL3RlbXBsYXRlL2d1aWRlL2RpcmVjdGl2ZXMveC1mb3JcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwieC1vblwiLCBsaW5rOiBcIi96aC90ZW1wbGF0ZS9ndWlkZS9kaXJlY3RpdmVzL3gtb25cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwieC1sb2FkaW5nXCIsIGxpbms6IFwiL3poL3RlbXBsYXRlL2d1aWRlL2RpcmVjdGl2ZXMveC1sb2FkaW5nXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIngtc2xvdFwiLCBsaW5rOiBcIi96aC90ZW1wbGF0ZS9ndWlkZS9kaXJlY3RpdmVzL3gtc2xvdFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJ4LXBhdGNoXCIsIGxpbms6IFwiL3poL3RlbXBsYXRlL2d1aWRlL2RpcmVjdGl2ZXMveC1wYXRjaFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJ4LW1vZGVsXCIsIGxpbms6IFwiL3poL3RlbXBsYXRlL2d1aWRlL2RpcmVjdGl2ZXMveC1tb2RlbFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJ4LXN3aXRjaFwiLCBsaW5rOiBcIi96aC90ZW1wbGF0ZS9ndWlkZS9kaXJlY3RpdmVzL3gtc3dpdGNoXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIngtdGFibGVcIiwgbGluazogXCIvemgvdGVtcGxhdGUvZ3VpZGUvZGlyZWN0aXZlcy94LXRhYmxlXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIngtdGVsZXBvcnRcIiwgbGluazogXCIvemgvdGVtcGxhdGUvZ3VpZGUvZGlyZWN0aXZlcy94LXRlbGVwb3J0XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJ4LXRyYW5zaXRpb25cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6IFwiL3poL3RlbXBsYXRlL2d1aWRlL2RpcmVjdGl2ZXMveC10cmFuc2l0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzb2NpYWxMaW5rczogW3sgaWNvbjogXCJnaXRodWJcIiwgbGluazogXCJodHRwczovL2dpdGh1Yi5jb20vemhhbmdmaXNoZXIvYXV0b3N0b3JlL1wiIH1dLFxyXG4gICAgfSxcclxuICAgIHZ1ZToge1xyXG4gICAgICAgIHRlbXBsYXRlOiB7XHJcbiAgICAgICAgICAgIGNvbXBpbGVyT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgd2hpdGVzcGFjZTogXCJwcmVzZXJ2ZVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgbWFya2Rvd246IHtcclxuICAgICAgICBjb25maWcobWQpIHtcclxuICAgICAgICAgICAgbWQudXNlKHZpdGVwcmVzc0RlbW9QbHVnaW4sIHtcclxuICAgICAgICAgICAgICAgIGRlbW9EaXI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vLi4vZGVtb3NcIiksXHJcbiAgICAgICAgICAgICAgICBzdGFja2JsaXR6OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb2Rlc2FuZGJveDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIFx1NzI0OFx1NjcyQ1x1NTE3Q1x1NUJCOVx1NjAyN1x1OTVFRVx1OTg5OFx1RkYxQUBzaGlraWpzL3ZpdGVwcmVzcy10d29zbGFzaCB2NC4wLjEgXHU0RTBFIFZpdGVQcmVzcyBcdTUxODVcdTdGNkUgc2hpa2kgdjIuNS4wIFx1N0M3Qlx1NTc4Qlx1NEUwRFx1NTMzOVx1OTE0RFxyXG4gICAgICAgIGNvZGVUcmFuc2Zvcm1lcnM6IFtcclxuICAgICAgICAgICAgdHJhbnNmb3JtZXJUd29zbGFzaCh7XHJcbiAgICAgICAgICAgICAgICB0aHJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3JSZW5kZXJpbmc6IFwiaG92ZXJcIixcclxuICAgICAgICAgICAgICAgIGV4cGxpY2l0VHJpZ2dlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHR3b3NsYXNoT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBpbGVyT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZ25vcmVEZXByZWNhdGlvbnM6IFwiNi4wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIF0gYXMgYW55LFxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBsYW5ndWFnZXM6IFtcImpzXCIsIFwianN4XCIsIFwidHNcIiwgXCJ0c3hcIl0sXHJcbiAgICB9LFxyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAwMDAwLFxyXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICAgICAgICBtYW51YWxDaHVua3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBcdTVDMDZcdThGODNcdTU5MjdcdTc2ODRcdTRGOURcdThENTZcdTk4NzlcdTUyMDZcdTdFQzRcdTUyMzBcdTUzNTVcdTcyRUNcdTc2ODRcdTU3NTdcdTRFMkRcclxuICAgICAgICAgICAgICAgICAgICB2ZW5kb3I6IFtcInZ1ZVwiLCBcInZ1ZS1yb3V0ZXJcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2hpa2k6IFtcInNoaWtpXCIsIFwiQHNoaWtpanMvdml0ZXByZXNzLXR3b3NsYXNoXCJdLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIHZpdGU6IHtcclxuICAgICAgICBidWlsZDoge1xyXG4gICAgICAgICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwMDAsIC8vIFx1NUMwNlx1OTY1MFx1NTIzNlx1NjNEMFx1OUFEOFx1NTIzMCAxMDAwS0JcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlQsT0FBTyxVQUFVO0FBQzVVLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsMkJBQTJCO0FBQ3BDLFNBQVMsMkJBQTJCO0FBSHBDLElBQU0sbUNBQW1DO0FBS3pDLElBQU8saUJBQVEsYUFBYTtBQUFBLEVBQ3hCLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQSxFQUNiLGFBQWE7QUFBQTtBQUFBLElBRVQsU0FBUztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUFBLElBQ2hCO0FBQUE7QUFBQSxJQUVBLEtBQUs7QUFBQSxNQUNELEVBQUUsTUFBTSxnQkFBTSxNQUFNLElBQUk7QUFBQSxNQUN4QixFQUFFLE1BQU0sc0JBQU8sTUFBTSxhQUFhO0FBQUEsTUFDbEMsRUFBRSxNQUFNLGdCQUFN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
