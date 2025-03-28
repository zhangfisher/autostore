/**
 * 移除指定元素的伪元素样式。
 * @param el - 需要移除伪元素样式的目标元素。
 * 该函数通过查询与元素数据ID关联的伪元素样式，并从文档头部移除这些样式节点。
 */
export function removePseudoElement(el: HTMLElement) {
    const styleId = el.dataset.id
    if (!styleId) return

    // 查找并移除:before和:after伪元素的样式
    const after = document.querySelector("style#" + styleId + "_after")
    const before = document.querySelector("style#" + styleId + "_before")
    
    if (before) document.head.removeChild(before)
    if (after) document.head.removeChild(after)
    
    // 清除元素的data-id属性
    delete el.dataset.id
}