import React from 'react';
import { useForm } from '@autostorejs/react';
import { CheckBox, ColorBlock, Input, JsonView, Layout } from 'x-react-components';


export  default () => {
		const { Form, useReactive,valid,dirty } = useForm({
			user: {
				name: "x",
				age: 18,
				address: "福建省泉州市丰泽区",
				phone: "1381234567",
				email: "fisher@china.com",
				birthday:"2021-01-01",
				color:"#ff0000",
				vip: false,
				score:80,
				sex: "男"

			},
		},{
			customReport:false
		});	

		const [state] = useReactive();

		return (<>
            <Layout>
                <div>
                    
                    <ColorBlock name="isValid" value={valid}></ColorBlock>
                    <ColorBlock name="isDirty" value={dirty}></ColorBlock>
                    <Form>
                        <Input name="user.name" minLength={3} label="Name" required />
                        <Input name="user.age" label="Age" type="number" />
                        <Input name="user.address" maxLength={5} label="Address" />
                        <Input name="user.address" maxLength={5} label="Address" />
                        <Input name="user.color" type="color" label="Color" />
                        <Input name="user.email" label="Email" type="email" />
                        <Input name="user.sex" label="男" type="radio" />
                        <Input name="user.sex" label="女" type="radio" />
                        <Input name="user.score" label="Score" type="range" min="0" max="100"  step="5"/>
                        <Input name="user.birthday" label="Birthday" type="date" min="2000-1-1" />
                        <CheckBox name="user.vip" label="VIP" />
                    </Form>
                </div>
                <div>
                    <JsonView data={state} />
                </div>
            </Layout> 
        </>);
}