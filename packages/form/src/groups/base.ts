/**
 *
 * <auto-form-tabs direction="top" active='a'>
 *  <auto-form group='a' icon='a' title="">
 *  <auto-form group='b' icon='a' title="">
 *  <auto-form group='c' icon='a' title="">
 *  <auto-form group='d' icon='a' title="">
 * </autoform-tabs>
 *
 *
 */

import { query, state, property } from "lit/decorators.js";
import { css, html, LitElement } from "lit";
import type { AutoStore, Dict } from "autostore";
import styles from "../form/styles";
import { scrollbar } from "@/styles/utils";
import { registerIcons } from "@/utils";

export class AutoFormGroupBase extends LitElement {
	static styles = [
		styles,
		scrollbar,
		css`
            :host {
                display: block;
                width: 100%;
                background-color: var(--auto-bgcolor);
                    font: var(--auto-font);
            }
        `,
	] as any;
	// theme = new ThemeController(this);

	@query("slot")
	slotElement!: HTMLSlotElement;

	store?: AutoStore<Dict>;

	@property()
	active?: string;
	@state()
	forms: Array<HTMLElement> = [];

	constructor() {
		super();
		registerIcons();
	}

	firstUpdated() {
		this.forms = this.getForms();
		if (this.forms.length === 0) {
			setTimeout(() => {
				this.forms = this.getForms();
			});
		}
	}
	getForms() {
		const slot = this.shadowRoot!.querySelector("slot");
		if (slot) {
			return slot.assignedElements({ flatten: true }) as any;
		} else {
			return [];
		}
	}
	bind(store: AutoStore<Dict>) {
		this.store = store;
		if (this.forms) {
			this.forms.forEach((group) => {
				// @ts-ignore
				if (group.bind) group.bind(store);
			});
		}
	}

	getFormInfo(formEl: any, i: number) {
		const icon = formEl.getAttribute("icon") || formEl.dataset.icon;
		const label = formEl.getAttribute("label") || formEl.dataset.label;
		const title = formEl.getAttribute("title") || formEl.dataset.title;
		const name = formEl.getAttribute("name") || formEl.dataset.name || "";
		const active = !this.active ? i === 0 : this.active.split(",").includes(name);
		return { icon, label, title, name, active };
	}

	renderGroups() {}
	render() {
		return html`
            ${this.renderGroups()}
            <slot style="display: none"></slot>
        `;
	}
}
