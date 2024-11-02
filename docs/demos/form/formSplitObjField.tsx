import React from 'react';
import { useForm } from '@autostorejs/react';
import {  ColorBlock,Input,JsonView, Layout } from 'x-react-components';


export  default () => {
		const { Form, useReactive,valid,dirty } = useForm({
			net: {
				ip:"127.1.2.3",                
                gateway:"192.168.1.1",
                mask:"255.255.255.0",
                dns:"8.8.8.8"
			},
		});	

		const [state] = useReactive();

		return (<>
            <Layout>
                <div>                    
                    <ColorBlock name="isValid" value={valid}></ColorBlock>
                    <ColorBlock name="isDirty" value={dirty}></ColorBlock>
                    <Form>
                        <div data-field-name="net">                                             
                            <Input label='IP' data-field-part="ip" /> 
                            <Input label="Gateway" data-field-part="gateway" />
                            <Input label="Mask" data-field-part="mask"/>
                            <Input label="DNS" data-field-part="dns"/>
                        </div>
                    </Form>
                </div>
                <div>
                    <JsonView data={state} />
                </div>
            </Layout> 
        </>);
}