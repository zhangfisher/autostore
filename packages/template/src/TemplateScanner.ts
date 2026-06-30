import type { DirectiveBinding } from './types';
import { DirectiveRegistry } from './DirectiveRegistry';

/**
 * 模板扫描器类
 *
 * 负责扫描 DOM 元素树，提取所有指令绑定。
 * 使用 TreeWalker API 高效遍历 DOM，使用 WeakMap 追踪已扫描元素。
 */
export class TemplateScanner {
  /**
   * 指令注册表引用
   */
  #registry: DirectiveRegistry;

  /**
   * 已扫描元素追踪
   *
   * 使用 WeakMap 避免内存泄漏（D-09）。
   * 在每次 scan() 调用时清空，在实例级别追踪。
   */
  #scannedElements: WeakMap<HTMLElement, boolean>;

  /**
   * 指令属性匹配模式
   *
   * 匹配以 x- 开头的属性，捕获指令名称。
   * 例如：x-text, x-if, x-for
   */
  #directivePattern = /^x-(\w+)(?::|$)/;

  constructor(registry: DirectiveRegistry) {
    this.#registry = registry;
    this.#scannedElements = new WeakMap();
  }

  /**
   * 扫描元素树，提取所有指令绑定
   *
   * 清空已扫描记录，开始新的全量扫描（D-08）。
   *
   * @param el - 根元素
   * @returns 找到的所有指令绑定数组
   */
  scan(el: HTMLElement): DirectiveBinding[] {
    // 清空已扫描记录（D-09：实例级别追踪）
    this.#scannedElements = new WeakMap();

    // 创建结果数组
    const bindings: DirectiveBinding[] = [];

    // 遍历 DOM 树
    this.#walk(el, bindings);

    // 返回所有找到的指令绑定
    return bindings;
  }

  /**
   * 扫描新增元素（增量扫描）
   *
   * 用于动态添加元素后的增量扫描（D-08：增量扫描策略）。
   * 不清空已扫描记录，只扫描新元素。
   *
   * @param elements - 新增元素数组
   * @returns 新找到的指令绑定数组
   */
  scanNew(elements: HTMLElement[]): DirectiveBinding[] {
    const newBindings: DirectiveBinding[] = [];

    // 遍历每个新元素
    for (const element of elements) {
      this.#walk(element, newBindings);
    }

    return newBindings;
  }

  /**
   * 遍历 DOM 树（私有方法）
   *
   * 使用 TreeWalker API 高效遍历（D-10）。
   * 跳过已扫描的元素，提取每个元素上的指令。
   *
   * @param el - 根元素
   * @param bindings - 指令绑定数组（累加结果）
   */
  #walk(el: HTMLElement, bindings: DirectiveBinding[]): void {
    // 使用 TreeWalker API 遍历 DOM（D-10）
    const walker = document.createTreeWalker(
      el,
      NodeFilter.SHOW_ELEMENT,
      null
    );

    let node: Node | null = walker.currentNode;

    // 遍历所有节点
    while (node !== null) {
      // 只处理 HTMLElement
      if (node instanceof HTMLElement) {
        // 跳过已扫描元素（D-09：避免重复扫描）
        if (this.#scannedElements.has(node)) {
          node = walker.nextNode();
          continue;
        }

        // 标记为已扫描
        this.#scannedElements.set(node, true);

        // 提取元素上的指令
        this.#extractDirectives(node, bindings);
      }

      node = walker.nextNode();
    }
  }

  /**
   * 提取元素上的指令（私有方法）
   *
   * 遍历元素的所有属性，找到以 x- 开头的指令属性。
   * 如果指令在注册表中存在，创建绑定并添加到数组。
   * 如果指令不存在，静默跳过（D-11：静默失败策略）。
   *
   * @param el - 元素
   * @param bindings - 指令绑定数组（累加结果）
   */
  #extractDirectives(el: HTMLElement, bindings: DirectiveBinding[]): void {
    // 获取所有属性
    const attributes = Array.from(el.attributes);

    // 遍历属性
    for (const attr of attributes) {
      // 匹配指令名称
      const match = attr.name.match(this.#directivePattern);

      if (!match) {
        continue;
      }

      // 提取指令名称（转为小写）
      const directiveName = match[1]?.toLowerCase();

      // 如果指令名称无效，跳过
      if (!directiveName) {
        continue;
      }

      // 检查指令是否在注册表中
      if (this.#registry.has(directiveName)) {
        // 创建指令绑定
        bindings.push({
          directive: directiveName,
          expression: attr.value,
          element: el,
          parsed: null,
        });
      } else {
        // 指令不存在，静默跳过（D-11：静默失败策略）
        // 不抛出错误，只忽略未知指令
      }
    }
  }
}
