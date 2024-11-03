import React from 'react';
import { useForm } from '@autostorejs/react';
import {  Button, ColorBlock,Input,JsonView, Layout } from 'x-react-components';


export  default () => {
		const { Form, useReactive,valid,dirty,reset } = useForm({
			net: {
				ip:"127.1.2.3",                
			},
		});	

		const [state] = useReactive();

		return (<>
            <Layout>
                <div>                    
                    <ColorBlock name="isValid" value={valid}></ColorBlock>
                    <ColorBlock name="isDirty" value={dirty}></ColorBlock>
                    <Form>
                        <div data-field-name="net.ip">
                            <label>IP:</label>
                            <div>                                
                                <Input data-field-part="(\d{1,3})\.\d{1,3}\.\d{1,3}\.\d{1,3}" inline width={60} /> 
                                <span>.</span>
                                <Input data-field-part="\d{1,3}\.(\d{1,3})\.\d{1,3}\.\d{1,3}" inline width={60}/>
                                <span>.</span>
                                <Input data-field-part="\d{1,3}\.\d{1,3}\.(\d{1,3})\.\d{1,3}" inline width={60}/>
                                <span>.</span>
                                <Input data-field-part="\d{1,3}\.\d{1,3}\.\d{1,3}\.(\d{1,3})" inline width={60}/>
                            </div>
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