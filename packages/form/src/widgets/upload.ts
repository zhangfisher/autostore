import { AutoField } from "@/field"
import type { SchemaUploadWidgetFile, SchemaUploadWidgetOptions } from "autostore"
import { css, html } from "lit"
import { customElement, state } from "lit/decorators.js"
import { classMap } from "lit/directives/class-map.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { repeat } from "lit/directives/repeat.js"
import { when } from "lit/directives/when.js"


type UploadFile = {
    id: string
    file: File
    progress: number
    status: 'done' | 'uploading' | 'error'
    error?: string
    value: SchemaUploadWidgetFile
}

export type AutoFieldUploadOptions = Required<SchemaUploadWidgetOptions>


@customElement('auto-field-upload')
export class AutoFieldUpload extends AutoField<AutoFieldUploadOptions> {
    static styles = [
        AutoField.styles,
        css`
            .value {
                & > magic-flex{
                    width: 100%;
                    border: var(--auto-border);
                    padding: 0.5rem;
                    min-height: 2rem;
                    border-radius: var(--auto-border-radius);
                    &>magic-flex.files{
                        position: relative;
                        padding: 0.5rem;
                        &>.file{                                
                            position: relative;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 0.5rem;                        
                            border: var(--auto-border);
                            border-radius: var(--auto-border-radius);
                            background-color: var(--auto-workspace-color);
                            &>[name=remove]{
                                cursor: pointer;
                                &:hover{
                                    color: var(--auto-theme-color);
                                }                                
                            }
                            &.error{
                                border: 1px solid red;
                                background-color: #ff006221;  
                                border-radius: var(--auto-border-radius);
                                color:red;
                            }
                            &>sl-icon{
                                cursor: pointer;                                
                                &:hover{
                                    color: var(--auto-theme-color);
                                }
                            }
                            &>.progress{                       
                                position: absolute;
                                top:0px;
                                left: 0px;
                                width: 100%;
                                height: 100%;
                                background-color: rgba(0, 0, 0, 0.5);
                                border-radius: var(--auto-border-radius);
                                color: white;                    
                                display: flex;
                                align-items: center; 
                                justify-content: center;
                                width: 100%;
                                text-align: center;
                                z-index: 0;
                                &>:first-child{
                                    flex-grow: 1;
                                    text-align: center;
                                }
                                &>[name=remove]{
                                    cursor: pointer;
                                    margin-right: 0.5rem;
                                }
                                &>.value{

                                }
                            }
                        } 
                    }
                }
                & > .actions{
                    padding: 0px;
                }
            }
            .indicator {
                border: 2px dashed #ccc;
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
                    border-color: #999;
                }
            } 
            .progressbar{
                position: relative;                
                & > .error{
                    font-size: calc(var(--auto-font-size) * 0.8);
                    padding: 0px 0.5rem;
                }
                &>.overlay{
                    position: absolute;
                    top:0px;
                    left: 0px;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                    background-color: rgba(0, 0, 0, 0.5);
                    border-radius: var(--auto-border-radius);
                    color: white;                    
                    display: flex;
                    align-items: center; 
                    justify-content: center;
                    padding-right: 0.5rem;
                    box-sizing: border-box;
                    &>:first-child{
                        flex-grow: 1;
                        text-align: center;
                    }
                    &>.remove{                   
                        display: flex;
                        align-items: center;
                        justify-content: center;     
                        border-radius: 50%;
                        padding: 2px;
                        width: 1rem;
                        height: 1rem;
                        cursor: pointer;
                        color: #666;
                        padding-bottom: 3px;
                        background-color: rgba(0, 0, 0, 0.4);  
                        &:hover{
                            background-color: rgba(0, 0, 0, 0.3);  
                            color: #aaa;
                        }
                    }
                    &.error{
                        border: 1px solid red;
                        background-color: #ff006221;  
                        border-radius: var(--auto-border-radius);
                        color:red;
                        &>.progress{
                            display: none;
                        }
                    }
                }
            }
 
        `
    ] as any

    @state()
    files: UploadFile[] = []

    private fileInputRef: HTMLInputElement | null = null


    private retryUpload(file: UploadFile) {
        this.startUpload(file.file, file.id)
    }


