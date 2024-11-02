import React from 'react';
import { useForm } from '@autostorejs/react';
import {  ColorBlock,Input,JsonView, Layout } from 'x-react-components';


export  default () => {
		const { Form, useReactive,valid,dirty } = useForm({
			net: {
				ip:["127","1","2","3"],                
                gateway:[173,3,4,68],                
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
                                <Input data-field-part="0" inline width={50} /> 
                                <span>.</span>
                                <Input data-field-part="1" inline width={50}/>
                                <span>.</span>
                                <Input data-field-part="2" inline width={50}/>
                                <span>.</span>
                                <Input data-field-part="3" inline width={50}/>
                            </div>
                        </div>
                        <div data-field-name="net.gateway">
                            <label>Gateway:</label>
                            <div>                                
                                <Input data-field-part="0" inline width={50} /> 
                                <span>.</span>
                                <Input data-field-part="1" inline width={50}/>
                                <span>.</span>
                                <Input data-field-part="2" inline width={50}/>
                                <span>.</span>
                                <Input data-field-part="3" inline width={50}/>
                            </div>
                        </div>
                    </Form>
                </div>
                <div>
                    <JsonView data={state} />
                </div>
            </Layout> 
        </>);
}