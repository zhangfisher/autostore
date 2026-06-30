import type { Directive, DirectiveBinding } from './types';
import type { AutoStore } from '@autostorejs/core';

/**
 * 指令注册表类
 *
 * 负责管理指令的注册、查询和排序。
 * 使用 Map 存储指令，支持自定义指令覆盖内置指令。
 */
export class DirectiveRegistry {
  /**
   * 指令存储映射
   *
   * 键为指令名称，值为指令对象。
   */
  #directives: Map<string, Directive>;

  /**
   * AutoStore 实例引用（用于日志记录）
   */
  #store: AutoStore | null = null;

  constructor(store?: AutoStore) {
    this.#directives = new Map();
    this.#store = store || null;
  }

  /**
   * 注册指令
   *
   * 如果同名指令已存在，记录 info 日志并覆盖（D-12：后注册覆盖先注册）。
   *
   * @param name - 指令名称，不能为空
   * @param directive - 指令对象，必须包含 init 方法
   * @throws {Error} 如果指令名称为空
   * @throws {Error} 如果指令对象缺少 init 方法
   */
  registerDirective(name: string, directive: Directive): void {
    // 验证指令名称非空（D-11：输入验证）
    if (!name || name.trim() === '') {
      throw new Error('Directive name cannot be empty');
    }

    // 验证指令对象必须包含 init 方法（D-11：输入验证）
    if (!directive || typeof directive.init !== 'function') {
      throw new Error('Directive must have an init method');
    }

    // 如果已存在同名指令，记录 info 日志并覆盖（D-12：后注册覆盖先注册）
    if (this.#directives.has(name)) {
      if (this.#store) {
        this.#store.log(
          `Directive "${name}" is being overridden by a new registration`,
          'info'
        );
      }
    }

    // 将指令存入 Map（D-06：使用 Map 存储指令）
    this.#directives.set(name, directive);
  }

  /**
   * 获取指令对象
   *
   * @param name - 指令名称
   * @returns 指令对象，如果不存在则返回 undefined
   */
  get(name: string): Directive | undefined {
    return this.#directives.get(name);
  }

  /**
   * 检查指令是否已注册
   *
   * @param name - 指令名称
   * @returns 如果已注册返回 true，否则返回 false
   */
  has(name: string): boolean {
    return this.#directives.has(name);
  }

  /**
   * 获取所有已注册的指令
   *
   * @returns 指令对象数组
   */
  getDirectives(): Directive[] {
    return Array.from(this.#directives.values());
  }

  /**
   * 按优先级排序指令绑定
   *
   * 根据指令的 priority 属性降序排序（priority 大的在前）。
   * 用于确保指令按正确顺序执行（D-07：优先级系统）。
   *
   * @param bindings - 指令绑定数组
   * @returns 按优先级降序排序后的指令绑定数组
   */
  sortByPriority(bindings: DirectiveBinding[]): DirectiveBinding[] {
    return bindings.slice().sort((a, b) => {
      const directiveA = this.#directives.get(a.directive);
      const directiveB = this.#directives.get(b.directive);

      const priorityA = directiveA?.priority ?? 0;
      const priorityB = directiveB?.priority ?? 0;

      // 降序排序：priority 大的在前
      return priorityB - priorityA;
    });
  }
}
