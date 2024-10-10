---
title: 监视对象
order: 4
group:
  title: 监视
  order: 3  
demo:
  tocDepth: 5
toc: content
---

## 关于

如同`ComputedObject`一样，所有在状态中直接使用`watch`声明的均会创建一个对应`WatchObject`对象。

通过`Store.watchObjects`可以访问所有声明的`WatchObject`对象，可以进行相关的动态移除/禁用等操作。

以下是实现表单数据的脏检察的简单示例：

```tsx
/**
 * title: 使用watch功能实现表单数据的脏检察
 * description: 编辑`firstName`或`lastName`,会触发`dirty`的变化
 */
import { createStore,watch } from '@autostorejs/react';
import { Divider,ColorBlock,Button,Box,Input } from "x-react-components"

 const { state,useFormBindings,watchObjects,$  } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName:(user)=>{
      return user.firstName + " " + user.lastName
    }, 
    dirty:watch(({path,value},watchObj)=>{   
            //watchObj.cache是一个{...}对象 
            watchObj.cache[path.join(".")] = true
            return true
        },
        (path)=>{
          // 在本例中，只有firstName和lastName会触发dirty
          return ['firstName','lastName'].includes(path[path.length-1])
        },
        {initial:false})
  }
} )

export default ()=>{
  const bindings = useFormBindings('user')
  return (<div>
    <Input label="FirstName" {...bindings.firstName}/>
    <Input label="lastName" {...bindings.lastName}/> 
    <Divider/>
    <Box>
      <ColorBlock name="FullName">{$('user.fullName')}</ColorBlock>
      <ColorBlock name="Dirty">{$('user.dirty')}</ColorBlock>
      <Button onClick={()=>{
          state.user.firstName = "Zhang"
          state.user.lastName = "Fisher"
          // 重置dirty
          watchObjects.get("user.dirty").reset()
      }}>Reset</Button>
    </Box>
    <Box>
    <div>typeof(store.watchObjects)=={typeof(watchObjects)}</div>
    <div>store.watchObjects.size={watchObjects.size}</div>
    <div>store.watchObjects.size={watchObjects.size}</div>
    <div>store.watchObjects.keys()={[...watchObjects.keys()].join(" , ")}</div>
    </Box> 
  </div>)
}
 
```

## 动态创建监听对象

同`computed`一样，不在状态中声明`watch`，也可以使用`store.watchObjects.create`动态创建监听对象

`create`方法签名如下：

```ts | pure
  create<Value=any,DependValue=any>(
    getter:WatchGetter<Value,DependValue>,
    filter?:WatchDependFilter<DependValue>,
    options?:Omit<WatchOptions<Value>,'filter'>
):WatchObject<Value>   
```

示例如下：

```ts | pure {11-16}
import { createStore } from '@autostorejs/react';

const store = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher"
  }
})

// 同步计算属性
const obj = store.computedObject.create((user)=>user.firstName+user.lastName)
// 异步计算属性
const obj = store.computedObject.create(
  async (user)=>user.firstName+user.lastName,  // 计算函数
  ['./firstName','./lastName'],                // ❌ 不支持相对依赖
  ['user.firstName','user.lastName'],          // ✅ 使用绝对依赖
  {...options....}                             // 参数
)

```



**动态创建监听对象时与在状态中声明监听对象相比，存在以下区别**：

- 动态创建监听对象不存在状态上下文，指依赖时不使用相对依赖，只能使用绝对依赖，即`./`、`./`、`PARENT`等依赖是无效的。
- 动态创建监听对象的`associated=false`
- 动态创建监听对象的功能与在状态中声明创建的功能基本相同，但计算结果没有存储在状态中，而是存储在监听对象中。可以通过`obj.value`来获取计算结果。
 


## 手动执行

同`ComputedObject`一样，`WatchObject`也可以手动执行，通过`store.watchObjects.get("<id>").run()`来执行监听函数。
 