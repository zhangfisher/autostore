import type { AutoForm } from '@/form';
import type { ReactiveController } from 'lit';

export class ThemeController implements ReactiveController {
    host: AutoForm;
    constructor(host: any) {
        this.host = host;
        host.addController(this);
    }
    hostConnected() {
        const host: any = this.host;
        // if (host.hasAttribute('dark')) {
        //     host.classList.add('sl-theme-dark');
        //     host.shadowRoot.ownerDocument.style = host.style.color;
        // }
    }
    _toDark() {
        const host = this.host! as unknown as HTMLElement;
        host.classList.add('sl-theme-dark');
        if (this.host.ownerDocument) {
            this.host.ownerDocument.body.classList.add('dark');
        }
        // host.style.color = 'var(--sl-color-neutral-900,white)';
    }
    _toLight() {
        const host = this.host! as unknown as HTMLElement;
        host.classList.remove('sl-theme-dark');
        if (this.host.ownerDocument) {
            this.host.ownerDocument.body.classList.remove('dark');
        }
        // host.style.color = 'var(--sl-color-neutral-1000)';
    }
    hostUpdate() {
        // if (this.host.dark) {
        //     this._toDark();
        // } else {
        //     this._toLight();
        // }
    }
}