    getInitialOptions(): Record<string, any> {
        return {
            fileTypes: [],
            url: '',
            multiple: true,
            fileFieldName: 'files',
            preview: '24px',
            tips: '拖动文件到此处上传或点击选择文件',
            onResolve: this._defaultFileResolver.bind(this),
            onFileLabel(file: { url: string }) {
                const parts = file.url.split('/')
                return parts[parts.length - 1]
            },
        }
    }
    _createUploadInput() {
        // 创建文件输入元素
        this.fileInputRef = document.createElement('input')
        this.fileInputRef.type = 'file'
        this.fileInputRef.multiple = !!this.options?.multiple

        if (this.options.fileTypes.length > 0) {
            // 文件输入元素的accept属性可以接受MIME类型和文件扩展名
            // 例如: "image/jpeg, .jpg, .png"
            this.fileInputRef.accept = this.options.fileTypes
                .filter(type => type !== '*')
                .join(',')
        }
        this.fileInputRef.style.display = 'none'
        this.fileInputRef.addEventListener('change', this.handleFileInputChange.bind(this))
        this.renderRoot.appendChild(this.fileInputRef)
    }

    firstUpdated() {
        this._createUploadInput()
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
                    if (type.startsWith('.')) {  // 检查文件扩展名                      
                        return file.name.toLowerCase().endsWith(type.toLowerCase());
                    } else { // 检查MIME类型                       
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
            this.files = []
        }

        const task: UploadFile = {
            id: this.generateId(),
            file,
            progress: 0,
            status: 'uploading',
            value: {
                url: file.name
            },
        }
        this.files.push(task)
        // 使用共享的上传逻辑
        return this.startUpload(file, task.id)
    }

    private async uploadFileWithTask(file: File, taskId: string) {
        if (!this.options?.url) {
            throw new Error('Upload URL is not configured')
        }
        // 使用共享的上传逻辑，但使用现有任务ID
        return this.startUpload(file, taskId)
    }


    _updateFileRecord(fileId: string, data: Partial<UploadFile>) {
        const index = this.files.findIndex(t => t.id === fileId)
        if (index === -1) return
        this.files = [
            ...this.files.slice(0, index),
            { ...this.files[index], ...data },
            ...this.files.slice(index + 1)
        ]
    }

