import { AutoField } from "@/field"
import type { SchemaUploadWidgetOptions } from "autostore"
import { css, html } from "lit"
import { customElement, state } from "lit/decorators.js"

type UploadTask = {
    id: string
    file: File
    progress: number
    status: 'uploading' | 'completed' | 'error'
    error?: string
}

type UploadItem = {
    name?: string
    url: string
}


export type AutoFieldUploadOptions = Required<SchemaUploadWidgetOptions>


@customElement('auto-field-upload')
export class AutoFieldUpload extends AutoField<AutoFieldUploadOptions> {
    static styles = [
        AutoField.styles,
        css`
            .upload {
                border: 2px dashed #ccc;
                border-radius: 4px;
                padding: 20px;
                text-align: center;
                cursor: pointer;
                margin-bottom: 10px;
                transition: all 0.2s ease;
            }
            .upload.dragover {
                border-color: #2196f3;
                background: rgba(33, 150, 243, 0.1);
            }
            .upload:hover {
                border-color: #999;
            }
            .files {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .file-item {
                display: flex;
                align-items: center;
                padding: 8px;
                border: 1px solid #eee;
                border-radius: 4px;
            }
            .file-name {
                flex: 1;
                margin-right: 10px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .progress-bar {
                height: 4px;
                background: #eee;
                border-radius: 2px;
                overflow: hidden;
                width: 100px;
            }
            .progress-fill {
                height: 100%;
                background: #2196f3;
                transition: width 0.3s ease;
            }
            .error {
                color: #f44336;
            }
            .file-actions {
                display: flex;
                gap: 5px;
            }
            .delete-btn {
                cursor: pointer;
                color: #f44336;
                border: none;
                background: none;
                font-size: 16px;
                padding: 0;
                margin: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                border-radius: 50%;
            }
            .delete-btn:hover {
                background: rgba(244, 67, 54, 0.1);
            }
            .hidden-input {
                display: none;
            }
            .retry-btn {
                cursor: pointer;
                color: #2196f3;
                border: none;
                background: none;
                font-size: 14px;
                padding: 2px 8px;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .retry-btn:hover {
                background: rgba(33, 150, 243, 0.1);
            }
        `
    ] as any

    private retryUpload(task: UploadTask) {
        // 更新任务状态为上传中
        const taskIndex = this.tasks.findIndex(t => t.id === task.id)
        if (taskIndex === -1) return

        this.tasks = [
            ...this.tasks.slice(0, taskIndex),
            { ...this.tasks[taskIndex], status: 'uploading', progress: 0, error: undefined },
            ...this.tasks.slice(taskIndex + 1)
        ]

        // 重新上传文件，但不创建新任务
        this.uploadFileWithTask(task.file, task.id)
    }

    @state()
    private tasks: UploadTask[] = []

    @state()
    files: UploadItem[] = []

    private fileInputRef: HTMLInputElement | null = null

    getInitialOptions(): Record<string, any> {
        return {
            fileTypes: [],
            url: '',
            multiple: true,
            fileFieldName: 'file',
            onResolve: this._resolveFileUrl.bind(this)
        }
    }

    _resolveFileUrl(response: any): UploadItem {
        // 默认的解析逻辑，与handleUploadResult中的默认逻辑相同
        if (!response.url) {
            throw new Error('上传响应缺少必要的url字段');
        }

        return {
            name: response.name || undefined,
            url: response.url
        };
    }

    /**
     * 处理上传结果
     * @param response - 上传接口返回的响应数据
     * @returns 解析后的上传项对象
     * @throws 当响应缺少url字段时抛出错误
     * @private 内部实现细节
     */
    private handleUploadResult(response: any): UploadItem {
        if (typeof this.options.onResolve === 'function') {
            // 使用自定义解析函数
            return this.options.onResolve(response);
        }

        // 默认解析逻辑
        if (!response.url) {
            throw new Error('上传响应缺少必要的url字段');
        }

        return {
            name: response.name || undefined,
            url: response.url
        };
    }


