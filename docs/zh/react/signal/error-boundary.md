# 错误处理

当创建信号组件时，如果出错时可以通过`options.errorBoundary`选项来指定错误处理函数，用来自定义返回`ReactNode`类型的组件进行错误呈现。

<demo react="signals/signalErrorBoundary.tsx"/>

- 可以在创建信号组件时指定`errorBoundary`，也可以在`createStore`时指定全局的`errorBoundary`。
