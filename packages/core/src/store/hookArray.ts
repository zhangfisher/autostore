export function hookArrayMethods(
    notifyChange: any,
    array: any[],
    name: string,
    method: (...args: any[]) => any,
    parentPath: string[],
) {
    if (name === "push") {
        return (...args: any[]) => {
            const oldLength = array.length;
            const result = method.apply(array, args);
            if (array.length > oldLength) {
                const indexs = Array.from(
                    { length: array.length - oldLength },
                    (_, i) => i + oldLength,
                );
                notifyChange({
                    type: "insert",
                    path: parentPath,
                    indexs,
                    value: args,
                    oldValue: undefined,
                    parentPath,
                    parent: array,
                });
            }
            return result;
        };
    } else if (name === "pop") {
        return () => {
            const oldLength = array.length;
            const result = method.apply(array);
            if (array.length === oldLength - 1) {
                notifyChange({
                    type: "remove",
                    path: parentPath,
                    indexs: [oldLength - 1],
                    value: [result],
                    oldValue: undefined,
                    parentPath,
                    parent: array,
                });
            }
            return result;
        };
    } else if (name === "splice") {
        return (start: number, deleteCount: number, ...items: any[]) => {
            const deletedItems =
                deleteCount === undefined && items.length === 0
                    ? method.apply(array, [start])
                    : method.apply(array, [start, deleteCount, ...items]);
            if (deletedItems.length > 0 || deleteCount === undefined) {
                const deleteIndexs =
                    deleteCount === undefined
                        ? []
                        : Array.from({ length: deletedItems.length }, (_, i) => start + i);
                notifyChange({
                    type: "remove",
                    path: parentPath,
                    indexs: deleteIndexs,
                    value: deletedItems,
                    oldValue: undefined,
                    parentPath,
                    parent: array,
                });
            }
            if (items.length > 0) {
                const addIndexs = Array.from({ length: items.length }, (_, i) => start + i);
                notifyChange({
                    type: "insert",
                    path: parentPath,
                    indexs: addIndexs,
                    value: items,
                    oldValue: undefined,
                    parentPath,
                    parent: array,
                });
            }
            return deletedItems;
        };
    } else if (name === "unshift") {
        return (...args: any[]) => {
            const oldLength = array.length;
            const result = method.apply(array, args);
            if (array.length > oldLength) {
                const addIndexs = Array.from({ length: array.length - oldLength }, (_, i) => i);
                notifyChange({
                    type: "insert",
                    path: parentPath,
                    indexs: addIndexs,
                    value: args,
                    oldValue: undefined,
                    parentPath,
                    parent: array,
                });
            }
            return result;
        };
    } else if (name === "shift") {
        return () => {
            const oldLength = array.length;
            const result = method.apply(array);
            if (array.length === oldLength - 1) {
                notifyChange({
                    type: "remove",
                    path: parentPath,
                    indexs: [0],
                    value: [result],
                    oldValue: undefined,
                    parentPath,
                    parent: array,
                });
            }
            return result;
        };
    } else if (name === "fill") {
        return (value: any, start?: number, end?: number) => {
            const result = method.apply(array, [value, start, end]);
            // 计算受影响的索引
            const startIndex = start ?? 0;
            const endIndex = end ?? array.length;
            const affectedIndexes = Array.from(
                { length: endIndex - startIndex },
                (_, i) => i + startIndex,
            );
            const affectedValues = Array.from({ length: endIndex - startIndex }, () => value);
            notifyChange({
                type: "update",
                path: parentPath,
                indexs: affectedIndexes,
                value: affectedValues,
                oldValue: undefined,
                parentPath,
                parent: array,
            });
            return result;
        };
    } else if (name === "concat") {
        return (...items: any[]) => {
            const oldLength = array.length;
            const result = method.apply(array, items);
            const affectedIndexes = Array.from({ length: items.length }, (_, i) => oldLength + i);
            notifyChange({
                type: "insert",
                path: parentPath,
                indexs: affectedIndexes,
                value: items,
                oldValue: undefined,
                parentPath,
                parent: array,
            });
            return result;
        };
    } else {
        return method;
    }
}
