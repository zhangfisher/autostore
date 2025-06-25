import { AutoField } from "@/field"
import { css, html } from "lit"
import { customElement, state } from "lit/decorators.js"

export type AutoFieldFileUploadOptions = {
    multiple: boolean   // 是否上传多个文件 
    fielTypes: string[] // 允许上传的文件类型
    uploadUrl: string
}

type UploadTask = {
    id: string
    file: File
    progress: number
    status: 'uploading' | 'completed' | 'error'
    error?: string
}

@customElement('auto-field-upload')
export class AutoFieldUpload extends AutoField<AutoFieldFileUploadOptions> {
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
        `
    ] as any

    @state()
    private tasks: UploadTask[] = []

    private fileInputRef: HTMLInputElement | null = null

    firstUpdated() {
        // 创建文件输入元素
        this.fileInputRef = document.createElement('input')
        this.fileInputRef.type = 'file'
        this.fileInputRef.className = 'hidden-input'
        this.fileInputRef.multiple = !!this.options?.multiple

        if (this.options?.fielTypes && this.options.fielTypes.length > 0) {
            this.fileInputRef.accept = this.options.fielTypes
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

        if (this.options?.fielTypes) {
            const invalidFiles = files.filter(file =>
                !this.options?.fielTypes.some(type =>
                    file.type.startsWith(type) || type === '*'
                )
            )
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

        try {
            // 模拟上传进度
            for (let i = 0; i <= 100; i += 10) {
                await new Promise(resolve => setTimeout(resolve, 200))
                const taskIndex = this.tasks.findIndex(t => t.id === task.id)
                if (taskIndex === -1) return

                this.tasks = [
                    ...this.tasks.slice(0, taskIndex),
                    { ...this.tasks[taskIndex], progress: i },
                    ...this.tasks.slice(taskIndex + 1)
                ]
            }

            // 更新状态为完成
            const taskIndex = this.tasks.findIndex(t => t.id === task.id)
            if (taskIndex === -1) return

            this.tasks = [
                ...this.tasks.slice(0, taskIndex),
                { ...this.tasks[taskIndex], status: 'completed' },
                ...this.tasks.slice(taskIndex + 1)
            ]

            // 触发change事件
            this.updateValue()

        } catch (error) {
            const taskIndex = this.tasks.findIndex(t => t.id === task.id)
            if (taskIndex === -1) return

            this.tasks = [
                ...this.tasks.slice(0, taskIndex),
                {
                    ...this.tasks[taskIndex],
                    status: 'error',
                    error: error instanceof Error ? error.message : '上传失败'
                },
                ...this.tasks.slice(taskIndex + 1)
            ]
        }
    }

    private deleteTask(taskId: string) {
        const taskIndex = this.tasks.findIndex(t => t.id === taskId)
        if (taskIndex === -1) return

        this.tasks = [
            ...this.tasks.slice(0, taskIndex),
            ...this.tasks.slice(taskIndex + 1)
        ]

        this.updateValue()
    }

    private updateValue() {
        this.value = this.tasks
            .filter(t => t.status === 'completed')
            .map(t => t.file)
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
                                <button class="delete-btn" 
                                    @click=${() => this.deleteTask(task.id)}
                                    title="删除文件">
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