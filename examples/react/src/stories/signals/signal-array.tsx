import { Button,ColorBlock,Card } from "x-react-components"
import { createStore } from "@autostorejs/react";
import React from "react";


const store = createStore({
  list: [
    { name: "1", ageInfo: { num: 1, desc: "age data" } },
    { name: "2", ageInfo: { num: 1, desc: "age data" } },
  ],
});
const { $ } = store;

const change = () => {
  store.state.list[1].ageInfo.num = Date.now();
};

const Item = React.memo(function (props:any) {
  const { item } = props;
  console.log("Render Item " + item.name);
  return <>
    {$(()=><ColorBlock name={item.name}>{item.name}={item.ageInfo.num}</ColorBlock>)}
  </>
});

export default () => {
  return (
    <Card title="Array signal">
      {store.state.list.map((item,i) =>(<Item key={i} item={item}/>))}            
      <Button onClick={change}>change list</Button>
    </Card>
  );
}
 