import type { AutoTemplateEngine } from "../engine";
import type { AutoTemplateDirectiveBase } from "./base";
import { presetDirectives } from "./presets";

/**
 * 指令注册表
 *
 * 管理指令名 → 指令类 的映射。预设指令来自 `presetDirectives`（显式映射，
 * 避免类的 `Function.name` 与指令名不一致——例如类名是 "TextDirective" 而指令名是 "text"）。
 * 亦支持运行时注册自定义指令类以覆盖内置指令。
 */
export class DirectiveManager extends Map<string, typeof AutoTemplateDirectiveBase> {
    readonly engine: AutoTemplateEngine;
    constructor(engine: AutoTemplateEngine<any>) {
        super();
        this.engine = engine;
        Object.entries(presetDirectives).forEach(([name, Cls]) => {
            this.set(name, Cls);
        });
    }
}
