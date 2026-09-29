// 受管表单提交的请求构建（ADR-0035 提交管理）：拦截 submit 后由 fetch 承接——
// FormData 原样作 body；method 大写归一；fetch 禁止 GET 携带 body，
// GET 时 FormData 转 URL query（对齐原生表单 GET 语义，File 项取文件名）

// 归一化 method 并构建 fetch 入参：GET 折叠进 query、body 置空
export function buildSubmitRequest(
    action: string,
    method: string,
    formData: FormData,
): { url: string; init: RequestInit } {
    const normalized = (method || '').trim().toUpperCase() || 'GET'
    if (normalized === 'GET') {
        const url = appendFormDataToUrl(action, formData)
        return { url, init: { method: normalized } }
    }
    return { url: action, init: { method: normalized, body: formData } }
}

// FormData 追加到 URL query：已有 query 以 & 续接；非字符串项（File）取文件名
export function appendFormDataToUrl(action: string, formData: FormData): string {
    const pairs = Array.from(formData, ([name, value]) => [
        name,
        typeof value === 'string' ? value : value.name,
    ]) as [string, string][]
    const query = new URLSearchParams(pairs).toString()
    if (query === '') return action
    return action + (action.includes('?') ? '&' : '?') + query
}
