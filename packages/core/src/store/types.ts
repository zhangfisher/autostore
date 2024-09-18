export type StateOperates = 'get' | 'set' | 'delete'                   // 用于对象
                            | 'insert' | 'update' | 'remove'           // 用于数组  
                            | 'batch'                                  // 批量操作

export type StateOperateParams<T=any,P=any> = {
    type       : StateOperates,
    path       : string[],
    value      : T,
    indexs?    : number[],               // 数组操作时，操作的索引，如[1,2]表示操作了数组的第1个和第2个元素
    oldValue?  : T,
    parentPath?: string[],
    parent?    : P
    opertaes?  : StateOperateParams[]    //type=batch当触发批量更新操作时，会将所有操作放在这个数组中
}
 