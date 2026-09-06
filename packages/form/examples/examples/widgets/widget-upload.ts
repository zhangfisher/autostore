/**
 * 文件上传组件示例
 * 演示文件上传的各种参数配置，包含后端接收处理
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-widget-upload")
class WidgetUploadExample extends LitElement {
    state = {
        form: {
            // 单文件上传
            avatar: configurable([], {
                label: "头像上传",
                widget: "upload",
                url: "/api/upload",
                multiple: false,
                fileTypes: ["image/*"],
                tips: "点击或拖拽上传头像",
                help: "支持 jpg、png、gif 格式",
            }),
            // 多文件上传
            documents: configurable([], {
                label: "文档上传",
                widget: "upload",
                url: "/api/upload",
                multiple: true,
                fileTypes: [".pdf", ".doc", ".docx", ".txt"],
                tips: "支持上传多个文档",
                help: "支持 PDF、Word、文本文件",
            }),
            // 带预览的图片上传
            photos: configurable([], {
                label: "图片上传（预览模式）",
                widget: "upload",
                url: "/api/upload",
                multiple: true,
                fileTypes: ["image/*"],
                preview: true,
                tips: "上传图片支持预览",
                help: "支持 jpg、png、gif、webp 格式",
            }),
            // 自定义按钮样式
            fileButton: configurable([], {
                label: "按钮样式上传",
                widget: "upload",
                url: "/api/upload",
                multiple: false,
                selector: "button",
                tips: "点击按钮选择文件",
                help: "使用按钮样式",
            }),
            // 所有文件类型
            allFiles: configurable([], {
                label: "任意文件上传",
                widget: "upload",
                url: "/api/upload",
                multiple: true,
                fileTypes: ["*"],
                tips: "支持所有类型的文件",
                help: "不限制文件类型",
            }),
            // 带删除回调的上传
            withRemove: configurable([], {
                label: "带删除确认的上传",
                widget: "upload",
                url: "/api/upload",
                multiple: true,
                fileTypes: ["image/*"],
                tips: "删除时会调用服务器接口",
                onRemove: (file: any) => {
                    console.log("删除文件:", file);
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            alert("文件删除成功（模拟服务器删除）");
                            resolve(true);
                        }, 500);
                    });
                },
                help: "删除文件时触发 onRemove 回调",
            }),
        },
    };

    //@ts-ignore
    @query("auto-form")
    formRef?: any;

    get store(): any {
        return this.formRef?.activeStore;
    }

    render() {
        return html`
            <div>
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">文件上传组件</h3>
                <p style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                    演示文件上传的各种参数配置，后端 API 处理文件接收和存储
                </p>
                <auto-form
                    .state="${this.state}"
                    data-label="文件上传参数演示"
                    style="min-height: 600px;"
                ></auto-form>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-upload": WidgetUploadExample;
    }
}

export default WidgetUploadExample;
