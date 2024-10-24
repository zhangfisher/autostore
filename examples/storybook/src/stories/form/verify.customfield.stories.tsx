import { useForm } from "@autostorejs/react";
import {List,Layout,JsonView,Card,ColorBlock } from "x-react-components"
 

 

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Form/DefaultValidate'
} 

export default meta;
  
export const CustomField = { 
	name:'自定义字段',
	render:() => {
		const { Form, useState,valid,dirty } = useForm({
			user: {
				name: "x",
				age: 7,
				address: "福建省泉州市丰泽区",
				phone: "1381234567",
				email: "fisher@china.com",
				vip: false,
			},
		},{
			//customReport:true 默认值
		});	

		const [state] = useState();
		const invalieStyle={color:'red'}
		const inputStyle={ 
			border: "1px solid #bbb",
			borderRadius: "4px",
			display: "flex",
			margin: "4px",
			padding: "8px",
			flexGrow:1
		}
		return (
			<Card title="按浏览器的默认行为显示校验信息">
				<Layout>
					<div>
						<Form>
							<ColorBlock name="isValid" value={valid}></ColorBlock>
							<ColorBlock name="isDirty" value={dirty}></ColorBlock>
							<div data-field-name="user.name">
								<label>Name</label>
								<input type="text" minLength={3}  style={inputStyle} />
								<span data-validate-field="user.name" style={invalieStyle}></span>
							</div>
							<div data-field-name="user.age">
								<label>Age</label>
								<input type="number" min={8}   style={inputStyle} />
								<span data-validate-field="user.age" style={invalieStyle}></span>
							</div>
							<div data-field-name="user.address">
								<label>Address</label>
								<input type="text"  minLength={5}  style={inputStyle} />
								<span data-validate-field="user.address" style={invalieStyle}></span>
							</div>
							<div data-field-name="user.phone">
								<label>Phone</label>
								<input type="text" pattern="^138\d{8}"  style={inputStyle} />
								<span data-validate-field="user.phone" style={invalieStyle}></span>
							</div>
						</Form> 
					</div>
					<JsonView data={state} />
				</Layout>
				<List title="校验信息显示"
					items={[
						`使用{data-field-name="xxxx"}指定字段名`,						
						`通过{data-validate-field="user.name"}指定将校验错误显示在哪里/>`,	
						`为什么{user.name}在初始化时不会显示校验错误？这是浏览器的默认行为，必须是有用户输入时才会校验，并且这种行为在不同的字段校验规则是不一样的，{pattern}校验就会生效。`,
					]}
				/>
			</Card>
		);
	}
}