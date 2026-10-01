/**
 * reset 基线追踪器
 *
 * 捕获对象是**基线**——状态路径首次变脏那一刻的快照，而非被逆放的操作序列。
 * 详见 ADR-0037。
 *
 * 三条不变量：
 * 1. 基线采集只读原始快照（operate 的旧值、数组方法的前像、原始容器），
 *    绝不经过响应式代理——否则会在正在求值的计算属性中注册依赖、污染依赖追踪。
 * 2. 采集发生在**变更之前**，因此同步执行，不可用 setTimeout/queueMicrotask 推迟：
 *    reset() 与变更是同 tick 的同步调用，推迟后记录必然为空。
 * 3. 对象基线保存旧引用（写入后即脱离状态树，保持原样），数组基线保存元素浅拷贝表
 *    （与活数组共享元素，故其后代的基线仍需单独记录并在数组之后还原）。
 */
import { PATH_DELIMITER } from "../consts";
import { joinPath, splitPath } from "../utils";

/** 重置范围配置 */
export type ResetableConfig = boolean | string[];

/** 单条路径的基线 */
export type ResetBaseline =
    /** 键在基线时刻不存在（区别于"值为 undefined"） */
    | { kind: "absent" }
    /** 标量，或已脱离状态树的对象旧引用 */
    | { kind: "value"; value: any }
    /** 数组元素表快照 */
    | { kind: "array"; items: any[]; length: number };

interface ResetRule {
    segments: string[];
    /** true 为排除规则（`!` 前缀） */
    exclude: boolean;
}

/** 追踪器所需的宿主能力，避免与 store 形成运行时循环依赖 */
export interface ResetTrackerHost {
    computedObjects: { size: number; has(key: string): boolean };
    readonly silenting: boolean;
    readonly batching: boolean;
    logger: { warn(...args: any[]): void };
}

function isObject(value: any): value is Record<string, any> {
    return typeof value === "object" && value !== null;
}

/**
 * 规则匹配：`rule` 命中 `path` 当且仅当 path 位于 rule 之下（含自身）。
 *
 * - `**` 匹配剩余任意层级（**含零层**，故 `!**` 排除整棵树）
 * - `*` 匹配恰好一层
 * - 其余为字面量比较
 */
function matchSegments(rule: string[], path: string[]): boolean {
    for (let i = 0; i < rule.length; i++) {
        const segment = rule[i];
        if (segment === "**") return true;
        if (i >= path.length) return false;
        if (segment === "*") continue;
        if (segment !== path[i]) return false;
    }
    // 规则用尽：path 落在规则的子树内
    return true;
}

function isPrefixOf(prefix: string[], path: string[]): boolean {
    if (prefix.length > path.length) return false;
    for (let i = 0; i < prefix.length; i++) {
        if (prefix[i] !== path[i]) return false;
    }
    return true;
}

function parseRule(raw: string): ResetRule {
    const exclude = raw.startsWith("!");
    return { segments: splitPath(exclude ? raw.slice(1) : raw), exclude };
}

/**
 * 沿路径写入，缺失的中间容器按下一段是否为数组下标自动创建。
 *
 * 不复用 `setVal`：它在 `current` 为 undefined 时会抛 TypeError，
 * 且数组末段为 `length` 时会抛 "invalid array index"——两者都让 reset 半写不回滚。
 */
function writePath(root: any, segments: string[], value: any): void {
    let current = root;
    for (let i = 0; i < segments.length - 1; i++) {
        const key = segments[i];
        let next = current[key];
        if (!isObject(next)) {
            next = /^\d+$/.test(segments[i + 1]) ? [] : {};
            current[key] = next;
        }
        current = next;
    }
    current[segments[segments.length - 1]] = value;
}

function deletePath(root: any, segments: string[]): void {
    let current = root;
    for (let i = 0; i < segments.length - 1; i++) {
        const next = current[segments[i]];
        if (!isObject(next)) return;
        current = next;
    }
    if (isObject(current)) delete current[segments[segments.length - 1]];
}

function getPath(root: any, segments: string[]): any {
    let current = root;
    for (let i = 0; i < segments.length; i++) {
        if (!isObject(current)) return undefined;
        current = current[segments[i]];
    }
    return current;
}

export class ResetTracker {
    private baselines = new Map<string, ResetBaseline>();
    /** null 表示无规则（全记） */
    private rules: ResetRule[] | null = null;
    /** 存在纳入规则时，零命中默认不可重置 */
    private hasIncludeRule = false;
    private _enabled = false;
    private host: ResetTrackerHost;

    constructor(host: ResetTrackerHost) {
        this.host = host;
    }

