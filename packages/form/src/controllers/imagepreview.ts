import type { ReactiveController } from 'lit';
import type { LitElement } from 'lit';

export type ImagePreviewOptions = {
    selector?: string;
    overlayColor?: string;
    overlayOpacity?: number;
    animationDuration?: number;
}

/**
 * 当点击组件内部的任意指定的img时:
 * - 覆盖显示一个全局半透明的黑色背景
 * - 同时将图片从原始位置动画恢复显示在黑色背景中间
 * - 点击图片或黑色背景时恢复
 * 
 */
export class ImagePreview implements ReactiveController {
    host: LitElement;
    options: Required<ImagePreviewOptions> = {
        selector: 'img',
        overlayColor: '#000',
        overlayOpacity: 0.8,
        animationDuration: 300
    };

    private overlay: HTMLDivElement | null = null;
    private previewImage: HTMLImageElement | null = null;
    private originalImage: HTMLImageElement | null = null;
    private clickHandler: ((e: Event) => void) | null = null;
    private resizeHandler: ((e: UIEvent) => void) | null = null;
    private keydownHandler: ((e: KeyboardEvent) => void) | null = null;
    private isPreviewActive = false;

    constructor(host: LitElement, options?: ImagePreviewOptions) {
        this.host = host;
        this.options = { ...this.options, ...options };
        host.addController(this);
        this.clickHandler = this.handleImageClick.bind(this);
        this.resizeHandler = this.handleResize.bind(this);
        this.keydownHandler = this.handleKeydown.bind(this);
    }

    /**
     * 当宿主元素连接到DOM时调用的生命周期方法
     */
    hostConnected() {
        if (this.clickHandler && this.host.shadowRoot) {
            // 在 shadowRoot 中添加事件监听器，而不是在宿主元素上
            this.host.shadowRoot.addEventListener('click', this.clickHandler);
        }
    }

    hostDisconnected() {
        if (this.clickHandler && this.host.shadowRoot) {
            // 从 shadowRoot 中移除事件监听器
            this.host.shadowRoot.removeEventListener('click', this.clickHandler);
        }
        this.removePreview();
    }

    /**
     * 处理图片点击事件
     */
    private handleImageClick(e: Event) {
        const target = e.target as HTMLElement;

        // 如果预览已激活，则关闭预览
        if (this.isPreviewActive) {
            this.closePreview();
            return;
        }

        // 检查点击的是否是符合选择器的图片元素
        if (target.matches(this.options.selector)) {
            e.preventDefault();
            e.stopPropagation();
            this.originalImage = target as HTMLImageElement;
            this.showPreview(this.originalImage);
        }
    }

    /**
     * 显示图片预览
     * 注意：此方法不会修改原始图片的任何样式，而是创建一个新的图片元素用于预览
     */
    private showPreview(img: HTMLImageElement) {
        // 如果已经有预览激活，先移除它
        if (this.isPreviewActive) {
            this.removePreview();
        }
        // 创建覆盖层
        this.overlay = document.createElement('div');
        this.overlay.style.position = 'fixed';
        this.overlay.style.top = '0';
        this.overlay.style.left = '0';
        this.overlay.style.width = '100%';
        this.overlay.style.height = '100%';
        // 将背景色和透明度合并为 rgba 值
        const color = this.options.overlayColor;
        const rgb = this.hexToRgb(color);
        this.overlay.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`;
        this.overlay.style.transition = `background-color ${this.options.animationDuration}ms ease`;
        this.overlay.style.zIndex = '9999';
        this.overlay.style.display = 'flex';
        this.overlay.style.alignItems = 'center';
        this.overlay.style.justifyContent = 'center';
        this.overlay.style.cursor = 'pointer';

        // 创建预览图片
        this.previewImage = document.createElement('img');
        this.previewImage.src = img.src;
        this.previewImage.alt = img.alt;
        this.previewImage.style.maxWidth = '90%';
        this.previewImage.style.maxHeight = '90%';
        this.previewImage.style.objectFit = 'contain';
        this.previewImage.style.cursor = 'pointer';
        this.previewImage.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        this.previewImage.style.transition = `all ${this.options.animationDuration}ms ease-out`;

        // 获取原始图片的位置和尺寸
        const imgRect = img.getBoundingClientRect();

        // 设置预览图片的初始位置和尺寸，与原始图片一致
        this.previewImage.style.position = 'absolute';
        this.previewImage.style.top = `${imgRect.top}px`;
        this.previewImage.style.left = `${imgRect.left}px`;
        this.previewImage.style.width = `${imgRect.width}px`;
        this.previewImage.style.height = `${imgRect.height}px`;
        this.previewImage.style.transform = 'none';

        // 将覆盖层和预览图片添加到文档中
        this.overlay.appendChild(this.previewImage);
        document.body.appendChild(this.overlay);

        // 添加点击事件监听器
        this.overlay.addEventListener('click', this.closePreview.bind(this));

        // 防止点击图片时关闭预览（可选）
        this.previewImage.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // 强制重排，以便动画正常工作
        void this.overlay.offsetWidth;

        // 显示覆盖层，使用 rgba 设置背景色和透明度
        this.overlay.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.options.overlayOpacity})`;

        // 计算预览图片的目标位置和尺寸，保持原始比例
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // 计算保持原始比例的尺寸
        const { width: targetWidth, height: targetHeight } = this.calculateAspectRatioFit(
            img.naturalWidth,
            img.naturalHeight,
            viewportWidth * 0.9,
            viewportHeight * 0.9
        );

        const targetTop = (viewportHeight - targetHeight) / 2;
        const targetLeft = (viewportWidth - targetWidth) / 2;

        // 动画过渡到目标位置和尺寸
        // 使用 requestAnimationFrame 确保在下一帧应用样式变化，提高动画流畅度
        requestAnimationFrame(() => {
            this.previewImage!.style.top = `${targetTop}px`;
            this.previewImage!.style.left = `${targetLeft}px`;
            this.previewImage!.style.width = `${targetWidth}px`;
            this.previewImage!.style.height = `${targetHeight}px`;
        });

        // 添加窗口大小变化和键盘事件的监听器
        window.addEventListener('resize', this.resizeHandler!);
        window.addEventListener('keydown', this.keydownHandler!);
        this.isPreviewActive = true;
    }

