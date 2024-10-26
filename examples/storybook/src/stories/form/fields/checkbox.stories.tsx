import { useForm } from "@autostorejs/react";
import {Input,List,ColorBlock,Box,Layout,JsonView,Card,CheckBox,RichLabel } from "x-react-components"
 

 

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: '表单/字段'
} 

export default meta;
  
export const CheckBoxField = { 
	name:'CheckBox',
	render:() => {
		const { Form, useReactive } = useForm({
			user: {
				vip: false,				
				selected:"a",
				number:1,
				sex: "男"
			},
		},{
			customReport:false
		});	

		const [state] = useReactive();

		return (
			<Card title="按浏览器的默认行为显示校验信息">
				<Layout direction="column">
					<div> 
						<Form> 
							<Layout>
								<div style={{background:"#F4F4F4"}}>
									<RichLabel text='正常模式下，状态值是{boolean}类型时对应{checkbox}的选中/取消'/>
								</div>
							</Layout> 
							<Layout>
								<div><CheckBox name="user.vip" label="VIP" /></div>
								<div><RichLabel text="简单的{Boolean}值绑定"/></div>
							</Layout>
							<Layout>
								<div style={{background:"#F4F4F4"}}>
									<RichLabel text='如果状态的值不是{boolean}，而是任意两个值之间切换,则需要为{checkobx}指定元素的{value="[trueValue],[falseValue]"}'/>
								</div>
							</Layout> 
							<Layout>
								<div><CheckBox name="user.selected" label="Selected" value="a,b" /></div>
								<div><RichLabel text='当状态值在{a|b}切换时,需要在指定checkbox元素的{value="a,b"}'/></div>
							</Layout>
							<Layout>
								<div><CheckBox name="user.number" label="Number" value="1,0"/></div>
								<div><RichLabel text='当值是数字时需要在{0|1}之间切换时,需要指定类型'/></div>
							</Layout>
							<Layout>
								<div>
									<RichLabel>
										通过字段转换可以使用checkbox
									</RichLabel>
								</div>
							</Layout>
							
						</Form>
					</div>
					<JsonView data={state} />
				</Layout> 
			</Card>
		);
	}
}