    firstUpdated() {
        // 创建文件输入元素
        this.fileInputRef = document.createElement('input')
        this.fileInputRef.type = 'file'
        this.fileInputRef.className = 'hidden-input'
        this.fileInputRef.multiple = !!this.options?.multiple

        if (this.options.fileTypes.length > 0) {
            // 文件输入元素的accept属性可以接受MIME类型和文件扩展名
            // 例如: "image/jpeg, .jpg, .png"
            this.fileInputRef.accept = this.options.fileTypes
                .filter(type => type !== '*')
                .join(',')
        }

        this.fileInputRef.addEventListener('change', this.handleFileInputChange.bind(this))
        this.renderRoot.appendChild(this.fileInputRef)
    }

    private handleFileInputChange(e: Event) {
        const input = e.target as HTMLInputElement
        if (!input.files || input.files.length === 0) return

        const files = Array.from(input.files)
        files.forEach(file => this.uploadFile(file))

        // 重置input以便可以再次选择相同的文件
        input.value = ''
    }

    private handleDragOver(e: DragEvent) {
        e.preventDefault()
        const upload = this.renderRoot.querySelector('.upload')
        upload?.classList.add('dragover')
    }

    private handleDragLeave(e: DragEvent) {
        e.preventDefault()
        const upload = this.renderRoot.querySelector('.upload')
        upload?.classList.remove('dragover')
    }

    private handleDrop(e: DragEvent) {
        e.preventDefault()
        const upload = this.renderRoot.querySelector('.upload')
        upload?.classList.remove('dragover')

        if (!e.dataTransfer?.files) return

        const files = Array.from(e.dataTransfer.files)
        if (!this.options?.multiple && files.length > 1) {
            alert('只能上传一个文件')
            return
        }

        if (this.options?.fileTypes && this.options.fileTypes.length > 0) {
            const invalidFiles = files.filter(file => {
                if (!this.options?.fileTypes) return false;
                return !this.options.fileTypes.some(type => {
                    if (type === '*') return true;
                    if (type.startsWith('.')) {
                        // 检查文件扩展名
                        return file.name.toLowerCase().endsWith(type.toLowerCase());
                    } else {
                        // 检查MIME类型
                        return file.type.startsWith(type);
                    }
                });
            })
            if (invalidFiles.length > 0) {
                alert(`不支持的文件类型: ${invalidFiles.map(f => f.name).join(', ')}`)
                return
            }
        }

        files.forEach(file => this.uploadFile(file))
    }