    /**
     * 处理窗口大小变化事件
     */
    private handleResize() {
        // 如果预览未激活或缺少必要元素，则不执行任何操作
        if (!this.isPreviewActive || !this.previewImage || !this.originalImage) return;

        // 重新计算预览图片的位置和尺寸
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // 计算保持原始比例的尺寸
        const { width: targetWidth, height: targetHeight } = this.calculateAspectRatioFit(
            this.originalImage.naturalWidth,
            this.originalImage.naturalHeight,
            viewportWidth * 0.9,
            viewportHeight * 0.9
        );

        const targetTop = (viewportHeight - targetHeight) / 2;
        const targetLeft = (viewportWidth - targetWidth) / 2;

        // 应用新的位置和尺寸
        requestAnimationFrame(() => {
            if (this.previewImage) {
                this.previewImage.style.top = `${targetTop}px`;
                this.previewImage.style.left = `${targetLeft}px`;
                this.previewImage.style.width = `${targetWidth}px`;
                this.previewImage.style.height = `${targetHeight}px`;
            }
        });
    }

    /**
     * 处理键盘事件
     * @param e 键盘事件
     */
    private handleKeydown(e: KeyboardEvent) {
        // 如果按下 Escape 键，关闭预览
        if (e.key === 'Escape' && this.isPreviewActive) {
            this.closePreview();
        }
    }

    /**
     * 关闭图片预览
     */
    private closePreview() {
        if (!this.overlay || !this.previewImage || !this.originalImage) return;

        // 获取原始图片的位置和尺寸
        const imgRect = this.originalImage.getBoundingClientRect();

        // 动画过渡回原始位置和尺寸
        // 使用 requestAnimationFrame 确保在下一帧应用样式变化，提高动画流畅度
        requestAnimationFrame(() => {
            this.previewImage!.style.top = `${imgRect.top}px`;
            this.previewImage!.style.left = `${imgRect.left}px`;
            this.previewImage!.style.width = `${imgRect.width}px`;
            this.previewImage!.style.height = `${imgRect.height}px`;
        });

        // 淡出覆盖层，使用 rgba 设置背景色和透明度
        const rgb = this.hexToRgb(this.options.overlayColor);
        this.overlay.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`;

        // 动画结束后移除元素
        setTimeout(() => {
            this.removePreview();
        }, this.options.animationDuration);

        this.isPreviewActive = false;
    }

    /**
     * 计算保持原始比例的图片尺寸
     * @param srcWidth 原始宽度
     * @param srcHeight 原始高度
     * @param maxWidth 最大宽度
     * @param maxHeight 最大高度
     * @returns 计算后的宽度和高度
     */
    private calculateAspectRatioFit(
        srcWidth: number,
        srcHeight: number,
        maxWidth: number,
        maxHeight: number
    ): { width: number; height: number } {
        // 如果原始尺寸已经小于最大尺寸，则直接返回原始尺寸
        if (srcWidth <= maxWidth && srcHeight <= maxHeight) {
            return { width: srcWidth, height: srcHeight };
        }

        const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        return {
            width: srcWidth * ratio,
            height: srcHeight * ratio
        };
    }

    /**
     * 将十六进制颜色转换为 RGB 值
     */
    private hexToRgb(hex: string): { r: number, g: number, b: number } {
        // 移除 # 前缀（如果有）
        hex = hex.replace(/^#/, '');

        // 处理缩写形式（如 #fff）
        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }

        // 解析 RGB 值
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        // 如果解析失败，返回黑色
        return {
            r: isNaN(r) ? 0 : r,
            g: isNaN(g) ? 0 : g,
            b: isNaN(b) ? 0 : b
        };
    }

    /**
     * 移除预览元素
     */
    private removePreview() {
        if (this.overlay && document.body.contains(this.overlay)) {
            document.body.removeChild(this.overlay);
        }

        // 移除窗口大小变化和键盘事件的监听器
        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
        }

        if (this.keydownHandler) {
            window.removeEventListener('keydown', this.keydownHandler);
        }

        this.overlay = null;
        this.previewImage = null;
        this.originalImage = null;
    }
}