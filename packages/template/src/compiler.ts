/**
 * 负责模板编译
 */
import { AutoTemplateBinding } from "./binding";
import type { DirectiveInfo } from "./directives/types";
import type { TemplateDirectiveBase } from "./directives/base";
import type { AutoTemplateEngine } from "./engine";
import { getDirectives } from "./directives/utils/getDirectives";
import { removeDirectives } from "./directives/utils/removeDirectives";

/**
 * 模板译上下文
 */
export type TemplateCompileContext = Record<string, any>[];

export class AutoTemplateCompiler {
    readonly engine: AutoTemplateEngine;
    constructor(engine: AutoTemplateEngine) {
        this.engine = engine;
    }
    /**
     * 开始编译模板
     *
     * 编译步骤如下：
     *
     * const resultEl:HTMLElement 用于保存编译后的根元素引用。模板一定要有一个根元素 
     * 
     * 1. 扫描遍历this.engine.template每一个元素
     *     如果元素不包括指令：
     *        - clone 该元素,
     *     如果元素中包括指令，则需要处理:
     *        - clone该元素，
     *        - 处理元素指令 ，指令包括几种：
     *            - DOM操作： 如x-text，x-html, x-for,x-if等
     *            - 元素事件绑定，如<div @click="xxxx">等
     *            - 属性双向绑定，如<div :title="xxx">等，:title中x-bind="xxx"的快捷方法，用于将元素属性绑定到具体响应式变量
                  - 表单双向绑定，如<input x-model="ssss"/>,x-model是特殊指定，用于
                
            扫描元素上的指令，分别创建Binding对象，Binding对象用于记录模板元素、渲染元素，指令等的映射关系
            
            const binding = new AutoTemplateBinding(parentEl,{
                template: <引用模板元素>，
                el:<clone后的元素，会移除上面的指令>,
                // 经过解析后的指令列表,处理逻辑包括同名，优选级等
                directives:[
                    new TemplateDirective(name,value,modifiers)
                ....
                ]
            }
            binding.render() // 执行渲染操作，内部会依次调用directives进行处理。

            engine.bindings.add(binding)

    2. 处理流程
    
        - 当扫描到此模板元素时，tmpEl=<div class="x" x-text="count" x-text:options="{}"></div>
        - clone元素，resultEl=<div class="x"></div>  
        - 扫描指令，[x-text]
            const binding = new AutoTemplateBinding(parentEl,{
                template: tmpEl，
                el:resultEl, 
                directives:[
                    new TextDirective(.....),
                    ....其他指令
                ]
            }
        - 调用binding.compile() 进行编译
             处理绑定值           
            compile(){
 
            }

             然后调用指令的compile
             上例中调用 x-text指令的compile() 。
        
        - 

             


        
   编译优化：
   为了优化情况，需要进行优化，优化包括但不限于：
   - 同名指令的处理： 有些指定在一个元素中只允许使用一个，
    比如<div x-text="xx" x-text="y"></div> 只有一个可以生效，所以后声明指令生效。
   - 并发编译
     同一DOM元素下的子元素采用并发编译，比如
      <div>
         <span x-text="a"></span>
         <span x-text="b"></span>
         <span x-text="c"></span>
         <span x-text="d"></span>
      </div>
    以上在遍历模板时，在div下的子元素可以并发进行编译



    */
    compile() {
        this._walkTemplate(
            this.engine.template,
            (current: HTMLElement, parent: HTMLElement | undefined) => {
                return this.compileElement(current, parent);
            },
        );
    }

