import path from 'path';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
// import { codeInspectorPlugin } from 'code-inspector-plugin';
export default {
    base: '/autostore/',
    title: "AutoStore",
    description: "极致优雅的全自动React状态库",
    vue: {
        template: {
            compilerOptions: {
                whitespace: 'preserve'
            }
        }
    },
    markdown: {
      config(md) {
        md.use(vitepressDemoPlugin, {
          demoDir: path.resolve(__dirname, '../../demos'),
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
}
