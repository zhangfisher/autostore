import type { AutoTemplateEngine } from "../engine";
import type { TemplateDirectiveBase } from "./base";
import * as presets from "./presets";

/**
 * 指令注册表类
 *
 * 负责管理指令的注册、查询和排序。
 * 使用 Map 存储指令，支持自定义指令覆盖内置指令。
 */
export class DirectiveManager extends Map<string, typeof TemplateDirectiveBase> {
    readonly engine: AutoTemplateEngine;
    constructor(engine: AutoTemplateEngine<any>) {
        super();
        this.engine = engine;
        Object.values(presets).forEach((directive) => {
            this.set(directive.name, directive);
        });
    }
}
