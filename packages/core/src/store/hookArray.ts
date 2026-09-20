/**
 * 生成连续索引数组: range(3, 4) → [3, 4, 5, 6]
 */
function range(start: number, count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + start);
}

export function hookArrayMethods(
    notifyChange: any,
    array: any[],
    name: string,
    method: (...args: any[]) => any,
    parentPath: string[],
) {
    /** 通知 insert 事件 */
    const notifyInsert = (indexs: number[], value: any) => {
        notifyChange({
            type: "insert",
            path: parentPath,
            indexs,
            value,
            oldValue: undefined,
            parentPath,
            parent: array,
        });
    };

    /** 通知 remove 事件 */
    const notifyRemove = (indexs: number[], value: any) => {
        notifyChange({
            type: "remove",
            path: parentPath,
            indexs,
            value,
            oldValue: undefined,
            parentPath,
            parent: array,
        });
    };

    // insert 类: push / unshift / concat — 都是往数组中添加元素
    if (name === "push" || name === "unshift" || name === "concat") {
        return (...args: any[]) => {
            const oldLength = array.length;
            const result = method.apply(array, args);
            if (array.length > oldLength) {
                // push/concat: 索引从 oldLength 开始; unshift: 索引从 0 开始
                const startIndex = name === "unshift" ? 0 : oldLength;
                notifyInsert(range(startIndex, array.length - oldLength), args);
            }
            return result;
        };
    }

    // remove 类: pop / shift — 都是从数组中移除元素
    if (name === "pop" || name === "shift") {
        return () => {
            const oldLength = array.length;
            const result = method.apply(array);
            if (array.length === oldLength - 1) {
                // pop: 移除最后一个; shift: 移除第一个
                notifyRemove([name === "pop" ? oldLength - 1 : 0], [result]);
            }
            return result;
        };
    }

    // splice: 同时涉及 insert + remove
    if (name === "splice") {
        return (start: number, deleteCount: number, ...items: any[]) => {
            const deletedItems =
                deleteCount === undefined && items.length === 0
                    ? method.apply(array, [start])
                    : method.apply(array, [start, deleteCount, ...items]);
            if (deletedItems.length > 0 || deleteCount === undefined) {
                notifyRemove(
                    deleteCount === undefined ? [] : range(start, deletedItems.length),
                    deletedItems,
                );
            }
            if (items.length > 0) {
                notifyInsert(range(start, items.length), items);
            }
            return deletedItems;
        };
    }

    // fill: 更新指定区间的值
    if (name === "fill") {
        return (value: any, start?: number, end?: number) => {
            const result = method.apply(array, [value, start, end]);
            const startIndex = start ?? 0;
            const endIndex = end ?? array.length;
            notifyChange({
                type: "update",
                path: parentPath,
                indexs: range(startIndex, endIndex - startIndex),
                value,
                oldValue: undefined,
                parentPath,
                parent: array,
            });
            return result;
        };
    }

    // 未拦截的方法直接透传
    return method;
}
