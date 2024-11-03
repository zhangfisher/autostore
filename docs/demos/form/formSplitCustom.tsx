import React from 'react';
import { useForm } from '@autostorejs/react';
import {  Button, ColorBlock,JsonView, Layout } from 'x-react-components';
import { CheckBox } from '../../../packages/components/src/CheckBox';


export  default () => {
		const { Form, useReactive,valid,dirty,reset } = useForm({
            tcp:{
                flags: 1
            }			
		},{

        });	

		const [state] = useReactive();

		return (<>
            <Layout>
                <div>                    
                    <ColorBlock name="isValid" value={valid}></ColorBlock>
                    <ColorBlock name="isDirty" value={dirty}></ColorBlock>
                    <Form>
                        <div data-field-name="tcp.flags">                                             
                            <CheckBox label='URG' data-field-part="0b1" />  
                            <CheckBox label="ACK" data-field-part="0b10" />
                            <CheckBox label="PSH" data-field-part="0b100"/>
                            <CheckBox label="RST" data-field-part="0b1000x"/>
                            <CheckBox label="SYN" data-field-part="0b10000x"/>
                            <CheckBox label="FIN" data-field-part="0b100000x"/>
                            <CheckBox label="CRC" data-field-part="0b1000000x"/>
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