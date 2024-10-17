



/**
 * 向输入元素插入样式字符串，如果样式已存在则不会重复添加。
 * @param input - 要操作的输入元素。
 * @param style - 要插入的样式字符串，如果为undefined则不进行任何操作。
 */
export function insertStyle(input: any, style: string | undefined) {
	if (!style) return;
	let inputStyle = (input.getAttribute("style") || "");
    if (inputStyle.endsWith(";")) inputStyle += ";";
    if (style.endsWith(";")) style = style += ";";    
    style.split(";").forEach(styl=>{        
        if (!inputStyle.includes(styl+";")) {                        
            inputStyle+=styl+";"
        }
    })
    input.setAttribute("style", inputStyle + style);
	
}

/**
 * 移除输入框的指定样式
 * @param input - 输入框元素
 * @param style - 需要移除的样式字符串，如果为undefined则不进行任何操作
 * 该函数会检查输入框的style属性，并移除指定的样式字符串。如果样式字符串以分号结尾，会确保在替换前添加分号以避免样式断裂。
 */
export function removeStyle(input: any, style: string | undefined) {
	if (!style) return;
	let inputStyle = (input.getAttribute("style") || "").trim();
	if (inputStyle.endsWith(";")) inputStyle += ";";
	if (style.endsWith(";")) style = style += ";";
    style.split(";").forEach(styl=>{        
        inputStyle = inputStyle.replace(styl+";", "")        
    })
    input.setAttribute("style", inputStyle.replace(style, ""));	
}


/**
 * 判断给定的 HTML 元素是否为输入元素（input、textarea 或 select）。
 * @param input - 要检查的 HTML 元素。
 * @returns 如果元素是输入元素，则返回 true；否则返回 false。
 */
export function isInputElement(input: HTMLElement) {
	return ["input", "textarea", "select"].includes(input.tagName.toLowerCase());
}

/**
 * 获取表单输入元素。
 * 如果传入的元素本身就是输入元素（input、textarea 或 select），则直接返回该元素。
 * 否则，尝试在传入的元素内查找并返回第一个 input、textarea 或 select 元素。
 * @param input - 需要查找输入元素的 HTMLElement
 * @returns 返回找到的输入元素，如果没有找到则返回 undefined
 */
export function getInputElement(input: HTMLElement) {
	if (isInputElement(input)) {
		return input;
	}
	return input.querySelector("input,textarea,select");
}



/**
 * 为元素添加一个或多个类名。
 * @param el - 要添加类名的目标元素。
 * @param classs - 要添加的一个或多个类名，以空格分隔。
 */
export function addClass(el:any,classs:string){
    if(!el) return 
    try{
        if(el.classList){          
            classs.split(/\s+/).forEach(cls=>{
                el.classList.add(cls)
            })
        }
    }catch{}    
}


/**
 * 移除元素上的指定类名。
 * @param el - 要操作的 DOM 元素。
 * @param classs - 要移除的类名，多个类名以空格分隔。
 * @returns 无返回值。
 */
export function removeClass(el:any,classs:string){
    if(!el) return 
    try{
        if(el.classList){
            el.classList.remove(...classs.split(/\s+/))
        }
    }catch{}    
}



export function addElementStyleOrClass(input:any,params:string | Record<string,string> | undefined,kind:'style' | 'class'){
    if(!params) return
    const addKind=(el:any,s:string)=>{
        if(kind==='style'){
            insertStyle(input,s)
        }else{
            addClass(input,s)
        }
    }
    if(typeof(params)==='object'){
        Object.entries(params).forEach(([selector,style])=>{
            const el = selector.toLocaleUpperCase()==='ROOT' ? input : input.querySelector(selector)  
            addKind(el,style)
        })
    }else if(typeof(params)==='string'){
        addKind(input,params)
    } 
}
/**
 * 移除元素样式或类名
 * @param input - 待操作的元素或选择器
 * @param params - 要移除的样式或类名，可以是字符串或对象
 * @param kind - 操作类型，'style' 表示移除样式，'class' 表示移除类名
 * @description 该函数用于移除指定元素的样式或类名。params 可以是字符串或对象，对象时键为选择器，值为要移除的样式或类名。
 * @example removeElementStyleOrClass(element, 'active'); // 移除 element 的 'active' 类名
 * @example removeElementStyleOrClass(element, { '.child': 'active' }, 'class'); // 移除所有 .child 元素的 'active' 类名
 */
export function removeElementStyleOrClass(input:any,params:string | Record<string,string> | undefined,kind:'style' | 'class'){
    if(!params) return
    const removeKind=(el:any,s:string)=>{
        if(kind==='style'){
            removeStyle(input,s)
        }else{
            removeClass(input,s)
        }
    }
    if(typeof(params)==='object'){
        Object.entries(params).forEach(([selector,style])=>{
            const el = selector.toLocaleUpperCase()==='ROOT' ? input : input.querySelector(selector)  
            removeKind(el,style)
        })
    }else if(typeof(params)==='string'){
        removeKind(input,params)
    } 
}



export function createDefaultErrorElement(input:HTMLElement){
    const errElement = document.createElement("span");
    errElement.style.color = "red";
    errElement.classList.add("error");
    if(isInputElement(input)){
        if (input.nextSibling) {
            input.parentNode?.insertBefore(errElement, input.nextSibling);
        } else {
            input.parentNode?.appendChild(errElement);
        }
    }else{
        input.appendChild(errElement);
    }    
    return errElement
}

 

export function removeItem(arr:any[],item:any){
    const index = arr.indexOf(item)
    if(index>=0){
        arr.splice(index,1)
    }
}