import React from 'react';
import { useForm,isNumber, isPlainObject } from '@autostorejs/react';
import {  CheckBox,Button, ColorBlock,JsonView, Layout, Field, Input } from 'x-react-components';


export  default () => {
		const { Form, useReactive,valid,dirty,reset } = useForm({
            user:{
                firstName:"John",
                lastName:"Doe",
            }	
		},{
            fromState:(path,value,part)=>{
                if(path==="tcp.flags" && part){
                    return (value & Number(part)) !== 0
                }else if(Array.isArray(value) && isNumber(part)){
                    return value[Number(part)]
                }else if(isPlainObject(value) && part){
                    return value[part]
                }
                return value
            },
            toState:(path,inputValue,stateValue,part)=>{
                if(path==="tcp.flags" && part){
                    return inputValue ? stateValue | Number(part) : stateValue & ~Number(part)
                }else{
                    return inputValue
                }
            }
        });	

		const [state] = useReactive();

		return (<>
            <Layout direction='column'>
                <div>                    
                    <ColorBlock name="isValid" value={valid}></ColorBlock>
                    <ColorBlock name="isDirty" value={dirty}></ColorBlock>
                    <Form>
                        <div data-field-name="user.fullName">              
                            <Field label="Flags">
                                <Input data-field-name="user.firstName" inline width={50} />
                                <Input data-field-name="user.lastName" inline width={50} />
                            </Field>                                                     
                        </div> 
                    </Form>
                    <Button onClick={()=>reset()}>Reset</Button>
                </div>
                <div>
                    <JsonView data={state} />
                </div>
            </Layout> 
        </>);
}