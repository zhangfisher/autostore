 
export type Dict<T=any> = Record<string,T>


export interface DescriptorB<Value = any,Result=Value> = {

}

export interface DescriptorBuilder<Value = any,Result=Value,descriptor> {
    ():WatchDescriptor<Value,Result>; 
    [COMPUTED_DESCRIPTOR_FLAG]     : true 
} 




export type WatchDescriptorBuilder<Value = any,Result=Value> =  DescriptorBuilder<Value,Result,WatchDescriptor<Value,Result>> 
  
  
  
  