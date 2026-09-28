// 示例 10：entrys 子树入口（index.html → panel-entry，与示例 1 共用 store1）
import { store1 } from './basic'
import type { AutostoreViewer } from '../../src/autostore-viewer'

// entrys 子树入口演示（ADR-0029）：与 viewer1 同一 store 实例，仅入口不同；
// 预设下拉与自定义输入双通道，取值互相同步（自定义值不在预设中时下拉回落空选项）
const viewer10 = document.getElementById('viewer10') as AutostoreViewer
viewer10.store = store1
const ctlEntryPreset = document.getElementById('ctl-entry-preset') as HTMLSelectElement
const ctlEntryInput = document.getElementById('ctl-entry-input') as HTMLInputElement
const applyEntry = (value: string) => {
    viewer10.entrys = value
    ctlEntryPreset.value = ctlEntryPreset.querySelector(`option[value="${value}"]`) ? value : ''
    ctlEntryInput.value = value
}
ctlEntryPreset.addEventListener('change', () => applyEntry(ctlEntryPreset.value))
ctlEntryInput.addEventListener('change', () => applyEntry(ctlEntryInput.value.trim()))