    get enabled(): boolean {
        return this._enabled;
    }

    /** 当前基线条目数 */
    get size(): number {
        return this.baselines.size;
    }

    /**
     * 装载/卸载采集。
     *
     * `false` 与 `[]` 均视为禁用；`true` 为全记快路径；其余按路径规则解析。
     * 任何配置变化都清空已有基线——适用集已变，旧基线不再可靠。
     */
    configure(config: ResetableConfig | undefined): void {
        const enabled = config === true || (Array.isArray(config) && config.length > 0);
        this._enabled = enabled;
        this.baselines.clear();
        if (!enabled) {
            this.rules = null;
            this.hasIncludeRule = false;
            return;
        }
        if (Array.isArray(config)) {
            this.rules = config.map(parseRule);
            this.hasIncludeRule = this.rules.some((rule) => !rule.exclude);
        } else {
            this.rules = null;
            this.hasIncludeRule = false;
        }
    }

    clear(): void {
        this.baselines.clear();
    }

    /**
     * 判定路径是否可重置：**首匹配即止**，更靠前的规则遮蔽更靠后的规则。
     *
     * 零命中时由是否存在纳入规则兜底：存在纳入规则 → 默认不可重置（规则集是收窄）；
     * 只有排除规则 → 默认可重置（`['!x']` 即"除 x 外都记"）。
     */
    isResettable(path: string[]): boolean {
        const rules = this.rules;
        if (!rules) return true;
        for (const rule of rules) {
            if (matchSegments(rule.segments, path)) return !rule.exclude;
        }
        return !this.hasIncludeRule;
    }

    /**
     * 键写入/删除前采集基线。
     *
     * @param existed 变更前键是否存在
     * @param oldValue 变更前的值（原始对象，非代理）
     * @param newValue 将要写入的值，用于识别空写
     */
    captureKey(path: string[], existed: boolean, oldValue: any, newValue?: any): void {
        if (!this.canCapture || path.length === 0) return;
        // 数组一律拍全表，由 captureArray 负责
        if (Array.isArray(oldValue)) return;
        if (existed && oldValue === newValue) return;
        if (this.isComputedPath(path)) return;
        if (!this.isResettable(path)) return;
        const key = joinPath([path]);
        if (this.baselines.has(key)) return;
        // 对象旧引用写入后即脱离状态树，其后代无需单独记录
        if (this.coversFromAncestor(path)) return;
        // 子树内已有脏路径时不再捕获本容器基线：旧引用已带上后代的变更，
        // 整体捕获会吞掉那些后代的还原。降级为保留后代基线（ADR-0037 后果）
        if (existed && isObject(oldValue) && this.hasDirtyDescendant(key)) return;
        this.baselines.set(key, existed ? { kind: "value", value: oldValue } : { kind: "absent" });
    }

    /**
     * 数组被结构/下标/length 改写前采集基线（元素表浅拷贝）。
     *
     * @param array 变更前的原始数组
     */
    captureArray(path: string[], array: any[]): void {
        if (!this.canCapture || path.length === 0) return;
        if (this.isComputedPath(path)) return;
        if (!this.isResettable(path)) return;
        const key = joinPath([path]);
        if (this.baselines.has(key)) return;
        this.baselines.set(key, {
            kind: "array",
            items: array.slice(),
            length: array.length,
        });
    }

    /**
     * 把基线还原到状态树。
     *
     * 永不抛出：逐条 try/catch，失败项 warn 且保留其基线以便重试。
     *
     * @param entry 仅还原该路径及其后代的基线；缺省为全部
     */
    restore(state: any, entry?: string): void {
        const entrySegments = entry ? splitPath(entry) : undefined;
        // 预检：筛出命中 entry 的基线
        const candidates: { key: string; segments: string[]; baseline: ResetBaseline }[] = [];
        for (const [key, baseline] of this.baselines) {
            const segments = splitPath(key);
            if (entrySegments && !isPrefixOf(entrySegments, segments)) continue;
            candidates.push({ key, segments, baseline });
        }
        if (candidates.length === 0) return;

        // 吸收：祖先已能完整还原的后代不再单独还原（仅对象型基线成立，
        // 数组元素表与活数组共享引用，其后代必须随后单独还原）
        const candidateMap = new Map(candidates.map((item) => [item.key, item.baseline]));
        const targets = candidates.filter(
            (item) => !this.coveredIn(item.segments, candidateMap),
        );

        // 祖先先于后代：数组基线与其后代的还原顺序依赖此
        targets.sort((a, b) => a.segments.length - b.segments.length);

        const consumed: string[] = [];
        for (const target of targets) {
            try {
                // 规则可能已在捕获之后变更，恢复期复算（ADR-0037）
                if (!this.isResettable(target.segments)) continue;
                this.restoreNode(state, target.segments, target.baseline);
                consumed.push(target.key);
            } catch (e) {
                this.host.logger.warn(`reset: 还原路径 "${target.key}" 失败`, e);
            }
        }
        consumed.forEach((key) => this.baselines.delete(key));
    }

