import { useForm } from "@autostorejs/react";
import { Field,Layout,JsonView,Card,RichLabel } from "x-react-components"
import { styled } from "flexstyled"

const  FormStyle=styled({
	"& select":{
		padding: "4px",
		border: "1px solid #ccc",
		borderRadius: "5px",
		minWidth: "100px",
		cursor: "pointer",		
		"& option":{
			padding: "4px",
			borderRadius: "5px",
		},
		"&:focus":{
			outline: "none",
		}

	}	
})

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: '表单/字段'
} 

export default meta;
  
export const SelectField = { 
	name:'Select',
	render:() => {
		const { Form, useReactive } = useForm({
			user: { 
				sex: "男",
				job: "教师", 
				level:2,
				tags:[],
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
								<div style={{background:"#F4F4F4"}}>
									<RichLabel text='如果状态值是{boolean}类型,自动设置{radio}的{value=true|false}'/>
								</div>
							</Layout> 
							<Layout>
								<Field label="Job">									
									<select name="user.job" value="程序员">
										<option value="程序员">程序员</option>
										<option value="教师">教师</option>
										<option value="公务员">公务员</option>
										<option value="外卖员">外卖员</option>
									</select>
								</Field>
							</Layout> 	
							<Layout>
								<Field label="Level">									
									<select name="user.level">
										<option value="1">实习生</option>
										<option value="2">工程师</option>
										<option value="3">高级工程师</option>
									</select>
								</Field>
							</Layout> 	
							<Layout>
								<Field label="Tags">									
									<select multiple name="user.tags">
										<option value="1">高手</option>
										<option value="2">精英</option>
										<option value="3">变身</option>
										<option value="4">吹牛</option>
									</select>
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