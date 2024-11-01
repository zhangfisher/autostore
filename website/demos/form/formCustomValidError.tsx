import React from "react"
import { useForm } from "@autostorejs/react";
import {Layout,JsonView,ColorBlock } from "x-react-components"
import { FieldStyle } from "./fieldStyles";
 
export default ()=> { 
	
    const { Form, useReactive,valid,dirty } = useForm({
        user: {
            name   : "x",
            age    : 8,
            address: "福建省泉州市丰泽区",
            phone  : "1381234567",
            email  : "fisher@china.com",
            vip    : false,
            memo   : "hello"
        },
    } );	

		const [state] = useReactive(); 
		 
		return (
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
									<span className="help">minLength=3</span>
								</div>		 
							</div> 
							<div data-field-name="user.age" className={FieldStyle.className}>
								<label>Age</label>
								<div>
									<input type="number" min={8}  />
									<span data-validate-field="user.age"></span>
									<span className="help">min=8</span>
								</div>
							</div>
							<div data-field-name="user.address" className={FieldStyle.className}>
								<label>Address</label>
								<div>
									<input type="text"  minLength={5} />
									<span data-validate-field="user.address" ></span>
									<span className="help">minLength=5</span>
								</div>
							</div>
							<div data-field-name="user.phone" className={FieldStyle.className}>
								<label>Phone</label>
								<div>
									<input type="text" pattern="^138\d{8}" />
									<span data-validate-field="user.phone"></span>
									<span className="help">pattern="^138\d{8}"</span>
								</div>
							</div>
							<div data-field-name="user.memo" className={FieldStyle.className}>
								<label>Memo</label>
								<div>
									<textarea minLength={6}/>
									<span data-validate-field="user.memo"></span>
									<span className="help">minLength=6</span>
								</div>
							</div>
						</Form> 
					</div>
					<div>
						<JsonView data={state} />
					</div>
				</Layout>
		);
	} 