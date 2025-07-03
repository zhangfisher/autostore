
const PATH_DELIMITER = '.'

export function getVal(obj: any, keyPath: string | string[] | undefined, defaultValue?: any): any {
    if (!keyPath) return obj
    if (keyPath.length === 0) return obj
    const paths: string[] = Array.isArray(keyPath) ? keyPath : keyPath.split(PATH_DELIMITER);
    let val: any;
    let parent = obj;
    for (let i = 0; i < paths.length; i++) {
        const key = paths[i];

        if (key in parent) {
            val = parent[key];
        } else {
            return defaultValue
        }
        parent = val;
    }
    return val;
}

