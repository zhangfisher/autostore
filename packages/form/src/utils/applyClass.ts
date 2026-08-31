export function applyClass(element: HTMLElement, className: string, use: boolean) {
    if (use) {
        element.classList.add(className)
    } else {
        element.classList.remove(className)
    }
}