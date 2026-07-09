

/**
 * string 获取不到，尝试转为 number 获取
 */
export function getMapVal(map: Map<any, any>, key: string) {
    const strKeyVal = map.get(key);
    if (strKeyVal !== undefined) {
      return strKeyVal;
    }
    const numKeyVal = map.get(Number(key) || key);
    if (numKeyVal !== undefined) {
      return numKeyVal;
    }
    return undefined;
  }