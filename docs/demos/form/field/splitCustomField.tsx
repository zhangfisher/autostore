import React from 'react';
import { useForm,isNumber, isPlainObject } from '@autostorejs/react';
import {  CheckBox,Button, ColorBlock,JsonView, Layout, Field, Input } from 'x-react-components';


export  default () => {
		const { Form, useReactive,valid,dirty,reset } = useForm({
            tcp:{
                flags: 5            					
            },
            net: {
				ip:["127","1","2","3"],                
                gateway:[173,3,4,68],                
			},	
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
                        <div data-field-name="tcp.flags">              
                            <Field label="Flags">
                                <CheckBox inline label='URG' data-field-part="0b1" />  
                                <CheckBox inline  label="ACK" data-field-part="0b10" />
                                <CheckBox inline  label="PSH" data-field-part="0b100"/>
                                <CheckBox inline  label="RST" data-field-part="0b1000"/>
                                <CheckBox inline  label="SYN" data-field-part="0b10000"/>
                                <CheckBox inline  label="FIN" data-field-part="0b100000"/>
                                <CheckBox inline  label="CRC" data-field-part="0b1000000"/>
                            </Field>                                                     
                        </div>
                        <div  data-field-name="net.ip">
                            <Field label="IP" data-field-name="net.ip">
                                <Input data-field-part="0" inline width={50} /> 
                                <span>.</span>
                                <Input data-field-part="1" inline width={50}/>
                                <span>.</span>
                                <Input data-field-part="2" inline width={50}/>
                                <span>.</span>
                                <Input data-field-part="3" inline width={50}/>
                            </Field>    
                        </div>
                        
                        <div  data-field-name="net.gateway">
                            <Field label="Gateway" data-field-name="net.gateway">
                                <Input data-field-part="0" inline width={50} /> 
                                <span>.</span>
                                <Input data-field-part="1" inline width={50}/>
                                <span>.</span>
                                <Input data-field-part="2" inline width={50}/>
                                <span>.</span>
                                <Input data-field-part="3" inline width={50}/>
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