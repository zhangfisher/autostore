import { describe, test, expect } from 'vitest';
import { mergeDepChain } from '../../src/utils/mergeDepChain';
import { mergeDepChains } from '../../src/utils/mergeDepChains';

describe('mergeDepChain', () => {
    test('merges two identical dependency chains', () => {
        const item1 = ['a', 'b', 'c', 'd'];
        const item2 = ['a', 'b', 'c', 'd'];
        const result = mergeDepChain(item1, item2);
        expect(result).toEqual([['a', 'b', 'c', 'd']]);
    });
    test('merges when chain is a subset of the other', () => {
        const item1 = ['a', 'b', 'c', 'd','e','f','g','h'];
        const item2 = ['a', 'b'];
        const result = mergeDepChain(item1, item2);
        expect(result).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','b'])).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','c'])).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','d'])).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','e'])).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','f'])).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','g'])).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','h'])).toStrictEqual([item1])

        expect(mergeDepChain(item1,['a','b','c'])).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','b','d'])).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','b','e'])).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','b','f'])).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','b','g'])).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','b','h'])).toStrictEqual([item1])

        expect(mergeDepChain(item1,['a','b','c','d'])).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','b','c','e'])).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','b','c','f'])).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','b','c','g'])).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','b','c','h'])).toStrictEqual([item1])

        expect(mergeDepChain(item1,['a','b','c','d','e'])).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','b','c','d','f'])).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','b','c','d','g'])).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','b','c','d','h'])).toStrictEqual([item1])

        expect(mergeDepChain(item1,['a','b','c','d','e','f'])).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','b','c','d','e','g'])).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','b','c','d','e','h'])).toStrictEqual([item1])

        expect(mergeDepChain(item1,['a','b','c','d','e','f','g'])).toStrictEqual([item1])
        expect(mergeDepChain(item1,['a','b','c','d','e','f','h'])).toStrictEqual([item1])

        expect(mergeDepChain(item1,['a','b','c','d','e','f','g','h'])).toStrictEqual([item1])
        

    });
    test('merges when one chain is a subset of the other', () => {
        const item1 = ['a', 'b', 'c'];
        const item2 = ['a', 'b', 'c', 'd'];
        const result = mergeDepChain(item1, item2);
        expect(result).toEqual([['a', 'b', 'c', 'd']]);
    });

    test('does not merge completely different chains', () => {
        const item1 = ['a', 'b', 'c', 'd'];
        const item2 = ['x', 'y', 'z'];
        const result = mergeDepChain(item1, item2);
        expect(result).toEqual([['a', 'b', 'c', 'd'], ['x', 'y', 'z']]);
    });

    test('merges chains with partial overlap', () => {
        const item1 = ['a', 'b', 'c', 'd'];
        const item2 = ['a', 'b', 'x', 'c', 'd'];
        const result = mergeDepChain(item1, item2);
        expect(result).toEqual([['a', 'b', 'x', 'c', 'd']]);
    });

    test('handles empty arrays', () => {
        const item1: string[] = [];
        const item2: string[] = [];
        const result = mergeDepChain(item1, item2);
        expect(result).toEqual([]);
    });

    test('handles one empty array', () => {
        const item1: string[] = [];
        const item2 = ['a', 'b', 'c'];
        const result = mergeDepChain(item1, item2);
        expect(result).toEqual([['a', 'b', 'c']]);
    });


    
});


describe('mergeDepChains', () => {
    test('merges multiple identical chains', () => {
        const chains = [['a', 'b'], ['a', 'b'], ['a', 'b']];
        const result = mergeDepChains(chains);
        expect(result).toEqual([['a', 'b']]);
    });

    test('merges chains where one is a subset of another', () => {
        const chains = [['a', 'b', 'c'], ['a', 'b'], ['a', 'b', 'c', 'd']];
        const result = mergeDepChains(chains);
        expect(result).toEqual([['a', 'b', 'c', 'd']]);
    });

    test('does not merge completely different chains', () => {
        const chains = [['a', 'b'], ['x', 'y'], ['1', '2']];
        const result = mergeDepChains(chains);
        expect(result).toEqual([['a', 'b'], ['x', 'y'], ['1', '2']]);
    });

    test('merges chains with partial overlap', () => {
        const chains = [['a', 'b', 'c'], ['a', 'x', 'c'], ['a', 'b', 'x', 'c']];
        const result = mergeDepChains(chains);
        expect(result).toEqual([['a', 'b', 'x', 'c'],]);
    });

    test('handles empty array of chains', () => {
        const chains: string[][] = [];
        const result = mergeDepChains(chains);
        expect(result).toEqual([]);
    });

    test('handles chains with empty arrays', () => {
        const chains: string[][] = [[], ['a', 'b'], []];
        const result = mergeDepChains(chains);
        expect(result).toEqual([['a', 'b']]);
    });


});