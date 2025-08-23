import {
	type AutoStore,
	getVal,
	isAsyncComputedValue,
	PATH_DELIMITER,
	pathStartsWith,
	setVal,
	type StateOperate,
	type Watcher,
} from "autostore";
import type { AutoStoreSyncerOptions, StateRemoteOperate } from "./types";
import { forEachObject } from "./utils/forEachObject";
import { isFunction } from "./utils/isFunction";
import { getSnapshot } from "../../core/src/utils/getSnapshot";

type NormalizeAutoStoreSyncerOptions = Required<
	Omit<AutoStoreSyncerOptions, "local" | "remote"> & {
		local: string[];
		remote: string[];
	}
>;

export const SYNC_INIT_FLAG = -1;

export class AutoStoreSyncer {
	static seq = 9;
	private _options: NormalizeAutoStoreSyncerOptions;
	syncing: boolean = false;
	peer?: AutoStoreSyncer;
	private _watcher: Watcher | undefined;
	private _operateCache: StateRemoteOperate[] = []; // 本地操作缓存,
	private seq: number = 0; // 实例标识
	constructor(
		public store: AutoStore<any>,
		options?: AutoStoreSyncerOptions,
	) {
		this._options = Object.assign(
			{
				id: store.id,
				mode: "push",
				local: [],
				remote: [],
				autostart: true,
				maxCacheSize: 100,
				immediate: false,
				direction: "both",
				pathMap: {},
			},
			options,
		) as any;
		if (typeof this._options.local === "string")
			this._options.local = (this._options.local as string).split(PATH_DELIMITER);
		if (typeof this._options.remote === "string")
			this._options.remote = (this._options.remote as string).split(PATH_DELIMITER);
		this.seq = ++AutoStoreSyncer.seq;
		this._options.autostart && this.start();
		if (this.options.immediate && this._options.autostart) {
			if (this._options.mode === "push") {
				this.push({ initial: true });
			} else {
				this.pull();
			}
		}
	}
	get id() {
		return this._options.id;
	}
	get options() {
		return this._options;
	}
	get transport() {
		return this._options.transport;
	}
	get localEntry() {
		return this._options.local;
	}
	get remoteEntry() {
		return this._options.remote;
	}

	private createRemoteOperate(operate: StateOperate) {
		return {
			id: this.id,
			type: operate.type,
			path: operate.path,
			parentPath: operate.parentPath,
			value: operate.value,
			indexs: operate.indexs,
			flags: operate.flags,
		} as StateRemoteOperate;
	}

	start() {
		if (!this.transport?.ready) {
			throw new Error("AutoStore sync transport not ready");
		}
		if (this.syncing) return;
		try {
			this.syncing = true;
			// 发送更新到了远程
			this._watcher = this.store.watch(
				(operate) => {
					if (this._isPass(operate.path, operate.value) === false) return;
					// 为什么要Math.abs?
					// 在初始化进行第一次同步时传送seq时使用了负数，这样就可以让接收方区分是否是第一次同步
					if (Math.abs(operate.flags || 0) === this.seq) return;
					if (this.options.direction === "backward") return;
					this._sendToRemote(operate);
				},
				{
					operates: "write",
				},
			);
			// 收到远程更新
			this._options.transport.receive((operate) => {
				if (this.options.direction === "forward" && !operate.type.startsWith("$")) return;
				this._onReceiveFromRemote(operate);
			});
		} catch (e) {
			this.syncing = false;
			throw e;
		}
	}

	private _isPass(path: string[], value: any) {
		if (isFunction(this._options.filter)) {
			return this._options.filter(path, value);
		}
		return true;
	}

	private _sendToRemote(operate: StateOperate) {
		const localEntry = this.options.local;
		const remoteEntry = this.options.remote;

		if (!pathStartsWith(this._options.local, operate.path)) return;
		// 路径变换
		if (typeof this._options.pathMap.toRemote === "function") {
			const toPath = this._options.pathMap.toRemote(
				operate.path.slice(this._options.local.length),
				operate.value,
			);
			if (toPath) {
				operate.path = [...remoteEntry, ...toPath];
			}
		} else {
			operate.path = [...remoteEntry, ...operate.path.slice(localEntry.length)];
		}

		const remoteOperate = this.createRemoteOperate(operate);

		if (typeof this._options.onSend === "function") {
			if (this._options.onSend.call(this, remoteOperate) === false) return;
		}
		this._sendOperate(remoteOperate);
	}

