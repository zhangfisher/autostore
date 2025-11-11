/**
 *
 * makeTranferbject创建一个代理对象
 *
 * 可以拦截对象的访问，并返回访问的
 *
 *
 *  proxyState = markAnyProxy({
 *      get: (path) => {
 *
 *      }
 *  })
 *
 *  - 读取对象的属性
 *  console.log(proxyState.a.b.c)
 * *  proxyState = markAnyProxy({
 *      get: (path) => {
 *          // 此处可以获取到path=['a', 'b', 'c']
 *      }
 *  })
 *
 */
export type WatchObjectAccessOptions = {
	get?: (path: string[]) => any;
	set?: (path: string[], value: any) => any;
};

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
// const proxyState = watchObjectAccess({
// 	get: (path) => {
// 		// 当访问到 a.b.c 时返回特定值
// 		if (path.join(".") === "a.b.c.d") {
// 			return "最终的值：" + path.join(" → ");
// 		}
// 		// 返回 undefined 表示继续代理
// 		return undefined;
// 	},
// 	set: (path, value) => {
// 		console.log("SET回调 - 设置路径:", path, "值:", value);
// 		return true;
// 	},
// });

// console.log("proxyState.a.b.c.d", proxyState.a.b.c.d);
