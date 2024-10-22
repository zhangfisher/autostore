import { useForm } from "@autostorejs/react";
import {Input,Button,ColorBlock,Box,Layout,JsonView,Card,CheckBox,RichLabel } from "x-react-components"
 

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Form/Validate'
} 

export default meta;

// type Story = StoryObj<typeof meta>;




export const StandardVerify = () => {

	const { Form, useState } = useForm({
		user: {
			name: "a",
			age: 18,
			address: "福建省泉州市丰泽区",
			phone: "1234567890",
			email: "fisher@china.com",
			vip: false,
		},
	});	

	const [state] = useState();

	return (
		<Card title="默认的校验显示方式">
			<Layout>
				<div>
					<Form>
						<Input name="user.name" minLength={3} label="Name"  required title="至少3个字符" />
						<Input name="user.age" label="Age" type="number" />
						<Input name="user.address" maxLength={5} label="Address" />
						<Input name="user.phone" pattern="^138\d{8}" label="Phone" />
						<Input name="user.email" label="Email" type="email" />
						{/* @ts-ignore */}
						<CheckBox name="user.vip" label="VIP" />
					</Form>
				</div>
				<JsonView data={state} />
			</Layout>
			<ul>
				<li><RichLabel text="默认校验信息显示在{input}的下一个{span.error}元素中" color='red'/></li>
			</ul>
		</Card>
	);
};
 