# log
 `AutoStore` provide log function for recording `AutoStore` internal events are convenient for debugging and diagnosis.

## Use

Be created `AutoStore` setting `debug` for `true` hour,`AutoStore` will record the internal events and print it in the console, as follows:

```ts {6}
import { createStore } from "@autostorejs/react" 

const store = createStore({
  //....
},{
  id:"user",
  debug:true   
})
```

The output style of the console is as follows:

 ![Log](./logs.png) 

:::warning reminder
When the application has multiple `AutoStore` it is recommended to be every `AutoStore` set differently `id`, To distinguish different ones `AutoStore`.
:::


## Custom log output

If you are not satisfied with the default log output or want to `AutoStore` the log information is forwarded to your own log system, which can be configured by configuration `options.log` function custom log output.

<demo react ="debug/log.tsx"/>


 `options.log` the type declaration as follows:
```ts
type LogMessageArgs = string | Error | (()=>string)
type LogLevel = 'log' | 'error' | 'warn'
function log(this:AutoStore<any>,message: LogMessageArgs,level:LogLevel='log'){
```