import { RuntimeComputedOptions } from '@autostorejs/core';
import { useReducer } from 'react';

// 定义 AsyncComputedResult 类型
export type AsyncComputedResult<Result = any, ExtAttrs extends Dict = {}> = {
  loading: boolean;
  progress: number;                // 进度值    
  timeout: number;                 // 超时时间，单位ms，当启用超时时进行倒计时
  error: any;
  retry: number;                   // 重试次数，当执行重试操作时，会进行倒计时，每次重试-1，直到为0时停止重试
  result: Result;                  // 计算结果保存到此处
  run: (options?: RuntimeComputedOptions) => {};        // 重新执行任务
  cancel: () => void;                                      // 中止正在执行的异步计算
};

// 定义状态类型
type State<Result = any> = AsyncComputedResult<Result>;

// 定义动作类型
type Action<Result = any> =
  | { type: 'START' }
  | { type: 'PROGRESS', progress: number }
  | { type: 'SUCCESS', result: Result }
  | { type: 'ERROR', error: any }
  | { type: 'RETRY' }
  | { type: 'CANCEL' };

// 创建 reducer 函数
function reducer<Result>(state: State<Result>, action: Action<Result>): State<Result> {
  switch (action.type) {
    case 'START':
      return { ...state, loading: true, error: null, retry: state.retry - 1 };
    case 'PROGRESS':
      return { ...state, progress: action.progress };
    case 'SUCCESS':
      return { ...state, loading: false, result: action.result, progress: 100 };
    case 'ERROR':
      return { ...state, loading: false, error: action.error };
    case 'RETRY':
      return { ...state, retry: state.retry - 1 };
    case 'CANCEL':
      return { ...state, loading: false };
    default:
      return state;
  }
}

// 初始化状态
const initialState: State = {
  loading: false,
  progress: 0,
  timeout: 0,
  error: null,
  retry: 3,
  result: null,
  run: () => {},
  cancel: () => {}
};

// 使用 useReducer 钩子
function useAsyncComputed<Result>(initialState:AsyncComputedResult<Result>){ 
  const [state, dispatch] = useReducer(reducer, initialState);
 
 
  return { state, run, cancel };
}

export default useAsyncComputed;