import type { KylinTemplateScope } from "../../scope";
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

    created: function (this: KylinTemplateScope, args) {
        const value = args.value;
        if (value) {
            this.watch(value, ({ value }) => {
                this.el!.textContent = value;
            });
        }
        
    },
    compile: (this: KylinTemplateScope, ctx: TemplateDirectiveArgs) {},
};
