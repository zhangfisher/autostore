import type { KylinTemplateCompileContext } from "../compile/types";

export type KylinDirectiveInfo = {
    name: string;
    value?: string;
    attr?: string;
    modifiers?: string[];
    options?: Record<string, any>;
};

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

export type TemplateDirectiveArgs<
    M extends string[] = string[],
    O extends Record<string, any> = Record<string, any>,
> = {
    attr?: string;
    value?: string;
    modifiers?: M;
    options?: O;
};

export type TemplateDirective<
    M extends string[] = string[],
    O extends Record<string, any> = Record<string, any>,
> = {
    name: string;
    singleton?: boolean;
    priority?: number;

    created?: (ctx: TemplateDirectiveArgs<M, O>) => void;
    /**
     * 执行编译
     * @param context
     * @returns
     */
    compile?: (context: KylinTemplateCompileContext) => any;
};
