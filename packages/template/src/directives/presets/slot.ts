import { AutoStore } from "autostore";
import { AutoTemplateDirectiveBase } from "../base";
import type { AutoTemplateEngine } from "../../engine";
import { removeDirectives } from "../utils/removeDirectives";
import { hasDirectives } from "../utils/hasDirectives";
import { hasMustache } from "../../compile/mustache";

/**
 * x-slot：engine 边界 / 隔离快照 / 远程子引擎（ADR-0006）。
 *
 * 在模板中划一块**独立于 engine 的隔离 DOM 区域**。两种模式（由值有无切换，二选一）：
 *
 * - **static**（无值 `<div x-slot>`）：宿主内为**冻结快照**——`compile()` 深克隆 template 子节点、
 *   剥除全部指令属性（x- 前缀及 `@` / `:` 快捷前缀）、**不编译、不建 scope、不注册 watcher**。engine 永不覆写，
 *   开发者用 DOM API 全权管理。内层指令/`{{}}` 一律静默失效（编译期 warn 对冲）。
 *
 * - **remote**（`<div x-slot="expr">`）：expr 经 `scope.watch` 求值得 **url（响应式，支持路径/
 *   表达式 / x-data 局部 / x-for item）**；fetch url → 在宿主上建**完全独立的 child engine**
 *   （`new AutoTemplateEngine(host, new AutoStore({}))`，自带空 store、fetched HTML 用自身 x-data 自治）。
 *   url 变化 → 销毁当前 child engine + 重新 fetch + 重建。
 *
 * **威胁边界**：仅防 T1（反应式刷新不擦内容）；T2（结构重建：x-if toggle / engine.data / patch）
 * 与 T3（全量重编译）与普通元素一视同仁——宿主被销毁则内容/child engine 随销，重建时静态重克隆 / remote 重 fetch。
 *
 * **teardown**：child engine 挂指令实例 `this.childEngine`，随 `scope.destroy()` 销毁
 * （destroy 调 `childEngine.destroy()` + abort 在途 fetch），零额外接线、无泄漏。
 *
 * **dispatcher 盲区**：created() 登记 host 为盲区，父 dispatcher 跳过其子树的 runtime 指令派发
 * （隔离 child engine 写入的 x-loading 等被父 dispatcher 二次 mount，ADR-0006 决策 8）。
 *
 * @example 静态冻结快照（engine 永不触碰内部）
 * <div x-slot><a href="x">ssss</a></div>
 *
 * @example 远程子引擎（url 响应式，自带独立 store）
 * <div x-slot="postUrl"></div>
 */
export class SlotDirective extends AutoTemplateDirectiveBase {
    /** 结构指令档（介于 if=80 / for=100）；x-slot 不能与 x-for/eager-x-if 同元素（ownership 冲突） */
    static override readonly priority = 90;
    static override readonly singleton = true;
    /**
     * x-slot 永远占有子树：static 自行克隆填充、remote 由 child engine 接管子节点，
     * 通用 walk 不得递归进其子节点（否则会编译本该冻结/隔离的内容）。
     */
    static override ownsChildren(): boolean {
        return true;
    }

    private mode: "static" | "remote" = "static";
    /** remote 模式创建的完全独立子引擎（static 模式恒为 undefined） */
    private childEngine?: AutoTemplateEngine;
    /** 当前在途 fetch 的中止控制器（url 变化 / scope 销毁时 abort，丢弃过期结果） */
    private abortCtrl?: AbortController;

    override created() {
        // 登记 dispatcher 盲区：父 dispatcher 对本宿主子树致盲（ADR-0006 决策 8）
        this.engine.dispatcher.addSlotRoot(this.el);

        const urlExpr = this.value == null ? "" : String(this.value).trim();
        if (urlExpr === "") {
            // 无值 → static 冻结模式（compile 填充）
            this.mode = "static";
            return;
        }
        // 有值 → remote 模式：expr 经 scope.watch 双轨求值得 url（响应式）
        this.mode = "remote";
        // 初值立即 fetch；后续 url 变化经 cb 销毁旧 engine + 重 fetch + 重建（ADR-0006 决策 4）
        const initialUrl = this.binding.watch(this.value, ({ value: url }) => {
            this._loadUrl(url);
        });
        this._loadUrl(initialUrl);
    }

    /**
     * static 模式首渲：深克隆 template 子节点、剥指令属性、填充宿主（冻结快照）。
     * remote 模式无操作（子节点由 child engine 异步接管）。
     */
    override compile() {
        if (this.mode !== "static") return;
        const tpl = this.template;
        if (!tpl) return;
        this._warnIfInnerDirectives(tpl);
        for (const child of Array.from(tpl.childNodes)) {
            const clone = child.cloneNode(true);
            this._stripDirectiveAttrs(clone);
            this.el.appendChild(clone);
        }
    }

