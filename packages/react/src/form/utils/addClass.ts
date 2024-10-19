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
