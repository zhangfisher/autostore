export class AutoStoreError extends Error {}

export class AbortError extends AutoStoreError {}
export class TimeoutError extends AutoStoreError {}
export class CyleDependError extends AutoStoreError {}
export class InvalidComputedArgumentsError extends AutoStoreError {}
export class InvalidScopeError extends AutoStoreError {}
export class InvalidDependsError extends AutoStoreError {}

export class ValidateError extends AutoStoreError {
    /**
     * 用于控制验证失败时的行为
     * - 'pass' - 校验失败但继续写入
     * - 'ignore' - 校验失败，静默忽略（不写入）
     * - 'throw' - 校验失败，抛出异常
     * - 'throw-pass' - 写入数据但同时抛出异常
     * - undefined - 使用 validate.onInvalid 的配置
     */
    behavior?: 'pass' | 'ignore' | 'throw' | 'throw-pass';
}
