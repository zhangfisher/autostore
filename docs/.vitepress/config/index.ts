import { defineConfig } from 'vitepress'
import en from './en'
import zh from './zh' 
import share from './share'

export default defineConfig({
    ...share,
    locales: {
        // @ts-ignore
        root: { label: '简体中文', ...zh,link: '/' },
        // @ts-ignore
        en: { label: 'English', ...en }
    }
})