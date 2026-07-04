/**
 * 负责模板编译
 */
import { AutoTemplateScope } from "../scope";
import { createTemplateContext } from "../context";
import { createDirectives } from "../directives/utils/createDirectives";
import { getDirectives } from "../directives/utils/getDirectives";
import { removeDirectives } from "../directives/utils/removeDirectives";
import type { AutoTemplateEngine } from "../engine";
import { createTemplateCompileContext } from "./context";
import type { TemplateCompileContext } from "./types";
import { transformElement, type NodeTransformer } from "./utils/transformElement";

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
        const htmlTransformer = [
            (node: Node) => {
                return node instanceof HTMLElement;
            },
            (current: HTMLElement, parent: HTMLElement | undefined) => {
                return this.compileElement(current, parent);
            },
        ] as NodeTransformer<HTMLElement>;
        const compileContext = createTemplateCompileContext();
        return transformElement(this.engine.template, [htmlTransformer]);
    }

    compileElement(
        template: HTMLElement,
        parent: HTMLElement | undefined,
        context?: TemplateCompileContext,
    ) {
        const el = template.cloneNode() as HTMLElement;
        const directives = getDirectives(el);
        if (directives.length > 0) {
            removeDirectives(el); // 移除指令,目标元素
            const binding = this._createBinding(el, template);
            binding.directives = createDirectives(this.engine, directives, binding);
        } else {
            // 普通元素，没有指令时，原路返回
            return el;
        }
    }
    private _createBinding(el: HTMLElement, template: HTMLElement) {
        const binding = new AutoTemplateScope(el, template);
        return binding;
    }
}
