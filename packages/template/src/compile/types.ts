/**
 * 模板译上下文
 */

import type { TemplateDirectiveArgs } from "../directives/types";
import type { AutoTemplateEngine } from "../engine";
import type { AutoTemplateScope } from "../scope";

export type TemplateCompileContext = {
    template: HTMLElement;
    el: Node;
    scope: AutoTemplateScope;
    engine: AutoTemplateEngine;
    args: TemplateDirectiveArgs;
};
