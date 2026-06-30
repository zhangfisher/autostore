import type { DirectiveBinding, RenderOptions } from './types';
import type { AutoStore, Watcher } from 'autostore';
import { DirectiveRegistry } from './DirectiveRegistry';
import { TemplateScanner } from './TemplateScanner';

/**
 * AutoStore Template 渲染引擎核心类
 *
 * 负责管理模板渲染的生命周期，包括初始化、启动、停止和销毁。
 * 集成 AutoStore 的 watch 系统，实现响应式 DOM 更新。
 *
 * @example
 * ```html
 * <div id="app">
 *   <span x-text="user.name"></span>
 * </div>
 * ```
 *
 * ```typescript
 * const store = createStore({ user: { name: 'John' } });
 * const app = new AutoTemplate(document.getElementById('app'), store);
 * app.start();
 * ```
 */
export class AutoTemplate {
  /**
   * 根元素引用（D-01, D-02）
   */
  #el: HTMLElement;

  /**
   * AutoStore 实例（D-01, D-02）
   */
  #store: AutoStore;

  /**
   * 配置选项（D-01, D-02）
   */
  #options: RenderOptions;

  /**
   * 指令注册表（D-01, D-03）
   */
  #registry: DirectiveRegistry | null = null;

  /**
   * 模板扫描器（D-01, D-03）
   */
  #scanner: TemplateScanner | null = null;

  /**
   * 所有指令绑定（D-02）
   */
  #bindings: DirectiveBinding[] = [];

  /**
   * 启动状态（D-02）
   */
  #started = false;

  /**
   * watch 监听器清理函数集合（D-14, D-15）
   */
  #watchers: Set<Watcher> = new Set();

  /**
   * 销毁状态（D-17）
   */
  #destroyed = false;

  /**
   * 构造函数
   *
   * @param el - 根元素，必须是 HTMLElement
   * @param store - AutoStore 实例
   * @param options - 配置选项
   * @throws {Error} 如果 el 不是 HTMLElement
   * @throws {Error} 如果 store 无效
   */
  constructor(el: HTMLElement, store: AutoStore, options: RenderOptions = {}) {
    // 验证 el 必须是 HTMLElement
    if (!(el instanceof HTMLElement)) {
      throw new Error('Root element must be an HTMLElement');
    }

    // 验证 store 必须存在且有 watch 方法
    if (!store || typeof store.watch !== 'function') {
      throw new Error('Invalid AutoStore instance');
    }

    // 初始化私有属性（D-01, D-02, D-03）
    this.#el = el;
    this.#store = store;
    this.#options = options;
  }

