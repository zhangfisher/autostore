export type InputBindings<Value=any>={ 
    onChange?:(value:Value)=>void 
}
 
export interface InputBindingsType{
    <Value=any>(selector: string):InputBindings<Value>    
    <Value=any>(selector: string[]):InputBindings<Value>
}

