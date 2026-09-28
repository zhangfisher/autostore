// 示例 3：函数与 markRaw（index.html → panel-func）
import { AutoStore, computed, markRaw } from 'autostore'
import type { AutostoreViewer } from '../../src/autostore-viewer'

// 创建示例 3：函数与 markRaw
const store3 = new AutoStore({
  name: '测试对象',
  regularFunction: () => {
    console.log('普通函数')
  },
  // 异步计算属性：使用 computed() 包装（空依赖=仅首次执行）
  asyncFunction: computed(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return '异步结果'
  }, []),
  rawData: markRaw({
    nested: '不会被代理',
    deep: {
      value: '深度嵌套'
    }
  }),
  normalObject: {
    nested: '普通对象会被代理',
    deep: {
      value: '深度嵌套'
    }
  }
})

const viewer3 = document.getElementById('viewer3') as AutostoreViewer
viewer3.store = store3
