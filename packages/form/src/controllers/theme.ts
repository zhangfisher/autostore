import { ReactiveController, ReactiveControllerHost } from 'lit';

export class ThemeController implements ReactiveController {
    host: ReactiveControllerHost;


    constructor(host: ReactiveControllerHost) {
        (this.host = host).addController(this);
    }
    hostConnected() {
        const host: any = this.host
        if (host.hasAttribute('dark')) {
            host.classList.add('sl-theme-dark')
            host.style.color = 'var(--sl-color-neutral-900,white)'
            host.shadowRoot.ownerDocument.style = host.style.color
        }
    }
    _toDark() {
        const host = this.host! as unknown as HTMLElement
        host.classList.add('sl-theme-dark')
        host.style.color = 'var(--sl-color-neutral-900,white)'
    }
    _toLight() {
        const host = this.host! as unknown as HTMLElement
        host.classList.remove('sl-theme-dark')
        host.style.color = 'var(--sl-color-neutral-1000)'
    }
    hostUpdate() {
        // @ts-ignore
        if (this.host.dark) {
            this._toDark()
        } else {
            this._toLight()
        }
    }
}