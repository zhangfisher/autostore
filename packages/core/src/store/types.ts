export type StateOperates = 'get' | 'set' | 'delete'                   // 用于对象
                            | 'insert' | 'update' | 'remove'           // 用于数组 

export type StateOperateParams<T=any,P=any> = {
    type      : StateOperates,
    path      : string[],
    indexs    : number[],               // 数组操作时，操作的索引，如[1,2]表示操作了数组的第1个和第2个元素
    value     : T,
    oldValue  : T,
    parentPath: string[],
    parent    : P
}
 