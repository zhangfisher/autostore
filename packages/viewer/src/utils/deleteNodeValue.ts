// 删除节点对应的键
// 数组父容器用 splice（经 Proxy 触发 update/delete 操作流，viewer 树可同步元素前移），
// 避免 delete 运算符在数组上产生稀疏空洞
export function deleteNodeValue(parent: any, key: string | number): void {
  if (Array.isArray(parent)) {
    parent.splice(key as number, 1)
  } else {
    delete parent[key]
  }
}
