
export function getInputValue(el: any) {
    if (!el) return
    if (el.type === 'checkbox') {
        if (el.value === 'on') {
            return el.checked
        } else {
            if (el.value.startsWith('[') && el.value.endsWith(']')) {
                try {
                    const values = JSON.parse(el.value)
                    return el.checked ? values[0] : values[1]
                } catch {
                    return el.checked
                }
            } else {
                return el.checked ? el.value : null
            }
        }
    } else {
        return el.value
    }
}