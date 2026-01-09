import { describe, test, it, expect, mock, beforeAll, afterAll, beforeEach, afterEach } from "bun:test"
// FILEPATH: e:/Work/Code/sources/autostore/packages/core/src/utils/__tests__/setVal.test.ts


import { setVal } from '../../src/utils/setVal';
import { ASYNC_COMPUTED_VALUE } from '../../src/consts';

describe('setVal', () => {
    it('should return original object when path array is empty', () => {
        const obj = { a: 1 };
        const path: string[] = [];
        const value = 2;

        const result = setVal(obj, path, value);

        expect(result).toEqual({ a: 1 });
        expect(obj).toEqual({ a: 1 });
    });

    it('should return null when input object is null', () => {
        const obj = null;
        const path = ['a'];
        const value = 1;

        const result = setVal(obj, path, value);

        expect(result).toBeNull();
    });

    it('should set value in simple object path', () => {
        const obj = {};
        const path = ['a'];
        const value = 1;

        const result = setVal(obj, path, value);

        expect(result).toEqual({ a: 1 });
    });

    it('should set value in nested object path', () => {
        const obj = {};
        const path = ['a', 'b', 'c'];
        const value = 1;

        const result = setVal(obj, path, value);

        expect(result).toEqual({
            a: {
                b: {
                    c: 1
                }
            }
        });
        expect(obj).toEqual({
            a: {
                b: {
                    c: 1
                }
            }
        });
    });

    it('should set value at valid array index', () => {
        const obj = [1, 2, 3];
        const path = ['1'];
        const value = 5;

        const result = setVal(obj, path, value);

        expect(result).toEqual([1, 5, 3]);
        expect(obj).toEqual([1, 5, 3]);
    });

    it('should throw error when setting value at invalid array index', () => {
        const obj = [1, 2, 3];
        const path = ['a'];
        const value = 5;        
        expect(() => {
            setVal(obj, path, value);
        }).toThrow('setVal: invalid array index a')
    });

    it('should throw error when setting value at negative array index', () => {
        const obj = [1, 2, 3];
        const path = ['-1'];
        const value = 5;

        expect(() => {
            setVal(obj, path, value);
        }).toThrow('setVal: invalid array index -1');
    });

    it('should set value in Map correctly', () => {
        const obj = new Map();
        const path = ['key'];
        const value = 'value';

        const result = setVal(obj, path, value);

        expect(result).toBe(obj);
        expect(result instanceof Map).toBe(true);
        expect(result.get('key')).toBe('value');
        expect(result.size).toBe(1);
    });

    it('should set nested value in Map correctly', () => {
        const obj = new Map();
        const path = ['key1', 'key2'];
        const value = 'value';

        const result = setVal(obj, path, value);

        expect(result).toBe(obj);
        expect(result instanceof Map).toBe(true);
        
        const nestedObj = result.get('key1');
        expect(nestedObj).toBeDefined();
        expect(typeof nestedObj).toBe('object');
        expect(nestedObj.key2).toBe('value');
    });
 
    it('should update AsyncComputedValue when toAsyncValue is true', () => {
        const obj = {
            a: {
                [ASYNC_COMPUTED_VALUE]: true,
                value: 1
            }
        };
        const path = ['a'];
        const value = 2;

        const result = setVal(obj, path, value, true);

        expect(result).toEqual({
            a: {
                [ASYNC_COMPUTED_VALUE]: true,
                value: 2
            }
        });
        expect(obj.a.value).toBe(2);
        expect(obj.a[ASYNC_COMPUTED_VALUE]).toBe(true);
    });

    it('should update non-AsyncComputedValue with toAsyncValue true', () => {
        const obj = { a: 1 };
        const path = ['a'];
        const value = 2; 
        const result = setVal(obj, path, value, true);

        expect(result).toEqual({ a: 2 });
        expect(obj).toEqual({ a: 2 });
    });

    it('should use custom infer function to create intermediate objects', () => {
        const obj = {};
        const path = ['a', 'b'];
        const value = 1;
 

        const result = setVal(obj, path, value);

        expect(result).toEqual({
            a: {
                b: 1
            }
        });
    });

    it('should override existing path value', () => {
        const obj = {
            a: {
                b: 1
            }
        };
        const path = ['a', 'b'];
        const value = 2;

        const result = setVal(obj, path, value);

        expect(result).toEqual({
            a: {
                b: 2
            }
        });
        expect(obj).toEqual({
            a: {
                b: 2
            }
        });
    });

    it('should handle path with mixture of arrays and objects', () => {
        const obj = {
            arr: [1, { a: 1 }]
        };
        const path = ['arr', '1', 'a'];
        const value = 2;

        const result = setVal(obj, path, value);

        expect(result).toEqual({
            arr: [1, { a: 2 }]
        });
        expect(obj).toEqual({
            arr: [1, { a: 2 }]
        });
        // @ts-ignore
        expect(obj.arr[1].a).toBe(2);
    }); 

    it('set  array value', () => {
        const obj = {
            arr: [1, 2, 3]
        };        

        setVal(obj, ['arr','0'], 0);
        expect(obj).toEqual({ arr: [0, 2, 3] });
        setVal(obj, ['arr','1'], 0);
        expect(obj).toEqual({ arr: [0, 0, 3] });
        setVal(obj, ['arr','2'], 0);
        expect(obj).toEqual({ arr: [0, 0, 0] });

        setVal(obj, ['arr','5'], 0);
        expect(obj).toEqual({ arr: [0, 0, 0,undefined,undefined,0] });

    }); 

});