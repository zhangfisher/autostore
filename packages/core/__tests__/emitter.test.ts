import { describe, it, expect, vi } from 'vitest';
import { isEventMatched, EventEmitter } from '../src/events/emitter';

// 测试 isEventMatched 函数
describe("EventEmitter",()=>{


    describe('isEventMatched', () => {
        it('should return true for exact match', () => {
            expect(isEventMatched('a.b.c', 'a.b.c')).toBe(true);
        });
    
        it('should return true for single wildcard match', () => {
            expect(isEventMatched('a.b.c', 'a.*.c')).toBe(true);
        });
    
        it('should return false for single wildcard mismatch', () => {
            expect(isEventMatched('a.b.c', 'a.*.d')).toBe(false);
        });
    
        it('should return true for double wildcard match', () => {
            expect(isEventMatched('a.b.c', '**')).toBe(true);
        });
    
        it('should return false for different lengths', () => {
            expect(isEventMatched('a.b.c', 'a.b')).toBe(false);
        });
    
        it('should return true for empty pattern', () => {
            expect(isEventMatched('a.b.c', '')).toBe(true);
        });
    });
    
    // 测试 EventEmitter 类
    describe('EventEmitter', () => { 
    
        it('should call listener for exact event', () => {
            const emitter = new EventEmitter();
            const listener = vi.fn();
    
            emitter.on('a.b.c', listener);
            emitter.emit('a.b.c', 'test');
    
            expect(listener).toHaveBeenCalledWith('test');
        });
    
        it('should call listener for wildcard event', () => {
            const emitter = new EventEmitter();
            const listener = vi.fn();
    
            emitter.on('a.*.c', listener);
            emitter.emit('a.b.c', 'test');
    
            expect(listener).toHaveBeenCalledWith('test');
        });
    
        it('should not call listener for non-matching event', () => {
            const emitter = new EventEmitter();
            const listener = vi.fn();
    
            emitter.on('a.*.d', listener);
            emitter.emit('a.b.c', 'test');
    
            expect(listener).not.toHaveBeenCalled();
        });
    
        it('should call listener for double wildcard event', () => {
            const emitter = new EventEmitter();
            const listener = vi.fn();
            emitter.on('**', listener);
            emitter.emit('a.b.c', 'test');
            expect(listener).toHaveBeenCalledWith('test');
        });
        
        it('应该正确处理空字符串模式', () => {
            expect(isEventMatched('a.b.c', '')).toBe(true); // 根据现有逻辑，空模式返回 true
            expect(isEventMatched('', '')).toBe(true); // 两个空字符串应该匹配
        });
    
        it('应该正确处理只有通配符的模式', () => {
            expect(isEventMatched('a.b.c', '**')).toBe(true); // ** 匹配任意长度
        });
     
    });
    
    
    
    // 测试 offAll 方法
    describe('EventEmitter offAll', () => {
        it('should clear all listeners', () => {
            const emitter = new EventEmitter();
            const listener1 = vi.fn();
            const listener2 = vi.fn();
    
            emitter.on('a.b.c', listener1);
            emitter.on('a.*.c', listener2);
            emitter.offAll();
    
            emitter.emit('a.b.c', 'test');
            emitter.emit('a.b.d', 'test');
    
            expect(listener1).not.toHaveBeenCalled();
            expect(listener2).not.toHaveBeenCalled();
        });
    });
    
    // 测试 onAny 方法
    describe('EventEmitter onAny', () => {
        it('should call listener for any event', () => {
            const emitter = new EventEmitter();
            const listener = vi.fn();
    
            const off = emitter.onAny(listener);
            emitter.emit('a.b.c', 'test');
            emitter.emit('a.b.d', 'test');
    
            expect(listener).toHaveBeenCalledTimes(2);
            expect(listener).toHaveBeenNthCalledWith(1, 'test',"a.b.c");
            expect(listener).toHaveBeenNthCalledWith(2, 'test',"a.b.d");
    
            off.off();
            emitter.emit('a.b.c', 'test');
            expect(listener).toHaveBeenCalledTimes(2);
        });
    });
    
    // 测试 wait 方法
    describe('EventEmitter wait', () => {
        it('should resolve when event is emitted', async () => {
            const emitter = new EventEmitter();
            const promise = emitter.wait('a.b.c');
    
            setTimeout(() => {
                emitter.emit('a.b.c', 'test');
            }, 100);
    
            expect(await promise).toBe('test');
        });
    
        it('should reject when timeout occurs', async () => {
            const emitter = new EventEmitter();
            const promise = emitter.wait('a.b.c', 100);
    
            await expect(promise).rejects.toThrow('timeout');
        });
    });
     
})
