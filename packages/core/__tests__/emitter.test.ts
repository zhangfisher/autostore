import { describe, test, it, expect, mock, beforeAll, afterAll, beforeEach, afterEach } from "bun:test"

import { EventEmitter } from '../src/events/emitter';
import { isPathMatched } from "../src/utils";

// 测试 isPathMatched 函数
describe("EventEmitter",()=>{


    describe('isPathMatched', () => {
        it('should return true for exact match', () => {
            expect(isPathMatched('a.b.c', 'a.b.c')).toBe(true);
        });
    
        it('should return true for single wildcard match', () => {
            expect(isPathMatched('a.b.c', 'a.*.c')).toBe(true);
        });
    
        it('should return false for single wildcard mismatch', () => {
            expect(isPathMatched('a.b.c', 'a.*.d')).toBe(false);
        });
    
        it('should return true for double wildcard match', () => {
            expect(isPathMatched('a.b.c', '**')).toBe(true);
        });
    
        it('should return false for different lengths', () => {
            expect(isPathMatched('a.b.c', 'a.b')).toBe(false);
        });
    
        it('should return true for empty pattern', () => {
            expect(isPathMatched('a.b.c', '')).toBe(true);
        });
    });
    
    // 测试 EventEmitter 类
    describe('EventEmitter', () => { 
    
        it('should call listener for exact event', () => {
            const emitter = new EventEmitter();
            const listener = mock();
    
            emitter.on('a.b.c', listener);
            emitter.emit('a.b.c', 'test');
    
            expect(listener).toHaveBeenCalledWith('test','a.b.c');
        });
    
        it('should call listener for wildcard event', () => {
            const emitter = new EventEmitter();
            const listener = mock();
    
            emitter.on('a.*.c',(payload,type)=>{
                listener(payload,type)
            });
            emitter.emit('a.b.c', 'test');
    
            expect(listener).toHaveBeenCalledWith('test','a.b.c');
        });
    
        it('should not call listener for non-matching event', () => {
            const emitter = new EventEmitter();
            const listener = mock();
    
            emitter.on('a.*.d', listener);
            emitter.emit('a.b.c', 'test');
    
            expect(listener).not.toHaveBeenCalled();
        });
    
        it('should call listener for double wildcard event', () => {
            const emitter = new EventEmitter();
            const listener = mock();
            emitter.on('**', listener);
            emitter.emit('a.b.c', 'test');
            expect(listener).toHaveBeenCalledWith('test','a.b.c');
        });
        
        it('应该正确处理空字符串模式', () => {
            expect(isPathMatched('a.b.c', '')).toBe(true); // 根据现有逻辑，空模式返回 true
            expect(isPathMatched('', '')).toBe(true); // 两个空字符串应该匹配
        });
    
        it('应该正确处理只有通配符的模式', () => {
            expect(isPathMatched('a.b.c', '**')).toBe(true); // ** 匹配任意长度
        });
     
    });
    
    
    
    // 测试 offAll 方法
    describe('EventEmitter offAll', () => {
        it('should clear all listeners', () => {
            const emitter = new EventEmitter();
            const listener1 = mock();
            const listener2 = mock();
    
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
            const handler = mock();
    
            const listener = emitter.onAny(handler);
            emitter.emit('a.b.c', 'test');
            emitter.emit('a.b.d', 'test');
    
            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler).toHaveBeenNthCalledWith(1, 'test',"a.b.c");
            expect(handler).toHaveBeenNthCalledWith(2, 'test',"a.b.d");
    
            listener.off();
            emitter.emit('a.b.c', 'test');
            expect(handler).toHaveBeenCalledTimes(2);
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

describe('EventEmitter scope', () => {
    it("Scope事件触发与订阅",()=>{
        const types:string[] = []
        const emitter = new EventEmitter();
        const scope = emitter.scope("x")
        scope.on('a', (payload,type)=>{
            expect(payload).toBe('test')
            expect(type).toBe('a')            
            types.push(type)
        })
        emitter.on('x.a', (payload,type)=>{
            expect(payload).toBe('test')
            expect(type).toBe('x.a')
            types.push(type)
        })
        emitter.emit('x.a', 'test')
        scope.emit('a', 'test')

        expect(types).toEqual(['a','x.a','a','x.a'])

        
    })
    it("Scope事件只订阅一次",()=>{
        return new Promise<void>((resolve)=>{
            const types:string[] = []
            const emitter = new EventEmitter();
            const scope = emitter.scope("x")
            scope.once('a', (payload,type)=>{
                expect(payload).toBe('test')
                expect(type).toBe('a')            
                types.push(type)
            })
            emitter.once('x.a', (payload,type)=>{
                expect(payload).toBe('test')
                expect(type).toBe('x.a')
                types.push(type)
            })
            for(let i=0;i<5;i++){
                scope.emit('a', 'test')
            }
            setTimeout(()=>{
                expect(types).toStrictEqual(['a','x.a'])
                resolve()
            },0)        
        })
        
    })
    it("订阅所有Scope事件",()=>{
        const types:string[] = []
        const emitter = new EventEmitter();
        const scope = emitter.scope("x")
        scope.onAny((payload,type)=>{
            types.push(type)
        })
        scope.emit('a', 'test')
        scope.emit('b', 'test')
        scope.emit('c', 'test')
        scope.emit('d', 'test')
        expect(types).toEqual(['a','b','c','d'])
    })
    it("取消订阅所有Scope事件",()=>{
        const types:string[] = []
        const emitter = new EventEmitter();
        const scope = emitter.scope("x")
        const listener = scope.onAny((payload,type)=>{
            types.push(type)
        })
        scope.emit('a', 'test')
        scope.emit('b', 'test')
        scope.emit('c', 'test')
        scope.emit('d', 'test')
        expect(types).toEqual(['a','b','c','d'])
        listener.off()
        scope.emit('a', 'test')
        scope.emit('b', 'test')
        scope.emit('c', 'test')
        scope.emit('d', 'test')
        expect(types).toEqual(['a','b','c','d'])
    })
    it("使用offAll取消订阅所有Scope事件",()=>{
        const types:string[] = []
        const emitter = new EventEmitter();
        const scope = emitter.scope("x")
        scope.onAny((payload,type)=>{
            types.push(type)
        })
        scope.emit('a', 'test')
        scope.emit('b', 'test')
        scope.emit('c', 'test')
        scope.emit('d', 'test')
        expect(types).toEqual(['a','b','c','d'])
        scope.offAll()
        expect(types).toEqual(['a','b','c','d'])
    })
});