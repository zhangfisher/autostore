# 创建全局Store

```ts
const store = new AutoStore({
    order: {
        name: "产品名称",
        price: 18,
        count: 120,
        total: (scope) => scope.price * scope.count,
    },
    books: [{ name: "AutoStore" }, { name: "FlexState" }],
});


const el= document.querySelector("#app")
const app  = new AutoRender(el,store,{...选项...})

app.start()

```

## 条件

当表达式为真时渲染整个div元素

```html
<div x-if="order.total">内部组件</div>
```

## 显示/隐藏

控制`display`值

```html
<div x-visible="order.total>0"></div>
```

## 属性

渲染为内部

```html
<span x-text="order.name"></span> // <span x-text="order.name">产品名称</span>
<span x-text="order"></span> // <span x-text="order">产品名称{{name}}</span>
```

## html内容

```html
<span x-html="order.name"></span>
```

## 循环

```html
<ul x-for="book of books">
    <li key="book.name" x-text="book.name"></li>
</ul>
```

<div class="sddd {order.ane} "

创建的Binding被添加到BindingManager中，添加于需要进行优化

- 同名binding只保留一个，比如<span x-text="a" x-text="b"></span>，两个x-text，只有一个会生效。
- 指令具有优先级，在添加到BindingManager是按优先级进行排列，执行时高优化级的优化执行。 比如<div x-for="item of items" x-text="">....</div>,x-for指令优先。

指令的computed是可选的，默认会自动创建计算属性表达式。
但是对某个指令是无效的。如下

  <ul x-for="item of items">
     <li x-text="item.name"></li>
  </ul>

如果按照默认的创建计算属性的方式如下：

x-for="item of items"这种创建计算属性时,((...scope)=>{
return item of items
})(scope)

这种创建计算属性是无效的。应特殊处理。不能按普通计算属性表达样式一样创建。所以指令接受一个computed(expr)函数，用于创建计算属性.也就是将计算属性的创建也从binding转移到指令中。

由x-for指令实现computed

interface Directive{
computed:(expr:string){
const [ item, list ]=expr.split("of")
return [
(...scope)=>{
// 当数组变化时需要重新
return list
},{
item
}]
}
update?(el: HTMLElement, value:any,params:Record<string,any>, store: AnyAutoStore){

        }

}

store = new AutoStore({
items:[{name:"a"},{name:"b"},{name:"c"}]
})

  <ul x-for="item of items">
     <li x-text="item.name"></li>
  </ul>
