import type { Meta, StoryObj } from '@storybook/react';
import { Button,ColorBlock,Card } from "x-react-components"
import { createStore,useStore} from "@autostorejs/react";import React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Signal', 
  parameters: {
    layout: 'centered',
  },
  // tags: [],  //'autodocs' 
} 

export default meta;

type Story = StoryObj<typeof meta>;




export const UpdateArray = ()=>{
  const store = useStore({
    list: [
      { name: "1", ageInfo: { num: 1, desc: "age data" } },
      { name: "2", ageInfo: { num: 1, desc: "age data" } },
    ],
  });
  const { $ } = store;

  const change = () => {
    store.state.list[1].ageInfo.num = Date.now();
  };

  const Item = React.memo(function (props) {
    const { item } = props;
    return <>
      {$(()=><ColorBlock name={item.name}>{item.name}={item.ageInfo.num}</ColorBlock>)}
    </>
  });

  return (
    <Card title="Array signal">
      {store.state.list.map((item,i) =>(<Item key={i} item={item}/>))}            
      <Button onClick={change}>change list</Button>
    </Card>
  )
}