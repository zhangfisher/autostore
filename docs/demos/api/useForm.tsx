import React from 'react';
import { useForm, delay } from '@autostorejs/react';
import { Button, ColorBlock, Input, JsonView, Layout, Loading } from 'x-react-components';

export default () => {
    // 传入初始状态，内部创建表单 store
    const { Form, useReactive, dirty, valid, submiting, submit, reset } = useForm({
        user: {
            firstName: 'Zhang',
            lastName: 'Fisher',
            age: 18,
        },
    });

    // 订阅整个状态树：编辑字段时组件重渲染，JsonView 才能实时更新
    const [state] = useReactive();

    return (
        <Layout>
            <div>
                <Form
                    onSubmit={async (state) => {
                        await delay(1000); // 模拟提交
                        console.log('提交数据=', state);
                    }}
                >
                    <Input name="user.firstName" label="FirstName" />
                    <Input name="user.lastName" label="LastName" />
                    <Input name="user.age" label="Age" type="number" />
                    <div>
                        <Button type="submit" disabled={submiting}>
                            提交
                        </Button>
                        {submiting && <Loading />}
                    </div>
                </Form>
                <Button onClick={() => reset()}>Reset</Button>
                <Button onClick={() => submit()}>编程式提交</Button>
            </div>
            <div>
                <ColorBlock name="Dirty">{String(dirty)}</ColorBlock>
                <ColorBlock name="Valid">{String(valid)}</ColorBlock>
                <JsonView data={state} />
            </div>
        </Layout>
    );
};
