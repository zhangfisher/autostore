// 示例 14：暗色主题（index.html → panel-dark，与示例 1 共用 store1）
import { store1 } from './basic'
import type { AutostoreViewer } from '../../src/autostore-viewer'

// dark 属性强制暗色 vs 缺省跟随系统：两个 viewer 同一 store 实例，仅主题声明不同
const viewer15 = document.getElementById('viewer15') as AutostoreViewer
viewer15.style.height = '360px'
viewer15.store = store1

const viewer16 = document.getElementById('viewer16') as AutostoreViewer
viewer16.style.height = '360px'
viewer16.store = store1
