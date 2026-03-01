// Bun mock functions 兼容层
export const vi = {
  fn: () => {
    const calls: any[][] = [];
    const fn = (...args: any[]) => {
      calls.push(args);
      return fn;
    };
    fn.mock = {
      calls,
    };
    fn.calls = calls;
    return fn;
  },
  useFakeTimers: () => {
    // Bun 的 fake timers 实现
  },
  restoreAllMocks: () => {
    // Bun 的 restore mocks 实现
  },
  runAllTimers: () => {
    // Bun 的 run all timers 实现
  },
};
