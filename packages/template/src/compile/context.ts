import type { TemplateDirectiveArgs } from "../directives/types";
import type { AutoTemplateEngine } from "../engine";
import type { AutoTemplateScope } from "../scope";
export type TemplateCompileContext = {
    data: Record<string, any>;
    template: HTMLElement;
    el: Node;
    scope: AutoTemplateScope;
    engine: AutoTemplateEngine;
    args: TemplateDirectiveArgs;
};

export function createCompileContext<T extends Record<string, any> = Record<string, any>>(
    state: T,
) {}
