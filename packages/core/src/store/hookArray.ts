 

export function hookArrayMethods(notifyChange:any, array: any[], name:string,method:Function, parentPath: string[]) {
    if(name==='push'){
        return (...args: any[]) => {
            const oldLength = array.length;
            const result = method.apply(array, args);
            if (array.length > oldLength) {
                const indexs = Array.from({length: array.length - oldLength}, (_, i) => i + oldLength);                 
                notifyChange({type:'insert',path:parentPath, indexs, value:args,oldValue: undefined, parentPath,parent: array});
            }
            return result;
        };
    }else if(name==='splice'){
        return (start: number, deleteCount: number, ...items: any[]) => {
            const deletedItems = deleteCount ===0 ?  [] : array.slice(start, start + deleteCount);
            const result = method.apply(array, [start, deleteCount, ...items]);                
            if (deletedItems.length > 0) {
                const deleteIndexs = Array.from({ length: deletedItems.length }, (_, i) => start + i);
                notifyChange({type:'remove',path:parentPath,indexs:deleteIndexs, value:deletedItems,oldValue:undefined, parentPath,parent:array});
            }
            if (items.length > 0) {
                const addIndexs = Array.from({ length: items.length }, (_, i) => start + i);
                notifyChange({type:'insert', path: parentPath,indexs:addIndexs,value: items,oldValue:undefined, parentPath,parent: array});
            }
            return result;
        };
    }else if(name ==='unshift'){            
        return (...args: any[]) => {
            const oldLength = array.length;
            const result = method.apply(array, args);
            if (array.length > oldLength) {
                const indexs = Array.from({ length: array.length - oldLength }, (_, i) => i);
                notifyChange({type:'insert',path:parentPath,indexs,value: args,oldValue:undefined, parentPath,parent: array});
            }
            return result;
        };
    }else{
        return method
    }        
}