/**
 *  创建表单字段
 *
 *  当默认的表单字段不能满足要求，可以使用Field组件创建自定义的表单字段
 *
 *
 *
 * const { state } = useStore()
 * const { Form,Field } = useForm()
 *
 *
 * <Form>
 *      <Field<typeof state.order.price>        // 泛型参数指定字段的类型
 *          name="order.price"                  // 指定要绑定到状态的哪里
 *          validate={(value)=>boolean}         // 这是一个计算属性，可以是同步或异步的
 *          validate={async (value)=>boolean}   // 这是一个计算属性，可以是同步或异步的
 *          validate={computed(....)}           // 创建一个计算属性
 *          help="请输入价格"                    // 提示信息
 *          visible={true}                      // 是否可见
 *          visible={computed(....)}            // 创建一个计算属性
 *          render={({visible,name,value,loading,error,onChange,validate,dirty,help})=>{
 *              return <input name={name} onChange={onChange}/>
 *          })
 *      >
 *
 * </Form>
 * validate是一个计算属性，当value变化时会自动执行，返回值为true表示校验通过，false表示校验失败
 * 计算属性的数据会传递给render
 *          render={({name,value,timeout,loading,retry,validate,....})=>{
 *              return <input name={name} onChange={onChange}/>
 *          })
 *
 *
 *
 *
 * @example
 *
 *
 * <Form>
 *      <Field
 *          name={(state)=>state.price+state.count}
 *
 *          render={({value,onChange,loading,timeout,.....})=>{
 *               当price或count变化时，会自动更新
 *              return <span onClick={
 *                  (e)=>{
 *                      onChange(e,state=>{
 *
 *                      }) // 更新状态
 *                  }
 *              }>{price} + {count}</span>
 *          })
 *      >
 *
 * </Form>
 *
 */

import type {
    ComputedObject,
    ComputedState,
    Dict,
    ComputedGetter,
    Watcher,
    ComputedOptions,
    AsyncComputedGetter,
    AsyncComputedValue,
    ObjectKeyPaths,
    AsyncComputedDescriptorBuilder,
} from 'autostore';
import { computed, PATH_DELIMITER, setVal } from 'autostore';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactAutoStore } from '../store';
import type { AutoFormContext } from './Form';
import type { SignalComponentRenderArgs } from '../types';
import { getInputValueFromEvent } from '../utils';
import type { Get } from 'type-fest';

export type BooleanComputedGetter<State extends Dict, Scope = ComputedState<State>> = boolean | ComputedGetter<boolean, Scope>;
export type NumberComputedGetter<State extends Dict, Scope = ComputedState<State>> = number | ComputedGetter<number, Scope>;
export type StringComputedGetter<State extends Dict, Scope = ComputedState<State>> = string | ComputedGetter<string, Scope>;
export type ArrayComputedGetter<State extends Dict, Scope = ComputedState<State>> = any[] | ComputedGetter<any[], Scope>;

export type AutoFieldRenderBindProps<NAME, VALUE> = {
    name: NAME;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: SignalComponentRenderArgs<VALUE>['value'];
    placeholder: string;
};

export interface AutoFieldRenderProps<NAME, VALUE> extends SignalComponentRenderArgs<VALUE> {
    name: NAME;
    validate: boolean;
    required: boolean;
    visible: boolean;
    enable: boolean;
    readonly: boolean;
    label: string;
    placeholder: string;
    help: string;
    select: AsyncComputedValue<any[]>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    bind: AutoFieldRenderBindProps<NAME, VALUE>;
}

export interface AutoFieldProps<NAME, VALUE, VALIDATE, VISIBLE, REQUIRED, READONLY, ENABLE, HELP, LABEL, PLACEHOLDER, SELECT> {
    name: NAME;
    validate?: VALIDATE;
    visible?: VISIBLE;
    required?: REQUIRED;
    readonly?: READONLY;
    enable?: ENABLE;
    help?: HELP;
    label?: LABEL;
    placeholder?: PLACEHOLDER;
    select?: SELECT;
    render: (props: AutoFieldRenderProps<NAME, VALUE>) => React.ReactNode;
}

