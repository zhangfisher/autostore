import { useForm } from "@autostorejs/react";
import { Field,Layout,JsonView,Card,RichLabel } from "x-react-components"
import { styled } from "flexstyled"

const  FormStyle=styled({
	"& input[type=radio]":{
		marginLeft: "12px",
		cursor: "pointer",
		"& ~ label":{
			cursor: "pointer",
		}
	}	
})

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
				sex: "男",
				job: "教师",
				level: 3,
			},
		},{
			customReport:false
		});	

		const [state] = useReactive();

		return (
			<Card title="Radio">
				<Layout direction="column">
					<div> 
						<Form className={FormStyle.className}> 
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
								<div style={{background:"#F4F4F4"}}>
									<RichLabel text='如果状态取值是多个选项，则需要为{radio}指定{value}'/></div>
							</Layout> 
							<Layout>
								<Field label="Job">									
									<input id="job1" name="user.job" type="radio" value="程序员"/>
									<label htmlFor="job1">程序员</label>									
									<input id="job2" name="user.job" type="radio" value="教师"/>
									<label htmlFor="job2">教师</label>									
									<input id="job3" name="user.job" type="radio" value="公务员"/>
									<label htmlFor="job3">公务员</label>									
									<input id="job4" name="user.job" type="radio" value="外卖员"/>
									<label htmlFor="job4">外卖员</label>
								</Field>
							</Layout>
							<Layout>
								<Field label="Level">									
									<input id="l1" name="user.level" type="radio" value="1"/>
									<label htmlFor="l1">L1</label>									
									<input id="l2" name="user.level" type="radio" value="2"/>
									<label htmlFor="l2">L2</label>									
									<input id="l3" name="user.level" type="radio" value="3"/>
									<label htmlFor="l3">L3</label>									
									<input id="l4" name="user.level" type="radio" value="4"/>
									<label htmlFor="l4">L4</label>
									<input id="l5" name="user.level" type="radio" value="5"/>
									<label htmlFor="l5">L5</label>
								</Field>
							</Layout>
							
						</Form>
					</div>
					<JsonView data={state} />
				</Layout> 
			</Card>
		);
	}
}