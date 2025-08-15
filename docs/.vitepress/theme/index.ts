// https://vitepress.dev/guide/custom-theme
// @ts-ignore
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import { LiteTree } from "@lite-tree/vue";
import "@lite-tree/icons/filetypes.css";
import Tree from "./Tree.vue";

// @noErrors: true
// .vitepress/theme/index.ts
import TwoslashFloatingVue from "@shikijs/vitepress-twoslash/client";

import "@shikijs/vitepress-twoslash/style.css";
import "themepro/styles";

//@ts-ignore
if (!import.meta.env.SSR) {
 //@ts-ignore
  import('themepro')
}

export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			// https://vitepress.dev/guide/extending-default-theme#layout-slots
		});
	},
	enhanceApp({ app }) {
		// ...
		app.component("LiteTree", LiteTree);
		app.component("Tree", Tree);
		app.use(TwoslashFloatingVue);
	},
} satisfies Theme;
