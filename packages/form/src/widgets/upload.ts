import { ImagePreview } from '@/controllers';
import { AutoField } from '@/field';
import { tag } from '@/utils/tag';
import type { SchemaUploadWidgetFile, SchemaUploadWidgetOptions } from 'autostore';
import { css, html, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';

const imageTypes = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.bmp', '.ico', '.apng', '.avif'];
const videoTypes = [
    '.mp4',
    '.webm',
    '.ogg',
    '.ogv',
    '.mov',
    '.avi',
    '.wmv',
    '.flv',
    '.mkv',
    '.m4v',
    '.3gp',
    '.mpeg',
    '.mpg',
    '.ts',
    '.m2ts',
    '.hevc',
    '.rm',
    '.rmvb',
    '.vob',
    '.asf',
];
function isImageFile(url: string | undefined) {
    if (!url) return false;
    if (typeof url !== 'string') return false;
    const path = url.split('?')[0];
    const fileName = path.split('/').pop();
    const fileExtension = fileName!.split('.').pop();
    // 检查文件扩展名是否在 imageTypes 数组中
    return imageTypes.includes(`.${fileExtension}`);
}
function isVideoFile(url: string | undefined) {
    if (!url) return false;
    if (typeof url !== 'string') return false;
    const path = url.split('?')[0];
    const fileName = path.split('/').pop();
    const fileExtension = fileName!.split('.').pop();
    // 检查文件扩展名是否在 imageTypes 数组中
    return videoTypes.includes(`.${fileExtension}`);
}

type UploadFile = {
    id: string;
    file: File;
    progress: number;
    status: 'done' | 'uploading' | 'error';
    error?: string;
    size?: number;
    value: SchemaUploadWidgetFile;
};

export type AutoFieldUploadOptions = Required<SchemaUploadWidgetOptions>;

@tag('auto-field-upload')
export class AutoFieldUpload extends AutoField<AutoFieldUploadOptions> {
    static styles = [
        AutoField.styles,
        css`
            .value {
                & auto-flex.files {
                    position: relative;
                    padding: 0px;
                    & > .file.default {
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 0.5rem;
                        border: var(--auto-border);
                        border-radius: var(--auto-border-radius);
                        background-color: var(--auto-workspace-color);
                        & > [name='remove'] {
                            cursor: pointer;
                            &:hover {
                                color: var(--auto-theme-color);
                            }
                        }
                        &.error {
                            border: 1px solid red;
                            background-color: #ff006221;
                            border-radius: var(--auto-border-radius);
                            color: red;
                        }
                        & > sl-icon {
                            cursor: pointer;
                            &:hover {
                                color: var(--auto-theme-color);
                            }
                        }
                    }
                    & > .file.preview {
                        position: relative;
                        display: flex;
                        border: var(--auto-border);
                        border-radius: var(--auto-border-radius);
                        background-color: var(--auto-workspace-color);
                        align-items: 0px;
                        &.error {
                            border: 1px solid red;
                            background-color: #ff006221;
                            border-radius: var(--auto-border-radius);
                            color: red;
                            & > .error {
                                position: absolute;
                                top: 0px;
                                left: 0px;
                                width: 100%;
                                height: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-direction: column;
                                font-size: 0.8rem;
                                & > * {
                                    padding: 4px 0px;
                                    cursor: pointer;
                                }
                                & > :last-child {
                                    font-size: 1rem;
                                }
                            }
                        }
                        & > img.content,
                        video.content,
                        .content {
                            width: 100%;
                            flex-grow: 1;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: var(--auto-border-color);
                            &.img {
                                object-fit: cover;
                            }
                        }
                        & > sl-icon[name='remove'] {
                            width: 16px;
                            height: 16px;
                            position: absolute;
                            display: none;
                            left: calc(100% - 8px);
                            top: -8px;
                            background-color: white;
                            border-radius: 8px;
                            cursor: pointer;
                            color: red;
                            z-index: 9;
                            &:hover {
                                color: var(--auto-theme-color);
                            }
                        }
                        &:hover > sl-icon[name='remove'] {
                            display: block;
                        }
                    }
                }
            }
            :host::part(after-actions) {
                text-align: right;
            }
            .indicator {
                border: 2px dashed var(--auto-border-color);
                border-radius: 4px;
                padding: 20px;
                text-align: center;
                cursor: pointer;
                color: var(--auto-gray-color);
                transition: all 0.2s ease;
                &.dragover {
                    border-color: #2196f3;
                    background: rgba(33, 150, 243, 0.1);
                }
                &:hover {
                    border-color: var(--auto-gray-color);
                }
            }
            .placeholder {
                border-radius: var(--auto-border-radius);
                padding: 0.5rem;
                color: var(--auto-gray-color);
                width: 100%;
            }
            .uploading.progressbar {
                position: absolute;
                background-color: rgba(0, 0, 0, 0.5);
                border-radius: var(--auto-border-radius);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                z-index: 1;
                &.hori {
                    left: 0px;
                    top: 0px;
                    width: 0px;
                    height: 100%;
                }
                &.vert {
                    left: 0px;
                    bottom: 100%;
                    width: 100%;
                    height: 0px;
                }
            }
        `,
    ] as any;

    @state()
    files: UploadFile[] = [];

    private fileInputRef: HTMLInputElement | null = null;
    // @ts-ignore
    private _imagePreview = new ImagePreview(this);

    private retryUpload(file: UploadFile) {
        this.startUpload(file.file, file.id);
    }

    getInitialOptions(): Record<string, any> {
        return {
            fileTypes: [],
            url: '',
            multiple: true,
            fileFieldName: 'files',
            preview: true,
            tips: '拖动文件到此处或点击选择文件上传',
            onResolve: this._defaultFileResolver.bind(this),
            onFileLabel: this._getDefaultFileLabel.bind(this),
            selector: 'auto',
            onlyFileUrl: true,
        };
    }
    _getDefaultFileLabel(file: string | SchemaUploadWidgetFile) {
        if (typeof file === 'string') {
            return file;
        } else {
            return file.title || file.url.split('/').slice(-1)[0];
        }
    }
    _createUploadInput() {
        // 创建文件输入元素
        this.fileInputRef = document.createElement('input');
        this.fileInputRef.type = 'file';
        this.fileInputRef.multiple = !!this.options?.multiple;

        if (this.options.fileTypes.length > 0) {
            // 文件输入元素的accept属性可以接受MIME类型和文件扩展名
            // 例如: "image/jpeg, .jpg, .png"
            this.fileInputRef.accept = this.options.fileTypes.filter((type) => type !== '*').join(',');
        }
        this.fileInputRef.style.display = 'none';
        this.fileInputRef.addEventListener('change', this.handleFileInputChange.bind(this));
        this.renderRoot.appendChild(this.fileInputRef);
    }

    firstUpdated() {
        this._createUploadInput();
    }

    private handleFileInputChange(e: Event) {
        const input = e.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;

        const files = Array.from(input.files);
        files.forEach((file) => this.uploadFile(file));

        // 重置input以便可以再次选择相同的文件
        input.value = '';
    }

    private handleDragOver(e: DragEvent) {
        e.preventDefault();
        const upload = this.renderRoot.querySelector('.upload');
        upload?.classList.add('dragover');
    }

    private handleDragLeave(e: DragEvent) {
        e.preventDefault();
        const upload = this.renderRoot.querySelector('.upload');
        upload?.classList.remove('dragover');
    }

    private handleDrop(e: DragEvent) {
        e.preventDefault();
        const upload = this.renderRoot.querySelector('.upload');
        upload?.classList.remove('dragover');

        if (!e.dataTransfer?.files) return;

        const files = Array.from(e.dataTransfer.files);
        if (!this.options?.multiple && files.length > 1) {
            alert('只能上传一个文件');
            return;
        }

        if (this.options?.fileTypes && this.options.fileTypes.length > 0) {
            const invalidFiles = files.filter((file) => {
                if (!this.options?.fileTypes) return false;
                return !this.options.fileTypes.some((type) => {
                    if (type === '*') return true;
                    if (type.startsWith('.')) {
                        // 检查文件扩展名
                        return file.name.toLowerCase().endsWith(type.toLowerCase());
                    } else {
                        // 检查MIME类型
                        return file.type.startsWith(type);
                    }
                });
            });
            if (invalidFiles.length > 0) {
                alert(`不支持的文件类型: ${invalidFiles.map((f) => f.name).join(', ')}`);
                return;
            }
        }
        files.forEach((file) => this.uploadFile(file));
    }

    private handleUploadClick() {
        this.fileInputRef?.click();
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 9);
    }

    private async uploadFile(file: File) {
        if (!this.options?.url) {
            throw new Error('Upload URL is not configured');
        }

        // 如果不允许多文件上传，则先清除之前的任务
        if (!this.options?.multiple) {
            this.files = [];
        }

        const task: UploadFile = {
            id: this.generateId(),
            file,
            progress: 0,
            status: 'uploading',
            value: {
                url: file.name,
            },
        };
        this.files.push(task);
        // 使用共享的上传逻辑
        return this.startUpload(file, task.id);
    }

    _updateFileRecord(fileId: string, data: Partial<UploadFile>) {
        const index = this.files.findIndex((t) => t.id === fileId);
        if (index === -1) return;
        this.files = [...this.files.slice(0, index), { ...this.files[index], ...data }, ...this.files.slice(index + 1)];
    }

    _getResponseError(request: XMLHttpRequest) {
        let errorMessage = '上传失败';
        try {
            // 尝试解析服务器返回的错误信息
            const response = JSON.parse(request.responseText);
            errorMessage = response.message || response.error || errorMessage;
        } catch {
            // 根据状态码提供友好的错误信息
            switch (request.status) {
                case 400:
                    errorMessage = '请求无效，请检查上传参数';
                    break;
                case 401:
                    errorMessage = '未授权，请先登录';
                    break;
                case 403:
                    errorMessage = '无权限上传文件';
                    break;
                case 413:
                    errorMessage = '文件太大';
                    break;
                case 415:
                    errorMessage = '不支持的文件类型';
                    break;
                case 500:
                    errorMessage = '服务器内部错误，请稍后重试';
                    break;
                case 503:
                    errorMessage = '服务暂时不可用，请稍后重试';
                    break;
                default:
                    errorMessage = `上传失败 (${request.status})`;
            }
        }
        return new Error(errorMessage);
    }

    _defaultFileResolver(response: any) {
        if (typeof response === 'string') {
            return response;
        } else if (typeof response === 'object') {
            if (!response.url) {
                throw new Error('上传响应缺少必要的url字段');
            }
            return response;
        }
    }

    _parseUploadResponse(responseText: string) {
        let result: any = {};
        try {
            Object.assign(result, JSON.parse(responseText));
        } catch {
            result = responseText;
        }
        if (typeof this.options.onResolve === 'function') {
            result = this.options.onResolve(result);
        }
        return result;
    }
    private async startUpload(file: File, fileId: string) {
        const fileIndex = this.files.findIndex((t) => t.id === fileId);
        if (fileIndex === -1) return;
        const fileRecord = this.files[fileIndex];

        return new Promise<void>((resolve, reject) => {
            const httpRequest = new XMLHttpRequest();
            const formData = new FormData();
            formData.append(this.options.fileFieldName, file);
            // 监听上传进度
            httpRequest.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const progress = Math.round((event.loaded / event.total) * 100);
                    this._updateFileRecord(fileId, {
                        progress,
                    });
                }
            };
            // 处理上传完成
            httpRequest.onload = () => {
                const fileIndex = this.files.findIndex((t) => t.id === fileId);
                if (fileIndex === -1) return;
                if (httpRequest.status >= 200 && httpRequest.status < 300) {
                    this._updateFileRecord(fileId, {
                        status: 'done',
                    });
                    try {
                        const response = this._parseUploadResponse(httpRequest.responseText);
                        this._updateFileRecord(fileId, {
                            value: response,
                        });
                        fileRecord.status = 'done';
                        this.onFieldChange();
                        resolve();
                    } catch {
                        const parseError = new Error('解析上传响应失败');
                        this.handleUploadError(fileId, parseError);
                        reject(parseError);
                    }
                } else {
                    const error = this._getResponseError(httpRequest);
                    this.handleUploadError(fileId, error);
                    reject(error);
                }
            };
            // 处理上传错误
            httpRequest.onerror = () => {
                const fileIndex = this.files.findIndex((t) => t.id === fileId);
                if (fileIndex === -1) return;
                const error = new Error('网络错误，请检查网络连接');
                this.handleUploadError(fileId, error);
                reject(error);
            };

            // 处理超时
            httpRequest.ontimeout = () => {
                const fileIndex = this.files.findIndex((t) => t.id === fileId);
                if (fileIndex === -1) return;
                const error = new Error('上传超时，请重试');
                this.handleUploadError(fileId, error);
                reject(error);
            };

            // 开始上传
            httpRequest.open('POST', this.options.url);

            // 注意：当使用FormData时，不要手动设置Content-Type
            // 浏览器会自动添加正确的Content-Type和boundary参数
            // 如果需要添加其他头部，可以在这里添加

            // 如果有自定义头部，可以在这里添加
            // 例如：xhr.setRequestHeader('Authorization', 'Bearer token');
            this._updateFileRecord(fileId, {
                progress: 0,
                status: 'uploading',
            });
            httpRequest.send(formData);
        });
    }

    private handleUploadError(fileId: string, error: Error) {
        this._updateFileRecord(fileId, {
            error: error.message,
            status: 'error',
        });
    }

    private deleteFile(fileId: string) {
        const index = this.files.findIndex((t) => t.id === fileId);
        if (index === -1) return;
        const file = this.files[index];
        const isUploading = file.status === 'uploading' || file.status === 'error';
        const removeFile = () => {
            // 只从tasks中删除任务，不影响files数组
            this.files = [...this.files.slice(0, index), ...this.files.slice(index + 1)];
        };
        if (isUploading) {
            // 如果在上传时删除，由于文件还没有上传，所以只需要从列表中删除即可
            removeFile();
        } else {
            // 如果在不在上传时删除，说明需要删除服务器上的文件
            // 需要调用onRemove回调来删除服务器上的文件，然后才真正删除
            if (typeof this.options.onRemove === 'function') {
                Promise.resolve(this.options.onRemove.call(this, file.value))
                    .then(() => {
                        removeFile();
                        this.onFieldChange();
                    })
                    .catch((e) => {
                        alert(e.message);
                    });
            } else {
                //如果没有提供onRemove回调，则直接删除
                removeFile();
                this.onFieldChange();
            }
        }
    }

    getInputValue() {
        if (this.options.multiple) {
            const files = this.files.map((file) => file.value);
            return this.options.onlyFileUrl ? files.map((file) => (typeof file === 'object' ? file.url : file)) : files;
        } else {
            const file = this.files.length > 0 ? this.files[0].value : undefined;
            if (file) {
                return this.options.onlyFileUrl ? (typeof file === 'object' ? file.url : file) : file;
            }
        }
    }

    getStateValue() {
        let value = super.getStateValue();
        if (!Array.isArray(value)) value = [value];
        this.files = value.map((v: any, index: number) => {
            const file = {
                id: String(index),
                file: undefined,
                progress: 0,
                status: 'done',
                error: undefined,
                value: undefined,
            } as any;
            if (typeof v === 'string') {
                file.value = v;
            } else if (typeof v === 'object') {
                file.value = Object.assign({}, file.value, v);
            }
            return file;
        });
        return value;
    }

    renderProgressbar(file: UploadFile, dir: 'hori' | 'vert') {
        if (file.status !== 'uploading') return;
        const style = dir === 'hori' ? `width:${file.progress}%;` : `height:${file.progress}%;top:${100 - file.progress}%`;
        return html`<span
            class="uploading progressbar ${classMap({
                hori: dir === 'hori',
                vert: dir === 'vert',
            })}"
            style="${style}"
        >
            <span class="value">${file.progress}%</span>
        </span> `;
    }

    renderFileContent(file: UploadFile) {
        if (file.error) return;
        const url = typeof file.value === 'string' ? file.value : file.value.url;
        let previewResult: TemplateResult;
        if (isImageFile(url)) {
            previewResult = html` <img class="content" src="${url}" /> `;
        } else if (isVideoFile(url)) {
            previewResult = html` <video class="content" src="${url}"></video> `;
        } else {
            let extName = url.split('?')[0].split('.').slice(-1)[0];
            extName = extName.length === 0 ? 'FILE' : `.${extName.toUpperCase()}`;
            previewResult = html`<div class="content">${extName}</div>`;
        }
        return previewResult;
    }

    renderFilePreview(file: UploadFile) {
        const hasError = !!file.error;
        // 预览框大小
        const size = typeof this.options.preview === 'boolean' ? '80px' : this.options.preview;
        return html`
            <div
                class="file preview ${classMap({ error: hasError })}"
                title=${file.error || this.options.onFileLabel(file.value)}
                style="${styleMap({
                    width: size,
                    height: size,
                })}"
            >
                ${this.renderFileContent(file)} ${this.renderProgressbar(file, 'vert')}
                ${when(
                    file.status === 'error',
                    () => {
                        return html`<div class="error" title="${file.error!}">
                            <span>上传出错</span>
                            <span>
                                <sl-icon name="remove" title="取消上传" @click=${() => this.deleteFile(file.id)}></sl-icon>
                                <sl-icon name="refresh" title="重新上传" @click=${() => this.retryUpload(file)}></sl-icon>
                            </span>
                        </div>`;
                    },
                    () => {
                        if (this.context.viewonly) return;
                        return html`<sl-icon name="remove" @click=${() => this.deleteFile(file.id)}></sl-icon>`;
                    },
                )}
            </div>
        `;
    }

    renderFile(file: UploadFile) {
        const hasError = !!file.error;
        return html`
            <auto-flex class="file default ${classMap({ error: hasError })}" wrap align="center" gap="0.5rem" title=${ifDefined(file.error)}>
                ${this.renderProgressbar(file, 'hori')}
                <span class="label">${this.options.onFileLabel(file.value)}</span>
                <sl-icon name="remove" @click=${() => this.deleteFile(file.id)}></sl-icon>
                ${when(file.status === 'error', () => {
                    return html`<sl-icon name="refresh" title="重新上传" @click=${() => this.retryUpload(file)}></sl-icon>`;
                })}
            </auto-flex>
        `;
    }

    renderFiels() {
        return html`<auto-flex class="files" grow="none" gap="0.5rem" wrap>
            ${when(
                this.files.length > 0,
                () => {
                    return repeat(this.files, (file) => {
                        if (this.options.preview) {
                            return this.renderFilePreview(file);
                        } else {
                            return this.renderFile(file);
                        }
                    });
                },
                () => {
                    return html`<span class="placeholder">${this.options.placeholder || '暂无文件'}</span>`;
                },
            )}
        </auto-flex>`;
    }

    renderInput() {
        return html`
            <auto-flex grow="none" gap="0.5rem" direction="column">
                ${this.renderFiels()}
                ${when(this.options.selector === 'rectangle' || (this.options.selector === 'auto' && this.options.multiple), () => {
                    return html`<div
                        class="indicator"
                        @click=${this.handleUploadClick}
                        @dragover=${this.handleDragOver}
                        @dragleave=${this.handleDragLeave}
                        @drop=${this.handleDrop}
                    >
                        ${this.options.tips}
                    </div>`;
                })}
                <auto-flex class="actions" align="center" grow=".actions.after" gap="0.5rem">
                    ${when(
                        this.options.selector === 'button' || (this.options.selector === 'auto' && !this.options.multiple),
                        () => html`<sl-button @click=${this.handleUploadClick}>选择文件</sl-button>`,
                    )}
                    ${this.renderActions(false)}
                </auto-flex>
            </auto-flex>
        `;
    }
    renderView() {
        return this.renderFiels();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-upload': AutoFieldUpload;
    }
}