	private _onReceiveFromRemote(operate: StateRemoteOperate) {
		if (typeof this._options.onReceive === "function") {
			if (this._options.onReceive.call(this, operate) === false) return;
		}
		if (operate.type === "$stop") {
			this.stop(false);
			this.transport.onStop?.();
		} else if (operate.type === "$push") {
			this._updateStore(operate);
		} else if (operate.type === "$pull-store") {
			this._sendStore(operate);
		} else if (operate.type === "$update-store") {
			this._updateStore(operate);
		} else if (operate.type === "$pull-schemas") {
			this._sendSchemas(operate);
		} else if (["$update-schemas", "$push-schemas"].includes(operate.type)) {
			this._updateSchemas(operate);
		} else {
			this._applyOperate(operate);
		}
	}

	private _applyOperate(operate: StateRemoteOperate) {
		const { type, value, indexs } = operate;
		// 路径映射
		const newPath = this._mapPath(operate.path, operate.value, "toLocal");
		if (!newPath) return;
		operate.path = newPath;

		const toPath = [...this.localEntry, ...operate.path.slice(this.options.remote.length)];
		const updateOpts = {
			flags: operate.flags === SYNC_INIT_FLAG ? -this.seq : this.seq,
		};
		if (type === "set" || type === "update") {
			this.store.update((state) => {
				// getVal提供一个默认值，否则当目标路径不存在时会触发invalid state path error
				if (isAsyncComputedValue(getVal(state, toPath, true))) {
					setVal(state, toPath.concat("value"), value);
				} else {
					setVal(state, toPath, value);
				}
			}, updateOpts);
		} else if (type === "delete") {
			this.store.update((state) => {
				setVal(state, toPath, undefined);
			}, updateOpts);
		} else if (type === "insert") {
			this.store.update((state) => {
				const arr = getVal(state, toPath);
				if (indexs) arr.splice(indexs[0], 0, ...value);
			}, updateOpts);
		} else if (type === "remove") {
			this.store.update((state) => {
				const arr = getVal(state, toPath);
				if (indexs) {
					arr.splice(indexs[0], indexs.length);
				}
			}, updateOpts);
		}
	}

	stop(disconnect: boolean = true) {
		if (!this.syncing) return;
		this._watcher?.off();
		this.syncing = false;
		if (disconnect) this._disconnect();
	}

	private _disconnect() {
		// 向对方发送一个停止同步的信号
		this._options.transport.send({
			id: this.id,
			type: "$stop",
			path: [],
			value: undefined,
			flags: 0,
		});
		this.transport.onStop?.();
	}
	/**
	 *
	 * 将本地操作缓存发送到远程
	 *
	 * 当Transport没有准备好时，如果有本地操作，则会缓存到本地操作缓存中，直到Transport准备好
	 * 然后应该调用此方法，将本地操作缓存发送到远程
	 *
	 */
	async flush() {
		this._asertTransportReady();
		await Promise.all(
			this._operateCache.map((operate) => {
				return this._options.transport.send(operate);
			}),
		).finally(() => {
			this._operateCache = [];
		});
	}
	private _asertTransportReady() {
		if (!this.transport.ready) {
			throw new Error("transport not ready");
		}
	}
	private _sendOperate(operate: StateRemoteOperate) {
		// 传输未准备好
		if (!this.transport || !this.transport.ready) {
			this._operateCache.push(operate);
			if (this._operateCache.length > this._options.maxCacheSize) {
				this._operateCache.shift();
			}
			return;
		}
		this._options.transport.send(operate);
	}

