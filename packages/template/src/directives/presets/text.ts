import type { KylinTemplateCompileContext } from "../../compile/types";
import type { KylinTemplateScope } from "../../scope";
import type { TemplateDirectiveArgs, TemplateDirective } from "../types";

export const TextDirective: TemplateDirective = {
    name: "text",
    singleton: true,
    priority: 0,

    created: function (this: KylinTemplateScope, args: TemplateDirectiveArgs) {
        const value = args.value;
        if (value) {
            this.watch(value, ({ value }) => {
                this.el!.textContent = value;
            });
        }
    },
    compile: (context: KylinTemplateCompileContext) => {
        const args = context.args;
        if (args.value) {
            context.el.textContent = args.value;
        }
    },
};
