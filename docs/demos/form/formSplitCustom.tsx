import React from 'react';
import { useForm } from '@autostorejs/react';
import {  CheckBox,Button, ColorBlock,JsonView, Layout } from 'x-react-components';


export  default () => {
		const { Form, useReactive,valid,dirty,reset } = useForm({
            tcp:{
                flags: 5
            }			
		},{
            fromState:(path,value,part)=>{
                if(path==="tcp.flags" && part){
                    return Number(part)
                } 
                return value
            }
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
                            <CheckBox label="RST" data-field-part="0b1000"/>
                            <CheckBox label="SYN" data-field-part="0b10000"/>
                            <CheckBox label="FIN" data-field-part="0b100000"/>
                            <CheckBox label="CRC" data-field-part="0b1000000"/>
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