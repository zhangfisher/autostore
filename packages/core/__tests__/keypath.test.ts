import { describe, test, it, expect, mock, beforeAll, afterAll, beforeEach, afterEach } from "bun:test"

import { getFullValuePath } from '../src/utils/getFullValuePath';

describe('getFullValuePath', () => {
    const curPath =[ 'a', 'b', 'c', 'd', 'e', 'f' ]
    test('should return curPath when path is "self"', () => { 
        expect(getFullValuePath(curPath, 'self')).toStrictEqual(curPath);
    });

    test('should return ["root"] when path is "root"', () => { 
        expect(getFullValuePath(curPath, 'root')).toStrictEqual([]);
    });

    test('should return parent path when path is "parent"', () => { 
        expect(getFullValuePath(curPath, 'parent')).toStrictEqual(['a', 'b','c','d']);
    });

    test('should return curPath when path is "current"', () => { 
        expect(getFullValuePath(curPath, 'current')).toStrictEqual(['a', 'b', 'c', 'd','e']);
    });

    test('should concatenate curPath with string array path', () => { 
        expect(getFullValuePath(curPath, ['x', 'y'])).toStrictEqual(['x', 'y']);
    });

    test('should concatenate curPath with string path', () => { 
        expect(getFullValuePath(curPath, 'x')).toStrictEqual(['x']);
    });

    test('should concatenate curPath with string rel path', () => { 
        expect(getFullValuePath(curPath, './x')).toStrictEqual(['a', 'b', 'c', 'd','e','x']);
    });
 
});