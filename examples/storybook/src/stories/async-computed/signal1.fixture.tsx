import { Button } from "x-react-components"
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

const Item = React.memo(function (props) {
  const { item } = props;
  console.log("Render Item " + item.name);
  return (
    <div>
      {$(
        ({ value }) => {
          const target = value.find((v) => v.name === item.name);
          if (!target) return null;
          console.log("auto target ", target);
          return (
            <>
              {target.name} {target.ageInfo.num}
            </>
          );
        },
        (state) => state.list
      )}
    </div>
  );
});

export default function () {
  const [state] = store.useState();
  return (
    <div style={{ border: "1px solid red", padding: "6px", marginTop: "12px" }}>
      <h3>autostore sigbal cb demo</h3>
      {state.list.map((v) => (
        <Item key={v.name} item={v} />
      ))}
      <Button onClick={change}>change list</Button>
    </div>
  );
}
