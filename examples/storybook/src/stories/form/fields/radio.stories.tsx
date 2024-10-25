import { useForm } from "@autostorejs/react";
import {Input,List,ColorBlock,Field,Layout,JsonView,Card,CheckBox,RichLabel } from "x-react-components"
 

 

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: '表单/字段'
} 

export default meta;
  
export const RadioField = { 
	name:'Radio',
	render:() => {
		const { Form, useReactive } = useForm({
			user: {
				vip: false, 
				sex: "男"
			},
		},{
			customReport:false
		});	

		const [state] = useReactive();

		return (
			<Card title="Radio">
				<Layout direction="column">
					<div> 
						<Form> 
							<Layout>
								<div style={{background:"#F4F4F4"}}><RichLabel text='如果状态值是{boolean}类型,自动设置{radio}的{value=true|false}'/></div>
							</Layout> 
							<Layout>
								<div>
									<Field label="VIP">
										<label htmlFor="vip-yes">是</label>
										<input id="vip-yes" name="user.vip" type="radio"/>
										<label htmlFor="vip-no">否</label>
										<input id="vip-no" name="user.vip" type="radio"/>
									</Field>
								</div>
								<div><RichLabel text="简单的{Boolean}值绑定"/></div>
							</Layout>
							<Layout>
								<div style={{background:"#F4F4F4"}}><RichLabel text='选中/取消{checkbox}时,如果指定{value="[trueValue],[falseValue]"},则状态值在两个值之间切换，需要指定'/></div>
							</Layout> 
							<Layout>
								<div><CheckBox name="user.selected" label="Selected" value="a,b" /></div>
								<div><RichLabel text='当状态值在{a|b}切换时,需要在指定checkbox元素的{value="a,b"}'/></div>
							</Layout>
							<Layout>
								<div><CheckBox name="user.number" label="Number" value="1,0"/></div>
								<div><RichLabel text='当值是数字时需要在{0|1}之间切换时,需要指定类型'/></div>
							</Layout>
							
						</Form>
					</div>
					<JsonView data={state} />
				</Layout> 
			</Card>
		);
	}
}