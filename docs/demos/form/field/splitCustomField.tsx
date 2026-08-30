import React from 'react';
import { useForm, isPlainObject, isNumber } from '@autostorejs/react';
import { CheckBox, Button, ColorBlock, JsonView, Layout, Field, Input } from 'x-react-components';

export default () => {
    const { Form, useReactive, valid, dirty, reset } = useForm(
        {
            tcp: {
                flags: 5,
            },
            net: {
                ip: '127.1.2.3',
                gateway: '173.3.6.68',
            },
        },
        {
            // 状态值 -> 输入控件的值
            fromState: (path, value, part) => {
                if (path === 'tcp.flags' && part) {
                    // 位标志 -> checkbox 勾选状态
                    return (value & Number(part)) !== 0;
                } else if (typeof value === 'string' && part) {
                    // "127.1.2.3" -> 按.拆分，part 是段索引
                    return value.split('.')[Number(part)];
                } else if (Array.isArray(value) && isNumber(part)) {
                    return value[Number(part)];
                } else if (isPlainObject(value) && part) {
                    return (value as Record<string, any>)[part as string];
                }
                return value;
            },
            // 输入控件的值 -> 状态值（返回合并后的完整值）
            toState: (path, inputValue, stateValue, part) => {
                if (path === 'tcp.flags' && part) {
                    // 勾选=置位，取消=清位
                    return inputValue ? stateValue | Number(part) : stateValue & ~Number(part);
                } else if (typeof stateValue === 'string' && part) {
                    // 替换指定段后合并回字符串："192.1.2.3"
                    const segs = stateValue.split('.');
                    segs[Number(part)] = String(inputValue);
                    return segs.join('.');
                }
                return inputValue;
            },
        },
    );

    const [state] = useReactive();

    return (
        <>
            <Layout direction="column">
                <div>
                    <ColorBlock name="isValid" value={valid}></ColorBlock>
                    <ColorBlock name="isDirty" value={dirty}></ColorBlock>
                    <Form>
                        <div data-field-name="tcp.flags">
                            <Field label="Flags">
                                <CheckBox inline name="tcp.flags" label="URG" data-field-part="0b1" />
                                <CheckBox inline name="tcp.flags" label="ACK" data-field-part="0b10" />
                                <CheckBox inline name="tcp.flags" label="PSH" data-field-part="0b100" />
                                <CheckBox inline name="tcp.flags" label="RST" data-field-part="0b1000" />
                                <CheckBox inline name="tcp.flags" label="SYN" data-field-part="0b10000" />
                                <CheckBox inline name="tcp.flags" label="FIN" data-field-part="0b100000" />
                                <CheckBox inline name="tcp.flags" label="CRC" data-field-part="0b1000000" />
                            </Field>
                        </div>
                        <div data-field-name="net.ip">
                            <Field label="IP">
                                <Input name="net.ip" data-field-part="0" inline width={50} />
                                <span>.</span>
                                <Input name="net.ip" data-field-part="1" inline width={50} />
                                <span>.</span>
                                <Input name="net.ip" data-field-part="2" inline width={50} />
                                <span>.</span>
                                <Input name="net.ip" data-field-part="3" inline width={50} />
                            </Field>
                        </div>

                        <div data-field-name="net.gateway">
                            <Field label="Gateway">
                                <Input name="net.gateway" data-field-part="0" inline width={50} />
                                <span>.</span>
                                <Input name="net.gateway" data-field-part="1" inline width={50} />
                                <span>.</span>
                                <Input name="net.gateway" data-field-part="2" inline width={50} />
                                <span>.</span>
                                <Input name="net.gateway" data-field-part="3" inline width={50} />
                            </Field>
                        </div>
                    </Form>
                    <Button onClick={() => reset()}>Reset</Button>
                </div>
                <div>
                    <JsonView data={state} />
                </div>
            </Layout>
        </>
    );
};
