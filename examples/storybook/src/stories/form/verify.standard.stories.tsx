import { useForm } from "@autostorejs/react";
import {Input,Button,ColorBlock,Box,Layout,JsonView,Card,CheckBox,RichLabel } from "x-react-components"

 

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Form/Validate'
} 

export default meta;
  
export const StandardVerify = { 
	name:'默认的校验显示方式',
	argTypes: {
		reportStyle:{
			name:"校验信息显示方式",
			type:'select',
			options:['default' ,'next' , 'custom'  ],
			
		}	
	},
	render:({reportStyle='next'}) => {
		const { Form, useState } = useForm({
			user: {
				name: "x",
				age: 18,
				address: "福建省泉州市丰泽区",
				phone: "1234567890",
				email: "fisher@china.com",
				vip: false,
			},
		},{
			customReport:reportStyle as any 
		});	

		const [state] = useState();

		return (
			<Card title="默认的校验显示方式">
				<Layout>
					<div>
						<Form>
							<Input name="user.name" minLength={3} label="Name" required />
							<Input name="user.age" label="Age" type="number" />
							<Input name="user.address" maxLength={5} label="Address" />
							<Input name="user.phone" pattern="^138\d{8}" label="Phone" />
							<Input name="user.email" label="Email" type="email" />
							<CheckBox name="user.vip" label="VIP" />
						</Form>
					</div>
					<JsonView data={state} />
				</Layout>
				<Box title="校验信息显示">					
					<ul>
						<li><RichLabel text="{default}: 以浏览器的默认方式进行显示" color='red'/></li>
						<li><RichLabel text="{custom}: 自定义元素显示" color='red'/></li>
					</ul>
				</Box>
			</Card>
		);
	}
}