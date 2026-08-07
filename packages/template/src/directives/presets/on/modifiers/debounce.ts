import type { WrapperModifierDesc } from "../types";

/**
 * `.debounce`：防抖。`.debounce` 默认 300ms；自定义时长走 `x-on-options="{debounce:N}"`（ADR-0007）。
 *
 * 连续触发仅在最后一次后等待 ms 才执行业务；destroy 时经 cleanup.cancel 清 pending timer。
 * wrapper 处于 guard 之外（管道最外层），守卫检查的是防抖触发后"最后一次累积事件"。
 */
export default {
    name: "debounce",
    type: "wrapper",
    apply: (next, rt, cleanup) => {
        // debounce 时长来自 options.debounce（ADR-0007）：true=默认 300，数字=自定义毫秒
        const ms = rt.options.debounce === true ? 300 : rt.options.debounce;
        let timer: ReturnType<typeof setTimeout> | null = null;
        cleanup.cancel = () => {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        };
        return (event) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                next(event);
            }, ms);
        };
    },
} as WrapperModifierDesc;
