/grill-with-docs 开始为packages\template增加x-model指令，用于实现输入控件与状态的双向绑定

const store=new AutoStore({
order:{
price:11,
count:23,
total:(scope)=>scope.price * scope.count
},
user:{
first:"zhang",
last:"fisher"
}
})

const engine = new AutoTemplateEngine(el,store,{...})

x-model语法：

<input type="text"  x-model="order.price"/>
<input type="email" x-model="order.count"/>

x-model的值也可以是表达式或计算属性。

- 组合字段

x-model允许与表达式进行绑定

<input type="text"  x-model="user.first + user.last" />
当使用表达式或计算属性，读没有问题，更新时就有问题了，需要一个反向转换过程。

因此需要我们配置一个setter

<input type="text" x-model="user.first +','+ user.last" x-model-set="{user.first=value.split(',')[0];user.last=value.split(',')[1]}"/>

等效于

<input type="text" x-model="user.first +','+ user.last" x-model-options="{set:(value)=>{user.first=value.split(',')[0];user.last=value.split(',')[1]}}/>

- 字段拆分

需要提供一个getter

<input name="ip1" type="text" x-model="user.ip" x-model-get="value.split('.')[0]"/>
<input name="ip1" type="text" x-model="user.ip" x-model-get="value.split('.')[1]"/>
<input name="ip1" type="text" x-model="user.ip" x-model-get="value.split('.')[2]"/>
<input name="ip1" type="text" x-model="user.ip" x-model-get="value.split('.')[3]"/>

等效于

<input name="ip1" type="text" x-model="user.ip" x-model-options="{get:(value)=>value.split('.')[0]} />
<input name="ip2" type="text" x-model="user.ip" x-model-options="{get:(value)=>value.split('.')[1]} />
<input name="ip3" type="text" x-model="user.ip" x-model-options="{get:(value)=>value.split('.')[2]} />
<input name="ip4" type="text" x-model="user.ip" x-model-options="{get:(value)=>value.split('.')[3]} />

当使用 x-model直接配置getter,setter时，直接在元素上写js代码，js代码如何比较复杂，则不利于管理。
推荐使用action来实现。

<style type="actions">{
   splitIp(value,index){
        return value.split(".")[index]
   }
   setUser(value){
        const store = this.
        user.first=value.split(',')[0];
        user.last=value.split(',')[1]
   }
}
</style>

<input name="ip1" type="text" x-model="user.ip" x-model-options="{get:'splitIp(1)'}/>
<input name="ip1" type="text" x-model="user.ip" x-model-options="{set:'splitIp(1)'}/>

也就是说，getter，setter只需要指定action即可。这样可以简化代码，也方便复用.
