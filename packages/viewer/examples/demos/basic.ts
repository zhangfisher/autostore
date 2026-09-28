// 示例 1：基础对象（index.html → panel-basic）
import { AutoStore } from 'autostore'
import type { AutostoreViewer } from '../../src/autostore-viewer'

// 创建示例 1：基础对象
export const store1 = new AutoStore({
  user: {
    firstName: '张',
    lastName: '三',
    age: 25,
    email: 'zhangsan@example.com',
    isActive: true,
    address: {
      city: '北京',
      street: '朝阳路',
      zip: '100000',
      coordinates: {
        lat: 39.9042,
        lng: 116.4074
      }
    },
    hobbies: ['阅读', '编程', '游泳'],
    scores: [95, 88, 92, 78]
  },
  meta: {
    version: '1.0.0',
    createdAt: '2024-01-01',
    tags: ['demo', 'test', 'example']
  }
})

const viewer1 = document.getElementById('viewer1') as AutostoreViewer
viewer1.style.height="360px"
viewer1.store = store1
