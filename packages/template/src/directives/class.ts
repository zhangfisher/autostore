import { TemplateDirectiveBase } from "../directive";

/**
 * 元素类名
 *
 * state={
 *   card:{
 *      red:true,
 *      green:false
 *   }
 * }
 * 
 * <div x-class="a b {card} {表达式}"></div>
 * <div x-class="{card}"></div>
 * 
 * varName指向的如果是对象
 *  

 */
export class ClassDirective extends TemplateDirectiveBase {
    override name = "class";
    override compile() {}
}