    /**
     * 加载远程 url：销毁旧 child engine + abort 旧 fetch → 渲染 loading → fetch → 建 child engine。
     *
     * - url 假/空（表达式暂未解析出 url）→ 清空宿主、无 engine；
     * - 有效 url → 在宿主添加 `x-loading` 属性（复用运行时指令，dispatcher 自动 mount 覆盖层）+
     *   fetch → 成功则移除 `x-loading`、建 child engine；
     *   失败则移除 `x-loading`、错误占位 + log。
     *
     * 每次用一个独立 AbortController；url 变化或 scope 销毁会 abort 旧请求，其在下个 await 点丢弃结果。
     */
    private async _loadUrl(url: any): Promise<void> {
        this._teardownEngine();
        const urlStr = url == null ? "" : String(url).trim();
        if (urlStr === "") {
            this.el.replaceChildren();
            return;
        }
        // 复用 x-loading 运行时指令：宿主加属性即由 dispatcher mount 覆盖层（ADR-0006 决策 6）。
        // 宿主自身不在 slot 盲区内（仅子树盲），故父 dispatcher 能观测到此属性变化。
        this.el.setAttribute("x-loading", "true");
        const myCtrl = (this.abortCtrl = new AbortController());
        try {
            const res = await fetch(urlStr, { signal: myCtrl.signal });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const html = await res.text();
            // 销毁 / 被新 url 取代 → 已 abort，丢弃本次结果（避免向已销毁宿主或被取代的 slot 写入）
            if (myCtrl.signal.aborted) return;
            this.el.removeAttribute("x-loading"); // 移除覆盖层（dispatcher unmount）
            this.el.replaceChildren();
            this.el.innerHTML = html;
            // 完全独立 child engine：自带空 store，fetched HTML 用自身 x-data 自治声明状态。
            // 经 this.engine.constructor 创建同类实例——避免 import engine 类引入循环依赖
            // （slot → engine → manager → presets → slot），且子类化 AutoTemplateEngine 时自动跟随。
            const EngineCtor = this.engine.constructor as new (
                el: HTMLElement,
                store: any,
                options?: any,
            ) => AutoTemplateEngine;
            this.childEngine = new EngineCtor(this.el, new AutoStore({}));
        } catch (e: any) {
            if (myCtrl.signal.aborted) return; // 主动 abort（销毁 / 取代），非真错误
            this.el.removeAttribute("x-loading");
            this._renderError();
            this.engine.logger.error(`x-slot: 加载远程模板失败 "${urlStr}": ${e?.message ?? e}`);
        } finally {
            // 仅当仍是本次控制器时清空（被新 url 取代则不动新控制器）
            if (this.abortCtrl === myCtrl) this.abortCtrl = undefined;
        }
    }

    /** 销毁当前 child engine + abort 在途 fetch + 移除 x-loading（url 变化 / scope 销毁时调用） */
    private _teardownEngine(): void {
        this.abortCtrl?.abort();
        this.abortCtrl = undefined;
        this.childEngine?.destroy();
        this.childEngine = undefined;
        this.el.removeAttribute("x-loading");
    }

    /**
     * static 内容含指令属性或 `{{}}` → warn（内容不编译、反应式绑定静默失效，ADR-0006 决策 1）。
     * 编译期一次性探测（每 incarnation 一次），找到即记 warn，不抛错。
     */
    private _warnIfInnerDirectives(root: HTMLElement): void {
        let found = false;
        root.querySelectorAll("*").forEach((n) => {
            if (!found && n instanceof HTMLElement && hasDirectives(n)) found = true;
        });
        if (!found) {
            const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
            let node = walker.nextNode();
            while (node) {
                if (hasMustache(node.nodeValue)) {
                    found = true;
                    break;
                }
                node = walker.nextNode();
            }
        }
        if (found) {
            this.engine.logger.warn(
                `x-slot: 静态内容不编译，内部指令/{{}} 不生效；若需响应式请用普通元素或 x-slot="url" 远程子引擎`,
            );
        }
    }

    /**
     * 递归剥除节点及其后代的全部指令属性（x- 前缀及 `@` / `:` 快捷前缀），产出洁净静态快照。
     * 与引擎全局惯例一致（所有渲染元素剥指令属性）；剥后父 dispatcher 亦无 runtime 属性可挂。
     */
    private _stripDirectiveAttrs(node: Node): void {
        if (node instanceof HTMLElement) {
            removeDirectives(node);
            node.querySelectorAll("*").forEach((n) => {
                if (n instanceof HTMLElement) removeDirectives(n);
            });
        }
    }

    /** 渲染极简错误占位到宿主，替换现有子节点（loading 已由 x-loading 覆盖层承担） */
    private _renderError(): void {
        this.el.replaceChildren();
        const el = document.createElement("div");
        el.className = "x-slot-error";
        el.textContent = "模板加载失败";
        this.el.appendChild(el);
    }

    /**
     * 销毁：abort 在途 fetch + 销毁 child engine + 注销 dispatcher 盲区。
     * 由 scope.destroy() 级联调用（宿主/祖先被移除、engine.destroy 等），无泄漏。
     */
    override destroy(): void {
        this._teardownEngine();
        this.engine.dispatcher.removeSlotRoot(this.el);
    }
}
