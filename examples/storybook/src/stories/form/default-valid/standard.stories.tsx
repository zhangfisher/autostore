import { useForm } from "@autostorejs/react";
import {Input,List,ColorBlock,Box,Layout,JsonView,Card,CheckBox,RichLabel } from "x-react-components"
 

 

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: '表单/标准校验'
} 

export default meta;
  
export const StandardVerify = { 
	name:'默认的校验显示方式',
	render:() => {
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

		return (
			<Card title="按浏览器的默认行为显示校验信息">
				<Layout>
					<div>
						
						<ColorBlock name="isValid" value={valid}></ColorBlock>
						<ColorBlock name="isDirty" value={dirty}></ColorBlock>
						<Form>
							<Input name="user.name" minLength={3} label="Name" required />
							<Input name="user.age" label="Age" type="number" />
							<Input name="user.address" maxLength={5} label="Address" />
							<Input name="user.address" maxLength={5} label="Address" />
							<Input name="user.color" type="color" label="Phone" />
							<Input name="user.email" label="Email" type="email" />
							<Input name="user.sex" label="男" type="radio" />
							<Input name="user.sex" label="女" type="radio" />
							<Input name="user.score" label="Score" type="range" min="0" max="100"  step="5"/>
							<Input name="user.birthday" label="Birthday" type="date" min="2000-1-1" />
							<CheckBox name="user.vip" label="VIP" />
						</Form>
					</div>
					<JsonView data={state} />
				</Layout>
				<List title="校验信息显示"
					description="当{customReport=false}时按浏览器的默认方式显示校验信息"
					items={[
						"{default}: 以浏览器的默认方式进行显示",
						"{custom}: 自定义元素显示"
					]}
				/>
			</Card>
		);
	}
}