export interface AutoField<State extends Dict> {
    <
        NAME extends ObjectKeyPaths<ComputedState<State>> = ObjectKeyPaths<ComputedState<State>>,
        VALUE extends Get<ComputedState<State>, NAME> = Get<ComputedState<State>, NAME>,
        VALIDATE extends BooleanComputedGetter<State, VALUE> = BooleanComputedGetter<State, VALUE>,
        VISIBLE extends BooleanComputedGetter<State, VALUE> = BooleanComputedGetter<State, VALUE>,
        REQUIRED extends BooleanComputedGetter<State, VALUE> = BooleanComputedGetter<State, VALUE>,
        READONLY extends BooleanComputedGetter<State, VALUE> = BooleanComputedGetter<State, VALUE>,
        ENABLE extends BooleanComputedGetter<State, VALUE> = BooleanComputedGetter<State, VALUE>,
        LABEL extends StringComputedGetter<State, VALUE> = StringComputedGetter<State, VALUE>,
        PLACEHOLDER extends StringComputedGetter<State, VALUE> = StringComputedGetter<State, VALUE>,
        HELP extends StringComputedGetter<State, VALUE> = StringComputedGetter<State, VALUE>,
        SELECT extends AsyncComputedDescriptorBuilder<any[], VALUE> = AsyncComputedDescriptorBuilder<any[], VALUE>,
    >(
        props: AutoFieldProps<NAME, VALUE, VALIDATE, VISIBLE, REQUIRED, READONLY, ENABLE, HELP, LABEL, PLACEHOLDER, SELECT>,
    ): React.ReactNode;
}

function buildFieldRenderProps(props: any) {
    return Object.assign(
        {
            value: undefined,
            required: false,
            label: '',
            validate: true,
            visible: true,
            readonly: false,
            placeholder: '',
            enable: true,
            select: [],
            timeout: 0,
            loading: false,
            retry: 0,
            error: undefined,
            help: '',
            progress: 0,
            onChange: () => {},
            run: () => {},
            cancel: () => {},
        },
        props,
    );
}

export function prop(getter: ComputedGetter<any> | AsyncComputedGetter<any>, options?: ComputedOptions<any>): ComputedGetter<any> {
    return computed(getter as any, options) as ComputedGetter<any>;
}

