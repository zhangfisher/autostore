import React from 'react';
import { createStore } from '@autostorejs/react';
import { Box, Button,ColorBlock } from "x-react-components"

let c:number=1

const { state, $ } = createStore({
  price: 100,
  count: 1,
  total: (user) => {
    if(c % 2 == 0){
      c++
      throw new Error("计算出错")
    }
    return user.price * user.count
  },
})

export default () => {

  return <Box>
      <ColorBlock name="Price">{state.price}</ColorBlock>
      <ColorBlock name="Count">
          <Button onClick={()=>state.count--}>-</Button>
          {$("count")}
          <Button onClick={()=>state.count++}>+</Button>
      </ColorBlock> 
      <ColorBlock name="Total">{$("price")}</ColorBlock>
    </Box>
}
