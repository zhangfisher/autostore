import { KylinTemplateDirectiveBase } from "../base";

/**
 * 
 *  用于渲染树
 * 
 * 根据表达式的值，切换其中一个元素
 * 
 * <ul x-tree="树数据" x-tree:options="{....}">
 *  <li x-tree-node="节点id" x-text="node.id">
 *      <span x-text="node.text"></span>
 *  </li>
 * </ul>
 * 
 * varName指向的如果是对象
 *  

 */
export class TreeDirective extends KylinTemplateDirectiveBase {
    render() {}
}
