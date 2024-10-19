

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
