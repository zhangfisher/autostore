import { PATH_DELIMITER } from "../consts";
import type { AutoStore } from "../store/store";
import type { Dict } from "../types";
import { isPathEq, isSchemaBuilder, markRaw, pathStartsWith, setVal, watchObjectAccess } from "../utils";
import { getVal } from "../utils/getVal";
import { isFuncDefine } from "../utils/isFuncDefine";
import { parseFunc } from "../utils/parseFunc";
import type {
	SchemaOptions,
	SchemaValidator,
	ComputedSchemaState,
	SchemaDescriptor,
	SchemaDescriptorBuilder,
} from "./types";

export class SchemaManager<
	State extends Dict,
	SchemaStore extends AutoStore<ComputedSchemaState<State>> = AutoStore<ComputedSchemaState<State>>,
> {
	errors: Dict<string> = {}; // {<路径名称>:"错误信息"}
	_subscribers: any[] = [];
	store!: SchemaStore;
	_descriptors: Record<string, SchemaDescriptor["options"]> = {};
	constructor(public shadow: AutoStore<any>) {}

	get fields() {
		return this.store.state as Record<string, SchemaOptions>;
	}
	get size() {
		return Object.keys(this.fields).length;
	}

	_getKey(path: any): string {
		return Array.isArray(path) ? path.join("_$_") : path.split(PATH_DELIMITER).join("_$_");
	}
	_getPath(path: string) {
		return path.split("_$_");
	}

	add<V = any, Options extends SchemaOptions<V> = SchemaOptions<V>>(
		path: string | string[],
		schema: SchemaDescriptorBuilder | SchemaDescriptor<V, Options>,
	) {
		const descriptor = isSchemaBuilder(schema) ? schema() : schema;

		const pathKey = Array.isArray(path) ? path : path.split(PATH_DELIMITER);
		const key = this._getKey(path);
		if (!descriptor.options.onFail) descriptor.options.onFail = "throw-pass";

		const finalDescriptor = Object.assign({}, this.shadow.options.defaultSchemaOptions, descriptor.options, {
			path: pathKey,
			datatype: descriptor.datatype,
			value: descriptor.value,
		}) as unknown as SchemaDescriptor["options"];

		Object.entries(finalDescriptor).forEach(([key, value]) => {
			if (isFuncDefine(value)) {
				const func = parseFunc(value);
				if (typeof func === "function") {
					// if (key === 'onValidate') {
					if (key.startsWith("on") || key.startsWith("to")) {
						(finalDescriptor as any)[key] = markRaw(func);
					} else {
						(finalDescriptor as any)[key] = func;
					}
				}
			}
		});

		this._descriptors[key] = finalDescriptor;

		if (this.shadow && descriptor.value !== undefined && descriptor.flags !== -1) {
			this.shadow.update(
				(state) => {
					setVal(state, pathKey, descriptor.value);
				},
				{
					validate: "pass",
					silent: true,
				},
			);
		}
		return descriptor;
	}
	/**
	 * 等store的所有计算属性处理完毕再创建schemas
	 *
	 */
	build() {
		if (this.store) return;
		if (!this._descriptors) return;
		this.store = this.shadow.shadow(this._descriptors) as unknown as SchemaStore;
	}
	get<T extends keyof SchemaStore["state"] = keyof SchemaStore["state"]>(path: T): SchemaOptions | undefined {
		if (!this.store) return;
		return getVal(this.store.state, [this._getKey(path as any)]);
	}
	has(path: string | string[]): boolean {
		if (!this.store) return false;
		const key = this._getKey(path);
		return key in (this.store.state as any);
	}
	watch() {
		// @ts-ignore
		return this.store.watch(...arguemnts);
	}
	getValidator<T extends keyof SchemaStore["state"] = keyof SchemaStore["state"]>(
		path: T,
	): SchemaValidator<SchemaStore["state"][T]> | undefined {
		if (!this.store) return;
		const options = this.get(path);
		if (!options) return;
		return {
			validate: options.onValidate!,
			onFail: options.onFail!,
			message: options.invalidTips!,
		};
	}

	addValidator(path: string[], validator: SchemaValidator) {
		if (!this.store) return;
		const key = this._getKey(path);
		this.store.update((state) => {
			Object.assign((state as any)[key], {
				onValidate: markRaw(validator.validate),
				onFail: validator.onFail || "throw-pass",
				invalidTips: validator.message,
			});
		});
	}

	remove(path: keyof SchemaStore["state"]) {
		const key = this._getKey(path);
		if (this.store) {
			delete (this.store.state as any)[key];
		}
	}

	getValues() {
		const values: Record<string, any> = {};
		Object.entries(this._descriptors || {}).forEach(([key, options]) => {
			const path = this._getPath(key);
			const name = (options as any).name ?? path.join(PATH_DELIMITER);
			this.shadow.peep((state) => {
				values[name] = getVal(state, path);
			});
		});
		return values;
	}
	/**
	 * 过滤出指定路径的schema
	 *
	 * 如:
	 * schemas.find("user.order")
	 * schemas.find(["user.order","order"])
	 *
	 * @param path
	 */
	find(path: string | string[]) {
		const spath = Array.isArray(path) ? path : path.split(PATH_DELIMITER);
		return Object.entries(this.fields)
			.filter(([key]) => {
				return pathStartsWith(spath, this._getPath(key));
			})
			.map(([_, options]) => {
				return options;
			});
	}
}
