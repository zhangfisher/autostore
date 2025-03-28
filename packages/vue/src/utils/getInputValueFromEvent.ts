
import { isNumber } from "./isNumber";

export function getInputValueFromEvent(e: any) {
  let val = e;
  if (e) {
    const currentTarget = e.currentTarget || e.target;
    if (currentTarget && e.type) {
      const tagName = currentTarget.tagName.toLowerCase();
      const inputType = currentTarget.type;
      if (tagName === "input") {
        if (inputType === "checkbox") {
          val = currentTarget.checked;
        } else if (inputType === "radio") {
          const fieldName = currentTarget.dataset.fieldName;
          const radios = document.querySelectorAll(
            `input[type="radio"][name='${fieldName}']`
          ) as NodeListOf<HTMLInputElement>;
          for (let i = 0; i < radios.length; i++) {
            radios[i].checked = false;
          }
          val = currentTarget.value;
          currentTarget.checked = true;
        } else {
          val = currentTarget.value;
        }
      } else {
        val = currentTarget.value;
      }
    } else if (e.target) {
      val = e.target.value;
    }
  }
  
  if (typeof val === 'string') {
    if (isNumber(val)) {
      val = Number(val);
    } else if (val === 'true' || val === 'false') {
      val = val === 'true';
    } else if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"'))) {
      val = val.slice(1, val.length - 1);
    }
  }
  
  return val;
}