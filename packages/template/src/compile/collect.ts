import type { ComponentDef, ComponentSetup, ComponentHooks } from "../directives/component-def";
import { evalComponentSetup, mergeComponentSetups, extractComponentHooks } from "./setup";
import { extractStyleBinds, type StyleBind } from "../utils/styleBind";

/**
 * 判定 `<script>` 是否为组件 `<script setup>`（ADR-0022 决策四）。
 *
 * 约定：`<script setup>`（type 属性缺失，靠 `setup` 布尔属性标识，仿 Vue SFC）或
 * `<script type="setup">`。二者择一识别为 setup 脚本；普通 `<script>`（无标识）不在此提取
 * （由 compiler 的 `<script type="actions">` 通道处理或原样保留）。
 */
function isSetupScript(el: HTMLScriptElement): boolean {
    return el.hasAttribute("setup") || el.type === "setup";
}

/**
 * 从组件元素（含 `<script setup>`/`<style>` 子节点）提取并组装组件定义（ADR-0022 决策二/四）。
 *
 * 核心步骤：
 * 1. 在原树收集所有 `<script setup>` 的文本内容与 `<style>` 的文本内容（克隆前读，引用稳定）；
 * 2. 深克隆元素为冻结快照，并在快照上**移除**这些 `<script setup>`/`<style>` 子节点（不进实例化 DOM）；
 * 3. 求值各 `<script setup>`（new Function，信任代码，失败 warn 丢弃，决策四-2/3）；
 * 4. 合并 setups（data 收集、methods 浅合并、同名 hooks 串行，决策四-1/R3=A）；
 * 5. 组装 ComponentDef（snapshot/setup/hooks/styles）。
 *
 * @param componentEl 原树中的 x-component 元素（读取子节点结构）
 * @param name        组件名
 * @param warn        warn 日志函数
 * @returns 组件定义（snapshot 已剥离 script/style 子节点）
 */
export function buildComponentDef(
    componentEl: HTMLElement,
    name: string,
    warn: (msg: string) => void,
): ComponentDef {
    // 1. 原树收集 setup 文本与 style 文本（克隆前读，避免克隆后引用错位）
    const setupTexts: string[] = [];
    const rewrittenStyles: string[] = [];
    // 跨多个 <style> 块共享的 expr→StyleBind 映射：同表达式全局去重（决策四-4.1-(2) 按表达式复用）
    const bindMap = new Map<string, StyleBind>();
    let hasSetupOrStyle = false;
    for (const child of Array.from(componentEl.children)) {
        if (child instanceof HTMLScriptElement && isSetupScript(child)) {
            setupTexts.push(child.textContent?.trim() ?? "");
            hasSetupOrStyle = true;
        } else if (child instanceof HTMLStyleElement) {
            const raw = child.textContent ?? "";
            // 响应式 bind 提取（ADR-0022 决策四-4.1）：bind(expr) 替换为 var(--name, unset)，
            // binds 跨块按 expr 全局去重后存 def.styleBinds。rewritten 供后续 scoped 改写器消费。
            const { rewritten } = extractStyleBinds(raw, bindMap);
            rewrittenStyles.push(rewritten);
            hasSetupOrStyle = true;
        }
    }

    // 2. 深克隆快照，移除 script setup / style（克隆后在快照上重新遍历，按相同判定移除）
    const snapshot = componentEl.cloneNode(true) as HTMLElement;
    if (hasSetupOrStyle) {
        for (const child of Array.from(snapshot.children)) {
            if (
                (child instanceof HTMLScriptElement && isSetupScript(child)) ||
                child instanceof HTMLStyleElement
            ) {
                child.remove();
            }
        }
    }

    // 3. 求值各 script setup
    const setups = [];
    for (const text of setupTexts) {
        const parsed = evalComponentSetup(text, name, warn);
        if (parsed) setups.push(parsed);
    }
    // 4. 合并
    const setup: ComponentSetup | undefined = mergeComponentSetups(setups);
    const hooks: ComponentHooks | undefined = extractComponentHooks(setup);

    // 5. style 文本（已提取 bind 后的改写文本；空数组收敛为 undefined）
    const styles = rewrittenStyles.length > 0 ? rewrittenStyles : undefined;
    // bind 清单（跨 <style> 块全局去重；无 bind 时为 undefined）
    const styleBinds = bindMap.size > 0 ? Array.from(bindMap.values()) : undefined;

    return {
        name,
        snapshot,
        setup,
        hooks,
        styles,
        styleBinds,
    };
}
