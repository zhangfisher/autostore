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

import { query, state } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import { AutoStore, type Dict } from 'autostore';
import type { AutoForm } from '@/form';
import styles from '../form/styles';

export type AutoFormGroupItem = {
    el: AutoForm;
    group: string;
    label?: string | null;
    name?: string | null;
    icon?: string | null;
    title?: string | null;
    active: boolean;
};

export class AutoFormGroupBase extends LitElement {
    static styles = [
        styles,
        css`
            :host {
                display: block;
                width: 100%;
            }
        `,
    ] as any;

    @query('slot')
    slotElement!: HTMLSlotElement;

    store?: AutoStore<Dict>;

    @state()
    groups: AutoFormGroupItem[] = [];

    @state()
    active?: string;

    connectedCallback() {
        super.connectedCallback();
        this.updateComplete.then(() => this.onSlotChange());
    }

    bind(store: AutoStore<Dict>) {
        this.store = store;
        if (this.groups) {
            this.groups.forEach((group) => {
                group.el.bind(store);
            });
        }
    }

    onSlotChange() {
        if (!this.slotElement) return;
        if (this.groups && this.groups.length > 0) return;
        const assignedElements = this.slotElement.assignedElements();
        this.groups = assignedElements
            .filter((el) => el.tagName.toLowerCase() === 'auto-form')
            .map((el, i) => {
                const formEl = el as AutoForm;
                if (this.store) formEl.bind(this.store);
                formEl.setAttribute('border', 'none');
                const group = formEl.dataset.group || '';
                const icon = formEl.dataset.icon || group;
                const label = formEl.dataset.label;
                const title = formEl.dataset.title;
                const name = formEl.dataset.name;
                const active = this.active == undefined ? (i == 0 ? true : false) : this.active.split(',').includes(group);
                return {
                    name,
                    active,
                    group,
                    icon,
                    title,
                    label,
                    el: formEl,
                };
            });
        this.requestUpdate();
    }
    renderGroups() {}
    render() {
        return html`
            ${this.renderGroups()}
            <slot @slotchange="${this.onSlotChange}" style="display: none;"></slot>
        `;
    }
}
