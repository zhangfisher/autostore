
export function getInputValueFromEvent(e: any) {
  let val = e;
  if (e) {
    if (e.persist) e.persist();
    const { currentTarget } = e;
    if (currentTarget && e.type) {
      const tagName = currentTarget.tagName.toLowerCase();
      const inputType = currentTarget.type;
      if (tagName === 'input') {
        if (inputType === 'checkbox') {
          val = currentTarget.checked;
        } else if (currentTarget.type === 'radio') {
          const fieldName = currentTarget.dataset.fieldName;
          const radios = document.querySelectorAll(`input[type="radio"][name='${fieldName}']`) as unknown as HTMLInputElement[];
          for (let i = 0; i < radios.length; i++) {
            radios[i].checked = false
          }
          val = currentTarget.value;
          currentTarget.checked=true
        }else{
          val = currentTarget.value;
        }
      }else {
        val = currentTarget.value;
      }
    } else if (e.nativeEvent && e.target) {
      val = e.target.value;
    }
  }
  return val;
}