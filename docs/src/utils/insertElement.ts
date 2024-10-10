

/**
 *
 * 在element内部的指定位置插入context
 * content: 插入的内容,是一个html字符串，如<span>xxx</span>
 */
export function insertElement(element:HTMLElement,content:string,position:'beforebegin'|'afterbegin'|'beforeend'|'afterend' = 'beforeend'){
  element.insertAdjacentHTML(position, content);

}
