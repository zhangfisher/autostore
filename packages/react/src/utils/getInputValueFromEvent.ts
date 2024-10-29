
export function getInputValueFromEvent(e: any) {
    let val = e; 
    if (e) {
      if (e.persist) e.persist();
      const { currentTarget } = e;
      if (currentTarget && e.type) {
        // 针对 <input type='checkbox' /> 标签不能取 value，要特殊处理下
        if (currentTarget.tagName === 'INPUT' && currentTarget.type === 'checkbox') {
          val = currentTarget.checked;
        } else if(currentTarget.type==='radio'){
          
        }else {
          val = currentTarget.value;
        }
      } else if (e.nativeEvent && e.target) {
        val = e.target.value;
      }
    }
    return val;
}