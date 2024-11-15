import React from "react"
import { useForm } from "@autostorejs/react";
import {Layout,JsonView,ColorBlock, Button } from "x-react-components"
import { FieldStyle } from "../styles";
 
export default ()=> { 
	
    const { Form, useReactive,valid,dirty,reset } = useForm({
        user: {
            name   : "x",
            age    : 8,
            address: "福建省泉州市丰泽区",
            phone  : "1381234567",
            email  : "fisher@china.com",
            vip    : false,
            memo   : "hello"
        },
    },{
		validate:(path:string,value:any,part:string | null,fieldEle:HTMLElement)=>{
				if(path==="user.name"){
					if(value.length<3){
						return "name长度不能小于3";
					}
				}else if(path==="user.age"){
					if(value<8){
						return "age不能小于8";
					}
				}else if(path==="user.address"){
					if(value.length<5){
						return "address长度不能小于5";
					}
				}else  if(path==="user.phone"){
					if(!/^138\d{8}$/.test(value)){
						return "必须以138开头的11位手机号码";
					}
				}else if(path==="user.memo"){
					if(value.length<6){
						return "memo长度不能小于6";
					}
				}
				return true
			}
		}
	);	

	const [state] = useReactive(); 
		 
	return (<Layout>
				<div>
					<ColorBlock name="isValid" value={valid}></ColorBlock>
					<ColorBlock name="isDirty" value={dirty}></ColorBlock>
					<Form>
						<div data-field-name="user.name" className={FieldStyle.className}>
							<label>Name:</label>
							<div>
								<input type="text"/>
								<span data-validate-field="user.name"></span>
								<span className="help">minLength=3</span>
							</div>		 
						</div> 
						<div data-field-name="user.age" className={FieldStyle.className}>
							<label>Age</label>
							<div>
								<input type="number"/>
								<span data-validate-field="user.age"></span>
								<span className="help">min=8</span>
							</div>
						</div>
						<div data-field-name="user.address" className={FieldStyle.className}>
							<label>Address</label>
							<div>
								<input type="text"/>
								<span data-validate-field="user.address" ></span>
								<span className="help">minLength=5</span>
							</div>
						</div>
						<div data-field-name="user.phone" className={FieldStyle.className}>
							<label>Phone</label>
							<div>
								<input type="text"/>
								<span data-validate-field="user.phone"></span>
								<span className="help">pattern="^138\d{8}"</span>
							</div>
						</div>
						<div data-field-name="user.memo" className={FieldStyle.className}>
							<label>Memo</label>
							<div>
								<textarea/>
								<span data-validate-field="user.memo"></span>
								<span className="help">minLength=6</span>
							</div>
						</div>
					</Form> 
					<Button onClick={()=>reset()}>Reset</Button>

				</div>
				<div>
					<JsonView data={state} />
				</div>
			</Layout>
		);
	} 