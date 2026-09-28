// 示例 2：计算属性（index.html → panel-computed）
import { AutoStore, computed } from 'autostore'
import type { AutostoreViewer } from '../../src/autostore-viewer'

// 创建示例 2：计算属性
const store2 = new AutoStore({
  price: 100,
  quantity: 3,
  discount: 0.1,
  totalPrice: computed((scope) => {
    return scope.price * scope.quantity * (1 - scope.discount)
  }),
  formattedPrice: computed((scope) => {
    return `¥${scope.totalPrice.toFixed(2)}`
  }),
  getSummary: () => {
    return '这是一个计算属性函数'
  }
})

const viewer2 = document.getElementById('viewer2') as AutostoreViewer
viewer2.store = store2
