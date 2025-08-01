import type { AutoForm } from '@/form';
import type { ReactiveController } from 'lit';

export class ContextController implements ReactiveController {
    host: AutoForm;
    constructor(host: any) {
        this.host = host;
        host.addController(this);
    }
    // hostConnected() {
    //     const host: any = this.host;
    // }
    // _toDark() {
    //     const host = this.host! as unknown as HTMLElement;
    //     host.classList.add('sl-theme-dark');
    //     if (this.host.ownerDocument) {
    //         this.host.ownerDocument.body.classList.add('dark');
    //     }
    //     // host.style.color = 'var(--sl-color-neutral-900,white)';
    // }
    // _toLight() {
    //     const host = this.host! as unknown as HTMLElement;
    //     host.classList.remove('sl-theme-dark');
    //     if (this.host.ownerDocument) {
    //         this.host.ownerDocument.body.classList.remove('dark');
    //     }
    //     // host.style.color = 'var(--sl-color-neutral-1000)';
    // }
    updateContext() {
        Object.assign(this.host.context, {
            labelPos: this.host.labelPos,
            labelWidth: this.host.labelWidth,
            readonly: this.host.readonly,
            viewonly: this.host.viewonly,
            viewAlign: this.host.viewAlign,
            compact: this.host.compact,
            border: this.host.border,
            group: this.host.group,
            layout: this.host.layout,
            advanced: this.host.advanced,
            validAt: this.host.validAt,
            size: this.host.size,
        });
    }
    hostUpdate() {
        if (this.host.tagName === 'AUTO-FORM') {
            this.updateContext();
        }
        // @ts-ignore
        // if (this.host.dark) {
        //     this._toDark();
        // } else {
        //     this._toLight();
        // }
    }
}
