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
 * 根据表达式的值，切换其中一个元素
 * 
 * <div x-switch="表达式">
 *  <div x-case="a"></div>
 *  <div x-case="b"></div>
 *  <div x-case="c"></div>
 *  <div x-case="xxx"></div>
 *  <div x-default="xxx"></div>
 * </div>
 * 
 * varName指向的如果是对象
 *  

 */
export class SwitchDirective extends TemplateDirectiveBase {
    render() {}
}
