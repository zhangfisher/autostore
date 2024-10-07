export function isMap(mayMap: any): mayMap is Map<any, any> {
    return toString.call(mayMap) === '[object Map]';
  }
