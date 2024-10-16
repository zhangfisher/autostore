



/**
 * 向输入元素插入样式字符串，如果样式已存在则不会重复添加。
 * @param input - 要操作的输入元素。
 * @param style - 要插入的样式字符串，如果为undefined则不进行任何操作。
 */
export function insertInputStyle(input: any, style: string | undefined) {
	if (!style) return;
	let inputStyle = (input.getAttribute("style") || "").trim();
	if (!inputStyle.includes(style)) {
		if (inputStyle.endsWith(";")) inputStyle += ";";
		if (style.endsWith(";")) style = style += ";";
		input.setAttribute("style", inputStyle + style);
	}
}

/**
 * 移除输入框的指定样式
 * @param input - 输入框元素
 * @param style - 需要移除的样式字符串，如果为undefined则不进行任何操作
 * 该函数会检查输入框的style属性，并移除指定的样式字符串。如果样式字符串以分号结尾，会确保在替换前添加分号以避免样式断裂。
 */
export function removeInputStyle(input: any, style: string | undefined) {
	if (!style) return;
	let inputStyle = (input.getAttribute("style") || "").trim();
	if (inputStyle.endsWith(";")) inputStyle += ";";
	if (style.endsWith(";")) style = style += ";";
	input.setAttribute("style", inputStyle.replace(style, ""));
}


export function isInputElement(input: HTMLElement){
    return ['input','textarea','select'].includes(input.tagName.toLowerCase())
}

export function getInputElement(input:HTMLElement){
    if(isInputElement(input)){
        return input
    }
    return input.querySelector('input,textarea,select')
}



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


export function removeClass(el:any,classs:string){
    if(!el) return 
    try{
        if(el.classList){
            el.classList.remove(...classs.split(/\s+/))
        }
    }catch{}    
}