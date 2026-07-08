/**
 * 模板译上下文
 */

import type { TemplateDirectiveArgs } from "../directives/types";
import type { KylinTemplateEngine } from "../engine";
import type { KylinTemplateScope } from "../scope";

export type KylinTemplateCompileContext = {
    data: Record<string, any>;
    template: HTMLElement;
    el: Node;
    scope: KylinTemplateScope;
    engine: KylinTemplateEngine;
    args: TemplateDirectiveArgs;
};
