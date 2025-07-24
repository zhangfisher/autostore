import { css, type ReactiveController } from 'lit';

// 扩展HTMLElement接口以支持我们添加的mouseDownHandler属性
interface ScrollbarHTMLElement extends HTMLElement {
    mouseDownHandler?: (e: MouseEvent) => boolean | void;
}

type ScrollbarOptions = {
    width?: string;
};
/**
 * 滚动条类，用于为元素添加自定义滚动条
 */
export class Scrollbar {
    private target: HTMLElement;
    private content: Element;
    private direction: string;
    private bar: ScrollbarHTMLElement | null;
    private mB: EventListenerOrEventListenerObject;
    private wrapper: HTMLDivElement;
    private el: HTMLDivElement;
    private scrollRatio: number;
    options: Required<ScrollbarOptions>;
    /**
     * 创建一个新的滚动条实例
     * @param el 要添加滚动条的HTML元素
     */
    constructor(el: HTMLElement, options?: ScrollbarOptions) {
        this.options = Object.assign(
            {
                width: '8px',
            },
            options,
        );
        this.target = el;
        this.content = el.firstElementChild as Element;
        this.direction = window.getComputedStyle(this.target).direction;
        this.scrollRatio = 1;
        this.bar = null;

        // 创建滚动条DOM结构
        this.wrapper = document.createElement('div');
        this.wrapper.setAttribute('class', 'ss-wrapper');

        this.el = document.createElement('div');
        this.el.setAttribute('class', 'ss-content');

        if (this.direction === 'rtl') {
            this.el.classList.add('rtl');
        }

        this.wrapper.appendChild(this.el);

        // 移动原始内容到新创建的结构中
        while (this.target.firstChild) {
            this.el.appendChild(this.target.firstChild);
        }
        this.target.appendChild(this.wrapper);

        // 添加滚动条元素
        this.target.insertAdjacentHTML('beforeend', `<div class="ss-scroll">`);
        this.bar = this.target.lastChild as HTMLElement;
        this.bar.style.width = this.options.width;

        // 绑定事件处理
        this.mB = this.moveBar.bind(this);
        this.dragDealer(this.bar);
        this.moveBar();

        // 添加事件监听
        window.addEventListener('resize', this.mB);
        this.el.addEventListener('scroll', this.mB);
        this.el.addEventListener('mouseenter', this.mB);

        this.target.classList.add('ss-container');

        // 处理高度设置
        const css = window.getComputedStyle(el) as any;
        if (css['height'] === '0px' && css['max-height'] !== '0px') {
            el.style.height = css['max-height'];
        }
    }

    /**
     * 处理滚动条拖动
     * @param el 滚动条元素
     */
    private dragDealer(el: HTMLElement): void {
        let lastPageY: number;

        const drag = (e: MouseEvent): void => {
            const delta = e.pageY - lastPageY;
            lastPageY = e.pageY;

            // 存储requestAnimationFrame的ID以便可以取消
            this.requestAnimationFrame(() => {
                if (this.el) {
                    // 确保元素仍然存在
                    this.el.scrollTop += delta / this.scrollRatio;
                }
            });
        };

        const stop = (): void => {
            el.classList.remove('ss-grabbed');
            document.body.classList.remove('ss-grabbed');
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stop);
        };

        // 存储mousedown事件处理函数的引用，以便在destroy时移除
        const mouseDownHandler = (e: MouseEvent) => {
            lastPageY = e.pageY;
            el.classList.add('ss-grabbed');
            document.body.classList.add('ss-grabbed');

            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stop);