  /**
   * 启动渲染引擎（CORE-02）
   *
   * 扫描模板中的所有指令，为每个指令建立响应式依赖。
   *
   * @throws {Error} 如果实例已销毁
   */
  start(): void {
    // 销毁检查（D-17, D-18）
    if (this.#destroyed) {
      throw new Error('Cannot start destroyed instance');
    }

    // 幂等性检查（D-18）
    if (this.#started) {
      return;
    }

    // 创建指令注册表和扫描器
    this.#registry = new DirectiveRegistry(this.#store);
    this.#scanner = new TemplateScanner(this.#registry);

    // 扫描模板，提取所有指令绑定
    this.#bindings = this.#scanner.scan(this.#el);

    // 按优先级排序绑定
    this.#bindings = this.#registry.sortByPriority(this.#bindings);

    // 为每个绑定建立监听器（D-15）
    this.#bindings.forEach((binding) => {
      this.#setupWatcher(binding);
    });

    // 标记为已启动
    this.#started = true;

    // Debug 日志
    if (this.#options.debug) {
      this.#store.log(
        `AutoTemplate started with ${this.#bindings.length} directives`,
        'info'
      );
    }
  }

  /**
   * 停止渲染引擎（CORE-03）
   *
   * 移除所有 watch 监听器，停止 DOM 更新。
   * 可以重新调用 start() 恢复（D-19）。
   */
  stop(): void {
    // 检查未启动
    if (!this.#started) {
      return;
    }

    // 如果已销毁，直接返回
    if (this.#destroyed) {
      return;
    }

    // 清理所有监听器（D-16）
    this.#watchers.forEach((watcher) => {
      watcher.off();
    });
    this.#watchers.clear();

    // 调用所有指令的 destroy 方法（如果有）
    this.#bindings.forEach((binding) => {
      const directive = this.#registry?.get(binding.directive);
      if (directive?.destroy) {
        try {
          directive.destroy(binding.element);
        } catch (error) {
          if (this.#options.debug) {
            this.#store.log(
              `Error destroying directive "${binding.directive}": ${error}`,
              'error'
            );
          }
        }
      }
    });

    // 标记为已停止
    this.#started = false;

    // Debug 日志
    if (this.#options.debug) {
      this.#store.log('AutoTemplate stopped', 'info');
    }
  }

  /**
   * 销毁实例（CORE-04）
   *
   * 完全清理资源，实例无法再次使用（D-17：硬销毁语义）。
   *
   * @throws {Error} 如果实例已销毁
   */
  destroy(): void {
    // 硬销毁检查（D-17）
    if (this.#destroyed) {
      throw new Error('Instance already destroyed');
    }

    // 先调用 stop()
    this.stop();

    // 清理所有内部引用
    this.#el = null as any;
    this.#store = null as any;
    this.#options = null as any;
    this.#registry = null;
    this.#scanner = null;
    this.#bindings = [];

    // 标记为已销毁
    this.#destroyed = true;

    // Debug 日志
    if (this.#options.debug && this.#store) {
      this.#store.log('AutoTemplate destroyed', 'info');
    }
  }

  /**
   * 建立监听器（私有方法）
   *
   * 为指令绑定建立 watch 监听器。
   * Phase 2 实现，此处预留（D-15）。
   *
   * @param binding - 指令绑定
   */
  #setupWatcher(binding: DirectiveBinding): void {
    // TODO: Phase 2 - 建立表达式依赖监听
    // 在 Phase 2 实现表达式系统后，这里将：
    // 1. 解析表达式，提取依赖路径
    // 2. 为每个依赖路径建立 watch 监听器
    // 3. 当依赖变化时，调用指令的 update 方法
    //
    // 预期实现：
    // const watcher = this.#store.watch(binding.parsed.dependencies, (operate) => {
    //   const directive = this.#registry?.get(binding.directive);
    //   if (directive?.update) {
    //     directive.update(binding.element, binding, this.#store);
    //   }
    // });
    // this.#watchers.add(watcher);
  }

  /**
   * 获取启动状态（用于测试）
   */
  get isStarted(): boolean {
    this.#checkDestroyed();
    return this.#started;
  }

  /**
   * 获取销毁状态（用于测试）
   */
  get isDestroyed(): boolean {
    return this.#destroyed;
  }

  /**
   * 获取指令注册表（D-08, D-09）
   *
   * 返回内部的 DirectiveRegistry 实例，允许用户注册自定义指令。
   *
   * @example
   * ```typescript
   * app.directives.register('my-directive', {
   *   name: 'my-directive',
   *   priority: 50,
   *   init(el, binding, store) {
   *     // 初始化逻辑
   *   }
   * });
   * ```
   */
  get directives(): DirectiveRegistry {
    this.#checkDestroyed();
    if (!this.#registry) {
      this.#registry = new DirectiveRegistry(this.#store);
    }
    return this.#registry;
  }

  /**
   * 检查实例是否已销毁（私有方法）
   *
   * 在所有公共方法开头调用，如果已销毁则抛出错误（D-17）。
   */
  #checkDestroyed(): void {
    if (this.#destroyed) {
      throw new Error('Cannot use destroyed instance');
    }
  }
}
