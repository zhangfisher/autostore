// 示例 5：通过 store 属性绑定（index.html → panel-store）
import { AutoStore } from 'autostore'
import type { AutostoreViewer } from '../../src/autostore-viewer'

// 创建示例 5：通过 store 属性绑定
const store5 = new AutoStore({
  data: '通过 store 属性直接绑定',
  items: [1, 2, 3, 4, 5],
  nested: {
    level1: {
      level2: {
        value: '深层嵌套值'
      }
    }
  }
})

const viewer5 = document.getElementById('viewer5') as AutostoreViewer
viewer5.store = store5
