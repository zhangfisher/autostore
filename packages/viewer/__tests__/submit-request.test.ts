import { test, expect } from 'bun:test'
import { appendFormDataToUrl, buildSubmitRequest } from '../src/utils/submit-request'

const mkFormData = (entries: [string, string][]): FormData => {
    const fd = new FormData()
    for (const [name, value] of entries) fd.append(name, value)
    return fd
}

// ---- buildSubmitRequest（ADR-0035 提交管理）----

test('buildSubmitRequest：非 GET 归一大写 method，FormData 原样作 body', () => {
    const fd = mkFormData([['user.name', '张三']])
    const { url, init } = buildSubmitRequest('/api/save', 'post', fd)
    expect(url).toBe('/api/save')
    expect(init.method).toBe('POST')
    expect(init.body).toBe(fd)
})

test('buildSubmitRequest：method 缺省按 GET（对齐表单规范默认），空串/空白同样归 GET', () => {
    const fd = mkFormData([['a', '1']])
    expect(buildSubmitRequest('/api', '', fd).init.method).toBe('GET')
    expect(buildSubmitRequest('/api', '  ', fd).init.method).toBe('GET')
})

test('buildSubmitRequest：GET 折叠 FormData 进 query，body 置空（fetch 禁 GET body）', () => {
    const fd = mkFormData([['user.name', '张三'], ['age', '25']])
    const { url, init } = buildSubmitRequest('/api/save', 'get', fd)
    expect(init.method).toBe('GET')
    expect(init.body).toBeUndefined()
    expect(url).toBe('/api/save?user.name=%E5%BC%A0%E4%B8%89&age=25')
})

test('buildSubmitRequest：GET 已有 query 以 & 续接；空 FormData 不追加问号', () => {
    const fd = mkFormData([['a', '1']])
    expect(buildSubmitRequest('/api?x=2', 'GET', fd).url).toBe('/api?x=2&a=1')
    expect(buildSubmitRequest('/api', 'GET', new FormData()).url).toBe('/api')
})

test('appendFormDataToUrl：非字符串项（File）取文件名', () => {
    const fd = new FormData()
    fd.append('file', new File(['x'], 'a.txt'))
    expect(appendFormDataToUrl('/up', fd)).toBe('/up?file=a.txt')
})
