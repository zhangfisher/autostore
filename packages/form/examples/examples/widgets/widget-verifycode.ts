/**
 * 验证码输入组件示例
 * 演示图片验证码（本地生成、单击刷新）与短信验证码（发送倒计时）
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

// 本地生成 SVG 图片验证码（demo 无后端，用 data URI 喂给 captcha widget）
// 每次调用生成随机 4 位字符 + 干扰线，并记录答案供 validate 校验
const captchaChars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
let captchaAnswer = "";

function generateCaptchaSvg(): string {
    let code = "";
    for (let i = 0; i < 4; i++) {
        code += captchaChars[Math.floor(Math.random() * captchaChars.length)];
    }
    captchaAnswer = code;

    const width = 100;
    const height = 40;
    // 每个字符随机旋转与基线偏移
    const chars = code
        .split("")
        .map((ch, i) => {
            const x = 14 + i * 22;
            const rotate = Math.floor(Math.random() * 40) - 20;
            const y = 26 + Math.floor(Math.random() * 6) - 3;
            const fill = `hsl(${Math.floor(Math.random() * 360)},70%,35%)`;
            return `<text x="${x}" y="${y}" font-size="22" font-family="monospace" font-weight="bold" fill="${fill}" transform="rotate(${rotate} ${x} ${y})">${ch}</text>`;
        })
        .join("");
    // 干扰线与噪点
    let lines = "";
    for (let i = 0; i < 4; i++) {
        const x1 = Math.floor(Math.random() * width);
        const y1 = Math.floor(Math.random() * height);
        const x2 = Math.floor(Math.random() * width);
        const y2 = Math.floor(Math.random() * height);
        lines += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="hsl(${Math.floor(
            Math.random() * 360,
        )},60%,60%)" stroke-width="1"/>`;
    }
    let dots = "";
    for (let i = 0; i < 30; i++) {
        dots += `<circle cx="${Math.floor(Math.random() * width)}" cy="${Math.floor(
            Math.random() * height,
        )}" r="1" fill="hsl(0,0%,${40 + Math.floor(Math.random() * 40)}%)"/>`;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="#f5f5f5"/>${lines}${dots}${chars}</svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

@customElement("example-widget-verifycode")
class WidgetVerifycodeExample extends LitElement {
    state = {
        form: {
            // 图片验证码：本地生成 SVG，单击图片刷新
            imageCode: configurable("", {
                label: "图片验证码",
                placeholder: "请输入图片中的字符",
                widget: "captcha",
                help: "看不清？单击图片刷新验证码",
                onGenerate: () => generateCaptchaSvg(),
                validate: (value: any) => {
                    if (!value) return true;
                    return value.toUpperCase() === captchaAnswer;
                },
                errorMessage: "验证码输入错误，请重新输入",
            }),
            // 短信验证码：发送按钮 + 倒计时
            smsCode: configurable("", {
                label: "短信验证码",
                placeholder: "请输入短信验证码",
                widget: "verifycode",
                sendTips: "获取短信验证码",
                timeout: 30000,
                template: "重新发送({timeout}s)",
                onRequest: () => {
                    console.log("发送短信验证码");
                    alert("短信验证码已发送！");
                },
                help: "点击按钮获取验证码",
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
            <div >
                    <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">
                        验证码输入组件
                    </h3>
                    <p
                        style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;"
                    >
                        演示图片验证码（单击图片刷新）与短信验证码（发送倒计时）
                    </p>
                    <auto-form
                        .state="${this.state}"
                        data-label="验证码演示"
                        style="min-height: 400px;"
                    ></auto-form>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-verifycode": WidgetVerifycodeExample;
    }
}

export default WidgetVerifycodeExample;