export function createAutoFieldComponent<State extends Dict>(store: ReactAutoStore<State>, formCtx: React.MutableRefObject<AutoFormContext<State> | null>): AutoField<State> {
    const { useAsyncState, useComputedObject } = store;

    return (props: any) => {
        const { name } = props;
        const prefix = `${name}.`;

        const value = useAsyncState(name as any) as any;

        const validate = useComputedObject<boolean>(props.validate, {
            id: `${prefix}validate`,
            depends: [name], // 依赖<name>
            scope: name,
            initial: true,
            throwError: false,
            onError: () => false, //出错时返回false
        }) as ComputedObject<boolean>;

        const required = useComputedObject<boolean>(props.required, { id: `${prefix}required`, initial: false, throwError: false }) as ComputedObject<boolean> | undefined;
        const visible = useComputedObject<boolean>(props.visible, { id: `${prefix}visible`, initial: true, throwError: false }) as ComputedObject<boolean> | undefined;
        const readonly = useComputedObject<boolean>(props.readonly, { id: `${prefix}readonly`, initial: false, throwError: false }) as ComputedObject<boolean> | undefined;
        const enable = useComputedObject<boolean>(props.enable, { id: `${prefix}enable`, initial: true, throwError: false }) as ComputedObject<boolean> | undefined;
        const select = useComputedObject<any[]>(props.select, { id: `${prefix}select`, initial: [], throwError: false }) as ComputedObject<any[]> | undefined;
        const help = useComputedObject<string>(props.help, { id: `${prefix}help`, initial: '', throwError: false }) as ComputedObject<string> | undefined;
        const label = useComputedObject<string>(props.label, { id: `${prefix}label`, initial: '', throwError: false }) as ComputedObject<string> | undefined;
        const placeholder = useComputedObject<string>(props.placeholder, { id: `${prefix}placeholder`, initial: '', throwError: false }) as ComputedObject<string> | undefined;

        const fieldPropObjs = {
            validate,
            required,
            visible,
            readonly,
            enable,
            select,
            help,
            label,
            placeholder,
        } as Dict<ComputedObject<any> | undefined>;
        // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
        const onChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const inputValue = getInputValueFromEvent(e);
                if (name) {
                    store.update((state) => setVal(state, name.split(PATH_DELIMITER), inputValue));
                }
                formCtx.current?.setDirty(true);
                e.stopPropagation();
            },
            [name],
        );

        const [_, setRefresh] = useState(0);

        const renderProps = useRef<any>();
        if (!renderProps.current) {
            const bind = {
                name,
                onChange,
                value: value.value,
                placeholder: placeholder ? placeholder.value : props.placeholder ?? '',
            };
            const isValid = validate ? validate.val : props.validate ?? true;
            renderProps.current = buildFieldRenderProps({
                name,
                validate: isValid,
                required: required ? required.val : props.required ?? false,
                visible: visible ? visible.val : props.visible ?? true,
                readonly: readonly ? readonly.val : props.readonly ?? false,
                enable: enable ? enable.value : props.enable ?? true,
                select: select ? select.value : props.select,
                help: help ? help.value : props.help,
                label: label ? label.value : props.label,
                placeholder: placeholder ? placeholder.value : props.placeholder ?? '',
                bind,
                ...value,
                error: validate?.error?.message,
                onChange,
            });
        }
        // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
        const getFieldPropObj = useCallback((path: string[]): [string | undefined, ComputedObject<any> | undefined] => {
            const spath = path.join(PATH_DELIMITER);
            if (spath.startsWith('#' + prefix)) {
                const [propKey] = spath.substring(('#' + prefix).length).split(PATH_DELIMITER);
                return [propKey, fieldPropObjs[propKey]];
            }
            return [undefined, undefined];
        }, []);

        // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
        useEffect(() => {
            const watchers: Watcher[] = [];
            let count: number = 0;
            // 当validate字段校验失败时触发错误导致计算出错，此处可以捕获进行更新
            watchers.push(
                store.on('computed:error', ({ path, error }) => {
                    const [propKey, propObj] = getFieldPropObj(path);
                    if (propObj && propKey) {
                        Object.assign(renderProps.current!, { error: error.message });
                        formCtx.current?.validator!.updateInvalids(name, false);
                        setRefresh(++count);
                    }
                }),
            );
            // 侦听字段的变化，当变化时，重新渲染字段
            watchers.push(
                store.watch(name, ({ value }: any) => {
                    Object.assign(renderProps.current!, { value });
                    Object.assign(renderProps.current!.bind, { value });
                    setRefresh(++count);
                }),
            );
            // 侦听所有字段相关的计算属性(validate,visible等)的变化，当变化时，重新渲染字段
            watchers.push(
                store.watch(`#${name}.*`, ({ path, value }) => {
                    const [propKey, propObj] = getFieldPropObj(path);
                    if (propObj && propKey) {
                        const updated: Dict = {};
                        if (propObj.async && path[path.length - 1] === 'value') {
                            Object.assign(updated, { [propKey]: value.value });
                        } else {
                            Object.assign(updated, { [propKey]: value });
                        }
                        if (propKey === 'validate') {
                            if (value === true) {
                                updated.error = null;
                            }
                            formCtx.current?.validator!.updateInvalids(name, value);
                        }
                        Object.assign(renderProps.current!, updated);
                        setRefresh(++count);
                    }
                }),
            );
            return () => watchers.forEach((w) => w.off());
        }, []);
        return <>{props.render(renderProps.current as any)}</>;
    };
}
