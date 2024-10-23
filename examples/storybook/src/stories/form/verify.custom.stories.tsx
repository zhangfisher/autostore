import { useForm,ValidateResult } from "@autostorejs/react";
import {Input,Button,ColorBlock,Box,Layout,JsonView,Card,CheckBox,RichLabel } from "x-react-components"
 

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Form/Validate'
} 

export default meta;
  
export const CustomReportVerify = { 
	name:"自定义校验信息显示",
	argTypes: { 
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
			reportStyle:reportStyle as any 
		});	

		const [state] = useState();

		return (
			<Card title="自定义校验信息显示">
				<Layout>
					<div>
						<Form>
							<Input name="user.name" minLength={3} label="Name"  required title="至少3个字符" />
							<div data-validate-message="user.name" className="error" style={{padding:'8px',color:"blue"}} ></div>
							<Input name="user.age" label="Age" type="number" />
							<div className="error" style={{padding:'8px',color:"blue"}}  ></div>
							<Input name="user.address" maxLength={5} label="Address" />
							<div className="error" style={{padding:'8px',color:"blue"}}  ></div>
							<Input name="user.phone" pattern="^138\d{8}" label="Phone" />
							<div className="error" style={{padding:'8px',color:"blue"}}  ></div>
							<Input name="user.email" label="Email" type="email" />
							<div className="error"  style={{padding:'8px',color:"blue"}} ></div>							
							<CheckBox name="user.vip" label="VIP" />
						</Form>
					</div>
					<JsonView data={state} />
				</Layout>
				<Box title="校验信息显示">					
					将校验信息显示在指定的元素中
				</Box>
			</Card>
		);
	}
}