    private handleUploadClick() {
        this.fileInputRef?.click()
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 9)
    }

    private async uploadFile(file: File) {
        if (!this.options?.url) {
            throw new Error('Upload URL is not configured')
        }

        // 如果不允许多文件上传，则先清除之前的任务
        if (!this.options?.multiple) {
            this.tasks = []
        }

        const task: UploadTask = {
            id: this.generateId(),
            file,
            progress: 0,
            status: 'uploading'
        }
        this.tasks = [...this.tasks, task]

        // 使用共享的上传逻辑
        return this.performUpload(file, task.id)
    }

    private async uploadFileWithTask(file: File, taskId: string) {
        if (!this.options?.url) {
            throw new Error('Upload URL is not configured')
        }

        // 使用共享的上传逻辑，但使用现有任务ID
        return this.performUpload(file, taskId)
    }

    private async performUpload(file: File, taskId: string) {
        return new Promise<void>((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            const formData = new FormData()
            formData.append(this.options.fileFieldName, file)

            // 监听上传进度
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const progress = Math.round((event.loaded / event.total) * 100)
                    const taskIndex = this.tasks.findIndex(t => t.id === taskId)
                    if (taskIndex === -1) return

                    this.tasks = [
                        ...this.tasks.slice(0, taskIndex),
                        { ...this.tasks[taskIndex], progress },
                        ...this.tasks.slice(taskIndex + 1)
                    ]
                }
            }

            // 处理上传完成
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const taskIndex = this.tasks.findIndex(t => t.id === taskId)
                    if (taskIndex === -1) return

                    this.tasks = [
                        ...this.tasks.slice(0, taskIndex),
                        { ...this.tasks[taskIndex], status: 'completed' },
                        ...this.tasks.slice(taskIndex + 1)
                    ]

                    try {
                        const response = JSON.parse(xhr.responseText);
                        const result = this.handleUploadResult(response);
                        this.files = [...this.files, result];
                        this.updateValue();
                        resolve();
                    } catch (error) {
                        const parseError = new Error('解析上传响应失败');
                        this.handleUploadError(taskId, parseError);
                        reject(parseError);
                    }
                } else {
                    let errorMessage = '上传失败';
                    try {
                        // 尝试解析服务器返回的错误信息
                        const response = JSON.parse(xhr.responseText);
                        errorMessage = response.message || response.error || errorMessage;
                    } catch {
                        // 根据状态码提供友好的错误信息
                        switch (xhr.status) {
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
                                errorMessage = `上传失败 (${xhr.status})`;
                        }
                    }
                    const error = new Error(errorMessage);
                    this.handleUploadError(taskId, error);
                    reject(error);
                }
            }

            // 处理上传错误
            xhr.onerror = () => {
                const error = new Error('网络错误，请检查网络连接');
                this.handleUploadError(taskId, error);
                reject(error);
            }

            // 处理超时
            xhr.ontimeout = () => {
                const error = new Error('上传超时，请重试');
                this.handleUploadError(taskId, error);
                reject(error);
            }

            // 开始上传
            xhr.open('POST', this.options.url)

            // 注意：当使用FormData时，不要手动设置Content-Type
            // 浏览器会自动添加正确的Content-Type和boundary参数
            // 如果需要添加其他头部，可以在这里添加

            // 如果有自定义头部，可以在这里添加
            // 例如：xhr.setRequestHeader('Authorization', 'Bearer token');

            xhr.send(formData)
        })
    }

    private handleUploadError(taskId: string, error: Error) {
        const taskIndex = this.tasks.findIndex(t => t.id === taskId)
        if (taskIndex === -1) return
        this.tasks = [
            ...this.tasks.slice(0, taskIndex),
            {
                ...this.tasks[taskIndex],
                status: 'error',
                error: error.message
            },
            ...this.tasks.slice(taskIndex + 1)
        ]
    }

    private deleteTask(taskId: string) {
        const taskIndex = this.tasks.findIndex(t => t.id === taskId)
        if (taskIndex === -1) return

        // 只从tasks中删除任务，不影响files数组
        this.tasks = [
            ...this.tasks.slice(0, taskIndex),
            ...this.tasks.slice(taskIndex + 1)
        ]

        this.updateValue()
    }

    private updateValue() {
        // 更新value为已完成上传的文件列表
        this.value = this.files.map(file => ({
            name: file.name || '',
            url: file.url
        }))

        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: this.value }
        }))
    }

    renderFiels() {
        return html``
    }

    renderInput() {
        return html`
            <div class="upload"
                @click=${this.handleUploadClick}
                @dragover=${this.handleDragOver}
                @dragleave=${this.handleDragLeave}
                @drop=${this.handleDrop}>
                拖动文件到此处上传或点击选择文件
            </div>
            <div class="files">
                ${this.tasks.map(task => html`
                    <div class="file-item">
                        <div class="file-name" title="${task.file.name}">
                            ${task.file.name}
                        </div>
                        ${task.status === 'uploading' ? html`
                            <div class="progress-bar">
                                <div class="progress-fill" 
                                    style="width: ${task.progress}%">
                                </div>
                            </div>
                        ` : task.status === 'completed' ? html`
                            <div class="file-actions">
                                <span>完成</span>
                                <button class="delete-btn" 
                                    @click=${() => this.deleteTask(task.id)}
                                    title="删除文件">
                                    ×
                                </button>
                            </div>
                        ` : html`
                            <div class="file-actions">
                                <span class="error">${task.error}</span>
                                <button class="retry-btn" 
                                    @click=${() => this.retryUpload(task)}
                                    title="重新上传">
                                    重试
                                </button>
                                <button class="delete-btn" 
                                    @click=${() => this.deleteTask(task.id)}
                                    title="删除文件"></button>
                                    ×
                                </button>
                            </div>
                        `}
                    </div>
                `)}
            </div>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-upload': AutoFieldUpload
    }
}