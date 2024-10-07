export type InputBindings<Value=any>={ 
    value?   : Value
    onChange?: (e:any)=>void 
}
 
export interface InputBindingsType{
    <Value=any>(selector: string):InputBindings<Value>    
    <Value=any>(selector: string[]):InputBindings<Value>
}

