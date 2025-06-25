import { defineConfig } from 'tsup'
import AnalyzerPlugin from 'esbuild-analyzer'

// import copy from "esbuild-copy-files-plugin";


// const widgets = [
//     'captcha.ts',
//     'checkbox-group.ts',
//     'checkbox.ts',
//     'color-picker.ts',
//     'date.ts',
//     'dropdown.ts',
//     'email.ts',
//     'input.ts',
//     'ipaddress.ts',
//     'list.ts',
//     'number.ts',
//     'parts.ts',
//     'password.ts',
//     'phone.ts',
//     'qrcode.ts',
//     'radio-button.ts',
//     'radio.ts',
//     'range.ts',
//     'rating.ts',
//     'search.ts',
//     'select.ts',
//     'sms-captcha.ts',
//     'switch.ts',
//     'textarea.ts',
//     'time.ts',
//     'tree-dropdown.ts',
//     'tree-select.ts',
//     'url.ts',
// ]

export default defineConfig([
    {
        entry: [
            'src/index.ts',
        ],
        format: ['esm', 'cjs', 'iife'],
        dts: true,
        splitting: true,
        sourcemap: true,
        globalName: 'AutoForm',
        clean: true,
        treeshake: true,
        minify: true,
        noExternal: ['flex-tools', 'autostore'],
        esbuildPlugins: [
            AnalyzerPlugin()
        ],
    },
])
