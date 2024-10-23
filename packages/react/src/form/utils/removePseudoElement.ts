 

 
/**
 * 移除指定元素的伪元素样式。
 * @param el - 需要移除伪元素样式的目标元素。
 * 该函数通过查询与元素数据ID关联的伪元素样式，并从文档头部移除这些样式节点。
 */
export function removePseudoElement(el:HTMLElement){
    const styleId= el.dataset.id
    const after = document.querySelector("style#"+styleId+"_after")
    const before = document.querySelector("style#"+styleId+"_before")
    if(before) document.head.removeChild(before)
    if(after) document.head.removeChild(after)
}