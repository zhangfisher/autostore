# 依赖收集

当状态数据发生变更时（即计算属性的依赖发生变化时），`AutoStore`会自动执行计算属性的`Getter`函数，然后将计算结果赋值给`State`中的对应属性。

## 依赖路径

在了解计算属性的依赖路径之前，先了解下依赖路径的概念。依赖路径是指在状态树中的路径，依赖路径的格式为：

```ts
type DependPath  = string | string[]
```

依赖路径是一个使用`.`作为分割符的字符串或者`string[]`数组。

```ts

const state = {
  user:{
    name:"Zhang",
    age:18,
    address:[
      {
        city:"Shanghai",
        street:"Nanjing Road"
      },
    ],
    tags:["A","B","C"]
  }
}

// 字符串路径

user
user.name
user.address.0.city  // 数组索引
user.age
user.tags.1          // 数组索引

// 等效的数组路径

["user"]
["user","name"]
["user","address",0,"city"]
["user","age"]
["user","tags",1]


```

:::info
- **Q**: 为什么有`字符串路径`和`数组路径`的区别？
- **A**: 两者是等效的，相较而言，使用`.`作为分割符的字符串更加友好方便，但缺点是当状态数据的键名称包含`.`字符时会产生岐义。而`数组路径`更加精准，不会产生岐义。
:::

## 依赖类型

计算属性的依赖类型定义如下：

```ts
type ComputedDepend = 'CURRENT' | 'ROOT' | 'PARENT' 
  | `/${string}` | `./${string}` | `../${string}` | string | string[] 

```

计算属性的依赖声明包括`绝对路径`和`相对路径`：


| 依赖类型 | 说明 | 示例 |
| --- | --- | --- |
| `CURRENT` | 当前对象 | `computed`所在状态的对象路径 |
| `ROOT` | 根对象 | 等效于`/` |
| `PARENT` | 父对象 |  `computed`所在状态的对象路径的父对象 |
| `/${string}` | 绝对路径 | eg. `/user/name` |
| `./${string}` | 相对`CURRENT`的路径 | eg. `./name` |
| `../${string}` | 相对`PARENT`的路径 | eg. `../name`,`../../a/bc` |
| `string` |  绝对字符串路径 |  等效于`/user.name` |

**重点理解一下`相对路径`的概念：**

`相对路径`的相对指的是`computed`函数所在的对象，例如：

- **相对当前对象**

`CURRENT`这里的当前指的是`computed`函数所在的对象，即`total`所在的对象是`order`对象。

```ts {8-9} 
const state = {
  order:{
    price:10,
    count:1,
    total:computed(async (scope)=>{
      return scope.price*scope.count
    },[
      './price',
      './count'
    ])
  }
}
```

- **相对父对象**

即`total`所在的对象是`order`对象，`..`表示父对象，指向的就是根对象.


```ts {8-9} 
const state = {
  order:{
    price:10,
    count:1,
    total:computed(async (scope)=>{
      return scope.price*scope.count
    },[
      '../order.price',
      '../order.count'
    ])
  }
}
```

:::warning 特别注意 
相对的是`computed`函数声明的状态所在的对象，上例中的`total`所在的对象是`order`而不是`total`。
:::


## 通配符依赖

在指定依赖时可以通过`*`通配符来匹配路径中任意字符，如:

- ✅ `orders.*.total` 匹配`orders`的任意对象的`total`属性。  
- ✅ `orders.*` 匹配`orders`下的任意成员。
- ✅ `orders.*.address.*.city` 匹配`orders`的任意对象的`address`的任意对象的`city`属性。

:::info 提示
在快速入门的示例中，我们就使用`orders.*.total`来匹配`orders`数组成员中的`total`属性。
:::

## 收集依赖

当依赖发生变化时，会自动触发计算属性的重新计算。因此必然有人一个收集依赖的过程，由于同步计算属性和异步计算属性的依赖收集方式不同，因此分别介绍。

### 同步依赖收集

在同步属性的初始化中，会自动完成同步计算属性的依赖收集，原理如下：

- 执行同步计算函数`Getter`前，先调用`store.watch`函数来侦听对状态的所有读写事件。
- 然后自动执行一次计算函数`Getter`，这样侦听函数就可以侦听到`Getter`函数用到了哪些状态，即依赖了哪些状态，将之记录下来即可,从而完成依赖的收集工作。
- 最后取消`store.watch`侦听。


**特殊注意的是，必须`保证同步计算属性的计算函数执行是幂等的`， 即多次调用结果是一样的。才可以保证依赖收集的准确性。
通俗的讲，就是计算函数的执行必须能收集到相同的依赖。**

如下示例就无法保证正确收集依赖。
 

```ts {6-9} 
const state = {
  order:{
    price:10,
    count:1,
    total:computed((scope)=>{
      if(a===1){
        return scope.count
      }
      return scope.price*scope.count
    } )
  }
}
```

以上示例在第一次执行时收集依赖，如果`a=1`，返回`scope.count`，就只能收集到`scope.count`的依赖，而不会收集到`scope.price`的依赖。这样在`scope.price`变化时，就无法触发`total`的重新计算。

### 异步依赖收集

异步计算属性的依赖收集无法像同步计算属性那样自动完成，需要手动指定依赖路径。

```ts {5-7}
const state = {
  order:{
    price:10,
    count:1,
    total:computed(async (scope)=>{
      return scope.price*scope.count
    },['./price','./count'])
  }
}
```

- 异步计算属性的依赖路径是通过第二个参数指定的，这里指定了`./price`和`./count`，即依赖了`price`和`count`属性。
- 可以指定一个或多个依赖路径，当依赖路径中的任何一个发生变化时，都会触发计算属性的重新计算。
- 依赖路径可以是绝对路径，也可以是相对路径，相对路径的相对对象是计算属性所在的对象。

