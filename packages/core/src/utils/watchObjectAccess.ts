/**
 *
 * m
 */
export type WatchObjectAccessOptions = {
	get?: (path: string[]) => any;
	set?: (path: string[], value: any) => any;
};

/**
 * 创建一个代理对象，用于追踪对对象的访问路径
 * @param {WatchObjectAccessOptions} [options] - 配置选项
 * @param {Function} [options.get] - 当访问属性时调用的回调函数，接收访问路径作为参数
 * @param {Function} [options.set] - 当设置属性时调用的回调函数，接收访问路径和设置的值作为参数
 * @returns {Proxy} 返回一个代理对象，可以通过访问其属性来构建访问路径
 * @example
 * const obj = watchObjectAccess({
 *   get: (path) => console.log('访问路径:', path),
 *   set: (path, value) => console.log('设置路径:', path, '值为:', value)
 * });
 * obj.a.b.c; // 输出: 访问路径: ['a', 'b', 'c']
 * obj.x = 1; // 输出: 设置路径: ['x'] 值为: 1
 */
export function watchObjectAccess(options?: WatchObjectAccessOptions) {
	const { get, set } = options || {};

	// 使用WeakMap来存储路径，避免污染对象
	const pathMap = new WeakMap<object, string[]>();

	const handler: ProxyHandler<any> = {
		get(target, prop: string, receiver) {
			const currentPath = pathMap.get(target) || [];

			// 处理特殊属性，避免被代理
			if (prop === "__path") {
				return currentPath;
			}
			// 如果访问的是Symbol或内置方法，直接返回
			if (typeof prop === "symbol" || prop in Object.prototype) {
				return Reflect.get(target, prop, receiver);
			}

			const newPath = [...currentPath, prop];

			// 如果用户提供了get回调，在这里调用
			if (get) {
				const customResult = get(newPath);
				// 如果回调返回了特定值，就使用该值
				if (customResult !== undefined) {
					return customResult;
				}
			}

			// 创建新的代理对象来继续路径追踪
			const newTarget = {};
			pathMap.set(newTarget, newPath);

			return new Proxy(newTarget, handler);
		},

		set(target, prop: string, value: any) {
			const currentPath = pathMap.get(target) || [];
			const setPath = [...currentPath, prop];
			if (set) {
				set(setPath, value);
			}
			return true;
		},
	};

	// 创建根代理对象
	const rootTarget = {};
	pathMap.set(rootTarget, []);
	return new Proxy(rootTarget, handler);
}
// 测试代码
const proxyState = watchObjectAccess({
	get: (path) => {
		console.log("GET回调 - 完整路径:", path);
		// 当访问到 a.b.c 时返回特定值
		if (path.join(".") === "a.b.c") {
			return "最终的值：" + path.join(" → ");
		}
		// 返回 undefined 表示继续代理
		return undefined;
	},
	set: (path, value) => {
		console.log("SET回调 - 设置路径:", path, "值:", value);
		return true;
	},
});

console.log("=== 测试1: 连续属性访问 ===");
const result1 = proxyState.a.b.c;
console.log("结果:", result1);

console.log("\n=== 测试2: 属性赋值 ===");
proxyState.x.y = 123;

console.log("\n=== 测试3: 检查最终对象 ===");
console.log("最终对象类型:", typeof proxyState.a.b.c);
