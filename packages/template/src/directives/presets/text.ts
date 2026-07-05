import { getVal, type WatchListener } from "autostore";
import { TemplateDirectiveBase } from "../base";
import type { TemplateCompileContext } from "../../compile/types";
import type { AutoTemplateScope } from "../../scope";
import { isStatePath } from "../../utils/isStatePath";
import { watch } from "../../../../core/src/watch/watch";

/**
 *
 *
 *
 * const store = new AutoStore({
 *    order:{
 *       name:"AutoStore",
 *       price:100,
 *       count: 3
 *    }
 * })
 * <div x-text="order.price * order.count"/>   item是全局store中成员
 * <div x-text="item"/>   item是全局store中成员

 * <div x-for="item of items">  // items是store成员
 *  <div x-text="item.id"/>
 * </div>
 *
 *  item是div创建的是上下文变量,item会覆盖state.item
 *  如果一定要访问store中的成员，则需要使用 $store.item
 *
 *
 *
 */

// export class TextDirective extends TemplateDirectiveBase {
//     override created(): void {
//         const value = this.value;

//         this.watch(this.value, ({ value }) => {
//             if (this.el) this.el.innerText = value;
//         });
//     }
//     override compile(_context: TemplateCompileContext, _parent: HTMLElement) {
//         if (this.el) {
//             this.el.innerText = getVal(this.engine.store.state, this.value);
//         }
//     }
// }

export type DirectiveContext = {
    attr?: string;
    value?: any;
    modifiers?: string[];
    options?: Record<string, any>;
};

export const TextDirective1 = {
    name: "text",
    singleton: true,
    priority: 0,

    created: function (this: AutoTemplateScope, ctx: DirectiveContext) {
        const value = ctx.value;
        this.watch(value, ({ value }) => {
            this.el!.textContent = value;
        });
    },
    compile: function (this: AutoTemplateScope, ctx: DirectiveContext) {},
};
