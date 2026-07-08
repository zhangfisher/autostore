import type { KylinTemplateScope } from "../../scope";
import type { KylinTemplateEngine } from "../../engine";
import type { KylinTemplateDirectiveBase } from "../base";
import type { KylinDirectiveInfo } from "../types";

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
    engine: KylinTemplateEngine,
    directives: KylinDirectiveInfo[],
    scope: KylinTemplateScope,
): KylinTemplateDirectiveBase[] {
    // 解析每个指令对应的类，并处理同名单例去重（取最后声明的）
    const resolved: Array<{ info: KylinDirectiveInfo; cls: typeof KylinTemplateDirectiveBase }> =
        [];
    // 单例指令 name -> resolved 中的索引，用于覆盖为最后声明
    const singletonPos = new Map<string, number>();
    for (const info of directives) {
        const cls = engine.directives.get(info.name);
        if (!cls) continue; // 未注册指令静默跳过

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
