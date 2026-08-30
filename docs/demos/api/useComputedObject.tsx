import React from 'react';
import { createStore } from '@autostorejs/react';
import { Button, ColorBlock, Layout } from 'x-react-components';

const store = createStore({
    order: {
        price: 100,
        count: 2,
    },
});
const { useComputedObject } = store;

export default () => {
    // 返回计算属性对象本身，不订阅值变化
    const totalObj = useComputedObject((state) => state.order.price * state.order.count);

    // 手动订阅值变化（演示用途，驱动渲染请使用 useComputed）
    const [total, setTotal] = React.useState(totalObj?.value);
    React.useEffect(() => {
        const watcher = totalObj?.watch(() => {
            setTotal(totalObj.value);
        });
        return () => watcher?.off();
    }, []);

    return (
        <Layout>
            <div>
                <Button onClick={() => store.state.order.count++}>Count++</Button>
                <Button onClick={() => totalObj?.run()}>手动触发计算</Button>
            </div>
            <div>
                <ColorBlock name="Total">{String(total)}</ColorBlock>
                <ColorBlock name="computedObj.value">{String(totalObj?.value)}</ColorBlock>
            </div>
        </Layout>
    );
};
