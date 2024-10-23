
/**
 * 向输入元素插入样式字符串，如果样式已存在则不会重复添加。
 * @param input - 要操作的输入元素。
 * @param style - 要插入的样式字符串，如果为undefined则不进行任何操作。
 */
export function insertStyle(input: any, style: string | undefined) {
	if (!style) return;
	let inputStyle = (input.getAttribute("style") || "");
    if (!inputStyle.endsWith(";")) inputStyle += ";";
    if (!style.endsWith(";")) style = style += ";";    
    style.split(";").forEach(styl=>{        
        const [name,val] = styl.split(":")
        input.style[name]=val
    })	
}