    /** 只读调试视图：路径 -> 基线值（`absent` 呈现为 undefined） */
    toDebugRecord(): Record<string, any> {
        const record: Record<string, any> = {};
        for (const [key, baseline] of this.baselines) {
            record[key] =
                baseline.kind === "absent"
                    ? undefined
                    : baseline.kind === "array"
                      ? baseline.items.slice()
                      : baseline.value;
        }
        return record;
    }

    private get canCapture(): boolean {
        // 静默/批量更新期间不采集：reset 自身的写回不得成为新的基线
        return this._enabled && !this.host.silenting && !this.host.batching;
    }

    private isComputedPath(path: string[]): boolean {
        if (path.some((segment) => segment.startsWith("#"))) return true;
        const computed = this.host.computedObjects;
        return computed.size > 0 && computed.has(joinPath([path]));
    }

    /** 是否存在严格位于 path 之下的规则——决定还原时能否整体写回 */
    private hasDescendantRule(path: string[]): boolean {
        const rules = this.rules;
        if (!rules) return false;
        for (const rule of rules) {
            const segments = rule.segments;
            if (segments.length <= path.length) continue;
            let hit = true;
            for (let i = 0; i < path.length; i++) {
                const segment = segments[i];
                // 通配符无法静态判定，保守视为可能命中（多余递归优于错误还原）
                if (segment === "*" || segment === "**") continue;
                if (segment !== path[i]) {
                    hit = false;
                    break;
                }
            }
            if (hit) return true;
        }
        return false;
    }

    /** 是否已被某个祖先的对象型基线完整覆盖 */
    private coversFromAncestor(path: string[]): boolean {
        return this.coveredIn(path, this.baselines);
    }

    private coveredIn(path: string[], map: Map<string, ResetBaseline>): boolean {
        for (let i = path.length - 1; i > 0; i--) {
            const baseline = map.get(joinPath([path.slice(0, i)]));
            if (baseline && baseline.kind !== "array") return true;
        }
        return false;
    }

    private hasDirtyDescendant(key: string): boolean {
        const prefix = `${key}${PATH_DELIMITER}`;
        for (const existing of this.baselines.keys()) {
            if (existing.startsWith(prefix)) return true;
        }
        return false;
    }

    private restoreNode(state: any, segments: string[], baseline: ResetBaseline): void {
        if (this.hasDescendantRule(segments)) {
            this.restoreFiltered(state, segments, baseline);
            return;
        }
        this.writeNode(state, segments, baseline);
    }

    private writeNode(state: any, segments: string[], baseline: ResetBaseline): void {
        if (baseline.kind === "absent") {
            deletePath(state, segments);
            return;
        }
        // 数组以元素表整体还回，长度随元素表一并恢复
        writePath(state, segments, baseline.kind === "array" ? baseline.items : baseline.value);
    }

    /**
     * 逐 `own key` 过滤还原：基线子树内存在更深的规则时，整体写回会把被判为
     * 不可重置的路径一并还原，故只写回规则允许的键。递归深度由规则路径的深度
     * 决定，与子树大小无关。
     */
    private restoreFiltered(state: any, segments: string[], baseline: ResetBaseline): void {
        const source =
            baseline.kind === "array"
                ? baseline.items
                : baseline.kind === "value"
                  ? baseline.value
                  : undefined;
        if (!isObject(source)) {
            this.writeNode(state, segments, baseline);
            return;
        }
        for (const key of Object.keys(source)) {
            const childSegments = [...segments, key];
            if (!this.isResettable(childSegments)) continue;
            if (this.hasDescendantRule(childSegments)) {
                this.restoreFiltered(state, childSegments, { kind: "value", value: source[key] });
            } else {
                writePath(state, childSegments, source[key]);
            }
        }
        // 基线中不存在的键：可重置则删除（新增键还原为消失）
        const current = getPath(state, segments);
        if (!isObject(current)) return;
        for (const key of Object.keys(current)) {
            if (Object.hasOwn(source, key)) continue;
            const childSegments = [...segments, key];
            if (!this.isResettable(childSegments)) continue;
            deletePath(state, childSegments);
        }
        if (baseline.kind === "array" && Array.isArray(current)) current.length = baseline.length;
    }
}