            return false;
        };

        // 保存事件处理函数引用，以便在destroy时移除
        //@ts-ignore
        el.mouseDownHandler = mouseDownHandler;
        el.addEventListener('mousedown', mouseDownHandler);
    }

    /**
     * 动画帧请求的兼容实现
     */
    private requestAnimationFrame(callback: () => void) {
        window.requestAnimationFrame ? window.requestAnimationFrame(callback) : window.setTimeout(callback, 0);
    }

    /**
     * 更新滚动条位置和大小
     */
    private moveBar(): void {
        if (!this.el || !this.target) return; // 防止在对象销毁后调用

        const totalHeight = this.el.scrollHeight;
        const ownHeight = this.el.clientHeight;

        this.scrollRatio = ownHeight / totalHeight;

        const isRtl = this.direction === 'rtl';
        const right = isRtl && this.bar ? this.target.clientWidth - this.bar.clientWidth + 18 : this.bar ? (this.target.clientWidth - this.bar.clientWidth) * -1 : 0;

        this.requestAnimationFrame(() => {
            // Hide scrollbar if no scrolling is possible
            if (this.scrollRatio >= 1) {
                this.bar?.classList.add('ss-hidden');
            } else {
                this.bar?.classList.remove('ss-hidden');
                if (this.bar) {
                    this.bar.style.cssText = 'height:' + Math.max(this.scrollRatio * 100, 10) + '%; top:' + (this.el.scrollTop / totalHeight) * 100 + '%;right:' + right + 'px;';
                }
            }
        });
    }

    /**
     * 解绑所有事件并移除滚动条
     */
    public destroy() {
        // 移除事件监听
        window.removeEventListener('resize', this.mB);

        if (this.el) {
            this.el.removeEventListener('scroll', this.mB);
            this.el.removeEventListener('mouseenter', this.mB);
        }

        // 移除滚动条拖动事件
        if (this.bar?.mouseDownHandler) {
            this.bar.removeEventListener('mousedown', this.bar.mouseDownHandler);
            delete this.bar.mouseDownHandler;
        }

        if (this.target) {
            this.target.classList.remove('ss-container');

            // 恢复原始内容结构
            try {
                if (this.content && this.wrapper) {
                    this.target.insertBefore(this.content, this.wrapper);
                }
                if (this.wrapper) {
                    this.target.removeChild(this.wrapper);
                }
            } catch (e) {
                console.error('Error restoring DOM structure during scrollbar destroy:', e);
            }

            // 移除滚动条
            if (this.bar) {
                try {
                    this.target.removeChild(this.bar);
                } catch (e) {
                    console.error('Error removing scrollbar during destroy:', e);
                }
                this.bar = null;
            }
        }

        // 清理DOM引用以防止内存泄漏
        this.target = null as any;
        this.content = null as any;
        this.wrapper = null as any;
        this.el = null as any;
        this.mB = null as any;
    }
}

/**
 * 滚动条控制器，实现Lit的ReactiveController接口
 * 用于为组件添加自定义滚动条功能和样式
 */
export class ScrollbarController implements ReactiveController {
    host: any;

    /**
     * 滚动条相关的CSS样式
     */
    static styles = css`
        .ss-wrapper {
            overflow: hidden;
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 1;
            float: left;
        }

        .ss-content {
            height: 100%;
            width: calc(100% + 18px);
            padding: 0 0 0 0;
            position: relative;
            overflow-x: auto;
            overflow-y: scroll;
            box-sizing: border-box;
        }

        .ss-content.rtl {
            width: calc(100% + 18px);
            right: auto;
        }

        .ss-scroll {
            position: relative;
            background: rgba(0, 0, 0, 0.1);
            width: 8px;
            border-radius: 4px;
            top: 0;
            z-index: 2;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.25s linear;
        }

        .ss-hidden {
            display: none;
        }
        .ss-container {
            overflow-x: clip;
        }
        .ss-container:hover .ss-scroll,
        .ss-container:active .ss-scroll {
            opacity: 1;
        }

        .ss-grabbed {
            -o-user-select: none;
            -ms-user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            user-select: none;
        }
    `;
    _scrollbars: Scrollbar[] = [];
    /**
     * 创建一个新的滚动条控制器
     * @param host 宿主元素，通常是一个Lit组件
     */
    constructor(host: any) {
        this.host = host;
        host.addController(this);
    }
    create(el: any, options?: ScrollbarOptions) {
        const scrollbar = new Scrollbar(el, options);
        this._scrollbars.push(scrollbar);
        return scrollbar;
    }

    /**
     * 当宿主元素连接到DOM时调用的生命周期方法
     */
    hostConnected(): void {}

    /**
     * 当宿主元素更新时调用的生命周期方法
     */
    hostUpdate(): void {
        // 如果需要在更新时重新合并样式，可以在这里调用mergeStyles
    }

    hostDisconnected() {
        for (const scrollbar of this._scrollbars) {
            scrollbar.destroy();
        }
        this._scrollbars = [];
    }
}
