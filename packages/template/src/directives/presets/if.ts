import type { AutoTemplateScope } from "../../scope";
import type { TemplateDirectiveArgs, TemplateDirective } from "../types";

/**
 * 
 * 
 * 
 * <div x-if="visible">
 *    ssss
 * </div>
 * 
 * - modifiers
 * 
 */
export const TextDirective: TemplateDirective<['inner']> = {
    name: "text",
    singleton: true,
    priority: 0,

    created: function (this: AutoTemplateScope, args) {
        const value = args.value;
        if (value) {
            this.watch(value, ({ value }) => {
                this.el!.textContent = value;
            });
        }
        
    },
    compile: (this: AutoTemplateScope, ctx: TemplateDirectiveArgs) {},
};
