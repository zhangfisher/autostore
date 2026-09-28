// 示例 4：通过全局注册表绑定（index.html → panel-store-id）
import { AutoStore } from 'autostore'

// 创建示例 4：通过全局注册表绑定
const store4 = new AutoStore({
  message: '这个 store 通过 store-id 属性绑定',
  count: 100,
  items: ['项目1', '项目2', '项目3']
}, { id: 'demo-store' })

// store-id 绑定依赖全局注册表（WeakRef 不阻止 GC），挂到全局保持 store4 存活
;(globalThis as any).__DEMO_STORE__ = store4
