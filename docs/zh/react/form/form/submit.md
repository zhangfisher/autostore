# 提交表单


## 标准提交
 
只需要在`form`元素上添加`<input type='submit'/>`或者`<button type='submit'>`即可。

所有行为都是浏览器默认行为。

## AJAX提交

`useForm`提供了`submit`方法用于进行`AJAX`提交表单。

- `submit`方法会触发`submit`事件，可以通过`onSubmit`监听该事件。
- 然后在`onSubmit`事件中，使用`AJAX/fetch`将表单数据提交到服务器即可。
- `submiting`属性用于标识表单是否正在提交中，可以用于控制提交按钮的状态。

**示例如下：**

<demo react="form/form/formSubmit.tsx"/>

