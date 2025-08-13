// .vitepress/config/index.ts
import path from "path";
import { defineConfig } from "file:///E:/Work/Code/sources/autostore/node_modules/.pnpm/vitepress@1.6.3_@algolia+cl_b91f6187444d4f1b260c7e711f4bf9a4/node_modules/vitepress/dist/node/index.js";
import { vitepressDemoPlugin } from "file:///E:/Work/Code/sources/autostore/node_modules/.pnpm/vitepress-demo-plugin@1.4.7_a6b23a238424460c22cc4e39a525d444/node_modules/vitepress-demo-plugin/dist/index.js";
var __vite_injected_original_dirname = "E:\\Work\\Code\\sources\\autostore\\docs\\.vitepress\\config";
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
      { text: "React", link: "/zh/react/" },
      { text: "\u8868\u5355", link: "/zh/form/" },
      { text: "\u5F00\u6E90\u63A8\u8350", link: "https://zhangfisher.github.io/repos/" }
    ],
    sidebar: {
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
                { text: "\u6279\u91CF\u66F4\u65B0", link: "/zh/react/store/batchUpdate" },
                { text: "\u6821\u9A8C\u6A21\u5F0F", link: "/zh/react/store/schema" },
                { text: "\u540C\u6B65", link: "/zh/react/store/sync" },
                { text: "Shadow", link: "/zh/react/store/shadow" }
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
                      text: "\u7B80\u5355\u5B57\u6BB5",
                      link: "/zh/react/form/field/simple-field"
                    },
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
      "/zh/store/": [
        {
          text: "\u6307\u5357",
          items: [
            { text: "\u6982\u5FF5", link: "/zh/store/guide/store/about" },
            { text: "\u5B89\u88C5", link: "/zh/store/guide/install" },
            { text: "\u521B\u5EFA", link: "/zh/store/guide/store/create" },
            { text: "\u8BFB\u5199\u72B6\u6001", link: "/zh/store/guide/store/read-write" },
            { text: "\u4E8B\u4EF6", link: "/zh/store/guide/store/events" },
            { text: "\u6279\u91CF\u66F4\u65B0", link: "/zh/store/guide/store/batchUpdate" },
            { text: "\u6821\u9A8C\u6A21\u5F0F", link: "/zh/store/guide/store/schema" },
            { text: "\u540C\u6B65", link: "/zh/store/guide/store/sync" },
            { text: "Shadow", link: "/zh/store/guide/store/shadow" },
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
            { text: "\u914D\u7F6E\u53C2\u6570", link: "/zh/store/guide/store/state" }
          ]
        }
      ],
      "/zh/form/": [
        {
          text: "\u5173\u4E8E",
          items: [
            { text: "\u5B89\u88C5", link: "/zh/form/intro/install" },
            { text: "\u5FEB\u901F\u5165\u95E8", link: "/zh/form/intro/get-started" }
          ]
        },
        {
          text: "\u6307\u5357",
          items: [
            { text: "\u8868\u5355", link: "/zh/form/guide/form" },
            { text: "\u5B57\u6BB5", link: "/zh/form/guide/field" },
            { text: "\u6821\u9A8C", link: "/zh/form/guide/validate" },
            { text: "\u63D0\u4EA4\u8868\u5355", link: "/zh/form/guide/submit" },
            { text: "\u56FE\u6807", link: "/zh/form/guide/icons" }
          ]
        },
        {
          text: "\u5B57\u6BB5",
          items: [
            { text: "Input", link: "/zh/form/guide/fields/input" },
            { text: "Number", link: "/zh/form/guide/fields/number" },
            { text: "Date", link: "/zh/form/guide/fields/date" },
            { text: "Time", link: "/zh/form/guide/fields/time" },
            { text: "DateTime", link: "/zh/form/guide/fields/datetime" },
            { text: "Phone", link: "/zh/form/guide/fields/phone" },
            { text: "Email", link: "/zh/form/guide/fields/email" },
            { text: "DateRange", link: "/zh/form/guide/fields/date-range" },
            { text: "Url", link: "/zh/form/guide/fields/url" },
            { text: "Search", link: "/zh/form/guide/fields/search" },
            { text: "Checkbox", link: "/zh/form/guide/fields/checkbox" },
            { text: "CheckboxGroup", link: "/zh/form/guide/fields/checkbox-group" },
            { text: "ColorPicker", link: "/zh/form/guide/fields/colorpicker" },
            { text: "Cascader", link: "/zh/form/guide/fields/cascader" },
            { text: "Switch", link: "/zh/form/guide/fields/switch" },
            { text: "Radio", link: "/zh/form/guide/fields/radio" },
            { text: "RadioButton", link: "/zh/form/guide/fields/radio-button" },
            { text: "List", link: "/zh/form/guide/fields/list" },
            { text: "Select", link: "/zh/form/guide/fields/select" },
            { text: "TreeSelect", link: "/zh/form/guide/fields/tree-select" },
            { text: "TreeDropdown", link: "/zh/form/guide/fields/tree-dropdown" },
            { text: "Rating", link: "/zh/form/guide/fields/rating" },
            { text: "Range", link: "/zh/form/guide/fields/range" },
            { text: "Textarea", link: "/zh/form/guide/fields/textarea" },
            { text: "Upload", link: "/zh/form/guide/fields/upload" },
            { text: "Parts", link: "/zh/form/guide/fields/parts" },
            { text: "Captcha", link: "/zh/form/guide/fields/captcha" },
            { text: "VerifyCode", link: "/zh/form/guide/fields/verify-code" },
            { text: "IpAddress", link: "/zh/form/guide/fields/ipaddress" },
            { text: "Icons", link: "/zh/form/guide/fields/icons" },
            { text: "Combine", link: "/zh/form/guide/fields/combine" },
            { text: "Custom", link: "/zh/form/guide/fields/custom" },
            { text: "QrCode", link: "/zh/form/guide/fields/qrcode" }
          ]
        },
        {
          text: "\u5B57\u6BB5\u7EC4",
          items: [
            { text: "Tabs", link: "/zh/form/guide/groups/tabs" },
            { text: "Collapse", link: "/zh/form/guide/groups/collapse" }
          ]
        },
        {
          text: "\u793A\u4F8B",
          items: [{ text: "\u7EFC\u5408", link: "/examples/demo.html", target: "_blank" }]
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
    }
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
          // 添加其他大型依赖项
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcvaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxXb3JrXFxcXENvZGVcXFxcc291cmNlc1xcXFxhdXRvc3RvcmVcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcV29ya1xcXFxDb2RlXFxcXHNvdXJjZXNcXFxcYXV0b3N0b3JlXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1dvcmsvQ29kZS9zb3VyY2VzL2F1dG9zdG9yZS9kb2NzLy52aXRlcHJlc3MvY29uZmlnL2luZGV4LnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcyc7XHJcbmltcG9ydCB7IHZpdGVwcmVzc0RlbW9QbHVnaW4gfSBmcm9tICd2aXRlcHJlc3MtZGVtby1wbHVnaW4nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIGJhc2U6ICcvYXV0b3N0b3JlLycsXHJcbiAgICB0aXRsZTogJ0F1dG9TdG9yZScsXHJcbiAgICBkZXNjcmlwdGlvbjogJ1x1NTRDRFx1NUU5NFx1NUYwRlx1NjU3MFx1NjM2RVx1N0JBMVx1NzQwNlx1NUU5MycsXHJcbiAgICB0aGVtZUNvbmZpZzoge1xyXG4gICAgICAgIC8vIGh0dHBzOi8vdml0ZXByZXNzLmRldi9yZWZlcmVuY2UvZGVmYXVsdC10aGVtZS1jb25maWdcclxuICAgICAgICBvdXRsaW5lOiB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnXHU3NkVFXHU1RjU1JyxcclxuICAgICAgICAgICAgbGV2ZWw6IFsyLCA1XSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIGh0dHBzOi8vdml0ZXByZXNzLmRldi9yZWZlcmVuY2UvZGVmYXVsdC10aGVtZS1jb25maWdcclxuICAgICAgICBuYXY6IFtcclxuICAgICAgICAgICAgeyB0ZXh0OiAnXHU5OTk2XHU5ODc1JywgbGluazogJy8nIH0sXHJcbiAgICAgICAgICAgIHsgdGV4dDogJ1x1NjgzOFx1NUZDM1x1NUU5MycsIGxpbms6ICcvemgvc3RvcmUvJyB9LFxyXG4gICAgICAgICAgICB7IHRleHQ6ICdSZWFjdCcsIGxpbms6ICcvemgvcmVhY3QvJyB9LFxyXG4gICAgICAgICAgICB7IHRleHQ6ICdcdTg4NjhcdTUzNTUnLCBsaW5rOiAnL3poL2Zvcm0vJyB9LFxyXG4gICAgICAgICAgICB7IHRleHQ6ICdcdTVGMDBcdTZFOTBcdTYzQThcdTgzNTAnLCBsaW5rOiAnaHR0cHM6Ly96aGFuZ2Zpc2hlci5naXRodWIuaW8vcmVwb3MvJyB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc2lkZWJhcjoge1xyXG4gICAgICAgICAgICAnL3poL3JlYWN0Lyc6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnXHU1MTczXHU0RThFJyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1x1NUI4OVx1ODhDNScsIGxpbms6ICcvemgvcmVhY3QvaW50cm8vaW5zdGFsbCcgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1RkVCXHU5MDFGXHU1MTY1XHU5NUU4JywgbGluazogJy96aC9yZWFjdC9pbnRyby9nZXQtc3RhcnRlZCcgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU3OTNBXHU0RjhCJywgbGluazogJy96aC9yZWFjdC9pbnRyby9leGFtcGxlcycgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1RTM4XHU4OUMxXHU5NUVFXHU5ODk4JywgbGluazogJy96aC9yZWFjdC9pbnRyby9xdWVzdGlvbicgfSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnXHU2MzA3XHU1MzU3JyxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnU3RvcmUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdTUxNzNcdTRFOEUnLCBsaW5rOiAnL3poL3JlYWN0L3N0b3JlL2Fib3V0JyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1N0b3JlJywgbGluazogJy96aC9yZWFjdC9zdG9yZS9zdG9yZScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdTdGF0ZScsIGxpbms6ICcvemgvcmVhY3Qvc3RvcmUvc3RhdGUnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU2RTMyXHU2N0QzXHU0RjE4XHU1MzE2JywgbGluazogJy96aC9yZWFjdC9zdG9yZS9yZW5kZXInIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU0RThCXHU0RUY2JywgbGluazogJy96aC9yZWFjdC9zdG9yZS9ldmVudHMnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU2Mjc5XHU5MUNGXHU2NkY0XHU2NUIwJywgbGluazogJy96aC9yZWFjdC9zdG9yZS9iYXRjaFVwZGF0ZScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdTY4MjFcdTlBOENcdTZBMjFcdTVGMEYnLCBsaW5rOiAnL3poL3JlYWN0L3N0b3JlL3NjaGVtYScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdTU0MENcdTZCNjUnLCBsaW5rOiAnL3poL3JlYWN0L3N0b3JlL3N5bmMnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnU2hhZG93JywgbGluazogJy96aC9yZWFjdC9zdG9yZS9zaGFkb3cnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnXHU4QkExXHU3Qjk3XHU1QzVFXHU2MDI3JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1MTczXHU0RThFJywgbGluazogJy96aC9yZWFjdC9jb21wdXRlZC9hYm91dCcgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdTUyMUJcdTVFRkEnLCBsaW5rOiAnL3poL3JlYWN0L2NvbXB1dGVkL2NyZWF0ZScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdThCQTFcdTdCOTdcdTUxRkRcdTY1NzAnLCBsaW5rOiAnL3poL3JlYWN0L2NvbXB1dGVkL2dldHRlcicgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdTRGOURcdThENTZcdTY1MzZcdTk2QzYnLCBsaW5rOiAnL3poL3JlYWN0L2NvbXB1dGVkL2RlcHMnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU0RjVDXHU3NTI4XHU1N0RGJywgbGluazogJy96aC9yZWFjdC9jb21wdXRlZC9zY29wZScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdTU0MENcdTZCNjVcdThCQTFcdTdCOTcnLCBsaW5rOiAnL3poL3JlYWN0L2NvbXB1dGVkL3N5bmMnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1RjAyXHU2QjY1XHU4QkExXHU3Qjk3JywgbGluazogJy96aC9yZWFjdC9jb21wdXRlZC9hc3luYycgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdThCQTFcdTdCOTdcdTkwMDlcdTk4NzknLCBsaW5rOiAnL3poL3JlYWN0L2NvbXB1dGVkL29wdGlvbnMnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU4QkExXHU3Qjk3XHU1QkY5XHU4QzYxJywgbGluazogJy96aC9yZWFjdC9jb21wdXRlZC9vYmplY3RzJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1x1NjI0Qlx1NTJBOFx1NjI2N1x1ODg0QycsIGxpbms6ICcvemgvcmVhY3QvY29tcHV0ZWQvcnVuJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1x1NzZEMVx1ODlDNicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1x1NTE3M1x1NEU4RScsIGxpbms6ICcvemgvcmVhY3Qvd2F0Y2gvYWJvdXQnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1MTY4XHU1QzQwXHU3NkQxXHU4OUM2JywgbGluazogJy96aC9yZWFjdC93YXRjaC9zdG9yZS13YXRjaCcgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdTcyQjZcdTYwMDFcdTUxODVcdTc2RDFcdTg5QzYnLCBsaW5rOiAnL3poL3JlYWN0L3dhdGNoL3dhdGNoJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ3VzZVdhdGNoJywgbGluazogJy96aC9yZWFjdC93YXRjaC91c2Utd2F0Y2gnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU3NkQxXHU4OUM2XHU1QkY5XHU4QzYxJywgbGluazogJy96aC9yZWFjdC93YXRjaC9vYmplY3RzJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1x1NEZFMVx1NTNGNycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1x1NTE3M1x1NEU4RScsIGxpbms6ICcvemgvcmVhY3Qvc2lnbmFsL2Fib3V0JyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1x1NEZFMVx1NTNGN1x1N0VDNFx1NEVGNicsIGxpbms6ICcvemgvcmVhY3Qvc2lnbmFsL2NvbXBvbmVudCcgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdTcyQjZcdTYwMDFcdTRGRTFcdTUzRjdcdTdFQzRcdTRFRjYnLCBsaW5rOiAnL3poL3JlYWN0L3NpZ25hbC9zdGF0ZS1yZW5kZXInIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU4MUVBXHU1QjlBXHU0RTQ5XHU2RTMyXHU2N0QzJywgbGluazogJy96aC9yZWFjdC9zaWduYWwvY3VzdG9tLXJlbmRlcicgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdThCQTFcdTdCOTdcdTRGRTFcdTUzRjdcdTdFQzRcdTRFRjYnLCBsaW5rOiAnL3poL3JlYWN0L3NpZ25hbC9jb21wdXRlZC1yZW5kZXInIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU3NkQxXHU1NDJDXHU0RkUxXHU1M0Y3XHU3RUM0XHU0RUY2JywgbGluazogJy96aC9yZWFjdC9zaWduYWwvd2F0Y2gnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU5NTE5XHU4QkVGXHU1OTA0XHU3NDA2JywgbGluazogJy96aC9yZWFjdC9zaWduYWwvZXJyb3ItYm91bmRhcnknIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnXHU4ODY4XHU1MzU1XHU3RUQxXHU1QjlBJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1MTczXHU0RThFJywgbGluazogJy96aC9yZWFjdC9mb3JtL2Fib3V0JyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1x1NUZFQlx1OTAxRlx1NTE2NVx1OTVFOCcsIGxpbms6ICcvemgvcmVhY3QvZm9ybS9nZXQtc3RhcnRlZCcgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdcdTg4NjhcdTUzNTUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdTUyMUJcdTVFRkEnLCBsaW5rOiAnL3poL3JlYWN0L2Zvcm0vZm9ybS9jcmVhdGUnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICd1c2VGb3JtJywgbGluazogJy96aC9yZWFjdC9mb3JtL2Zvcm0vdXNlLWZvcm0nIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdTYzRDBcdTRFQTRcdTg4NjhcdTUzNTUnLCBsaW5rOiAnL3poL3JlYWN0L2Zvcm0vZm9ybS9zdWJtaXQnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdcdTVCNTdcdTZCQjUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1MTczXHU0RThFJywgbGluazogJy96aC9yZWFjdC9mb3JtL2ZpZWxkL2Fib3V0JyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdcdTdCODBcdTUzNTVcdTVCNTdcdTZCQjUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvemgvcmVhY3QvZm9ybS9maWVsZC9zaW1wbGUtZmllbGQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAndXNlRmllbGQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvemgvcmVhY3QvZm9ybS9maWVsZC91c2UtZmllbGQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAndXNlRmllbGRzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL3poL3JlYWN0L2Zvcm0vZmllbGQvdXNlLWZpZWxkcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdcdTVCNTdcdTZCQjVcdTYyQzZcdTUyMDYnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvemgvcmVhY3QvZm9ybS9maWVsZC9zcGxpdC1maWVsZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdcdTVCNTdcdTZCQjVcdTdFQzRcdTRFRjYnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvemgvcmVhY3QvZm9ybS9maWVsZC9maWVsZC1jb21wb25lbnQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1x1ODg2OFx1NTM1NVx1NjgyMVx1OUE4QycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvemgvcmVhY3QvZm9ybS92YWxpZGF0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdcdTgxMEZcdTY4QzBcdTY3RTUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL3poL3JlYWN0L2Zvcm0vZGlydHknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnXHU4QzAzXHU4QkQ1XHU0RTBFXHU4QkNBXHU2NUFEJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnRGV2VG9vbHMnLCBsaW5rOiAnL3poL3JlYWN0L2RlYnVnL2RldlRvb2xzJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ3RyYWNlJywgbGluazogJy96aC9yZWFjdC9kZWJ1Zy90cmFjZScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdTRGOURcdThENTZcdTY1MzZcdTk2QzYnLCBsaW5rOiAnL3poL3JlYWN0L2RlYnVnL2NvbGxlY3REZXBzJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1x1NjVFNVx1NUZENycsIGxpbms6ICcvemgvcmVhY3QvZGVidWcvbG9nJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1x1NUZBQVx1NzNBRlx1NEY5RFx1OEQ1NicsIGxpbms6ICcvemgvcmVhY3QvZGVidWcvY2lyY3VsYXItZGVwZW5kZW5jeScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICcvemgvc3RvcmUvJzogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdcdTYzMDdcdTUzNTcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1x1Njk4Mlx1NUZGNScsIGxpbms6ICcvemgvc3RvcmUvZ3VpZGUvc3RvcmUvYWJvdXQnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1x1NUI4OVx1ODhDNScsIGxpbms6ICcvemgvc3RvcmUvZ3VpZGUvaW5zdGFsbCcgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1MjFCXHU1RUZBJywgbGluazogJy96aC9zdG9yZS9ndWlkZS9zdG9yZS9jcmVhdGUnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1x1OEJGQlx1NTE5OVx1NzJCNlx1NjAwMScsIGxpbms6ICcvemgvc3RvcmUvZ3VpZGUvc3RvcmUvcmVhZC13cml0ZScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU0RThCXHU0RUY2JywgbGluazogJy96aC9zdG9yZS9ndWlkZS9zdG9yZS9ldmVudHMnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1x1NjI3OVx1OTFDRlx1NjZGNFx1NjVCMCcsIGxpbms6ICcvemgvc3RvcmUvZ3VpZGUvc3RvcmUvYmF0Y2hVcGRhdGUnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1x1NjgyMVx1OUE4Q1x1NkEyMVx1NUYwRicsIGxpbms6ICcvemgvc3RvcmUvZ3VpZGUvc3RvcmUvc2NoZW1hJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdTU0MENcdTZCNjUnLCBsaW5rOiAnL3poL3N0b3JlL2d1aWRlL3N0b3JlL3N5bmMnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1NoYWRvdycsIGxpbms6ICcvemgvc3RvcmUvZ3VpZGUvc3RvcmUvc2hhZG93JyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnXHU4QkExXHU3Qjk3XHU1QzVFXHU2MDI3JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1MTczXHU0RThFJywgbGluazogJy96aC9zdG9yZS9ndWlkZS9jb21wdXRlZC9hYm91dCcgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdTUyMUJcdTVFRkEnLCBsaW5rOiAnL3poL3N0b3JlL2d1aWRlL2NvbXB1dGVkL2NyZWF0ZScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdThCQTFcdTdCOTdcdTUxRkRcdTY1NzAnLCBsaW5rOiAnL3poL3N0b3JlL2d1aWRlL2NvbXB1dGVkL2dldHRlcicgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdTRGOURcdThENTZcdTY1MzZcdTk2QzYnLCBsaW5rOiAnL3poL3N0b3JlL2d1aWRlL2NvbXB1dGVkL2RlcHMnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU0RjVDXHU3NTI4XHU1N0RGJywgbGluazogJy96aC9zdG9yZS9ndWlkZS9jb21wdXRlZC9zY29wZScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdTU0MENcdTZCNjVcdThCQTFcdTdCOTcnLCBsaW5rOiAnL3poL3N0b3JlL2d1aWRlL2NvbXB1dGVkL3N5bmMnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1RjAyXHU2QjY1XHU4QkExXHU3Qjk3JywgbGluazogJy96aC9zdG9yZS9ndWlkZS9jb21wdXRlZC9hc3luYycgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdThCQTFcdTdCOTdcdTkwMDlcdTk4NzknLCBsaW5rOiAnL3poL3N0b3JlL2d1aWRlL2NvbXB1dGVkL29wdGlvbnMnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU4QkExXHU3Qjk3XHU1QkY5XHU4QzYxJywgbGluazogJy96aC9zdG9yZS9ndWlkZS9jb21wdXRlZC9vYmplY3RzJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1x1NjI0Qlx1NTJBOFx1NjI2N1x1ODg0QycsIGxpbms6ICcvemgvc3RvcmUvZ3VpZGUvY29tcHV0ZWQvcnVuJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1x1NzZEMVx1ODlDNicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1x1NTE3M1x1NEU4RScsIGxpbms6ICcvemgvc3RvcmUvZ3VpZGUvd2F0Y2gvYWJvdXQnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1MTY4XHU1QzQwXHU3NkQxXHU4OUM2JywgbGluazogJy96aC9zdG9yZS9ndWlkZS93YXRjaC9zdG9yZS13YXRjaCcgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdTcyQjZcdTYwMDFcdTUxODVcdTc2RDFcdTg5QzYnLCBsaW5rOiAnL3poL3N0b3JlL2d1aWRlL3dhdGNoL3dhdGNoJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ3VzZVdhdGNoJywgbGluazogJy96aC9zdG9yZS9ndWlkZS93YXRjaC91c2Utd2F0Y2gnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU3NkQxXHU4OUM2XHU1QkY5XHU4QzYxJywgbGluazogJy96aC9zdG9yZS9ndWlkZS93YXRjaC9vYmplY3RzJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU5MTREXHU3RjZFXHU1M0MyXHU2NTcwJywgbGluazogJy96aC9zdG9yZS9ndWlkZS9zdG9yZS9zdGF0ZScgfSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgJy96aC9mb3JtLyc6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnXHU1MTczXHU0RThFJyxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdTVCODlcdTg4QzUnLCBsaW5rOiAnL3poL2Zvcm0vaW50cm8vaW5zdGFsbCcgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1RkVCXHU5MDFGXHU1MTY1XHU5NUU4JywgbGluazogJy96aC9mb3JtL2ludHJvL2dldC1zdGFydGVkJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdcdTYzMDdcdTUzNTcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1x1ODg2OFx1NTM1NScsIGxpbms6ICcvemgvZm9ybS9ndWlkZS9mb3JtJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdcdTVCNTdcdTZCQjUnLCBsaW5rOiAnL3poL2Zvcm0vZ3VpZGUvZmllbGQnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1x1NjgyMVx1OUE4QycsIGxpbms6ICcvemgvZm9ybS9ndWlkZS92YWxpZGF0ZScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU2M0QwXHU0RUE0XHU4ODY4XHU1MzU1JywgbGluazogJy96aC9mb3JtL2d1aWRlL3N1Ym1pdCcgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1NkZFXHU2ODA3JywgbGluazogJy96aC9mb3JtL2d1aWRlL2ljb25zJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdcdTVCNTdcdTZCQjUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0lucHV0JywgbGluazogJy96aC9mb3JtL2d1aWRlL2ZpZWxkcy9pbnB1dCcgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnTnVtYmVyJywgbGluazogJy96aC9mb3JtL2d1aWRlL2ZpZWxkcy9udW1iZXInIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0RhdGUnLCBsaW5rOiAnL3poL2Zvcm0vZ3VpZGUvZmllbGRzL2RhdGUnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1RpbWUnLCBsaW5rOiAnL3poL2Zvcm0vZ3VpZGUvZmllbGRzL3RpbWUnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0RhdGVUaW1lJywgbGluazogJy96aC9mb3JtL2d1aWRlL2ZpZWxkcy9kYXRldGltZScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnUGhvbmUnLCBsaW5rOiAnL3poL2Zvcm0vZ3VpZGUvZmllbGRzL3Bob25lJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdFbWFpbCcsIGxpbms6ICcvemgvZm9ybS9ndWlkZS9maWVsZHMvZW1haWwnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0RhdGVSYW5nZScsIGxpbms6ICcvemgvZm9ybS9ndWlkZS9maWVsZHMvZGF0ZS1yYW5nZScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnVXJsJywgbGluazogJy96aC9mb3JtL2d1aWRlL2ZpZWxkcy91cmwnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1NlYXJjaCcsIGxpbms6ICcvemgvZm9ybS9ndWlkZS9maWVsZHMvc2VhcmNoJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdDaGVja2JveCcsIGxpbms6ICcvemgvZm9ybS9ndWlkZS9maWVsZHMvY2hlY2tib3gnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0NoZWNrYm94R3JvdXAnLCBsaW5rOiAnL3poL2Zvcm0vZ3VpZGUvZmllbGRzL2NoZWNrYm94LWdyb3VwJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdDb2xvclBpY2tlcicsIGxpbms6ICcvemgvZm9ybS9ndWlkZS9maWVsZHMvY29sb3JwaWNrZXInIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0Nhc2NhZGVyJywgbGluazogJy96aC9mb3JtL2d1aWRlL2ZpZWxkcy9jYXNjYWRlcicgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnU3dpdGNoJywgbGluazogJy96aC9mb3JtL2d1aWRlL2ZpZWxkcy9zd2l0Y2gnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1JhZGlvJywgbGluazogJy96aC9mb3JtL2d1aWRlL2ZpZWxkcy9yYWRpbycgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnUmFkaW9CdXR0b24nLCBsaW5rOiAnL3poL2Zvcm0vZ3VpZGUvZmllbGRzL3JhZGlvLWJ1dHRvbicgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnTGlzdCcsIGxpbms6ICcvemgvZm9ybS9ndWlkZS9maWVsZHMvbGlzdCcgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnU2VsZWN0JywgbGluazogJy96aC9mb3JtL2d1aWRlL2ZpZWxkcy9zZWxlY3QnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1RyZWVTZWxlY3QnLCBsaW5rOiAnL3poL2Zvcm0vZ3VpZGUvZmllbGRzL3RyZWUtc2VsZWN0JyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdUcmVlRHJvcGRvd24nLCBsaW5rOiAnL3poL2Zvcm0vZ3VpZGUvZmllbGRzL3RyZWUtZHJvcGRvd24nIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1JhdGluZycsIGxpbms6ICcvemgvZm9ybS9ndWlkZS9maWVsZHMvcmF0aW5nJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdSYW5nZScsIGxpbms6ICcvemgvZm9ybS9ndWlkZS9maWVsZHMvcmFuZ2UnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1RleHRhcmVhJywgbGluazogJy96aC9mb3JtL2d1aWRlL2ZpZWxkcy90ZXh0YXJlYScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnVXBsb2FkJywgbGluazogJy96aC9mb3JtL2d1aWRlL2ZpZWxkcy91cGxvYWQnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1BhcnRzJywgbGluazogJy96aC9mb3JtL2d1aWRlL2ZpZWxkcy9wYXJ0cycgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnQ2FwdGNoYScsIGxpbms6ICcvemgvZm9ybS9ndWlkZS9maWVsZHMvY2FwdGNoYScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnVmVyaWZ5Q29kZScsIGxpbms6ICcvemgvZm9ybS9ndWlkZS9maWVsZHMvdmVyaWZ5LWNvZGUnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0lwQWRkcmVzcycsIGxpbms6ICcvemgvZm9ybS9ndWlkZS9maWVsZHMvaXBhZGRyZXNzJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdJY29ucycsIGxpbms6ICcvemgvZm9ybS9ndWlkZS9maWVsZHMvaWNvbnMnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0NvbWJpbmUnLCBsaW5rOiAnL3poL2Zvcm0vZ3VpZGUvZmllbGRzL2NvbWJpbmUnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0N1c3RvbScsIGxpbms6ICcvemgvZm9ybS9ndWlkZS9maWVsZHMvY3VzdG9tJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdRckNvZGUnLCBsaW5rOiAnL3poL2Zvcm0vZ3VpZGUvZmllbGRzL3FyY29kZScgfSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnXHU1QjU3XHU2QkI1XHU3RUM0JyxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdUYWJzJywgbGluazogJy96aC9mb3JtL2d1aWRlL2dyb3Vwcy90YWJzJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdDb2xsYXBzZScsIGxpbms6ICcvemgvZm9ybS9ndWlkZS9ncm91cHMvY29sbGFwc2UnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1x1NzkzQVx1NEY4QicsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFt7IHRleHQ6ICdcdTdFRkNcdTU0MDgnLCBsaW5rOiAnL2V4YW1wbGVzL2RlbW8uaHRtbCcsIHRhcmdldDogJ19ibGFuaycgfV0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc29jaWFsTGlua3M6IFt7IGljb246ICdnaXRodWInLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3poYW5nZmlzaGVyL2F1dG9zdG9yZS8nIH1dLFxyXG4gICAgfSxcclxuICAgIHZ1ZToge1xyXG4gICAgICAgIHRlbXBsYXRlOiB7XHJcbiAgICAgICAgICAgIGNvbXBpbGVyT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgd2hpdGVzcGFjZTogJ3ByZXNlcnZlJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIG1hcmtkb3duOiB7XHJcbiAgICAgICAgY29uZmlnKG1kKSB7XHJcbiAgICAgICAgICAgIG1kLnVzZSh2aXRlcHJlc3NEZW1vUGx1Z2luLCB7XHJcbiAgICAgICAgICAgICAgICBkZW1vRGlyOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vZGVtb3MnKSxcclxuICAgICAgICAgICAgICAgIHN0YWNrYmxpdHo6IHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvZGVzYW5kYm94OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAwMDAwLFxyXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICAgICAgICBtYW51YWxDaHVua3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBcdTVDMDZcdThGODNcdTU5MjdcdTc2ODRcdTRGOURcdThENTZcdTk4NzlcdTUyMDZcdTdFQzRcdTUyMzBcdTUzNTVcdTcyRUNcdTc2ODRcdTU3NTdcdTRFMkRcclxuICAgICAgICAgICAgICAgICAgICB2ZW5kb3I6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInXSxcclxuICAgICAgICAgICAgICAgICAgICBzaGlraTogWydzaGlraScsICdAc2hpa2lqcy92aXRlcHJlc3MtdHdvc2xhc2gnXSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBcdTZERkJcdTUyQTBcdTUxNzZcdTRFRDZcdTU5MjdcdTU3OEJcdTRGOURcdThENTZcdTk4NzlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB2aXRlOiB7XHJcbiAgICAgICAgYnVpbGQ6IHtcclxuICAgICAgICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAyMDAwLCAvLyBcdTVDMDZcdTk2NTBcdTUyMzZcdTYzRDBcdTlBRDhcdTUyMzAgMTAwMEtCXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFWLE9BQU8sVUFBVTtBQUN0VyxTQUFTLG9CQUFvQjtBQUM3QixTQUFTLDJCQUEyQjtBQUZwQyxJQUFNLG1DQUFtQztBQUl6QyxJQUFPLGlCQUFRLGFBQWE7QUFBQSxFQUN4QixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFDYixhQUFhO0FBQUE7QUFBQSxJQUVULFNBQVM7QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFBQSxJQUNoQjtBQUFBO0FBQUEsSUFFQSxLQUFLO0FBQUEsTUFDRCxFQUFFLE1BQU0sZ0JBQU0sTUFBTSxJQUFJO0FBQUEsTUFDeEIsRUFBRSxNQUFNLHNCQUFPLE1BQU0sYUFBYTtBQUFBLE1BQ2xDLEVBQUUsTUFBTSxTQUFTLE1BQU0sYUFBYTtBQUFBLE1BQ3BDLEVBQUUsTUFBTSxnQkFBTSxN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
