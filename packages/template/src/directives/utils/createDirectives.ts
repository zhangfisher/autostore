import type { AutoTemplateScope } from "../../scope";
import type { AutoTemplateEngine } from "../../engine";
import { DirectiveKind, type AutoTemplateDirectiveBase } from "../base";
import type { AutoDirectiveInfo } from "../types";

/**
 * 将读取的指令信息转换为指令实例对象
 *
 * 处理逻辑如下：
 *
 * - 未注册指令静默跳过
 * - 同名单例指令只有最后一个有效（后声明覆盖先声明）
 * - 非单例指令允许同名多实例，保持声明顺序
 *
 * const directiveClass = engine.directives.get(name)
 *
 * - 按指令的优先级进行排列，directiveClass.priority 越大排在前面（先执行）；
 *   priority 相同时保持声明顺序（Array.sort 稳定）。
 *
 * 然后创建指令实例，将 DirectiveInfo 整体传入指令构造函数。
 *
 * @param engine     引擎实例（提供指令注册表，并注入到每个指令实例）
 * @param directives 待解析的指令信息列表
 * @param scope    所属绑定对象
 * @returns 按优先级排序后的指令实例列表
 */
export function createDirectives(
    engine: AutoTemplateEngine,
    directives: AutoDirectiveInfo[],
    scope: AutoTemplateScope,
): AutoTemplateDirectiveBase[] {
    // x-for 元素上的 :key 是 x-for 的项标识元数据，不应作为 bind:key 指令处理
    // （否则会在容器上误绑 DOM key 属性）。仅在含 x-for 时剔除 bind:key。
    const hasFor = directives.some((d) => d.name === "for");
    const effective = hasFor
        ? directives.filter((d) => !(d.name === "bind" && d.attr === "key"))
        : directives;
    // 解析每个指令对应的类，并处理同名单例去重（取最后声明的）
    const resolved: Array<{ info: AutoDirectiveInfo; cls: typeof AutoTemplateDirectiveBase }> =
        [];
    // 单例指令 name -> resolved 中的索引，用于覆盖为最后声明
    const singletonPos = new Map<string, number>();
    for (const info of effective) {
        const cls = engine.directives.get(info.name);
        if (!cls) continue; // 未注册指令静默跳过
        // Runtime 指令走 observer 通道（由 static initialize 建立的 MutationObserver 驱动
        // mounted/unmounted），编译器致盲：scope 通道不实例化、不调 created/compile。
        // Hybrid 仍需 scope 通道（拿 binding 做相对表达式反应性），故仅排除纯 Runtime。
        if (cls.kind === DirectiveKind.Runtime) continue;

        if (cls.singleton) {
            const pos = singletonPos.get(info.name);
            if (pos !== undefined) {
                // 单例同名：后声明覆盖先声明
                resolved[pos] = { info, cls };
            } else {
                singletonPos.set(info.name, resolved.length);
                resolved.push({ info, cls });
            }
        } else {
            // 非单例：允许同名多实例，直接追加
            resolved.push({ info, cls });
        }
    }

    // 按 priority 降序排列（大的排前、先执行）；相同时保持声明顺序（Array.sort 稳定）
    resolved.sort((a, b) => b.cls.priority - a.cls.priority);

    // 实例化：将 DirectiveInfo 整体传入指令构造函数
    return resolved.map(({ info, cls }) => new cls(engine, scope, info));
}
