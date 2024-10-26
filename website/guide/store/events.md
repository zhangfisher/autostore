 
# 事件

使用`createStore`或`useStore`创建的`AutoStore`对象实例后，实例提供两个事件触发器：

- **实例事件触发器**：
- **状态事件触发器**

## 实例事件触发器

`AutoStore`对象实例本身就是一个事件触发器，提供了一些事件用来监听实例的生命周期、状态变化以及计算属性等事件。

```ts
class AutoStore<State extends Dict> extends EventEmitter<StoreEvents>{

}
export type StoreEvents = {
    // 响应对象创建后
    'load'              : AutoStore<any>;                               
    // 响应对象销毁后
    'unload'            : AutoStore<any>                                
    // 当计算对象创建时
    'computed:created'  : ComputedObject                                
    // 当计算函数执行成功时
    'computed:done'     : {id:string,path:string[],value:any,computedObject:ComputedObject}          
    // 当计算函数执行出错时
    'computed:error'    : {id:string,path:string[],error:any,computedObject:ComputedObject}           
    // 当计算函数被取消时
    'computed:cancel'   : {id:string,path:string[],reason:'timeout' | 'abort' | 'reentry' | 'error',computedObject:ComputedObject}       
    // 当watch对象创建时
    'watch:created'     : WatchObject
    // 当watch对象执行成功时
    'watch:done'        : {value:any,watchObject:WatchObject}
    // 当watch对象执行出错时
    'watch:error'       : {error:any,watchObject:WatchObject}
}; 

```

### 方法

`AutoStore`提供了一些方法用来监听和触发事件：

| 方法 |  说明 |
| :---: |  --- |
| `on` | 监听事件 |
| `onAny`  | 订阅所有事件 |
| `once` | 只监听一次事件 |
| `off`  | 取消监听事件订阅 |
| `offAll`  | 取消所有订阅 |
| `emit` | 触发事件 |
| `wait` | 等待事件触发 |

#### on

#### onAny

#### once

#### off
#### offAll
#### emit
#### wait



### 事件

`AutoStore`提供了以下事件：

#### load

#### unload

#### computed:created
#### computed:done
#### computed:error
#### computed:cancel
#### watch:created
#### watch:done
#### watch:error



## 状态变更触发器

`AutoStore`对象实例提供了一个状态变更触发器`operates`，用来监听状态的读写变化。




