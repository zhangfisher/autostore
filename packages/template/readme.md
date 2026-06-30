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
