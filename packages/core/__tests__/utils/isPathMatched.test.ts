// FILEPATH: e:/Work/Code/sources/autostore/packages/core/src/utils/__tests__/isPathMatched.test.ts

import { describe, expect, it, test } from 'vitest';
import { isPathMatched } from '../../src/utils/isPathMatched';

describe('isPathMatched', () => {
    it('should return true when both arrays are empty', () => {
        // Arrange
        const path: string[] = [];
        const pattern: string[] = [];

        // Act
        const result = isPathMatched(path, pattern);

        // Assert
        expect(result).toBe(true);
    }); 
    it('should return true when path and pattern are exactly the same', () => {
        // Arrange
        const path = ["a", "b", "c"];
        const pattern = ["a", "b", "c"];

        // Act
        const result = isPathMatched(path, pattern);

        // Assert
        expect(result).toBe(true);
    });

    it('should return true when pattern contains single wildcard', () => {
        // Arrange
        const path = ["a", "b", "c"];
        const pattern = ["a", "*", "c"];

        // Act
        const result = isPathMatched(path, pattern);

        // Assert
        expect(result).toBe(true);
    });
    test('should match path when pattern ends with double wildcard', () => {
        // Arrange
        const path = ["a", "b", "c", "d"];
        const pattern = ["a", "b", "**"];

        // Act
        const result = isPathMatched(path, pattern);

        // Assert
        expect(result).toBe(true);
    });
    it('should return false when path and pattern have different lengths', () => {
        // Arrange
        const path = ['a', 'b'];
        const pattern = ['a', 'b', 'c'];

        // Act
        const result = isPathMatched(path, pattern);

        // Assert
        expect(result).toBe(false);
    });
    
    test('should match path with multiple wildcards in pattern', () => {
        // Arrange
        const path = ["a", "b", "c"];
        const pattern = ["*", "*", "c"];

        // Act
        const result = isPathMatched(path, pattern);

        // Assert
        expect(result).toBe(true);
    });
    test('should match double wildcard with empty remaining path', () => {
        // Arrange
        const path = ["a"];
        const pattern = ["a", "**"];

        // Act
        const result = isPathMatched(path, pattern);

        // Assert
        expect(result).toBe(true);
    });
    
    test('should return false when wildcards do not match pattern structure', () => {
        // Arrange
        const path = ["a", "b", "c"];
        const pattern = ["*", "d", "*"];

        // Act
        const result = isPathMatched(path, pattern);

        // Assert
        expect(result).toBe(false);
    });
    
    it('should return true when matching single element arrays', () => {
        // Arrange
        const path = ["a"];
        const pattern = ["a"];

        // Act
        const result = isPathMatched(path, pattern);

        // Assert
        expect(result).toBe(true);
    });
    
    test('should be case sensitive when matching paths', () => {
        // Arrange
        const path = ["A", "b"];
        const pattern = ["a", "b"];

        // Act
        const result = isPathMatched(path, pattern);

        // Assert
        expect(result).toBe(false);
    });
    
    it('should match double wildcard with multiple remaining elements', () => {
        // Arrange
        const path = ["a", "b", "c", "d", "e"];
        const pattern = ["a", "**"];

        // Act
        const result = isPathMatched(path, pattern);

        // Assert
        expect(result).toBe(true);
    });
    
    test('should match path with mixed single and double wildcards', () => {
        // Arrange
        const path = ["a", "b", "c", "d"];
        const pattern = ["*", "b", "**"];

        // Act
        const result = isPathMatched(path, pattern);

        // Assert
        expect(result).toBe(true);
    });
    
    test('should return false when pattern length exceeds path length', () => {
        // Arrange
        const path = ["a"];
        const pattern = ["a", "*", "c"];

        // Act
        const result = isPathMatched(path, pattern);

        // Assert
        expect(result).toBe(false);
    });
    
    test('should return true when pattern consists of all wildcards', () => {
        // Arrange
        const path = ["a", "b", "c"];
        const pattern = ["*", "*", "*"];

        // Act
        const result = isPathMatched(path, pattern);

        // Assert
        expect(result).toBe(true);
    });
    
    test('should match path when double wildcard is in middle position', () => {
        // Arrange
        const path = ["a", "b", "c"];
        const pattern = ["a", "**", "c"];

        // Act
        const result = isPathMatched(path, pattern);

        // Assert
        expect(result).toBe(false);
    });
    
    it('should match paths with special characters', () => {
        // Arrange
        const path = ['$', '#', '@'];
        const pattern = ['$', '#', '@'];

        // Act
        const result = isPathMatched(path, pattern);

        // Assert
        expect(result).toBe(true);
    });
    
});