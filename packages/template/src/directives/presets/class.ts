import { KylinTemplateDirectiveBase } from "../base";

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
export class ClassDirective extends KylinTemplateDirectiveBase {
    override name = "class";
    override compile() {}
}
