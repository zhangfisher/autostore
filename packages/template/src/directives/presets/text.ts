import type { TemplateCompileContext } from "../../compile/types";
import type { AutoTemplateScope } from "../../scope";
import type { TemplateDirectiveArgs, TemplateDirective } from "../types";

export const TextDirective: TemplateDirective = {
    name: "text",
    singleton: true,
    priority: 0,

    created: function (this: AutoTemplateScope, args: TemplateDirectiveArgs) {
        const value = args.value;
        if (value) {
            this.watch(value, ({ value }) => {
                this.el!.textContent = value;
            });
        }
    },
    compile: (context: TemplateCompileContext) => {
        const value = context.args;
        if (value) {
            context.el.textContent = value;
        }
    },
};
