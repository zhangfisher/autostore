---
title: 适用范围
group:
  title: 监视
  order: 3 
order: 5
demo:
  tocDepth: 5
toc: content
---

 
大部份情况下，我们应该使用`computed`函数来声明计算属性，而不是使用`watch`函数来侦听`State`中的数据变化。但是在一些特殊情况下，我们可能需要使用`watch`函数，主要在于：

- **动态依赖**

`computed`计算函数的依赖一般是确定的，而`watch`函数的依赖是动态的。这比较适合一些需要动态侦听的场景，比如上例中，我们动态侦听`orders[].count`的变化来计算`total`。而`computed`函数的依赖是静态的，一旦声明就不会变化。

- **多字段复合计算**

当某个字段需要进行复合计算时，我们可以使用`watch`函数来实现。比如在`SpeedForm`实现表单的`validate`和`dirty`属性的计算时，就是使用`watch`实现。

比如这是表单`validate`检测的实现代码：

```tsx | pure
export function validate<T=any>(options?:ValidateOptions){
    const { entry  } = Object.assign({},options)
    return watch<boolean,boolean>((value,{ fromPath,selfPath,getCache})=>{        
        // 只侦听entry下的所有字段
        if(!isIncludePath(entry ? entry : selfPath,fromPath)) return   
        const selfCache = getCache()  // 得到的是一个Dict用来保存所有字段的validate属性值
        // validate属性是一个boolean
        if(typeof(value)=='boolean'){
            const srcKey = fromPath.join(OBJECT_PATH_DELIMITER)
            if(value){
                delete selfCache[srcKey]
            }else{
                selfCache[srcKey] = value
            }
        }
        // 由于cache里面只记录validate=false的值，所以如果cache不为空则代表有字段的validate=false
        return Object.keys(selfCache).length==0
    },(path)=>isValidateField(path),{
        initial:true
    })
}
 
```

**基本逻辑：*

- 以上`validate`传入一个入口参数`entry`,用来限定校验范围，然后创建一个`watch`对象。
- `(path)=>isValidateField(path)`用来判断发生变化的路径是否包含的`validate`字段，如果是否则会执行`watch`监听函数。
- 在`watch`监听函数内，
    -  `value`：变化的值
    - `fromPath`：指的是哪里发生变化的路径
    - `getCache`：用来获取当前`watch`的`cache`对象，用来保存校验值。
    - 在`cache`里面我们保存从校验范围内所有`value=false`，如果`Object.keys(selfCache).length==0`就代表在该校验范围内所有字段均有效。


    