    _getResponseError(request: XMLHttpRequest) {
        let errorMessage = '上传失败';
        try {  // 尝试解析服务器返回的错误信息          
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
        if (typeof (response) === 'string') {
            return {
                url: response
            }
        } else if (typeof (response) === 'object') {
            if (!response.url) {
                throw new Error('上传响应缺少必要的url字段');
            }
            return response
        }
    }

    _parseUploadResponse(responseText: string) {
        let result: any = {}
        try {
            Object.assign(result, JSON.parse(responseText))
        } catch {
            result = responseText
        }
        if (typeof this.options.onResolve === 'function') {
            result = this.options.onResolve(result);
        }
        return result
    }
    private async startUpload(file: File, fileId: string) {
        const fileIndex = this.files.findIndex(t => t.id === fileId)
        if (fileIndex === -1) return
        const fileRecord = this.files[fileIndex]

        return new Promise<void>((resolve, reject) => {
            const httpRequest = new XMLHttpRequest()
            const formData = new FormData()
            formData.append(this.options.fileFieldName, file)
            // 监听上传进度
            httpRequest.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const progress = Math.round((event.loaded / event.total) * 100)
                    this._updateFileRecord(fileId, {
                        progress
                    })
                }
            }
            // 处理上传完成
            httpRequest.onload = () => {
                const fileIndex = this.files.findIndex(t => t.id === fileId)
                if (fileIndex === -1) return
                if (httpRequest.status >= 200 && httpRequest.status < 300) {
                    this._updateFileRecord(fileId, {
                        status: 'done'
                    })
                    try {
                        const response = this._parseUploadResponse(httpRequest.responseText)
                        fileRecord.value = response
                        this._updateFileRecord(fileId, {
                            value: { ...fileRecord.value }
                        })
                        fileRecord.status = 'done'
                        this.uploadComplate();
                        resolve();
                    } catch {
                        const parseError = new Error('解析上传响应失败');
                        this.handleUploadError(fileId, parseError);
                        reject(parseError);
                    }
                } else {
                    const error = this._getResponseError(httpRequest)
                    this.handleUploadError(fileId, error);
                    reject(error);
                }
            }
            // 处理上传错误
            httpRequest.onerror = () => {
                const fileIndex = this.files.findIndex(t => t.id === fileId)
                if (fileIndex === -1) return
                const error = new Error('网络错误，请检查网络连接');
                this.handleUploadError(fileId, error);
                reject(error);
            }

            // 处理超时
            httpRequest.ontimeout = () => {
                const fileIndex = this.files.findIndex(t => t.id === fileId)
                if (fileIndex === -1) return
                const error = new Error('上传超时，请重试');
                this.handleUploadError(fileId, error);
                reject(error);
            }

            // 开始上传
            httpRequest.open('POST', this.options.url)

            // 注意：当使用FormData时，不要手动设置Content-Type
            // 浏览器会自动添加正确的Content-Type和boundary参数
            // 如果需要添加其他头部，可以在这里添加

            // 如果有自定义头部，可以在这里添加
            // 例如：xhr.setRequestHeader('Authorization', 'Bearer token');
            this._updateFileRecord(fileId, {
                progress: 0,
                status: 'uploading'
            })
            httpRequest.send(formData)
        })
    }


    private handleUploadError(fileId: string, error: Error) {
        this._updateFileRecord(fileId, {
            error: error.message,
            status: 'error'
        })
    }

    private deleteUploading(fileId: string) {
        const fileIndex = this.files.findIndex(t => t.id === fileId)
        if (fileIndex === -1) return
        // 只从tasks中删除任务，不影响files数组
        this.files = [
            ...this.files.slice(0, fileIndex),
            ...this.files.slice(fileIndex + 1)
        ]
    }

    private deleteFile(fileId: string) {
        this.deleteUploading(fileId)
        this.uploadComplate()
    }

    private uploadComplate() {
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: this.files.map(file => file.value) }
        }))
        this.onFieldChange()
    }


    getInputValue() {
        if (this.options.multiple) {
            return this.files.map(file => file.value)
        } else {
            return this.files.length > 0 ? this.files[0].value.url : undefined
        }
    }

    getStateValue() {
        let value = super.getStateValue()
        if (!Array.isArray(value)) value = [value]
        this.files = value.map((v: any, index: number) => {
            const file = {
                id: String(index),
                file: undefined,
                progress: 0,
                status: 'done',
                error: undefined,
                value: { url: undefined }
            } as any
            if (typeof (v) === 'string') {
                file.value.url = v
            } else if (typeof (v) === 'object') {
                Object.assign(file.value, v)
            }
            return file
        })
        return value
    }

    renderFilePreview(file: string) {
        return html`<div class="file-preivew">
            ${file}
        </div>`
    }

    renderFile(file: UploadFile) {
        const hasError = !!file.error
        return html`
            <magic-flex class="file ${classMap({ error: hasError })}" wrap align="center" gap="0.5rem"
                title=${ifDefined(file.error)}
            >
                ${when(file.status === 'uploading', () => html`<span class="progress">
                    <span class="value">${file.progress}%</span>
                    <sl-icon name="remove" @click=${() => this.deleteUploading(file.id)}></sl-icon>
                </span>`)} 
                <span class="label">${this.options.onFileLabel(file.value)}</span>
                <sl-icon name="remove" @click=${() => this.deleteFile(file.id)}></sl-icon>
                ${when(file.status === 'error', () => {
            return html`<sl-icon name="refresh" title="重新上传" @click=${() => this.retryUpload(file)}></sl-icon>`
        })}                               
            </magic-flex> 
        `
    }

    renderFiels() {
        if (this.files.length === 0) return
        return html`<magic-flex class="files" grow='none' gap="0.5rem" wrap>
            ${when(this.files.length > 0,
            () => {
                return repeat(this.files, (file) => {
                    return this.renderFile(file)
                })
            },
            () => {
                return html`<span class=''>${this.options.placeholder || '暂无文件'}</span>`
            }
        )}
        </magic-flex>`
    }

    renderInput() {
        return html`
            <magic-flex grow="none" gap="0.5rem" direction="column">
                ${this.renderFiels()}
                ${when(this.options.multiple, () => {
            return html`<div class="indicator"
                            @click=${this.handleUploadClick}
                            @dragover=${this.handleDragOver}
                            @dragleave=${this.handleDragLeave}
                            @drop=${this.handleDrop}>
                            ${this.options.tips}
                        </div>`
        })}                
                <magic-flex class="actions" align="center" grow="span">
                    <sl-button @click=${this.handleUploadClick}>选择文件</sl-button>  
                </magic-flex>
            </magic-flex>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-upload': AutoFieldUpload
    }
}

