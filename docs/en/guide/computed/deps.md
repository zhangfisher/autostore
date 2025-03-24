# Dependency Collection

When state data changes (i.e., when the dependencies of computed properties change), `AutoStore` automatically executes the computed property's `Getter` function and assigns the calculation result to the corresponding property in `State`.

## Dependency Path

Before understanding the dependency path of computed properties, let's first understand the concept of dependency paths. A dependency path refers to a path in the state tree, and its format is:

```ts
type DependPath  = string | string[]
```

A dependency path is either a string using `.` as a delimiter or a `string[]` array.

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

// String paths

user
user.name
user.address.0.city  // array index
user.age
user.tags.1          // array index

// Equivalent array paths

["user"]
["user","name"]
["user","address",0,"city"]
["user","age"]
["user","tags",1]
```

:::info
- **Q**: Why is there a distinction between `string paths` and `array paths`?
- **A**: They are equivalent, but string paths using `.` as a delimiter are more user-friendly and convenient. However, they have the disadvantage of being ambiguous when state data key names contain the `.` character. Array paths are more precise and avoid ambiguity.
:::

## Dependency Types

The dependency types for computed properties are defined as follows:

```ts
type ComputedDepend = 'CURRENT' | 'ROOT' | 'PARENT' 
  | `/${string}` | `./${string}` | `../${string}` | string | string[] 
```

Computed property dependencies include both `absolute paths` and `relative paths`:

| Dependency Type | Description | Example |
| --- | --- | --- |
| `CURRENT` | Current object | Object path where `computed` is located |
| `ROOT` | Root object | Equivalent to `/` |
| `PARENT` | Parent object | Parent object path where `computed` is located |
| `/${string}` | Absolute path | e.g., `/user/name` |
| `./${string}` | Path relative to `CURRENT` | e.g., `./name` |
| `../${string}` | Path relative to `PARENT` | e.g., `../name`,`../../a/bc` |
| `string` | Absolute string path | Equivalent to `/user.name` |

**Let's focus on understanding the concept of `relative paths`:**

A `relative path` is relative to the object where the `computed` function is located. For example:

- **Relative to Current Object**

Here, `CURRENT` refers to the object where the `computed` function is located, meaning `total` is located in the `order` object.

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

- **Relative to Parent Object**

Here, `total` is located in the `order` object, and `..` refers to the parent object, which points to the root object.

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

:::warning Special Note
The relative path is relative to the object where the `computed` function's state is declared. In the example above, `total` is in the `order` object, not in `total`.
:::

## Wildcard Dependencies

When specifying dependencies, you can use the `*` wildcard to match any characters in the path, such as:

- ✅ `orders.*.total` matches the `total` property of any object in `orders`.
- ✅ `orders.*` matches any member under `orders`.
- ✅ `orders.*.address.*.city` matches the `city` property of any object in `address` of any object in `orders`.

:::success Example
In the quick start example, we used `orders.*.total` to match the `total` property in the `orders` array members.
:::

## Collecting Dependencies

When dependencies change, they automatically trigger the recomputation of computed properties. Therefore, there must be a process for collecting dependencies. Since synchronous and asynchronous computed properties collect dependencies differently, we'll discuss them separately.

### Synchronous Dependency Collection

During the initialization of synchronous properties, the collection of synchronous computed property dependencies is completed automatically. Here's how it works:

- Before executing the synchronous computation function `Getter`, the `store.watch` function is called to monitor all read and write events to the state.
- Then, the computation function `Getter` is automatically executed once, allowing the monitoring function to detect which states the `Getter` function uses (i.e., which states it depends on) and record them, thus completing the dependency collection.
- Finally, the `store.watch` monitoring is cancelled.

**It's particularly important to note that the computation function of synchronous computed properties must be `idempotent`, meaning multiple calls should yield the same result. This ensures the accuracy of dependency collection.
In simple terms, the execution of the computation function must be able to collect the same dependencies.**

The following example cannot guarantee correct dependency collection:

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

In this example, during the first execution for dependency collection, if `a=1`, it returns `scope.count`, and only the dependency on `scope.count` will be collected, not the dependency on `scope.price`. As a result, changes to `scope.price` won't trigger the recalculation of `total`.

### Asynchronous Dependency Collection

Unlike synchronous computed properties, asynchronous computed properties cannot automatically collect dependencies and require manual specification of dependency paths.

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

- The dependency paths for asynchronous computed properties are specified through the second parameter. Here, `./price` and `./count` are specified, indicating dependencies on the `price` and `count` properties.
- You can specify one or more dependency paths. When any path in the dependencies changes, it will trigger the recomputation of the computed property.
- Dependency paths can be either absolute or relative, with relative paths being relative to the object where the computed property is located.
