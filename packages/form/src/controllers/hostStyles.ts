import type { ReactiveController } from 'lit';

/**
 * 用于为组件的host动态增加内联样式
 */
export class HostStyles implements ReactiveController {
    host: HTMLElement;
    initialStyles: Record<string, string>[] = [];

    constructor(host: any, ...styles: Record<string, string>[]) {
        this.host = host
        host.addController(this);
        this.initialStyles = styles;
    }

    _forEachStyle(styles: Record<string, string>[], cb: (property: string, value: string) => void) {
        if (!styles) return;
        styles.forEach((styleObj) => {
            Object.entries(styleObj).forEach(([property, value]) => {
                cb(property, value);
            });
        });
    }

    add(...styles: Record<string, string>[]) {
        if (!this.host) return;
        this._forEachStyle(styles, (property, value) => {
            this.host.style.setProperty(property, value);
        });
    }

    remove(...properties: string[]) {
        if (!this.host) return;
        properties.forEach(property => {
            this.host.style.removeProperty(property);
        });
    }

    /**
     * 应用或移除样式
     * @param styles 样式对象，key是样式字符串，value是布尔值表示是否应用此样式
     * @returns 
     */
    toggle(...styles: Record<string, boolean>[]) {
        if (!this.host) return;
        styles.forEach(styleObj => {
            Object.entries(styleObj).forEach(([styleStr, apply]) => {
                if (apply) {
                    // 如果为true，应用样式字符串
                    const stylePairs = styleStr.split(';').filter(s => s.trim());
                    stylePairs.forEach(pair => {
                        const [property, value] = pair.split(':').map(s => s.trim());
                        if (property && value) {
                            this.host.style.setProperty(property, value);
                        }
                    });
                } else {
                    // 如果为false，从样式字符串中提取属性并移除
                    const stylePairs = styleStr.split(';').filter(s => s.trim());
                    stylePairs.forEach(pair => {
                        const [property] = pair.split(':').map(s => s.trim());
                        if (property) {
                            this.host.style.removeProperty(property);
                        }
                    });
                }
            });
        });
    }

    has(property: string): boolean {
        return !!this.host.style.getPropertyValue(property);
    }

    /**
     * 当宿主元素连接到DOM时调用的生命周期方法
     */
    hostConnected() {
        this.add(...this.initialStyles);
    }

    hostDisconnected() {
        // 可以选择是否在断开连接时移除样式
        // 这里我们保持与原代码一致，移除初始样式
        this.initialStyles.forEach(styleObj => {
            Object.keys(styleObj).forEach(property => {
                this.host.style.removeProperty(property);
            });
        });
    }
}