	private _getLocalSnap() {
		return this.store.getSnap({ entry: this._options.local.join(PATH_DELIMITER) });
	}
	/**
	 * 将本地store推送到远程
	 *
	 * @param initial 是否是第一次同步
	 *
	 */
	push(options?: { initial?: boolean; includeSchemas?: boolean }) {
		const { initial, includeSchemas } = Object.assign(
			{
				initial: false,
				includeSchemas: true,
			},
			options,
		);
		this._pushStore(initial);
		if (includeSchemas) this._pushSchemas(initial);
	}
	_pushStore(initial: boolean = false) {
		const localSnap = this._getLocalSnap();
		if (typeof this._options.pathMap.toRemote === "function") {
			forEachObject(localSnap, ({ value, path }) => {
				if (this._isPass(path, value) === false) return;
				const toValue = Array.isArray(value) ? [] : typeof value === "object" ? {} : value;
				const toPath = this._mapPath(path, toValue, "toRemote");
				if (toPath) {
					const operate = {
						type: "set",
						path: [...this.options.remote, ...toPath],
						value: toValue,
					} as StateRemoteOperate;
					if (initial) operate.flags = SYNC_INIT_FLAG;
					this._sendOperate(operate);
				}
			});
		} else {
			this._sendOperate({
				id: this.id,
				type: "$push",
				path: this.options.remote,
				value: localSnap,
				flags: initial ? SYNC_INIT_FLAG : 0,
			} as StateRemoteOperate);
		}
	}
	_pushSchemas(initial: boolean = false) {
		const toSchemas: Record<string, any> = this._getSerializedSchemas(this.options.local);
		this._sendOperate({
			id: this.id,
			type: "$push-schemas",
			path: [],
			value: toSchemas,
			flags: initial ? SYNC_INIT_FLAG : 0,
		} as StateRemoteOperate);
	}
	/**
	 * 向远程发送整个store
	 */
	private _sendStore(operate: StateRemoteOperate) {
		this._sendOperate({
			id: this.id,
			type: "$update-store",
			path: [],
			value: this.store.getSnap({ entry: operate.path.join(PATH_DELIMITER) }),
			flags: this.seq,
		});
	}
	/**
	 * 响应$push时调用此方法
	 * @param operate
	 */
	private _updateStore(operate: StateRemoteOperate) {
		if (typeof this._options.pathMap.toLocal === "function") {
			forEachObject(operate.value, ({ value, path }) => {
				if (this._isPass(path, value) === false) return;
				const toValue = Array.isArray(value) ? [] : typeof value === "object" ? {} : value;
				const toPath = this._mapPath(path, toValue, "toLocal");
				if (toPath) {
					this.store.update(
						(state) => {
							setVal(state, [...this.localEntry, ...toPath], toValue);
						},
						{
							flags: this.seq,
						},
					);
				}
			});
		} else {
			const toPath = [...this.localEntry, ...operate.path];
			this.store.update(
				(state) => {
					setVal(state, toPath, operate.value);
				},
				{
					flags: this.seq,
				},
			);
		}
	}

	_getSerializedSchemas(path: string[]) {
		if (!this.store.schemas.store) return;
		const entry = path.join("_$_");
		return getSnapshot(
			Object.entries(this.store.schemas.store.state).reduce((result, [key, schema]) => {
				if (path.length === 0 || key.startsWith(entry)) {
					let toPath: any;
					if (isFunction(this._options.pathMap.toRemote)) {
						toPath = this._mapPath(key.split("_$_"), (schema as any).value, "toRemote");
					} else {
						toPath = key.split("_$_");
					}

					result[[...this.options.remote, ...toPath].join("_#_")] = schema;
				}
				return result;
			}, {} as any),
			{ includeFunc: true },
		);
	}
	/**
	 * 当接收到 @pull-schemas时的响应
	 */
	private _sendSchemas(operate: StateRemoteOperate) {
		const schemas = this._getSerializedSchemas(operate.path);
		if (!schemas) return;
		this._sendOperate({
			id: this.id,
			type: "$update-schemas",
			path: [],
			value: schemas,
			flags: this.seq,
		});
	}

	private _updateSchemas(operate: StateRemoteOperate) {
		const schemas = operate.value;
		if (!schemas) return;
		Object.entries(schemas).forEach(([key, schema]: [string, any]) => {
			let toPath = key.split("_#_");
			if (isFunction(this.options.pathMap.toLocal)) {
				const spath = this._mapPath(toPath, schema.value, "toLocal");
				if (spath) {
					toPath = spath;
				}
			}
			this.store.schemas.add([...this.localEntry, ...toPath], {
				datatype: schema.datatype,
				value: schema.value,
				options: schema,
			});
		});
		this.store.schemas.build();
	}
	private _pullSchemas() {
		this._sendOperate({
			id: this.id,
			type: "$pull-schemas",
			path: this.options.remote,
			value: undefined,
			flags: 0,
		} as StateRemoteOperate);
	}

	private _pullStore() {
		this._sendOperate({
			id: this.id,
			type: "$pull-store",
			path: this.options.remote,
			value: undefined,
			flags: 0,
		} as StateRemoteOperate);
	}
	/**
	 * 从远程store拉取数据
	 */
	pull() {
		this._pullStore();
		this._pullSchemas();
	}
	private _mapPath(path: string[], value: any, dir: string): string[] | undefined {
		return this._options.pathMap && isFunction((this._options.pathMap as any)[dir])
			? (this._options.pathMap as any)[dir](path, value)
			: path;
	}
	toString() {
		return `AutoStoreSyncer(${this.id})`;
	}
}