    compileElement(
        template: HTMLElement,
        parent: HTMLElement | undefined,
        contexts?: TemplateCompileContext,
    ) {
        const el = template.cloneNode() as HTMLElement;
        const directives = getDirectives(el);
        if (directives.length > 0) {
            removeDirectives(el); // 移除指令
            const binding = new AutoTemplateBinding(el, template, []);
            binding.directives = this._createDirectives(directives, binding);
        } else {
            return el;
        }
    }
    /**
     *
     * 将读取的指令进行优化处理，转换为指令对象
     *
     * 处理逻辑如下：
     *
     * - 同名指令且单例的指令只有最后一个有效
     *
     * const directiveClass = this.engine.directives.get(name)
     *
     * - 按指令的优先级进行排列，directiveClass.priority越大排在前面
     *
     * 然后创建指令实例
     *
     *
     *
     * @param directives 返回指令实例对象
     */
    private _createDirectives(
        directives: DirectiveInfo[],
        binding: AutoTemplateBinding,
    ): TemplateDirectiveBase[] {
        // 解析每个指令对应的类，并处理同名单例去重（取最后声明的）
        const resolved: Array<{ info: DirectiveInfo; cls: typeof TemplateDirectiveBase }> = [];
        // 单例指令 name -> resolved 中的索引，用于覆盖为最后声明
        const singletonPos = new Map<string, number>();
        for (const info of directives) {
            const cls = this.engine.directives.get(info.name);
            if (!cls) continue; // 未注册指令静默跳过

            if (cls.singleton) {
                const pos = singletonPos.get(info.name);
                if (pos !== undefined) {
                    // 单例同名：后声明覆盖先声明
                    resolved[pos] = { info, cls };
                } else {
                    singletonPos.set(info.name, resolved.length);
                    resolved.push({ info, cls });
                }
            } else {
                // 非单例：允许同名多实例，直接追加
                resolved.push({ info, cls });
            }
        }

        // 按 priority 降序排列（大的排前、先执行）；相同时保持声明顺序（Array.sort 稳定）
        resolved.sort((a, b) => b.cls.priority - a.cls.priority);

        // 实例化：将 DirectiveInfo 整体传入指令构造函数
        return resolved.map(({ info, cls }) => new cls(this.engine, binding, info));
    }

    private _createBinding(
        el: HTMLElement,
        template: HTMLElement,
        parent: HTMLElement | undefined,
        contexts?: TemplateCompileContext,
    ) {
        const binding = new AutoTemplateBinding(el, template);
        return binding;
    }

    /**
     * 遍历 DOM 树
     *
     *
     * @param el - 根元素
     */
    private _walkTemplate(
        el: HTMLElement,
        callback: (
            el: HTMLElement,
            parent: HTMLElement | undefined,
        ) => HTMLElement | undefined | null | void,
    ): HTMLElement {
        const queue: Array<{
            originalNode: Node;
            parentNewNode: Node | null;
            parentOriginalNode: Node | null;
        }> = [{ originalNode: el, parentNewNode: null, parentOriginalNode: null }];

        let rootNewNode: HTMLElement | null = null;

        while (queue.length > 0) {
            const item = queue.shift();
            if (!item) continue;

            const { originalNode, parentNewNode, parentOriginalNode } = item;

            // 只处理元素节点
            if (originalNode.nodeType !== Node.ELEMENT_NODE) {
                // 非元素节点：直接克隆并添加到父节点
                const newNode = originalNode.cloneNode(false);
                if (parentNewNode) {
                    parentNewNode.appendChild(newNode);
                }
                continue;
            }

            const elementNode = originalNode as HTMLElement;
            const parentElement = parentOriginalNode as HTMLElement | undefined;

            // 调用 callback，传入当前元素和父元素
            const callbackResult = callback(elementNode, parentElement);

            // 如果 callback 返回 undefined 或 null，跳过该节点及其子树
            if (callbackResult === undefined || callbackResult === null) {
                continue;
            }

            // 创建新节点
            const newNode = callbackResult;

            // 如果是根节点，保存引用
            if (originalNode === el) {
                rootNewNode = newNode;
            }

            // 添加到父节点
            if (parentNewNode) {
                parentNewNode.appendChild(newNode);
            }

            // 遍历子节点（继续深入）
            if (originalNode.childNodes) {
                const children = originalNode.childNodes;
                for (let i = 0; i < children.length; i++) {
                    const child = children[i];
                    if (child) {
                        queue.push({
                            originalNode: child,
                            parentNewNode: newNode,
                            parentOriginalNode: elementNode,
                        });
                    }
                }
            }
        }

        if (!rootNewNode) {
            throw new Error("Failed to create root element");
        }

        return rootNewNode;
    }
}
