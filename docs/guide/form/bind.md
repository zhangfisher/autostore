# bind
  
`bind`可以快速将`input`控件与状态数据进行快速的双向绑定。
 

<demo react="form/bindField.tsx"/>

- `bind(<状态路径>)`返回`input`的`onChange`方法，将之直接`{...bind("")}`解构到`input`元素上即可。
- `bind`参数可以是任意深度的路径，如`bind("user.name")`。
- `bind`事实上仅仅是返回一个`onChange`而已，其功能代码非常简单，如下：

  ```ts {9-10}
      function bind(){ 
        const args = arguments    
        const selector = args.length>=1 && typeof(args[0])==='string' ? args[0]: undefined
        if(!selector){
            throw new Error("Input bind must have at least one argument")
        }
        const bindings:InputBindings = { }
        bindings['onChange'] = (e:any)=>{
            const value = getInputValueFromEvent(e)    
            setVal(store.state,selector.split(PATH_DELIMITER),value)
        }   
        return bindings
    })
  ```

  - `getInputValueFromEvent`用于从`input`的`onChange`事件中获取`value`值。
  - `setVal`用于将`value`写入到状态中。

  

