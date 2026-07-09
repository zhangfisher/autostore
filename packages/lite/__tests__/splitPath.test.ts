import { describe, test, expect } from "bun:test";

import { splitPath, escapePath, unescapePath } from '../src/utils/splitPath';
import { joinValuePath } from '../src/utils/joinValuePath';

describe('splitPath', () => {
    test('普通点号路径与 split(".") 完全一致（向后兼容）', () => {
        expect(splitPath('a.b.c')).toEqual(['a', 'b', 'c']);
        expect(splitPath('a')).toEqual(['a']);
    });

    test('转义点号被还原为单个含点号的 key', () => {
        // 'a\.b' 反转义得到 'a.b'
        expect(splitPath('a\\.b')).toEqual(['a.b']);
        expect(splitPath('a\\.b.c')).toEqual(['a.b', 'c']);
        expect(splitPath('a.b\\.c')).toEqual(['a', 'b.c']);
    });

    test('转义反斜杠被还原为字面量反斜杠', () => {
        // 'a\\b' 反转义得到 'a\b'
        expect(splitPath('a\\\\b')).toEqual(['a\\b']);
    });

    test('同时转义反斜杠与点号', () => {
        // 'a\\b\.c' 反转义得到 'a\b.c'
        expect(splitPath('a\\\\b\\.c')).toEqual(['a\\b.c']);
    });

    test('连续分隔符产生空段', () => {
        expect(splitPath('a..b')).toEqual(['a', '', 'b']);
    });

    test('空字符串返回 [""]', () => {
        expect(splitPath('')).toEqual(['']);
    });

    test('支持自定义分隔符', () => {
        expect(splitPath('a/b/c', '/')).toEqual(['a', 'b', 'c']);
        // 'a\/b' 反转义得到 'a/b'
        expect(splitPath('a\\/b', '/')).toEqual(['a/b']);
    });
});

describe('escapePath / unescapePath', () => {
    test('escapePath 转义点号', () => {
        // 'a.b' -> 'a\.b'
        expect(escapePath('a.b')).toBe('a\\.b');
    });

    test('escapePath 转义反斜杠（先于点号处理）', () => {
        // 'a\b' -> 'a\\b'
        expect(escapePath('a\\b')).toBe('a\\\\b');
    });

    test('escapePath 不改变普通字符串', () => {
        expect(escapePath('abc')).toBe('abc');
    });

    test('escapePath 支持自定义分隔符', () => {
        // 'a/b' -> 'a\/b'
        expect(escapePath('a/b', '/')).toBe('a\\/b');
    });

    test('unescapePath 与 escapePath 互逆', () => {
        const cases = ['a.b', 'a\\b', 'a\\.b', 'x.y.z', ''];
        cases.forEach((c) => {
            expect(unescapePath(escapePath(c))).toBe(c);
        });
    });
});

describe('joinValuePath 与 splitPath round-trip', () => {
    test('joinValuePath 对含点号段做转义', () => {
        // ['a.b','c'] -> 'a\.b.c'
        expect(joinValuePath(['a.b', 'c'])).toBe('a\\.b.c');
    });

    test('joinValuePath 后 splitPath 可还原（含点号 key）', () => {
        const segs = ['a.b', 'c', 'd.e'];
        expect(splitPath(joinValuePath(segs))).toEqual(segs);
    });

    test('无参时兜底为 ROOT', () => {
        expect(joinValuePath()).toBe('ROOT');
    });
});
