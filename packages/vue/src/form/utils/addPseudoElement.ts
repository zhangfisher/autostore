/**
 * 为指定的元素创建伪元素
 * @param el - 目标HTML元素
 * @param style - 伪元素的样式字符串
 * @param before - 是否创建:before伪元素，false则创建:after伪元素
 * @returns 创建的style元素
 */
export function addPseudoElement(el: HTMLElement, style: string, before: boolean = true) {
    // 生成或获取唯一ID
    let styleId = el.dataset.id
    if (!styleId) {
        styleId = "c" + Math.random().toString(36).slice(2)
        el.dataset.id = styleId
    }

    // 查找或创建style元素
    let pseudo = document.querySelector("style#" + styleId)
    if (!pseudo) {
        pseudo = document.createElement('style')
        pseudo.id = styleId
    }

    // 创建选择器和样式
    const selector: string = `[data-id=${el.dataset.id}]`.toLowerCase()
    pseudo.innerHTML = `${selector.toLowerCase()}:${before ? 'before' : 'after'}{${style}}`

    // 添加到文档头部
    document.head.appendChild(pseudo)
    return pseudo
}