import { useForm } from "@autostorejs/react";
import {List,Layout,JsonView,Card,ColorBlock } from "x-react-components"
import { useState } from "react"
import { styled } from "flexstyled"
import { FieldStyle } from "../../styles";
 


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: '表单/标准校验'
} 

export default meta;
  
export const CustomField = { 
	name:'自定义字段',
	render:() => {
		const { Form, useReactive,valid,dirty } = useForm({
			user: {
				name: "x",
				age: 7,
				address: "福建省泉州市丰泽区",
				phone: "1381234567",
				email: "fisher@china.com",
				vip: false,
				memo:"hello"
			},
		},{
			//customReport:true 默认值
		});	

		const [state] = useReactive(); 
		 
		return (
			<Card title="按浏览器的默认行为显示校验信息">
				<Layout>
					<div>
						<ColorBlock name="isValid" value={valid}></ColorBlock>
						<ColorBlock name="isDirty" value={dirty}></ColorBlock>
						<Form>
							<div data-field-name="user.name" className={FieldStyle.className}>
								<label>Name:</label>
								<div>
									<input type="text" minLength={3}/>
									<span data-validate-field="user.name"></span>
								</div>		 
							</div> 
							<div data-field-name="user.age" className={FieldStyle.className}>
								<label>Age</label>
								<div>
									<input type="number" min={8}  />
									<span data-validate-field="user.age"></span>
								</div>
							</div>
							<div data-field-name="user.address" className={FieldStyle.className}>
								<label>Address</label>
								<div>
									<input type="text"  minLength={5} />
									<span data-validate-field="user.address" ></span>
								</div>
							</div>
							<div data-field-name="user.phone" className={FieldStyle.className}>
								<label>Phone</label>
								<div>
									<input type="text" pattern="^138\d{8}" />
									<span data-validate-field="user.phone"></span>
								</div>
							</div>
							<div data-field-name="user.memo" className={FieldStyle.className}>
								<label>Memo</label>
								<div>
									<textarea/>
									<span data-validate-field="user.memo"></span>
								</div>
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