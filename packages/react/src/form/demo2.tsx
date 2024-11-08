 

type ComputedGetter<Value=any> = ()=>Value
type AsyncComputedGetter<Value=any> = ()=>Promise<Value>

type PickResult<T> =  T extends  AsyncComputedGetter<infer X> ? {value:X,loading:boolean} :  
        (T extends ComputedGetter<infer X> ? X :              
            T
        )



// function Field<Value = string,Validate extends ComputedGetter<boolean>  = ComputedGetter<boolean>>(
//             props:{validate:Validate,render:(props:{value:Value,isValid: PickResult<Validate>})=>React.ReactNode}):any
// function Field<Value = string,Enable extends ComputedGetter<boolean>  = ComputedGetter<boolean>>(
//        props:{enable:Enable,render:(props:{enable:PickResult<Enable>,value:Value})=>React.ReactNode}):any

function Field<Value = string,
    Enable extends ComputedGetter<boolean>  = ComputedGetter<boolean>,
    Validate extends ComputedGetter<boolean>  = ComputedGetter<boolean>
>(
    props:{enable?:Enable,validate?:Validate,render:(props:{value:Value,enable:PickResult<Enable>,isValid: PickResult<Validate>})=>React.ReactNode}):any
// 异步校验
function Field<Value = string,
    Enable extends AsyncComputedGetter<boolean>  = AsyncComputedGetter<boolean>,
    Validate extends AsyncComputedGetter<boolean> = AsyncComputedGetter<boolean>>(
    props:{enable?:Enable,validate?:Validate,
        render:(props:{value:Value,enable:PickResult<Enable>,isValid: PickResult<Validate>})=>React.ReactNode}):any
    
function Field(props:any):any{
    return <>{props.render({
        value:"AutoStore" 
    } as any) }</>
}



()=>{
    return <Field 
    validate = {()=>true}
    render={({value,isValid,enable}) =>{
        return <>{ isValid ? 
            <span>{value}</span> 
            : <span>No</span>
        }</>
    }}
    />
}


()=>{
    return <Field 
    validate = {async ()=>true}
    enable = {async ()=>true}
    render={({value,isValid,enable}) =>{
        return <>{ isValid ? 
            <span>{value}</span> 
            : <span>No</span>
        }</>
    }}
    />
}

()=>{
    return <Field 
    validate = {async ()=>true}
    enable = {()=>true}
    render={({value,isValid,enable}) =>{
        return <>{ isValid ? 
            <span>{value}</span> 
            : <span>No</span>
        }</>
    }}
    />
}