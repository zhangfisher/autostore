export function isPlainObject(obj: any): boolean {
    if (obj === null || obj === undefined) {
        return false;
    }
    if (typeof obj !== 'object') {
        return false;
    }
    return Object.prototype.toString.call(obj) === '[object Object]';
}

