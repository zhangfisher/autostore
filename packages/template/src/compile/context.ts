import type { TemplateDirectiveArgs } from "../directives/types";
import type { KylinTemplateEngine } from "../engine";
import type { KylinTemplateScope } from "../scope";
import { createScopeContext } from "../utils/createScopeContext";

export type TemplateCompileContext = {
    data: Record<string, any>;
    template: HTMLElement;
    el: Node;
    scope: KylinTemplateScope;
    engine: KylinTemplateEngine;
    args: TemplateDirectiveArgs;
};

export function createCompileContext<T extends Record<string, any> = Record<string, any>>(
    state: T,
): TemplateCompileContext {}
