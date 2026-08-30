import React from "react"
import { createStore } from '@autostorejs/react';
import { Button,Input,CheckBox,Layout, JsonView} from "x-react-components"

const { reset, useField,useReactive } = createStore({
  user:{
    age:18,                                  // number: 输入自动转数字，无效输入转 0
    vip:true,                                // boolean: 'true'/'false' 自动转 boolean
    zipCode:"075000",                        // string: '0123' 等保持字符串不被污染
    nickname:undefined                        // 空值: 按控件类型推断
  }
})

export default ()=>{
    const [state] = useReactive()
    const fieldAge = useField("user.age")
    const fieldVip = useField("user.vip",{type:"checkbox"})
    const fieldZipCode = useField("user.zipCode")
    const fieldNickname = useField("user.nickname")
    return <Layout>
        <div>
            <Input label="Age(number)" {...fieldAge}/>
            <CheckBox label="Vip(boolean)" {...fieldVip}/>
            <Input label="ZipCode(string)" {...fieldZipCode}/>
            <Input label="Nickname(undefined)" {...fieldNickname}/>
            <Button onClick={()=>{ reset() }}>Reset</Button>
        </div>
        <div>
            <JsonView  border={false} data={state}/>
        </div>
    </Layout>
}
